import { useState } from 'react'
import type { ReactNode } from 'react'
import { Button } from '@shared/ui/button'

// ─── ModalOverlay ────────────────────────────────────────────────────────────

interface ModalOverlayProps {
  readonly children: ReactNode
  readonly onClose?: () => void
}

export function ModalOverlay({ children, onClose }: ModalOverlayProps) {
  function handleBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose?.()
  }

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '20px',
      }}
    >
      {children}
    </div>
  )
}

// ─── ModalShell ──────────────────────────────────────────────────────────────

interface ModalShellProps {
  readonly children: ReactNode
  readonly maxWidth?: number
}

export function ModalShell({ children, maxWidth = 540 }: ModalShellProps) {
  return (
    <div
      style={{
        background: 'var(--paper)',
        borderRadius: '24px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
        maxWidth: `${maxWidth}px`,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

// ─── ModalHeader ─────────────────────────────────────────────────────────────

interface ModalHeaderProps {
  readonly eyebrow?: string
  readonly eyebrowVariant?: 'default' | 'danger'
  readonly title: string
  readonly sub?: string
}

export function ModalHeader({ eyebrow, eyebrowVariant = 'default', title, sub }: ModalHeaderProps) {
  return (
    <div style={{ padding: '28px 28px 0' }}>
      {eyebrow !== undefined && eyebrow !== '' && (
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: eyebrowVariant === 'danger' ? 'var(--crit)' : 'var(--ink-3)',
            marginBottom: '6px',
          }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        style={{
          fontFamily: 'var(--serif)',
          fontSize: '28px',
          letterSpacing: '-0.022em',
          color: 'var(--ink)',
          margin: '6px 0 0',
          fontWeight: 500,
          lineHeight: 1.18,
        }}
      >
        {title}
      </h2>
      {sub !== undefined && sub !== '' && (
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '14px',
            color: 'var(--ink-3)',
            marginTop: '8px',
            marginBottom: 0,
            lineHeight: 1.55,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  )
}

// ─── ModalBody ───────────────────────────────────────────────────────────────

interface ModalBodyProps {
  readonly children: ReactNode
}

export function ModalBody({ children }: ModalBodyProps) {
  return (
    <div style={{ padding: '20px 28px' }}>
      {children}
    </div>
  )
}

// ─── ModalFooter ─────────────────────────────────────────────────────────────

interface ModalFooterProps {
  readonly note?: string
  readonly children: ReactNode
}

export function ModalFooter({ note, children }: ModalFooterProps) {
  return (
    <div style={{ padding: '0 28px 28px' }}>
      {note !== undefined && note !== '' && (
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '12px',
            color: 'var(--ink-3)',
            marginBottom: '16px',
            marginTop: 0,
            lineHeight: 1.5,
          }}
        >
          {note}
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', justifyContent: 'flex-end' }}>
        {children}
      </div>
    </div>
  )
}

// ─── ConnectModal ─────────────────────────────────────────────────────────────

interface ConnectModalProps {
  readonly tutorName: string
  readonly subject: string
  readonly connectFee: number
  readonly sessionRate: number
  readonly onCancel?: () => void
  readonly onConnect?: () => void
}

const HAIR: React.CSSProperties = { borderBottom: '1px solid var(--hair)' }

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`
}

export function ConnectModal({
  tutorName,
  subject,
  connectFee,
  sessionRate,
  onCancel,
  onConnect,
}: ConnectModalProps) {
  const [acknowledged, setAcknowledged] = useState(false)

  const receiptRows: { label: string; value: string; isTotal?: boolean }[] = [
    { label: 'Subject', value: subject },
    { label: 'Session rate', value: `${formatNaira(sessionRate)}/hr` },
    { label: 'Connection fee', value: formatNaira(connectFee) },
    { label: 'Total due today', value: formatNaira(connectFee), isTotal: true },
  ]

  return (
    <ModalOverlay onClose={onCancel}>
      <ModalShell maxWidth={540}>
        <ModalHeader
          eyebrow="Step 3 of 3 · Confirm connection"
          eyebrowVariant="default"
          title={`Connect with ${tutorName}`}
        />

        <ModalBody>
          <p
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '16px',
              fontStyle: 'italic',
              lineHeight: 1.6,
              color: 'var(--ink-2)',
              margin: '0 0 16px',
            }}
          >
            {`"Paying the connection fee opens this conversation and signals serious interest to ${tutorName}. The fee is non-refundable."`}
          </p>

          {/* Receipt grid */}
          <div
            style={{
              background: 'var(--sheet)',
              borderRadius: '12px',
              padding: '16px 20px',
              margin: '4px 0',
            }}
          >
            {receiptRows.map((row) => (
              <div
                key={row.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  padding: '10px 0',
                  borderTop: row.isTotal ? '1px solid var(--ink)' : undefined,
                  borderBottom: row.isTotal ? undefined : '1px solid var(--hair)',
                  marginTop: row.isTotal ? '8px' : undefined,
                  fontWeight: row.isTotal ? 600 : undefined,
                }}
              >
                <span
                  style={{
                    fontFamily: row.isTotal ? 'var(--serif)' : 'var(--sans)',
                    fontSize: row.isTotal ? '16px' : '14px',
                    color: row.isTotal ? 'var(--ink)' : 'var(--ink-3)',
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: row.isTotal ? '16px' : '14px',
                    color: 'var(--ink)',
                    fontFeatureSettings: '"tnum" 1',
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Acknowledge checkbox */}
          <label
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
              marginTop: '18px',
              padding: '14px 16px',
              background: 'var(--crit-bg)',
              border: '1px solid var(--crit-edge)',
              borderRadius: '12px',
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              style={{
                appearance: 'none',
                WebkitAppearance: 'none',
                width: '20px',
                height: '20px',
                border: `1.5px solid ${acknowledged ? 'var(--crit)' : 'var(--crit-edge)'}`,
                borderRadius: '6px',
                background: acknowledged ? 'var(--crit)' : '#fff',
                flexShrink: 0,
                cursor: 'pointer',
                marginTop: '1px',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '13px',
                color: 'var(--crit)',
                lineHeight: 1.55,
              }}
            >
              I understand this fee is non-refundable once the conversation opens.
            </span>
          </label>
        </ModalBody>

        <div style={{ ...HAIR, margin: '0 28px' }} />

        <ModalFooter note="Your card ending 4242 will be charged.">
          <Button variant="quiet" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" onClick={onConnect} disabled={!acknowledged}>
            {`Connect — ${formatNaira(connectFee)}`}
          </Button>
        </ModalFooter>
      </ModalShell>
    </ModalOverlay>
  )
}
