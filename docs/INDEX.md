# 📚 Índice de Documentación

Bienvenido a la documentación del proyecto. Aquí encontrarás toda la información necesaria para entender y trabajar con el código.

## 📖 Documentación Principal

### 🏗️ Arquitectura y Diseño

| Documento | Descripción | Contenido Clave |
|-----------|-------------|-----------------|
| [REFACTOR_DASHBOARD.md](REFACTOR_DASHBOARD.md) | Refactorización del Dashboard | Hooks personalizados, componentes modulares, reducción de 507 a 96 líneas |
| [../REFACTORING_SUMMARY.md](../REFACTORING_SUMMARY.md) | Resumen general | Métricas, patrones aplicados, beneficios |

### 🌳 Control de Versiones

| Documento | Descripción | Contenido Clave |
|-----------|-------------|-----------------|
| [GIT_FLOW.md](GIT_FLOW.md) | Git Flow completo | Ramas, commits, PRs, releases, hotfixes, ejemplos prácticos |

### 🛣️ Rutas y Navegación

| Documento | Descripción | Contenido Clave |
|-----------|-------------|-----------------|
| [ROUTES.md](ROUTES.md) | Gestión de rutas | Paths centralizados, route guards, lazy loading, 404 |

### 📦 Estado Global

| Documento | Descripción | Contenido Clave |
|-----------|-------------|-----------------|
| [STORES.md](STORES.md) | Stores con Zustand | Auth, Candidates, Roles, DevTools, persistencia |

### ⚡ Performance

| Documento | Descripción | Contenido Clave |
|-----------|-------------|-----------------|
| [PERFORMANCE.md](PERFORMANCE.md) | Optimizaciones | Lazy loading, code splitting, métricas, Web Vitals |

### 📦 Dependencias y Stack Técnico

| Documento | Descripción | Contenido Clave |
|-----------|-------------|-----------------|
| [DEPENDENCIES_AND_LIBRARIES.md](DEPENDENCIES_AND_LIBRARIES.md) | Stack completo | React, Vite, Zustand, Tailwind, shadcn/ui, Biome, justificación de elección |

---

## 🗂️ Estructura de Archivos por Tema

### 📱 Frontend - UI/UX

```
src/
├── components/          # Componentes reutilizables
│   ├── layout/         # Header, ThemeToggle, ThemeProvider
│   ├── feedback/       # LoadingScreen, toasts
│   ├── pages/          # NotFound, error pages
│   └── ui/             # shadcn/ui components
└── modules/
    ├── auth/           # Autenticación
    └── dashboard/      # Dashboard principal
        ├── hooks/      # Custom hooks
        └── view/
            └── components/ # Componentes del dashboard
```

**Documentación relacionada:**
- [REFACTOR_DASHBOARD.md](REFACTOR_DASHBOARD.md) - Arquitectura del dashboard
- [ROUTES.md](ROUTES.md) - Routing y navegación

---

### 🔄 Estado y Datos

```
src/
├── store/              # Estado global (Zustand)
│   ├── auth-store.ts
│   ├── candidates-store.ts
│   └── roles-store.ts
└── modules/
    └── */service/      # API calls por módulo
```

**Documentación relacionada:**
- [STORES.md](STORES.md) - Gestión de estado

---

### 🛣️ Routing

```
src/
└── routes/
    ├── paths.ts        # Constantes de rutas
    ├── guards.tsx      # PrivateRoute, PublicRoute
    └── index.ts        # Exports
```

**Documentación relacionada:**
- [ROUTES.md](ROUTES.md) - Sistema de rutas

---

## 🎯 Guías por Tarea

### Para Nuevos Desarrolladores

1. **Empezar aquí:** [README.md](../README.md) - Configuración inicial
2. **Stack técnico:** [DEPENDENCIES_AND_LIBRARIES.md](DEPENDENCIES_AND_LIBRARIES.md) - Tecnologías usadas
3. **Git Flow:** [GIT_FLOW.md](GIT_FLOW.md) - Estrategia completa de branching, commits y releases
4. **Entender la arquitectura:** [REFACTOR_DASHBOARD.md](REFACTOR_DASHBOARD.md)
5. **Aprender sobre rutas:** [ROUTES.md](ROUTES.md)
6. **Gestión de estado:** [STORES.md](STORES.md)

### Para Agregar Funcionalidad

1. **Nueva ruta:**
   - Ver [ROUTES.md](ROUTES.md) - Sección "Agregar Nuevas Rutas"
   - Agregar en `src/routes/paths.ts`
   - Implementar lazy loading

2. **Nuevo store:**
   - Ver [STORES.md](STORES.md) - Sección "Patrones de Uso"
   - Crear en `src/store/`
   - Agregar DevTools

3. **Nuevo módulo:**
   - Seguir patrón Model-Service-View
   - Ver estructura en `src/modules/dashboard/`
   - Crear custom hooks si es necesario

### Para Optimizar Performance

1. **Revisar métricas:** [PERFORMANCE.md](PERFORMANCE.md)
2. **Implementar lazy loading:** [ROUTES.md](ROUTES.md) - Sección "Lazy Loading"
3. **Optimizar componentes:** Usar React.memo, useMemo, useCallback

---

## 📊 Métricas y Benchmarks

| Métrica | Valor | Documento |
|---------|-------|-----------|
| Bundle inicial | ~80KB | [PERFORMANCE.md](PERFORMANCE.md) |
| Time to Interactive | ~1.2s | [PERFORMANCE.md](PERFORMANCE.md) |
| Líneas Dashboard | 96 | [REFACTOR_DASHBOARD.md](REFACTOR_DASHBOARD.md) |
| Reducción código | -81% | [../REFACTORING_SUMMARY.md](../REFACTORING_SUMMARY.md) |

---

## 🔧 Herramientas y Tecnologías

Para una lista completa con justificaciones y comparaciones, ver [DEPENDENCIES_AND_LIBRARIES.md](DEPENDENCIES_AND_LIBRARIES.md).

### Core
- React 18 + TypeScript
- Vite (build tool)
- React Router v6

### Estado
- Zustand (estado global)
- Redux DevTools (debugging)

### UI
- Tailwind CSS
- shadcn/ui + Radix UI
- Lucide React (iconos)

### Formularios
- React Hook Form
- Zod (validación)

### Code Quality & Workflow
- Biome (linting + formatting)
- Git Flow (control de versiones - ver [README.md](../README.md#-git-flow-y-control-de-versiones))
- Conventional Commits

---

## 🚀 Próximos Pasos

Ver sección "Optimizaciones Futuras" en:
- [PERFORMANCE.md](PERFORMANCE.md) - Mejoras de rendimiento
- [STORES.md](STORES.md) - Testing de stores
- [ROUTES.md](ROUTES.md) - Prefetching de rutas

---

## 📝 Contribuir a la Documentación

Si encuentras algo que falta o necesita actualización:

1. Actualiza el documento correspondiente
2. Mantén el índice actualizado
3. Usa el formato establecido (títulos, tablas, code blocks)
4. Agrega ejemplos cuando sea posible

---

## 🔗 Enlaces Útiles

### Documentación Externa
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

### Recursos de Aprendizaje
- [React Patterns](https://reactpatterns.com/)
- [TypeScript Best Practices](https://typescript-cheatsheets.netlify.app/)
- [Performance Optimization](https://web.dev/vitals/)

---

## 📞 Soporte

Si tienes preguntas sobre la documentación o el código:
1. Revisa esta documentación
2. Busca en el código (usa los ejemplos como guía)
3. Consulta al equipo

---

**Última actualización:** Enero 2026
