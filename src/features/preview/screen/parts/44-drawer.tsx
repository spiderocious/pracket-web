import { Scene } from './preview-canvas'

// ─── Static toast card for preview ───────────────────────────────────────────

interface StaticToastProps {
  readonly variant: 'default' | 'success' | 'warn' | 'crit'
  readonly title: string
  readonly sub?: string
}

const VARIANT_BG: Record<StaticToastProps['variant'], string> = {
  default: 'var(--sheet)',
  success: '#F2FBF5',
  warn: 'var(--warn-bg, #FDF8EE)',
  crit: 'var(--crit-bg, #FDF3F0)',
}

const VARIANT_BORDER: Record<StaticToastProps['variant'], string> = {
  default: 'var(--hair)',
  success: 'var(--green-200)',
  warn: 'var(--warn-edge)',
  crit: 'var(--crit-edge)',
}

const VARIANT_TITLE_COLOR: Record<StaticToastProps['variant'], string> = {
  default: 'var(--ink)',
  success: 'var(--green-900)',
  warn: 'var(--warn)',
  crit: 'var(--crit)',
}

function DefaultIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20, color: 'var(--ink-3)' }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  )
}

function SuccessIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20, color: 'var(--green-700)' }}>
      <path d="M20 7 9 18l-5-5" />
    </svg>
  )
}

function WarnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20, color: 'var(--warn)' }}>
      <path d="M12 9v4M12 17h.01M3 17.5 12 3l9 14.5z" />
    </svg>
  )
}

function CritIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20, color: 'var(--crit)' }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

function ToastIcon({ variant }: { readonly variant: StaticToastProps['variant'] }) {
  if (variant === 'success') return <SuccessIcon />
  if (variant === 'warn') return <WarnIcon />
  if (variant === 'crit') return <CritIcon />
  return <DefaultIcon />
}

function StaticToast({ variant, title, sub }: StaticToastProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '22px 1fr auto',
        gap: '12px',
        alignItems: 'flex-start',
        background: VARIANT_BG[variant],
        border: `1px solid ${VARIANT_BORDER[variant]}`,
        borderRadius: '14px',
        padding: '14px 16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
      }}
    >
      <div style={{ paddingTop: '1px' }}>
        <ToastIcon variant={variant} />
      </div>
      <div>
        <div
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '15px',
            fontWeight: 500,
            letterSpacing: '-0.008em',
            lineHeight: 1.25,
            color: VARIANT_TITLE_COLOR[variant],
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
              marginTop: '3px',
              lineHeight: 1.5,
            }}
          >
            {sub}
          </div>
        )}
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        style={{
          background: 'transparent',
          border: 0,
          color: 'var(--ink-3)',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignSelf: 'center',
        }}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

// ─── DrawerPart ───────────────────────────────────────────────────────────────

export function DrawerPart() {
  return (
    <div>
      <div className="mb-9">
        <div
          className="font-mono uppercase mb-1 text-[11px]"
          style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}
        >
          44 / FEEDBACK
        </div>
        <h1
          className="font-serif font-medium"
          style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}
        >
          Toast system
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          Imperative from anywhere
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        Toasts fire imperatively via <code>DrawerService.success(...)</code>,{' '}
        <code>DrawerService.warn(...)</code>, etc. They don&rsquo;t need a provider.{' '}
        <code>ToastHost</code> mounts once at the root.
      </p>

      <Scene
        label="Scene · toast · all variants"
        title="The four toast tones"
        description="Static preview of each variant. In production these appear bottom-right, auto-dismiss in 4 s."
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '380px',
          }}
        >
          <StaticToast
            variant="default"
            title="Marcus replied to your message"
            sub="09:44 · Further Mathematics"
          />
          <StaticToast
            variant="success"
            title="Connection confirmed"
            sub="Marcus K. can now see your messages."
          />
          <StaticToast
            variant="warn"
            title="Slow reply warning"
            sub="Marcus hasn't replied in 5 days."
          />
          <StaticToast
            variant="crit"
            title="Card declined"
            sub="Your ₦2,500 connection fee failed."
          />
        </div>
      </Scene>
    </div>
  )
}
