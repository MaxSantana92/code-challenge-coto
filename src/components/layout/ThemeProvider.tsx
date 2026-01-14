import { ThemeProvider as NextThemesProvider } from 'next-themes'

type ThemeProviderProps = {
  children: React.ReactNode
}

// Proveedor de tema que aplica la clase "dark" al html para soportar temas en Tailwind
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
