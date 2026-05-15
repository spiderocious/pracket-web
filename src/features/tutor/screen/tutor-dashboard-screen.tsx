import { useNavigate, Navigate } from 'react-router-dom'
import { Show, Switch, Case, Default, Repeat, Loadable } from 'meemaw'
import { Logo, Button, Chip, Banner } from '@shared/ui'
import { SkeletonRow } from '@shared/ui'
import { formatNaira } from '@shared/helpers'
import { ROUTES } from '@shared/constants/routes'
import { useAuth } from '@features/auth/providers/use-auth'
import { isTutor } from '@shared/helpers'
import { useMyProfile, useToggleVisibility } from '../api/use-my-profile'
import { useMyPosts } from '../api/use-my-posts'
import { useConnections } from '@features/conversations/api/use-connections'

function StatBlock({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="bg-sheet rounded-[14px] border border-hair p-4">
      <p className="font-mono text-[10.5px] uppercase tracking-overline text-ink-4 mb-1">{label}</p>
      <p className="font-mono text-[22px] text-ink font-medium">{value}</p>
    </div>
  )
}

export function TutorDashboardScreen() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const profileQuery = useMyProfile()
  const connectionsQuery = useConnections()
  const profile = profileQuery.data
  const postsQuery = useMyPosts(profile?.id ?? '')
  const toggleVisibility = useToggleVisibility()

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />
  if (!isTutor(user.role)) return <Navigate to={ROUTES.ROOT} replace />

  const connections = connectionsQuery.data ?? []
  const posts = postsQuery.data ?? []
  const isVerified = profile?.verificationStatus === 'verified'
  const isListed = profile?.isListed ?? false

  function handleToggleListing() {
    if (!isVerified && !isListed) return
    toggleVisibility.mutate(!isListed)
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <div className="bg-paper border-b border-hair">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <Button variant="quiet" size="sm" onClick={() => navigate(ROUTES.CONVERSATIONS)}>
              Messages {connections.length > 0 && `(${connections.length})`}
            </Button>
            <Button variant="quiet" size="sm" onClick={logout}>Sign out</Button>
          </div>
        </div>
      </div>

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
