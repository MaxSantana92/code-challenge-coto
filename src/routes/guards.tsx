import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/auth-store'
import { PATHS } from './paths'

export function PrivateRoute() {
  const token = useAuthStore((s) => s.token)
  return token ? <Outlet /> : <Navigate to={PATHS.LOGIN} replace />
}

export function PublicRoute() {
  const token = useAuthStore((s) => s.token)
  return token ? <Navigate to={PATHS.HOME} replace /> : <Outlet />
}
