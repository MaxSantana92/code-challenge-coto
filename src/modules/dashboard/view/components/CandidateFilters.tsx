import { CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type CandidateFiltersProps = {
  technology: string | undefined
  level: string | undefined
  search: string
  technologyOptions: string[]
  levelOptions: string[]
  onTechnologyChange: (value: string | undefined) => void
  onLevelChange: (value: string | undefined) => void
  onSearchChange: (value: string) => void
}

export function CandidateFilters({
  technology,
  level,
  search,
  technologyOptions,
  levelOptions,
  onTechnologyChange,
  onLevelChange,
  onSearchChange,
}: CandidateFiltersProps) {
  return (
    <CardHeader className='rounded-2xl rounded-b-none border-b border-border bg-accent/50'>
      <div className='flex flex-col gap-1'>
        <CardTitle className='text-lg font-semibold'>Filtros</CardTitle>
        <p className='text-sm text-muted-foreground'>Refina la búsqueda por lenguaje y nivel.</p>
      </div>
      <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        <div className='flex flex-col gap-2'>
          <span className='text-sm font-medium text-muted-foreground'>Lenguaje</span>
          <Select
            value={technology}
            onValueChange={(value) => onTechnologyChange(value === 'all' ? undefined : value)}
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
            onValueChange={(value) => onLevelChange(value === 'all' ? undefined : value)}
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
            onChange={(event) => onSearchChange(event.target.value)}
            className='bg-background'
          />
        </div>
      </div>
    </CardHeader>
  )
}
