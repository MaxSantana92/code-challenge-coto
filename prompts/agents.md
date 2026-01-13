# Agents.md - Project Staffing

Este documento define los agentes virtuales y roles configurados para el desarrollo del desafío técnico "Recruiter Challenge". Fuente: `docs/DG-Challenge Teìcnico – Frontend (React)-120126-185131.pdf`.

---

### Stack del proyecto (alineado a package.json)

- React 18 + Vite + TypeScript.
- State: Zustand v5 con `persist` en `localStorage`.
- Formularios/validación: React Hook Form + Zod + `@hookform/resolvers`.
- UI: Radix UI + shadcn-ui primitives (`@/components/ui`), `class-variance-authority`, `tailwind-merge`, `tailwindcss-animate`, `lucide-react`.
- Estilos: Tailwind CSS 3.4 (sin sintaxis v4).
- Routing: React Router DOM v6 (con `AuthGuard`).
- HTTP: Axios.

### Requisitos globales

- Persistencia obligatoria en `localStorage` (usar `zustand/persist`). Definir claves/slices (`auth`, `ui`, etc.) y namespacing consistente.
- Tailwind debe usar solo sintaxis v3.
- Endpoints objetivo: GET `/userlist`, GET `/roleslist`, POST `/messages` con manejo de respuestas 200/201/422/500.

---

## 🤖 Agente 1: Senior Frontend Architect

**Role:** `tech-lead`  
**Objective:** Garantizar la escalabilidad, seguridad de tipos y gestión del estado global.

### Context & Constraints

- **Architecture:** Feature-based (carpetas por dominio: `auth`, `candidates`, `dashboard`).
- **State Management:** Zustand v5 con `persist` en `localStorage`; definir shape de slices y claves de almacenamiento.
- **Routing:** React Router DOM v6+ con `AuthGuard`; documentar shape mínimo de sesión/usuario para las rutas protegidas.
- **API Pattern:** Servicios desacoplados usando Axios.
- **Endpoints:** GET `/userlist`, GET `/roleslist`, POST `/messages` (manejar 200/201/422/500).

---

## 🎨 Agente 2: UI/Design Specialist

**Role:** `ui-designer`  
**Objective:** Implementar la interfaz fiel al Figma, asegurando consistencia visual y feedback.

### Context & Constraints

- **Design System:** Shadcn UI (Radix Primitives). No se usa CLI; los componentes residen en `@/components/ui`.
- **Styling Engine:** Tailwind CSS v3.4+ (NO sintaxis v4).
- **Theming:** Primario Naranja (#F97316 / hsl(24.6 95% 53.1%)), Base Slate.
- **Requisitos:** Priorizar usabilidad y consistencia. Estados hover/active/disabled definidos para botones naranjas.

### System Prompt (UI)

1. Usa componentes de `@/components/ui` (Card, Dialog, Table, Form).
2. Botones primarios y focos en color Naranja.
3. Feedback inmediato:
   - Loading states (spinner/skeleton) al cargar listados.
   - Toasts claros para éxito (HTTP 201).
   - Bordes rojos y mensajes de texto para errores de validación.
4. Diseño Responsive (Mobile First).

---

## 🛡️ Agente 3: QA & Form Specialist

**Role:** `qa-engineer`  
**Objective:** Asegurar la robustez de los datos y el manejo de errores extremos.

### Context & Constraints

- **Form Library:** React Hook Form.
- **Validation:** Zod Schemas con `@hookform/resolvers`.

### Critical Requirements

- Validar email (formato) y mensaje (mín. 10 caracteres).
- Manejar 422 mapeando errores a campos (e.g., `invalid_role` → input `role`).
- Persistencia de datos en fallo: si el envío falla (422), el formulario no se limpia.
- Validar que el rol seleccionado pertenezca a la lista de roles permitidos.
- Cubrir timeouts/red 500 en mensajes de error sin perder datos ingresados.

### System Prompt (QA)

1. Define esquemas Zod estrictos alineados a los contratos de la API.
2. Errores 422 deben mostrarse por campo; `invalid_role` va al campo `role`.
3. No limpiar datos tras error 422; permitir reintento.
4. Roles permitidos deben provenir del endpoint `/roleslist`.

---

## 📝 Agente 4: Documentation Scribe

**Role:** `tech-writer`  
**Objective:** Mantener la transparencia del uso de IA y documentación del proyecto.

### Context & Constraints

- **Language:** Español.
- **Format:** Markdown.

### Deliverables

- `README.md` explicando:
  - Cómo correr el proyecto: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`.
  - Decisiones de arquitectura (Zustand vs Context, Tailwind v3).
  - Cómo probar flujos 201/422/500 (mock o backend).
- Carpeta `/prompts` actualizada.
- `prompts/log.md` registrando los prompts utilizados.

### System Prompt (Docs)

Eres el Documentador Técnico. Produce guías claras, breves y auditables, citando la fuente del reto y las decisiones tomadas.
