import { useNavigate, Navigate } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { Repeat, Switch, Case, Default, Loadable } from 'meemaw'
import { ListRow, EmptyState } from '@shared/ui'
import { SkeletonRow } from '@shared/ui'
import { Heart } from '@shared/ui/icons'
import { formatNaira, avatarToneFromId } from '@shared/helpers'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import { ROUTES } from '@shared/constants/routes'
import { useAuth } from '@features/auth/providers/use-auth'
import { useShortlist } from '@features/tutor-profile/api/use-shortlist'
import type { TutorProfile } from '@shared/types'

function SkeletonList() {
  return (
    <div className="grid gap-[10px]">
      <SkeletonRow name1Width="35%" name2Width="55%" />
      <SkeletonRow name1Width="45%" name2Width="45%" />
      <SkeletonRow name1Width="30%" name2Width="60%" />
    </div>
  )
}

export function ShortlistScreen() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const shortlistQuery = useShortlist(!!user)
  const tutorIds = shortlistQuery.data?.tutorIds ?? []

  const tutorQueries = useQueries({
    queries: tutorIds.map(tutorId => ({
      queryKey: ['tutor', tutorId],
      queryFn: () => apiClient.get<TutorProfile>(Endpoints.TUTOR_PUBLIC(tutorId)),
    })),
  })

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />

  const isLoading = shortlistQuery.isLoading || tutorQueries.some(q => q.isLoading)
  const tutors = tutorQueries.map(q => q.data).filter((t): t is TutorProfile => t !== undefined)

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="py-8 border-b border-hair mb-6">
          <h1 className="font-serif font-medium text-[28px] tracking-display text-ink">
            My shortlist
          </h1>
          <p className="font-sans text-[14px] text-ink-3 mt-1">
            Tutors you've saved
          </p>
        </div>

        <Loadable loading={isLoading} loadingComponent={<SkeletonList />}>
          <Switch>
            <Case when={tutors.length === 0}>
              <EmptyState
                title="Your shortlist is empty"
                description="Browse tutors and tap the heart icon to save them here."
                icon={<Heart className="w-16 h-16" />}
              />
            </Case>
            <Default>
              <div className="grid gap-[10px] pb-16">
                <Repeat each={tutors}>
                  {(tutor) => (
                    <ListRow
                      key={tutor.id}
                      data={{
                        name: tutor.displayName,
                        meta: [
                          tutor.subjects?.slice(0, 2).join(', '),
                          tutor.levels?.slice(0, 1)[0],
                          tutor.location,
                        ].filter(Boolean).join(' · '),
                        price: formatNaira(tutor.rate ?? 0),
                        tone: avatarToneFromId(tutor.id),
                      }}
                      onClick={() => navigate(ROUTES.TUTOR_PROFILE.replace(':id', tutor.id))}
                    />
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
