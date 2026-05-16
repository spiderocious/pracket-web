import { useNavigate } from 'react-router-dom'
import { Button } from '@shared/ui'
import { ROUTES } from '@shared/constants/routes'
import { ArrowRight, BookOpen } from '@shared/ui/icons'

export function SundayNotesSection() {
  const navigate = useNavigate()

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--paper-deep)', borderTop: '1px solid var(--hair)', borderBottom: '1px solid var(--hair)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 items-center">

          {/* Left: text */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border border-green-200 bg-green-50">
              <BookOpen style={{ width: 12, height: 12, color: 'var(--green-600)' }} />
              <span className="font-sans font-semibold text-[12px] text-green-800">Sunday Notes</span>
            </div>

            <h2
              className="font-serif font-semibold"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
                letterSpacing: '-0.022em',
                color: 'var(--ink)',
                lineHeight: 1.08,
              }}
            >
              Tutors who teach<br />
              <em className="italic" style={{ color: 'var(--green-700)' }}>also write.</em>
            </h2>

            <p
              className="font-sans leading-relaxed max-w-[360px]"
              style={{ fontSize: '15px', color: 'var(--ink-3)' }}
            >
              Tutors on Pracket share what they know — essays, tips, and teaching insights published every week.
            </p>

            <div>
              <Button
                variant="primary"
                onClick={() => navigate(ROUTES.DISCOVERY)}
                className="flex items-center gap-2"
              >
                Read the notes
                <ArrowRight style={{ width: 15, height: 15 }} />
              </Button>
            </div>
          </div>

          {/* Right: pull-quote card */}
          <div
            className="flex flex-col rounded-[24px] border border-hair overflow-hidden shadow-[0_8px_32px_-12px_rgba(31,35,28,0.14)]"
            style={{ background: 'var(--sheet)' }}
          >
            <div className="p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                  style={{ background: 'var(--paper-deep)' }}
                >
                  <img src="/landing/avatar-1.png" alt="Amara Okonkwo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-[13px]" style={{ color: 'var(--ink)' }}>
                    Amara Okonkwo
                  </p>
                  <p className="font-sans text-[12px]" style={{ color: 'var(--ink-4)' }}>
                    Mathematics · Verified tutor
                  </p>
                </div>
              </div>

              <h3
                className="font-serif font-semibold leading-snug"
                style={{ fontSize: '1.05rem', color: 'var(--ink)', letterSpacing: '-0.01em' }}
              >
                Why most students struggle with quadratics (and how I fixed it)
              </h3>

              <blockquote
                className="font-serif italic leading-relaxed pl-4"
                style={{ fontSize: '15px', color: 'var(--ink-2)', borderLeft: '3px solid var(--green-400)' }}
              >
                "The mistake isn't in the formula — it's in the picture students have in their heads. Once I started drawing the parabola first and asking them to guess where the roots should be, everything shifted."
              </blockquote>
            </div>

            <div className="w-full overflow-hidden" style={{ height: '180px', background: 'var(--paper-deep)' }}>
              <img
                src="/landing/notes-notebook.png"
                alt="An open notebook and cup of tea"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
