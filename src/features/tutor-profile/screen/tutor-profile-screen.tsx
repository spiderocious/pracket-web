import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Switch, Case, Default, Show, Repeat } from 'meemaw'
import { ProfileCard, Chip, PriceRail, Button, EmptyState, SkeletonRow, Banner } from '@shared/ui'
import { Heart, BookOpen } from '@shared/ui/icons'
import { formatNaira, isStudent } from '@shared/helpers'
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

function formatFormat(f: string): string {
  if (f === 'inPerson') return 'In-person'
  if (f === 'both') return 'Online & In-person'
  return 'Online'
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
  const isShortlisted = shortlistQuery.data?.tutorIds.includes(id ?? '') ?? false

  const canConnect = isStudent(user?.role)
  const canShortlist = isStudent(user?.role)
  const isVerified = tutor?.verificationStatus === 'verified'
  const tutorFirstName = (tutor?.displayName ?? '').split(' ')[0] || 'this tutor'

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

  const loginWithNext = `${ROUTES.LOGIN}?next=${encodeURIComponent(ROUTES.TUTOR_PROFILE.replace(':id', id ?? ''))}`

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
              <ProfileHeader id={tutor.id} displayName={tutor.displayName ?? 'Tutor'} />

              <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                <Show when={!isVerified}>
                  <div className="mb-6">
                    <Banner
                      variant="warn"
                      title="Verification pending"
                      sub="This tutor's identity is under review. You won't be able to connect until they're verified."
                    />
                  </div>
                </Show>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">

                  {/* Left column — profile card + posts */}
                  <div>
                    <ProfileCard
                      name={tutor.displayName ?? 'Tutor'}
                      role={[
                        tutor.subjects?.slice(0, 3).join(', '),
                        tutor.levels?.slice(0, 2).join(' · '),
                        tutor.location,
                      ].filter(Boolean).join(' · ')}
                      blurb={tutor.bio ?? 'No bio provided.'}
                      meta={[
                        tutor.format ? { label: 'Format', value: formatFormat(tutor.format) } : null,
                        tutor.location ? { label: 'Location', value: tutor.location } : null,
                        tutor.rate ? { label: 'Rate', value: `${formatNaira(tutor.rate)} / hr` } : null,
                        tutor.connectionFee ? { label: 'Connect fee', value: formatNaira(tutor.connectionFee) } : null,
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

                  {/* Right column — PriceRail + actions */}
                  <div className="lg:sticky lg:top-[72px] grid gap-3">
                    <PriceRail
                      items={[
                        {
                          label: 'Lesson rate',
                          amount: formatNaira(tutor.rate ?? 0),
                          unit: 'per hour',
                        },
                        {
                          label: 'Connection fee · one-time',
                          amount: formatNaira(tutor.connectionFee ?? 500),
                          sub: `Paid to Pracket. Lets you message ${tutorFirstName} and book lessons.`,
                        },
                      ]}
                    >
                      {/* Logged-in student */}
                      <Show when={canConnect}>
                        <Button
                          variant="primary"
                          size="lg"
                          block
                          onClick={() => setConnectOpen(true)}
                          disabled={!isVerified || !tutor.isListed}
                        >
                          Connect with {tutorFirstName}
                        </Button>
                      </Show>

                      {/* Guest — carry ?next= so they land back here after login */}
                      <Show when={!user}>
                        <Button
                          variant="primary"
                          size="lg"
                          block
                          onClick={() => navigate(loginWithNext)}
                        >
                          Sign in to connect
                        </Button>
                        <p className="font-sans text-[12px] text-ink-4 text-center mt-2">
                          Already have an account? You'll come right back.
                        </p>
                      </Show>

                      {/* Logged-in non-student (tutor viewing another tutor) */}
                      <Show when={!!user && !canConnect}>
                        <p className="font-sans text-[13px] text-ink-3 text-center py-1">
                          Only students can connect with tutors.
                        </p>
                      </Show>
                    </PriceRail>

                    {/* Shortlist heart — students only, below the rail */}
                    <Show when={canShortlist}>
                      <button
                        type="button"
                        onClick={handleShortlistToggle}
                        disabled={add.isPending || remove.isPending}
                        className="flex items-center justify-center gap-2 w-full h-10 rounded-[14px] border border-hair text-ink-3 hover:border-crit hover:text-crit transition-colors duration-quick disabled:opacity-40 font-sans text-[13px]"
                        aria-label={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
                      >
                        <Heart
                          className="w-4 h-4"
                          style={isShortlisted ? { fill: 'var(--crit)', color: 'var(--crit)' } : undefined}
                        />
                        {isShortlisted ? 'Saved to shortlist' : 'Save to shortlist'}
                      </button>
                    </Show>
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
