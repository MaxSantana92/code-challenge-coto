import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { MessageHistoryItem } from '@/modules/messages/model'

type MessagesState = {
  messages: MessageHistoryItem[]
  loading: boolean
  error: string | null
  addMessage: (message: MessageHistoryItem) => void
  clearMessages: () => void
}

export const useMessagesStore = create<MessagesState>()(
  persist(
    (set) => ({
      messages: [],
      loading: false,
      error: null,
      addMessage: (message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }))
      },
      clearMessages: () => {
        set({ messages: [] })
      },
    }),
    { name: 'messages-store' }
  )
)
