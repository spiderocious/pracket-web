import type { InputHTMLAttributes, ReactNode } from 'react'

// --- Checkbox ---
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label?: ReactNode
  readonly description?: string
}

export function Checkbox({ label, description, className, ...rest }: CheckboxProps) {
  if (label !== undefined) {
    return (
      <label
        className={[
          'flex gap-[14px] items-start p-[12px_14px] border rounded-xl cursor-pointer transition-[border-color,background] duration-[var(--t-quick)] ease-[var(--ease)]',
          rest.checked
            ? 'border-[var(--green-500)] bg-[var(--green-50)]'
            : 'border-[var(--sheet-edge)] bg-[var(--paper)]',
          className ?? '',
        ].filter(Boolean).join(' ')}
      >
        <input type="checkbox" className="sr-only" {...rest} />
        <span
          className="inline-grid place-content-center flex-shrink-0 mt-0.5 rounded-[6px] transition-[border-color,background] duration-[var(--t-quick)] ease-[var(--ease)] focus-visible:shadow-[0_0_0_3px_rgba(59,183,94,0.22)]"
          style={{
            width: '20px',
            height: '20px',
            border: `1.5px solid ${rest.checked ? 'var(--green-500)' : 'var(--sheet-edge-2)'}`,
            background: rest.checked ? 'var(--green-500)' : 'var(--sheet)',
          }}
          aria-hidden="true"
        >
          {rest.checked && (
            <span
              style={{
                display: 'block',
                width: '10px',
                height: '6px',
                borderLeft: '2px solid #fff',
                borderBottom: '2px solid #fff',
                transform: 'rotate(-45deg) translate(1px, -1px)',
              }}
            />
          )}
        </span>
        <div>
          <div className="font-serif font-medium" style={{ fontSize: '16px', letterSpacing: '-0.01em', lineHeight: '1.2', color: 'var(--ink)' }}>{label}</div>
          {description !== undefined && description !== '' && (
            <div className="font-sans text-[12.5px] mt-1 leading-[1.45]" style={{ color: 'var(--ink-3)' }}>{description}</div>
          )}
        </div>
      </label>
    )
  }

  return (
    <span
      className={[
        'inline-grid place-content-center rounded-[6px] transition-[border-color,background] duration-[var(--t-quick)] ease-[var(--ease)] cursor-pointer',
        className ?? '',
      ].filter(Boolean).join(' ')}
      style={{
        width: '20px',
        height: '20px',
        border: `1.5px solid ${rest.checked ? 'var(--green-500)' : 'var(--sheet-edge-2)'}`,
        background: rest.checked ? 'var(--green-500)' : 'var(--sheet)',
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {rest.checked && (
        <span
          style={{
            display: 'block',
            width: '10px',
            height: '6px',
            borderLeft: '2px solid #fff',
            borderBottom: '2px solid #fff',
            transform: 'rotate(-45deg) translate(1px, -1px)',
          }}
        />
      )}
    </span>
  )
}

// --- Radio ---
interface RadioDotProps {
  readonly checked?: boolean
  readonly className?: string
}

export function RadioDot({ checked = false, className }: RadioDotProps) {
  return (
    <span
      className={['inline-grid place-content-center rounded-full flex-shrink-0 transition-[border-color] duration-[var(--t-quick)] ease-[var(--ease)] cursor-pointer', className ?? ''].filter(Boolean).join(' ')}
      style={{
        width: '20px',
        height: '20px',
        border: `1.5px solid ${checked ? 'var(--green-500)' : 'var(--sheet-edge-2)'}`,
        background: 'var(--sheet)',
      }}
      aria-hidden="true"
    >
      {checked && (
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--green-500)', display: 'block' }} />
      )}
    </span>
  )
}

// --- Toggle ---
interface ToggleProps {
  readonly checked?: boolean
  readonly onChange?: () => void
}

export function Toggle({ checked = false, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="relative flex-shrink-0 rounded-full transition-[background] duration-[220ms] ease-[var(--ease)] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(59,183,94,0.28)] cursor-pointer border-0"
      style={{
        width: '40px',
        height: '24px',
        background: checked ? 'var(--green-500)' : 'var(--sheet-edge-2)',
      }}
    >
      <span
        className="absolute rounded-full transition-transform duration-[220ms] ease-[var(--ease)]"
        style={{
          top: '2px',
          left: '2px',
          width: '20px',
          height: '20px',
          background: 'var(--sheet)',
          transform: checked ? 'translateX(16px)' : 'translateX(0)',
        }}
      />
    </button>
  )
}

// --- ToggleRow ---
interface ToggleRowProps {
  readonly heading: string
  readonly description?: string
  readonly checked?: boolean
  readonly onChange?: () => void
}

export function ToggleRow({ heading, description, checked = false, onChange }: ToggleRowProps) {
  return (
    <div
      className="flex items-center justify-between gap-[18px] rounded-xl"
      style={{ padding: '16px 18px', background: 'var(--paper)', border: '1px solid var(--sheet-edge)' }}
    >
      <div>
        <div className="font-serif font-medium" style={{ fontSize: '16px', letterSpacing: '-0.008em', color: 'var(--ink)' }}>{heading}</div>
        {description !== undefined && description !== '' && (
          <div className="font-sans text-[12.5px] mt-0.5 leading-[1.5]" style={{ color: 'var(--ink-3)' }}>{description}</div>
        )}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

// --- PillRadio ---
interface PillRadioProps {
  readonly label: string
  readonly checked?: boolean
  readonly onChange?: () => void
}

export function PillRadio({ label, checked = false, onChange }: PillRadioProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={[
        'inline-flex items-center gap-[10px] rounded-full border cursor-pointer font-sans font-medium text-[13px] transition-[border-color,background] duration-[var(--t-quick)] ease-[var(--ease)] bg-transparent',
        checked
          ? 'border-[var(--green-500)] bg-[var(--green-50)] text-[var(--green-800)]'
          : 'border-[var(--sheet-edge)] bg-[var(--paper)] text-[var(--ink)]',
      ].join(' ')}
      style={{ padding: '10px 16px' }}
    >
      {label}
    </button>
  )
}
