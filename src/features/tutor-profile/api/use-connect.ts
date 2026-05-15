import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import type { Connection } from '@shared/types'

interface ConnectPayload {
  tutorId: string
}

export function useConnect() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (payload: ConnectPayload) =>
      apiClient.post<Connection>(Endpoints.CONNECTIONS, payload),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ['connections'] }) },
  })
}
