const axios = require('axios');
const fs = require('fs');

const mensajes = [
    "A veces el silencio es mi único refugio, pero hoy quiero que mis palabras sean tu hogar.",
    "Perdona a este hombre que a veces olvida cómo expresar lo que el alma ya sabe.",
    "Eres el sol que se filtra por las grietas de mi armadura de piedra.",
    "No soy perfecto, soy una obra en construcción que solo tú sabes terminar.",
    "Cada latido mío susurra tu nombre, incluso cuando mis labios callan.",
    "Mi soledad era un desierto hasta que tus pasos lo convirtieron en jardín.",
    "Sé que puedo parecer una bestia sin sentimientos, pero por dentro solo hay devoción por ti.",
    "Me esfuerzo cada día por romper este caparazón que me impide decirte cuánto te amo.",
    "Tú no solo me acompañas, tú me rescatas de mi propia oscuridad.",
    "Eres mi eterna luz, el sol que nunca se pone en mi horizonte.",
    "Aprendo de la vida solo cuando te miro a los ojos.",
    "Mi vida dejó de ser un 'yo' para convertirse en un 'nosotros'.",
    "Tu sabiduría me asombra, pero más me asombra tu paciencia conmigo.",
    "Perdona mi torpeza al expresar lo que siento; mi corazón es más grande que mi vocabulario.",
    "Estoy atado a ti no por necesidad, sino por la libertad de haberte elegido.",
    "Cada mañana me levanto con el firme propósito de ser mejor para ti.",
    "No es conveniencia lo que me mueve, es este amor que me quema y me salva.",
    "Eres la razón por la que mi oscuridad decidió volverse luz.",
    "Mi alma sufre cuando el silencio nos separa por un mal momento.",
    "Quiero que sepas que mi ser entero te pertenece, sin reservas.",
    "Eres mi maestra en el arte de sentir, y yo soy tu alumno más aplicado.",
    "Tu calor es el único que logra derretir este frío que a veces guardo.",
    "Me enamoro de ti en cada gesto, en cada palabra, en cada silencio compartido.",
    "Tu amor es el norte que guía a este barco perdido en su propia soledad.",
    "Gracias por enseñarme que el mundo es mucho más de lo que yo creía saber.",
    "Mi corazón late con una fuerza que antes no conocía, y es por ti.",
    "Eres el motor de mi cambio, la fuerza que me impulsa a ser el hombre ideal.",
    "Perdona mis ausencias emocionales; estoy aprendiendo a estar presente para ti.",
    "Nada en mi vida tiene sentido si no estás tú para darle color.",
    "Eres el regalo que la vida me dio para demostrarme que la belleza existe.",
    "Mi vida es tuya, no porque la hayas pedido, sino porque yo te la entregué.",
    "Cada día que pasa es una oportunidad nueva para demostrarte que te adoro.",
    "Tu risa es la melodía que calma las tormentas de mi mente.",
    "Siento un arrepentimiento profundo por cada vez que no supe estar a tu altura.",
    "Estoy cambiando, no por obligación, sino por el deseo puro de verte feliz.",
    "Eres la luz que ilumina mis sombras más profundas.",
    "Mi corazón está encadenado a tu amor, y nunca me sentí tan libre.",
    "Eres el sol de mis días y la luna de mis noches de pensamiento.",
    "No hay mayor tesoro para mí que tu presencia en mi vida.",
    "Me esfuerzo como un loco por ser ese hombre que te haga sonreír cada día.",
    "Tu amor me ha dado una nueva perspectiva de lo que significa vivir.",
    "Eres el faro que me guía de vuelta a casa cuando me pierdo en mí mismo.",
    "Perdóname por ser tan poco expresivo; por dentro hay un incendio de amor.",
    "Mi vida se oscurece cuando no estamos bien, porque tú eres mi claridad.",
    "Eres la persona que vino a cambiar mi mundo de la forma más hermosa.",
    "Cada palabra tuya es una lección de vida que guardo en mi alma.",
    "Mi devoción por ti es absoluta, infinita y verdadera.",
    "Eres la única que tiene la llave de mi corazón de piedra.",
    "Me arrepiento de mis sombras, pero agradezco que tú seas mi luz.",
    "Tu amor es el aire que respiro cuando siento que el mundo me ahoga.",
    "Eres mi todo, mi hoy, mi mañana y mi siempre.",
    "Nunca imaginé que alguien pudiera enseñarme tanto sobre el amor.",
    "Mi corazón sufre cuando te causo algún inconveniente, perdóname.",
    "Eres el sol que brinda calor a mi alma solitaria.",
    "Estoy decidido a ser el hombre que mereces, paso a paso, pero sin descanso.",
    "Tu presencia es el milagro que le ocurrió a mi vida.",
    "Eres la maestra de mi corazón, la que me enseña a ser humano.",
    "Mi vida ya no me pertenece, ahora es parte de tu historia.",
    "Cada día encuentro una nueva razón para amarte más profundamente.",
    "Eres la luz eterna que disipa mis dudas y mis miedos.",
    "Perdóname por mis silencios; a veces el amor me deja sin palabras.",
    "Tu sabiduría es el regalo que más valoro de nuestra relación.",
    "Eres mi sol, mi luz, mi calor y mi razón de ser.",
    "Mi alma está atada a la tuya con hilos de eternidad.",
    "Me esfuerzo por ser mejor, porque tú te mereces lo mejor del mundo.",
    "Eres el cambio más hermoso que ha experimentado mi vida.",
    "Mi corazón late por ti, en una danza de amor y gratitud.",
    "Perdona mi forma de ser solitaria; contigo he aprendido a compartir mi alma.",
    "Eres el sol que brilla en mi oscuridad profunda.",
    "Mi vida es una búsqueda constante de tu felicidad.",
    "Te adoro con un sentimiento que va más allá de lo que puedo expresar.",
    "Eres mi maestra, mi guía y mi eterno amor.",
    "Mi corazón es tuyo, hoy y para siempre.",
    "Me arrepiento de no haber sido más expresivo antes, pero hoy quiero cambiar eso.",
    "Eres la luz que me guía en los momentos más difíciles.",
    "Mi vida se ilumina con solo pensar en ti.",
    "Eres el sol que calienta mi corazón en los días fríos.",
    "Me esfuerzo cada día por ser el hombre ideal para ti.",
    "Tu amor es el motor que me impulsa a ser mejor cada segundo.",
    "Eres la persona más importante de mi vida, mi todo.",
    "Mi corazón está lleno de amor por ti, y quiero que lo sepas siempre.",
    "Perdóname por mis errores; mi amor por ti es lo único perfecto en mí.",
    "Eres el sol que brilla en mi cielo, dándome luz y esperanza.",
    "Mi vida es más hermosa desde que tú estás en ella.",
    "Eres la maestra que me enseñó el verdadero significado del amor.",
    "Mi corazón late con alegría cada vez que escucho tu nombre.",
    "Te adoro, Ileny, con toda la fuerza de mi alma.",
    "Eres mi eterno sol, la luz que ilumina mi camino.",
    "Mi vida es tuya, y me esfuerzo por hacerla digna de ti.",
    "Cada día es una nueva oportunidad para amarte mejor.",
    "Eres la razón por la que mi corazón decidió volver a latir con fuerza.",
    "Perdóname por mis sombras; tú eres la luz que las disipa.",
    "Tu amor es el regalo más preciado que he recibido.",
    "Eres mi maestra de vida, la que me enseña a ser mejor persona.",
    "Mi corazón te pertenece por completo, sin condiciones.",
    "Me esfuerzo por ser el hombre que te haga sentir orgullosa.",
    "Eres el sol que ilumina mi vida y calienta mi alma.",
    "Mi amor por ti crece con cada respiración que doy.",
    "Te adoro, Ileny, eres mi vida entera.",
    "Mi corazón está atado a ti con un amor que nunca terminará."
];

const targetNumber = '5217333432538';
const apiUrl = 'http://localhost:3000/send-message';

// Función para registrar logs inmediatamente
function logMessage(msg) {
    const timestamp = new Date().toISOString();
    const content = `[${timestamp}] ${msg}\n`;
    fs.appendFileSync('envio_masivo.log', content);
    console.log(content.trim());
}

async function enviarMensajes() {
    logMessage("Iniciando proceso de envío de 100 poemas...");
    for (let i = 0; i < mensajes.length; i++) {
        const msg = mensajes[i];
        try {
            logMessage(`Intentando enviar mensaje ${i + 1}/100...`);
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

        const waitTime = Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000;
        logMessage(`Esperando ${waitTime / 1000} segundos para el siguiente...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    logMessage("Proceso completo de 100 mensajes finalizado.");
}

// Ejecución con manejo de errores global
process.on('uncaughtException', (err) => {
    logMessage(`FATAL: Error no capturado: ${err.message}\nStack: ${err.stack}`);
    process.exit(1);
});

enviarMensajes();
