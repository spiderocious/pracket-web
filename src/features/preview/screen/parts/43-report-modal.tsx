import { ReportModal } from '@shared/ui/report-modal'
import { Scene } from './preview-canvas'

export function ReportModalPart() {
  return (
    <div>
      <div className="mb-9">
        <div
          className="font-mono uppercase mb-1 text-[11px]"
          style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}
        >
          43 / MODALS
        </div>
        <h1
          className="font-serif font-medium"
          style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}
        >
          Report modal
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          When something goes wrong
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        The report modal is the safety valve. It must be easy to reach and calm to use — a parent
        who feels unsafe should not have to fight a form. The design is deliberately non-alarming.
      </p>

      <Scene
        label="Scene · report modal"
        title="When something goes wrong"
        description="A calm, form-driven modal for reporting tutor behaviour. Reason selection is required; details are optional."
      >
        <div
          style={{
            background: 'rgba(31,35,28,0.42)',
            borderRadius: '18px',
            padding: '40px 32px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minHeight: '600px',
          }}
        >
          <ReportModal tutorName="Marcus K." />
        </div>
      </Scene>
    </div>
  )
}
