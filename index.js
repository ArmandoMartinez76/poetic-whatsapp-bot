require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');
const QRCode = require('qrcode');
const fs = require('fs');
const { createApp } = require('./app');

const port = parseInt(process.env.PORT, 10) || 3000;
const host = process.env.HOST || '127.0.0.1';
const apiKey = process.env.API_KEY || null;

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

const app = createApp({
    client,
    apiKey,
    getLastQr: () => lastQr,
    log
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
