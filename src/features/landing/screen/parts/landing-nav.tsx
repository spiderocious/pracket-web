import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '@shared/ui'
import { GraduationCap, BookOpen } from '@shared/ui/icons'
import { ROUTES } from '@shared/constants/routes'
import { ArrowRight } from '@shared/ui/icons'

export function LandingNav() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 60)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  const dark = !scrolled

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: scrolled ? 'var(--sheet)' : 'var(--green-900)',
        boxShadow: scrolled ? '0 1px 0 var(--sheet-edge), 0 4px 24px -8px rgba(31,35,28,0.12)' : '0 1px 0 rgba(255,255,255,0.08)',
        transition: 'background 280ms ease, box-shadow 280ms ease',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-[60px] flex items-center justify-between gap-6">

        {/* Logo */}
        <Link to={ROUTES.ROOT} className="flex-shrink-0 flex items-center">
          <Logo size="md" variant={dark ? 'light' : 'dark'} />
        </Link>

        {/* Right */}
        <div className="flex items-center gap-1">
          <Link
            to={ROUTES.TUTOR_ONBOARDING}
            className="hidden sm:inline-flex items-center gap-1.5 font-sans font-medium text-[13px] px-3 h-9 rounded-[10px] transition-colors duration-[120ms]"
            style={{ color: dark ? 'rgba(255,255,255,0.6)' : 'var(--ink-3)' }}
            onMouseEnter={e => (e.currentTarget.style.color = dark ? '#fff' : 'var(--ink)')}
            onMouseLeave={e => (e.currentTarget.style.color = dark ? 'rgba(255,255,255,0.6)' : 'var(--ink-3)')}
          >
            <GraduationCap style={{ width: 14, height: 14 }} />
            For tutors
          </Link>

          <div
            className="w-px h-4 mx-1 hidden sm:block"
            style={{ background: dark ? 'rgba(255,255,255,0.15)' : 'var(--hair)' }}
          />

          <button
            type="button"
            onClick={() => navigate(ROUTES.LOGIN)}
            className="inline-flex items-center gap-1.5 font-sans font-medium text-[13px] px-3 h-9 rounded-[10px] transition-colors duration-[120ms] border-0 cursor-pointer"
            style={{ background: 'transparent', color: dark ? 'rgba(255,255,255,0.65)' : 'var(--ink-2)' }}
            onMouseEnter={e => (e.currentTarget.style.color = dark ? '#fff' : 'var(--ink)')}
            onMouseLeave={e => (e.currentTarget.style.color = dark ? 'rgba(255,255,255,0.65)' : 'var(--ink-2)')}
          >
            <BookOpen style={{ width: 14, height: 14 }} />
            Sign in
          </button>

          {/* CTA — always visible, adapts color */}
          <button
            type="button"
            onClick={() => navigate(ROUTES.REGISTER)}
            className="inline-flex items-center gap-1.5 font-sans font-semibold text-[13px] h-9 px-4 rounded-[10px] border transition-[background,border-color,color] duration-[120ms] cursor-pointer"
            style={dark
              ? { background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.22)', color: '#fff' }
              : { background: 'var(--green-500)', borderColor: 'var(--green-500)', color: '#fff' }
            }
            onMouseEnter={e => {
              if (dark) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
              } else {
                e.currentTarget.style.background = 'var(--green-600)'
                e.currentTarget.style.borderColor = 'var(--green-600)'
              }
            }}
            onMouseLeave={e => {
              if (dark) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
              } else {
                e.currentTarget.style.background = 'var(--green-500)'
                e.currentTarget.style.borderColor = 'var(--green-500)'
              }
            }}
          >
            Get started
            <ArrowRight style={{ width: 13, height: 13 }} />
          </button>
        </div>
      </div>
    </nav>
  )
}
