const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');
const QRCode = require('qrcode');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

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
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    lastQr = qr;
    log('QR RECEIVED. ESCANEA ESTE CÓDIGO EN: http://localhost:3000/qr');
    qrcodeTerminal.generate(qr, {small: true});
});

client.on('ready', () => {
    lastQr = null;
    log('¡Conexión exitosa! El client de WhatsApp está listo.');
});

client.on('message', message => {
	if(message.body === '!ping') {
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
    res.json({ ready: !lastQr && client.info });
});

// Express endpoints
app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).send('Number and message are required.');
    }

    try {
        // Formatear el número (eliminar '+' y asegurar que termine en @c.us)
        let formattedNumber = number.replace('+', '').replace(' ', '');
        if (!formattedNumber.endsWith('@c.us')) {
            formattedNumber = `${formattedNumber}@c.us`;
        }
        
        await client.sendMessage(formattedNumber, message);
        log(`Mensaje enviado a ${number}`);
        res.send(`Mensaje enviado a ${number}`);
    } catch (error) {
        log(`Error al enviar el mensaje a ${number}: ${error}`);
        res.status(500).send('Error al enviar el mensaje');
    }
});

app.listen(port, () => {
    log(`API escuchando en http://localhost:${port}`);
});
