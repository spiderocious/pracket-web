import { SectionBreak } from './preview-canvas'

const SPACING = [4, 8, 12, 16, 24, 32, 48, 64]

const RADII = [
  { label: 'Sharp', px: '6 px', r: 6, desc: 'Chips, small icons, inline marks.' },
  { label: 'Soft', px: '12 px', r: 12, desc: 'Inputs, small buttons.' },
  { label: 'Card', px: '16 px', r: 16, desc: 'Buttons, list rows, the standard card.' },
  { label: 'Card lg', px: '20 px', r: 20, desc: 'Profile cards, modals.' },
]

export function GeometryPart() {
  return (
    <div>
      <div className="mb-9">
        <div className="font-mono uppercase mb-1 text-[11px]" style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
          03 / FOUNDATION
        </div>
        <h1 className="font-serif font-medium" style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}>
          Spacing &amp; geometry
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          4-unit base · soft radii · hairlines
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        Generous radii (16–20px on cards, 14px on inputs, 999px on chips). The corner softness is the
        stance's signal — it's what makes oat-paper feel like a Sunday morning. Spacing follows a
        4-unit base; eight is the unit you'll see most often. Hairlines, never shadows, separate two
        cards on the canvas.
      </p>

      <SectionBreak label="Spacing scale" />

      <div
        className="flex items-end gap-3 rounded-[14px]"
        style={{ padding: '24px', background: 'var(--sheet)', border: '1px solid var(--sheet-edge)' }}
      >
        {SPACING.map((s) => (
          <div
            key={s}
            style={{
              width: `${s}px`,
              height: `${s}px`,
              background: 'var(--green-100)',
              border: '1px solid var(--green-200)',
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      <p className="mt-[14px] text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        <strong style={{ color: 'var(--ink)' }}>4 · 8 · 12 · 16 · 24 · 32 · 48 · 64</strong>. Inside a
        card, 14–18 between rows. Between cards, 16–24. Outer page margins, 56–88. Cards are spacious
        because the project's answer to density was spacious — packed has no place here.
      </p>

      <SectionBreak label="Radii" />

      <div className="grid gap-[18px]" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {RADII.map(({ label, px, r, desc }) => (
          <div
            key={label}
            style={{
              background: 'var(--sheet)',
              border: '1px solid var(--sheet-edge)',
              borderRadius: `${r}px`,
              padding: '18px',
            }}
          >
            <div
              className="font-sans font-semibold uppercase mb-3"
              style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--ink-3)' }}
            >
              {label}
            </div>
            <div className="font-mono text-[12px]" style={{ color: 'var(--ink)' }}>{px}</div>
            <p className="font-sans text-[11px] mt-[10px]" style={{ color: 'var(--ink-3)', margin: '10px 0 0' }}>
              {desc}
            </p>
          </div>
        ))}
      </div>

      <SectionBreak label="Hairlines over shadows" />

      <div
        className="rounded-[14px]"
        style={{ background: 'var(--sheet)', border: '1px solid var(--sheet-edge)', padding: '24px' }}
      >
        {[
          { name: 'Marcus K.', note: 'strong hair · 1px on edge', soft: false },
          { name: 'Aisha O.', note: 'strong hair · 1px between rows', soft: false },
          { name: 'Tunde A.', note: 'soft hair · for sub-rows inside one block', soft: true },
        ].map(({ name, note, soft }, i) => (
          <div
            key={name}
            className="flex items-center gap-[18px] py-3"
            style={i > 0 ? { borderTop: `1px solid var(--hair${soft ? '-soft' : ''})` } : undefined}
          >
            <div className="font-serif flex-1" style={{ fontSize: '17px', color: 'var(--ink)' }}>{name}</div>
            <div className="font-mono" style={{ fontSize: '11px', color: 'var(--ink-3)' }}>{note}</div>
          </div>
        ))}
      </div>
      <p className="mt-[14px] text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        A drop-shadow is the second-easiest way to make a card look "AI-default." We use it only for
        modals and the rare popover. Everywhere else: a 1px hairline at the sheet-edge tone.
      </p>

      <SectionBreak label="Component density · the answer" />

      <div
        className="flex items-center gap-6 rounded-[18px]"
        style={{ padding: '28px', background: 'var(--sheet)', border: '1px solid var(--sheet-edge)' }}
      >
        <div
          className="flex-shrink-0 rounded-[8px]"
          style={{ width: '80px', height: '80px', background: 'var(--green-500)' }}
        />
        <div className="flex-1">
          <div
            className="font-sans font-semibold uppercase mb-2"
            style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ink-3)' }}
          >
            Spacious · room to breathe
          </div>
          <p className="text-[13px] leading-[1.65]" style={{ color: 'var(--ink-2)', margin: 0 }}>
            <strong style={{ color: 'var(--ink)' }}>Pracket is spacious.</strong> One tutor per row,
            paragraph-level depth in the profile, a search results page that feels like a quiet library —
            not a Black-Friday grid. The brief was clear: a parent on the couch on a Sunday evening
            should never feel rushed.
          </p>
        </div>
      </div>
    </div>
  )
}
