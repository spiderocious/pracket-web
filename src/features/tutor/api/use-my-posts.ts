import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import type { Post } from '@shared/types'

export function useMyPosts(tutorId: string) {
  return useQuery({
    queryKey: ['posts', tutorId],
    queryFn: () => apiClient.get<Post[]>(`${Endpoints.POSTS}?tutorId=${tutorId}`),
    enabled: !!tutorId,
  })
}

interface CreatePostPayload {
  title: string
  body: string
  isPublished: boolean
}

export function useCreatePost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreatePostPayload) =>
      apiClient.post<Post>(Endpoints.POSTS, payload),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ['posts'] }) },
  })
}

interface UpdatePostPayload {
  id: string
  title?: string
  body?: string
  isPublished?: boolean
}

export function useUpdatePost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: UpdatePostPayload) =>
      apiClient.patch<Post>(Endpoints.POST(id), payload),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ['posts'] }) },
  })
}

export function useDeletePost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiClient.delete<void>(Endpoints.POST(id)),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ['posts'] }) },
  })
}
