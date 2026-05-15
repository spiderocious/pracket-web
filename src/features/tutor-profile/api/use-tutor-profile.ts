import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import type { TutorProfile } from '@shared/types'

export function useTutorProfile(id: string) {
  return useQuery({
    queryKey: ['tutor', id],
    queryFn: () => apiClient.get<TutorProfile>(Endpoints.TUTOR_PUBLIC(id)),
    enabled: !!id,
  })
}
