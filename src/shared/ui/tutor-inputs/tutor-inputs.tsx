// --- SubjectPicker ---
interface SubjectResult {
  readonly label: string
  readonly sub: string
  readonly selected?: boolean
}

interface SubjectPickerProps {
  readonly query?: string
  readonly results?: readonly SubjectResult[]
}

export function SubjectPicker({ query = '', results = [] }: SubjectPickerProps) {
  return (
    <div
      className="rounded-[16px]"
      style={{ background: 'var(--paper)', border: '1px solid var(--sheet-edge)', padding: '18px', maxWidth: '540px' }}
    >
      <div
        className="flex items-center gap-3 rounded-xl"
        style={{ padding: '12px 14px', background: 'var(--sheet)', border: '1px solid var(--sheet-edge-2)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', color: 'var(--ink-3)', flexShrink: 0 }}>
          <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
        </svg>
        <span className="font-sans text-[14px]" style={{ color: 'var(--ink)' }}>{query}</span>
      </div>
      {results.length > 0 && (
        <div className="mt-3" style={{ maxHeight: '220px', overflowY: 'auto' }}>
          {results.map((r, i) => (
            <div
              key={i}
              className={[
                'flex items-center gap-3 rounded-[10px] px-3 py-[10px] font-sans text-[14px] cursor-pointer transition-[background] duration-[var(--t-quick)] ease-[var(--ease)]',
                r.selected ? 'bg-[var(--green-50)] text-[var(--green-800)] font-semibold' : 'hover:bg-[var(--green-50)] text-[var(--ink)]',
              ].join(' ')}
            >
              <span className="flex-1">{r.label}</span>
              <span className="font-sans text-[12px]" style={{ color: 'var(--ink-3)', fontWeight: 400 }}>{r.sub}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// --- RadiusSlider (display only — visual only, no real slider interaction needed for DS) ---
interface RadiusSliderProps {
  readonly label?: string
  readonly value?: number
  readonly fillPct?: number
}

export function RadiusSlider({ label = 'Distance', value = 12, fillPct = 55 }: RadiusSliderProps) {
  const ticks = ['2', '5', '10', '20', '50', 'any']
  return (
    <div className="grid gap-[14px]" style={{ maxWidth: '540px' }}>
      <div className="flex items-baseline justify-between">
        <span className="font-sans font-semibold uppercase text-[11px]" style={{ letterSpacing: '0.1em', color: 'var(--ink-3)' }}>{label}</span>
        <span className="font-mono tabular" style={{ fontSize: '14px', color: 'var(--ink)' }}>{value} km</span>
      </div>
      <div className="relative rounded-full" style={{ height: '6px', background: 'var(--sheet-edge)', margin: '18px 0 6px' }}>
        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${fillPct}%`, background: 'var(--green-500)' }} />
        <div
          className="absolute rounded-full"
          style={{
            top: '50%',
            left: `${fillPct}%`,
            width: '18px',
            height: '18px',
            background: 'var(--green-500)',
            transform: 'translate(-50%, -50%)',
            border: '3px solid var(--sheet)',
            boxShadow: '0 0 0 1px var(--green-500)',
          }}
        />
      </div>
      <div className="flex justify-between font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
        {ticks.map((t) => <span key={t}>{t}</span>)}
      </div>
    </div>
  )
}

// --- PriceBand ---
interface PriceBandProps {
  readonly min?: number
  readonly max?: number
  readonly minPct?: number
  readonly maxPct?: number
}

export function PriceBand({ min = 4000, max = 14000, minPct = 18, maxPct = 68 }: PriceBandProps) {
  const fmt = (n: number) => `₦${n.toLocaleString()}`
  return (
    <div className="grid gap-[14px]" style={{ maxWidth: '540px' }}>
      <div className="flex gap-8 items-end">
        <div>
          <div className="font-sans font-semibold uppercase text-[11px] mb-0.5" style={{ letterSpacing: '0.1em', color: 'var(--ink-3)' }}>Min</div>
          <div className="font-mono tabular text-[13px]" style={{ color: 'var(--ink)' }}>{fmt(min)}</div>
        </div>
        <div>
          <div className="font-sans font-semibold uppercase text-[11px] mb-0.5" style={{ letterSpacing: '0.1em', color: 'var(--ink-3)' }}>Max</div>
          <div className="font-mono tabular text-[13px]" style={{ color: 'var(--ink)' }}>{fmt(max)}</div>
        </div>
      </div>
      <div className="relative rounded-full" style={{ height: '6px', background: 'var(--sheet-edge)', margin: '18px 0 6px' }}>
        <div
          className="absolute inset-y-0 rounded-full"
          style={{ left: `${minPct}%`, right: `${100 - maxPct}%`, background: 'var(--green-500)' }}
        />
        {[minPct, maxPct].map((pct, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: '50%',
              left: `${pct}%`,
              width: '18px',
              height: '18px',
              background: 'var(--green-500)',
              transform: 'translate(-50%, -50%)',
              border: '3px solid var(--sheet)',
              boxShadow: '0 0 0 1px var(--green-500)',
            }}
          />
        ))}
      </div>
      <div className="flex justify-between font-mono text-[13px]" style={{ color: 'var(--ink)' }}>
        <span>₦1,000</span><span>₦25,000+</span>
      </div>
    </div>
  )
}

// --- WeekGrid ---
type SlotState = 'empty' | 'on' | 'busy'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const TIMES = ['09:00', '11:00', '14:00', '16:00', '18:00']
const GRID: SlotState[][] = [
  ['empty', 'empty', 'empty', 'empty', 'empty', 'on', 'on'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'on', 'on'],
  ['busy', 'on', 'busy', 'on', 'busy', 'on', 'empty'],
  ['on', 'on', 'on', 'on', 'on', 'empty', 'empty'],
  ['on', 'busy', 'on', 'busy', 'on', 'empty', 'empty'],
]

export function WeekGrid() {
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: '80px repeat(7, 1fr)', maxWidth: '720px' }}
    >
      <div />
      {DAYS.map((d) => (
        <div key={d} className="font-sans font-semibold uppercase text-center py-1.5" style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'var(--ink-3)' }}>{d}</div>
      ))}
      {TIMES.map((time, ti) => (
        <>
          <div key={`ts-${time}`} className="font-mono self-center px-1" style={{ fontSize: '11px', color: 'var(--ink-3)' }}>{time}</div>
          {GRID[ti].map((state, di) => (
            <div
              key={`${ti}-${di}`}
              className="rounded-lg"
              style={{
                height: '34px',
                background: state === 'on' ? 'var(--green-100)' : state === 'busy' ? 'var(--paper-deep)' : 'var(--sheet)',
                border: `1px solid ${state === 'on' ? 'var(--green-200)' : 'var(--sheet-edge)'}`,
                opacity: state === 'busy' ? 0.6 : 1,
                cursor: state === 'busy' ? 'not-allowed' : 'pointer',
              }}
            />
          ))}
        </>
      ))}
    </div>
  )
}

// --- UploadZone + DocCard ---
export function UploadZone() {
  return (
    <div
      className="text-center rounded-[16px]"
      style={{
        border: '2px dashed var(--sheet-edge-2)',
        padding: '28px',
        background: 'var(--paper)',
        maxWidth: '460px',
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '38px', height: '38px', color: 'var(--ink-3)', margin: '0 auto' }}>
        <path d="M12 3v18M5 10l7-7 7 7"/>
      </svg>
      <div className="font-serif font-medium mt-[14px] mb-1" style={{ fontSize: '18px', color: 'var(--ink)' }}>Drop a PDF or photograph here</div>
      <p className="font-sans text-[12.5px] mb-[14px] leading-[1.5]" style={{ color: 'var(--ink-3)', margin: '0 0 14px' }}>
        Up to 10 MB. We accept degrees, teaching certificates, IDs, references.
      </p>
      <button
        type="button"
        className="font-sans font-semibold text-[13px] rounded-xl h-9 px-4 border cursor-pointer transition-[background,border-color] duration-[var(--t-quick)]"
        style={{ background: 'var(--sheet)', borderColor: 'var(--sheet-edge-2)', color: 'var(--ink)' }}
      >
        Choose file
      </button>
    </div>
  )
}

type DocStatus = 'review' | 'verified'

interface DocCardProps {
  readonly name: string
  readonly sub: string
  readonly status: DocStatus
}

export function DocCard({ name, sub, status }: DocCardProps) {
  return (
    <div
      className="grid items-center gap-[14px] rounded-xl"
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--sheet-edge)',
        padding: '14px 16px',
        maxWidth: '460px',
        gridTemplateColumns: '36px 1fr auto',
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: '26px', height: '26px', color: 'var(--ink-3)' }}>
        <path d="M5 4h11l3 3v13H5z"/><path d="M9 12h6M9 16h4"/>
      </svg>
      <div>
        <div className="font-serif font-medium" style={{ fontSize: '15px', letterSpacing: '-0.01em', color: 'var(--ink)' }}>{name}</div>
        <div className="font-sans text-[11.5px] mt-0.5" style={{ color: 'var(--ink-3)' }}>{sub}</div>
      </div>
      {status === 'review' ? (
        <span
          className="font-sans font-semibold uppercase rounded-full"
          style={{ fontSize: '11px', letterSpacing: '0.06em', color: 'var(--warn)', background: 'var(--warn-bg)', padding: '4px 10px', border: '1px solid var(--warn-edge)' }}
        >
          Under review
        </span>
      ) : (
        <span
          className="inline-flex items-center gap-2 rounded-full font-sans font-semibold uppercase"
          style={{ height: '24px', padding: '0 10px 0 8px', background: 'var(--green-100)', color: 'var(--green-800)', fontSize: '11px', letterSpacing: '0.06em' }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green-500)', display: 'inline-block' }} />
          Verified
        </span>
      )}
    </div>
  )
}
