import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import type { TutorProfile, TutorAvailabilitySlot, Credential } from '@shared/types'

export function useMyProfile() {
  return useQuery({
    queryKey: ['tutor', 'me'],
    queryFn: () => apiClient.get<TutorProfile>(Endpoints.TUTOR_ME_PROFILE),
  })
}

interface ProfileUpdatePayload {
  bio?: string
  subjects?: string[]
  levels?: string[]
  rate?: number
  connectionFee?: number
  format?: string
  location?: string
}

export function useUpdateProfile() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: ProfileUpdatePayload) =>
      apiClient.patch<TutorProfile>(Endpoints.TUTOR_ME_PROFILE, payload),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ['tutor', 'me'] }) },
  })
}

interface AvailabilityPayload {
  availability: TutorAvailabilitySlot[]
}

export function useUpdateAvailability() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: AvailabilityPayload) =>
      apiClient.patch<TutorProfile>(Endpoints.TUTOR_ME_AVAILABILITY, payload),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ['tutor', 'me'] }) },
  })
}

export function useToggleVisibility() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (isListed: boolean) =>
      apiClient.patch<TutorProfile>(Endpoints.TUTOR_ME_VISIBILITY, { isListed }),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ['tutor', 'me'] }) },
  })
}

export function useMyCredentials() {
  return useQuery({
    queryKey: ['credentials', 'me'],
    queryFn: () => apiClient.get<Credential[]>(Endpoints.TUTOR_ME_CREDENTIALS),
  })
}

interface CredentialPayload {
  fileKey: string
  type: string
}

export function useSubmitCredential() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CredentialPayload) =>
      apiClient.post<Credential>(Endpoints.TUTOR_ME_CREDENTIALS, payload),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ['credentials', 'me'] }) },
  })
}
