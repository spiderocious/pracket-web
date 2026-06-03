import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'

export type InputSize = 'sm' | 'md' | 'lg'

const BASE = 'font-sans bg-sheet border border-sheet-edge-2 text-ink outline-none w-full transition-[border-color,box-shadow] duration-quick ease-[var(--ease)] placeholder:text-ink-4 focus:border-green-500 focus:shadow-[0_0_0_3px_rgba(59,183,94,0.18)] disabled:opacity-55 disabled:bg-paper-deep'

const SIZES: Record<InputSize, string> = {
  sm: 'h-9 px-3 text-[13px] rounded-[10px]',
  md: 'h-12 px-4 text-[14px] rounded-[14px]',
  lg: 'h-14 px-5 text-[15px] rounded-[16px]',
}

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  readonly size?: InputSize
  readonly mono?: boolean
  readonly error?: boolean
}

export function Input({ size = 'md', mono = false, error = false, className, ...rest }: InputProps) {
  const classes = [
    BASE,
    SIZES[size],
    mono ? 'font-mono' : '',
    error ? 'border-crit shadow-[0_0_0_3px_rgba(178,58,42,0.14)]' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return <input className={classes} {...rest} />
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly error?: boolean
}

export function Textarea({ error = false, className, ...rest }: TextareaProps) {
  const classes = [
    BASE,
    'px-4 py-[14px] rounded-[14px] text-[14px] leading-[1.55] resize-y',
    error ? 'border-crit shadow-[0_0_0_3px_rgba(178,58,42,0.14)]' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return <textarea className={classes} {...rest} />
}

interface FieldProps {
  readonly label: string
  readonly help?: string
  readonly error?: string
  readonly children: ReactNode
}

export function Field({ label, help, error, children }: FieldProps) {
  return (
    <div className="grid gap-2">
      <span
        className="font-sans font-semibold uppercase"
        style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ink-3)' }}
      >
        {label}
      </span>
      {children}
      {error !== undefined && error !== '' && (
        <span className="font-sans text-[12px]" style={{ color: 'var(--crit)' }}>{error}</span>
      )}
      {help !== undefined && help !== '' && error === undefined && (
        <span className="font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>{help}</span>
      )}
    </div>
  )
}
