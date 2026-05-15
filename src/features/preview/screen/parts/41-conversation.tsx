import { ConversationItem, SafetyBanner, MessageComposer } from '@shared/ui/conversation'
import { MessageBubble } from '@shared/ui/message-bubble'
import { Scene } from './preview-canvas'

export function ConversationPart() {
  return (
    <div>
      <div className="mb-9">
        <div
          className="font-mono uppercase mb-1 text-[11px]"
          style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}
        >
          41 / MESSAGING
        </div>
        <h1
          className="font-serif font-medium"
          style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}
        >
          Conversation
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          The thread that builds trust
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        The conversation screen is the heart of Pracket. A parent and tutor meet here before they
        ever share contact details. The layout is calm and linear — newest at the bottom, oldest above.
      </p>

      <div style={{ maxWidth: '720px' }}>
        <Scene
          label="Scene · inbox list · five conversations"
          title="Inbox · active threads"
          description="Five conversations at different states. Two are unread — their names are bolder and previews are ink-2."
        >
          <SafetyBanner />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ConversationItem
              name="Marcus K."
              preview="I'm free Saturday morning, or any weekday after 4 pm."
              time="09:44"
              unread={false}
            />
            <ConversationItem
              name="Aisha O."
              preview="Thank you for reaching out. I'd love to hear more about your child's current level."
              time="Yesterday"
              unread={true}
            />
            <ConversationItem
              name="Tunde A."
              preview="The connection fee confirms your interest to both sides."
              time="Mon"
              unread={false}
            />
            <ConversationItem
              name="Funke E."
              preview="Yes, I teach online too — we use Google Meet."
              time="Sun"
              unread={false}
            />
            <ConversationItem
              name="Chinedu O."
              preview="Let's schedule a free 15-minute intro call first."
              time="Fri"
              unread={true}
            />
          </div>
        </Scene>

        <Scene
          label="Scene · thread · Marcus K."
          title="Thread · Marcus K."
          description="A full exchange. The parent opens, Marcus responds with a reply-quote, the parent confirms. The composer sits at the bottom."
        >
          <SafetyBanner />
          <div style={{ display: 'flex', flexDirection: 'column', padding: '12px 0' }}>
            <MessageBubble direction="in" meta="09:41">
              I teach mathematics the way I wish I&rsquo;d been taught — slowly, with the why before the how.
            </MessageBubble>
            <MessageBubble direction="out" meta="09:43">
              That sounds exactly what we need. When are you available for an intro call?
            </MessageBubble>
            <MessageBubble
              direction="in"
              replyQuote="When are you available for an intro call?"
              meta="09:44"
            >
              I&rsquo;m free Saturday morning, or any weekday after 4 pm.
            </MessageBubble>
            <MessageBubble direction="out" meta="09:45">
              Perfect. Let&rsquo;s do Saturday at 10 am.
            </MessageBubble>
          </div>
          <MessageComposer />
        </Scene>
      </div>
    </div>
  )
}
