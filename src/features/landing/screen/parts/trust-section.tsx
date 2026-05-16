import { Shield, Users, CheckCircle } from '@shared/ui/icons'
import type { ReactNode } from 'react'

interface TrustCardProps {
  readonly icon: ReactNode
  readonly title: string
  readonly description: string
}

function TrustCard({ icon, title, description }: TrustCardProps) {
  return (
    <div
      className="flex flex-col gap-4 rounded-[20px] p-6 border border-green-200 landing-fade-up"
      style={{ background: 'var(--green-50)' }}
    >
      <div
        className="w-11 h-11 rounded-[12px] flex items-center justify-center flex-shrink-0"
        style={{ background: 'var(--green-500)', color: '#fff' }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3
          className="font-sans font-semibold"
          style={{ fontSize: '15px', color: 'var(--ink)' }}
        >
          {title}
        </h3>
        <p
          className="font-sans leading-snug"
          style={{ fontSize: '13px', color: 'var(--ink-3)' }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

function IdCardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <circle cx="8" cy="12" r="2.5" />
      <line x1="13" y1="10" x2="19" y2="10" />
      <line x1="13" y1="14" x2="17" y2="14" />
    </svg>
  )
}

export function TrustSection() {
  return (
    <section style={{ background: 'var(--paper)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-20">

        <div className="text-center mb-10 sm:mb-14">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-200 bg-green-50 mb-5"
          >
            <CheckCircle style={{ width: 13, height: 13, color: 'var(--green-600)' }} />
            <span className="font-sans font-semibold text-[12px] text-green-800">Trust &amp; safety</span>
          </div>
          <h2
            className="font-serif font-semibold mx-auto"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              maxWidth: '520px',
              lineHeight: 1.1,
            }}
          >
            Every tutor is reviewed<br className="hidden sm:inline" /> by our team.
          </h2>
          <p
            className="font-sans mt-3 mx-auto"
            style={{ fontSize: '15px', color: 'var(--ink-3)', maxWidth: '400px' }}
          >
            We check credentials, identity, and references before any tutor goes live.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TrustCard
            icon={<Shield size={18} />}
            title="Degree verified"
            description="We check academic credentials before anyone goes live."
          />
          <TrustCard
            icon={<IdCardIcon />}
            title="ID confirmed"
            description="Government ID verification for every tutor."
          />
          <TrustCard
            icon={<Users size={18} />}
            title="Reference checked"
            description="Professional references reviewed by our admin team."
          />
        </div>
      </div>
    </section>
  )
}
