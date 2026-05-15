type AvatarTone = 'default' | 'sage' | 'sand' | 'clay' | 'bone'

const AVATAR_BG: Record<AvatarTone, string> = {
  default: 'linear-gradient(135deg, #D9C9A9, #B59F76)',
  sage: 'linear-gradient(135deg, #BFD5C5, #8FB39C)',
  sand: 'linear-gradient(135deg, #E8DEC4, #C8B990)',
  clay: 'linear-gradient(135deg, #D9BFB2, #B8907C)',
  bone: 'linear-gradient(135deg, #E5E0D4, #C8C0B0)',
}

const AVATAR_BORDER: Record<AvatarTone, string> = {
  default: '#C2B69B',
  sage: '#A8C2B2',
  sand: '#C0AF80',
  clay: '#B08070',
  bone: '#C0B8A8',
}

export interface ListRowData {
  readonly name: string
  readonly meta: string
  readonly price: string
  readonly tone?: AvatarTone
}

type ListRowState = 'default' | 'hover' | 'active'

interface ListRowProps {
  readonly data: ListRowData
  readonly state?: ListRowState
  readonly onClick?: () => void
}

export function ListRow({ data, state = 'default', onClick }: ListRowProps) {
  const tone = data.tone ?? 'default'

  const borderColor =
    state === 'active' ? 'var(--green-500)' :
    state === 'hover' ? 'var(--ink-3)' :
    'var(--sheet-edge)'

  return (
    <button
      type="button"
      onClick={onClick}
      className="grid items-center w-full text-left rounded-[14px] border bg-sheet transition-[border-color,transform] duration-quick ease-[var(--ease)] cursor-pointer hover:border-ink-3"
      style={{
        gridTemplateColumns: '44px 1fr auto',
        gap: '14px',
        padding: '14px 18px',
        borderColor,
        transform: state === 'hover' ? 'translateY(-2px)' : 'none',
      }}
    >
      <div
        className="rounded-full flex-shrink-0"
        style={{
          width: '36px',
          height: '36px',
          background: AVATAR_BG[tone],
          border: `1px solid ${AVATAR_BORDER[tone]}`,
        }}
      />
      <div>
        <div className="font-serif font-medium" style={{ fontSize: '17px', letterSpacing: '-0.012em', color: 'var(--ink)', lineHeight: '1.15' }}>
          {data.name}
        </div>
        <div className="font-sans text-[12.5px] mt-[3px]" style={{ color: 'var(--ink-3)' }}>
          {data.meta}
        </div>
      </div>
      <div className="text-right">
        <div className="font-mono font-medium" style={{ fontSize: '14px', color: 'var(--ink)', fontFeatureSettings: '"tnum" 1' }}>
          {data.price}
        </div>
        <div className="font-sans text-[11px] mt-[1px] uppercase" style={{ color: 'var(--ink-3)', letterSpacing: '0.08em' }}>
          per hour
        </div>
      </div>
    </button>
  )
}
