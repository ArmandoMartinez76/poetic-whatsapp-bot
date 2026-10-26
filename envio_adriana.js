require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const targetNumber = process.env.TARGET_NUMBER || '5215530516910';
const apiUrl = process.env.API_URL || 'http://127.0.0.1:3000/send-message';
const apiKey = process.env.API_KEY || null;
const intervalMs = parseInt(process.env.INTERVAL_MS, 10) || 1500;

const poemasAdriana = [
    "Adriana, desde que llegaste a mi vida, cada uno de mis días lleva grabado tu nombre.",
    "Antes de ti, el mundo era un paisaje en escala de grises; tú le diste el primer color verdadero.",
    "Mis noches solían ser un laberinto de pesadillas, pero tu llegada las transformó en sueños de absoluta paz.",
    "Yo era una estructura agrietada por el tiempo y el dolor, y tú, con tu sola presencia, arreglaste lo que creí roto para siempre.",
    "Mi corazón y mi vida entera te pertenecen, sin condiciones ni reservas.",
    "Saber que compartes conmigo el anhelo sagrado de formar una familia me inunda de una alegría que no cabe en mi pecho.",
    "La idea de que quieras regalarme una nueva vida, un hijo fruto de nuestro amor, despierta en mí una fuerza descomunal.",
    "Por ti y por esa vida que soñamos, soy capaz de salir y enfrentarme al mundo entero, a cualquier tormenta, con tal de verte bien.",
    "Mi único propósito en esta tierra es hacerte feliz cada amanecer que me quede por vivir.",
    "No hay mayor recompensa para mi esfuerzo que contemplar tu sonrisa al final del día.",
    "Las horas lejos de ti se convierten en un verdadero infierno; no concibo, ni quiero, una vida donde no estés tú.",
    "Mis ojos se humedecen solo con presentir tu ausencia, porque este amor no conoce medias tintas.",
    "Cuando estoy a tu lado, el reloj se detiene, el aire pesa menos y la existencia entera se disfruta de verdad.",
    "Sé muy bien la bestia de carácter y de sombras que suelo ser, y por eso adoro con el alma que hayas decidido compartir tu vida conmigo.",
    "Eres el bálsamo que amansa mi fiereza y el fuego que le da calor a mis inviernos.",
    "Te amo con la seriedad de un juramento de sangre y con la ternura más profunda que un hombre puede sentir.",
    "Adriana, tú no solo llegaste a acompañarme; llegaste a rescatarme de mi propio desierto.",
    "Todo lo que construyo con mis manos tiene como único destino tu paz y tu bienestar.",
    "Me asombra la generosidad de tu alma al elegir caminar junto a mí en esta vida.",
    "Contigo aprendí que el amor verdadero no debilita, sino que otorga una armadura indestructible.",
    "Eres mi hogar, el único lugar en el universo donde no necesito defenderme de nada.",
    "Pensar en nuestro futuro juntos me da una razón inquebrantable para levantarme cada mañana.",
    "La sola ilusión de ver crecer nuestra propia familia llena de orgullo cada latido de mi pecho.",
    "Si tengo que mover montañas para proteger tu tranquilidad, lo haré sin dudar un solo segundo.",
    "Tu risa es el sonido más sagrado que ha escuchado mi casa y mi corazón.",
    "Lejos de tus brazos, el tiempo se estira como un castigo insoportable.",
    "Esta vida no sería más que un trámite vacío si no tuviera el privilegio de amarte.",
    "Eres la calma en medio de mi caos y la dirección cuando el camino se torna incierto.",
    "Me arrodillo ante la pureza de tu corazón y me pongo de pie frente al mundo para defenderte.",
    "Adriana, mi devoción por ti no depende de las circunstancias; es un compromiso eterno.",
    "Cuando me miras a los ojos, siento que todo lo difícil que viví en el pasado valió la pena solo para llegar a ti.",
    "Me enseñaste que los sueños no son fantasías, sino realidades que podemos edificar juntos.",
    "El regalo de un bebé contigo es la bendición más grande que jamás me atreví a pedirle al destino.",
    "Seré el guardián incondicional de tus pasos y el refugio seguro donde siempre puedas descansar.",
    "No existe orgullo en mí cuando se trata de admitir que te necesito para ser feliz.",
    "Tu voz tiene el poder de disipar la peor de mis amarguras en un solo instante.",
    "Cada caricia tuya borra una cicatriz de las tantas que cargaba antes de conocerte.",
    "Te elijo a ti en los días fáciles y, con más fuerza aún, en los días difíciles.",
    "Amar a Adriana es la decisión más lúcida, hermosa y firme que he tomado en mi vida.",
    "Tu bienestar es mi primera y última prioridad de cada jornada.",
    "A veces me quedo mirándote en silencio, agradeciendo al cielo el milagro de tenerte.",
    "No busco la perfección, busco envejecer contigo sosteniendo tu mano.",
    "Mi amor por ti no hace ruido con palabras vacías; se demuestra con lealtad y hechos inquebrantables.",
    "Eres la mujer que logró tocar la fibra más profunda de este corazón curtido.",
    "En un mundo lleno de falsedad, tu mirada es la verdad más hermosa que conozco.",
    "Cada noche que no duermo a tu lado es una noche perdida para mi espíritu.",
    "Formar un hogar contigo no es solo un plan; es el mayor de mis anhelos sagrados.",
    "Tu ternura me desarma, pero al mismo tiempo me hace el hombre más fuerte sobre la faz de la tierra.",
    "No hay tormenta que me asuste si sé que al regresar a casa estarás tú esperándome.",
    "Adriana, te amo con cada fibra, con cada hueso y con cada gota de mi sangre.",
    "Llegaste a reconstruir mis ruinas y convertiste mis cenizas en un jardín con futuro.",
    "Ver la vida germinar en nuestro nido de amor será la culminación de todos mis anhelos.",
    "Gracias por la paciencia con la que tratas a este hombre que a veces olvida ser suave.",
    "Por ti dejo atrás cualquier sombra y abrazo la luz que solo tú sabes regalarme.",
    "El tiempo a tu lado no corre, se saborea despacio, como los mejores momentos de la eternidad.",
    "Si el mundo entero se opusiera a nosotros, no dudaría ni un instante en elegirte a ti.",
    "Eres la corona de mi vida, la reina indiscutible de mis pensamientos y mis esfuerzos.",
    "Me duele el alma cuando veo tristeza en tus ojos; daría lo que fuera por mantener tu risa eterna.",
    "Dios o el destino tuvieron una bondad infinita conmigo el día en que cruzaron nuestros senderos.",
    "Tu compañía hace que las cargas más pesadas se vuelvan ligeras como el viento.",
    "Cada detalle tuyo me enamora con una seriedad que jamás imaginé experimentar.",
    "Eres mi principio, mi presente y la única meta a la que deseo llegar.",
    "No hay espacio en mi pecho para nadie más; estás tú, ocupándolo todo por completo.",
    "Me esfuerzo a diario para que nunca te falte un motivo para sentirte orgullosa de mí.",
    "El solo roce de tus dedos calma la marea más violenta que pueda existir en mi mente.",
    "Adriana, amarte es mi mayor deber y mi mayor honor como hombre.",
    "Quiero ser el escudo que te proteja de cualquier injusticia del mundo exterior.",
    "Tu risa es la música que le devuelve la armonía a mis días más oscuros.",
    "Nada en esta vida tiene sabor si no estás tú para compartir la mesa conmigo.",
    "Me conmueve hasta las lágrimas imaginar la dulzura de tus ojos reflejada en un hijo nuestro.",
    "Por ese sueño de familia no habrá reto que me detenga ni montaña que no pueda escalar.",
    "Eres mi sol en los días nublados y mi brújula en medio de la tempestad.",
    "Sé que puedo ser duro por fuera, pero por dentro solo hay devoción y adoración para ti.",
    "Mi lealtad hacia ti es total, incondicional y para siempre.",
    "Me enseñaste a creer en el amor cuando ya había dejado de esperar nada de la vida.",
    "Tu piel es mi lugar favorito en el mundo y tu abrazo mi única trinchera.",
    "Si pudiera elegir de nuevo mi destino mil veces, mil veces te volvería a elegir a ti, Adriana.",
    "La soledad antes me parecía un refugio; hoy sé que solo era la antesala para recibirte a ti.",
    "Cada latido mío te confirma que mi existencia encontró su rumbo exacto a tu lado.",
    "No concibo envejecer si no es mirando las arrugas que el tiempo dibuje en tu sonrisa.",
    "Gracias por mirar más allá de mis defectos y amar al hombre que verdaderamente soy.",
    "Eres mi más hermoso milagro, la prueba viviente de que la bondad y la belleza coexisten.",
    "Cada sacrificio vale la pena si al final de la jornada puedo envolverte entre mis brazos.",
    "Tu amor me devolvió las ganas de soñar despierto y de pelear por un mañana mejor.",
    "Te amo no solo por lo que eres, sino por la mejor versión de mí que nace cuando estoy contigo.",
    "Las horas sin ti duelen como fuego en el pecho; necesito tu cercanía para estar completo.",
    "Prometo cuidar de ti, de tu corazón y de nuestro futuro con mi propia vida.",
    "Serás la madre más hermosa y amorosa que este universo haya contemplado jamás.",
    "Mi promesa hacia ti no se borra con el viento; está esculpida en la roca más firme de mi alma.",
    "Eres el mayor regalo que jamás merecí, pero prometo honrarlo cada segundo de mi vida.",
    "Adriana, tu amor le dio sentido a cada paso que di en el pasado, incluso a los más dolorosos.",
    "En tus manos pongo mis debilidades, sabiendo que tú eres la única que sabe cuidarlas.",
    "Contigo no tengo miedo de mostrarme vulnerable, porque en tu amor encontré mi santuario.",
    "Que el mundo entero se caiga a pedazos si quiere; mientras te tenga a ti, nada me falta.",
    "Mi amor por ti es firme, constante, paciente y ferozmente protector.",
    "Disfruto tu voz, tu respiración, tus silencios y cada mirada cómplice que me regalas.",
    "Eres y serás por siempre el gran y único amor de mi vida, Adriana.",
    "Gracias por elegir a esta bestia y convertirla, con tu ternura, en el hombre más afortunado.",
    "Te amo con toda la fuerza que habita en mi pecho, con todo el respeto y con toda mi alma.",
    "Mi vida entera te pertenece, Adriana. Hoy, mañana y por el resto de la eternidad."
];

function logMessage(msg) {
    const timestamp = new Date().toISOString();
    const content = `[${timestamp}] ${msg}\n`;
    fs.appendFileSync('envio_adriana.log', content);
    console.log(content.trim());
}

async function enviarPoemas() {
    logMessage(`Iniciando envío de 100 poemas a Adriana (${targetNumber})...`);
    logMessage(`Total de mensajes: ${poemasAdriana.length} | Intervalo: ${intervalMs} ms`);

    const headers = apiKey ? { 'x-api-key': apiKey } : {};

    for (let i = 0; i < poemasAdriana.length; i++) {
        const verso = poemasAdriana[i];
        try {
            logMessage(`Enviando [${i + 1}/${poemasAdriana.length}]...`);
            const response = await axios.post(apiUrl, {
                number: targetNumber,
                message: verso
            }, { headers });
            logMessage(`[ENTREGADO ${i + 1}/${poemasAdriana.length}]: "${verso.substring(0, 45)}..."`);
        } catch (error) {
            logMessage(`[ERROR en mensaje ${i + 1}]: ${error.message}`);
            if (error.response) {
                logMessage(`Detalle del servidor: ${JSON.stringify(error.response.data)}`);
            }
        }

        if (i < poemasAdriana.length - 1) {
            await new Promise(resolve => setTimeout(resolve, intervalMs));
        }
    }

    logMessage(`✨ Proceso completado. Los ${poemasAdriana.length} poemas han sido enviados a Adriana.`);
}

process.on('uncaughtException', (err) => {
    logMessage(`FATAL: Error no capturado: ${err.message}\n${err.stack}`);
    process.exit(1);
});

enviarPoemas();
