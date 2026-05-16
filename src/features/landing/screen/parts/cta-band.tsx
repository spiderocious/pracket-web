import { useNavigate } from 'react-router-dom'
import { ArrowRight } from '@shared/ui/icons'
import { ROUTES } from '@shared/constants/routes'

export function CtaBand() {
  const navigate = useNavigate()

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--green-900)' }}
    >
      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-20"
        style={{ background: 'radial-gradient(ellipse, var(--green-400) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-20 sm:py-28 flex flex-col items-center text-center gap-7">

        <h2
          className="font-serif font-semibold"
          style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 3.75rem)',
            letterSpacing: '-0.026em',
            color: '#fff',
            lineHeight: 1.05,
            maxWidth: '680px',
          }}
        >
          Your best tutor is<br className="hidden sm:inline" /> already here.
        </h2>

        <p
          className="font-sans max-w-[380px] leading-relaxed"
          style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}
        >
          Join thousands of students learning with verified tutors on Pracket.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
          <button
            type="button"
            className="inline-flex items-center gap-2 font-sans font-semibold text-[15px] h-[52px] px-8 rounded-[14px] transition-[background,transform] duration-[120ms] hover:bg-[#f5f2eb] active:translate-y-px cursor-pointer border-0 shadow-[0_2px_12px_rgba(0,0,0,0.18)]"
            style={{ background: '#fff', color: 'var(--ink)' }}
            onClick={() => navigate(ROUTES.DISCOVERY)}
          >
            Find a tutor
            <ArrowRight style={{ width: 15, height: 15 }} />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 font-sans font-semibold text-[15px] h-[52px] px-8 rounded-[14px] border transition-[background,border-color] duration-[120ms] active:translate-y-px cursor-pointer hover:bg-white/10 hover:border-white/60"
            style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
            onClick={() => navigate(ROUTES.REGISTER)}
          >
            Teach on Pracket
          </button>
        </div>
      </div>
    </section>
  )
}
