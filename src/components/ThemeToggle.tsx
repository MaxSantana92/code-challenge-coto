import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type ThemeToggleProps = {
  className?: string
}

const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  if (!mounted) return null

  return (
    <button
      type='button'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted hover:text-foreground transition ${className}`}
      aria-label='Cambiar tema'
    >
      {isDark ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
      <span>{isDark ? 'Modo claro' : 'Modo oscuro'}</span>
    </button>
  )
}

export { ThemeToggle }
