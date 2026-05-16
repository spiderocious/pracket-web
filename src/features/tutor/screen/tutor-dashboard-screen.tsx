import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { Show, Switch, Case, Default, Repeat, Loadable } from 'meemaw'
import { SiteHeader, Button, Chip, Banner, ConversationItem } from '@shared/ui'
import { SkeletonRow } from '@shared/ui'
import { formatNaira } from '@shared/helpers'
import { ROUTES } from '@shared/constants/routes'
import { useAuth } from '@features/auth/providers/use-auth'
import { isTutor } from '@shared/helpers'
import { useMyProfile, useToggleVisibility } from '../api/use-my-profile'
import { useMyPosts } from '../api/use-my-posts'
import { useConnections } from '@features/conversations/api/use-connections'
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

function StatBlock({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="bg-sheet rounded-[14px] border border-hair p-4">
      <p className="font-mono text-[10.5px] uppercase tracking-overline text-ink-4 mb-1">{label}</p>
      <p className="font-mono text-[22px] text-ink font-medium">{value}</p>
    </div>
  )
}

export function TutorDashboardScreen() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const profileQuery = useMyProfile()
  const connectionsQuery = useConnections()
  const profile = profileQuery.data
  const postsQuery = useMyPosts(profile?.id ?? '')
  const toggleVisibility = useToggleVisibility()

  const connections = connectionsQuery.data ?? []

  // For connections where this user is the student side, fetch tutor profiles
  // (Tutors normally appear as tutorId, but connections might have both sides)
  const studentConnections = connections.filter(c => user != null && c.studentId === user.id)
  const tutorIdsToFetch = studentConnections.map(c => c.tutorId)

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

  if (!user) return <Navigate to={`${ROUTES.LOGIN}?next=${encodeURIComponent(location.pathname)}`} replace />
  if (!isTutor(user.role)) return <Navigate to={ROUTES.ROOT} replace />

  const posts = postsQuery.data ?? []

  function connectionLabel(conn: Connection): string {
    if (conn.studentId === user!.id) {
      return tutorMap.get(conn.tutorId)?.displayName ?? 'Your tutor'
    }
    return 'Student'
  }
  const isVerified = profile?.verificationStatus === 'verified'
  const isListed = profile?.isListed ?? false

  function handleToggleListing() {
    if (!isVerified && !isListed) return
    toggleVisibility.mutate(!isListed)
  }

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Loadable loading={profileQuery.isLoading} loadingComponent={
          <div className="grid gap-4"><SkeletonRow name1Width="40%" name2Width="55%" /><SkeletonRow name1Width="30%" name2Width="60%" /></div>
        }>
          {/* Verification banner */}
          <Show when={!isVerified}>
            <div className="mb-6">
              <Banner
                variant="warn"
                title="Pending verification"
                sub="Submit your credentials to get listed. Our team reviews within 24 hours."
              />
            </div>
          </Show>

          {/* Profile summary */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="font-serif font-medium text-[26px] tracking-display text-ink">
                {user.firstName} {user.lastName}
              </h1>
              <p className="font-sans text-[14px] text-ink-3 mt-1">
                {profile?.subjects?.slice(0, 3).join(', ') || 'No subjects set'}
              </p>
              <div className="flex gap-2 mt-3">
                <Switch>
                  <Case when={isVerified && isListed}>
                    <Chip variant="sage" dot>Listed</Chip>
                  </Case>
                  <Case when={isVerified && !isListed}>
                    <Chip variant="paper">Unlisted</Chip>
                  </Case>
                  <Default>
                    <Chip variant="warn">Pending verification</Chip>
                  </Default>
                </Switch>
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <Show when={isVerified}>
                <Button
                  variant={isListed ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={handleToggleListing}
                  disabled={toggleVisibility.isPending}
                >
                  {isListed ? 'Unlist profile' : 'List profile'}
                </Button>
              </Show>
              <Button variant="secondary" size="sm" onClick={() => navigate(ROUTES.TUTOR_ONBOARDING)}>
                Edit profile
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <StatBlock label="Rate" value={formatNaira(profile?.rate ?? 0) + '/hr'} />
            <StatBlock label="Connections" value={String(connections.length)} />
            <StatBlock label="Notes" value={String(posts.length)} />
            <StatBlock label="Format" value={profile?.format ?? '—'} />
          </div>

          {/* Recent conversations */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif font-medium text-[20px] text-ink">Messages</h2>
              <Button variant="quiet" size="sm" onClick={() => navigate(ROUTES.CONVERSATIONS)}>
                View all
              </Button>
            </div>
            <Switch>
              <Case when={connections.length === 0}>
                <div className="bg-sheet rounded-[16px] border border-hair p-6 text-center">
                  <p className="font-sans text-[13px] text-ink-3">No conversations yet. Students will reach out once you&apos;re listed.</p>
                </div>
              </Case>
              <Default>
                <div className="rounded-[16px] border border-hair overflow-hidden">
                  <Repeat each={connections.slice(0, 5)}>
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

          {/* Sunday Notes */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif font-medium text-[20px] text-ink">Sunday Notes</h2>
              <Button variant="secondary" size="sm" onClick={() => navigate(ROUTES.TUTOR_NOTE_NEW)}>
                + New note
              </Button>
            </div>
            <Switch>
              <Case when={posts.length === 0}>
                <div className="bg-sheet rounded-[16px] border border-hair p-6 text-center">
                  <p className="font-sans text-[13px] text-ink-3">No notes yet. Share your teaching insights with students.</p>
                </div>
              </Case>
              <Default>
                <div className="grid gap-3">
                  <Repeat each={posts}>
                    {(post) => (
                      <div
                        key={post.id}
                        className="bg-sheet rounded-[14px] border border-hair p-4 flex items-start justify-between gap-4 cursor-pointer hover:border-sheet-edge-2 transition-colors duration-quick"
                        onClick={() => navigate(ROUTES.TUTOR_NOTE_EDIT.replace(':id', post.id))}
                      >
                        <div className="min-w-0">
                          <p className="font-serif font-medium text-[15px] text-ink truncate">{post.title}</p>
                          <p className="font-sans text-[12px] text-ink-3 mt-0.5">
                            {post.isPublished ? 'Published' : 'Draft'}
                          </p>
                        </div>
                        <Switch>
                          <Case when={post.isPublished}>
                            <Chip variant="sage">Published</Chip>
                          </Case>
                          <Default>
                            <Chip variant="paper">Draft</Chip>
                          </Default>
                        </Switch>
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
