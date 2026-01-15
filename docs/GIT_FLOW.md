# 🌳 Git Flow y Control de Versiones

Este proyecto utiliza una estrategia de **Git Flow** simplificada y adaptada para desarrollo ágil.

## 📑 Tabla de Contenidos

- [Ramas Principales](#-ramas-principales)
- [Estrategia de Branching](#-estrategia-de-branching)
- [Flujo de Trabajo Día a Día](#-flujo-de-trabajo-día-a-día)
- [Convenciones de Commits](#-convenciones-de-commits)
- [Pull Requests](#-pull-requests)
- [Comandos Útiles](#-comandos-útiles)
- [Protección de Ramas](#-reglas-de-protección-de-ramas)
- [Tags y Releases](#-tags-y-releases)
- [Mejores Prácticas](#-mejores-prácticas-y-recomendaciones)
- [Ejemplo Completo](#-ejemplo-completo-ciclo-de-vida-de-una-feature)

---

## 🌿 Ramas Principales

Este proyecto utiliza **Git Flow** con dos ramas principales:

```
main (producción)
└── Código desplegado en producción
└── Siempre estable y desplegable
└── Protegida contra push directo (*)
└── Solo recibe merges desde release/ y hotfix/

develop (desarrollo)
└── Rama de integración para desarrollo
└── Contiene últimas features completadas
└── Base para nuevas features
└── Se mergea a release/ cuando está lista
```

**(*) Nota**: Para este challenge no se implementaron protecciones de rama, pero en producción deberían estar activas.

---

## 📊 Estrategia de Branching

### Diagrama del Flujo

```
┌─────────────────────────────────────────────────────────┐
│                    FLUJO GIT FLOW                       │
└─────────────────────────────────────────────────────────┘

main  ─────●────────────●───────────●──────────►
            ↑            ↑           ↑
            │            │           │
            │ (merge)    │ (merge)   │ (merge)
            │            │           │
release ────┼────●───────┤           │
            │    ↑       │           │
            │    │ (PR)  │           │
            │    │       │           │
develop ────●────┼───●───●───●───────●──────────►
            ↑    │   ↑   ↑   ↑       ↑
            │    │   │   │   │       │
            └────┘   │   │   │       │
                     │   │   │       │
feature/A ───────────●───┘   │       │
                             │       │
feature/B ───────────────────●───┘   │
                                     │
hotfix ──────────────────────────────●───────────►
```

---

### 1. **Rama `main`** 🚀

**Propósito:** Código en producción

- 🔒 **Protegida**: No se permite push directo
- 📦 **Producción**: Solo código probado y aprobado
- ✅ **Estable**: Cada commit debe estar listo para deploy
- 🏷️ **Tags**: Cada merge se etiqueta (`v1.0.0`, `v1.1.0`)
- ⬅️ **Recibe merges de**: `release/*` y `hotfix/*` únicamente

---

### 2. **Rama `develop`** 🔧

**Propósito:** Rama de integración para desarrollo

- 🔄 **Integración**: Donde se integran todas las features
- 🎯 **Base para features**: Todas las features salen de aquí
- ⬅️ **Recibe merges de**: `feature/*` (via PR)
- ➡️ **Se mergea a**: `release/*` cuando está lista para producción

**Flujo:**
```bash
# Mantener develop actualizado
git checkout develop
git pull origin develop
```

---

### 3. **Ramas de Feature** ✨

**Formato:** `feature/nombre-descriptivo`

**Propósito:** Desarrollo de nuevas funcionalidades

- 🌱 **Se crean desde**: `develop`
- 🔀 **PR hacia**: `develop`
- 🗑️ **Se eliminan después**: Del merge

**Flujo completo:**
```bash
# 1. Crear feature desde develop
git checkout develop
git pull origin develop
git checkout -b feature/add-user-profile

# 2. Desarrollar con commits frecuentes
git add .
git commit -m "feat(profile): add user profile component"
git commit -m "feat(profile): add validation"
git commit -m "test(profile): add unit tests"

# 3. Actualizar con cambios de develop
git checkout develop
git pull origin develop
git checkout feature/add-user-profile
git merge develop
# Resolver conflictos si hay

# 4. Push y crear PR hacia develop
git push origin feature/add-user-profile
# Crear PR en GitHub: feature/add-user-profile -> develop

# 5. Después de merge y aprobación
git checkout develop
git pull origin develop
git branch -d feature/add-user-profile  # Eliminar local
git push origin --delete feature/add-user-profile  # Eliminar remota
```

**Ejemplos de nombres:**
- `feature/candidate-filters`
- `feature/dashboard-refactor`
- `feature/lazy-loading-routes`
- `feature/dark-mode`

---

### 4. **Ramas de Release** 🎯

**Formato:** `release/v1.0.0` o `release/nombre-version`

**Propósito:** Preparación para despliegue a producción

- 🌱 **Se crean desde**: `develop`
- 🔀 **PR hacia**: `main` (y también se mergea de vuelta a `develop`)
- 🐛 **Permite**: Bugfixes menores y ajustes finales
- 🚫 **No permite**: Nuevas features

**Flujo completo:**
```bash
# 1. Crear release desde develop (cuando esté lista)
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0

# 2. Preparar release (actualizar versiones, changelog, etc.)
# Editar package.json: "version": "1.0.0"
git commit -m "release: prepare v1.0.0"

# 3. Si hay bugfixes necesarios durante la release
git commit -m "fix(release): correct validation bug"

# 4. Push release
git push origin release/v1.0.0

# 5. Crear PR hacia main
# PR en GitHub: release/v1.0.0 -> main

# 6. Después de aprobación, merge a main
git checkout main
git pull origin main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags

# 7. IMPORTANTE: Mergear de vuelta a develop
git checkout develop
git merge --no-ff release/v1.0.0
git push origin develop

# 8. Eliminar rama release
git branch -d release/v1.0.0
git push origin --delete release/v1.0.0
```

**¿Cuándo crear una release?**
- Cuando `develop` tiene suficientes features para una versión
- Antes de un despliegue planeado
- Al finalizar un sprint (en metodologías ágiles)

---

### 5. **Ramas de Bugfix** 🐛

**Formato:** `bugfix/nombre-descriptivo`

**Propósito:** Corregir bugs encontrados durante la release

- 🌱 **Se crean desde**: `release/*`
- 🔀 **PR hacia**: `release/*` (la misma rama de release)
- 📝 **Uso**: Solo durante el proceso de release

**Flujo:**
```bash
# Durante una release, se encuentra un bug
git checkout release/v1.0.0
git checkout -b bugfix/pagination-error

# Fix del bug
git commit -m "fix(pagination): correct page count calculation"

# PR hacia la release
git push origin bugfix/pagination-error
# Crear PR: bugfix/pagination-error -> release/v1.0.0

# Después de merge
git branch -d bugfix/pagination-error
```

**Ejemplos:**
- `bugfix/login-validation`
- `bugfix/modal-z-index`
- `bugfix/api-timeout`

**Nota:** Los bugfixes en release se mergean a `main` junto con la release, y luego a `develop`.

---

### 6. **Ramas de Hotfix** 🚨

**Formato:** `hotfix/nombre-descriptivo`

**Propósito:** Corregir bugs críticos en producción

- 🌱 **Se crean desde**: `main`
- 🔀 **PR hacia**: `main` Y `develop` (doble merge)
- ⚠️ **Urgente**: Para bugs críticos que no pueden esperar

**Flujo completo:**
```bash
# 1. Bug crítico en producción detectado
git checkout main
git pull origin main
git checkout -b hotfix/critical-auth-bug

# 2. Fix rápido y commit
git commit -m "fix(auth): resolve critical token validation bug"

# 3. Merge a main
git checkout main
git merge --no-ff hotfix/critical-auth-bug
git tag -a v1.0.1 -m "Hotfix: critical auth bug"
git push origin main --tags

# 4. IMPORTANTE: Merge también a develop
git checkout develop
git merge --no-ff hotfix/critical-auth-bug
git push origin develop

# 5. Eliminar hotfix
git branch -d hotfix/critical-auth-bug
git push origin --delete hotfix/critical-auth-bug
```

**¿Cuándo usar hotfix?**
- Bug crítico en producción
- Sistema caído o inutilizable
- Vulnerabilidad de seguridad
- Pérdida de datos

---

## 📋 Resumen del Flujo

| Rama | Desde | Hacia | Propósito | Se elimina |
|------|-------|-------|-----------|------------|
| `feature/*` | `develop` | `develop` | Nueva funcionalidad | ✅ Sí |
| `release/*` | `develop` | `main` + `develop` | Preparar versión | ✅ Sí |
| `bugfix/*` | `release/*` | `release/*` | Fix en release | ✅ Sí |
| `hotfix/*` | `main` | `main` + `develop` | Fix crítico producción | ✅ Sí |
| `develop` | - | - | Integración desarrollo | ❌ No |
| `main` | - | - | Producción | ❌ No |

---

## 🔄 Flujo de Trabajo Día a Día

### Escenario 1: Desarrollar una nueva feature

```bash
# Día 1: Empezar feature
git checkout develop
git pull origin develop
git checkout -b feature/user-notifications

# Trabajar y commitear
git add .
git commit -m "feat(notifications): add notification component"

# Día 2: Continuar
git commit -m "feat(notifications): add bell icon"
git commit -m "test(notifications): add component tests"

# Antes de crear PR, actualizar con develop
git checkout develop
git pull origin develop
git checkout feature/user-notifications
git merge develop

# Crear PR: feature/user-notifications -> develop
git push origin feature/user-notifications
```

### Escenario 2: Preparar release

```bash
# Cuando develop tiene features suficientes
git checkout develop
git pull origin develop
git checkout -b release/v1.1.0

# Actualizar version en package.json
git commit -m "release: bump version to 1.1.0"

# Si encuentras bugs menores
git commit -m "fix(release): correct button alignment"

# Crear PR: release/v1.1.0 -> main
# Después de merge a main, mergear a develop también
```

### Escenario 3: Hotfix urgente

```bash
# Bug crítico en producción
git checkout main
git pull origin main
git checkout -b hotfix/payment-crash

# Fix rápido
git commit -m "fix(payment): resolve null pointer exception"

# Merge a main y develop
git checkout main
git merge hotfix/payment-crash
git tag -a v1.0.1 -m "Hotfix: payment crash"

git checkout develop
git merge hotfix/payment-crash
```

---

## 💬 Convenciones de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/) para mensajes claros y consistentes:

```bash
<tipo>(<scope>): <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos de Commit

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `feat(dashboard): add candidate filters` |
| `fix` | Corrección de bug | `fix(auth): resolve token validation` |
| `docs` | Cambios en documentación | `docs(readme): update installation steps` |
| `style` | Cambios de formato/estilo | `style: format code with Biome` |
| `refactor` | Refactorización de código | `refactor(dashboard): extract custom hooks` |
| `perf` | Mejora de performance | `perf: implement lazy loading` |
| `test` | Añadir/modificar tests | `test(hooks): add pagination tests` |
| `update` | Actualización de dependencias | `update(deps): upgrade React to v18.3.1` |
| `release` | Preparación de release | `release: prepare version 1.0.0` |

### Ejemplos de Buenos Commits

```bash
✅ feat(auth): implement login with JWT validation
✅ fix(pagination): correct page count calculation
✅ refactor(dashboard): extract CandidateFilters component
✅ docs(api): add JSDoc comments to service methods
✅ perf(routes): add lazy loading to Dashboard component
✅ style: apply Biome formatting rules
✅ update(deps): upgrade React to v18.3.1
✅ release: prepare version 1.0.0
✅ hotfix(auth): resolve critical security vulnerability
```

### Ejemplos de Malos Commits

```bash
❌ update stuff
❌ fix bug
❌ changes
❌ wip
❌ asdfasdf
```

---

## 📝 Pull Requests

### Checklist antes de crear PR

- [ ] ✅ Código pasa `npm run lint`
- [ ] ✅ Código pasa `npm run build`
- [ ] ✅ Commits siguen Conventional Commits
- [ ] ✅ Actualizado con última versión de `develop`
- [ ] ✅ Sin conflictos con `develop`
- [ ] ✅ Documentación actualizada si es necesario
- [ ] ✅ Tests agregados/actualizados (si aplica)

### Template de PR

```markdown
## 📝 Descripción
Breve descripción de los cambios realizados

## 🎯 Tipo de cambio
- [ ] Nueva feature
- [ ] Bugfix
- [ ] Refactor
- [ ] Documentación
- [ ] Performance

## ✅ Checklist
- [ ] Código pasa linting
- [ ] Código pasa build
- [ ] Documentación actualizada
- [ ] Sin conflictos con develop

## 📸 Screenshots (si aplica)
(Agregar imágenes de UI changes)
```

---

## 🔧 Comandos Útiles

### Comandos básicos
```bash
# Ver estado actual
git status

# Ver historial de commits (con gráfico de ramas)
git log --oneline --graph --all

# Ver cambios en archivos
git diff

# Ver ramas locales y remotas
git branch -a

# Ver rama actual
git branch --show-current
```

### Sincronización con develop
```bash
# Actualizar develop local
git checkout develop
git pull origin develop

# Actualizar feature con cambios de develop
git checkout feature/mi-feature
git merge develop
# O usando rebase (historial más limpio)
git rebase develop

# Traer cambios sin hacer merge
git fetch origin develop
```

### Gestión de ramas
```bash
# Crear feature desde develop
git checkout develop
git pull origin develop
git checkout -b feature/nueva-funcionalidad

# Cambiar entre ramas
git checkout develop
git checkout feature/mi-feature

# Eliminar rama local (después de merge)
git branch -d feature/mi-feature

# Eliminar rama remota
git push origin --delete feature/mi-feature

# Ver ramas mergeadas a develop
git branch --merged develop

# Limpiar ramas locales ya mergeadas
git branch --merged develop | grep -v "^\* develop" | xargs -n 1 git branch -d
```

### Commits y cambios
```bash
# Deshacer cambios no commiteados
git checkout -- <archivo>
git restore <archivo>  # Comando nuevo

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Ver diferencias con develop
git diff develop

# Amendear último commit (agregar cambios olvidados)
git add archivo-olvidado.ts
git commit --amend --no-edit

# Stash: guardar cambios temporalmente
git stash
git stash pop
git stash list
```

### Release y tags
```bash
# Crear release desde develop
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0

# Crear tag después de merge a main
git checkout main
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Ver todos los tags
git tag -l

# Ver detalles de un tag
git show v1.0.0

# Eliminar tag
git tag -d v1.0.0
git push origin --delete v1.0.0
```

### Hotfix rápido
```bash
# Crear hotfix desde main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug

# Después de fix, merge a main y develop
git checkout main
git merge --no-ff hotfix/critical-bug
git tag -a v1.0.1 -m "Hotfix: critical bug"
git push origin main --tags

git checkout develop
git merge --no-ff hotfix/critical-bug
git push origin develop
```

### Squash de commits (antes de PR)
```bash
# Squash últimos 3 commits en uno solo
git rebase -i HEAD~3

# En el editor, cambiar "pick" a "squash" en los commits a juntar
# Guardar y editar el mensaje del commit resultante
```

### Ver información
```bash
# Ver qué cambió entre ramas
git diff develop..feature/mi-feature

# Ver commits que están en feature pero no en develop
git log develop..feature/mi-feature

# Ver quién modificó cada línea de un archivo
git blame archivo.ts

# Buscar en el historial
git log --grep="pagination"
```

---

## 🛡️ Reglas de Protección de Ramas

En un entorno de producción, configurar en GitHub:

### Protección de `main`:

1. ✅ **Require pull request reviews before merging**
   - Al menos 1-2 aprobaciones requeridas
   - Solo desde `release/*` o `hotfix/*`

2. ✅ **Require status checks to pass**
   - Linting debe pasar (`npm run lint`)
   - Build debe pasar (`npm run build`)
   - Tests deben pasar (si existen)

3. ✅ **Require branches to be up to date**
   - Branch debe estar actualizada antes de merge

4. ❌ **No force push**
   - Prohibir `git push --force`

5. ❌ **No deletion**
   - Prohibir eliminar la rama

### Protección de `develop`:

1. ✅ **Require pull request reviews**
   - Al menos 1 aprobación
   - Solo desde `feature/*`

2. ✅ **Require status checks**
   - Linting y build deben pasar

3. ❌ **No force push**

**Nota:** Este challenge no implementa protecciones, pero en un proyecto real son esenciales.

---

## 📄 Gitignore

El proyecto incluye un `.gitignore` configurado para ignorar:

```bash
# Node
node_modules/
npm-debug.log*

# Build
dist/
dist-ssr/

# Environment
.env*
!.env.example  # Se versiona el ejemplo

# IDE
.vscode/*
!.vscode/extensions.json
.idea/

# OS
.DS_Store
```

---

## 🏷️ Tags y Releases

### Crear versiones etiquetadas:

```bash
# Crear tag anotado
git tag -a v1.0.0 -m "Release v1.0.0: Initial production release"

# Push tag a remote
git push origin v1.0.0

# Ver todos los tags
git tag -l

# Eliminar tag
git tag -d v1.0.0
git push origin --delete v1.0.0
```

### Versionado Semántico (SemVer):

- `v1.0.0` → MAJOR.MINOR.PATCH
- **MAJOR**: Cambios incompatibles (breaking changes)
- **MINOR**: Nueva funcionalidad compatible
- **PATCH**: Bugfixes compatibles

**Ejemplos:**
- `v1.0.0` → Primera versión estable
- `v1.1.0` → Nueva feature (compatible)
- `v1.1.1` → Bugfix (compatible)
- `v2.0.0` → Breaking change (incompatible)

---

## 🔄 Resolución de Conflictos

```bash
# Cuando hay conflictos después de merge
git status  # Ver archivos en conflicto

# Editar archivos y resolver conflictos manualmente
# Buscar markers: <<<<<<< HEAD, =======, >>>>>>>

# Después de resolver
git add archivo-resuelto.ts
git commit -m "merge: resolve conflicts with develop"
```

---

## 💡 Mejores Prácticas y Recomendaciones

### Para el día a día:

1. 🔄 **Commits frecuentes y pequeños**
   - Commit después de cada cambio lógico completo
   - Evita commits gigantes con muchos cambios

2. 📝 **Mensajes descriptivos**
   - Usa Conventional Commits siempre
   - Ejemplo: `feat(auth): add password reset flow`

3. 🔀 **Sincroniza con develop frecuentemente**
   - Pull de `develop` al menos 1 vez al día
   - Evita conflictos grandes acumulados

4. 🧪 **Verifica antes de PR**
   - `npm run lint` debe pasar
   - `npm run build` debe funcionar
   - Prueba la funcionalidad manualmente

5. 🔍 **Code Review**
   - Pide al menos 1 review antes de merge
   - Revisa PRs de otros desarrolladores
   - Usa comentarios constructivos

6. 🧹 **Limpieza de ramas**
   - Elimina ramas después de merge
   - Mantén solo ramas activas en remoto

7. 📦 **PRs pequeños y enfocados**
   - 1 PR = 1 feature o 1 fix
   - Máximo 300-500 líneas de código
   - Más fácil de revisar y mergear

8. 🎯 **Trabaja en develop, deployea desde main**
   - Nunca commitees directamente en `main`
   - `develop` es tu rama de trabajo diaria
   - `main` solo para releases estables

### Para releases:

9. 📋 **Prepara bien las releases**
   - Actualiza `package.json` version
   - Actualiza CHANGELOG.md (si existe)
   - Prueba exhaustivamente antes de merge a main

10. 🏷️ **Etiqueta siempre**
    - Cada merge a main debe tener un tag
    - Usa Semantic Versioning (SemVer)

### Para emergencias:

11. 🚨 **Hotfixes solo para críticos**
    - Solo usa hotfix para bugs que afectan producción
    - Mergea a main Y develop
    - Documenta bien el problema y solución

12. 📢 **Comunica**
    - Avisa al equipo de hotfixes
    - Documenta en PRs el contexto del cambio

---

## 🎬 Ejemplo Completo: Ciclo de Vida de una Feature

### Historia: Agregar sistema de notificaciones

```bash
# ============================================
# SEMANA 1: DESARROLLO DE FEATURE
# ============================================

# Lunes: Crear feature desde develop
git checkout develop
git pull origin develop
git checkout -b feature/notification-system

# Desarrollo día 1
git add src/components/Notification.tsx
git commit -m "feat(notifications): add Notification component"

# Martes: Continuar desarrollo
git add src/hooks/useNotifications.ts
git commit -m "feat(notifications): add useNotifications hook"

# Miércoles: Tests y refinamiento
git add src/components/__tests__/Notification.test.tsx
git commit -m "test(notifications): add component tests"

git add src/components/Notification.tsx
git commit -m "refactor(notifications): improve accessibility"

# Jueves: Actualizar con develop (otros devs han mergeado features)
git checkout develop
git pull origin develop
git checkout feature/notification-system
git merge develop
# Resolver conflictos si hay

# Viernes: PR y review
git push origin feature/notification-system
# Crear PR en GitHub: feature/notification-system -> develop
# Solicitar review al equipo

# ============================================
# SEMANA 2: INTEGRACIÓN Y RELEASE
# ============================================

# Lunes: PR aprobado, merge a develop
# Se mergea via GitHub
git checkout develop
git pull origin develop
git branch -d feature/notification-system  # Limpiar local

# Miércoles: Preparar release (varias features listas)
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# Actualizar version
# Editar package.json: "version": "1.2.0"
git add package.json
git commit -m "release: bump version to 1.2.0"

# QA encuentra un bug menor
git add src/components/Notification.tsx
git commit -m "fix(release): correct notification z-index"

# Viernes: Release a producción
git push origin release/v1.2.0
# Crear PR: release/v1.2.0 -> main

# Después de aprobación:
git checkout main
git pull origin main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release v1.2.0: Notification system and more"
git push origin main --tags

# IMPORTANTE: Mergear cambios de release de vuelta a develop
git checkout develop
git merge --no-ff release/v1.2.0
git push origin develop

# Limpiar
git branch -d release/v1.2.0
git push origin --delete release/v1.2.0

# ============================================
# DÍA SIGUIENTE: HOTFIX CRÍTICO
# ============================================

# Se detecta bug crítico en notificaciones que crashea la app
git checkout main
git pull origin main
git checkout -b hotfix/notification-crash

# Fix rápido
git add src/components/Notification.tsx
git commit -m "fix(notifications): prevent crash on null user"

# Test local
npm run build
npm run preview

# Merge a main
git checkout main
git merge --no-ff hotfix/notification-crash
git tag -a v1.2.1 -m "Hotfix v1.2.1: Fix notification crash"
git push origin main --tags

# Merge también a develop
git checkout develop
git merge --no-ff hotfix/notification-crash
git push origin develop

# Limpiar
git branch -d hotfix/notification-crash
git push origin --delete hotfix/notification-crash

# ============================================
# RESULTADO FINAL
# ============================================
# main:    v1.2.1 (producción estable)
# develop: Incluye v1.2.1 + features en desarrollo
# Estado: Repo limpio, sin ramas obsoletas
```

---

## 📊 Diagrama Visual del Flujo

```
Tiempo ──────────────────────────────────────────────────►

main    ●────────────────────────────●─────●──────►
        │                            ↑     ↑
        │                       (v1.2.0) (v1.2.1)
        │                            │     │
        │                      merge │     │ hotfix
        │                            │     │
develop ●────●────●────●────●────────●─────●──────►
        │    ↑    ↑    ↑    ↑        │     ↑
        │    │    │    │    │   merge │     │
        │    │    │    │    │   back  │     │
        │    │    │    │    │        ↓     │
release │    │    │    │    │    ●───●─────┘
        │    │    │    │    │    │
        │    │    │    │    │    └─bugfix
        │    │    │    │    │
feat/A  │    ●────●────┘    │  (notification-system)
        │                   │
feat/B  │                   ●────┘
        │
feat/C  │    ●────────────────────┘
        │
        │
Leyenda:
● = Commit
↑ = Merge / PR
```

---

## 📝 Resumen Ejecutivo

**Ramas permanentes:**
- `main`: Producción (tags: v1.0.0, v1.1.0, v1.2.0...)
- `develop`: Integración continua de desarrollo

**Ramas temporales:**
- `feature/*`: Desde develop → PR a develop
- `release/*`: Desde develop → PR a main (y merge back a develop)
- `bugfix/*`: Desde release → PR a release
- `hotfix/*`: Desde main → merge a main y develop

**Regla de oro:**
> 🎯 **Desarrolla en `develop`, deploya desde `main`**

---

## 📚 Referencias

- [Git Flow Original](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Atlassian Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

---

**Última actualización:** Enero 2026
