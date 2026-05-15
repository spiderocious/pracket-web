import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import type { Connection } from '@shared/types'

export function useConnections() {
  return useQuery({
    queryKey: ['connections'],
    queryFn: () => apiClient.get<Connection[]>(Endpoints.CONNECTIONS),
  })
}

export function useConnection(id: string) {
  return useQuery({
    queryKey: ['connections', id],
    queryFn: () => apiClient.get<Connection>(Endpoints.CONNECTION(id)),
    enabled: !!id,
  })
}
