import { SectionBreak } from './preview-canvas'

const SPEEDS = [
  { token: '--t-quick', duration: '120 ms', used: 'Button colour change, focus ring fade-in, hover-state colour swap.' },
  { token: '--t-normal', duration: '220 ms', used: 'List-row lift on hover, drawer open, search-results re-sort.' },
  { token: '--t-slow', duration: '360 ms', used: 'Modal entry, page transition, sequenced reveals.' },
]

export function MotionPart() {
  return (
    <div>
      <style>{`
        @keyframes pracket-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes pracket-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes pracket-rise {
          to { opacity: 1; transform: translateY(0); }
        }
        .pracket-hover-card {
          background: var(--paper);
          border: 1px solid var(--sheet-edge);
          border-radius: 14px;
          padding: 14px 16px;
          flex: 1;
          transition: border-color 220ms cubic-bezier(.4,0,.2,1), transform 220ms cubic-bezier(.4,0,.2,1);
        }
        .pracket-hover-card:hover {
          border-color: var(--green-500);
          transform: translateY(-2px);
        }
        .pracket-focus-input {
          background: var(--paper);
          border: 1px solid var(--sheet-edge-2);
          border-radius: 12px;
          padding: 14px 16px;
          flex: 1;
          font-family: var(--sans);
          font-size: 14px;
          outline: none;
          transition: border-color 120ms cubic-bezier(.4,0,.2,1), box-shadow 120ms cubic-bezier(.4,0,.2,1);
          color: var(--ink);
          width: 100%;
        }
        .pracket-focus-input:focus {
          border-color: var(--green-500);
          box-shadow: 0 0 0 3px rgba(59,183,94,0.18);
        }
        .pracket-skeleton {
          background: linear-gradient(90deg, var(--paper-deep), var(--hair), var(--paper-deep));
          background-size: 200% 100%;
          animation: pracket-shimmer 1800ms linear infinite;
          height: 12px;
          border-radius: 6px;
          margin: 8px 0;
        }
        .pracket-reveal-tile {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          background: var(--green-100);
          border: 1px solid var(--green-200);
          opacity: 0;
          transform: translateY(8px);
          animation: pracket-rise 600ms cubic-bezier(.4,0,.2,1) forwards;
        }
      `}</style>

      <div className="mb-9">
        <div className="font-mono uppercase mb-1 text-[11px]" style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
          04 / FOUNDATION
        </div>
        <h1 className="font-serif font-medium" style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}>
          Motion
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          Calm · functional · never bouncy
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        Motion in Pracket does work — it never decorates. A focus ring fades in to confirm the field
        is listening. A list row lifts 2px when you hover to say <em>this one is clickable</em>. No
        springs, no overshoots, no parallax. We use one easing curve (
        <code className="font-mono text-[12px]">cubic-bezier(.4, 0, .2, 1)</code>) and three speeds.
      </p>

      <SectionBreak label="Speeds" />

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            {['Token', 'Duration', 'Used for'].map((h) => (
              <th
                key={h}
                className="font-sans font-semibold uppercase text-left"
                style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ink-3)', padding: '12px 16px', borderBottom: '1px solid var(--hair)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SPEEDS.map(({ token, duration, used }) => (
            <tr key={token}>
              <td className="font-mono" style={{ fontSize: '12px', padding: '12px 16px', borderBottom: '1px solid var(--hair)', color: 'var(--ink)' }}>{token}</td>
              <td className="font-mono" style={{ fontSize: '12px', padding: '12px 16px', borderBottom: '1px solid var(--hair)', color: 'var(--ink)' }}>{duration}</td>
              <td style={{ fontSize: '13px', padding: '12px 16px', borderBottom: '1px solid var(--hair)', color: 'var(--ink-2)' }}>{used}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SectionBreak label="Specimens" />

      <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Hover */}
        <div
          className="rounded-[18px]"
          style={{ background: 'var(--sheet)', border: '1px solid var(--sheet-edge)', padding: '28px', minHeight: '200px' }}
        >
          <div className="font-sans font-semibold uppercase mb-[10px]" style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'var(--ink-3)' }}>
            Hover · list row
          </div>
          <h3 className="font-serif font-medium mb-1" style={{ fontSize: '22px', letterSpacing: '-0.012em', color: 'var(--ink)', margin: '0 0 6px' }}>
            Lift by 2px, edge to green
          </h3>
          <p className="text-[13px] mb-[22px]" style={{ color: 'var(--ink-3)', lineHeight: '1.6' }}>220ms. Hover any row.</p>
          <div className="flex items-center gap-[18px]">
            <div className="pracket-hover-card">
              <div className="font-serif font-medium" style={{ fontSize: '16px', letterSpacing: '-0.01em', color: 'var(--ink)' }}>Marcus K.</div>
              <div className="text-[12px] mt-[2px]" style={{ color: 'var(--ink-3)' }}>Further Maths · 8 yrs · Lekki</div>
            </div>
          </div>
        </div>

        {/* Focus */}
        <div
          className="rounded-[18px]"
          style={{ background: 'var(--sheet)', border: '1px solid var(--sheet-edge)', padding: '28px', minHeight: '200px' }}
        >
          <div className="font-sans font-semibold uppercase mb-[10px]" style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'var(--ink-3)' }}>
            Focus · input
          </div>
          <h3 className="font-serif font-medium mb-1" style={{ fontSize: '22px', letterSpacing: '-0.012em', color: 'var(--ink)', margin: '0 0 6px' }}>
            Edge to green, halo fades in
          </h3>
          <p className="text-[13px] mb-[22px]" style={{ color: 'var(--ink-3)', lineHeight: '1.6' }}>120ms. Click the field.</p>
          <div className="flex items-center gap-[18px]">
            <input
              className="pracket-focus-input"
              placeholder="Subject — Further Maths, English, Chemistry…"
            />
          </div>
        </div>

        {/* Pulse */}
        <div
          className="rounded-[18px]"
          style={{ background: 'var(--sheet)', border: '1px solid var(--sheet-edge)', padding: '28px', minHeight: '200px' }}
        >
          <div className="font-sans font-semibold uppercase mb-[10px]" style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'var(--ink-3)' }}>
            Pulse · waiting for reply
          </div>
          <h3 className="font-serif font-medium mb-1" style={{ fontSize: '22px', letterSpacing: '-0.012em', color: 'var(--ink)', margin: '0 0 6px' }}>
            Opacity 0.5 → 1, 1400ms loop
          </h3>
          <p className="text-[13px] mb-[22px]" style={{ color: 'var(--ink-3)', lineHeight: '1.6' }}>Used on the tutor-status dot while a tutor is composing.</p>
          <div className="flex items-center gap-[18px]">
            <span
              className="flex items-center gap-[10px] text-[13px]"
              style={{ animation: 'pracket-pulse 1400ms cubic-bezier(.4,0,.2,1) infinite', color: 'var(--ink-2)' }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green-500)', display: 'inline-block' }} />
              Marcus is typing
            </span>
          </div>
        </div>

        {/* Skeleton */}
        <div
          className="rounded-[18px]"
          style={{ background: 'var(--sheet)', border: '1px solid var(--sheet-edge)', padding: '28px', minHeight: '200px' }}
        >
          <div className="font-sans font-semibold uppercase mb-[10px]" style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'var(--ink-3)' }}>
            Skeleton · search loading
          </div>
          <h3 className="font-serif font-medium mb-1" style={{ fontSize: '22px', letterSpacing: '-0.012em', color: 'var(--ink)', margin: '0 0 6px' }}>
            Shimmer left-to-right, 1800ms
          </h3>
          <p className="text-[13px] mb-[22px]" style={{ color: 'var(--ink-3)', lineHeight: '1.6' }}>A row's silhouette while we fetch tutors.</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 0 }}>
            <div className="pracket-skeleton" style={{ width: '60%' }} />
            <div className="pracket-skeleton" style={{ width: '85%' }} />
            <div className="pracket-skeleton" style={{ width: '45%' }} />
          </div>
        </div>

        {/* Sequenced reveal — spans 2 cols */}
        <div
          className="rounded-[18px]"
          style={{ background: 'var(--sheet)', border: '1px solid var(--sheet-edge)', padding: '28px', gridColumn: 'span 2' }}
        >
          <div className="font-sans font-semibold uppercase mb-[10px]" style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'var(--ink-3)' }}>
            Sequenced reveal · results
          </div>
          <h3 className="font-serif font-medium mb-1" style={{ fontSize: '22px', letterSpacing: '-0.012em', color: 'var(--ink)', margin: '0 0 6px' }}>
            Each row rises 8px, staggered 80ms
          </h3>
          <p className="text-[13px] mb-[22px]" style={{ color: 'var(--ink-3)', lineHeight: '1.6' }}>
            After a search submits, results appear in order — not all at once. It tells the parent
            the system is choosing each tutor deliberately.
          </p>
          <div className="flex items-center gap-[18px]">
            <div className="flex gap-[10px]">
              {[0, 80, 160, 240, 320].map((delay) => (
                <div
                  key={delay}
                  className="pracket-reveal-tile"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <SectionBreak label="What we never do" />

      <p className="text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        No spring overshoots. No parallax. No haptic-mimicking bounces. No confetti, no streak
        animations, no medal reveals — those belong to gamified systems, which is the one thing
        the brief explicitly rejected.{' '}
        <code className="font-mono text-[12px]">prefers-reduced-motion</code> turns every
        transition above 120ms into an instant change.
      </p>
    </div>
  )
}
