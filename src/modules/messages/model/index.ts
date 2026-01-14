export type MessageStatus = 'received' | 'pending' | 'error'

export type SendMessageRequest = {
  role: string
  msj: string
}

export type SendMessageResponse = {
  id: number
  role: string
  msj: string
  submitted_at: string
  status: MessageStatus
}

export type MessageHistoryItem = SendMessageResponse & {
  email: string
}

export type MessageErrorResponse = {
  error: string
  message: string
}
