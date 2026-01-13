import type { LoginResponse } from '../model'

const DEMO_EMAIL = 'recruiter@demo.com'
const DEMO_PASS = '123456'

// Simulación de login con delay para mostrar estados de loading
export const login = async (email: string, password: string) => {
  return new Promise<LoginResponse>((resolve, reject) => {
    setTimeout(() => {
      if (email === DEMO_EMAIL && password === DEMO_PASS) {
        resolve({ token: 'mock-token', user: { email } })
      } else {
        reject(new Error('Credenciales inválidas'))
      }
    }, 2000) // ajusta el delay si lo necesitas
  })
}
