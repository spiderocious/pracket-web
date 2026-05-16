import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { Switch, Case, Default, Repeat, Loadable } from 'meemaw'
import { SiteHeader, Button, Chip, ConversationItem } from '@shared/ui'
import { SkeletonRow } from '@shared/ui'
import { ROUTES } from '@shared/constants/routes'
import { useAuth } from '@features/auth/providers/use-auth'
import { useConnections } from '@features/conversations/api/use-connections'
import { useShortlist } from '@features/tutor-profile/api/use-shortlist'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import type { Connection, TutorProfile } from '@shared/types'

function formatTime(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000)
  if (diffDays === 0) return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return date.toLocaleDateString('en-GB', { weekday: 'short' })
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function SkeletonDashboard() {
  return (
    <div className="grid gap-4">
      <SkeletonRow name1Width="40%" name2Width="55%" />
      <SkeletonRow name1Width="30%" name2Width="60%" />
      <SkeletonRow name1Width="50%" name2Width="40%" />
    </div>
  )
}

export function StudentDashboardScreen() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const connectionsQuery = useConnections()
  const shortlistQuery = useShortlist(!!user)

  const connections = connectionsQuery.data ?? []
  const shortlistedIds = shortlistQuery.data?.tutorIds ?? []

  const allTutorIds = Array.from(new Set([
    ...connections.map(c => c.tutorId),
    ...shortlistedIds,
  ]))

  const tutorQueries = useQueries({
    queries: allTutorIds.map(tutorId => ({
      queryKey: ['tutor', tutorId],
      queryFn: () => apiClient.get<TutorProfile>(Endpoints.TUTOR_PUBLIC(tutorId)),
      staleTime: 5 * 60 * 1000,
    })),
  })

  const tutorMap = new Map<string, TutorProfile>()
  allTutorIds.forEach((id, i) => {
    const data = tutorQueries[i]?.data
    if (data) tutorMap.set(id, data)
  })

  if (!user) return <Navigate to={`${ROUTES.LOGIN}?next=${encodeURIComponent(location.pathname)}`} replace />

  const isLoading = connectionsQuery.isLoading || shortlistQuery.isLoading

  function connectionLabel(conn: Connection): string {
    return tutorMap.get(conn.tutorId)?.displayName ?? 'Your tutor'
  }

  const recentConnections = connections.slice(0, 5)
  const shortlistedTutors = shortlistedIds.slice(0, 4).map(id => tutorMap.get(id)).filter(Boolean) as TutorProfile[]

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Loadable loading={isLoading} loadingComponent={<SkeletonDashboard />}>
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="font-serif font-medium text-[28px] tracking-display text-ink">
              Hey, {user.firstName}
            </h1>
            <p className="font-sans text-[14px] text-ink-3 mt-1">
              Welcome back to Pracket.
            </p>
          </div>

          {/* Quick actions */}
          <div className="flex gap-3 mb-10">
            <Button variant="primary" onClick={() => navigate(ROUTES.DISCOVERY)}>
              Find a tutor
            </Button>
            <Button variant="secondary" onClick={() => navigate(ROUTES.SHORTLIST)}>
              My shortlist
            </Button>
          </div>

          {/* Messages */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif font-medium text-[20px] text-ink">Messages</h2>
              <Button variant="quiet" size="sm" onClick={() => navigate(ROUTES.CONVERSATIONS)}>
                View all
              </Button>
            </div>
            <Switch>
              <Case when={connections.length === 0}>
                <div className="bg-sheet rounded-[16px] border border-hair p-6 text-center">
                  <p className="font-sans text-[13px] text-ink-3 mb-3">No conversations yet.</p>
                  <Button variant="secondary" size="sm" onClick={() => navigate(ROUTES.DISCOVERY)}>
                    Find a tutor to connect with
                  </Button>
                </div>
              </Case>
              <Default>
                <div className="rounded-[16px] border border-hair overflow-hidden">
                  <Repeat each={recentConnections}>
                    {(conn) => (
                      <div
                        key={conn.id}
                        onClick={() => navigate(ROUTES.CONVERSATION.replace(':id', conn.id))}
                        className="cursor-pointer"
                      >
                        <ConversationItem
                          name={connectionLabel(conn)}
                          preview={conn.status === 'closed' ? 'Conversation closed' : 'Tap to open'}
                          time={formatTime(conn.openedAt ?? conn.createdAt)}
                        />
                      </div>
                    )}
                  </Repeat>
                </div>
              </Default>
            </Switch>
          </div>

          {/* Shortlist preview */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif font-medium text-[20px] text-ink">Saved tutors</h2>
              <Button variant="quiet" size="sm" onClick={() => navigate(ROUTES.SHORTLIST)}>
                View all
              </Button>
            </div>
            <Switch>
              <Case when={shortlistedIds.length === 0}>
                <div className="bg-sheet rounded-[16px] border border-hair p-6 text-center">
                  <p className="font-sans text-[13px] text-ink-3 mb-3">No tutors saved yet.</p>
                  <Button variant="secondary" size="sm" onClick={() => navigate(ROUTES.DISCOVERY)}>
                    Browse tutors
                  </Button>
                </div>
              </Case>
              <Default>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Repeat each={shortlistedTutors}>
                    {(tutor) => (
                      <div
                        key={tutor.id}
                        onClick={() => navigate(ROUTES.TUTOR_PROFILE.replace(':id', tutor.id))}
                        className="bg-sheet rounded-[14px] border border-hair p-4 cursor-pointer hover:border-sheet-edge-2 transition-colors duration-quick"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-serif font-medium text-[15px] text-ink truncate">{tutor.displayName}</p>
                            <p className="font-sans text-[12px] text-ink-3 mt-0.5 truncate">
                              {tutor.subjects?.slice(0, 2).join(', ') || 'Tutor'}
                            </p>
                          </div>
                          <Switch>
                            <Case when={tutor.verificationStatus === 'verified'}>
                              <Chip variant="sage">Verified</Chip>
                            </Case>
                            <Default>
                              <Chip variant="warn">Pending</Chip>
                            </Default>
                          </Switch>
                        </div>
                      </div>
                    )}
                  </Repeat>
                </div>
              </Default>
            </Switch>
          </div>
        </Loadable>
      </div>
    </div>
  )
}
