export type AvatarSize = 'sm' | 'md' | 'default' | 'lg' | 'xl'
export type AvatarTone = 'default' | 'sage' | 'sand' | 'clay' | 'bone'
export type AvatarShape = 'circle' | 'square'

const SIZES: Record<AvatarSize, number> = {
  sm: 36,
  md: 48,
  default: 56,
  lg: 88,
  xl: 128,
}

const BG: Record<AvatarTone, string> = {
  default: 'linear-gradient(135deg, #D9C9A9, #B59F76)',
  sage: 'linear-gradient(135deg, #BFD5C5, #8FB39C)',
  sand: 'linear-gradient(135deg, #E8DEC4, #C8B990)',
  clay: 'linear-gradient(135deg, #D9BFB2, #B8907C)',
  bone: 'linear-gradient(135deg, #E5E0D4, #C8C0B0)',
}

const BORDER: Record<AvatarTone, string> = {
  default: '#C2B69B',
  sage: '#A8C2B2',
  sand: '#C0AF80',
  clay: '#B08070',
  bone: '#C0B8A8',
}

interface AvatarProps {
  readonly size?: AvatarSize
  readonly tone?: AvatarTone
  readonly shape?: AvatarShape
  readonly src?: string
  readonly alt?: string
}

export function Avatar({ size = 'default', tone = 'default', shape = 'circle', src, alt }: AvatarProps) {
  const px = SIZES[size]
  const radius = shape === 'square' ? '14px' : '50%'

  if (src !== undefined) {
    return (
      <img
        src={src}
        alt={alt ?? ''}
        style={{ width: `${px}px`, height: `${px}px`, borderRadius: radius, objectFit: 'cover', border: `1px solid ${BORDER[tone]}`, flexShrink: 0 }}
      />
    )
  }

  return (
    <div
      style={{
        width: `${px}px`,
        height: `${px}px`,
        borderRadius: radius,
        background: BG[tone],
        border: `1px solid ${BORDER[tone]}`,
        flexShrink: 0,
      }}
    />
  )
}
