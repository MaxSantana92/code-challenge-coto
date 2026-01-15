export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '/404',
} as const

export type PathKey = keyof typeof PATHS
export type PathValue = (typeof PATHS)[PathKey]
