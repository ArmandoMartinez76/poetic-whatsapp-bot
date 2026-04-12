const axios = require('axios');
const fs = require('fs');

const mensajes = [
    "Lidia, en el jardín de mi vida, tu amistad es la flor que nunca marchita.",
    "Gracias por ser el refugio donde mis silencios encuentran paz.",
    "Nuestra amistad es un poema que escribimos juntos, verso a verso, con risas y lealtad.",
    "Eres la calma en mis tormentas y la luz en mis días grises.",
    "En el libro de mi destino, el capítulo más bello es aquel donde apareces tú.",
    "Gracias por conocerme tan bien y, aun así, elegir quedarte a mi lado.",
    "Tu amistad es el tesoro que guardo con más recelo en el alma.",
    "Eres esa voz que me recuerda quién soy cuando el mundo intenta confundirme.",
    "En la danza de la vida, tenerte como amiga es el paso más firme que he dado.",
    "Lidia, tu presencia hace que todo lo difícil parezca un poco más sencillo.",
    "Gracias por ser mi confidente, mi cómplice y mi puerto seguro.",
    "La vida nos hizo amigos, pero el tiempo nos convirtió en familia.",
    "Eres el sol que calienta mis inviernos y la brisa que refresca mis veranos.",
    "Nuestra conexión va más allá de las palabras, es un latido compartido.",
    "En ti encontré no solo una amiga, sino un espejo donde mi alma se siente en casa.",
    "Gracias por enseñarme que la verdadera lealtad no se dice, se demuestra.",
    "Eres la melodía que alegra mis silencios y la fuerza que impulsa mis sueños.",
    "Lidia, contigo el camino es más corto y la carga mucho más ligera.",
    "Que la vida nos siga regalando momentos para llenar este álbum de amistad infinita.",
    "Siempre podré confiar en ti, y tú siempre tendrás un hogar en mi corazón."
];

const targetNumber = '5215554045750';
const apiUrl = 'http://localhost:3000/send-message';

function logMessage(msg) {
    const timestamp = new Date().toISOString();
    const content = `[${timestamp}] ${msg}\n`;
    fs.appendFileSync('envio_lidia.log', content);
    console.log(content.trim());
}

async function enviarMensajes() {
    logMessage("Iniciando proceso de envío de 20 poemas para Lidia...");
    for (let i = 0; i < mensajes.length; i++) {
        const msg = mensajes[i];
        try {
            logMessage(`Intentando enviar mensaje ${i + 1}/20...`);
            const response = await axios.post(apiUrl, {
                number: targetNumber,
                message: msg
            });
            logMessage(`EXITOSO: ${msg.substring(0, 30)}... (Respuesta: ${response.status})`);
        } catch (error) {
            logMessage(`ERROR enviando mensaje ${i + 1}: ${error.message}`);
            if (error.response) {
                logMessage(`Detalle del error del servidor: ${JSON.stringify(error.response.data)}`);
            }
        }

        const waitTime = Math.floor(Math.random() * (45000 - 15000 + 1)) + 15000;
        logMessage(`Esperando ${waitTime / 1000} segundos para el siguiente...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    logMessage("Proceso completo de 20 mensajes para Lidia finalizado.");
}

process.on('uncaughtException', (err) => {
    logMessage(`FATAL: Error no capturado: ${err.message}\nStack: ${err.stack}`);
    process.exit(1);
});

enviarMensajes();
