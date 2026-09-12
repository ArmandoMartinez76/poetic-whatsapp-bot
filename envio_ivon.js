const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');

// 25 mensajes sensuaciones, eróticos y apasionados para Ivon.
// Tono: Sensual sin ser acosador, erótico y seductor sin caer en lo vulgar.
const mensajes = [
    "Hay recuerdos que no se guardan en la memoria, Ivon, sino en la piel.",
    "Pienso en la forma en que tu cuerpo responde al mío y cualquier distracción se vuelve imposible.",
    "Nuestra química no necesita explicaciones; basta con recordar la última vez que estuvimos a solas.",
    "Tienes ese poder de hacer que el aire alrededor se vuelva denso y ardiente con solo un susurro.",
    "Me gusta la certeza de saber exactamente cómo hacerte temblar sin decir una sola palabra.",
    "Hay incendios que no se apagan con el tiempo, Ivon, y tú y yo somos prueba constante de ello.",
    "Cada encuentro contigo deja una huella eléctrica que tarda días en desaparecer de mis manos.",
    "La física de nuestros cuerpos cuando se encuentran tiene un lenguaje donde sobran los frenos.",
    "A veces cierro los ojos y vuelvo a sentir el calor exacto de tu respiración en mi cuello.",
    "Ivon, me fascina cómo tu piel y la mía se entienden de una manera tan instintiva y perfecta.",
    "Hay noches que no se miden en horas, sino en la intensidad de cada roce y cada suspiro.",
    "Tu silueta es mi mapa favorito para perderme sin ninguna intención de ser encontrado.",
    "Me tienta recordar la suavidad de tus curvas bajo la presión exacta de mis dedos.",
    "Contigo el deseo no es una idea lejana, es un pulso constante que nos recorre desde el primer contacto.",
    "Estar cerca de ti es una provocación que mi autocontrol nunca ha querido ganar.",
    "Me encanta cómo convertimos la prisa en devoción y el silencio en puro juego sensorial.",
    "Tienes el secreto de volver inolvidable cada rincón donde dejamos la ropa y la cordura.",
    "La memoria del tacto es poderosa, y la mía todavía guarda el ritmo de tus caderas.",
    "Hay miradas que son una invitación explícita; contigo, Ivon, siempre es un sí definitivo.",
    "Me fascina esa complicidad donde los roces casuales siempre terminan en algo mucho más intenso.",
    "Tu humedad, tu calor y esa forma en que te entregas son mi vicio más recurrente.",
    "No hay distancia que enfríe el fuego que encendemos cada vez que nos tenemos cerca.",
    "Amo la forma en que pierdes la respiración justo antes de entregarte por completo.",
    "Ivon, eres esa tentación en la que me da un gusto absoluto caer una y otra vez.",
    "Prepárate, porque la próxima vez que te vea voy a cobrarme con creces cada pensamiento de hoy."
];

const targetNumber = '5215574969151@c.us';

function logMessage(msg) {
    const timestamp = new Date().toISOString();
    const content = `[${timestamp}] ${msg}\n`;
    fs.appendFileSync('envio_ivon.log', content);
    console.log(content.trim());
}

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('ready', async () => {
    logMessage("¡Cliente de WhatsApp listo con la sesión guardada! Iniciando envío sensual a Ivon...");

    for (let i = 0; i < mensajes.length; i++) {
        const msg = mensajes[i];
        try {
            logMessage(`Enviando mensaje ${i + 1}/25...`);
            await client.sendMessage(targetNumber, msg);
            logMessage(`[EXITOSO ${i + 1}/25]: "${msg.substring(0, 45)}..."`);
        } catch (error) {
            logMessage(`[ERROR] enviando mensaje ${i + 1}: ${error.message}`);
        }

        // Pausa humanizada entre 3.1 y 3.9 segundos
        const waitTime = 3100 + Math.floor(Math.random() * 800);
        logMessage(`Esperando ${(waitTime / 1000).toFixed(2)}s para el siguiente mensaje...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    logMessage("✨ ¡Envío completado con éxito! Los 25 mensajes para Ivon han sido entregados.");
    setTimeout(() => {
        client.destroy();
        process.exit(0);
    }, 2000);
});

client.on('auth_failure', (msg) => {
    logMessage(`ERROR de autenticación: ${msg}`);
});

process.on('uncaughtException', (err) => {
    logMessage(`FATAL: ${err.message}`);
    process.exit(1);
});

logMessage("Iniciando WhatsApp client en segundo plano para Ivon...");
client.initialize();
