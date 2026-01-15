import { useMemo, useState } from 'react'
import { uniqueValues } from '@/lib/utils'
import type { Candidate } from '../model'

export type FilterState = {
  technology: string | undefined
  level: string | undefined
  search: string
}

export function useCandidateFilters(candidates: Candidate[]) {
  const [technology, setTechnology] = useState<string | undefined>()
  const [level, setLevel] = useState<string | undefined>()
  const [search, setSearch] = useState('')

  // Opciones disponibles para los filtros
  const technologyOptions = useMemo(
    () => uniqueValues(candidates.flatMap((candidate) => candidate.skills.map((s) => s.language))),
    [candidates]
  )

  const levelOptions = useMemo(
    () => uniqueValues(candidates.flatMap((candidate) => candidate.skills.map((s) => s.level))),
    [candidates]
  )

  // Candidatos filtrados
  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchTech = technology
        ? candidate.skills.some((skill) => skill.language === technology)
        : true
      const matchLevel = level ? candidate.skills.some((skill) => skill.level === level) : true
      const term = search.toLowerCase().trim()
      const matchSearch = term ? candidate.username.toLowerCase().includes(term) : true
      return matchTech && matchLevel && matchSearch
    })
  }, [candidates, technology, level, search])

  const resetFilters = () => {
    setTechnology(undefined)
    setLevel(undefined)
    setSearch('')
  }

  return {
    // Estado
    technology,
    level,
    search,
    // Setters
    setTechnology,
    setLevel,
    setSearch,
    // Opciones
    technologyOptions,
    levelOptions,
    // Resultado
    filteredCandidates,
    // Utilidades
    resetFilters,
    hasActiveFilters: Boolean(technology || level || search),
  }
}
