import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Repeat, Switch, Case, Default, Loadable } from 'meemaw'
import { Button, Chip, EmptyState } from '@shared/ui'
import { SkeletonRow } from '@shared/ui'
import { Logo } from '@shared/ui'
import { ShieldCheck } from '@shared/ui/icons'
import { ROUTES } from '@shared/constants/routes'
import { useAuth } from '@features/auth/providers/use-auth'
import { isAdmin } from '@shared/helpers'
import { useAdminCredentials, useReviewCredential } from '../api/use-admin'
import type { Credential, CredentialStatus } from '@shared/types'

type Filter = CredentialStatus

interface CredentialRowCardProps {
  credential: Credential
  onApprove: (id: string) => void
  onReject: (id: string) => void
  isPending: boolean
}

function CredentialRowCard({ credential, onApprove, onReject, isPending }: Readonly<CredentialRowCardProps>) {
  const typeLabel = credential.type === 'degree' ? 'Degree' : credential.type === 'governmentId' ? 'Gov ID' : 'Reference'
  return (
    <div className="bg-sheet rounded-[14px] border border-hair p-4 grid gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[10.5px] uppercase tracking-overline text-ink-4">{credential.tutorId}</p>
          <p className="font-serif font-medium text-[16px] text-ink mt-0.5">{typeLabel}</p>
          <p className="font-mono text-[12px] text-ink-3 mt-0.5">{credential.fileKey}</p>
        </div>
        <Switch>
          <Case when={credential.reviewStatus === 'approved'}>
            <Chip variant="sage" dot>Approved</Chip>
          </Case>
          <Case when={credential.reviewStatus === 'rejected'}>
            <Chip variant="crit">Rejected</Chip>
          </Case>
          <Default>
            <Chip variant="warn">Pending</Chip>
          </Default>
        </Switch>
      </div>
      <Switch>
        <Case when={credential.reviewStatus === 'pending'}>
          <div className="flex gap-2 justify-end">
            <Button variant="danger" size="sm" onClick={() => onReject(credential.id)} disabled={isPending}>
              Reject
            </Button>
            <Button variant="primary" size="sm" onClick={() => onApprove(credential.id)} disabled={isPending}>
              Approve
            </Button>
          </div>
        </Case>
        <Default>{null}</Default>
      </Switch>
    </div>
  )
}

function SkeletonList() {
  return (
    <div className="grid gap-3">
      <SkeletonRow name1Width="30%" name2Width="50%" />
      <SkeletonRow name1Width="40%" name2Width="40%" />
      <SkeletonRow name1Width="35%" name2Width="55%" />
    </div>
  )
}

export function AdminCredentialsScreen() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>('pending')
  const credentialsQuery = useAdminCredentials(filter)
  const reviewCredential = useReviewCredential()

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />
  if (!isAdmin(user.role)) return <Navigate to={ROUTES.ROOT} replace />

  const credentials = credentialsQuery.data ?? []

  function handleApprove(id: string) {
    reviewCredential.mutate({ id, reviewStatus: 'approved' })
  }
  function handleReject(id: string) {
    reviewCredential.mutate({ id, reviewStatus: 'rejected' })
  }

  const filters: Filter[] = ['pending', 'approved', 'rejected']

  return (
    <div className="min-h-screen bg-paper">
      <div className="bg-paper border-b border-hair">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <Button variant="quiet" size="sm" onClick={() => navigate(ROUTES.ADMIN_REPORTS)}>
              Reports
            </Button>
            <Chip variant="sage">Admin</Chip>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif font-medium text-[26px] tracking-display text-ink">
            Credential queue
          </h1>
          <div className="flex gap-1.5">
            <Repeat each={filters}>
              {(f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={[
                    'h-8 px-4 rounded-pill text-[12px] font-sans border capitalize transition-colors duration-quick',
                    filter === f ? 'bg-green-50 border-green-500 text-green-700 font-medium' : 'bg-sheet border-hair text-ink-3 hover:border-sheet-edge-2',
                  ].join(' ')}
                >
                  {f}
                </button>
              )}
            </Repeat>
          </div>
        </div>

        <Loadable loading={credentialsQuery.isLoading} loadingComponent={<SkeletonList />}>
          <Switch>
            <Case when={credentials.length === 0}>
              <EmptyState
                title="No credentials"
                description={`No ${filter} credentials at the moment.`}
                icon={<ShieldCheck className="w-16 h-16" />}
              />
            </Case>
            <Default>
              <div className="grid gap-3">
                <Repeat each={credentials}>
                  {(cred) => (
                    <CredentialRowCard
                      key={cred.id}
                      credential={cred}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      isPending={reviewCredential.isPending}
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
