import { api } from '@/api'
import { ENDPOINT } from '@/api/endpoints'
import type { SendMessageRequest, SendMessageResponse } from '../model'

export const sendMessage = async (data: SendMessageRequest) => {
  const response = await api.post<SendMessageResponse>(ENDPOINT.MESSAGES, data)
  return response.data
}
