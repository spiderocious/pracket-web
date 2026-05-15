// ─── Icons ────────────────────────────────────────────────────────────────────

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 24, height: 24, color: 'var(--info)' }}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  )
}

function WarnIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 24, height: 24, color: 'var(--warn)' }}
    >
      <path d="M12 9v4M12 17h.01M3 17.5 12 3l9 14.5z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 16, height: 16 }}
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

// ─── Variant config ───────────────────────────────────────────────────────────

type BannerVariant = 'info' | 'warn'

const VARIANT_STYLES: Record<BannerVariant, { background: string; border: string }> = {
  info: { background: '#EEF4FB', border: '1px solid #C5D9EF' },
  warn: { background: 'var(--warn-bg, #FDF8EE)', border: '1px solid var(--warn-edge, #E8C96B)' },
}

// ─── Banner ───────────────────────────────────────────────────────────────────

interface BannerProps {
  readonly variant?: BannerVariant
  readonly title: string
  readonly sub?: string
  readonly onDismiss?: () => void
}

export function Banner({ variant = 'info', title, sub, onDismiss }: BannerProps) {
  const styles = VARIANT_STYLES[variant]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '24px 1fr auto',
        gap: '14px',
        alignItems: 'flex-start',
        padding: '14px 18px',
        borderRadius: '14px',
        background: styles.background,
        border: styles.border,
      }}
    >
      <div style={{ paddingTop: '1px' }}>
        {variant === 'info' ? <InfoIcon /> : <WarnIcon />}
      </div>

      <div>
        <div
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '15px',
            fontWeight: 500,
            letterSpacing: '-0.008em',
            color: 'var(--ink)',
            lineHeight: 1.25,
          }}
        >
          {title}
        </div>
        {sub !== undefined && sub !== '' && (
          <div
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '12.5px',
              color: 'var(--ink-3)',
              marginTop: '6px',
              lineHeight: 1.5,
            }}
          >
            {sub}
          </div>
        )}
      </div>

      {onDismiss !== undefined && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            background: 'transparent',
            border: 0,
            color: 'var(--ink-3)',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            width: '22px',
            height: '22px',
            alignSelf: 'center',
          }}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
}
