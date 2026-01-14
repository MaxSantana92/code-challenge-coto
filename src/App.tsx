import { HashRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import { Toaster } from '@/components/ui/sonner'
import { NotFound } from './components/NotFound'
import LoginPage from './modules/auth/view/login'
import Dashboard from './modules/dashboard/view/Dashboard'
import { PATHS, PrivateRoute, PublicRoute } from './routes'

function App() {
  return (
    <HashRouter>
      {/* Usamos HashRouter para que las rutas funcionen en GitHub Pages */}
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
      <Toaster />
    </HashRouter>
  )
}

export default App
