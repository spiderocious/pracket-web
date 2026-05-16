import { Search, MessageSquare, GraduationCap } from '@shared/ui/icons'
import type { ReactNode } from 'react'

interface Step {
  readonly number: number
  readonly icon: ReactNode
  readonly title: string
  readonly description: string
}

const STEPS: readonly Step[] = [
  {
    number: 1,
    icon: <Search style={{ width: 18, height: 18 }} />,
    title: 'Browse',
    description: 'Explore verified tutors by subject, level, or location.',
  },
  {
    number: 2,
    icon: <MessageSquare style={{ width: 18, height: 18 }} />,
    title: 'Connect',
    description: 'Pay a small connection fee and open a direct conversation.',
  },
  {
    number: 3,
    icon: <GraduationCap style={{ width: 18, height: 18 }} />,
    title: 'Learn',
    description: 'Schedule sessions and start making real progress.',
  },
]

export function HowItWorksSection() {
  return (
    <section style={{ background: 'var(--green-900)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-18">

        <p
          className="font-sans font-semibold text-center mb-10 sm:mb-12"
          style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}
        >
          How it works
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 relative">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="relative flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-5 sm:gap-5 px-0 sm:px-10 pb-10 sm:pb-0 last:pb-0"
            >
              {/* Vertical divider desktop */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden sm:block absolute right-0 top-6 bottom-6 w-px"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                  aria-hidden="true"
                />
              )}
              {/* Horizontal divider mobile */}
              {i < STEPS.length - 1 && (
                <div
                  className="sm:hidden absolute left-5 bottom-0 right-0 h-px"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                  aria-hidden="true"
                />
              )}

              {/* Icon circle */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'var(--green-600)', color: '#fff' }}
              >
                {step.icon}
              </div>

              <div className="flex flex-col gap-2">
                <h3
                  className="font-serif font-semibold"
                  style={{ fontSize: '1.2rem', color: '#fff', letterSpacing: '-0.014em' }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-sans leading-snug"
                  style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)' }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
