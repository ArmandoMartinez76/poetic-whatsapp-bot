const axios = require('axios');
const fs = require('fs');

const mensajes = [
    "Rosa María, eres la mujer soñada que el destino guardó para iluminar cada rincón de mi existencia.",
    "En el altar de mi corazón, te adoro como al más sagrado de los tesoros, mi amor eterno.",
    "Eres la luz de mi ser, esa claridad divina que disipa cualquier sombra en mi camino.",
    "A pesar de las tormentas y los desencuentros, mi alma te aclama con la misma devoción que el primer día.",
    "En cada verso de mi vida, tu nombre es la rima perfecta y la melodía que da sentido a mi respirar.",
    "Eres el sueño hecho realidad, la arquitectura más bella que la vida ha diseñado para mi felicidad.",
    "Incluso en nuestras diferencias, mi amor por ti permanece inquebrantable, como una roca frente al mar.",
    "Te adoro con una profundidad que las palabras apenas alcanzan a rozar, Rosa María.",
    "Eres el amor de mi vida, la compañera de viaje que mi alma eligió desde antes del tiempo.",
    "Que este mensaje sea un humilde mensajero del incendio de amor que por ti arde en mi pecho.",
    "Eres la musa de mis días y la paz de mis noches; sin ti, mi mundo carecería de color.",
    "Nuestras peleas no son más que breves eclipses en el brillo infinito de nuestra unión.",
    "Mi corazón late con tu nombre en cada sístole, recordándome que soy tuyo por la eternidad.",
    "Eres la mujer más virtuosa y bella que mis ojos han tenido el honor de contemplar.",
    "Te elijo hoy, mañana y en cada vida que el destino me permita caminar a tu lado.",
    "Tu amor es el faro que guía a mi corazón de vuelta a la calma cuando me pierdo en la distancia.",
    "Rosa María, en la geografía de mi alma, tú eres el territorio donde deseo habitar siempre.",
    "Cada palabra que te dedico lleva impreso el sello de una adoración que no conoce límites.",
    "Eres la luz que transforma mis inviernos en primaveras eternas con solo una mirada.",
    "Recuerda siempre, amor de mi vida, que mi devoción por ti es el testamento de mi existencia."
];

const targetNumber = '5215519489119';
const apiUrl = 'http://localhost:3000/send-message';

function logMessage(msg) {
    const timestamp = new Date().toISOString();
    const content = `[${timestamp}] ${msg}\n`;
    fs.appendFileSync('envio_rosamaria.log', content);
    console.log(content.trim());
}

async function enviarMensajes() {
    logMessage("Iniciando proceso de envío de 20 poemas amorosos para Rosa María...");
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

        const waitTime = Math.floor(Math.random() * (45000 - 20000 + 1)) + 20000;
        logMessage(`Esperando ${waitTime / 1000} segundos para el siguiente...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    logMessage("Proceso completo de 20 mensajes para Rosa María finalizado.");
}

process.on('uncaughtException', (err) => {
    logMessage(`FATAL: Error no capturado: ${err.message}\nStack: ${err.stack}`);
    process.exit(1);
});

enviarMensajes();
