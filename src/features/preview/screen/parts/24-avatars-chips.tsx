import { Avatar } from '@shared/ui/avatar'
import { Chip } from '@shared/ui/chip'
import { VerifiedCapsule } from '@shared/ui/credentials'
import { Scene } from './preview-canvas'

const SIZES = [
  { size: 'sm' as const, label: 'sm · 36' },
  { size: 'md' as const, label: 'md · 48' },
  { size: 'default' as const, label: 'default · 56' },
  { size: 'lg' as const, label: 'lg · 88' },
  { size: 'xl' as const, label: 'xl · 128' },
]

const MASKED = [
  { name: 'Marcus K.', sub: 'private name on file · "Marcus Kowalski"', tone: 'default' as const },
  { name: 'Aisha O.', sub: 'private name on file · "Aisha Okonkwo"', tone: 'sage' as const },
  { name: 'Tunde A.', sub: 'private name on file · "Babatunde Akinola"', tone: 'clay' as const },
]

export function AvatarsChipsPart() {
  return (
    <div>
      <div className="mb-9">
        <div className="font-mono uppercase mb-1 text-[11px]" style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
          24 / DATA &amp; STATE
        </div>
        <h1 className="font-serif font-medium" style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}>
          Avatars · chips · verified
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          The trust idiom
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        Avatars are warm-toned gradients with a hairline edge. They never carry a status dot or a
        checkmark badge — the{' '}
        <span className="inline-flex items-center gap-2 rounded-full font-sans font-semibold uppercase" style={{ height: '24px', padding: '0 10px 0 8px', background: 'var(--green-100)', color: 'var(--green-800)', fontSize: '11px', letterSpacing: '0.06em' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green-500)', display: 'inline-block' }} />
          verified
        </span>{' '}
        capsule does that work, separately, where it can be read.
      </p>

      <Scene label="Scene · avatars · sizes" title="Five sizes · one shape">
        <div className="flex items-end gap-[18px]">
          {SIZES.map(({ size, label }) => (
            <div key={size} className="text-center">
              <Avatar size={size} />
              <span className="block font-mono text-[11px] mt-2" style={{ color: 'var(--ink-3)' }}>{label}</span>
            </div>
          ))}
        </div>
      </Scene>

      <Scene
        label="Scene · avatars · tones"
        title="Four warm gradients · used to vary a stack"
        description="When eight tutors stack in a search result we want the page to feel populated, not uniform. Four neutral, warm tones do the rotation."
      >
        <div className="flex flex-wrap gap-3">
          {(['default', 'sage', 'sand', 'clay', 'bone'] as const).map((tone) => (
            <Avatar key={tone} tone={tone} />
          ))}
        </div>
      </Scene>

      <Scene
        label="Scene · the masked-username idiom"
        title="Public name · first + initial only"
        description="Pracket stores the full legal name privately. Publicly, only the first name and last initial appear — a small, deliberate signal that this is a person, not a transaction."
      >
        <div className="grid gap-[14px]" style={{ maxWidth: '540px' }}>
          {MASKED.map(({ name, sub, tone }) => (
            <div key={name} className="flex items-center gap-3">
              <Avatar size="sm" tone={tone} />
              <div>
                <div className="font-serif font-medium" style={{ fontSize: '17px', letterSpacing: '-0.012em', color: 'var(--ink)' }}>{name}</div>
                <div className="font-sans text-[12.5px] mt-0.5" style={{ color: 'var(--ink-3)' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </Scene>

      <Scene
        label="Scene · chips · the small palette"
        title="Four chip kinds"
        description="Sage (the friendly default), Sand (neutral facts), Paper (very quiet, only outline), Warn and Crit (state). Never colour-coded by topic."
      >
        <div className="flex flex-wrap gap-[10px] items-center">
          <Chip variant="sage" dot>Available this week</Chip>
          <Chip variant="sage">In-person + online</Chip>
          <Chip variant="sand">Cambridge alumnus</Chip>
          <Chip variant="sand">Speaks Yoruba</Chip>
          <Chip variant="paper">Joined Mar 2024</Chip>
          <Chip variant="warn" dot>Replies slowly</Chip>
          <Chip variant="crit" dot>Reported once</Chip>
        </div>
      </Scene>

      <Scene
        label="Scene · the verified capsule · the only trust mark"
        title="One trust mark. Repeated everywhere."
        description="Used on profiles, in conversation headers, on credentials, on documents. Always the same shape. Always the same words."
      >
        <div className="flex flex-wrap gap-[10px] items-center">
          <VerifiedCapsule>Identity verified</VerifiedCapsule>
          <VerifiedCapsule>Document on file</VerifiedCapsule>
          <VerifiedCapsule>Reference confirmed</VerifiedCapsule>
        </div>
        <p className="font-sans text-[12px] mt-[14px]" style={{ color: 'var(--ink-3)' }}>
          When a tutor's documents are still being checked, the equivalent reads <em>"Under review"</em> in warm amber — never as a half-finished verified.
        </p>
      </Scene>
    </div>
  )
}
