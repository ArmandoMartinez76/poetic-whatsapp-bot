require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const targetNumber = process.env.TARGET_NUMBER || '5215569659798';
const apiUrl = process.env.API_URL || 'http://127.0.0.1:3000/send-message';
const apiKey = process.env.API_KEY || null;
const intervalMs = parseInt(process.env.INTERVAL_MS, 10) || 1500;

const poemasElizabeth = [
    "Elizabeth, eres y serás siempre la niña de mis ojos, la luz más tierna y sagrada que la vida me ha concedido.",
    "Si hoy sigo aquí, de pie frente al mundo y sus tormentas, es únicamente por amor. Es por ti, Eli.",
    "Tu carita me brinda una tranquilidad y una pureza que jamás he encontrado en ningún otro rincón de esta tierra.",
    "Me arrepiento desde lo más profundo de mi alma si alguna vez, con mi torpeza o mis silencios, te he hecho sentir mal.",
    "Me castigo a mí mismo por cada fallo, porque lastimarte a ti es herir la única parte pura y viva de mi corazón.",
    "Disfruto de tu presencia, de tu mirar y de tu existencia como nunca en la vida he disfrutado nada ni a nadie.",
    "Mírame a los ojos a través de estas palabras: jamás me daré por vencido ante nada ni nadie con tal de estar a tu lado.",
    "Hay tempestades que intentan apagarlo todo, pero este amor por ti es una roca firme que nada podrá quebrar.",
    "Cuando el mundo se vuelve ruidoso y pesado, solo necesito recordar la calma de tu rostro para volver a respirar.",
    "No es costumbre ni es capricho; es una devoción seria, madura y eterna la que me une a ti, mi niña.",
    "Perdóname por mis sombras y mis fallas humanas; mi mayor anhelo cada día es aprender a ser el hombre que mereces.",
    "Estar contigo le da sentido a cada batalla que libro; tú eres mi paz, mi meta y mi mayor refugio.",
    "Cada segundo a tu lado vale más que una vida entera en soledad. Disfruto cada instante tuyo como un regalo sagrado.",
    "Sé que el camino a veces se torna difícil, pero por ti estoy dispuesto a cruzar cualquier desierto sin vacilar.",
    "Tu carita es el remanso de pureza donde mi alma descansa después de tanto naufragar.",
    "Si alguna vez dudaste de lo que provocas en mí, hoy quiero que sepas que eres el motor absoluto de mi existencia.",
    "No hay obstáculo, distancia ni orgullo capaz de frenar lo que siento por ti, Elizabeth.",
    "Me duele el pecho cuando pienso que pude causarte tristeza; mi compromiso es sanar cada herida con devoción.",
    "En ti encontré la nobleza que creí perdida en este mundo, y por eso te cuido como al más valioso de los tesoros.",
    "Eres mi alegría más honesta, la niña que despierta mi ternura más profunda y mi lealtad más inquebrantable.",
    "Seguiré luchando por nosotros, hoy, mañana y siempre, porque lo nuestro vale cada aliento de mi vida.",
    "Te amo con una seriedad que no conoce dudas y con un romanticismo que arde sin extinguirse.",
    "Gracias por existir, gracias por iluminar mis días y por permitirme amarte con cada fibra de mi ser.",
    "Mi corazón no tiene otro norte que no seas tú, Eli. Te amo con toda mi alma, para siempre."
];

function logMessage(msg) {
    const timestamp = new Date().toISOString();
    const content = `[${timestamp}] ${msg}\n`;
    fs.appendFileSync('envio_elizabeth.log', content);
    console.log(content.trim());
}

async function enviarPoemas() {
    logMessage(`Iniciando envío de poemas a Elizabeth (${targetNumber})...`);
    logMessage(`Total de mensajes: ${poemasElizabeth.length} | Intervalo: ${intervalMs} ms`);

    const headers = apiKey ? { 'x-api-key': apiKey } : {};

    for (let i = 0; i < poemasElizabeth.length; i++) {
        const verso = poemasElizabeth[i];
        try {
            logMessage(`Enviando [${i + 1}/${poemasElizabeth.length}]...`);
            const response = await axios.post(apiUrl, {
                number: targetNumber,
                message: verso
            }, { headers });
            logMessage(`[ENTREGADO ${i + 1}/${poemasElizabeth.length}]: "${verso.substring(0, 45)}..."`);
        } catch (error) {
            logMessage(`[ERROR en mensaje ${i + 1}]: ${error.message}`);
            if (error.response) {
                logMessage(`Detalle del servidor: ${JSON.stringify(error.response.data)}`);
            }
        }

        // Intervalo solicitado de 1.5 segundos
        if (i < poemasElizabeth.length - 1) {
            await new Promise(resolve => setTimeout(resolve, intervalMs));
        }
    }

    logMessage(`✨ Proceso completado. Los ${poemasElizabeth.length} poemas han sido enviados a Elizabeth.`);
}

process.on('uncaughtException', (err) => {
    logMessage(`FATAL: Error no capturado: ${err.message}\n${err.stack}`);
    process.exit(1);
});

enviarPoemas();
