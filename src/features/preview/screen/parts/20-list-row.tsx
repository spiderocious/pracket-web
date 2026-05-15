import { ListRow } from '@shared/ui/list-row'
import { Scene, Section } from './preview-canvas'

const TUTORS = [
  { name: 'Marcus K.', meta: 'Further Maths · 8 yrs · Lekki', price: '₦12,000', tone: 'default' as const },
  { name: 'Aisha O.', meta: 'Further Maths · 6 yrs · Victoria Island', price: '₦9,500', tone: 'sage' as const },
  { name: 'Tunde A.', meta: 'Further Maths · 12 yrs · Yaba', price: '₦15,000', tone: 'sand' as const },
  { name: 'Funke E.', meta: 'Further Maths · 4 yrs · Ikoyi', price: '₦7,200', tone: 'clay' as const },
  { name: 'Chinedu O.', meta: 'Further Maths · 9 yrs · Surulere', price: '₦11,000', tone: 'bone' as const },
  { name: 'Adaeze N.', meta: 'Further Maths · 7 yrs · Magodo', price: '₦10,500', tone: 'default' as const },
  { name: 'Babatunde I.', meta: 'Further Maths · 11 yrs · Ajah', price: '₦13,000', tone: 'sage' as const },
  { name: 'Olamide K.', meta: 'Further Maths · 5 yrs · Yaba', price: '₦8,800', tone: 'clay' as const },
]

export function ListRowPart() {
  return (
    <div>
      <div className="mb-9">
        <div className="font-mono uppercase mb-1 text-[11px]" style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
          20 / DATA &amp; STATE
        </div>
        <h1 className="font-serif font-medium" style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}>
          List row · the directory
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          A1 lean line · locked in Act III
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        This is the unit of the marketplace. One row per tutor. Avatar 44px. Name in Fraunces. One-line
        meta: subject · years · neighbourhood. Price right-aligned, mono, tabular. No chips, no decoration,
        no five-star nonsense — credibility lives in the profile, not the row.
      </p>

      <Scene
        label="Scene · search results · a Sunday evening"
        title="Eight tutors near Lekki · Further Maths"
        description="A parent has searched. Each row is a calm choice — the same shape eight times. Scrolling tells them they have options without overwhelming them."
      >
        <div className="grid gap-[10px]">
          {TUTORS.map((t) => (
            <ListRow key={t.name} data={t} />
          ))}
        </div>
      </Scene>

      <Section title="States · for reference">
        <div className="grid gap-4">
          {[
            { label: 'Default', data: TUTORS[0], state: 'default' as const },
            { label: 'Hover', data: TUTORS[1], state: 'hover' as const },
            { label: 'Active · selected', data: TUTORS[2], state: 'active' as const },
          ].map(({ label, data, state }) => (
            <div key={label} className="grid items-center gap-4" style={{ gridTemplateColumns: '160px 1fr' }}>
              <span
                className="font-sans font-semibold uppercase"
                style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ink-3)' }}
              >{label}</span>
              <ListRow data={data} state={state} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
