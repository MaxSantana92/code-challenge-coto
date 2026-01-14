import React from 'react'
import { Header } from '@/components/layout'
import { Card } from '@/components/ui/card'
import { ensureArray } from '@/lib/utils'
import { useCandidatesStore } from '@/store/candidates-store'
import { useCandidateFilters, useCandidateSorting, usePagination } from '../hooks'
import { CandidateFilters, CandidatesPagination, CandidatesTable } from './components'

function Dashboard() {
  // Store
  const { candidates, loading, error, fetchCandidates } = useCandidatesStore((state) => state)

  // Cargar candidatos al montar
  React.useEffect(() => {
    if (candidates.length === 0) fetchCandidates()
  }, [candidates.length, fetchCandidates])

  // Asegurar que candidates sea un array
  const safeCandidates = React.useMemo(
    () => ensureArray<(typeof candidates)[number]>(candidates),
    [candidates]
  )

  // Hooks personalizados para filtros, sorting y paginación
  const {
    technology,
    setTechnology,
    level,
    setLevel,
    search,
    setSearch,
    technologyOptions,
    levelOptions,
    filteredCandidates,
  } = useCandidateFilters(safeCandidates)

  const { sort, sortedCandidates, toggleSort } = useCandidateSorting(filteredCandidates)

  const {
    page,
    totalPages,
    paginatedItems: paginatedCandidates,
    nextPage,
    prevPage,
  } = usePagination(sortedCandidates, { pageSize: 5 })

  return (
    <div className='min-h-screen bg-background text-foreground flex flex-col'>
      <Header />

      <main className='flex-1 px-4 py-6 sm:px-6 lg:px-8'>
        <Card className='mx-auto w-full max-w-6xl rounded-2xl border border-border bg-card shadow-lg'>
          <CandidateFilters
            technology={technology}
            level={level}
            search={search}
            technologyOptions={technologyOptions}
            levelOptions={levelOptions}
            onTechnologyChange={setTechnology}
            onLevelChange={setLevel}
            onSearchChange={setSearch}
          />

          <CandidatesTable
            candidates={paginatedCandidates}
            loading={loading}
            error={error}
            sort={sort}
            onSortChange={toggleSort}
          />

          <CandidatesPagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={safeCandidates.length}
            displayedItems={paginatedCandidates.length}
            filteredItems={sortedCandidates.length}
            onNextPage={nextPage}
            onPrevPage={prevPage}
          />
        </Card>
      </main>
    </div>
  )
}

export default Dashboard
