import { useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { Show } from 'meemaw'
import { Button, Input, Field, Textarea } from '@shared/ui'
import { ChevronLeft } from '@shared/ui/icons'
import { ROUTES } from '@shared/constants/routes'
import { useAuth } from '@features/auth/providers/use-auth'
import { isTutor } from '@shared/helpers'
import { useMyProfile } from '../api/use-my-profile'
import { useMyPosts, useCreatePost, useUpdatePost, useDeletePost } from '../api/use-my-posts'
import { ApiRequestError } from '@shared/api'
import type { Post } from '@shared/types'

interface NoteFormProps {
  id: string | undefined
  initialPost: Post | undefined
}

function NoteForm({ id, initialPost }: Readonly<NoteFormProps>) {
  const navigate = useNavigate()
  const createPost = useCreatePost()
  const updatePost = useUpdatePost()
  const deletePost = useDeletePost()

  const isEditing = !!id
  const [title, setTitle] = useState(initialPost?.title ?? '')
  const [body, setBody] = useState(initialPost?.body ?? '')
  const [error, setError] = useState('')

  async function handleSave(publish: boolean) {
    setError('')
    try {
      if (isEditing && id) {
        await updatePost.mutateAsync({ id, title, body, isPublished: publish })
      } else {
        await createPost.mutateAsync({ title, body, isPublished: publish })
      }
      navigate(ROUTES.TUTOR_DASHBOARD)
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Failed to save note')
    }
  }

  async function handleDelete() {
    if (!id) return
    try {
      await deletePost.mutateAsync(id)
      navigate(ROUTES.TUTOR_DASHBOARD)
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Failed to delete note')
    }
  }

  const isSaving = createPost.isPending || updatePost.isPending

  return (
    <div className="min-h-screen bg-paper">
      <div className="bg-paper border-b border-hair sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Button variant="quiet" size="sm" onClick={() => navigate(ROUTES.TUTOR_DASHBOARD)} className="flex items-center gap-1.5 -ml-2">
            <ChevronLeft className="w-4 h-4" />
            Dashboard
          </Button>
          <span className="font-sans font-medium text-[14px] text-ink-3 flex-1">
            {isEditing ? 'Edit note' : 'New note'}
          </span>
          <Show when={isEditing}>
            <Button variant="danger" size="sm" onClick={() => void handleDelete()} disabled={deletePost.isPending}>
              Delete
            </Button>
          </Show>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Show when={error !== ''}>
          <div className="mb-5 px-4 py-3 rounded-[12px] bg-[var(--crit-bg)] border border-[var(--crit-edge)]">
            <p className="font-sans text-[13px] text-[var(--crit)]">{error}</p>
          </div>
        </Show>

        <div className="grid gap-5">
          <Field label="Title">
            <Input
              size="lg"
              placeholder="How I teach quadratics"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Field>

          <Field label="Content">
            <Textarea
              placeholder="Share your teaching insights, tips, or reflections…"
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={16}
            />
          </Field>

          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => void handleSave(false)}
              disabled={!title || !body || isSaving}
            >
              Save draft
            </Button>
            <Button
              variant="primary"
              onClick={() => void handleSave(true)}
              disabled={!title || !body || isSaving}
            >
              {isSaving ? 'Saving…' : isEditing ? 'Update & publish' : 'Publish'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function NoteEditorScreen() {
  const { id } = useParams<{ id?: string }>()
  const { user } = useAuth()
  const profileQuery = useMyProfile()
  const postsQuery = useMyPosts(profileQuery.data?.id ?? '')

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />
  if (!isTutor(user.role)) return <Navigate to={ROUTES.ROOT} replace />

  const isEditing = !!id
  const isLoading = isEditing && (profileQuery.isLoading || postsQuery.isLoading)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <span className="font-serif text-[17px] text-ink-3">Loading…</span>
      </div>
    )
  }

  const existingPost = isEditing ? postsQuery.data?.find(p => p.id === id) : undefined

  return <NoteForm key={id ?? 'new'} id={id} initialPost={existingPost} />
}
