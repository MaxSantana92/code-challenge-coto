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

## 🏛️ Arquitectura

Este proyecto sigue una arquitectura modular basada en features:

```
src/
├── api/                    # Configuración de Axios
├── components/             # Componentes compartidos (UI)
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
├── routes/                # Guards y configuración de rutas
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
npm run lint      # Ejecutar ESLint
```
