import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Switch, Case, Default, Show, Repeat } from 'meemaw'
import { ProfileCard, Chip, PriceBlock, Button, EmptyState, SkeletonRow } from '@shared/ui'
import { Heart, BookOpen } from '@shared/ui/icons'
import { formatNaira } from '@shared/helpers'
import { isStudent } from '@shared/helpers'
import { ROUTES } from '@shared/constants/routes'
import { useAuth } from '@features/auth/providers/use-auth'
import { useTutorProfile } from '../api/use-tutor-profile'
import { useShortlist, useShortlistToggle } from '../api/use-shortlist'
import { ProfileHeader } from './parts/profile-header'
import { ConnectModalWrapper } from './parts/connect-modal-wrapper'
import { TutorPosts } from './parts/tutor-posts'

function SkeletonProfile() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid gap-4">
      <SkeletonRow name1Width="40%" name2Width="60%" />
      <SkeletonRow name1Width="55%" name2Width="45%" />
      <SkeletonRow name1Width="30%" name2Width="70%" />
    </div>
  )
}

export function TutorProfileScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [connectOpen, setConnectOpen] = useState(false)

  const profileQuery = useTutorProfile(id ?? '')
  const shortlistQuery = useShortlist(!!user)
  const { add, remove } = useShortlistToggle(id ?? '')

  const tutor = profileQuery.data
  const isShortlisted = shortlistQuery.data?.some(t => t.id === id) ?? false

  const canConnect = isStudent(user?.role)
  const canShortlist = isStudent(user?.role)
  const isVerified = tutor?.verificationStatus === 'verified'

  function handleShortlistToggle() {
    if (isShortlisted) {
      remove.mutate()
    } else {
      add.mutate()
    }
  }

  function handleConnectSuccess() {
    setConnectOpen(false)
    navigate(ROUTES.CONVERSATIONS)
  }

  return (
    <div className="min-h-screen bg-paper">
      <Switch>
        <Case when={profileQuery.isLoading}>
          <SkeletonProfile />
        </Case>

        <Case when={profileQuery.isError}>
          <EmptyState
            title="Tutor not found"
            description="This profile may no longer be available."
            icon={<BookOpen className="w-16 h-16" />}
          />
        </Case>

        <Default>
          {tutor !== undefined && (
            <>
              <ProfileHeader id={tutor.id} displayName={tutor.displayName} />

              <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

                  {/* Left column — profile card + posts */}
                  <div>
                    <ProfileCard
                      name={tutor.displayName}
                      role={[tutor.subjects?.slice(0, 3).join(', '), tutor.levels?.slice(0, 2).join(' · ')].filter(Boolean).join(' · ')}
                      blurb={tutor.bio ?? 'No bio provided.'}
                      meta={[
                        tutor.location ? { label: 'Location', value: tutor.location } : null,
                        tutor.format ? { label: 'Format', value: tutor.format === 'inPerson' ? 'In-person' : tutor.format === 'both' ? 'Online & In-person' : 'Online' } : null,
                      ].filter((m): m is { label: string; value: string } => m !== null)}
                    >
                      <Switch>
                        <Case when={isVerified}>
                          <Chip variant="sage" dot>Identity verified</Chip>
                        </Case>
                        <Default>
                          <Chip variant="warn">Verification pending</Chip>
                        </Default>
                      </Switch>
                      <Show when={!!(tutor.levels?.length)}>
                        <Repeat each={tutor.levels ?? []}>
                          {(level) => <Chip key={level} variant="paper">{level}</Chip>}
                        </Repeat>
                      </Show>
                    </ProfileCard>

                    <TutorPosts tutorId={tutor.id} />
                  </div>

                  {/* Right column — pricing + actions */}
                  <div className="grid gap-4">
                    <div className="bg-sheet rounded-[18px] border border-hair p-6">
                      <div className="flex items-end justify-between mb-5">
                        <PriceBlock
                          label="Session rate"
                          amount={formatNaira(tutor.rate ?? 0)}
                          unit="/ hr"
                          size="lg"
                        />
                        <Show when={canShortlist}>
                          <button
                            onClick={handleShortlistToggle}
                            disabled={add.isPending || remove.isPending}
                            className="w-9 h-9 flex items-center justify-center rounded-full border border-hair text-ink-3 hover:border-crit hover:text-crit transition-colors duration-quick disabled:opacity-40"
                            aria-label={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
                          >
                            <Heart
                              className="w-4 h-4 transition-colors duration-quick"
                              style={isShortlisted ? { fill: 'var(--crit)', color: 'var(--crit)' } : undefined}
                            />
                          </button>
                        </Show>
                      </div>

                      <Show when={canConnect}>
                        <Button
                          variant="primary"
                          className="w-full"
                          onClick={() => setConnectOpen(true)}
                          disabled={!isVerified || !tutor.isListed}
                        >
                          Connect with {tutor.displayName?.split(' ')[0] ?? tutor.displayName}
                        </Button>
                        <Show when={!isVerified}>
                          <p className="font-sans text-[12px] text-ink-4 text-center mt-2">
                            This tutor is awaiting verification
                          </p>
                        </Show>
                      </Show>

                      <Show when={!user}>
                        <Button
                          variant="secondary"
                          className="w-full"
                          onClick={() => navigate(ROUTES.LOGIN)}
                        >
                          Sign in to connect
                        </Button>
                      </Show>
                    </div>
                  </div>

                </div>
              </div>

              <Show when={connectOpen && canConnect}>
                <ConnectModalWrapper
                  tutor={tutor}
                  onClose={() => setConnectOpen(false)}
                  onSuccess={handleConnectSuccess}
                />
              </Show>
            </>
          )}
        </Default>
      </Switch>
    </div>
  )
}
