require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');
const QRCode = require('qrcode');
const express = require('express');
const fs = require('fs');

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;
const host = process.env.HOST || '127.0.0.1';
const apiKey = process.env.API_KEY || null;

app.use(express.json());

let lastQr = null;

const logStream = fs.createWriteStream('bot.log', { flags: 'a' });
const log = (msg) => {
    const timestamp = new Date().toISOString();
    logStream.write(`[${timestamp}] ${msg}\n`);
    console.log(msg);
};

// Initializing the WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    }
});

client.on('qr', (qr) => {
    lastQr = qr;
    log(`QR RECEIVED. ESCANEA ESTE CÓDIGO EN: http://${host === '0.0.0.0' ? 'localhost' : host}:${port}/qr o abre qr.html`);
    qrcodeTerminal.generate(qr, { small: true });
    QRCode.toDataURL(qr, (err, url) => {
        if (!err) {
            const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>QR WhatsApp</title></head><body style="text-align:center; font-family: sans-serif; margin-top: 50px;"><h1>Escanea este QR con WhatsApp</h1><img src="${url}" style="border: 10px solid white; box-shadow: 0 0 15px rgba(0,0,0,0.2); width: 320px;" /><p style="font-size:18px;color:#555;">Abre WhatsApp en tu teléfono &gt; Dispositivos vinculados &gt; Vincular dispositivo</p></body></html>`;
            fs.writeFileSync('qr.html', html);
            log('Archivo qr.html guardado en el disco para visualización directa.');
        }
    });
});

client.on('ready', () => {
    lastQr = null;
    log('¡Conexión exitosa! El cliente de WhatsApp está listo.');
});

client.on('message', message => {
    if (message.body === '!ping') {
        message.reply('pong');
    }
});

client.initialize();

// Route to serve the QR code in the browser
app.get('/qr', (req, res) => {
    if (!lastQr) {
        return res.send('<h1>El QR no está disponible. Quizás ya estés logueado.</h1>');
    }

    QRCode.toDataURL(lastQr, (err, url) => {
        if (err) return res.status(500).send('Error generando el QR');
        res.send(`
            <div style="text-align:center; font-family: sans-serif; margin-top: 50px;">
                <h1>Escanea este QR con WhatsApp</h1>
                <img src="${url}" style="border: 20px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.1); width: 300px;" />
                <p>La página te avisará cuando la sesión esté lista.</p>
                <script>
                    setInterval(async () => {
                        try {
                            const response = await fetch('/status');
                            const data = await response.json();
                            if (data.ready) {
                                document.body.innerHTML = '<h1>¡Conectado! Ya puedes cerrar esta ventana.</h1>';
                            }
                        } catch(e) {}
                    }, 3000);
                </script>
            </div>
        `);
    });
});

// Endpoint to check status
app.get('/status', (req, res) => {
    res.json({ ready: !lastQr && !!client.info });
});

// Authentication middleware helper for API routes
const checkAuth = (req, res, next) => {
    if (apiKey) {
        const clientKey = req.headers['x-api-key'] || req.query.apiKey;
        if (clientKey !== apiKey) {
            return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key.' });
        }
    }
    next();
};

// Express endpoints
app.post('/send-message', checkAuth, async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).send('Number and message are required.');
    }

    try {
        // Robust phone number sanitation: strip all non-digit characters
        let cleanedNumber = String(number).trim().replace(/\D/g, '');
        if (!cleanedNumber || cleanedNumber.length < 8) {
            return res.status(400).send('Invalid phone number format.');
        }

        const formattedNumber = `${cleanedNumber}@c.us`;

        await client.sendMessage(formattedNumber, message);
        log(`Mensaje enviado a ${number}`);
        res.send(`Mensaje enviado a ${number}`);
    } catch (error) {
        log(`Error al enviar el mensaje a ${number}: ${error}`);
        res.status(500).send('Error al enviar el mensaje');
    }
});

const server = app.listen(port, host, () => {
    log(`API escuchando en http://${host}:${port}`);
});

// Graceful shutdown handling
const shutdown = async () => {
    log('Cerrando servidor y sesión de WhatsApp...');
    server.close();
    try {
        await client.destroy();
    } catch (e) {
        // Ignore error during cleanup
    }
    process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
