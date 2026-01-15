export const ENDPOINT = {
  CANDIDATES: '/userlist',
  ROLES: '/roleslist',
  MESSAGES: '/messages',
} as const

export type EndpointKey = keyof typeof ENDPOINT
export type EndpointValue = (typeof ENDPOINT)[EndpointKey]
