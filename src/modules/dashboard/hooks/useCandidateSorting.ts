import { useMemo, useState } from 'react'
import type { Candidate } from '../model'

export type SortField = 'username' | 'joined_at' | 'score' | 'language'
export type SortDirection = 'asc' | 'desc'

export type SortConfig = {
  field: SortField
  direction: SortDirection
}

export function useCandidateSorting(candidates: Candidate[]) {
  const [sort, setSort] = useState<SortConfig>({
    field: 'username',
    direction: 'asc',
  })

  const sortedCandidates = useMemo(() => {
    const sorted = [...candidates]
    const { field, direction } = sort

    const firstLanguage = (candidate: Candidate) =>
      candidate.skills[0]?.language?.toLowerCase() ?? ''

    sorted.sort((a, b) => {
      let result = 0
      if (field === 'username') {
        result = a.username.localeCompare(b.username)
      } else if (field === 'joined_at') {
        result = new Date(a.joined_at).getTime() - new Date(b.joined_at).getTime()
      } else if (field === 'score') {
        result = a.score - b.score
      } else if (field === 'language') {
        result = firstLanguage(a).localeCompare(firstLanguage(b))
      }
      return direction === 'asc' ? result : -result
    })

    return sorted
  }, [candidates, sort])

  const toggleSort = (field: SortField) => {
    setSort((prev) =>
      prev.field === field
        ? {
            field,
            direction: prev.direction === 'asc' ? 'desc' : 'asc',
          }
        : { field, direction: 'asc' }
    )
  }

  return {
    sort,
    setSort,
    sortedCandidates,
    toggleSort,
  }
}
