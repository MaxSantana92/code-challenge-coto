import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import { LoadingScreen } from '@/components/feedback'
import { Toaster } from '@/components/ui/sonner'
import { PATHS, PrivateRoute, PublicRoute } from './routes'

// Lazy loading de componentes de ruta
const LoginPage = lazy(() => import('./modules/auth/view/login'))
const Dashboard = lazy(() => import('./modules/dashboard/view/Dashboard'))
const NotFound = lazy(() =>
  import('@/components/pages').then((module) => ({ default: module.NotFound }))
)

function App() {
  return (
    <HashRouter>
      {/* Usamos HashRouter para que las rutas funcionen en GitHub Pages */}
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={PATHS.LOGIN} element={<LoginPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path={PATHS.HOME} element={<Dashboard />} />
          </Route>

          {/* Ruta catch-all para páginas no encontradas */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </HashRouter>
  )
}

export default App
