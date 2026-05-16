import { useNavigate } from 'react-router-dom'
import { Chip } from '@shared/ui'
import { ROUTES } from '@shared/constants/routes'
import { MapPin, ArrowRight } from '@shared/ui/icons'

interface SpotlightTutor {
  readonly name: string
  readonly avatarSrc: string
  readonly subjects: readonly string[]
  readonly rate: string
  readonly format: string
}

const TUTORS: readonly SpotlightTutor[] = [
  {
    name: 'Amara Okonkwo',
    avatarSrc: '/landing/avatar-1.png',
    subjects: ['Mathematics', 'Further Maths', 'Physics'],
    rate: '₦3,500/hr',
    format: 'Online',
  },
  {
    name: 'Tunde Adeyemi',
    avatarSrc: '/landing/avatar-2.png',
    subjects: ['English Language', 'Literature', 'Creative Writing'],
    rate: '₦2,800/hr',
    format: 'In-person & Online',
  },
  {
    name: 'Chisom Eze',
    avatarSrc: '/landing/avatar-3.png',
    subjects: ['Biology', 'Chemistry', 'Health Science'],
    rate: '₦3,000/hr',
    format: 'Online',
  },
]

interface TutorCardProps {
  readonly tutor: SpotlightTutor
  readonly onClick: () => void
}

function TutorCard({ tutor, onClick }: TutorCardProps) {
  return (
    <div
      className="landing-fade-up flex flex-col gap-4 rounded-[20px] border border-hair p-5 cursor-pointer transition-[box-shadow,transform] duration-[220ms] hover:shadow-[0_12px_32px_-12px_rgba(31,35,28,0.18)] hover:-translate-y-1"
      style={{ background: 'var(--sheet)' }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View ${tutor.name}'s profile`}
    >
      {/* Avatar + name row */}
      <div className="flex items-center gap-3">
        <div
          className="w-14 h-14 rounded-full flex-shrink-0 overflow-hidden"
          style={{ background: 'var(--paper-deep)' }}
        >
          <img
            src={tutor.avatarSrc}
            alt={tutor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <span
            className="font-sans font-semibold text-[14px] leading-tight truncate"
            style={{ color: 'var(--ink)' }}
          >
            {tutor.name}
          </span>
          <Chip variant="sage" dot>
            Verified
          </Chip>
        </div>
      </div>

      {/* Subjects */}
      <div className="flex flex-wrap gap-1.5">
        {tutor.subjects.map((s) => (
          <span
            key={s}
            className="font-sans text-[12px] font-medium px-2.5 py-1 rounded-full border border-hair"
            style={{ color: 'var(--ink-3)', background: 'var(--paper)' }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Rate + format */}
      <div className="flex items-center gap-4 pt-0.5">
        <span
          className="font-sans font-semibold text-[13px]"
          style={{ color: 'var(--ink)' }}
        >
          {tutor.rate}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={12} style={{ color: 'var(--ink-4)' }} aria-hidden="true" />
          <span
            className="font-sans text-[12px]"
            style={{ color: 'var(--ink-3)' }}
          >
            {tutor.format}
          </span>
        </span>
      </div>

      {/* Footer link */}
      <div
        className="flex items-center gap-1.5 font-sans font-semibold text-[13px] mt-auto pt-1 transition-colors duration-[120ms]"
        style={{ color: 'var(--green-700)' }}
      >
        View profile
        <ArrowRight size={13} aria-hidden="true" />
      </div>
    </div>
  )
}

export function TutorSpotlightSection() {
  const navigate = useNavigate()

  return (
    <section className="bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
        {/* Header */}
        <div className="mb-8 sm:mb-10 flex flex-col gap-1">
          <p
            className="font-sans font-semibold"
            style={{
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--ink-4)',
            }}
          >
            Featured tutors
          </p>
          <h2
            className="font-serif font-semibold"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              letterSpacing: '-0.018em',
              color: 'var(--ink)',
            }}
          >
            Meet some of our tutors
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TUTORS.map((tutor) => (
            <TutorCard
              key={tutor.name}
              tutor={tutor}
              onClick={() => navigate(ROUTES.DISCOVERY)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
