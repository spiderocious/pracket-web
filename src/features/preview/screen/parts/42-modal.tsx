import { ConnectModal } from '@shared/ui/modal'
import { Scene } from './preview-canvas'

export function ModalPart() {
  return (
    <div>
      <div className="mb-9">
        <div
          className="font-mono uppercase mb-1 text-[11px]"
          style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}
        >
          42 / MODALS
        </div>
        <h1
          className="font-serif font-medium"
          style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}
        >
          Connect modal
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          The fee screen
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        The connect modal is the most important screen in Pracket. A parent pays ₦2,500 here. The
        design must be calm and trustworthy — not a dark-pattern checkout, not a celebration. Just
        clarity.
      </p>

      <Scene
        label="Scene · connect modal · the critical moment"
        title="The irreversible action"
        description="A confirm modal that earns the cost: the price is shown in the receipt, the acknowledge step requires an active tick, the action button states the consequence."
      >
        <div
          style={{
            background: 'rgba(31,35,28,0.42)',
            borderRadius: '18px',
            padding: '40px 32px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minHeight: '520px',
          }}
        >
          <ConnectModal
            tutorName="Marcus K."
            subject="Further Mathematics"
            connectFee={2500}
            sessionRate={12000}
          />
        </div>
      </Scene>
    </div>
  )
}
