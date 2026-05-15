import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import type { TutorProfile } from '@shared/types'

export function useShortlist(enabled: boolean) {
  return useQuery({
    queryKey: ['shortlist'],
    queryFn: () => apiClient.get<TutorProfile[]>(Endpoints.SHORTLIST),
    enabled,
  })
}

export function useShortlistToggle(tutorId: string) {
  const qc = useQueryClient()

  const add = useMutation({
    mutationFn: () => apiClient.post<void>(Endpoints.SHORTLIST_ITEM(tutorId), {}),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ['shortlist'] }) },
  })

  const remove = useMutation({
    mutationFn: () => apiClient.delete<void>(Endpoints.SHORTLIST_ITEM(tutorId)),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ['shortlist'] }) },
  })

  return { add, remove }
}
