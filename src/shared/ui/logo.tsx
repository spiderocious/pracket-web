interface LogoProps {
  readonly size?: 'sm' | 'md' | 'lg'
  readonly variant?: 'dark' | 'light'
}

export function Logo({ size = 'md', variant = 'dark' }: LogoProps) {
  const markSize = size === 'sm' ? 20 : size === 'lg' ? 34 : 26
  const fontSize = size === 'sm' ? '15px' : size === 'lg' ? '24px' : '18px'
  const wordColor = variant === 'light' ? '#fff' : 'var(--ink)'

  return (
    <span className="inline-flex items-center gap-[7px] select-none">
      <svg width={markSize} height={markSize} viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <line x1="6" y1="5" x2="6" y2="23" stroke="var(--green-600)" strokeWidth="2.6" strokeLinecap="round" />
        <path
          d="M6 6 C6 6 10 4 16 4 C21 4 25 7.5 25 12 C25 16.5 21 20 16 20 L6 20"
          stroke="var(--green-500)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M6 12 C6 12 9 10 14 10 C17.5 10 20 11.5 20 14 C20 16.5 17.5 18 14 18 L6 18"
          stroke="var(--green-400)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span
        className="font-serif font-medium"
        style={{ fontSize, letterSpacing: '-0.022em', color: wordColor, lineHeight: 1 }}
      >
        Pracket
      </span>
    </span>
  )
}
