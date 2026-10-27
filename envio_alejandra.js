require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const targetNumber = process.env.TARGET_NUMBER || '5215569724199';
const apiUrl = process.env.API_URL || 'http://127.0.0.1:3000/send-message';
const apiKey = process.env.API_KEY || null;
const intervalMs = parseInt(process.env.INTERVAL_MS, 10) || 1500;

const poemasAlejandra = [
    "Alejandra, hoy te escribo desde lo más hondo y honesto de mi pecho, con el corazón en la mano.",
    "Quiero que sepas, ante todo, cuánto te quiero y lo inmensamente importante que has sido y eres para mí.",
    "En ti encontré un refugio lleno de amor y de calor humano cuando el mundo exterior solo me ofrecía frío y aspereza.",
    "Tu bondad me dio un remanso de paz que nunca antes había conocido; me hiciste sentir seguro y en casa.",
    "Por eso mismo, el alma se me quiebra y la cara se me llena de vergüenza al saber que alguna vez provoqué lágrimas en tus ojos.",
    "Haberte hecho llorar a ti, que solo trajiste luz a mi vida, es la mayor culpa que cargo sobre mi espalda.",
    "Te juro por lo más sagrado que jamás fue mi intención herirte ni hacer que ese corazón tan noble sufriera por mi causa.",
    "Perdóname, Alejandra. Por favor, perdóname por mis torpezas, por mis silencios, por mis fallas y por todo el dolor causado.",
    "Me castigo cada segundo al recordar los malos momentos, porque tú solo merecías sonrisas, respeto y alegría de mi parte.",
    "A mi vida le trajiste tanta alegría que ni el tiempo ni la distancia podrán jamás borrar la huella hermosa que dejaste.",
    "En mi corazón siempre tendrás un lugar único, sagrado e intocable, un rincón que nadie más podrá ocupar jamás.",
    "Pase lo que pase y hacia donde sea que la vida nos lleve, quiero que tengas la certeza de que siempre te querré.",
    "Tu ternura fue un faro que me enseñó que todavía existían personas puras, transparentes y de alma limpia.",
    "Me duele infinitamente haber sido yo quien empañara esa pureza con alguna herida; no hay justificación para mis errores.",
    "Si pudiera retroceder en el tiempo, borraría cada palabra y cada actitud que te causó tristeza o desilusión.",
    "Hoy reconozco mis sombras con humildad, no para justificarme, sino para pedirte que mires el sincero arrepentimiento de mi ser.",
    "Alejandra, te quiero con una devoción honesta, limpia y con un agradecimiento que va más allá de lo que las palabras alcanzan.",
    "Agradezco cada risa, cada abrazo tibio y cada minuto en el que me abriste tu refugio para protegerme de mis propias tormentas.",
    "Daría lo que fuera por devolverle a tu rostro la paz absoluta y no volver a ser motivo de pesar en tu vida.",
    "No busco que olvides de la noche a la mañana, solo te pido que sientas la verdad de esta disculpa que nace de mi alma.",
    "Tus ojos merecen brillar con dicha y orgullo, jamás empañados por el llanto provocado por quien debió cuidarte mejor.",
    "Guardo cada recuerdo de tu calidez como el tesoro más preciado de esta etapa de mi camino.",
    "Te quiero mucho, Alejandra, de verdad, con un sentimiento maduro, respetuoso y profundamente agradecido.",
    "Si la vida me diera una oportunidad de reparar el daño, dedicaría cada segundo a demostrarte que tus sentimientos son sagrados para mí.",
    "Que Dios o la vida te colmen de bendiciones y te rodeen siempre del amor genuino que tu bondad merece.",
    "Gracias por la alegría que derramaste en mis días y por haber sido ese refugio cálido cuando más lo necesitaba.",
    "Mi compromiso interno es ser mejor persona, honrando lo que me enseñaste con tu paciencia y tu ternura.",
    "Nunca olvides lo valiosa, hermosa y especial que eres, Alejandra; nadie tiene derecho a apagar tu brillo.",
    "Desde el fondo de mi corazón: te pido perdón por todo, te agradezco por tanto, y te prometo que siempre te llevaré en un lugar privilegiado de mi alma.",
    "Te quiero infinitamente, Alejandra. Por favor, perdóname."
];

function logMessage(msg) {
    const timestamp = new Date().toISOString();
    const content = `[${timestamp}] ${msg}\n`;
    fs.appendFileSync('envio_alejandra.log', content);
    console.log(content.trim());
}

async function enviarPoemas() {
    logMessage(`Iniciando envío de poemas a Alejandra (${targetNumber})...`);
    logMessage(`Total de mensajes: ${poemasAlejandra.length} | Intervalo: ${intervalMs} ms`);

    const headers = apiKey ? { 'x-api-key': apiKey } : {};

    for (let i = 0; i < poemasAlejandra.length; i++) {
        const verso = poemasAlejandra[i];
        try {
            logMessage(`Enviando [${i + 1}/${poemasAlejandra.length}]...`);
            const response = await axios.post(apiUrl, {
                number: targetNumber,
                message: verso
            }, { headers });
            logMessage(`[ENTREGADO ${i + 1}/${poemasAlejandra.length}]: "${verso.substring(0, 45)}..."`);
        } catch (error) {
            logMessage(`[ERROR en mensaje ${i + 1}]: ${error.message}`);
            if (error.response) {
                logMessage(`Detalle del servidor: ${JSON.stringify(error.response.data)}`);
            }
        }

        if (i < poemasAlejandra.length - 1) {
            await new Promise(resolve => setTimeout(resolve, intervalMs));
        }
    }

    logMessage(`✨ Proceso completado. Los ${poemasAlejandra.length} poemas han sido enviados a Alejandra.`);
}

process.on('uncaughtException', (err) => {
    logMessage(`FATAL: Error no capturado: ${err.message}\n${err.stack}`);
    process.exit(1);
});

enviarPoemas();
