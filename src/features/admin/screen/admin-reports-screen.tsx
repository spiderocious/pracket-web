import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Repeat, Switch, Case, Default, Loadable } from 'meemaw'
import { Button, Chip, EmptyState } from '@shared/ui'
import { SkeletonRow } from '@shared/ui'
import { Logo } from '@shared/ui'
import { Input, Field } from '@shared/ui'
import { Flag } from '@shared/ui/icons'
import { ROUTES } from '@shared/constants/routes'
import { useAuth } from '@features/auth/providers/use-auth'
import { isAdmin } from '@shared/helpers'
import { useAdminReports, useResolveReport, useSuspendTutor } from '../api/use-admin'
import type { Report } from '@shared/types'
import { ApiRequestError } from '@shared/api'

interface ReportCardProps {
  report: Report
  onResolve: (id: string, note: string) => void
  onSuspend: (tutorId: string) => void
  isPending: boolean
}

function ReportCard({ report, onResolve, onSuspend, isPending }: Readonly<ReportCardProps>) {
  const [note, setNote] = useState('')
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-sheet rounded-[14px] border border-hair p-4 grid gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[10.5px] uppercase tracking-overline text-ink-4">{report.connectionId}</p>
          <p className="font-serif font-medium text-[15px] text-ink mt-1 leading-snug">{report.reason}</p>
          <p className="font-mono text-[11px] text-ink-4 mt-1">
            Tutor: {report.tutorId} · Reporter: {report.reporterId}
          </p>
        </div>
        <Switch>
          <Case when={report.status === 'resolved'}>
            <Chip variant="sage">Resolved</Chip>
          </Case>
          <Default>
            <Chip variant="warn">Pending</Chip>
          </Default>
        </Switch>
      </div>

      <Switch>
        <Case when={report.status === 'pending'}>
          <Switch>
            <Case when={!expanded}>
              <div className="flex gap-2 justify-end">
                <Button variant="secondary" size="sm" onClick={() => setExpanded(true)}>
                  Resolve
                </Button>
                <Button variant="danger" size="sm" onClick={() => onSuspend(report.tutorId)} disabled={isPending}>
                  Suspend tutor
                </Button>
              </div>
            </Case>
            <Default>
              <div className="grid gap-3 border-t border-hair pt-3">
                <Field label="Admin note">
                  <Input
                    placeholder="Tutor warned. Second offence will result in suspension."
                    value={note}
                    onChange={e => setNote(e.target.value)}
                  />
                </Field>
                <div className="flex gap-2 justify-end">
                  <Button variant="quiet" size="sm" onClick={() => setExpanded(false)}>Cancel</Button>
                  <Button variant="primary" size="sm" onClick={() => onResolve(report.id, note)} disabled={!note || isPending}>
                    Mark resolved
                  </Button>
                </div>
              </div>
            </Default>
          </Switch>
        </Case>
        <Default>
          <Switch>
            <Case when={!!report.adminNote}>
              <p className="font-sans text-[12px] text-ink-3 border-t border-hair pt-2">
                Note: {report.adminNote}
              </p>
            </Case>
            <Default>{null}</Default>
          </Switch>
        </Default>
      </Switch>
    </div>
  )
}

function SkeletonList() {
  return (
    <div className="grid gap-3">
      <SkeletonRow name1Width="40%" name2Width="50%" />
      <SkeletonRow name1Width="30%" name2Width="55%" />
    </div>
  )
}

export function AdminReportsScreen() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<'pending' | 'resolved'>('pending')
  const reportsQuery = useAdminReports(filter)
  const resolveReport = useResolveReport()
  const suspendTutor = useSuspendTutor()
  const [actionError, setActionError] = useState('')

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />
  if (!isAdmin(user.role)) return <Navigate to={ROUTES.ROOT} replace />

  const reports = reportsQuery.data ?? []

  function handleResolve(id: string, note: string) {
    setActionError('')
    resolveReport.mutate({ id, adminNote: note }, {
      onError: (err) => setActionError(err instanceof ApiRequestError ? err.message : 'Failed'),
    })
  }

  function handleSuspend(tutorId: string) {
    setActionError('')
    suspendTutor.mutate({ tutorId, isActive: false }, {
      onError: (err) => setActionError(err instanceof ApiRequestError ? err.message : 'Failed'),
    })
  }

  const isPending = resolveReport.isPending || suspendTutor.isPending

  return (
    <div className="min-h-screen bg-paper">
      <div className="bg-paper border-b border-hair">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <Button variant="quiet" size="sm" onClick={() => navigate(ROUTES.ADMIN_CREDENTIALS)}>
              Credentials
            </Button>
            <Chip variant="sage">Admin</Chip>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif font-medium text-[26px] tracking-display text-ink">
            Reports queue
          </h1>
          <div className="flex gap-1.5">
            {(['pending', 'resolved'] as const).map(f => (
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
            ))}
          </div>
        </div>

        <Switch>
          <Case when={actionError !== ''}>
            <div className="mb-4 px-4 py-3 rounded-[12px] bg-crit-bg border border-crit-edge">
              <p className="font-sans text-[13px] text-crit">{actionError}</p>
            </div>
          </Case>
          <Default>{null}</Default>
        </Switch>

        <Loadable loading={reportsQuery.isLoading} loadingComponent={<SkeletonList />}>
          <Switch>
            <Case when={reports.length === 0}>
              <EmptyState
                title="No reports"
                description={`No ${filter} reports at the moment.`}
                icon={<Flag className="w-16 h-16" />}
              />
            </Case>
            <Default>
              <div className="grid gap-3">
                <Repeat each={reports}>
                  {(report) => (
                    <ReportCard
                      key={report.id}
                      report={report}
                      onResolve={handleResolve}
                      onSuspend={handleSuspend}
                      isPending={isPending}
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
