import type { ReactNode } from 'react'

// --- VerifiedCapsule ---
export function VerifiedCapsule({ children = 'Identity verified' }: { children?: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full font-sans font-semibold uppercase"
      style={{ height: '24px', padding: '0 10px 0 8px', background: 'var(--green-100)', color: 'var(--green-800)', fontSize: '11px', letterSpacing: '0.06em' }}
    >
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green-500)', display: 'inline-block' }} />
      {children}
    </span>
  )
}

// --- UnderReviewChip ---
export function UnderReviewChip() {
  return (
    <span
      className="font-sans font-semibold uppercase rounded-full"
      style={{ fontSize: '11px', letterSpacing: '0.06em', color: 'var(--warn)', background: 'var(--warn-bg)', padding: '4px 10px', border: '1px solid var(--warn-edge)' }}
    >
      Under review
    </span>
  )
}

// --- CredentialRow ---
type CredStatus = 'verified' | 'review'

interface CredentialRowProps {
  readonly year: string
  readonly title: string
  readonly where: string
  readonly status: CredStatus
}

export function CredentialRow({ year, title, where, status }: CredentialRowProps) {
  return (
    <div
      className="grid items-center"
      style={{ gridTemplateColumns: '88px 1fr auto', gap: '22px', padding: '22px 24px', borderBottom: '1px solid var(--hair)' }}
    >
      <div className="font-mono text-[13px]" style={{ color: 'var(--ink-3)' }}>{year}</div>
      <div>
        <div className="font-serif font-medium" style={{ fontSize: '19px', letterSpacing: '-0.012em', lineHeight: '1.2', color: 'var(--ink)' }}>{title}</div>
        <div className="font-sans text-[12.5px] mt-1" style={{ color: 'var(--ink-3)', letterSpacing: '0.02em' }}>{where}</div>
      </div>
      {status === 'verified' ? <VerifiedCapsule /> : <UnderReviewChip />}
    </div>
  )
}

// --- CredentialList ---
interface CredentialListProps {
  readonly children: ReactNode
}

export function CredentialList({ children }: CredentialListProps) {
  return (
    <div
      className="grid rounded-[16px] overflow-hidden"
      style={{ background: 'var(--paper)', border: '1px solid var(--sheet-edge)', maxWidth: '720px' }}
    >
      {children}
    </div>
  )
}

// --- EvidenceRow ---
interface EvidenceRowProps {
  readonly name: string
  readonly sub: string
  readonly status: CredStatus
  readonly icon?: 'file' | 'id'
}

export function EvidenceRow({ name, sub, status, icon = 'file' }: EvidenceRowProps) {
  return (
    <div
      className="grid items-center rounded-[14px]"
      style={{ gridTemplateColumns: '40px 1fr auto', gap: '16px', background: 'var(--paper)', border: '1px solid var(--sheet-edge)', padding: '14px 18px' }}
    >
      {icon === 'id' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '26px', height: '26px', color: 'var(--ink-3)' }}>
          <circle cx="12" cy="9" r="3"/><path d="M5 21c0-3.5 3-6 7-6s7 2.5 7 6"/><rect x="3" y="3" width="18" height="18" rx="2"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: '26px', height: '26px', color: 'var(--ink-3)' }}>
          <path d="M5 4h11l3 3v13H5z"/><path d="M9 12h6M9 16h4"/>
        </svg>
      )}
      <div>
        <div className="font-serif font-medium" style={{ fontSize: '16px', letterSpacing: '-0.01em', color: 'var(--ink)' }}>{name}</div>
        <div className="font-sans text-[12px] mt-0.5" style={{ color: 'var(--ink-3)' }}>{sub}</div>
      </div>
      {status === 'verified' ? <VerifiedCapsule /> : <UnderReviewChip />}
    </div>
  )
}

// --- NoteCard ---
interface NoteCardProps {
  readonly date: string
  readonly title: string
  readonly children: ReactNode
  readonly moreCount?: number
}

export function NoteCard({ date, title, children, moreCount }: NoteCardProps) {
  return (
    <div
      className="rounded-[16px]"
      style={{ background: 'var(--paper)', border: '1px solid var(--sheet-edge)', padding: '24px 28px', maxWidth: '720px' }}
    >
      <div className="font-mono text-[11px] uppercase" style={{ color: 'var(--ink-3)', letterSpacing: '0.06em' }}>{date}</div>
      <h4 className="font-serif font-medium mt-1.5 mb-3" style={{ fontSize: '22px', letterSpacing: '-0.014em', color: 'var(--ink)', margin: '6px 0 12px', lineHeight: '1.2' }}>
        {title}
      </h4>
      <div className="font-serif italic" style={{ fontSize: '16px', lineHeight: '1.65', color: 'var(--ink-2)' }}>
        {children}
      </div>
      {moreCount !== undefined && (
        <div className="mt-[18px]">
          <button
            type="button"
            className="font-sans font-semibold border-0 bg-transparent cursor-pointer p-0"
            style={{ color: 'var(--green-700)', fontSize: '14px' }}
          >
            Read {moreCount} more notes →
          </button>
        </div>
      )}
    </div>
  )
}
