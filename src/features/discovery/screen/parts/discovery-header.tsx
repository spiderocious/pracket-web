import { Search } from '@shared/ui/icons'
import { SiteHeader } from '@shared/ui'

interface DiscoveryHeaderProps {
  readonly searchValue: string
  readonly onSearchChange: (value: string) => void
}

export function DiscoveryHeader({ searchValue, onSearchChange }: DiscoveryHeaderProps) {
  return (
    <div>
      <SiteHeader />

      {/* Hero search band — sits below the sticky nav */}
      <div className="bg-paper border-b border-hair">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8">
          <h1 className="font-serif font-medium text-[30px] sm:text-[36px] tracking-display text-ink mb-1.5 leading-tight">
            Find a verified tutor
          </h1>
          <p className="font-sans text-[14px] text-ink-3 mb-6">
            Every tutor on Pracket is identity-verified before their profile goes live.
          </p>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-ink-4 pointer-events-none" />
            <input
              type="search"
              value={searchValue}
              onChange={e => onSearchChange(e.target.value)}
              placeholder='Subject, level, or location — e.g. "Further Maths · A-Level · Lekki"'
              className="w-full h-12 pl-11 pr-5 bg-sheet border border-hair rounded-card text-[14px] font-sans text-ink placeholder:text-ink-4 focus:outline-none focus:border-green-500 focus:shadow-[0_0_0_3px_rgba(59,183,94,0.15)] transition-[border-color,box-shadow] duration-quick"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
