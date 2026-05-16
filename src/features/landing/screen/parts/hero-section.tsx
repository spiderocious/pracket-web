import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@shared/constants/routes'
import { ArrowRight } from '@shared/ui/icons'

export function HeroSection() {
  const navigate = useNavigate()

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--green-900)', minHeight: '92vh' }}
    >
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.035,
          mixBlendMode: 'overlay',
        }}
        aria-hidden="true"
      />

      {/* Top-left warm amber glow — behind where illustration will be */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '-10%',
          right: '-5%',
          width: '55%',
          height: '110%',
          background: 'radial-gradient(ellipse at 60% 40%, rgba(91,183,94,0.18) 0%, rgba(20,73,42,0.0) 65%)',
        }}
        aria-hidden="true"
      />
      {/* Bottom left faint glow for depth */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: '-20%',
          left: '-10%',
          width: '50%',
          height: '70%',
          background: 'radial-gradient(ellipse, rgba(46,163,81,0.1) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 w-full py-20 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-center">

          {/* Left: text — pinned to bottom */}
          <div className="flex flex-col gap-8 landing-hero-text order-last sm:order-first">

            {/* Overline */}
            <div className="inline-flex items-center gap-2 self-start">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--green-400)' }}
              />
              <span
                className="font-sans font-medium text-[12px] uppercase tracking-[0.18em]"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Verified tutors across Nigeria
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-serif font-semibold"
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.02,
                color: '#fff',
              }}
            >
              Find a tutor<br />
              who{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  color: 'var(--green-400)',
                }}
              >
                gets
              </em>{' '}
              it.
            </h1>

            {/* Sub-copy */}
            <p
              className="font-sans leading-relaxed max-w-[380px]"
              style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.58)' }}
            >
              Browse verified tutors, connect in minutes, start learning.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Primary — white fill */}
              <button
                type="button"
                onClick={() => navigate(ROUTES.DISCOVERY)}
                className="inline-flex items-center gap-2 font-sans font-semibold text-[15px] h-[52px] px-7 rounded-[14px] transition-[background,transform] duration-[140ms] hover:bg-[#f0ede6] active:translate-y-px cursor-pointer border-0"
                style={{ background: '#fff', color: 'var(--ink)' }}
              >
                Find a tutor
                <ArrowRight style={{ width: 16, height: 16 }} />
              </button>
              {/* Secondary — ghost */}
              <button
                type="button"
                onClick={() => navigate(ROUTES.REGISTER)}
                className="inline-flex items-center gap-2 font-sans font-semibold text-[15px] h-[52px] px-7 rounded-[14px] border transition-[background,border-color] duration-[140ms] hover:bg-white/10 hover:border-white/50 active:translate-y-px cursor-pointer"
                style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.28)' }}
              >
                Teach on Pracket
              </button>
            </div>

            {/* Trust micro-stats */}
            <div className="flex items-center gap-4 flex-wrap">
              {['500+ tutors', 'All subjects', 'Online & in-person'].map((stat, i) => (
                <span key={stat} className="inline-flex items-center gap-4">
                  {i > 0 && (
                    <span
                      className="w-px h-3 flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.2)' }}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className="font-sans font-medium text-[13px]"
                    style={{ color: 'rgba(255,255,255,0.42)' }}
                  >
                    {stat}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Right: illustration — flush to bottom, slightly cropped */}
          <div
            className="order-first sm:order-last flex justify-center sm:justify-end items-end landing-hero-image"
          >
            <div
              className="relative w-full max-w-[480px]"
              style={{ aspectRatio: '1/1' }}
            >
              {/* Warm amber spotlight glow under the image */}
              <div
                className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] rounded-full"
                style={{
                  background: 'radial-gradient(ellipse, rgba(91,183,94,0.22) 0%, transparent 70%)',
                  filter: 'blur(24px)',
                  zIndex: 0,
                }}
                aria-hidden="true"
              />
              <img
                src="/landing/hero-study.png"
                alt="A student studying in a warm cozy room"
                className="relative w-full h-full object-contain"
                style={{ zIndex: 1, filter: 'drop-shadow(0 32px 48px rgba(0,0,0,0.45))' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
