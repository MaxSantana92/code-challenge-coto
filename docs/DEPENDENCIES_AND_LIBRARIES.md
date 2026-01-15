# 📦 Dependencias y Librerías

Este documento detalla todas las dependencias utilizadas en el proyecto, su propósito y las razones detrás de su elección.

## 📑 Tabla de Contenidos

- [Core](#-core)
- [Routing](#-routing)
- [State Management](#-state-management)
- [Styling](#-styling)
- [UI Components](#-ui-components)
- [Forms & Validation](#-forms--validation)
- [HTTP Client](#-http-client)
- [Icons & Notifications](#-icons--notifications)
- [Utilities](#-utilities)
- [Dev Dependencies](#-dev-dependencies)

---

## 🎯 Core

### React 18.3.1
```json
"react": "^18.3.1",
"react-dom": "^18.3.1"
```

**¿Qué es?**  
Librería para construir interfaces de usuario basadas en componentes.

**¿Por qué?**
- ✅ Virtual DOM para renderizado eficiente
- ✅ Ecosistema maduro y amplia comunidad
- ✅ Hooks modernos para gestión de estado
- ✅ React 18 incluye Concurrent Features y Suspense
- ✅ Mejor performance con Automatic Batching

---

### TypeScript 5.2.2
```json
"typescript": "^5.2.2"
```

**¿Qué es?**  
Superset de JavaScript que añade tipado estático.

**¿Por qué?**
- ✅ **Type Safety**: Detecta errores en tiempo de compilación
- ✅ **Mejor DX**: Autocompletado inteligente en el IDE
- ✅ **Refactoring seguro**: Cambios con confianza
- ✅ **Documentación viva**: Los tipos son documentación
- ✅ **Escalabilidad**: Esencial para proyectos grandes

---

### Vite 5.3.1
```json
"vite": "^5.3.1",
"@vitejs/plugin-react": "^4.3.1"
```

**¿Qué es?**  
Build tool moderno y ultra-rápido para aplicaciones web.

**¿Por qué?**
- ⚡ **HMR instantáneo**: Hot Module Replacement sin lag
- ⚡ **Builds rápidos**: Usa esbuild (escrito en Go)
- 📦 **Code Splitting automático**: Optimización out-of-the-box
- 🎯 **Zero config**: Funciona sin configuración compleja
- 🔥 **Mejor que Webpack/CRA**: 10-100x más rápido en desarrollo

---

## 🛣️ Routing

### React Router DOM 6.24.0
```json
"react-router-dom": "^6.24.0"
```

**¿Qué es?**  
Librería de routing para aplicaciones React.

**¿Por qué?**
- 🎯 **API moderna**: Hooks como `useNavigate`, `useParams`
- 🛡️ **Nested Routes**: Rutas anidadas de forma declarativa
- 🔒 **Route Guards**: Protección de rutas (PrivateRoute, PublicRoute)
- ⚡ **Lazy Loading**: Compatible con `React.lazy()` y `Suspense`
- 📱 **SPA Navigation**: Navegación sin recargar página
- 🏆 **Estándar de facto**: La solución más usada en React

**Uso en el proyecto:**
```typescript
// src/routes/guards.tsx
<Route element={<PrivateRoute />}>
  <Route path={PATHS.HOME} element={<Dashboard />} />
</Route>
```

---

## 🗄️ State Management

### Zustand 5.0.10
```json
"zustand": "^5.0.10"
```

**¿Qué es?**  
Librería de state management minimalista y poderosa.

**¿Por qué Zustand sobre Redux?**
- 🎯 **Simplicidad**: 10x menos boilerplate que Redux
- ⚡ **Performance**: No re-renderiza componentes innecesariamente
- 🪶 **Ligero**: Solo ~1.3KB (vs Redux ~45KB)
- 🔧 **DevTools**: Integración con Redux DevTools
- 🎨 **Flexible**: Sin Context, sin providers
- 📦 **Middleware**: Persist, DevTools, Immer incluidos

**Uso en el proyecto:**
```typescript
// src/store/auth-store.ts
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        setSession: (user, token) => set({ user, token }),
        logout: () => set({ user: null, token: null }),
      }),
      { name: 'Auth Store' }
    )
  )
)
```

**Stores implementados:**
- `auth-store`: Gestión de autenticación y sesión
- `candidates-store`: Datos de candidatos
- `roles-store`: Catálogo de roles disponibles
- `messages-store`: Historial de mensajes enviados

---

## 🎨 Styling

### Tailwind CSS 3.4.4
```json
"tailwindcss": "^3.4.4",
"autoprefixer": "^10.4.19",
"postcss": "^8.4.38"
```

**¿Qué es?**  
Framework CSS utility-first para diseño rápido y consistente.

**¿Por qué?**
- ⚡ **Desarrollo rápido**: Clases utilitarias predefinidas
- 🎨 **Design System integrado**: Colores, espaciado, tipografía
- 📱 **Responsive**: Mobile-first por defecto
- 🔥 **PurgeCSS automático**: Solo incluye CSS usado (build pequeño)
- 🎯 **No naming**: Adiós a inventar nombres de clases
- 🌓 **Dark Mode**: Soporte nativo con `dark:`

**Plugins utilizados:**
```json
"tailwindcss-animate": "^1.0.7"  // Animaciones predefinidas
```

---

## 🧩 UI Components

### shadcn/ui (Radix UI)
```json
"@radix-ui/react-avatar": "^1.1.0",
"@radix-ui/react-dialog": "^1.1.1",
"@radix-ui/react-label": "^2.1.0",
"@radix-ui/react-select": "^2.1.1",
"@radix-ui/react-separator": "^1.1.0",
"@radix-ui/react-slot": "^1.1.0",
"@radix-ui/react-toast": "^1.2.1",
"vaul": "^0.9.6"
```

**¿Qué es?**  
Colección de componentes UI accesibles, sin estilos, altamente personalizables.

**¿Por qué shadcn/ui?**
- ♿ **Accesibilidad**: WCAG compliant out-of-the-box
- 🎨 **Personalizable**: Copias el código, no es una librería
- 🎯 **No vendor lock-in**: El código es tuyo
- 🔧 **Composable**: Componentes primitivos componibles
- ⚡ **Tree-shakeable**: Solo importas lo que usas
- 🌐 **WAI-ARIA**: Soporte completo de roles y atributos

**Componentes utilizados:**
- `Avatar`: Fotos de perfil con fallback
- `Dialog/Modal`: Modales accesibles
- `Select`: Dropdowns nativos mejorados
- `Toast`: Notificaciones (con Sonner)
- `Drawer`: Panel deslizable (con Vaul)

**Alternativas descartadas:**
- ❌ Material UI: Demasiado pesado (~1MB)
- ❌ Ant Design: Estilo opinionado difícil de personalizar
- ❌ Chakra UI: Requiere provider y context

---

### Utilidades de Styling

```json
"class-variance-authority": "^0.7.0",  // Variantes de componentes
"clsx": "^2.1.1",                     // Composición de clases
"tailwind-merge": "^2.3.0"            // Merge inteligente de Tailwind
```

**class-variance-authority (CVA)**  
Crea variantes de componentes type-safe.

```typescript
// Ejemplo: src/components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        destructive: "bg-destructive text-destructive-foreground",
      },
      size: {
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      }
    }
  }
)
```

**clsx + tailwind-merge**  
Gestión inteligente de clases CSS condicionales.

```typescript
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

---

### Theming

```json
"next-themes": "^0.3.0"
```

**¿Qué es?**  
Gestión de temas (light/dark) con persistencia automática.

**¿Por qué?**
- 🌓 Sistema theme toggle sin flicker
- 💾 Persiste preferencia en localStorage
- 🎨 SSR-friendly (aunque no usamos SSR)
- ⚙️ Integración perfecta con Tailwind

---

## 📝 Forms & Validation

### React Hook Form 7.52.0
```json
"react-hook-form": "^7.52.0",
"@hookform/resolvers": "^3.9.0"
```

**¿Qué es?**  
Librería para gestión de formularios con validación.

**¿Por qué?**
- ⚡ **Performance**: Re-renders mínimos (usa refs)
- 🎯 **DX excepcional**: API intuitiva con hooks
- 📦 **Ligero**: Solo ~8KB
- ✅ **Validación integrada**: Compatible con Zod, Yup, etc.
- 🔧 **Flexible**: Controlled y uncontrolled components

**Alternativas descartadas:**
- ❌ Formik: Más pesado y con más re-renders

---

### Zod 3.23.8
```json
"zod": "^3.23.8"
```

**¿Qué es?**  
Librería de validación de esquemas con inferencia de tipos TypeScript.

**¿Por qué?**
- 🎯 **Type inference**: Los tipos TS se infieren automáticamente
- ✅ **Runtime validation**: Valida en tiempo de ejecución
- 📝 **Declarativo**: Esquemas fáciles de leer
- 🔗 **Integración perfecta**: Con React Hook Form

**Ejemplo del proyecto:**
```typescript
// src/modules/auth/view/login.tsx
const formSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type FormValues = z.infer<typeof formSchema>
```

---

## 🌐 HTTP Client

### Axios 1.7.2
```json
"axios": "^1.7.2"
```

**¿Qué es?**  
Cliente HTTP basado en Promises con interceptors.

**¿Por qué Axios sobre Fetch?**
- 🔧 **Interceptors**: Middleware para requests/responses
- 🎯 **Request/Response transformers**: Procesamiento automático
- ❌ **Better error handling**: Errores más detallados
- 🔒 **XSRF protection**: Protección CSRF integrada
- ⏱️ **Timeouts**: Configuración de timeouts fácil
- 📊 **Progress tracking**: Upload/download progress

**Uso en el proyecto:**
```typescript
// src/api/index.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// Interceptor para autenticación
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

---

## 🎨 Icons & Notifications

### Lucide React 0.400.0
```json
"lucide-react": "^0.400.0"
```

**¿Qué es?**  
Librería de iconos moderna con +1000 iconos.

**¿Por qué Lucide?**
- 🎨 **Beautiful**: Diseño consistente y moderno
- ⚡ **Tree-shakeable**: Solo importas los iconos que usas
- 📦 **Ligero**: SVGs optimizados
- 🔧 **Customizable**: Tamaño, color, stroke width
- 🆕 **Actualizado**: Fork mantenido de Feather Icons

**Alternativas descartadas:**
- ❌ Font Awesome: Requiere cargar todos los iconos
- ❌ Material Icons: Estilo menos versátil

---

### Sonner 1.5.0
```json
"sonner": "^1.5.0"
```

**¿Qué es?**  
Sistema de notificaciones toast moderno y elegante.

**¿Por qué?**
- 🎨 **Gorgeous**: Diseño hermoso out-of-the-box
- ⚡ **Performance**: No re-renderiza app
- 🎯 **Simple API**: Un solo componente
- 📱 **Responsive**: Funciona en mobile y desktop
- 🌓 **Dark mode**: Soporte automático

**Uso:**
```typescript
import { toast } from 'sonner'

toast.success('Mensaje enviado correctamente')
toast.error('Error al enviar mensaje')
```

---

## 🛠️ Utilities

### Librería de Utilidades Propias

**`src/lib/utils.ts`**
```typescript
// Merge de clases Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Validación de arrays
export function ensureArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value
  return []
}
```

**`src/lib/toast-utils.ts`**
```typescript
// Wrapper para toasts consistentes
export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
}
```

---

## 🔧 Dev Dependencies

### Biome 2.3.11
```json
"@biomejs/biome": "2.3.11"
```

**¿Qué es?**  
Toolchain todo-en-uno para linting y formatting.

**¿Por qué Biome sobre ESLint + Prettier?**
- ⚡ **100x más rápido**: Escrito en Rust
- 🎯 **All-in-one**: Linter + Formatter en una herramienta
- 🔧 **Zero config**: Configuración mínima
- 💾 **Menor dependencia**: No necesitas 20 plugins
- 🎨 **Mejor DX**: Mensajes de error claros

**Scripts:**
```bash
npm run lint     # Ejecutar linter
npm run format   # Formatear código
npm run check    # Lint + Format
```

Ver [README.md](../README.md#-code-quality-con-biome) para configuración detallada.

---

### TypeScript Config

**Archivos de configuración:**
- `tsconfig.json`: Configuración base
- `tsconfig.app.json`: Configuración de la app
- `tsconfig.node.json`: Configuración de Vite

**Configuraciones clave:**
```json
{
  "strict": true,
  "esModuleInterop": true,
  "skipLibCheck": true,
  "paths": {
    "@/*": ["./src/*"]  // Path aliases
  }
}
```

---

## 📊 Resumen de Decisiones Técnicas

| Categoría | Librería | Alternativa | ¿Por qué elegimos? |
|-----------|----------|-------------|-------------------|
| **Framework** | React 18 | Vue, Angular | Ecosistema maduro, Virtual DOM, Hooks |
| **Build Tool** | Vite | Webpack, Parcel | 10-100x más rápido, HMR instantáneo |
| **State** | Zustand | Redux, Context | 10x menos código, mejor performance |
| **Routing** | React Router | TanStack Router | Estándar de facto, API madura |
| **Styling** | Tailwind | CSS-in-JS, SCSS | Utility-first, diseño rápido |
| **UI** | shadcn/ui | Material UI, Chakra | Accesible, personalizable, sin vendor lock-in |
| **Forms** | React Hook Form + Zod | Formik + Yup | Mejor performance, type inference |
| **HTTP** | Axios | Fetch | Interceptors, mejor DX |
| **Linter** | Biome | ESLint + Prettier | 100x más rápido, all-in-one |

---

## 📦 Bundle Size

**Dependencias de producción:** ~420KB (minified + gzipped)
**Bundle inicial:** ~80KB (con code splitting)

**Breakdown aproximado:**
- React + React DOM: ~140KB
- React Router: ~30KB
- Zustand: ~1.3KB
- Radix UI components: ~100KB
- Tailwind CSS: ~10KB (purgado)
- Axios: ~15KB
- Otros: ~50KB

---

## 🔄 Actualizaciones

**Estrategia de versiones:**
- ✅ Dependencias en `^` (caret): Permite updates de patches y minor
- ⚠️ Revisar changelog antes de actualizar majors
- 🔒 Lock file (`package-lock.json`) versionado

**Comandos útiles:**
```bash
npm outdated           # Ver dependencias desactualizadas
npm update            # Actualizar a latest minor/patch
npm install pkg@latest # Actualizar a latest major
```

---

## 📚 Referencias

- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [React Router Docs](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Biome](https://biomejs.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
