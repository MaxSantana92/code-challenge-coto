# 🛣️ Routes - Gestión de Rutas

Este directorio contiene toda la configuración de rutas y guards de la aplicación.

## 📁 Estructura

```
routes/
├── paths.ts       # Constantes de rutas centralizadas
├── guards.tsx     # Componentes de protección de rutas
└── index.ts       # Barrel export
```

## 🗺️ Rutas Disponibles

### Definición (`paths.ts`)

```typescript
export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '/404',
} as const
```

### Descripción

| Ruta | Constante | Descripción | Protección |
|------|-----------|-------------|------------|
| `/` | `PATHS.HOME` | Dashboard principal | Privada (requiere auth) |
| `/login` | `PATHS.LOGIN` | Página de inicio de sesión | Pública |
| `/dashboard` | `PATHS.DASHBOARD` | Dashboard de reclutador | Privada (requiere auth) |
| `*` | Catch-all | Página no encontrada (404) | Pública |

## 🛡️ Route Guards

### `PrivateRoute`

Protege rutas que requieren autenticación.

**Comportamiento:**
- ✅ Si el usuario está autenticado → Permite acceso
- ❌ Si no está autenticado → Redirige a `/login`

**Uso en App.tsx:**
```tsx
<Route element={<PrivateRoute />}>
  <Route path={PATHS.HOME} element={<Dashboard />} />
</Route>
```

### `PublicRoute`

Protege rutas públicas que NO deben ser accesibles si ya estás autenticado.

**Comportamiento:**
- ✅ Si NO está autenticado → Permite acceso
- ❌ Si ya está autenticado → Redirige a `/` (HOME)

**Uso en App.tsx:**
```tsx
<Route element={<PublicRoute />}>
  <Route path={PATHS.LOGIN} element={<LoginPage />} />
</Route>
```

## ⚡ Lazy Loading

Las rutas utilizan **lazy loading** para mejorar el rendimiento inicial de la aplicación.

### ¿Qué es Lazy Loading?

Lazy loading (carga diferida) divide el código en chunks más pequeños que se cargan solo cuando se necesitan, en lugar de cargar todo el código de la aplicación al inicio.

### Implementación en App.tsx:

```tsx
import { lazy, Suspense } from 'react'
import { LoadingScreen } from './components/LoadingScreen'

// Componentes cargados de forma diferida
const LoginPage = lazy(() => import('./modules/auth/view/login'))
const Dashboard = lazy(() => import('./modules/dashboard/view/Dashboard'))
const NotFound = lazy(() => 
  import('./components/NotFound').then(m => ({ default: m.NotFound }))
)

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Rutas */}
      </Routes>
    </Suspense>
  )
}
```

### Beneficios:

1. **Carga inicial más rápida** ⚡
   - Solo se descarga el código de la ruta actual
   - Reduce el bundle inicial de JavaScript

2. **Mejor experiencia de usuario** 👥
   - La app se carga más rápido
   - Muestra un loading screen mientras carga la ruta

3. **Optimización automática** 🎯
   - Vite divide automáticamente el código
   - Cada ruta se convierte en un chunk separado

4. **Code splitting** 📦
   - `login.[hash].js` - Código del login
   - `dashboard.[hash].js` - Código del dashboard
   - `notfound.[hash].js` - Código del 404

### Componente de Loading:

```tsx
// LoadingScreen.tsx
export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin" />
      <p>Cargando...</p>
    </div>
  )
}
```

---

## 📝 Uso

### Importar rutas en componentes:

```typescript
import { PATHS } from '@/routes'

// Navegación programática
import { useNavigate } from 'react-router-dom'

function MyComponent() {
  const navigate = useNavigate()
  
  const goToLogin = () => {
    navigate(PATHS.LOGIN)
  }
  
  return (
    <button onClick={goToLogin}>
      Ir a Login
    </button>
  )
}
```

### Uso en Links:

```tsx
import { Link } from 'react-router-dom'
import { PATHS } from '@/routes'

function Navigation() {
  return (
    <nav>
      <Link to={PATHS.HOME}>Inicio</Link>
      <Link to={PATHS.LOGIN}>Login</Link>
    </nav>
  )
}
```

### Importar guards:

```tsx
import { PrivateRoute, PublicRoute } from '@/routes'

// O importar individualmente
import { PrivateRoute } from '@/routes/guards'
```

### Ruta 404 (Not Found):

```tsx
import { NotFound } from '@/components/NotFound'

// En App.tsx - debe ir al final de todas las rutas
<Routes>
  {/* Otras rutas... */}
  
  {/* Ruta catch-all - captura cualquier ruta no definida */}
  <Route path='*' element={<NotFound />} />
</Routes>
```

**Nota:** La ruta `*` es un comodín que captura cualquier ruta no definida previamente.

## 🎯 Beneficios de Centralizar Rutas

### ✅ Ventajas:

1. **Mantenibilidad**: Cambiar una ruta en un solo lugar
2. **Type Safety**: TypeScript detecta errores de tipeo
3. **Autocompletado**: IntelliSense sugiere rutas disponibles
4. **Refactoring**: Fácil renombrar rutas en toda la app
5. **Documentación**: Todas las rutas visibles en un lugar
6. **No más strings mágicos**: No más `/login` hardcodeado

### Antes (❌):
```tsx
// Strings duplicados por toda la app
<Route path='/login' element={<LoginPage />} />
navigate('/login')
<Link to='/login'>Login</Link>

// ¿Qué pasa si cambia la ruta? Buscar y reemplazar en todo el código
```

### Después (✅):
```tsx
// Una fuente de verdad
<Route path={PATHS.LOGIN} element={<LoginPage />} />
navigate(PATHS.LOGIN)
<Link to={PATHS.LOGIN}>Login</Link>

// Cambio centralizado, TypeScript detecta errores
```

## 🔄 Agregar Nuevas Rutas

1. **Agregar en `paths.ts`:**
```typescript
export const PATHS = {
  // ... rutas existentes
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const
```

2. **Usar en `App.tsx`:**
```tsx
<Route element={<PrivateRoute />}>
  <Route path={PATHS.PROFILE} element={<Profile />} />
  <Route path={PATHS.SETTINGS} element={<Settings />} />
</Route>
```

3. **Agregar parámetros dinámicos:**
```typescript
export const PATHS = {
  // ... rutas existentes
  CANDIDATE_DETAIL: '/candidate/:id',
} as const

// Helper para generar rutas dinámicas
export const generatePath = {
  candidateDetail: (id: string) => `/candidate/${id}`,
}
```

## 🧪 Testing con Rutas

```typescript
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { PATHS } from '@/routes'

test('renders login page', () => {
  render(
    <MemoryRouter initialEntries={[PATHS.LOGIN]}>
      <Routes>
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
      </Routes>
    </MemoryRouter>
  )
  // assertions...
})
```

## 🔐 Cómo Funcionan los Guards

```
Usuario intenta acceder a ruta
          ↓
    ¿Ruta privada?
     ↙         ↘
   SÍ           NO
   ↓            ↓
¿Está auth?   Permitir
  ↙    ↘       
 SÍ    NO
 ↓     ↓
Permitir → /login
```

### Implementación interna:

```tsx
export function PrivateRoute() {
  const token = useAuthStore((s) => s.token)
  
  // Si hay token, renderiza las rutas hijas
  // Si no hay token, redirige a login
  return token ? <Outlet /> : <Navigate to={PATHS.LOGIN} replace />
}
```

## 📚 Recursos

- [React Router Documentation](https://reactrouter.com/)
- [Protected Routes Pattern](https://reactrouter.com/en/main/start/concepts#outlet-context)
- [TypeScript Const Assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)
