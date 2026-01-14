import axios from 'axios'
import { showErrorToast } from '@/lib/toast-utils'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 🧪 INTERCEPTOR DE PRUEBA - Simula error 422 para roles inválidos
// TODO: REMOVER EN PRODUCCIÓN - Solo para testing
api.interceptors.request.use((config) => {
  // Simular error 422 cuando el rol sea BA (que no está en la lista válida)
  if (config.data && config.data.role === 'BA') {
    return Promise.reject({
      isAxiosError: true,
      response: {
        status: 422,
        data: {
          error: 'invalid_role',
          message: 'El rol debe ser uno de: Frontend, Backend, Fullstack, DBA',
        },
      },
      request: config,
      config: config,
      message: 'Request failed with status code 422',
    })
  }
  return config
})

// Interceptor para manejo global de errores
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422) {
        const errorData = error.response.data as { error?: string; message?: string }
        showErrorToast(errorData.message || 'Error de validación')
      } else if (error.response?.status && error.response.status >= 500) {
        showErrorToast('Error del servidor. Intentá nuevamente.')
      } else if (error.request && !error.response) {
        showErrorToast('Error de conexión. Verificá tu internet.')
      } else if (error.response) {
        showErrorToast('Ocurrió un error inesperado.')
      }
    }
    return Promise.reject(error)
  }
)
