import type { ReactNode } from 'react'

interface MessageBubbleProps {
  readonly direction: 'in' | 'out'
  readonly children: ReactNode
  readonly meta?: string
  readonly replyQuote?: string
}

export function MessageBubble({ direction, children, meta, replyQuote }: MessageBubbleProps) {
  const isOut = direction === 'out'

  const wrapStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isOut ? 'row-reverse' : 'row',
    gap: '10px',
    marginBottom: '18px',
    marginLeft: isOut ? 'auto' : undefined,
    maxWidth: '78%',
    alignSelf: isOut ? 'flex-end' : 'flex-start',
  }

  const bubbleStyle: React.CSSProperties = isOut
    ? {
        background: 'var(--green-50)',
        border: '1px solid var(--green-200)',
        borderRadius: '18px 18px 4px 18px',
        padding: '12px 16px',
        fontFamily: 'var(--serif)',
        fontSize: '14.5px',
        lineHeight: '1.55',
        color: 'var(--ink)',
        maxWidth: '56ch',
      }
    : {
        background: 'var(--sheet)',
        border: '1px solid var(--hair)',
        borderRadius: '18px 18px 18px 4px',
        padding: '12px 16px',
        fontFamily: 'var(--serif)',
        fontSize: '14.5px',
        lineHeight: '1.55',
        color: 'var(--ink-2)',
        maxWidth: '56ch',
      }

  const replyStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--serif)',
    fontStyle: 'italic',
    fontSize: '13px',
    color: 'var(--ink-3)',
    padding: '8px 12px',
    borderLeft: '2px solid var(--green-500)',
    background: 'var(--paper)',
    borderRadius: '8px',
    marginBottom: '8px',
  }

  const metaStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--mono)',
    fontSize: '10.5px',
    color: 'var(--ink-3)',
    marginTop: '6px',
    textAlign: isOut ? 'right' : 'left',
  }

  const avatarStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'var(--sheet)',
    border: '1px solid var(--hair)',
    flexShrink: 0,
  }

  return (
    <div style={wrapStyle}>
      {!isOut && <div style={avatarStyle} />}
      <div>
        <div style={bubbleStyle}>
          {replyQuote !== undefined && replyQuote !== '' && (
            <span style={replyStyle}>{replyQuote}</span>
          )}
          {children}
        </div>
        {meta !== undefined && meta !== '' && (
          <span style={metaStyle}>{meta}</span>
        )}
      </div>
    </div>
  )
}

interface RedactedSpanProps {
  readonly children: ReactNode
}

export function RedactedSpan({ children }: RedactedSpanProps) {
  return (
    <span
      style={{
        display: 'inline',
        background: 'var(--warn-bg)',
        color: 'var(--warn)',
        border: '1px dashed var(--warn-edge)',
        borderRadius: '4px',
        padding: '1px 6px',
        fontFamily: 'var(--mono)',
        fontSize: '12px',
        letterSpacing: '0.06em',
      }}
    >
      {children}
    </span>
  )
}
