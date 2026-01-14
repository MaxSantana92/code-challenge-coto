import { Home, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/routes'
import { Button } from '../ui/button'

export function NotFound() {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center px-4'>
      <div className='max-w-md w-full text-center'>
        <div className='mb-8 flex justify-center'>
          <div className='relative'>
            <Search className='size-24 text-muted-foreground/20' />
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='text-6xl font-bold text-primary'>404</span>
            </div>
          </div>
        </div>

        <h1 className='text-3xl font-bold text-foreground mb-4'>Página no encontrada</h1>
        <p className='text-muted-foreground mb-8'>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button asChild size='lg' className='gap-2'>
            <Link to={PATHS.HOME}>
              <Home className='size-4' />
              Volver al inicio
            </Link>
          </Button>
        </div>

        <p className='mt-8 text-sm text-muted-foreground'>
          Si crees que esto es un error, por favor contacta al soporte.
        </p>
      </div>
    </div>
  )
}
