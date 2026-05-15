import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'link' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant
  readonly size?: ButtonSize
  readonly block?: boolean
  readonly children: ReactNode
}

const BASE =
  'inline-flex items-center gap-2 whitespace-nowrap font-sans font-semibold cursor-pointer border border-transparent bg-transparent transition-[background,border-color,color,transform] duration-[var(--t-quick)] ease-[var(--ease)] active:translate-y-px focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(59,183,94,0.28)]'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--green-500)] border-[var(--green-500)] text-white hover:bg-[var(--green-600)] hover:border-[var(--green-600)] active:bg-[var(--green-700)] active:border-[var(--green-700)]',
  secondary: 'bg-[var(--sheet)] border-[var(--sheet-edge-2)] text-[var(--ink)] hover:bg-[var(--paper-deep)] hover:border-[var(--ink-3)]',
  quiet: 'text-[var(--ink-2)] px-[14px] hover:bg-[rgba(31,35,28,0.05)] hover:text-[var(--ink)]',
  link: 'text-[var(--green-700)] p-0 h-auto bg-transparent hover:text-[var(--green-800)]',
  danger: 'bg-[var(--crit)] border-[var(--crit)] text-white hover:bg-[#8E2D20] hover:border-[#8E2D20]',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[13px] rounded-xl',
  md: 'h-11 px-[22px] text-[14px] rounded-[var(--r-card)]',
  lg: 'h-[52px] px-7 text-[15px] rounded-[18px]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    BASE,
    VARIANTS[variant],
    variant === 'link' ? '' : SIZES[size],
    block ? 'w-full justify-center' : '',
    rest.disabled ? 'opacity-45 cursor-not-allowed' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
