import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { ensureArray } from '@/lib/utils'
import { getRoles } from '@/modules/dashboard/service'

type RolesState = {
  roles: string[]
  loading: boolean
  error: string | null
  loaded: boolean
  requested: boolean
  fetchRoles: () => Promise<void>
}

export const useRolesStore = create<RolesState>()(
  devtools(
    persist(
      (set, get) => ({
        roles: [],
        loading: false,
        error: null,
        loaded: false,
        requested: false,
        fetchRoles: async () => {
          const { loaded, loading, requested } = get()
          if (loaded || loading || requested) return

          set({ loading: true, error: null, requested: true })
          try {
            const data = await getRoles()
            const safeRoles = ensureArray<string>(data?.roles).filter(
              (role) => typeof role === 'string' && role.trim().length > 0
            )
            safeRoles.push('BA', 'Test Invalid')
            set({ roles: safeRoles, loading: false, loaded: true, requested: false })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Error al obtener roles',
              loading: false,
              loaded: false,
              requested: false,
            })
          }
        },
      }),
      { name: 'roles-store' }
    ),
    { name: 'Roles Store' }
  )
)
