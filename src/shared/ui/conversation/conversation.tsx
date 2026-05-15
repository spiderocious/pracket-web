function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
}

interface ConversationItemProps {
  readonly name: string
  readonly preview: string
  readonly time: string
  readonly unread?: boolean
}

export function ConversationItem({ name, preview, time, unread = false }: ConversationItemProps) {
  const avatarStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'var(--sheet)',
    border: '1px solid var(--hair)',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--mono)',
    fontSize: '13px',
    color: 'var(--ink-3)',
  }

  const nameStyle: React.CSSProperties = {
    fontFamily: 'var(--serif)',
    fontSize: '16px',
    letterSpacing: '-0.01em',
    color: 'var(--ink)',
    fontWeight: unread ? 600 : 500,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  }

  const previewStyle: React.CSSProperties = {
    fontFamily: 'var(--sans)',
    fontSize: '13px',
    color: unread ? 'var(--ink-2)' : 'var(--ink-3)',
    marginTop: '3px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.4',
  }

  const timeStyle: React.CSSProperties = {
    fontFamily: 'var(--mono)',
    fontSize: '11px',
    color: unread ? 'var(--green-700, var(--green-500))' : 'var(--ink-3)',
    fontWeight: unread ? 500 : 400,
    alignSelf: 'start',
    marginTop: '2px',
  }

  const dotStyle: React.CSSProperties = {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--green-500)',
    display: 'inline-block',
    flexShrink: 0,
  }

  return (
    <button
      type="button"
      style={{
        display: 'grid',
        gridTemplateColumns: '40px 1fr auto',
        gap: '12px',
        alignItems: 'center',
        padding: '14px 20px',
        width: '100%',
        textAlign: 'left',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '14px',
        transition: 'background 120ms cubic-bezier(.4,0,.2,1)',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--sheet)' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
    >
      <div style={avatarStyle}>{initials(name)}</div>
      <div style={{ minWidth: 0 }}>
        <div style={nameStyle}>
          {name}
          {unread && <span style={dotStyle} />}
        </div>
        <div style={previewStyle}>{preview}</div>
      </div>
      <div style={timeStyle}>{time}</div>
    </button>
  )
}

interface SafetyBannerProps {
  readonly onHowItWorks?: () => void
}

export function SafetyBanner({ onHowItWorks }: SafetyBannerProps) {
  return (
    <div
      style={{
        background: '#EEF4FB',
        borderRadius: '12px',
        padding: '14px 18px',
        display: 'grid',
        gridTemplateColumns: '24px 1fr auto',
        gap: '14px',
        alignItems: 'center',
        marginBottom: '12px',
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--ink-3)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <path d="M12 2L3 6v6c0 5.25 3.75 10.05 9 11.25C17.25 22.05 21 17.25 21 12V6L12 2z" />
      </svg>
      <div>
        <div
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '14px',
            color: 'var(--ink)',
            fontWeight: 500,
            marginBottom: '2px',
          }}
        >
          Pracket keeps your contact details private
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: 'var(--ink-3)', lineHeight: '1.5' }}>
          Messages go through Pracket until both sides agree to share details.
        </div>
      </div>
      <button
        type="button"
        onClick={onHowItWorks}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--sans)',
          fontSize: '12px',
          color: 'var(--ink-3)',
          padding: '4px 0',
          whiteSpace: 'nowrap',
          textDecoration: 'none',
        }}
      >
        How it works →
      </button>
    </div>
  )
}

interface MessageComposerProps {
  readonly disabled?: boolean
}

export function MessageComposer({ disabled = false }: MessageComposerProps) {
  return (
    <div
      style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--hair)',
        background: 'var(--paper)',
      }}
    >
      {!disabled && (
        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '11px',
            color: 'var(--ink-3)',
            fontStyle: 'italic',
            marginBottom: '10px',
          }}
        >
          Contact details shared outside Pracket violate our terms
        </div>
      )}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
        <textarea
          rows={3}
          disabled={disabled}
          placeholder="Type a message…"
          style={{
            flex: 1,
            resize: 'none',
            background: 'var(--sheet)',
            border: '1px solid var(--hair)',
            borderRadius: '12px',
            padding: '10px 14px',
            fontFamily: 'var(--sans)',
            fontSize: '14px',
            color: 'var(--ink)',
            outline: 'none',
            width: '100%',
            lineHeight: '1.5',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--green-500)'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,183,94,0.18)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--hair)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
        <button
          type="button"
          disabled={disabled}
          style={{
            background: 'var(--green-500)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '8px 18px',
            fontFamily: 'var(--sans)',
            fontSize: '14px',
            fontWeight: 600,
            cursor: disabled ? 'default' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            flexShrink: 0,
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}
