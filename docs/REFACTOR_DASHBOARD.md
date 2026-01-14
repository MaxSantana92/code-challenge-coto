# Dashboard Module

Este módulo contiene toda la funcionalidad del dashboard de reclutamiento.

## 📁 Estructura

```
dashboard/
├── hooks/                      # Custom hooks reutilizables
│   ├── useCandidateFilters.ts # Lógica de filtrado
│   ├── useCandidateSorting.ts # Lógica de ordenamiento
│   ├── usePagination.ts       # Lógica de paginación
│   └── index.ts               # Barrel export
├── model/                      # Tipos y modelos de datos
│   └── index.ts
├── service/                    # Llamadas a API
│   └── index.ts
└── view/                       # Componentes de UI
    ├── components/             # Componentes específicos del dashboard
    │   ├── CandidateFilters.tsx
    │   ├── CandidatesTable.tsx
    │   ├── CandidateRow.tsx
    │   ├── CandidatesPagination.tsx
    │   ├── CandidateDetailModal.tsx
    │   └── index.ts
    └── Dashboard.tsx           # Componente principal (orquestador)

# Header movido a componentes globales
src/components/layout/
└── Header.tsx                  # Header
```

## 🎯 Componente Principal: Dashboard

El componente `Dashboard` actúa como **orquestador**, delegando la lógica a hooks personalizados y la UI a componentes especializados.

### Responsabilidades:
- Cargar datos del store
- Coordinar hooks de filtrado, sorting y paginación
- Componer la UI usando componentes especializados

### Flujo de datos:
```
Store (candidates) 
  → useCandidateFilters (filtrado)
    → useCandidateSorting (ordenamiento)
      → usePagination (paginación)
        → UI Components
```

## 🪝 Custom Hooks

### `useCandidateFilters(candidates)`
Maneja el estado y lógica de filtrado de candidatos.

**Retorna:**
- `technology`, `level`, `search`: Estados de filtros
- `setTechnology`, `setLevel`, `setSearch`: Setters
- `technologyOptions`, `levelOptions`: Opciones disponibles
- `filteredCandidates`: Candidatos filtrados
- `resetFilters()`: Resetear filtros
- `hasActiveFilters`: Indica si hay filtros activos

### `useCandidateSorting(candidates)`
Maneja el estado y lógica de ordenamiento.

**Retorna:**
- `sort`: Configuración actual de ordenamiento
- `setSort`: Setter del ordenamiento
- `sortedCandidates`: Candidatos ordenados
- `toggleSort(field)`: Toggle de dirección de ordenamiento

### `usePagination(items, options)`
Hook genérico reutilizable para paginación.

**Parámetros:**
- `items`: Array de elementos a paginar
- `options`: `{ pageSize?, initialPage? }`

**Retorna:**
- `page`, `totalPages`, `pages`: Estado de paginación
- `paginatedItems`: Items de la página actual
- `setPage`, `nextPage`, `prevPage`: Navegación
- `hasNextPage`, `hasPrevPage`: Banderas de navegación

## 🧩 Componentes

### `Header` (layout)
**Ubicación:** `src/components/layout/Header.tsx`  
Header compartido con logo, título y botones de tema/logout.  

### `CandidateFilters`
Filtros de búsqueda (tecnología, nivel, búsqueda por texto).

**Props:**
- Estados de filtros y sus setters
- Opciones disponibles para los selects

### `CandidatesTable`
Tabla de candidatos con headers ordenables.

**Props:**
- `candidates`: Array de candidatos a mostrar
- `loading`, `error`: Estados de carga
- `sort`: Configuración de ordenamiento
- `onSortChange`: Callback para cambiar ordenamiento

### `CandidateRow`
Fila individual de candidato con avatar, skills, score y acciones.

**Props:**
- `candidate`: Objeto candidato

### `CandidatesPagination`
Controles de paginación (responsive).

**Props:**
- Estados de paginación
- Callbacks de navegación
- Información de items mostrados

## 📊 Beneficios de esta Arquitectura

### ✅ Separación de Responsabilidades
- Lógica de negocio en hooks
- UI en componentes presentacionales
- Orquestación en Dashboard

### ✅ Reutilización
- Hooks pueden usarse en otros contextos
- Componentes son independientes y testeables

### ✅ Mantenibilidad
- Cada archivo tiene una responsabilidad clara
- Fácil de encontrar y modificar código
- Reducción de 507 líneas a ~95 líneas en Dashboard

### ✅ Testabilidad
- Hooks pueden testearse de forma aislada
- Componentes pueden testearse con props mock
- Lógica separada de la presentación

## 🔄 Flujo de Actualización

1. Usuario cambia un filtro → `setTechnology()`
2. `useCandidateFilters` recalcula `filteredCandidates`
3. `useCandidateSorting` recibe nuevos candidatos y reordena
4. `usePagination` recibe candidatos ordenados y pagina
5. Componentes reciben datos actualizados y re-renderizan

## 🚀 Próximas Mejoras Sugeridas

- [ ] Agregar tests unitarios para hooks
- [ ] Agregar tests de integración para Dashboard
- [ ] Implementar debounce en búsqueda de texto
- [ ] Agregar persistencia de filtros en URL
- [ ] Implementar virtualización para listas grandes
