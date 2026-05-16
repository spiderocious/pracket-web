import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { Repeat, Switch, Case, Default, Loadable } from 'meemaw'
import { ConversationItem, SiteHeader } from '@shared/ui'
import { EmptyState, SkeletonRow } from '@shared/ui'
import { MessageCircle } from '@shared/ui/icons'
import { ROUTES } from '@shared/constants/routes'
import { useAuth } from '@features/auth/providers/use-auth'
import { useConnections } from '../api/use-connections'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import type { Connection, TutorProfile } from '@shared/types'

function formatTime(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffDays === 0) return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return date.toLocaleDateString('en-GB', { weekday: 'short' })
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function connectionLabel(conn: Connection, userId: string, tutorMap: Map<string, TutorProfile>): string {
  if (conn.studentId === userId) {
    const tutor = tutorMap.get(conn.tutorId)
    return tutor?.displayName ?? 'Your tutor'
  }
  return 'Student'
}

function SkeletonList() {
  return (
    <div className="grid gap-1">
      <SkeletonRow name1Width="30%" name2Width="55%" />
      <SkeletonRow name1Width="40%" name2Width="50%" />
      <SkeletonRow name1Width="25%" name2Width="60%" />
    </div>
  )
}

export function ConversationsScreen() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const connectionsQuery = useConnections()

  const connections = connectionsQuery.data ?? []

  // For connections where this user is the student, look up tutor profiles
  const tutorIdsToFetch = connections
    .filter(c => user != null && c.studentId === user.id)
    .map(c => c.tutorId)

  const tutorQueries = useQueries({
    queries: tutorIdsToFetch.map(tutorId => ({
      queryKey: ['tutor', tutorId],
      queryFn: () => apiClient.get<TutorProfile>(Endpoints.TUTOR_PUBLIC(tutorId)),
      staleTime: 5 * 60 * 1000,
    })),
  })

  const tutorMap = new Map<string, TutorProfile>()
  tutorIdsToFetch.forEach((id, i) => {
    const data = tutorQueries[i]?.data
    if (data) tutorMap.set(id, data)
  })

  const isLoading = connectionsQuery.isLoading || tutorQueries.some(q => q.isLoading)

  if (!user) return <Navigate to={`${ROUTES.LOGIN}?next=${encodeURIComponent(location.pathname)}`} replace />

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="py-8 border-b border-hair mb-2">
          <h1 className="font-serif font-medium text-[28px] tracking-display text-ink">
            Conversations
          </h1>
          <p className="font-sans text-[14px] text-ink-3 mt-1">
            {user.firstName} {user.lastName}
          </p>
        </div>

        <Loadable loading={isLoading} loadingComponent={<SkeletonList />}>
          <Switch>
            <Case when={connections.length === 0}>
              <EmptyState
                title="No conversations yet"
                description="Connect with a tutor to start a conversation."
                icon={<MessageCircle className="w-16 h-16" />}
              />
            </Case>
            <Default>
              <div className="py-2">
                <Repeat each={connections}>
                  {(conn) => (
                    <div
                      key={conn.id}
                      onClick={() => navigate(ROUTES.CONVERSATION.replace(':id', conn.id))}
                      className="cursor-pointer"
                    >
                      <ConversationItem
                        name={connectionLabel(conn, user.id, tutorMap)}
                        preview={conn.status === 'closed' ? 'Conversation closed' : 'Tap to open conversation'}
                        time={formatTime(conn.openedAt ?? conn.createdAt)}
                      />
                    </div>
                  )}
                </Repeat>
              </div>
            </Default>
          </Switch>
        </Loadable>
      </div>
    </div>
  )
}
