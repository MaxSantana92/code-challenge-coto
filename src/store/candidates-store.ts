import { create } from 'zustand'
import { ensureArray } from '@/lib/utils'
import type { Candidate } from '@/modules/dashboard/model'
import { getCandidates } from '@/modules/dashboard/service'

type CandidatesState = {
  candidates: Candidate[]
  loading: boolean
  error: string | null
  loaded: boolean
  requested: boolean
  fetchCandidates: () => Promise<void>
}

export const useCandidatesStore = create<CandidatesState>()((set, get) => ({
  candidates: [],
  loading: false,
  error: null,
  loaded: false,
  requested: false,
  fetchCandidates: async () => {
    const { loaded, loading, requested } = get()
    if (loaded || loading || requested) return

    set({ loading: true, error: null, requested: true })
    try {
      const data = await getCandidates()
      const safeCandidates = ensureArray<Candidate>(data)
      set({ candidates: safeCandidates, loading: false, loaded: true, requested: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error al obtener candidatos',
        loading: false,
        loaded: false,
        requested: false,
      })
    }
  },
}))
