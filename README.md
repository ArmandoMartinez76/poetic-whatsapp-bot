# Poetic WhatsApp Bot 🌹

Bot de automatización para WhatsApp diseñado para enviar mensajes poéticos, tiernos y formales de manera programada a través de una API HTTP local o mediante scripts autónomos. Utiliza `whatsapp-web.js` para la conexión y `express` para el servidor de envío.

Migrado a **pnpm v11+** con dependencias seguras, mitigación de vulnerabilidades de Chromium / Puppeteer y soporte para configuración mediante `.env`.

---

## ✨ Características

- **Gestor de paquetes moderno (pnpm):** Mayor velocidad de instalación, gestión eficiente de espacio en disco y protección contra scripts de instalación arbitrarios (`allowBuilds`).
- **Zero Vulnerabilidades Conocidas:** Dependencias auditadas con `pnpm audit` (0 vulnerabilidades), con `puppeteer` actualizado a la versión v25+ que mitiga riesgos en `extract-zip` y `basic-ftp`.
- **Conexión QR Rápida & Fallback HTML:** Generación de código QR en consola y exportación automática a `qr.html` para escaneo directo si `localhost:3000` tiene restricciones de red.
- **Seguridad en la API:**
  - Enlace por defecto a `127.0.0.1` (evita exponer el envío de mensajes a la red local sin autorización).
  - Autenticación opcional mediante encabezado `x-api-key` (configurable en `.env`).
  - Sanitización estricta de números telefónicos internacionales.
- **Modos de Envío:**
  - **Servidor HTTP:** Endpoint `POST /send-message` para integraciones externas o envíos coordinados.
  - **Scripts Autónomos:** Ejecución directa reutilizando la sesión persistente en `.wwebjs_auth`.

---

## 🚀 Requisitos

- **Node.js**: `>= 20.0.0` (LTS recomendado, e.g. Node 20 o Node 22)
- **pnpm**: `>= 10.0.0` (instalable con `corepack enable && corepack prepare pnpm@latest --activate`)

---

## 📦 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/ArmandoMartinez76/poetic-whatsapp-bot.git
   cd poetic-whatsapp-bot
   ```

2. **Configurar variables de entorno:**
   Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```
   Ajusta los valores deseados (`PORT`, `HOST`, `API_KEY`, `TARGET_NUMBER`).

3. **Instalar dependencias con pnpm:**
   ```bash
   pnpm install
   ```

---

## 🛠️ Uso y Autenticación QR

### 1. Iniciar el Servidor de WhatsApp
```bash
pnpm start
```
- Se generará un código QR en la consola.
- Si prefieres abrirlo en el navegador, ve a `http://localhost:3000/qr` o abre directamente el archivo generado `qr.html` con doble clic.
- Escanea el código desde tu app de WhatsApp (**Dispositivos vinculados > Vincular dispositivo**).
- La sesión quedará guardada de forma segura en `.wwebjs_auth` para reconexiones automáticas.

### 2. Enviar Mensajes a través de la API
```bash
curl -X POST http://localhost:3000/send-message \
  -H "Content-Type: application/json" \
  -d '{"number": "521XXXXXXXXXX", "message": "Hola, este es un mensaje poético."}'
```
*(Si configuraste `API_KEY` en `.env`, incluye el encabezado `-H "x-api-key: tu-clave"`).*

### 3. Scripts de Envío Programado
Puedes ejecutar los scripts configurados vía `pnpm run`:

- **Envío Masivo (100 poemas a través de la API con pausas aleatorias):**
  ```bash
  pnpm run send:masivo
  ```
- **Scripts autónomos directos:**
  ```bash
  pnpm run send:elia
  pnpm run send:alejandra
  pnpm run send:ivon
  pnpm run send:lidia
  pnpm run send:rosamaria
  ```

---

## 🔒 Auditoría de Seguridad

Para comprobar el estado de seguridad de los paquetes en cualquier momento:

```bash
pnpm audit
```

Actualmente: **0 vulnerabilidades reportadas**.
