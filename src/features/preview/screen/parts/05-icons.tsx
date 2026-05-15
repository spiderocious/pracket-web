import { SectionBreak } from './preview-canvas'

interface IconCellProps {
  readonly name: string
  readonly children: React.ReactNode
}

function IconCell({ name, children }: IconCellProps) {
  return (
    <div
      className="flex flex-col items-center gap-[10px] rounded-[14px]"
      style={{ background: 'var(--sheet)', border: '1px solid var(--sheet-edge)', padding: '18px 14px' }}
    >
      <div style={{ width: '28px', height: '28px', color: 'var(--ink)' }}>{children}</div>
      <span className="font-sans" style={{ fontSize: '11px', color: 'var(--ink-3)', letterSpacing: '0.02em' }}>{name}</span>
    </div>
  )
}

export function IconsPart() {
  return (
    <div>
      <div className="mb-9">
        <div className="font-mono uppercase mb-1 text-[11px]" style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
          05 / FOUNDATION
        </div>
        <h1 className="font-serif font-medium" style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}>
          Iconography
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          1.5px stroke · 24px · neutral, never cartoon
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        A small, restrained set. Single-weight outline icons — 1.5px stroke, 24px frame, rounded line-caps.
        They sit at ink-2 next to label text; they never carry colour. No coloured backgrounds, no filled
        circles, no badges with little tutoring-hats. The trust idiom is the{' '}
        <span className="font-sans font-semibold" style={{ color: 'var(--green-700)', background: 'var(--green-100)', borderRadius: '4px', padding: '1px 5px', fontSize: '11px' }}>
          verified
        </span>{' '}
        capsule, not an icon.
      </p>

      <SectionBreak label="The set" />

      <div className="grid gap-[14px]" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
        <IconCell name="search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
          </svg>
        </IconCell>

        <IconCell name="location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <path d="M12 21s-7-4.5-7-10a7 7 0 1 1 14 0c0 5.5-7 10-7 10Z"/><circle cx="12" cy="11" r="2.5"/>
          </svg>
        </IconCell>

        <IconCell name="duration">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>
          </svg>
        </IconCell>

        <IconCell name="payment">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <path d="M4 6h16v12H4z"/><path d="M4 9h16"/><circle cx="8" cy="13" r="1" fill="currentColor"/>
          </svg>
        </IconCell>

        <IconCell name="message">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <path d="M4 6h16v10H7l-3 3z"/>
          </svg>
        </IconCell>

        <IconCell name="calendar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>
          </svg>
        </IconCell>

        <IconCell name="verified">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <path d="M12 3 4 7v6c0 4.5 3.5 7 8 8 4.5-1 8-3.5 8-8V7l-8-4Z"/>
          </svg>
        </IconCell>

        <IconCell name="filter">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <path d="M4 7h16M4 12h16M4 17h10"/>
          </svg>
        </IconCell>

        <IconCell name="confirm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <path d="M20 7 9 18l-5-5"/>
          </svg>
        </IconCell>

        <IconCell name="close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <path d="M6 6l12 12M18 6 6 18"/>
          </svg>
        </IconCell>

        <IconCell name="arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </IconCell>

        <IconCell name="photo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <path d="M19 21H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2l2-3h6l2 3h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2Z"/><circle cx="12" cy="14" r="3.5"/>
          </svg>
        </IconCell>

        <IconCell name="credential">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <path d="M5 4h11l3 3v13H5z"/><path d="M9 12h6M9 16h4"/>
          </svg>
        </IconCell>

        <IconCell name="students">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2"/><path d="M15 20c0-2 1.5-3.5 4-3.5"/>
          </svg>
        </IconCell>

        <IconCell name="subjects">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <path d="M4 6h16M4 12h16M4 18h8"/>
          </svg>
        </IconCell>

        <IconCell name="caution">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>
          </svg>
        </IconCell>

        <IconCell name="upload">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <path d="M12 3v18M5 10l7-7 7 7"/>
          </svg>
        </IconCell>

        <IconCell name="add">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/>
          </svg>
        </IconCell>
      </div>

      <SectionBreak label="What we never use" />

      <div
        className="rounded-[16px]"
        style={{ background: 'var(--crit-bg)', border: '1px solid var(--crit-edge)', padding: '24px 28px' }}
      >
        <h3
          className="font-serif font-medium mb-3"
          style={{ fontSize: '22px', letterSpacing: '-0.012em', color: 'var(--ink)', margin: '0 0 12px' }}
        >
          No emojis as icons. No little hats. No coloured badges.
        </h3>
        <ul className="m-0 text-[13px] leading-[1.7]" style={{ paddingLeft: '18px', color: 'var(--crit)' }}>
          <li>No 🎓 / 📚 / 📝 / ⭐ in chrome. The stance is restraint — those undo it.</li>
          <li>No filled circle-with-checkmark on tutor profiles. Use the{' '}
            <span className="font-sans font-semibold" style={{ color: 'var(--green-800)' }}>verified</span> capsule.
          </li>
          <li>No coloured icons. Icons sit at ink. The accent is reserved for the connect button.</li>
          <li>No medals, trophies, streak-flames, or level-up sparkles. We do not gamify.</li>
        </ul>
      </div>
    </div>
  )
}
