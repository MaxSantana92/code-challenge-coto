# 📦 Stores - Gestión de Estado

Este directorio contiene todos los stores de estado global de la aplicación usando [Zustand](https://github.com/pmndrs/zustand).

## 🗂️ Stores Disponibles

### 1. **Auth Store** (`auth-store.ts`)
Maneja la autenticación del usuario.

**Estado:**
- `user`: Información del usuario autenticado
- `token`: Token de autenticación
- `setSession()`: Establece la sesión del usuario
- `logout()`: Cierra la sesión

**Características:**
- ✅ Persistencia en localStorage
- ✅ DevTools habilitadas

### 2. **Candidates Store** (`candidates-store.ts`)
Maneja la lista de candidatos.

**Estado:**
- `candidates`: Array de candidatos
- `loading`: Estado de carga
- `error`: Mensaje de error
- `loaded`: Indica si ya se cargaron los datos
- `requested`: Indica si hay una petición en curso
- `fetchCandidates()`: Obtiene candidatos de la API

**Características:**
- ✅ DevTools habilitadas
- ⚠️ Sin persistencia (se recarga en cada sesión)

### 3. **Roles Store** (`roles-store.ts`)
Maneja la lista de roles disponibles.

**Estado:**
- `roles`: Array de roles
- `loading`: Estado de carga
- `error`: Mensaje de error
- `loaded`: Indica si ya se cargaron los datos
- `requested`: Indica si hay una petición en curso
- `fetchRoles()`: Obtiene roles de la API

**Características:**
- ✅ Persistencia en localStorage
- ✅ DevTools habilitadas

## 🛠️ Uso de DevTools

Todos los stores tienen integración con **Redux DevTools** para facilitar el debugging.

### Cómo usar:

1. **Instalar la extensión del navegador:**
   - [Chrome/Edge](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

2. **Abrir DevTools:**
   - Presiona `F12` o `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
   - Ve a la pestaña **Redux**

3. **Inspeccionar stores:**
   - Verás los stores: "Auth Store", "Candidates Store", "Roles Store"
   - Puedes ver el estado actual de cada uno
   - Ver el historial de acciones
   - Time-travel debugging (volver a estados anteriores)

### Ejemplo de uso en DevTools:

```
Auth Store
├── user: { email: "recruiter@demo.com" }
├── token: "mock-token"
└── Actions:
    ├── setSession
    └── logout

Candidates Store
├── candidates: Array(20)
├── loading: false
├── error: null
└── Actions:
    └── fetchCandidates
```

## 📝 Patrones de Uso

### Leer estado:

```typescript
import { useCandidatesStore } from '@/store/candidates-store'

function MyComponent() {
  // Opción 1: Seleccionar un valor específico
  const candidates = useCandidatesStore(state => state.candidates)
  
  // Opción 2: Seleccionar múltiples valores
  const { candidates, loading } = useCandidatesStore(state => ({
    candidates: state.candidates,
    loading: state.loading
  }))
  
  // Opción 3: Seleccionar todo (NO recomendado - causa re-renders innecesarios)
  const store = useCandidatesStore()
}
```

### Ejecutar acciones:

```typescript
import { useCandidatesStore } from '@/store/candidates-store'

function MyComponent() {
  const fetchCandidates = useCandidatesStore(state => state.fetchCandidates)
  
  useEffect(() => {
    fetchCandidates()
  }, [fetchCandidates])
}
```

### Acceso fuera de componentes:

```typescript
import { useCandidatesStore } from '@/store/candidates-store'

// En un servicio o utilidad
export async function someFunction() {
  const candidates = useCandidatesStore.getState().candidates
  const fetchCandidates = useCandidatesStore.getState().fetchCandidates
  
  await fetchCandidates()
}
```

## 🎯 Mejores Prácticas

### ✅ Hacer:
- Seleccionar solo el estado que necesitas
- Usar selectores para optimizar re-renders
- Mantener la lógica de negocio en los stores
- Usar DevTools para debugging

### ❌ Evitar:
- Seleccionar todo el store si no lo necesitas
- Mutar el estado directamente (Zustand usa Immer internamente)
- Lógica compleja en los componentes

## 🔄 Persistencia

Los stores con persistencia usan `localStorage`:

```typescript
// auth-store y roles-store
localStorage.getItem('auth-store')
localStorage.getItem('roles-store')
```

Para limpiar la persistencia:

```typescript
// Limpiar un store específico
localStorage.removeItem('auth-store')

// Limpiar todos los stores
localStorage.clear()
```

## 🧪 Testing (Futuro)

Para testear componentes que usan stores:

```typescript
import { useCandidatesStore } from '@/store/candidates-store'

// Limpiar estado antes de cada test
beforeEach(() => {
  useCandidatesStore.setState({
    candidates: [],
    loading: false,
    error: null,
    loaded: false,
    requested: false
  })
})

// Mock de estados específicos
test('renders candidates', () => {
  useCandidatesStore.setState({
    candidates: mockCandidates,
    loading: false
  })
  
  render(<CandidatesList />)
  // assertions...
})
```

## 📚 Recursos

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)
- [Zustand Best Practices](https://github.com/pmndrs/zustand#best-practices)
