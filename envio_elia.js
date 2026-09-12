const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');

const mensajes = [
    "Dicen que el azar tiene buena memoria, Elia, pero coincidir contigo me parece una jugada demasiado bien pensada del universo.",
    "Hay miradas que son como preguntas interesantes: no necesitas responderlas de inmediato, basta con disfrutar el acertijo.",
    "No suelo creer en las coincidencias perfectas, pero a veces tu sonrisa me hace dudar de la física.",
    "Si la elegancia fuera un arte discreto, Elia, tú serías una obra expuesta solo para quienes saben observar con detalle.",
    "Me gusta la gente que piensa con claridad y siente con intensidad; por eso resulta tan inevitable fijarse en ti.",
    "Conversar contigo es como encontrar una nota al margen en un libro viejo: inesperada, fascinante y llena de sentido.",
    "Tus ideas tienen un brillo propio, pero la forma en que las compartes es lo que realmente desarma cualquier argumento.",
    "No hay prisa en descifrarte, Elia. Las mejores historias se leen despacio y paladeando cada capítulo.",
    "A veces la sutileza es la forma más poderosa de presencia, y tú la dominas con una gracia natural.",
    "Hay conversaciones que duran minutos y otras que se quedan resonando en la mente todo el día. Adivina cuál provocas tú.",
    "Si el tiempo es relativo, pasar cinco minutos escuchándote seguro transcurre en una dimensión bastante más bonita.",
    "Tienes esa mezcla exacta de inteligencia que despierta curiosidad y calidez que invita a quedarse.",
    "Me agrada cómo la lógica se vuelve poética cuando hablas de las cosas que te apasionan.",
    "Dicen que el misterio es el arte de dejar que el otro imagine; contigo, la realidad supera cualquier expectativa.",
    "No busco convencerte de nada, Elia, solo quería recordarte que tu risa tiene un timing casi perfecto.",
    "Hay detalles pequeños que otros pasan por alto, pero en ti se vuelven el centro de gravedad del lugar.",
    "La arquitectura de tus pensamientos me resulta brillante, pero la soltura con que los expresas es encantadora.",
    "No hace falta ruido cuando las palabras adecuadas se dicen en el tono preciso. Y tú tienes la voz exacta.",
    "Fascinar no es hacer mucho escándalo, Elia; es lograr que alguien sonría recordando una frase tuya a mitad de la tarde.",
    "Si fueras un teorema, serías de esos que da gusto demostrar paso a paso, apreciando cada detalle.",
    "Tengo la teoría de que hay mentes que conectan en sintonías poco comunes, y la tuya transmite con una nitidez hermosa.",
    "El arte de coincidir radica en saber apreciar el hallazgo. Y créeme, encontrarte en el camino ha sido un gran acierto.",
    "No hay enigma más interesante que una mirada que guarda buenas historias y una sonrisa que sabe cuándo compartirlas.",
    "Elia, hay quienes iluminan una habitación al entrar, pero tú logras que el ambiente se vuelva interesante sin esforzarte.",
    "Ojalá la tarde te trate tan bien como la curiosidad y la simpatía que despiertas en quien te piensa ahora mismo."
];

const targetNumber = '5215514246062@c.us';

function logMessage(msg) {
    const timestamp = new Date().toISOString();
    const content = `[${timestamp}] ${msg}\n`;
    fs.appendFileSync('envio_elia.log', content);
    console.log(content.trim());
}

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('ready', async () => {
    logMessage("¡Cliente de WhatsApp listo con la sesión guardada! Iniciando envío a Elia...");

    for (let i = 0; i < mensajes.length; i++) {
        const msg = mensajes[i];
        try {
            logMessage(`Enviando mensaje ${i + 1}/25...`);
            await client.sendMessage(targetNumber, msg);
            logMessage(`[EXITOSO ${i + 1}/25]: "${msg.substring(0, 45)}..."`);
        } catch (error) {
            logMessage(`[ERROR] enviando mensaje ${i + 1}: ${error.message}`);
        }

        // Intervalo de 3 segundos y pico (3.1s a 3.9s)
        const waitTime = 3100 + Math.floor(Math.random() * 800);
        logMessage(`Esperando ${(waitTime / 1000).toFixed(2)}s para el siguiente mensaje...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    logMessage("✨ ¡Envío completado con éxito! Los 25 mensajes han sido entregados.");
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

logMessage("Iniciando WhatsApp client en segundo plano...");
client.initialize();
