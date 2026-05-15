import { SectionBreak } from './preview-canvas'

interface SwatchProps {
  readonly bg: string
  readonly border?: string
  readonly name: string
  readonly role: string
  readonly hex: string
  readonly light?: boolean
}

function Swatch({ bg, border, name, role, hex, light = false }: SwatchProps) {
  return (
    <div
      className="rounded-[var(--r-card)] overflow-hidden"
      style={{ border: '1px solid var(--sheet-edge)' }}
    >
      <div className="h-[120px]" style={{ background: bg, borderBottom: border ?? '1px solid var(--sheet-edge)' }} />
      <div className="p-4" style={{ background: 'var(--sheet)' }}>
        <div
          className="font-serif font-medium"
          style={{ fontSize: '17px', letterSpacing: '-0.012em', color: light ? '#FFFDF8' : 'var(--ink)' }}
        >
          {name}
        </div>
        <div className="mt-1 text-[12px]" style={{ color: 'var(--ink-3)' }}>{role}</div>
        <div className="mt-1.5 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>{hex}</div>
      </div>
    </div>
  )
}

const GREEN_STEPS = [
  { step: '50', hex: '#F0F7F2', var: 'var(--green-50)', light: true },
  { step: '100', hex: '#E7EFE9', var: 'var(--green-100)', light: true },
  { step: '200', hex: '#BFD5C5', var: 'var(--green-200)', light: true },
  { step: '300', hex: '#8FB39C', var: 'var(--green-300)', light: true },
  { step: '400', hex: '#5DC57E', var: 'var(--green-400)', light: false },
  { step: '500', hex: '#3BB75E', var: 'var(--green-500)', light: false },
  { step: '600', hex: '#2EA351', var: 'var(--green-600)', light: false },
  { step: '700', hex: '#258043', var: 'var(--green-700)', light: false },
  { step: '800', hex: '#1E6638', var: 'var(--green-800)', light: false },
  { step: '900', hex: '#14492A', var: 'var(--green-900)', light: false },
]

export function PalettePart() {
  return (
    <div>
      <div className="mb-9">
        <div
          className="font-mono uppercase mb-1"
          style={{ fontSize: '11px', color: 'var(--ink-3)', letterSpacing: '0.14em' }}
        >
          01 / FOUNDATION
        </div>
        <h1
          className="font-serif font-medium"
          style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}
        >
          Palette
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          Oat paper · forest accent · sage neutrals
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        One accent. <strong style={{ color: 'var(--ink)' }}>#3BB75E</strong> carries every primary action —
        Connect, Send, Save. Sage neutrals (the 100/200 tints) carry quiet status:{' '}
        <em>verified, available, replied.</em> The warm-oat paper and warm-grey ink form a single substance —
        never pure white, never pure black. Critical-red is reserved for irreversible money or safety moments;
        warm-amber for everything else warning-level.
      </p>

      <SectionBreak label="Canvas" />

      <div className="grid grid-cols-2 gap-8 mb-8">
        <Swatch bg="var(--paper)" name="Paper · oat" role="The canvas. Every screen sits on this." hex="#F7F5F0" />
        <Swatch bg="var(--sheet)" border="1px solid var(--sheet-edge)" name="Sheet · cream" role="A single card on the canvas." hex="#FFFDF8" />
        <Swatch bg="var(--paper-deep)" name="Paper · recessed" role="Behind a card, in the gallery frame." hex="#EFEBE0" />
        <div
          className="rounded-[var(--r-card)] overflow-hidden"
          style={{ border: '1px solid var(--sheet-edge)' }}
        >
          <div className="h-[120px]" style={{ background: 'var(--ink)' }} />
          <div className="p-4" style={{ background: 'var(--sheet)' }}>
            <div className="font-serif font-medium" style={{ fontSize: '17px', letterSpacing: '-0.012em', color: 'var(--ink)' }}>
              Ink · warm-near-black
            </div>
            <div className="mt-1 text-[12px]" style={{ color: 'var(--ink-3)' }}>Body, headlines. Never pure black.</div>
            <div className="mt-1.5 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>#1F231C</div>
          </div>
        </div>
      </div>

      <SectionBreak label="Forest green · the single accent" />

      <div
        className="flex rounded-xl overflow-hidden mb-4"
        style={{ border: '1px solid var(--sheet-edge)' }}
      >
        {GREEN_STEPS.map(({ step, var: cssVar, light }) => (
          <div
            key={step}
            className="flex-1 h-16 flex items-end pb-1.5 px-2"
            style={{ background: cssVar, color: light ? 'var(--ink-3)' : 'rgba(255,255,255,0.85)' }}
          >
            <span className="font-mono text-[10px]">{step}</span>
          </div>
        ))}
      </div>
      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        <strong style={{ color: 'var(--ink)' }}>500 / #3BB75E</strong> is the brand — it lives on the Connect
        button and nowhere else as a fill. 600 is hover, 700 is pressed. 100 is the sage chip background used
        by verified marks and replied-status indicators.
      </p>

      <SectionBreak label="State · used sparingly" />

      <div className="grid grid-cols-3 gap-4">
        <div
          className="rounded-[14px] p-5"
          style={{ background: 'var(--crit-bg)', color: 'var(--crit)', border: '1px solid var(--crit-edge)' }}
        >
          <div className="font-sans font-bold uppercase text-[11px] tracking-[0.14em] mb-2">Critical · irreversible</div>
          <div className="font-serif font-medium italic" style={{ fontSize: '17px', lineHeight: '1.4', letterSpacing: '-0.01em' }}>
            "₦2,500 will be charged. This cannot be refunded once the conversation begins."
          </div>
        </div>
        <div
          className="rounded-[14px] p-5"
          style={{ background: 'var(--warn-bg)', color: 'var(--warn)', border: '1px solid var(--warn-edge)' }}
        >
          <div className="font-sans font-bold uppercase text-[11px] tracking-[0.14em] mb-2">Warning · attention</div>
          <div className="font-serif font-medium italic" style={{ fontSize: '17px', lineHeight: '1.4', letterSpacing: '-0.01em' }}>
            "Marcus hasn't replied in 4 days. You can request a refund."
          </div>
        </div>
        <div
          className="rounded-[14px] p-5"
          style={{ background: 'var(--info-bg)', color: 'var(--info)', border: '1px solid var(--info-edge)' }}
        >
          <div className="font-sans font-bold uppercase text-[11px] tracking-[0.14em] mb-2">Info · safety banner</div>
          <div className="font-serif font-medium italic" style={{ fontSize: '17px', lineHeight: '1.4', letterSpacing: '-0.01em' }}>
            "Contact information is hidden until you both agree to share it."
          </div>
        </div>
      </div>
    </div>
  )
}
