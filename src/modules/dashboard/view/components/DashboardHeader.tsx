import { LogOut } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth-store'

export function DashboardHeader() {
  const logout = useAuthStore((s) => s.logout)

  return (
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
            <span className='hidden sm:inline'>Cerrar sesión</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
