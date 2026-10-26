const express = require('express');
const QRCode = require('qrcode');
const { sanitizePhoneNumber, createAuthMiddleware } = require('./utils');

/**
 * Creates and configures the Express application.
 * 
 * @param {object} options
 * @param {object} options.client - The whatsapp-web.js client instance
 * @param {string|null} [options.apiKey] - Optional API key for authenticating requests
 * @param {function} options.getLastQr - Function returning the latest QR code string
 * @param {function} [options.log] - Logging function
 * @returns {import('express').Express}
 */
function createApp({ client, apiKey = null, getLastQr = () => null, log = console.log }) {
    const app = express();
    app.use(express.json());

    const checkAuth = createAuthMiddleware(apiKey);

    // Route to serve the QR code in the browser
    app.get('/qr', (req, res) => {
        const lastQr = getLastQr();
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

    // Endpoint to check connection status
    app.get('/status', (req, res) => {
        const lastQr = getLastQr();
        res.json({ ready: !lastQr && !!(client && client.info) });
    });

    // Endpoint to send WhatsApp messages
    app.post('/send-message', checkAuth, async (req, res) => {
        const { number, message } = req.body || {};

        if (!number || !message) {
            return res.status(400).send('Number and message are required.');
        }

        const sanitized = sanitizePhoneNumber(number);
        if (!sanitized.valid) {
            return res.status(400).send('Invalid phone number format.');
        }

        try {
            await client.sendMessage(sanitized.formatted, message);
            log(`Mensaje enviado a ${number}`);
            res.send(`Mensaje enviado a ${number}`);
        } catch (error) {
            log(`Error al enviar el mensaje a ${number}: ${error}`);
            res.status(500).send('Error al enviar el mensaje');
        }
    });

    return app;
}

module.exports = { createApp };
