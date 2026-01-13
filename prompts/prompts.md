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

---

## 3. Dashboard de Reclutador (UI + Tabla Responsive)

**Objetivo:** Maquetar la página de Dashboard de reclutador mobile-first usando Tailwind + Shadcn UI, con navbar oscuro, card central con filtros, tabla de candidatos con avatar/badges/acciones y paginación; incluir `MOCK_CANDIDATES` hardcodeado (ver `src/modules/dashboard/view/Dashboard.tsx`).

**Herramienta:** Cursor (ChatGPT)

### Prompt:

> "Actúa como el 'Agente UI' experto en Tailwind CSS y Shadcn UI.\n> Necesito que maquetes la página `src/pages/Dashboard.tsx` basándote en el diseño de un Dashboard de Reclutador.\n> #### 1. Ten encuenta primero el diseño mobile\n> ### 2. Requerimientos de Datos (Hardcodeados)\n> Crea una constante `MOCK_CANDIDATES` dentro del archivo con 5 usuarios de ejemplo.\n> Estructura de datos:\n> - id: string\n> - name: string (Ej: \"Ana García\")\n> - email: string\n> - date: string (Fecha de ingreso, Ej: \"16/07/2025\")\n> - stack: string[] (Ej: [\"React\", \"Node.js\", \"Python\"])\n> - seniority: string (Ej: \"Senior\", \"Junior\")\n> ... (resto de filtros, tabla, badges, botones y paginación)\n> Genera el código completo del componente `Dashboard` exportado por defecto."

**Aplicación y Ajustes:**

- Se creó `MOCK_CANDIDATES` con 5 usuarios de ejemplo (nombre, email, fecha, stack, seniority).
- Navbar `bg-slate-900` con CTA ghost, card blanca con header durazno (`bg-orange-50`), filtros con `Select` e `Input`.
- Tabla `Table` con avatar fallback inicial, badges `secondary` y contador `+X`, botones `outline` y `default` naranja, paginación compacta.
- Enfoque mobile-first con scroll horizontal en tabla (`overflow-x-auto` en contenedor) para mantener responsividad.

---

## 4. Unificación de modales con `ModalShell`

**Objetivo:** Evitar duplicación de `Dialog` creando un contenedor reutilizable (`ModalShell`) y adaptar `ContactModal` y `CandidateDetailModal` para usarlo, manteniendo el estilo durazno y los triggers existentes en el Dashboard.

**Herramienta:** Cursor (ChatGPT)

### Prompt:

> "podemos hacer un modal global y que solo se le pase el componente hijo? para no tener dos modales distintos y aplicar buenas prácticas de reutlización de componentes"
>
> "Implement the plan as specified..."

**Aplicación y Ajustes:**

- Se creó `ModalShell` en `src/components/ModalShell.tsx` con control `open/onOpenChange`, trigger opcional, título/subtítulo y estilos comunes.
- `ContactModal` (`src/components/ContactModal.tsx`) ahora usa `ModalShell`; mantiene icono y formulario RHF+Zod.
- `CandidateDetailModal` (`src/components/CandidateDetailModal.tsx`) usa `ModalShell`; conserva layout durazno y stack en badges.
- Dashboard sigue abriendo “Ver Detalle” y “Contactar” con los mismos triggers.

### Referencia del plan ejecutado

- Plan fuente: `@c:\Users\Max Santana\.cursor\plans\plan_unificar_modales_con_un_modalshell_reutilizable_87fc4bda.plan.md`.
- Tareas completadas: crear `ModalShell`, refactor de `ContactModal`, refactor de `CandidateDetailModal` y verificación de triggers en Dashboard.
