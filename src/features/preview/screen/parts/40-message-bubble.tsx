import { MessageBubble, RedactedSpan } from '@shared/ui/message-bubble'
import { Scene } from './preview-canvas'

export function MessageBubblePart() {
  return (
    <div>
      <div className="mb-9">
        <div
          className="font-mono uppercase mb-1 text-[11px]"
          style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}
        >
          40 / MESSAGING
        </div>
        <h1
          className="font-serif font-medium"
          style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}
        >
          Message bubble
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          The unit of conversation · trust in every line
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        Messages are typeset in Fraunces, not Inter. The choice is deliberate — the conversation is
        closer to a letter than a form. Outgoing messages are green-tinted; incoming are
        white-sheet. Neither carries a read receipt.
      </p>

      <Scene
        label="Scene · message bubble · in-direction"
        title="Incoming · Marcus K."
        description="An incoming message from a tutor. White-sheet bubble, avatar placeholder, serif body text."
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <MessageBubble direction="in" meta="09:41">
            I teach mathematics the way I wish I&rsquo;d been taught — slowly, with the why before the how.
          </MessageBubble>
        </div>
      </Scene>

      <Scene
        label="Scene · message bubble · out-direction"
        title="Outgoing · parent"
        description="An outgoing message from the parent. Green-50 bubble, no avatar, margin-left auto."
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <MessageBubble direction="out" meta="09:43">
            That sounds exactly what we need. When are you available for an intro call?
          </MessageBubble>
        </div>
      </Scene>

      <Scene
        label="Scene · reply-quote"
        title="Incoming with reply context"
        description="An incoming bubble that quotes the previous message. The quote sits inside the bubble, left-bordered in green-500."
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <MessageBubble
            direction="in"
            replyQuote="When are you available for an intro call?"
            meta="09:44"
          >
            I&rsquo;m free Saturday morning, or any weekday after 4 pm.
          </MessageBubble>
        </div>
      </Scene>

      <Scene
        label="Scene · redacted span · contact guard"
        title="Contact masking in action"
        description="Phone numbers and email addresses are replaced with redacted spans before they reach the reader. The warn colour signals the interception without alarming."
      >
        <p
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '14.5px',
            lineHeight: '1.65',
            color: 'var(--ink-2)',
            margin: 0,
          }}
        >
          Call me on{' '}
          <RedactedSpan>0803 555 1234</RedactedSpan>
          {' '}or reach me at{' '}
          <RedactedSpan>marcus@gmail.com</RedactedSpan>
          {' '}— both ways work.
        </p>
      </Scene>
    </div>
  )
}
