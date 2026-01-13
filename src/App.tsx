import { Routes, Route, HashRouter } from 'react-router-dom'

import './App.css'
import LoginPage from './modules/auth/view/login'
import Dashboard from './modules/dashboard/view/Dashboard'
import { PrivateRoute, PublicRoute } from './route-guards'

function App() {
  return (
    <HashRouter>
      {/* Usamos HashRouter para que las rutas funcionen en GitHub Pages */}
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/login' element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
