import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import type { Message, PaginatedEnvelope } from '@shared/types'

export function useMessages(connectionId: string) {
  return useQuery({
    queryKey: ['messages', connectionId],
    queryFn: () =>
      apiClient.getPaginated<PaginatedEnvelope<Message>>(
        `${Endpoints.MESSAGES(connectionId)}?page=1&limit=50`
      ),
    enabled: !!connectionId,
  })
}

interface SendMessagePayload {
  connectionId: string
  body: string
}

export function useSendMessage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ connectionId, body }: SendMessagePayload) =>
      apiClient.post<Message>(Endpoints.MESSAGES(connectionId), { body }),
    onSuccess: (_, { connectionId }) => {
      void qc.invalidateQueries({ queryKey: ['messages', connectionId] })
    },
  })
}
