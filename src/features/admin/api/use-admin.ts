import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import type { Credential, Report, CredentialStatus } from '@shared/types'

export function useAdminCredentials(status: CredentialStatus = 'pending') {
  return useQuery({
    queryKey: ['admin', 'credentials', status],
    queryFn: () => apiClient.get<Credential[]>(`${Endpoints.ADMIN_CREDENTIALS}?status=${status}`),
  })
}

interface ReviewCredentialPayload {
  id: string
  reviewStatus: 'approved' | 'rejected'
}

export function useReviewCredential() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reviewStatus }: ReviewCredentialPayload) =>
      apiClient.patch<Credential>(Endpoints.ADMIN_CREDENTIAL(id), { reviewStatus }),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ['admin', 'credentials'] }) },
  })
}

export function useAdminReports(status: 'pending' | 'resolved' = 'pending') {
  return useQuery({
    queryKey: ['admin', 'reports', status],
    queryFn: () => apiClient.get<Report[]>(`${Endpoints.ADMIN_REPORTS}?status=${status}`),
  })
}

interface ResolveReportPayload {
  id: string
  adminNote: string
}

export function useResolveReport() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, adminNote }: ResolveReportPayload) =>
      apiClient.patch<Report>(Endpoints.ADMIN_REPORT(id), { status: 'resolved', adminNote }),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ['admin', 'reports'] }) },
  })
}

interface SuspendTutorPayload {
  tutorId: string
  isActive: boolean
}

export function useSuspendTutor() {
  return useMutation({
    mutationFn: ({ tutorId, isActive }: SuspendTutorPayload) =>
      apiClient.patch<{ id: string; isActive: boolean }>(Endpoints.ADMIN_TUTORS_TOGGLE(tutorId), { isActive }),
  })
}
