import { Link } from 'react-router-dom'
import { Logo } from '@shared/ui'
import { ROUTES } from '@shared/constants/routes'

interface FooterColProps {
  readonly heading: string
  readonly links: ReadonlyArray<{ readonly label: string; readonly to: string }>
}

function FooterCol({ heading, links }: FooterColProps) {
  return (
    <div className="flex flex-col gap-3">
      <p
        className="font-sans font-semibold"
        style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-4)' }}
      >
        {heading}
      </p>
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.to}
          className="font-sans text-[13px] transition-colors duration-[120ms] text-ink-3 hover:text-ink"
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}

export function LandingFooter() {
  return (
    <footer className="bg-paper border-t border-hair">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-10 sm:gap-20 mb-10">

          <div className="flex flex-col gap-3">
            <Logo size="md" />
            <p
              className="font-sans text-[13px] leading-relaxed"
              style={{ color: 'var(--ink-4)', maxWidth: '200px' }}
            >
              The trusted tutor marketplace in Nigeria.
            </p>
          </div>

          <FooterCol
            heading="Learn"
            links={[
              { label: 'Find tutors', to: ROUTES.DISCOVERY },
              { label: 'How it works', to: ROUTES.ROOT },
              { label: 'For tutors', to: ROUTES.TUTOR_ONBOARDING },
            ]}
          />

          <FooterCol
            heading="Account"
            links={[
              { label: 'Sign in', to: ROUTES.LOGIN },
              { label: 'Get started', to: ROUTES.REGISTER },
              { label: 'Teach on Pracket', to: ROUTES.REGISTER },
            ]}
          />
        </div>

        <div className="pt-6 border-t border-hair flex items-center justify-center">
          <p className="font-sans text-[12px]" style={{ color: 'var(--ink-4)' }}>
            &copy; 2026 Pracket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
