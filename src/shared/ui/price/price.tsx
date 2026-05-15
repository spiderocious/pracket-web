import type { ReactNode } from 'react'

// --- PriceBlock ---
type PriceSize = 'lg' | 'md' | 'sm'

interface PriceBlockProps {
  readonly amount: string
  readonly unit?: string
  readonly label?: string
  readonly sub?: string
  readonly size?: PriceSize
}

const PRICE_SIZES: Record<PriceSize, { fontSize: string; unitSize: string }> = {
  lg: { fontSize: '28px', unitSize: '11px' },
  md: { fontSize: '20px', unitSize: '11px' },
  sm: { fontSize: '14px', unitSize: '10px' },
}

export function PriceBlock({ amount, unit, label, sub, size = 'md' }: PriceBlockProps) {
  const { fontSize, unitSize } = PRICE_SIZES[size]
  return (
    <div>
      {label !== undefined && (
        <div className="font-sans font-semibold uppercase mb-1.5" style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ink-3)' }}>
          {label}
        </div>
      )}
      <div className="font-mono font-medium" style={{ fontSize, color: 'var(--ink)', fontFeatureSettings: '"tnum" 1, "lnum" 1' }}>
        {amount}
        {unit !== undefined && (
          <span className="font-sans font-medium uppercase ml-1.5" style={{ fontSize: unitSize, letterSpacing: '0.08em', color: 'var(--ink-3)' }}>
            {unit}
          </span>
        )}
      </div>
      {sub !== undefined && (
        <p className="font-sans text-[12px] mt-1.5" style={{ color: 'var(--ink-3)', margin: '6px 0 0' }}>{sub}</p>
      )}
    </div>
  )
}

// --- PriceRail ---
interface PriceRailItem {
  readonly label: string
  readonly amount: string
  readonly unit?: string
  readonly sub?: string
}

interface PriceRailProps {
  readonly items: readonly PriceRailItem[]
  readonly children?: ReactNode
}

export function PriceRail({ items, children }: PriceRailProps) {
  return (
    <div
      className="rounded-[18px]"
      style={{ background: 'var(--paper)', border: '1px solid var(--sheet-edge)', padding: '22px', maxWidth: '320px' }}
    >
      {items.map((item, i) => (
        <div
          key={item.label}
          style={i < items.length - 1 ? { paddingBottom: '18px', marginBottom: '18px', borderBottom: '1px solid var(--hair)' } : { paddingBottom: '18px', marginBottom: '18px', borderBottom: '1px solid var(--hair)' }}
        >
          <PriceBlock label={item.label} amount={item.amount} unit={item.unit} sub={item.sub} size="lg" />
        </div>
      ))}
      {children}
    </div>
  )
}

// --- Receipt ---
interface ReceiptRow {
  readonly label: string
  readonly amount: string
  readonly total?: boolean
}

interface ReceiptProps {
  readonly title: string
  readonly date: string
  readonly rows: readonly ReceiptRow[]
  readonly children?: ReactNode
}

export function Receipt({ title, date, rows, children }: ReceiptProps) {
  return (
    <div
      className="rounded-[18px]"
      style={{ background: 'var(--paper)', border: '1px solid var(--sheet-edge)', padding: '26px 28px', maxWidth: '480px' }}
    >
      <h4 className="font-serif font-medium" style={{ fontSize: '22px', letterSpacing: '-0.014em', color: 'var(--ink)', margin: '0 0 4px' }}>
        {title}
      </h4>
      <div className="font-sans text-[13px] mb-[22px]" style={{ color: 'var(--ink-3)' }}>{date}</div>
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex items-baseline justify-between py-[10px] text-[14px]"
          style={
            row.total
              ? { borderTop: '1px solid var(--ink)', marginTop: '8px', paddingTop: '16px', borderBottom: 0 }
              : { borderBottom: '1px solid var(--hair-soft)' }
          }
        >
          <span
            className={row.total ? 'font-serif font-medium' : ''}
            style={{ color: 'var(--ink-2)', fontSize: row.total ? '16px' : undefined }}
          >
            {row.label}
          </span>
          <span className="font-mono" style={{ fontFeatureSettings: '"tnum" 1', fontSize: row.total ? '18px' : undefined, fontWeight: row.total ? 500 : undefined }}>
            {row.amount}
          </span>
        </div>
      ))}
      {children !== undefined && (
        <div className="flex gap-[10px] mt-[22px]">{children}</div>
      )}
    </div>
  )
}
