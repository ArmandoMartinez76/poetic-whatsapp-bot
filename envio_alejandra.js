const axios = require('axios');
const fs = require('fs');

const mensajes = [
    "Alejandra, eres una niña muy hermosa, por dentro y por fuera.",
    "Eres la persona más tierna y sincera que he tenido la dicha de conocer.",
    "Poco a poco, con tu dulzura, te has ido ganando mi corazón.",
    "Siento que algo muy especial se está creando en este corazón por ti.",
    "Tu sinceridad es un soplo de aire fresco que me cautiva cada día.",
    "No puedo evitar sonreír cada vez que pienso en tu ternura.",
    "Eres un ser de luz que ha llegado a mi vida para darle un nuevo color.",
    "Mi corazón empieza a latir con un ritmo diferente desde que estás cerca.",
    "En tu mirada encuentro una paz que no sabía que necesitaba.",
    "Eres la definición de pureza y bondad, Alejandra.",
    "Cada detalle tuyo me confirma lo especial que eres para mí.",
    "Me encanta cómo tu ternura desarma cualquier defensa en mi alma.",
    "Eres esa niña hermosa que se ha convertido en mi pensamiento constante.",
    "Siento que este sentimiento por ti crece con cada palabra que compartimos.",
    "Gracias por ser tan auténtica; es lo que más me atrae de ti.",
    "Eres el refugio de ternura donde mi corazón desea descansar.",
    "Algo mágico está naciendo entre nosotros, y me encanta sentirlo.",
    "Tu belleza es innegable, pero tu alma es lo que realmente me ha conquistado.",
    "Alejandra, mi corazón ya tiene grabado tu nombre con letras de cariño.",
    "Eres la persona más transparente que he conocido, y eso vale oro.",
    "Me fascinas de una manera que me cuesta explicar con palabras.",
    "Cada día que pasa, te vas adueñando un poquito más de mis latidos.",
    "Tu ternura es el imán que atrae todos mis sentimientos hacia ti.",
    "Eres una niña encantadora que ha despertado mi lado más dulce.",
    "Siento una conexión contigo que va más allá de lo superficial.",
    "Tu sinceridad es la brújula que me hace confiar plenamente en ti.",
    "Eres el sueño más tierno que mi corazón se ha atrevido a soñar.",
    "Me tienes cautivado con esa forma de ser tan única y especial.",
    "Algo muy grande se está gestando en mi pecho por ti, Alejandra.",
    "Eres la mujer más hermosa por la sencillez y ternura que irradias.",
    "Gracias por dejarme entrar en tu mundo; es un lugar maravilloso.",
    "Mi corazón te busca en cada silencio y te encuentra en cada suspiro.",
    "Eres la persona más dulce que ha cruzado mi camino en mucho tiempo.",
    "Me encanta cómo te has ido ganando mi cariño paso a pasito.",
    "Tu sola presencia hace que todo a mi alrededor sea más bello.",
    "Siento que el destino nos tiene preparada una historia hermosa.",
    "Eres la niña de mis ojos, la que despierta mi ternura infinita.",
    "Tu honestidad es el cimiento sobre el cual quiero construir este sentimiento.",
    "Eres un tesoro de sinceridad en un mundo lleno de apariencias.",
    "Alejandra, lo que siento por ti es real, puro y crece sin descanso.",
    "Me pierdo en la dulzura de tu voz y en la sinceridad de tu risa.",
    "Eres esa luz tierna que ilumina mis días más oscuros.",
    "Mi corazón late con fuerza porque sabe que tú eres alguien especial.",
    "Eres la persona más linda que he conocido, en todos los sentidos.",
    "Me fascina cómo con un simple gesto logras alegrarme la vida.",
    "Siento que este corazón ya te pertenece más de lo que imaginas.",
    "Tu ternura es el bálsamo que cura cualquier herida de mi alma.",
    "Eres una niña maravillosa que merece todo el amor del mundo.",
    "Estoy convencido de que lo que estamos creando es algo único.",
    "Alejandra, te has ganado mi corazón por completo, y soy feliz por ello."
];

const targetNumber = '5215569724199';
const apiUrl = 'http://localhost:3000/send-message';

function logMessage(msg) {
    const timestamp = new Date().toISOString();
    const content = `[${timestamp}] ${msg}\n`;
    fs.appendFileSync('envio_alejandra.log', content);
    console.log(content.trim());
}

async function enviarMensajes() {
    logMessage("Iniciando proceso RÁPIDO de envío de 50 mensajes para Alejandra...");
    for (let i = 0; i < mensajes.length; i++) {
        const msg = mensajes[i];
        try {
            logMessage(`Intentando enviar mensaje ${i + 1}/50...`);
            const response = await axios.post(apiUrl, {
                number: targetNumber,
                message: msg
            });
            logMessage(`EXITOSO: ${msg.substring(0, 30)}... (Respuesta: ${response.status})`);
        } catch (error) {
            logMessage(`ERROR enviando mensaje ${i + 1}: ${error.message}`);
        }

        // Intervalo rápido: entre 2 y 5 segundos
        const waitTime = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
        logMessage(`Esperando ${waitTime / 1000} segundos para el siguiente...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    logMessage("Proceso RÁPIDO de 50 mensajes para Alejandra finalizado.");
}

process.on('uncaughtException', (err) => {
    logMessage(`FATAL: Error no capturado: ${err.message}`);
    process.exit(1);
});

enviarMensajes();
