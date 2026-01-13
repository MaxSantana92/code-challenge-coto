import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Loader2 } from 'lucide-react'

import { useAuthStore } from '@/store/auth-store'
import { login as loginService } from '@/modules/auth/service'

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const setSession = useAuthStore((s) => s.setSession)
  const navigate = useNavigate()

  const handleChange =
    (field: 'email' | 'password') => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }))
      setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }))
    }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newErrors: { email?: string; password?: string; general?: string } = {}

    if (!form.email.trim()) {
      newErrors.email = 'Este campo es obligatorio'
    }
    if (!form.password.trim()) {
      newErrors.password = 'Este campo es obligatorio'
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    try {
      const result = await loginService(form.email.trim(), form.password.trim())
      setSession(result.user, result.token)
      navigate('/', { replace: true })
    } catch (err) {
      setErrors({
        general: 'Los datos ingresados no coinciden. Por favor, verificá que sean correctos.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const emailHasError = Boolean(errors.email)
  const passwordHasError = Boolean(errors.password)

  return (
    <div className='relative min-h-screen bg-gray-50 overflow-hidden'>
      <div
        className='pointer-events-none absolute inset-0 opacity-80'
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,107,53,0.08), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,107,53,0.06), transparent 40%), radial-gradient(circle at 50% 80%, rgba(255,107,53,0.05), transparent 35%)',
        }}
      />

      <div className='relative flex min-h-screen items-center justify-center px-6 py-10'>
        <div className='w-full max-w-lg rounded-3xl bg-white px-7 py-8 shadow-xl shadow-orange-100/70 md:px-10 md:py-10'>
          <div className='flex flex-col items-center text-center gap-4'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 via-white to-orange-50 shadow-md'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B35] to-[#ff4f1a] text-white shadow-lg'>
                <Check size={26} strokeWidth={3} />
              </div>
            </div>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Iniciá sesión</h1>
              <p className='mt-1 text-base text-gray-600'>Con tu correo electrónico y contraseña</p>
            </div>
          </div>

          <form className='mt-8 space-y-6' onSubmit={handleSubmit} noValidate>
            <div className='space-y-2'>
              <label className='block text-sm font-semibold text-gray-900' htmlFor='email'>
                Correo electrónico
              </label>
              <input
                id='email'
                name='email'
                type='email'
                placeholder='Ingresá tu correo'
                value={form.email}
                onChange={handleChange('email')}
                className={`w-full rounded-2xl bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                  emailHasError
                    ? 'border border-red-400 focus:ring-red-500'
                    : 'border border-transparent focus:ring-orange-500'
                }`}
                aria-invalid={emailHasError}
                aria-describedby={emailHasError ? 'email-error' : undefined}
              />
              {emailHasError && (
                <p id='email-error' className='text-xs font-semibold text-[#e63946]'>
                  {errors.email}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-semibold text-gray-900' htmlFor='password'>
                Contraseña
              </label>
              <input
                id='password'
                name='password'
                type='password'
                placeholder='Ingresá tu contraseña'
                value={form.password}
                onChange={handleChange('password')}
                className={`w-full rounded-2xl bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                  passwordHasError
                    ? 'border border-red-400 focus:ring-red-500'
                    : 'border border-transparent focus:ring-orange-500'
                }`}
                aria-invalid={passwordHasError}
                aria-describedby={passwordHasError ? 'password-error' : undefined}
              />
              {passwordHasError && (
                <p id='password-error' className='text-xs font-semibold text-[#e63946]'>
                  {errors.password}
                </p>
              )}
            </div>

            {errors.general && (
              <p className='text-xs font-semibold text-[#e63946]'>{errors.general}</p>
            )}

            <button
              type='submit'
              disabled={isLoading}
              className='w-full rounded-2xl bg-[#FF6B35] px-4 py-3 text-base font-semibold text-white shadow-xl shadow-orange-200 transition hover:bg-[#ff5a1d] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-60 flex items-center justify-center'
            >
              {isLoading ? <Loader2 className='h-5 w-5 animate-spin' /> : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
