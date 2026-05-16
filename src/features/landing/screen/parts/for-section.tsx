import { useNavigate } from 'react-router-dom'
import { Button } from '@shared/ui'
import { ROUTES } from '@shared/constants/routes'
import { CheckCircle, ArrowRight } from '@shared/ui/icons'

interface BulletItem {
  readonly text: string
}

interface ForCardProps {
  readonly variant: 'student' | 'tutor'
  readonly bullets: readonly BulletItem[]
  readonly ctaLabel: string
  readonly onCta: () => void
}

function ForCard({ variant, bullets, ctaLabel, onCta }: ForCardProps) {
  const isTutor = variant === 'tutor'

  return (
    <div
      className="flex flex-col gap-7 rounded-[24px] p-8 sm:p-10"
      style={isTutor
        ? { background: 'var(--green-900)', border: 'none' }
        : { background: 'var(--sheet)', border: '1.5px solid var(--sheet-edge-2)' }
      }
    >
      <div>
        <p
          className="font-sans font-semibold mb-2"
          style={{
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: isTutor ? 'var(--green-400)' : 'var(--green-600)',
          }}
        >
          {isTutor ? 'For tutors' : 'For students'}
        </p>
        <h2
          className="font-serif font-semibold"
          style={{
            fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: isTutor ? '#fff' : 'var(--ink)',
          }}
        >
          {isTutor ? 'Built for\nteaching.' : 'Built for\nlearning.'}
        </h2>
      </div>

      <ul className="flex flex-col gap-3.5">
        {bullets.map((b) => (
          <li key={b.text} className="flex items-start gap-3">
            <CheckCircle
              style={{
                width: 16,
                height: 16,
                flexShrink: 0,
                marginTop: 2,
                color: isTutor ? 'var(--green-400)' : 'var(--green-600)',
              }}
              aria-hidden="true"
            />
            <span
              className="font-sans text-[14px] leading-snug"
              style={{ color: isTutor ? 'rgba(255,255,255,0.75)' : 'var(--ink-2)' }}
            >
              {b.text}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-1">
        {isTutor ? (
          <button
            type="button"
            className="inline-flex items-center gap-2 font-sans font-semibold text-[14px] transition-opacity duration-[120ms] hover:opacity-75 cursor-pointer bg-transparent border-0 p-0"
            style={{ color: 'var(--green-300)' }}
            onClick={onCta}
          >
            {ctaLabel}
            <ArrowRight style={{ width: 15, height: 15 }} />
          </button>
        ) : (
          <Button variant="primary" onClick={onCta} className="flex items-center gap-2">
            {ctaLabel}
            <ArrowRight style={{ width: 15, height: 15 }} />
          </Button>
        )}
      </div>
    </div>
  )
}

const STUDENT_BULLETS: readonly BulletItem[] = [
  { text: 'Browse 500+ verified tutors' },
  { text: 'Filter by subject, level & format' },
  { text: 'Save favourites to your shortlist' },
  { text: 'Connect and chat directly' },
]

const TUTOR_BULLETS: readonly BulletItem[] = [
  { text: 'Get your credentials verified' },
  { text: 'Set your own rate and availability' },
  { text: 'Receive connection requests from students' },
  { text: 'Share insights via Sunday Notes' },
]

export function ForSection() {
  const navigate = useNavigate()

  return (
    <section style={{ background: 'var(--paper)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <ForCard
            variant="student"
            bullets={STUDENT_BULLETS}
            ctaLabel="Start for free"
            onCta={() => navigate(ROUTES.REGISTER)}
          />
          <ForCard
            variant="tutor"
            bullets={TUTOR_BULLETS}
            ctaLabel="Apply to teach"
            onCta={() => navigate(ROUTES.REGISTER)}
          />
        </div>
      </div>
    </section>
  )
}
