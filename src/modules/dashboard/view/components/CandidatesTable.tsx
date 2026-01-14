import { CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { SortConfig, SortField } from '../../hooks/useCandidateSorting'
import type { Candidate } from '../../model'
import { CandidateRow } from './CandidateRow'

type CandidatesTableProps = {
  candidates: Candidate[]
  loading: boolean
  error: string | null
  sort: SortConfig
  onSortChange: (field: SortField) => void
}

export function CandidatesTable({
  candidates,
  loading,
  error,
  sort,
  onSortChange,
}: CandidatesTableProps) {
  const getSortIcon = (field: SortField) => {
    if (sort.field === field) {
      return sort.direction === 'asc' ? '▲' : '▼'
    }
    return '↕'
  }

  return (
    <CardContent className='px-0 pb-0 pt-4 sm:px-0'>
      <div className='overflow-x-auto rounded-2xl border border-border'>
        <Table className='min-w-[720px]'>
          <TableHeader className='bg-muted/60'>
            <TableRow>
              <TableHead className='pl-6'>
                <button
                  type='button'
                  className='flex items-center gap-1 text-left font-semibold text-foreground hover:text-primary'
                  onClick={() => onSortChange('username')}
                >
                  Usuario {getSortIcon('username')}
                </button>
              </TableHead>
              <TableHead>
                <button
                  type='button'
                  className='flex items-center gap-1 text-left font-semibold text-foreground hover:text-primary'
                  onClick={() => onSortChange('joined_at')}
                >
                  Fecha de ingreso {getSortIcon('joined_at')}
                </button>
              </TableHead>
              <TableHead>
                <button
                  type='button'
                  className='flex items-center gap-1 text-left font-semibold text-foreground hover:text-primary'
                  onClick={() => onSortChange('language')}
                >
                  Skills {getSortIcon('language')}
                </button>
              </TableHead>
              <TableHead>
                <button
                  type='button'
                  className='flex items-center gap-1 text-left font-semibold text-foreground hover:text-primary'
                  onClick={() => onSortChange('score')}
                >
                  Score {getSortIcon('score')}
                </button>
              </TableHead>
              <TableHead className='text-right pr-6'>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={5} className='py-6 text-center text-muted-foreground'>
                  Cargando usuarios...
                </TableCell>
              </TableRow>
            )}

            {!loading && error && (
              <TableRow>
                <TableCell colSpan={5} className='py-6 text-center text-destructive'>
                  {error}
                </TableCell>
              </TableRow>
            )}

            {!loading && !error && candidates.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className='py-6 text-center text-muted-foreground'>
                  No hay usuarios que coincidan con tu búsqueda.
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              !error &&
              candidates.map((candidate) => (
                <CandidateRow key={candidate.username} candidate={candidate} />
              ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  )
}
