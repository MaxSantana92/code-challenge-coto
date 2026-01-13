import { api } from '@/api'
import type { GetCandidatesResponse } from '../model'

export const getCandidates = async () => {
  const response = await api.get<GetCandidatesResponse>('/userlist')
  return response.data
}
