import type { ReactNode } from 'react'

export type ChipVariant = 'sage' | 'sand' | 'paper' | 'warn' | 'crit'

const STYLES: Record<ChipVariant, { bg: string; color: string; border?: string }> = {
  sage: { bg: 'var(--green-100)', color: 'var(--green-800)' },
  sand: { bg: '#EFEAD8', color: '#5A4F2E' },
  paper: { bg: 'var(--sheet)', color: 'var(--ink-2)', border: 'var(--sheet-edge)' },
  warn: { bg: 'var(--warn-bg)', color: 'var(--warn)', border: 'var(--warn-edge)' },
  crit: { bg: 'var(--crit-bg)', color: 'var(--crit)', border: 'var(--crit-edge)' },
}

interface ChipProps {
  readonly variant?: ChipVariant
  readonly dot?: boolean
  readonly children: ReactNode
}

export function Chip({ variant = 'sage', dot = false, children }: ChipProps) {
  const s = STYLES[variant]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full font-sans font-semibold whitespace-nowrap"
      style={{
        height: '28px',
        padding: '0 12px',
        fontSize: '12px',
        letterSpacing: '0.02em',
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border ?? 'transparent'}`,
      }}
    >
      {dot && (
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', opacity: 0.8, flexShrink: 0 }} />
      )}
      {children}
    </span>
  )
}
