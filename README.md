# Poetic WhatsApp Bot 🌹

Este es un bot de automatización para WhatsApp diseñado para enviar mensajes poéticos, tiernos y formales de manera programada a través de una API local. Utiliza la biblioteca `whatsapp-web.js` para la conexión y `express` para el servidor de envío.

## ✨ Características

- **Conexión QR:** Autenticación sencilla escaneando un código QR desde el navegador.
- **API Local:** Endpoint `/send-message` para integrar con cualquier script de Node.js o herramienta externa.
- **Scripts Personalizados:** Ejemplos incluidos para envíos masivos con intervalos aleatorios para evitar bloqueos.
- **Seguridad:** Configurado con `.gitignore` para no subir sesiones de WhatsApp ni logs personales a GitHub.

## 🚀 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/ArmandoMartinez76/poetic-whatsapp-bot.git
   cd poetic-whatsapp-bot
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

## 🛠️ Uso

### 1. Iniciar el Servidor Principal
Primero, debes iniciar el bot para que genere el código QR y mantenga la conexión activa:
```bash
node index.js
```
- Abre tu navegador en `http://localhost:3000/qr` para escanear el código QR.
- Una vez conectado, verás el mensaje "¡Conexión exitosa!" en la consola.

### 2. Ejecutar Scripts de Envío
Con el servidor `index.js` corriendo, puedes abrir otra terminal y ejecutar cualquiera de los scripts de envío:

- **Para Rosa María (Envío Elegante):**
  ```bash
  node envio_rosamaria.js
  ```
- **Para Alejandra (Envío Rápido):**
  ```bash
  node envio_alejandra.js
  ```
- **Para Lidia (Amistad):**
  ```bash
  node envio_lidia.js
  ```

## 📂 Estructura del Proyecto

- `index.js`: Servidor Express y cliente de WhatsApp.
- `envio_*.js`: Scripts independientes con colecciones de poemas y lógica de envío.
- `.gitignore`: Protección de archivos sensibles (`node_modules`, `.wwebjs_auth`, `*.log`).

## ⚠️ Notas Importantes
- **Intervalos:** Se recomienda mantener intervalos de al menos 15-30 segundos para envíos largos para proteger tu cuenta de WhatsApp.
- **Logs:** El progreso de cada envío se guarda localmente en archivos `.log` (ej: `envio_rosamaria.log`).

---
*Creado con pasión por la poesía y la tecnología.*
