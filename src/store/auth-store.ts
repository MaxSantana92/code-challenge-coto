import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  user: { email: string } | null
  token: string | null
  setSession: (user: { email: string }, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setSession: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-store' }
  )
)
