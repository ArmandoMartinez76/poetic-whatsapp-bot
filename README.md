# Poetic WhatsApp Bot 🌹

Este es un bot de automatización para WhatsApp diseñado para enviar mensajes poéticos, tiernos y formales de manera programada a través de una API local o mediante scripts autónomos. Utiliza la biblioteca `whatsapp-web.js` para la conexión y `express` para el servidor de envío.

## ✨ Características

- **Conexión QR Súper Rápida & Fallback HTML:** Generación de código QR en la consola y creación automática del archivo `qr.html` en el disco. Si `localhost:3000` tiene problemas de conexión o firewall, solo haz doble clic en `qr.html` para escanear de inmediato.
- **Modo Servidor & Modo Autónomo Directo:**
  - **Servidor HTTP:** Endpoint `/send-message` para integrar con cualquier herramienta externa.
  - **Scripts Autónomos:** Ejecución directa reutilizando la sesión guardada en `.wwebjs_auth` sin necesidad de servidor HTTP intermedio.
- **Scripts Personalizados:** Ejemplos incluidos para envíos masivos y personalizados con intervalos aleatorios humanizados para evitar bloqueos.
- **Seguridad:** Configurado con `.gitignore` para no subir sesiones de WhatsApp, códigos QR ni logs personales a GitHub.

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

## 🛠️ Uso y Autenticación QR

### ⚡ Opción A: Escaneo de QR Rápido (Recomendado si `localhost` falla)

1. Inicia el servidor para generar el QR:
   ```bash
   node index.js
   ```
2. Si `http://localhost:3000/qr` no carga por restricciones de proxy o firewall local, **simplemente abre el archivo `qr.html`** generado automáticamente en la carpeta del proyecto en tu navegador preferido.
3. Abre WhatsApp en tu teléfono ➔ **Dispositivos vinculados** ➔ **Vincular dispositivo** y escanea la imagen de `qr.html`.

### 📩 Opción B: Ejecución de Scripts de Envío

Una vez escaneado el QR y guardada la sesión en `.wwebjs_auth`, puedes ejecutar cualquiera de los scripts autónomos o el servidor:

- **Para Ivon (Sensual & Erótico Elegante - 25 Mensajes):**
  ```bash
  node envio_ivon.js
  ```
- **Para Elia (Modo Conquista - 25 Poemas Inteligentes & Coquetos):**
  ```bash
  node envio_elia.js
  ```
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

- `index.js`: Servidor Express y generación de QR / `qr.html`.
- `envio_elia.js`: Script autónomo para Elia (25 poemas sin frases pesadas como "te amo", con pausa de ~3.5s).
- `envio_*.js`: Scripts independientes con colecciones de poemas y lógica de envío.
- `qr.html`: Archivo HTML auto-generado para visualización directa del QR en el navegador (ignorado por git).
- `.gitignore`: Protección de archivos sensibles (`node_modules`, `.wwebjs_auth`, `*.log`, `qr.html`).

## 💡 Buenas Prácticas & Tips de Velocidad

- **Problemas de Conexión Localhost (`ERR_CONNECTION_REFUSED`):** Utilizar siempre la apertura directa de `qr.html` en el navegador. No depende de puertos ni redes locales.
- **Persistencia de Sesión:** Una vez vinculado con el QR, la sesión se mantiene en `.wwebjs_auth`. Los scripts futuros iniciarán de inmediato sin pedir QR de nuevo.
- **Intervalos Anti-Bloqueo:** Mantener pausas de al menos 3 a 5 segundos entre mensajes para simular comportamiento humano.
- **Logs de Auditoría:** El progreso de cada envío se guarda localmente en archivos `.log` (ej: `envio_elia.log`).

---
*Creado con pasión por la poesía y la tecnología.*
