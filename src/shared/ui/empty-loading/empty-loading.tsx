import type { ReactNode } from 'react'

// --- SkeletonRow ---
interface SkeletonRowProps {
  readonly name1Width?: string
  readonly name2Width?: string
}

export function SkeletonRow({ name1Width = '35%', name2Width = '65%' }: SkeletonRowProps) {
  return (
    <div
      className="grid items-center rounded-[14px]"
      style={{
        gridTemplateColumns: '44px 1fr 80px',
        gap: '14px',
        background: 'var(--paper)',
        border: '1px solid var(--sheet-edge)',
        padding: '14px 18px',
      }}
    >
      <style>{`
        @keyframes sk-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .sk-shimmer { background: linear-gradient(90deg, var(--paper-deep), var(--hair), var(--paper-deep)); background-size: 200% 100%; animation: sk-shimmer 1800ms linear infinite; border-radius: 8px; }
      `}</style>
      <div className="sk-shimmer rounded-full" style={{ width: '44px', height: '44px', borderRadius: '50%' }} />
      <div className="grid gap-2">
        <div className="sk-shimmer" style={{ height: '12px', width: name1Width }} />
        <div className="sk-shimmer" style={{ height: '12px', width: name2Width }} />
      </div>
      <div className="sk-shimmer" style={{ height: '14px', width: '80px' }} />
    </div>
  )
}

// --- EmptyState ---
interface EmptyStateProps {
  readonly icon?: ReactNode
  readonly title: string
  readonly description: string
  readonly children?: ReactNode
}

export function EmptyState({ icon, title, description, children }: EmptyStateProps) {
  return (
    <div
      className="text-center rounded-[18px]"
      style={{ background: 'var(--paper)', border: '1px solid var(--sheet-edge)', padding: '56px 40px' }}
    >
      {icon !== undefined && (
        <div style={{ width: '64px', height: '64px', color: 'var(--ink-3)', margin: '0 auto 18px', display: 'block' }}>
          {icon}
        </div>
      )}
      <h4 className="font-serif font-medium mb-[10px]" style={{ fontSize: '26px', letterSpacing: '-0.018em', color: 'var(--ink)', margin: '0 0 10px' }}>
        {title}
      </h4>
      <p className="font-sans text-[14px] leading-[1.65] mb-6" style={{ color: 'var(--ink-3)', maxWidth: '44ch', margin: '0 auto 24px' }}>
        {description}
      </p>
      {children !== undefined && (
        <div className="flex gap-[10px] justify-center">{children}</div>
      )}
    </div>
  )
}

// --- InlineError ---
interface InlineErrorProps {
  readonly title: string
  readonly description: string
  readonly children?: ReactNode
}

export function InlineError({ title, description, children }: InlineErrorProps) {
  return (
    <div
      className="grid items-center rounded-[14px]"
      style={{
        gridTemplateColumns: '36px 1fr auto',
        gap: '16px',
        background: 'var(--crit-bg)',
        border: '1px solid var(--crit-edge)',
        padding: '18px 22px',
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '26px', height: '26px', color: 'var(--crit)' }}>
        <circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>
      </svg>
      <div>
        <div className="font-serif font-medium" style={{ fontSize: '17px', letterSpacing: '-0.01em', color: 'var(--ink)' }}>{title}</div>
        <div className="font-sans text-[13px] mt-[3px] leading-[1.5]" style={{ color: 'var(--crit)' }}>{description}</div>
      </div>
      {children !== undefined && (
        <div className="flex gap-2">{children}</div>
      )}
    </div>
  )
}
