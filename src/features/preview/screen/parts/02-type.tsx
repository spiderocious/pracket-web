import { SectionBreak } from './preview-canvas'

interface SpecRowProps {
  readonly meta: string
  readonly label: string
  readonly children: React.ReactNode
}

function SpecRow({ meta, label, children }: SpecRowProps) {
  return (
    <div
      className="grid gap-6 py-[14px] items-baseline"
      style={{ gridTemplateColumns: '120px 1fr', borderBottom: '1px solid var(--hair-soft)' }}
    >
      <div className="font-mono text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
        <strong
          className="block font-sans font-semibold uppercase mb-1"
          style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ink)' }}
        >
          {label}
        </strong>
        {meta}
      </div>
      <div>{children}</div>
    </div>
  )
}

interface SpecimenProps {
  readonly family: string
  readonly children: React.ReactNode
}

function Specimen({ family, children }: SpecimenProps) {
  return (
    <div
      className="mb-6 rounded-[16px]"
      style={{ padding: '32px 36px', background: 'var(--sheet)', border: '1px solid var(--sheet-edge)' }}
    >
      <div
        className="font-sans font-semibold uppercase mb-[18px]"
        style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'var(--ink-3)' }}
      >
        Family ·{' '}
        <span style={{ color: 'var(--ink)' }}>{family}</span>
      </div>
      {children}
    </div>
  )
}

export function TypePart() {
  return (
    <div>
      <div className="mb-9">
        <div className="font-mono uppercase mb-1 text-[11px]" style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
          02 / FOUNDATION
        </div>
        <h1 className="font-serif font-medium" style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}>
          Type
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          Fraunces · Inter · JetBrains Mono
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        Three families, three jobs. <strong style={{ color: 'var(--ink)' }}>Fraunces</strong> serif for thinking —
        tutor names, headlines, teaching philosophy pulled out as italic quotes.{' '}
        <strong style={{ color: 'var(--ink)' }}>Inter</strong> sans for chrome and body — labels, navigation,
        paragraphs of running copy. <strong style={{ color: 'var(--ink)' }}>JetBrains Mono</strong> for figures —
        prices, hours, dates, anything tabular.
      </p>

      {/* Fraunces */}
      <Specimen family="Fraunces · serif · for thinking">
        <SpecRow label="Display" meta="56 / 1.02&#10;letter -0.024em">
          <span className="font-serif font-medium block" style={{ fontSize: '56px', lineHeight: '1.02', letterSpacing: '-0.024em', color: 'var(--ink)' }}>
            Find a tutor who teaches the way you wish you'd been taught.
          </span>
        </SpecRow>
        <SpecRow label="Headline" meta="32 / 1.1&#10;letter -0.018em">
          <span className="font-serif font-medium" style={{ fontSize: '32px', lineHeight: '1.1', letterSpacing: '-0.018em', color: 'var(--ink)' }}>
            Marcus K. · Further Maths
          </span>
        </SpecRow>
        <SpecRow label="Sub" meta="22 / 1.2">
          <span className="font-serif font-medium" style={{ fontSize: '22px', lineHeight: '1.2', color: 'var(--ink)' }}>
            Eight years preparing students for WAEC, SAT and A-Levels
          </span>
        </SpecRow>
        <SpecRow label="Name (row)" meta="17 / 1.15">
          <span className="font-serif font-medium" style={{ fontSize: '17px', lineHeight: '1.15', letterSpacing: '-0.012em', color: 'var(--ink)' }}>
            Aisha O.
          </span>
        </SpecRow>
        <SpecRow label="Italic · pull-quote" meta="22 / 1.4">
          <span className="font-serif italic" style={{ fontSize: '22px', lineHeight: '1.4', letterSpacing: '-0.012em', color: 'var(--ink)' }}>
            "I teach mathematics the way I wish I'd been taught — slowly, with the why before the how."
          </span>
        </SpecRow>
      </Specimen>

      {/* Inter */}
      <Specimen family="Inter · sans · for chrome &amp; body">
        <SpecRow label="Body" meta="14 / 1.65">
          <p className="font-sans text-[14px] leading-[1.65]" style={{ color: 'var(--ink-2)', margin: 0 }}>
            Marcus has been teaching A-Level Mathematics in Lekki for eight years. He prepares roughly fifteen
            students a year, with a focus on building intuition before drill — most of them go on to engineering
            or economics at Lagos, Ibadan, or abroad.
          </p>
        </SpecRow>
        <SpecRow label="Label" meta="11 / 0.14em&#10;uppercase 600">
          <span
            className="font-sans font-semibold uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ink-3)' }}
          >
            Identity verified · document on file
          </span>
        </SpecRow>
        <SpecRow label="Eyebrow" meta="10.5 / 0.22em&#10;uppercase 600">
          <span
            className="font-sans font-semibold uppercase"
            style={{ fontSize: '10.5px', letterSpacing: '0.22em', color: 'var(--ink-3)' }}
          >
            Step 2 of 3 · Confirm connection
          </span>
        </SpecRow>
        <SpecRow label="Button" meta="14 / 600">
          <span className="font-sans font-semibold" style={{ fontSize: '14px', letterSpacing: '-0.005em', color: 'var(--ink)' }}>
            Connect with Marcus — ₦2,500
          </span>
        </SpecRow>
        <SpecRow label="Caption" meta="12 / muted">
          <span className="font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>
            Lekki, Lagos · 12 km from your location
          </span>
        </SpecRow>
      </Specimen>

      {/* JetBrains Mono */}
      <Specimen family="JetBrains Mono · monospace · for figures">
        <SpecRow label="Price · large" meta="28 / tabular">
          <span className="font-mono font-medium" style={{ fontSize: '28px', color: 'var(--ink)', fontFeatureSettings: '"tnum" 1, "lnum" 1', letterSpacing: '-0.005em' }}>
            ₦12,000
            <span className="font-sans font-medium uppercase ml-1.5" style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'var(--ink-3)' }}>per hour</span>
          </span>
        </SpecRow>
        <SpecRow label="Price · row" meta="14 / tabular">
          <span className="font-mono font-medium" style={{ fontSize: '14px', color: 'var(--ink)', fontFeatureSettings: '"tnum" 1, "lnum" 1' }}>
            ₦8,500
          </span>
        </SpecRow>
        <SpecRow label="Profile no." meta="11 / 0">
          <span className="font-mono" style={{ fontSize: '11px', color: 'var(--ink-3)' }}>
            profile · 00142 · joined Mar 2024
          </span>
        </SpecRow>
      </Specimen>

      <SectionBreak label="Type doing work" />

      <div className="grid gap-9" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <blockquote
          className="m-0 font-serif italic"
          style={{
            fontSize: '22px',
            lineHeight: '1.4',
            color: 'var(--ink)',
            letterSpacing: '-0.012em',
            borderLeft: '2px solid var(--green-500)',
            paddingLeft: '18px',
          }}
        >
          "I never speak first about marks. I ask the student what they think the question is about. Most of them
          have never been asked that before."
        </blockquote>
        <div>
          <p className="font-sans text-[15px] leading-[1.7] mb-[14px]" style={{ color: 'var(--ink-2)', margin: '0 0 14px' }}>
            Marcus has been teaching A-Level Mathematics in Lekki for eight years. His students come up through
            King's College and Greensprings, and he sees roughly fifteen a year.
          </p>
          <p className="font-sans text-[15px] leading-[1.7]" style={{ color: 'var(--ink-2)', margin: 0 }}>
            He keeps a Sunday note on the site where he explains one problem from the week in plain language:{' '}
            <em>why it matters, where it shows up later, what a careful student would notice on first reading.</em>
          </p>
        </div>
      </div>
    </div>
  )
}
