import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Asegura que el valor sea un arreglo, devolviendo uno vacío en caso contrario.
 */
export function ensureArray<T>(value: T[] | readonly T[] | null | undefined | unknown): T[] {
  return Array.isArray(value) ? ([...value] as T[]) : []
}

/**
 * Formatea fechas de manera segura con locale y opciones por defecto.
 */
export function formatDate(
  value: string | number | Date,
  locale = 'es-AR',
  options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale, options).format(date)
}

/**
 * Devuelve valores únicos preservando el orden de aparición.
 */
export function uniqueValues<T>(values: T[]): T[] {
  return Array.from(new Set(values))
}
