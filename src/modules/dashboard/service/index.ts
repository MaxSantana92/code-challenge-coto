import { api } from '@/api'
import type { GetCandidatesResponse, GetRolesResponse } from '../model'

export const getCandidates = async () => {
  const response = await api.get<GetCandidatesResponse>('/userlist')
  return response.data
}

export const getRoles = async () => {
  const response = await api.get<GetRolesResponse>('/roleslist')
  return response.data
}
