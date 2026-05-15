import { SlidersHorizontal } from '@shared/ui/icons'
import { Button } from '@shared/ui'
import type { DiscoveryFilters } from '../../helpers/use-discovery-filters'

const LEVELS = ['GCSE', 'A-Level', 'Primary', 'University', 'Professional'] as const
const FORMATS = [
  { label: 'Online', value: 'online' },
  { label: 'In-person', value: 'inPerson' },
  { label: 'Both', value: 'both' },
] as const

const SORTS = [
  { label: 'Relevant', value: 'relevance' },
  { label: 'Price ↑', value: 'price' },
  { label: 'Price ↓', value: 'price_desc' },
] as const

interface DiscoveryFiltersProps {
  readonly filters: DiscoveryFilters
  readonly onFilterChange: (key: keyof DiscoveryFilters, value: string) => void
  readonly onOpenSheet: () => void
  readonly resultCount?: number
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  readonly label: string
  readonly active: boolean
  readonly onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'h-7 px-3 rounded-pill text-[12px] font-sans font-medium border transition-[background,border-color,color] duration-quick shrink-0',
        active
          ? 'bg-green-50 border-green-500 text-green-700'
          : 'bg-sheet border-hair text-ink-3 hover:border-sheet-edge-2 hover:text-ink-2',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

export function DiscoveryFilters({ filters, onFilterChange, onOpenSheet, resultCount }: DiscoveryFiltersProps) {
  return (
    <div className="py-4">
      {/* Desktop filter row */}
      <div className="hidden sm:flex items-center gap-3 flex-wrap">
        <span className="font-mono text-[10.5px] uppercase tracking-overline text-ink-4 shrink-0 mr-1">
          Level
        </span>
        {LEVELS.map(level => (
          <FilterPill
            key={level}
            label={level}
            active={filters.level === level}
            onClick={() => onFilterChange('level', filters.level === level ? '' : level)}
          />
        ))}

        <div className="w-px h-4 bg-hair mx-2 shrink-0" />

        <span className="font-mono text-[10.5px] uppercase tracking-overline text-ink-4 shrink-0 mr-1">
          Format
        </span>
        {FORMATS.map(fmt => (
          <FilterPill
            key={fmt.value}
            label={fmt.label}
            active={filters.format === fmt.value}
            onClick={() => onFilterChange('format', filters.format === fmt.value ? '' : fmt.value)}
          />
        ))}

        <div className="flex-1" />

        {/* Sort */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="font-mono text-[10.5px] uppercase tracking-overline text-ink-4 mr-1">Sort</span>
          {SORTS.map(sort => (
            <FilterPill
              key={sort.value}
              label={sort.label}
              active={filters.sort === sort.value}
              onClick={() => onFilterChange('sort', sort.value)}
            />
          ))}
        </div>
      </div>

      {/* Mobile row: filter button + count */}
      <div className="flex sm:hidden items-center justify-between">
        <Button
          variant="quiet"
          size="sm"
          onClick={onOpenSheet}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>

        {resultCount !== undefined && (
          <span className="font-mono text-[11px] text-ink-3">
            {resultCount} tutor{resultCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Desktop result count */}
      {resultCount !== undefined && (
        <p className="hidden sm:block font-mono text-[11px] text-ink-4 mt-3">
          {resultCount} tutor{resultCount !== 1 ? 's' : ''} found
        </p>
      )}
    </div>
  )
}
