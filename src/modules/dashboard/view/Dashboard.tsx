import React from 'react'
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react'

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
import { useAuthStore } from '@/store/auth-store'

const MOCK_CANDIDATES = [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana.garcia@email.com',
    date: '16/07/2025',
    stack: ['React', 'Node.js', 'Python'],
    seniority: 'Senior',
  },
  {
    id: '2',
    name: 'Luis Fernández',
    email: 'luis.fernandez@email.com',
    date: '12/06/2025',
    stack: ['Angular', 'TypeScript', 'Java'],
    seniority: 'Semi Senior',
  },
  {
    id: '3',
    name: 'María López',
    email: 'maria.lopez@email.com',
    date: '08/05/2025',
    stack: ['Vue', 'Nuxt', 'Node.js', 'MongoDB'],
    seniority: 'Junior',
  },
  {
    id: '4',
    name: 'Javier Ortega',
    email: 'javier.ortega@email.com',
    date: '20/04/2025',
    stack: ['React', 'Next.js', 'Tailwind', 'Go', 'PostgreSQL'],
    seniority: 'Senior',
  },
  {
    id: '5',
    name: 'Sofía Rivas',
    email: 'sofia.rivas@email.com',
    date: '03/03/2025',
    stack: ['Python', 'Django', 'React', 'Docker'],
    seniority: 'Semi Senior',
  },
]

function Dashboard() {
  const [technology, setTechnology] = React.useState<string | undefined>()
  const [seniority, setSeniority] = React.useState<string | undefined>()
  const [search, setSearch] = React.useState('')
  const logout = useAuthStore((s) => s.logout)

  const technologyOptions = React.useMemo(
    () => Array.from(new Set(MOCK_CANDIDATES.flatMap((candidate) => candidate.stack))),
    []
  )

  const seniorityOptions = React.useMemo(
    () => Array.from(new Set(MOCK_CANDIDATES.map((c) => c.seniority))),
    []
  )

  const filteredCandidates = React.useMemo(() => {
    return MOCK_CANDIDATES.filter((candidate) => {
      const matchTech = technology ? candidate.stack.includes(technology) : true
      const matchSeniority = seniority ? candidate.seniority === seniority : true
      const term = search.toLowerCase().trim()
      const matchSearch = term
        ? candidate.name.toLowerCase().includes(term) ||
          candidate.email.toLowerCase().includes(term)
        : true
      return matchTech && matchSeniority && matchSearch
    })
  }, [technology, seniority, search])

  return (
    <div className='min-h-screen bg-slate-50 flex flex-col'>
      <header className='bg-slate-900 text-white'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-sm font-semibold uppercase tracking-tight'>
              RC
            </div>
            <div className='flex flex-col'>
              <span className='text-base font-semibold leading-tight'>Recruiter Dashboard</span>
              <span className='text-xs text-white/70'>Talento tech</span>
            </div>
          </div>
          <Button
            variant='ghost'
            size='sm'
            className='text-white hover:bg-white/10'
            onClick={logout}
          >
            <LogOut className='size-4' />
            <span className='hidden sm:inline'>Cerrar sesión</span>
          </Button>
        </div>
      </header>

      <main className='flex-1 px-4 py-6 sm:px-6 lg:px-8'>
        <Card className='mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white shadow-lg'>
          <CardHeader className='rounded-2xl rounded-b-none border-b border-orange-100 bg-orange-50/80'>
            <div className='flex flex-col gap-1'>
              <CardTitle className='text-lg font-semibold text-slate-900'>Filtros</CardTitle>
              <p className='text-sm text-slate-600'>Refina la búsqueda por stack y seniority.</p>
            </div>
            <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-medium text-slate-700'>Tecnología</span>
                <Select
                  value={technology}
                  onValueChange={(value) => setTechnology(value === 'all' ? undefined : value)}
                >
                  <SelectTrigger className='w-full bg-white'>
                    <SelectValue placeholder='Todas las tecnologías' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Todas</SelectItem>
                    {technologyOptions.map((tech) => (
                      <SelectItem key={tech} value={tech}>
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-medium text-slate-700'>Seniority</span>
                <Select
                  value={seniority}
                  onValueChange={(value) => setSeniority(value === 'all' ? undefined : value)}
                >
                  <SelectTrigger className='w-full bg-white'>
                    <SelectValue placeholder='Todos los niveles' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Todos</SelectItem>
                    {seniorityOptions.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-medium text-slate-700'>Buscar</span>
                <Input
                  placeholder='Nombre o email'
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className='bg-white'
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className='px-0 pb-0 pt-4 sm:px-0'>
            <div className='overflow-hidden rounded-2xl border border-slate-200'>
              <Table className='min-w-[720px]'>
                <TableHeader className='bg-slate-100/60'>
                  <TableRow>
                    <TableHead className='pl-6'>Usuario</TableHead>
                    <TableHead>Fecha de ingreso</TableHead>
                    <TableHead>Lenguajes</TableHead>
                    <TableHead className='text-right pr-6'>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCandidates.map((candidate) => {
                    const visibleStack = candidate.stack.slice(0, 2)
                    const remaining = candidate.stack.length - visibleStack.length

                    return (
                      <TableRow key={candidate.id} className='hover:bg-orange-50/60'>
                        <TableCell className='pl-6'>
                          <div className='flex items-center gap-3'>
                            <Avatar className='h-11 w-11'>
                              <AvatarFallback>{candidate.name.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                              <span className='text-sm font-semibold text-slate-900'>
                                {candidate.name}
                              </span>
                              <span className='text-xs text-slate-500'>{candidate.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className='text-slate-700'>{candidate.date}</TableCell>
                        <TableCell>
                          <div className='flex flex-wrap items-center gap-2'>
                            {visibleStack.map((tech) => (
                              <Badge
                                key={`${candidate.id}-${tech}`}
                                variant='secondary'
                                className='bg-orange-50 text-slate-800'
                              >
                                {tech}
                              </Badge>
                            ))}
                            {remaining > 0 && (
                              <Badge
                                variant='outline'
                                className='border-orange-200 bg-orange-50 text-primary'
                              >
                                +{remaining}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className='pr-6'>
                          <div className='flex justify-end gap-2'>
                            <CandidateDetailModal
                              candidate={candidate}
                              trigger={
                                <Button
                                  variant='outline'
                                  size='sm'
                                  className='border-primary/40 text-primary hover:border-primary hover:text-primary'
                                >
                                  Ver Detalle
                                </Button>
                              }
                            />
                            <ContactModal
                              trigger={
                                <Button
                                  size='sm'
                                  className='bg-primary text-primary-foreground hover:bg-primary/90'
                                >
                                  Contactar
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
              Mostrando {filteredCandidates.length} de {MOCK_CANDIDATES.length} candidatos
            </p>
            <Pagination className='w-full justify-start sm:w-auto sm:justify-end'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    size='icon'
                    aria-label='Anterior'
                    className='text-slate-600'
                  >
                    <ChevronLeft className='size-4' />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href='#' isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href='#'>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    size='icon'
                    aria-label='Siguiente'
                    className='text-slate-600'
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
