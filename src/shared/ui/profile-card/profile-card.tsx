import type { ReactNode } from 'react'

interface MetaItem {
  readonly label: string
  readonly value: string
}

export interface ProfileCardProps {
  readonly name: string
  readonly role: string
  readonly blurb: string
  readonly meta?: readonly MetaItem[]
  readonly children?: ReactNode
}

export function ProfileCard({ name, role, blurb, meta = [], children }: ProfileCardProps) {
  return (
    <div
      className="rounded-[24px]"
      style={{ background: 'var(--paper)', border: '1px solid var(--sheet-edge)', padding: '28px' }}
    >
      <span
        className="inline-flex items-center gap-2 rounded-full font-sans font-semibold uppercase"
        style={{ height: '24px', padding: '0 10px 0 8px', background: 'var(--green-100)', color: 'var(--green-800)', fontSize: '11px', letterSpacing: '0.06em' }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green-500)', display: 'inline-block' }} />
        Identity verified
      </span>
      <h2 className="font-sans font-semibold" style={{ fontSize: '22px', letterSpacing: '-0.018em', color: 'var(--ink)', margin: '14px 0 6px' }}>
        {name}
      </h2>
      <div className="font-sans text-[13px] mb-[18px]" style={{ color: 'var(--ink-3)' }}>{role}</div>
      <p className="font-sans text-[14px] leading-[1.65] mb-5" style={{ color: 'var(--ink-2)', margin: '0 0 20px' }}>
        {blurb}
      </p>
      {meta.length > 0 && (
        <div className="grid mb-[22px]" style={{ gridTemplateColumns: '1fr 1fr', gap: '12px 22px' }}>
          {meta.map((m) => (
            <div key={m.label}>
              <span
                className="block font-sans font-semibold uppercase mb-[3px]"
                style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ink-3)' }}
              >{m.label}</span>
              <span className="font-sans font-semibold" style={{ fontSize: '14px', color: 'var(--ink)' }}>{m.value}</span>
            </div>
          ))}
        </div>
      )}
      {children !== undefined && (
        <div className="flex flex-wrap gap-[10px]">{children}</div>
      )}
    </div>
  )
}
