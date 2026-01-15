import { useEffect, useMemo, useState } from 'react'

export type UsePaginationOptions = {
  pageSize?: number
  initialPage?: number
}

export function usePagination<T>(items: T[], options: UsePaginationOptions = {}) {
  const { pageSize = 5, initialPage = 1 } = options
  const [page, setPage] = useState(initialPage)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))

  // Ajustar página si se sale del rango
  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages))
  }, [totalPages])

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, page, pageSize])

  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages]
  )

  const goToPage = (pageNumber: number) => {
    setPage(Math.max(1, Math.min(pageNumber, totalPages)))
  }

  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages))
  }

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1))
  }

  const resetPage = () => {
    setPage(1)
  }

  return {
    page,
    pageSize,
    totalPages,
    pages,
    paginatedItems,
    setPage: goToPage,
    nextPage,
    prevPage,
    resetPage,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  }
}
