import { useState } from 'react'
import { Button } from '@shared/ui/button'
import { Textarea } from '@shared/ui/input'
import { ModalOverlay, ModalShell, ModalHeader, ModalBody, ModalFooter } from '@shared/ui/modal'

const REASONS = [
  'This tutor asked me to pay outside Pracket',
  'This tutor shared contact details early',
  'I feel this tutor behaved unprofessionally',
  "This tutor's credentials seem incorrect",
  'I received no response after connecting',
  'Other concern',
] as const

interface ReportModalProps {
  readonly tutorName: string
  readonly onCancel?: () => void
  readonly onReport?: () => void
}

export function ReportModal({ tutorName, onCancel, onReport }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [details, setDetails] = useState('')

  return (
    <ModalOverlay onClose={onCancel}>
      <ModalShell maxWidth={580}>
        <ModalHeader
          eyebrow="Report a concern"
          eyebrowVariant="danger"
          title={`Report ${tutorName}`}
          sub="Tell us what happened. We review every report personally — usually within 24 hours."
        />

        <ModalBody>
          {/* Reason list */}
          <div style={{ display: 'grid', gap: '10px', margin: '8px 0 18px' }}>
            {REASONS.map((reason) => {
              const isSelected = selectedReason === reason
              return (
                <button
                  key={reason}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedReason(reason)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '14px 16px',
                    border: isSelected ? '1.5px solid var(--crit)' : '1px solid var(--hair)',
                    borderRadius: '12px',
                    textAlign: 'left',
                    background: isSelected ? 'var(--crit-bg, #FDF3F0)' : 'transparent',
                    color: isSelected ? 'var(--crit)' : 'var(--ink)',
                    cursor: 'pointer',
                    fontFamily: 'var(--serif)',
                    fontSize: '15px',
                    transition: 'border-color 120ms, background 120ms',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--sheet)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                    }
                  }}
                >
                  {reason}
                </button>
              )
            })}
          </div>

          {/* Details textarea */}
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--sans)',
              fontSize: '12px',
              color: 'var(--ink-3)',
              marginBottom: '8px',
            }}
          >
            More details (optional)
          </label>
          <Textarea
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Any additional context that might help our team."
            error={selectedReason !== null}
          />

          {/* What happens block */}
          <div
            style={{
              marginTop: '18px',
              background: '#EEF4FB',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '12px',
                color: 'var(--ink-3)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600,
                margin: '0 0 8px',
              }}
            >
              What happens next
            </p>
            <ul
              style={{
                margin: 0,
                padding: '0 0 0 18px',
                fontFamily: 'var(--sans)',
                fontSize: '13px',
                color: 'var(--ink-2)',
                lineHeight: 1.7,
              }}
            >
              <li>We review the report privately within 24 hours</li>
              <li>The tutor is not told who reported them</li>
              <li>{"If the concern is confirmed, the tutor's profile is suspended"}</li>
            </ul>
          </div>
        </ModalBody>

        <div style={{ borderTop: '1px solid var(--hair)', margin: '0 28px' }} />

        <ModalFooter note="If you are in immediate danger, call 112.">
          <Button variant="quiet" onClick={onCancel}>Cancel</Button>
          <Button variant="danger" onClick={onReport}>Report &amp; close</Button>
        </ModalFooter>
      </ModalShell>
    </ModalOverlay>
  )
}
