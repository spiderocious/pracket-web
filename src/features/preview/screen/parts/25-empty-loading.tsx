import { Button } from '@shared/ui/button'
import { EmptyState, InlineError, SkeletonRow } from '@shared/ui/empty-loading'
import { Scene } from './preview-canvas'

export function EmptyLoadingPart() {
  return (
    <div>
      <div className="mb-9">
        <div className="font-mono uppercase mb-1 text-[11px]" style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
          25 / DATA &amp; STATE
        </div>
        <h1 className="font-serif font-medium" style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}>
          Empty · loading · error
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          The off-states · still calm
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        Most products treat empty / loading / error as afterthoughts. In Pracket they are scenes too —
        the parent reading "no tutors yet" is the parent we are most likely to lose. We write to them
        in plain language and offer one next step, not five.
      </p>

      <Scene
        label="Scene · loading · the search just submitted"
        title="Five row-shaped silhouettes"
        description={'A skeleton that matches the row\'s exact shape. No spinning wheels, no "Loading…" text. The page feels mid-step, not stalled.'}
      >
        <div className="grid gap-[10px]">
          <SkeletonRow name1Width="35%" name2Width="65%" />
          <SkeletonRow name1Width="28%" name2Width="72%" />
          <SkeletonRow name1Width="30%" name2Width="50%" />
        </div>
      </Scene>

      <Scene
        label="Scene · empty · no tutors yet"
        title={'"We don\'t have anyone teaching Yoruba in Calabar — yet."'}
        description="Empty is honest. We never invent fake results, we never tell the parent 'try widening your search' without an action attached."
      >
        <EmptyState
          title="No tutors for Yoruba in Calabar — yet"
          description="We have 27 Yoruba tutors elsewhere in Nigeria. You can open the search to all of Nigeria, or we'll let you know the moment a Yoruba tutor joins in Calabar."
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '64px', height: '64px' }}>
              <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
            </svg>
          }
        >
          <Button variant="primary">Search all of Nigeria</Button>
          <Button variant="secondary">Notify me when one joins</Button>
        </EmptyState>
      </Scene>

      <Scene
        label="Scene · empty · inbox · before the first connect"
        title="The parent's empty inbox"
        description="After they sign in but before they've connected with anyone. The empty state explains the rule of the room."
      >
        <EmptyState
          title="Your conversations will appear here"
          description="When you connect with a tutor, the conversation opens here. Contact information stays hidden — Pracket delivers every message until you both agree to share details."
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '64px', height: '64px' }}>
              <path d="M4 6h16v10H7l-3 3z"/>
            </svg>
          }
        >
          <Button variant="primary">Find a tutor</Button>
        </EmptyState>
      </Scene>

      <Scene
        label="Scene · error · payment failed"
        title="The connect-fee charge didn't go through"
        description="Errors are warm brick-red on cream — never alarming, always specific about what went wrong and what to do next."
      >
        <InlineError
          title="Your card was declined"
          description="Your bank turned the ₦2,500 connection fee away. You can try a different card, or pay with bank transfer."
        >
          <Button variant="secondary" size="sm">Try again</Button>
          <Button variant="primary" size="sm">Use transfer</Button>
        </InlineError>
      </Scene>
    </div>
  )
}
