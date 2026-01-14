import React from 'react'
import { ChevronLeft, ChevronRight, Eye, LogOut, Mail } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ContactModal from '@/components/ContactModal'
import CandidateDetailModal from '@/components/CandidateDetailModal'
import { useCandidatesStore } from '@/store/candidates-store'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ensureArray, formatDate, uniqueValues } from '@/lib/utils'
import { useAuthStore } from '@/store/auth-store'

function Dashboard() {
  const [technology, setTechnology] = React.useState<string | undefined>()
  const [level, setLevel] = React.useState<string | undefined>()
  const [search, setSearch] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [sort, setSort] = React.useState<{
    field: 'username' | 'joined_at' | 'score' | 'language'
    direction: 'asc' | 'desc'
  }>({
    field: 'username',
    direction: 'asc',
  })
  const pageSize = 5

  const { candidates, loading, error, fetchCandidates } = useCandidatesStore((state) => state)
  const logout = useAuthStore((s) => s.logout)

  React.useEffect(() => {
    if (candidates.length === 0) fetchCandidates()
  }, [candidates])

  const safeCandidates = React.useMemo(
    () => ensureArray<(typeof candidates)[number]>(candidates),
    [candidates]
  )

  const technologyOptions = React.useMemo(
    () =>
      uniqueValues(safeCandidates.flatMap((candidate) => candidate.skills.map((s) => s.language))),
    [safeCandidates]
  )

  const levelOptions = React.useMemo(
    () => uniqueValues(safeCandidates.flatMap((candidate) => candidate.skills.map((s) => s.level))),
    [safeCandidates]
  )

  const filteredCandidates = React.useMemo(() => {
    return safeCandidates.filter((candidate) => {
      const matchTech = technology
        ? candidate.skills.some((skill) => skill.language === technology)
        : true
      const matchLevel = level ? candidate.skills.some((skill) => skill.level === level) : true
      const term = search.toLowerCase().trim()
      const matchSearch = term ? candidate.username.toLowerCase().includes(term) : true
      return matchTech && matchLevel && matchSearch
    })
  }, [safeCandidates, technology, level, search])

  const sortedCandidates = React.useMemo(() => {
    const sorted = [...filteredCandidates]
    const { field, direction } = sort

    const firstLanguage = (candidate: (typeof safeCandidates)[number]) =>
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
  }, [filteredCandidates, sort, safeCandidates])

  React.useEffect(() => {
    setPage(1)
  }, [technology, level, search, sort])

  const totalPages = Math.max(1, Math.ceil(sortedCandidates.length / pageSize))
  React.useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages))
  }, [totalPages])

  const paginatedCandidates = React.useMemo(() => {
    const start = (page - 1) * pageSize
    return sortedCandidates.slice(start, start + pageSize)
  }, [sortedCandidates, page, pageSize])

  const pages = React.useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages]
  )

  return (
    <div className='min-h-screen bg-background text-foreground flex flex-col'>
      <header className='bg-card text-foreground border-b border-border'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold uppercase tracking-tight text-primary'>
              RC
            </div>
            <div className='flex flex-col'>
              <span className='text-base font-semibold leading-tight'>Recruiter Dashboard</span>
              <span className='text-xs text-muted-foreground'>Talento tech</span>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <ThemeToggle />
            <Button variant='ghost' size='sm' className='hover:bg-muted' onClick={logout}>
              <LogOut className='size-4' />
              <span className='hidden sm:inline'>Cerrar sesion</span>
            </Button>
          </div>
        </div>
      </header>

      <main className='flex-1 px-4 py-6 sm:px-6 lg:px-8'>
        <Card className='mx-auto w-full max-w-6xl rounded-2xl border border-border bg-card shadow-lg'>
          <CardHeader className='rounded-2xl rounded-b-none border-b border-border bg-accent/50'>
            <div className='flex flex-col gap-1'>
              <CardTitle className='text-lg font-semibold'>Filtros</CardTitle>
              <p className='text-sm text-muted-foreground'>
                Refina la busqueda por lenguaje y nivel.
              </p>
            </div>
            <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-medium text-muted-foreground'>Lenguaje</span>
                <Select
                  value={technology}
                  onValueChange={(value) => setTechnology(value === 'all' ? undefined : value)}
                >
                  <SelectTrigger className='w-full bg-background'>
                    <SelectValue placeholder='Todos los lenguajes' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Todos</SelectItem>
                    {technologyOptions.map((tech) => (
                      <SelectItem key={tech} value={tech}>
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-medium text-muted-foreground'>Nivel</span>
                <Select
                  value={level}
                  onValueChange={(value) => setLevel(value === 'all' ? undefined : value)}
                >
                  <SelectTrigger className='w-full bg-background'>
                    <SelectValue placeholder='Todos los niveles' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Todos</SelectItem>
                    {levelOptions.map((lvl) => (
                      <SelectItem key={lvl} value={lvl}>
                        {lvl}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-medium text-muted-foreground'>Buscar</span>
                <Input
                  placeholder='Usuario'
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className='bg-background'
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className='px-0 pb-0 pt-4 sm:px-0'>
            <div className='overflow-x-auto rounded-2xl border border-border'>
              <Table className='min-w-[720px]'>
                <TableHeader className='bg-muted/60'>
                  <TableRow>
                    <TableHead className='pl-6'>
                      <button
                        className='flex items-center gap-1 text-left font-semibold text-foreground hover:text-primary'
                        onClick={() =>
                          setSort((prev) =>
                            prev.field === 'username'
                              ? {
                                  field: 'username',
                                  direction: prev.direction === 'asc' ? 'desc' : 'asc',
                                }
                              : { field: 'username', direction: 'asc' }
                          )
                        }
                      >
                        Usuario
                        {sort.field === 'username' ? (sort.direction === 'asc' ? '▲' : '▼') : '↕'}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        className='flex items-center gap-1 text-left font-semibold text-foreground hover:text-primary'
                        onClick={() =>
                          setSort((prev) =>
                            prev.field === 'joined_at'
                              ? {
                                  field: 'joined_at',
                                  direction: prev.direction === 'asc' ? 'desc' : 'asc',
                                }
                              : { field: 'joined_at', direction: 'asc' }
                          )
                        }
                      >
                        Fecha de ingreso
                        {sort.field === 'joined_at' ? (sort.direction === 'asc' ? '▲' : '▼') : '↕'}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        className='flex items-center gap-1 text-left font-semibold text-foreground hover:text-primary'
                        onClick={() =>
                          setSort((prev) =>
                            prev.field === 'language'
                              ? {
                                  field: 'language',
                                  direction: prev.direction === 'asc' ? 'desc' : 'asc',
                                }
                              : { field: 'language', direction: 'asc' }
                          )
                        }
                      >
                        Skills
                        {sort.field === 'language' ? (sort.direction === 'asc' ? '▲' : '▼') : '↕'}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        className='flex items-center gap-1 text-left font-semibold text-foreground hover:text-primary'
                        onClick={() =>
                          setSort((prev) =>
                            prev.field === 'score'
                              ? {
                                  field: 'score',
                                  direction: prev.direction === 'asc' ? 'desc' : 'asc',
                                }
                              : { field: 'score', direction: 'asc' }
                          )
                        }
                      >
                        Score
                        {sort.field === 'score' ? (sort.direction === 'asc' ? '▲' : '▼') : '↕'}
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

                  {!loading && !error && paginatedCandidates.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className='py-6 text-center text-muted-foreground'>
                        No hay usuarios que coincidan con tu busqueda.
                      </TableCell>
                    </TableRow>
                  )}

                  {!loading &&
                    !error &&
                    paginatedCandidates.map((candidate) => {
                      const visibleSkills = candidate.skills.slice(0, 3)
                      const remaining = candidate.skills.length - visibleSkills.length

                      return (
                        <TableRow key={candidate.username} className='hover:bg-muted/60'>
                          <TableCell className='pl-6'>
                            <div className='flex items-center gap-3'>
                              <Avatar className='h-11 w-11'>
                                <AvatarFallback>
                                  {candidate.username.slice(0, 1).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className='flex flex-col'>
                                <span className='text-sm font-semibold'>{candidate.username}</span>
                                <span className='text-xs text-muted-foreground'>
                                  Miembro desde {formatDate(candidate.joined_at)}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className='text-muted-foreground'>
                            {formatDate(candidate.joined_at)}
                          </TableCell>
                          <TableCell>
                            <div className='flex flex-wrap items-center gap-2'>
                              {visibleSkills.map((skill) => (
                                <Badge
                                  key={`${candidate.username}-${skill.language}-${skill.level}`}
                                  variant='secondary'
                                  className='bg-accent text-foreground'
                                >
                                  {skill.language} ({skill.level})
                                </Badge>
                              ))}
                              {remaining > 0 && (
                                <Badge variant='outline' className='border-primary/40 text-primary'>
                                  +{remaining}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant='outline' className='border-primary/40 text-primary'>
                              {candidate.score}
                            </Badge>
                          </TableCell>
                          <TableCell className='pr-6'>
                            <div className='flex justify-end gap-2'>
                              <CandidateDetailModal
                                candidate={candidate}
                                trigger={
                                  <Button
                                    variant='outline'
                                    size='icon'
                                    className='border-border text-foreground hover:border-primary hover:text-primary'
                                    title='Ver detalles'
                                    aria-label='Ver detalles'
                                  >
                                    <Eye className='size-4' />
                                  </Button>
                                }
                              />
                              <ContactModal
                                trigger={
                                  <Button
                                    size='icon'
                                    className='bg-primary text-primary-foreground hover:bg-primary/90'
                                    title='Contactar'
                                    aria-label='Contactar'
                                  >
                                    <Mail className='size-4' />
                                  </Button>
                                }
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </div>
          </CardContent>

          <CardFooter className='flex flex-col gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-sm text-slate-600'>
              Mostrando {paginatedCandidates.length} de {sortedCandidates.length} usuarios
              {sortedCandidates.length !== safeCandidates.length
                ? ` (de ${safeCandidates.length} totales)`
                : ''}
            </p>
            <Pagination className='w-full justify-start sm:w-auto sm:justify-end'>
              <PaginationContent className='gap-1 hidden sm:flex'>
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    size='icon'
                    aria-label='Anterior'
                    aria-disabled={page === 1}
                    className='text-slate-600'
                    onClick={(event) => {
                      event.preventDefault()
                      setPage((prev) => Math.max(1, prev - 1))
                    }}
                  >
                    <ChevronLeft className='size-4' />
                  </PaginationLink>
                </PaginationItem>

                {pages.map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href='#'
                      isActive={pageNumber === page}
                      onClick={(event) => {
                        event.preventDefault()
                        setPage(pageNumber)
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationLink
                    href='#'
                    size='icon'
                    aria-label='Siguiente'
                    aria-disabled={page === totalPages}
                    className='text-slate-600'
                    onClick={(event) => {
                      event.preventDefault()
                      setPage((prev) => Math.min(totalPages, prev + 1))
                    }}
                  >
                    <ChevronRight className='size-4' />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>

              <PaginationContent className='flex gap-1 sm:hidden'>
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    size='icon'
                    aria-label='Anterior'
                    aria-disabled={page === 1}
                    className='text-slate-600'
                    onClick={(event) => {
                      event.preventDefault()
                      setPage((prev) => Math.max(1, prev - 1))
                    }}
                  >
                    <ChevronLeft className='size-4' />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <span className='px-3 text-sm text-slate-700'>
                    {page} / {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    size='icon'
                    aria-label='Siguiente'
                    aria-disabled={page === totalPages}
                    className='text-slate-600'
                    onClick={(event) => {
                      event.preventDefault()
                      setPage((prev) => Math.min(totalPages, prev + 1))
                    }}
                  >
                    <ChevronRight className='size-4' />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

export default Dashboard
