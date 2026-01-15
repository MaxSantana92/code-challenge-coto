export const ENDPOINT = {
  CANDIDATES: '/userlist',
  ROLES: '/roleslist',
  MESSAGES: '/messages',
} as const

export type EndpointKey = keyof typeof ENDPOINTS
export type EndpointValue = (typeof ENDPOINTS)[EndpointKey]
