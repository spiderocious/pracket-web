import { Scene } from './preview-canvas'

// ─── StatsStrip (local — not in shared/ui) ────────────────────────────────────

interface StatItem {
  readonly label: string
  readonly value: string
}

interface StatsStripProps {
  readonly stats: readonly StatItem[]
}

function StatsStrip({ stats }: StatsStripProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        padding: '16px 0',
        borderBottom: '1px solid var(--hair)',
      }}
    >
      {stats.map((stat) => (
        <div key={stat.label}>
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              color: 'var(--ink-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.10em',
              marginBottom: '4px',
            }}
          >
            {stat.label}
          </div>
          <div
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '22px',
              fontWeight: 500,
              letterSpacing: '-0.018em',
              color: 'var(--ink)',
              lineHeight: 1.1,
            }}
          >
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── StatsStripPart ───────────────────────────────────────────────────────────

export function StatsStripPart() {
  return (
    <div>
      <div className="mb-9">
        <div
          className="font-mono uppercase mb-1 text-[11px]"
          style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}
        >
          50 / SURFACE
        </div>
        <h1
          className="font-serif font-medium"
          style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}
        >
          Stats strip
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          The trust numbers
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        A compact strip of three or four numbers that appears at the top of a tutor profile or in
        the search header. No decorations — just the fact.
      </p>

      <Scene
        label="Scene · stats strip · tutor profile header"
        title="Marcus K. · profile summary"
        description="Four key numbers from the tutor's history. Mono label, serif value."
      >
        <StatsStrip
          stats={[
            { label: 'Students', value: '142' },
            { label: 'Years teaching', value: '8' },
            { label: 'Avg. first reply', value: '2 hrs' },
            { label: 'Connect fee', value: '₦2,500' },
          ]}
        />
      </Scene>
    </div>
  )
}
