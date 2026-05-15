import { X } from '@shared/ui/icons'
import { Button } from '@shared/ui'
import type { DiscoveryFilters } from '../../helpers/use-discovery-filters'

const LEVELS = ['GCSE', 'A-Level', 'Primary', 'University', 'Professional'] as const
const FORMATS = [
  { label: 'Online', value: 'online' },
  { label: 'In-person', value: 'inPerson' },
  { label: 'Both', value: 'both' },
] as const

interface FilterSheetProps {
  readonly open: boolean
  readonly filters: DiscoveryFilters
  readonly onFilterChange: (key: keyof DiscoveryFilters, value: string) => void
  readonly onClose: () => void
}

export function FilterSheet({ open, filters, onFilterChange, onClose }: FilterSheetProps) {
  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-ink/40 z-50"
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-paper rounded-t-[20px] p-6 shadow-modal max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif font-medium text-[20px] text-ink tracking-display">Filters</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sheet text-ink-3">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-6">
          <p className="font-mono text-[11px] uppercase tracking-overline text-ink-3 mb-3">Level</p>
          <div className="flex flex-wrap gap-2">
            {LEVELS.map(level => {
              const active = filters.level === level
              return (
                <button
                  key={level}
                  onClick={() => onFilterChange('level', active ? '' : level)}
                  className={[
                    'h-8 px-4 rounded-pill text-[13px] font-sans border transition-colors duration-quick',
                    active
                      ? 'bg-green-50 border-green-500 text-green-700'
                      : 'bg-sheet border-hair text-ink-2 hover:border-ink-4',
                  ].join(' ')}
                >
                  {level}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-overline text-ink-3 mb-3">Format</p>
          <div className="flex flex-wrap gap-2">
            {FORMATS.map(fmt => {
              const active = filters.format === fmt.value
              return (
                <button
                  key={fmt.value}
                  onClick={() => onFilterChange('format', active ? '' : fmt.value)}
                  className={[
                    'h-8 px-4 rounded-pill text-[13px] font-sans border transition-colors duration-quick',
                    active
                      ? 'bg-green-50 border-green-500 text-green-700'
                      : 'bg-sheet border-hair text-ink-2 hover:border-ink-4',
                  ].join(' ')}
                >
                  {fmt.label}
                </button>
              )
            })}
          </div>
        </div>

        <Button variant="primary" block onClick={onClose}>
          Show results
        </Button>
      </div>
    </>
  )
}
