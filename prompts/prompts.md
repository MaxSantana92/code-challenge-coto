# Registro de Prompts (AI Log)

Este documento registra el uso de herramientas de IA (ChatGPT/Gemini/Claude) durante el desarrollo del desafío, detallando el objetivo, el prompt utilizado y cómo se integró el resultado en el proyecto.

## 1. Configuración Inicial y Arquitectura

**Objetivo:** Instalación de dependencias.
**Herramienta:** Cursor

### Prompt:

> "Actúa como un Senior React Developer. Necesito según figma cuales son los componentes que debería instalar de shadcn?.
> Genera el comando para instalar las dependencias básicas: react-router-dom, axios, zustand, shadcn-ui."

**Aplicación y Ajustes:**

- Se utilizó el comando de instalación sugerido.
- **Ajuste manual:** Se modificó la configuración de `tailwind.config.js` para adaptar las variables CSS de Shadcn a la paleta naranja requerida por el diseño de Figma, ya que la IA sugirió una configuración genérica.

---

## 2. Pantalla de Inicio de Sesión (UI + Validaciones)

**Objetivo:** Implementar la pantalla "Iniciá sesión" según referencia visual, con Tailwind y lucide-react; agregar estados de error y mensajes de validación.

**Herramienta:** Cursor (ChatGPT)

### Prompt:

> "@src/modules/auth/view/login.tsx Actúa como un desarrollador experto en Frontend y UI/UX. Crea una página de 'Iniciar Sesión' utilizando React, Tailwind CSS y Lucide React (para íconos si son necesarios).\n>\n> Requisitos de Diseño Visual...\n> ...El código debe ser limpio y listo para producción."

**Aplicación y Ajustes:**

- Se creó la tarjeta centrada con fondo sutil, logo circular placeholder y CTA naranja.
- Se añadieron estados de focus ring naranja y sombras suaves para inputs/botón.
- Se incorporaron mensajes de error por campo y mensaje general al enviar, con bordes y texto en rojo cuando corresponde.

### Prompt (ajuste posterior):

> "Agrega los mensajes de error de validación"

**Aplicación y Ajustes:**

- Se añadieron estados controlados para email/contraseña y set de errores.
- Se mostraron textos de error rojos por campo y un mensaje general de credenciales inválidas.
- Se respetó el estilo mobile-first y el ancho acotado en desktop (tarjeta centrada).
