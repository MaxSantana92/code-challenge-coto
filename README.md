# 🚀 Recruiter Dashboard - Code Challenge

Aplicación web de reclutamiento construida con React, TypeScript, Vite y arquitectura modular.

## ✨ Características

- 🎨 UI moderna con Tailwind CSS y shadcn/ui
- 🌓 Modo oscuro/claro
- 🔍 Filtrado avanzado por tecnología, nivel y búsqueda
- 📊 Ordenamiento por múltiples campos
- 📄 Paginación responsive
- 🏗️ Arquitectura modular y escalable
- 🪝 Custom hooks reutilizables
- 📱 Diseño responsive
- ⚡ Lazy loading de rutas para mejor performance
- 🎯 Code splitting automático
- 🛡️ Route guards para protección de rutas

## 🏛️ Arquitectura

Este proyecto sigue una arquitectura modular basada en features:

```
src/
├── api/                    # Configuración de Axios
├── components/             # Componentes compartidos
│   ├── layout/            # Componentes de layout (Header, Theme)
│   ├── feedback/          # Loading, toasts, etc.
│   ├── pages/             # NotFound, Error pages
│   └── ui/                # shadcn/ui components
├── lib/                    # Utilidades
├── modules/                # Módulos por feature
│   ├── auth/              # Autenticación
│   │   ├── model/         # Tipos
│   │   ├── service/       # API calls
│   │   └── view/          # Componentes
│   ├── dashboard/         # Dashboard principal
│   │   ├── hooks/         # Custom hooks
│   │   ├── model/         # Tipos
│   │   ├── service/       # API calls
│   │   └── view/          # Componentes
│   │       └── components/ # Componentes específicos
│   └── messages/          # Mensajería
├── routes/                # Rutas centralizadas y route guards
│   ├── paths.ts           # Constantes de rutas
│   ├── guards.tsx         # PrivateRoute y PublicRoute
│   └── index.ts           # Barrel export
└── store/                 # Estado global (Zustand)
```

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 🔑 Credenciales de Demo

- **Email**: `recruiter@demo.com`
- **Password**: `123456`

## 🛠️ Stack Tecnológico

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📦 Estructura de Módulos

Cada módulo sigue el patrón **Model-Service-View**:

- **Model**: Tipos TypeScript y definiciones de datos
- **Service**: Lógica de negocio y llamadas a API
- **View**: Componentes de React y UI

### Ejemplo: Dashboard Module

```
dashboard/
├── hooks/                  # Lógica reutilizable
│   ├── useCandidateFilters.ts
│   ├── useCandidateSorting.ts
│   └── usePagination.ts
├── model/                  # Tipos
│   └── index.ts
├── service/                # API calls
│   └── index.ts
└── view/                   # UI
    ├── components/         # Componentes específicos
    └── Dashboard.tsx       # Componente principal
```

## 📝 Scripts Disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run preview   # Preview del build
npm run lint      # Linter con Biome
```

## 🔧 Code Quality con Biome

Este proyecto utiliza **[Biome](https://biomejs.dev/)** como herramienta de linting y formatting, un toolchain ultra-rápido para JavaScript/TypeScript que reemplaza ESLint y Prettier.

### ¿Por qué Biome?

- ⚡ **100x más rápido** que ESLint
- 🔄 **All-in-one**: Linter + Formatter en una sola herramienta
- 🎯 **Zero config**: Funciona out-of-the-box con configuración mínima
- 🔍 **Mejor DX**: Mensajes de error más claros y útiles

### Configuración

El proyecto está configurado en `biome.json` con:

```json
{
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "quoteStyle": "single",
    "semicolons": "asNeeded",
    "trailingCommas": "es5"
  },
  "linter": {
    "rules": {
      "recommended": true,
      "correctness": {
        "useExhaustiveDependencies": "warn"
      }
    }
  }
}
```

### Scripts disponibles

```bash
# Ejecutar linter
npm run lint

# Format de código (si está configurado)
npm run format
```

### Integración con VSCode

Recomendamos instalar la extensión [Biome VSCode](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) para:
- Format on save automático
- Linting en tiempo real
- Organización automática de imports

## 🌳 Git Flow y Control de Versiones

Este proyecto utiliza una estrategia de **Git Flow** con dos ramas principales y ramas temporales para features, releases y hotfixes.

**Ramas permanentes:**
- `main` → Producción estable (tags: v1.0.0, v1.1.0...)
- `develop` → Integración de desarrollo

**Ramas temporales:**
- `feature/*` → Desde develop, PR a develop
- `release/*` → Desde develop, PR a main (merge back a develop)
- `bugfix/*` → Desde release, PR a release
- `hotfix/*` → Desde main, merge a main y develop

### Convenciones de Commits

```bash
feat(scope): descripción    # Nueva funcionalidad
fix(scope): descripción     # Corrección de bug
docs(scope): descripción    # Cambios en documentación
refactor(scope): descripción # Refactorización
perf(scope): descripción    # Mejora de performance
test(scope): descripción    # Tests
update(deps): descripción   # Actualización de dependencias
release: descripción        # Preparación de release
```

### Flujo Rápido

```bash
# Crear feature
git checkout develop && git pull
git checkout -b feature/nombre
# ... trabajo ...
git push origin feature/nombre
# PR a develop

# Crear release
git checkout develop && git pull
git checkout -b release/v1.0.0
# Actualizar version
git push origin release/v1.0.0
# PR a main, luego merge back a develop

# Hotfix urgente
git checkout main && git pull
git checkout -b hotfix/nombre
# ... fix ...
git checkout main && git merge hotfix/nombre
git checkout develop && git merge hotfix/nombre
```

**Ver documentación completa:** [docs/GIT_FLOW.md](docs/GIT_FLOW.md)

---

## ⚡ Performance

- **Lazy Loading**: Todas las rutas se cargan de forma diferida
- **Code Splitting**: Vite divide automáticamente el código en chunks
- **Bundle Inicial**: ~80KB (reducción del 60%)
- **Time to Interactive**: ~1.2s

Ver [docs/PERFORMANCE.md](docs/PERFORMANCE.md) para más detalles.

## 📚 Documentación

Toda la documentación está centralizada en la carpeta [`docs/`](docs/):

| Documento | Descripción |
|-----------|-------------|
| [GIT_FLOW.md](docs/GIT_FLOW.md) | 🌳 Guía completa de Git Flow con develop, release y hotfix |
| [DEPENDENCIES_AND_LIBRARIES.md](docs/DEPENDENCIES_AND_LIBRARIES.md) | 📦 Stack completo y justificación de tecnologías |
| [ROUTES.md](docs/ROUTES.md) | 🛣️ Configuración de rutas, guards y lazy loading |
| [STORES.md](docs/STORES.md) | 📦 Gestión de estado con Zustand y DevTools |
| [PERFORMANCE.md](docs/PERFORMANCE.md) | ⚡ Optimizaciones y métricas de rendimiento |
| [REFACTOR_DASHBOARD.md](docs/REFACTOR_DASHBOARD.md) | 🏗️ Refactorización del módulo Dashboard |
| [REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md) | 📝 Resumen general de refactorización |

Ver [índice completo de documentación](docs/INDEX.md).
