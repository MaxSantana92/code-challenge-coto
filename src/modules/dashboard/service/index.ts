import { api } from '@/api'
import { ENDPOINT } from '@/api/endpoints'
import type { GetCandidatesResponse, GetRolesResponse } from '../model'

export const getCandidates = async () => {
  const response = await api.get<GetCandidatesResponse>(ENDPOINT.CANDIDATES)
  return response.data
}

export const getRoles = async () => {
  const response = await api.get<GetRolesResponse>(ENDPOINT.ROLES)
  return response.data
}
