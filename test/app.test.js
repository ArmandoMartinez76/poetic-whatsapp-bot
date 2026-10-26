const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../app');

test('API endpoints integration tests', async (t) => {
    const sentMessages = [];
    const mockClient = {
        info: { pushname: 'BotTest' },
        sendMessage: async (to, msg) => {
            sentMessages.push({ to, msg });
            return { id: 'test-123' };
        }
    };

    let currentQr = null;
    const app = createApp({
        client: mockClient,
        apiKey: 'test-api-key',
        getLastQr: () => currentQr,
        log: () => {}
    });

    const server = await new Promise((resolve) => {
        const s = app.listen(0, '127.0.0.1', () => resolve(s));
    });

    const port = server.address().port;
    const baseUrl = `http://127.0.0.1:${port}`;

    t.after(() => {
        server.close();
    });

    await t.test('GET /status returns ready: true when client is ready and no QR', async () => {
        const res = await fetch(`${baseUrl}/status`);
        assert.equal(res.status, 200);
        const data = await res.json();
        assert.equal(data.ready, true);
    });

    await t.test('GET /qr informs when QR is not available', async () => {
        const res = await fetch(`${baseUrl}/qr`);
        assert.equal(res.status, 200);
        const text = await res.text();
        assert.match(text, /El QR no está disponible/);
    });

    await t.test('POST /send-message rejects unauthorized requests', async () => {
        const res = await fetch(`${baseUrl}/send-message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ number: '5217333432538', message: 'Hola' })
        });
        assert.equal(res.status, 401);
    });

    await t.test('POST /send-message validates required fields', async () => {
        const res = await fetch(`${baseUrl}/send-message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'test-api-key'
            },
            body: JSON.stringify({ number: '' })
        });
        assert.equal(res.status, 400);
    });

    await t.test('POST /send-message validates invalid phone number', async () => {
        const res = await fetch(`${baseUrl}/send-message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'test-api-key'
            },
            body: JSON.stringify({ number: '1234', message: 'Test' })
        });
        assert.equal(res.status, 400);
    });

    await t.test('POST /send-message sends message successfully when valid', async () => {
        const res = await fetch(`${baseUrl}/send-message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'test-api-key'
            },
            body: JSON.stringify({ number: '+52 1 733 343 2538', message: 'Poema de prueba' })
        });
        assert.equal(res.status, 200);
        assert.equal(sentMessages.length, 1);
        assert.equal(sentMessages[0].to, '5217333432538@c.us');
        assert.equal(sentMessages[0].msg, 'Poema de prueba');
    });
});
