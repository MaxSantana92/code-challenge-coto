import { api } from '@/api'
import type { SendMessageRequest, SendMessageResponse } from '../model'

export const sendMessage = async (data: SendMessageRequest) => {
  const response = await api.post<SendMessageResponse>('/messages', data)
  return response.data
}
