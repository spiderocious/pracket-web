import type { ReactNode } from 'react'

interface SectionProps {
  readonly title: string
  readonly description?: string
  readonly children: ReactNode
}

export function Section({ title, description, children }: SectionProps) {
  return (
    <div className="mb-[56px]">
      <div
        className="flex items-center gap-4 mb-6"
        style={{ borderBottom: '1px solid var(--hair)', paddingBottom: '18px' }}
      >
        <span
          className="font-mono"
          style={{ fontSize: '11px', color: 'var(--ink-3)' }}
        >
          ·
        </span>
        <h2
          className="font-serif font-medium"
          style={{ fontSize: '22px', letterSpacing: '-0.012em', color: 'var(--ink)', margin: 0 }}
        >
          {title}
        </h2>
      </div>
      {description !== undefined && description !== '' && (
        <p
          className="mb-6"
          style={{ fontSize: '13px', color: 'var(--ink-3)', maxWidth: '64ch', lineHeight: '1.6' }}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  )
}

interface SceneProps {
  readonly label: string
  readonly title: string
  readonly description?: string
  readonly children: ReactNode
}

export function Scene({ label, title, description, children }: SceneProps) {
  return (
    <div
      className="mb-[22px] rounded-[20px]"
      style={{
        background: 'var(--sheet)',
        border: '1px solid var(--sheet-edge)',
        padding: '30px 34px',
      }}
    >
      <div
        className="font-sans font-semibold uppercase mb-[14px]"
        style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'var(--ink-3)' }}
      >
        {label}
      </div>
      <h3
        className="font-serif font-medium mb-1"
        style={{ fontSize: '22px', letterSpacing: '-0.012em', color: 'var(--ink)', margin: '0 0 4px' }}
      >
        {title}
      </h3>
      {description !== undefined && description !== '' && (
        <p
          className="mb-[22px]"
          style={{ fontSize: '13px', color: 'var(--ink-3)', maxWidth: '60ch', lineHeight: '1.6' }}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  )
}

interface RefBlockProps {
  readonly title?: string
  readonly children: ReactNode
}

export function RefBlock({ title = 'Variants · sizes · states', children }: RefBlockProps) {
  return (
    <div
      className="rounded-[14px]"
      style={{
        background: 'var(--paper-deep)',
        border: '1px solid var(--hair)',
        padding: '22px',
      }}
    >
      <div
        className="font-sans font-semibold uppercase mb-3"
        style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ink-3)' }}
      >
        {title}
      </div>
      {children}
    </div>
  )
}

interface RefRowProps {
  readonly label: string
  readonly children: ReactNode
}

export function RefRow({ label, children }: RefRowProps) {
  return (
    <div
      className="grid gap-4 py-3 items-center"
      style={{
        gridTemplateColumns: '140px 1fr',
        borderBottom: '1px solid var(--hair-soft)',
      }}
    >
      <span className="font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
        {label}
      </span>
      <div className="flex flex-wrap gap-3 items-center">{children}</div>
    </div>
  )
}

interface SectionBreakProps {
  readonly label: string
}

export function SectionBreak({ label }: SectionBreakProps) {
  return (
    <div className="flex items-center gap-4 my-14">
      <span
        className="font-mono text-[11px]"
        style={{ color: 'var(--ink-3)', flexShrink: 0, width: '24px', height: '1px', background: 'var(--hair)', display: 'block' }}
      />
      <span className="font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
        {label}
      </span>
      <span style={{ flex: 1, height: '1px', background: 'var(--hair)' }} />
    </div>
  )
}
