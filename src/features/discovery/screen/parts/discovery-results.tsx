import { useNavigate } from 'react-router-dom'
import { Repeat, Switch, Case, Default, Loadable } from 'meemaw'
import { ListRow } from '@shared/ui'
import { SkeletonRow, EmptyState } from '@shared/ui'
import { GraduationCap, SearchX, ChevronLeft, ChevronRight } from '@shared/ui/icons'
import { formatNaira, avatarToneFromId } from '@shared/helpers'
import { ROUTES } from '@shared/constants/routes'
import type { SearchTutor } from '@shared/types'

interface DiscoveryResultsProps {
  readonly tutors: SearchTutor[]
  readonly isLoading: boolean
  readonly isFetching: boolean
  readonly hasQuery: boolean
  readonly page: number
  readonly totalPages: number
  readonly total: number
  readonly onPageChange: (page: number) => void
  readonly onQuickSearch: (q: string) => void
}

const SKELETON_WIDTHS = [
  { w1: '35%', w2: '65%' },
  { w1: '28%', w2: '72%' },
  { w1: '42%', w2: '50%' },
  { w1: '30%', w2: '60%' },
  { w1: '38%', w2: '55%' },
  { w1: '25%', w2: '68%' },
]

const QUICK_SEARCHES = ['Further Mathematics', 'Physics A-Level', 'GCSE English', 'Primary Maths']

function tutorToRow(tutor: SearchTutor) {
  return {
    name: tutor.displayName,
    meta: [
      tutor.subjects.slice(0, 2).join(', '),
      tutor.levels.slice(0, 1)[0],
      tutor.location,
    ].filter(Boolean).join(' · '),
    price: formatNaira(tutor.rate),
    tone: avatarToneFromId(tutor.id),
  }
}

function SkeletonList() {
  return (
    <div className="grid gap-[10px]">
      <Repeat each={SKELETON_WIDTHS}>
        {(item, i) => (
          <SkeletonRow key={i} name1Width={item.w1} name2Width={item.w2} />
        )}
      </Repeat>
    </div>
  )
}

interface EmptyPromptProps {
  readonly onQuickSearch: (q: string) => void
}

function EmptyPrompt({ onQuickSearch }: EmptyPromptProps) {
  return (
    <div className="py-16 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sheet border border-hair text-ink-4 mb-5">
        <GraduationCap className="w-7 h-7" />
      </div>
      <h2 className="font-serif font-medium text-[22px] tracking-display text-ink mb-2">
        Find your tutor
      </h2>
      <p className="font-sans text-[14px] text-ink-3 max-w-sm mx-auto leading-relaxed">
        Search by subject, academic level, or location. Every tutor on Pracket is identity-verified.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Repeat each={QUICK_SEARCHES}>
          {(q) => (
            <button
              key={q}
              type="button"
              onClick={() => onQuickSearch(q)}
              className="h-8 px-4 rounded-pill text-[12.5px] font-sans bg-sheet border border-hair text-ink-2 hover:border-green-500 hover:text-green-700 hover:bg-green-50 transition-colors duration-quick"
            >
              {q}
            </button>
          )}
        </Repeat>
      </div>
    </div>
  )
}

function TutorList({ tutors, isFetching }: { readonly tutors: SearchTutor[]; readonly isFetching: boolean }) {
  const navigate = useNavigate()

  return (
    <div className={['grid gap-[10px] transition-opacity duration-normal', isFetching ? 'opacity-60 pointer-events-none' : ''].filter(Boolean).join(' ')}>
      <Repeat each={tutors}>
        {(tutor) => (
          <ListRow
            key={tutor.id}
            data={tutorToRow(tutor)}
            onClick={() => navigate(ROUTES.TUTOR_PROFILE.replace(':id', tutor.id))}
          />
        )}
      </Repeat>
    </div>
  )
}

function PaginationBar({
  page,
  totalPages,
  total,
  onPageChange,
  isFetching,
}: {
  readonly page: number
  readonly totalPages: number
  readonly total: number
  readonly onPageChange: (page: number) => void
  readonly isFetching: boolean
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const showEllipsisStart = page > 4
  const showEllipsisEnd = page < totalPages - 3

  const visiblePages = pages.filter(p =>
    p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2)
  )

  return (
    <div className={['flex items-center justify-between mt-8 transition-opacity duration-normal', isFetching ? 'opacity-50 pointer-events-none' : ''].filter(Boolean).join(' ')}>
      <span className="font-mono text-[11px] text-ink-4 hidden sm:block">
        {total} tutor{total !== 1 ? 's' : ''}
      </span>

      <div className="flex items-center gap-1 mx-auto sm:mx-0">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-hair text-ink-3 hover:border-sheet-edge-2 hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-quick"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {showEllipsisStart && (
          <>
            <PageButton p={1} current={page} onPageChange={onPageChange} />
            <span className="w-8 h-8 flex items-center justify-center font-mono text-[12px] text-ink-4">…</span>
          </>
        )}

        <Repeat each={visiblePages}>
          {(p) => (
            <PageButton key={p} p={p} current={page} onPageChange={onPageChange} />
          )}
        </Repeat>

        {showEllipsisEnd && (
          <>
            <span className="w-8 h-8 flex items-center justify-center font-mono text-[12px] text-ink-4">…</span>
            <PageButton p={totalPages} current={page} onPageChange={onPageChange} />
          </>
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-hair text-ink-3 hover:border-sheet-edge-2 hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-quick"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function PageButton({
  p,
  current,
  onPageChange,
}: {
  readonly p: number
  readonly current: number
  readonly onPageChange: (page: number) => void
}) {
  const isActive = p === current
  return (
    <button
      key={p}
      onClick={() => onPageChange(p)}
      className={[
        'w-8 h-8 flex items-center justify-center rounded-md font-mono text-[12px] border transition-colors duration-quick',
        isActive
          ? 'bg-green-50 border-green-500 text-green-700 font-medium'
          : 'border-hair text-ink-3 hover:border-sheet-edge-2 hover:text-ink',
      ].join(' ')}
    >
      {p}
    </button>
  )
}

export function DiscoveryResults({ tutors, isLoading, isFetching, hasQuery, page, totalPages, total, onPageChange, onQuickSearch }: DiscoveryResultsProps) {
  const noQuery = !hasQuery && tutors.length === 0
  const noResults = hasQuery && tutors.length === 0
  const hasPagination = totalPages > 1

  return (
    <Loadable loading={isLoading} loadingComponent={<SkeletonList />}>
      <Switch>
        <Case when={noQuery}>
          <EmptyPrompt onQuickSearch={onQuickSearch} />
        </Case>

        <Case when={noResults}>
          <EmptyState
            title="No tutors found"
            description="Try adjusting your filters or broadening your search to a nearby area."
            icon={<SearchX className="w-16 h-16" />}
          />
        </Case>

        <Default>
          <TutorList tutors={tutors} isFetching={isFetching} />
          <Switch>
            <Case when={hasPagination}>
              <PaginationBar
                page={page}
                totalPages={totalPages}
                total={total}
                onPageChange={onPageChange}
                isFetching={isFetching}
              />
            </Case>
          </Switch>
        </Default>
      </Switch>
    </Loadable>
  )
}
