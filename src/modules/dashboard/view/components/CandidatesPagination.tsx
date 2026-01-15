import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CardFooter } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'

type CandidatesPaginationProps = {
  currentPage: number
  totalPages: number
  totalItems: number
  displayedItems: number
  filteredItems: number
  onNextPage: () => void
  onPrevPage: () => void
}

export function CandidatesPagination({
  currentPage,
  totalPages,
  totalItems,
  displayedItems,
  filteredItems,
  onNextPage,
  onPrevPage,
}: CandidatesPaginationProps) {
  return (
    <CardFooter className='flex flex-col gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between'>
      <p className='text-sm text-slate-600'>
        Mostrando {displayedItems} de {filteredItems} usuarios
        {filteredItems !== totalItems ? ` (de ${totalItems} totales)` : ''}
      </p>
      <Pagination className='w-full justify-start sm:w-auto sm:justify-end'>
        <PaginationContent className='flex gap-1'>
          <PaginationItem>
            <PaginationLink
              href='#'
              size='icon'
              aria-label='Anterior'
              aria-disabled={currentPage === 1}
              className='text-slate-600'
              onClick={(event) => {
                event.preventDefault()
                onPrevPage()
              }}
            >
              <ChevronLeft className='size-4' />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <span className='px-3 text-sm text-slate-700'>
              {currentPage} / {totalPages}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href='#'
              size='icon'
              aria-label='Siguiente'
              aria-disabled={currentPage === totalPages}
              className='text-slate-600'
              onClick={(event) => {
                event.preventDefault()
                onNextPage()
              }}
            >
              <ChevronRight className='size-4' />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </CardFooter>
  )
}
