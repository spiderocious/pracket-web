import { useState, useEffect } from 'react'
import { drawerStore } from './drawer-store'
import type { ToastItem, ToastVariant } from './drawer-store'

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconDefault() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-3)', width: 22, height: 22 }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  )
}

function IconSuccess() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--green-700)', width: 22, height: 22 }}>
      <path d="M20 7 9 18l-5-5" />
    </svg>
  )
}

function IconWarn() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--warn)', width: 22, height: 22 }}>
      <path d="M12 9v4M12 17h.01M3 17.5 12 3l9 14.5z" />
    </svg>
  )
}

function IconCrit() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--crit)', width: 22, height: 22 }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

// ─── Variant styles ───────────────────────────────────────────────────────────

const VARIANT_BG: Record<ToastVariant, string> = {
  default: 'var(--sheet)',
  success: '#F2FBF5',
  warn: 'var(--warn-bg, #FDF8EE)',
  crit: 'var(--crit-bg, #FDF3F0)',
}

const VARIANT_BORDER: Record<ToastVariant, string> = {
  default: 'var(--hair)',
  success: 'var(--green-200)',
  warn: 'var(--warn-edge)',
  crit: 'var(--crit-edge)',
}

const VARIANT_TITLE_COLOR: Record<ToastVariant, string> = {
  default: 'var(--ink)',
  success: 'var(--green-900)',
  warn: 'var(--warn)',
  crit: 'var(--crit)',
}

const VARIANT_SUB_COLOR: Record<ToastVariant, string> = {
  default: 'var(--ink-3)',
  success: 'var(--green-800)',
  warn: 'var(--ink-3)',
  crit: 'var(--ink-3)',
}

function ToastIcon({ variant }: { readonly variant: ToastVariant }) {
  if (variant === 'success') return <IconSuccess />
  if (variant === 'warn') return <IconWarn />
  if (variant === 'crit') return <IconCrit />
  return <IconDefault />
}

// ─── Single toast card ────────────────────────────────────────────────────────

interface ToastCardProps {
  readonly toast: ToastItem
}

function ToastCard({ toast }: ToastCardProps) {
  function handleClose() {
    drawerStore.removeToast(toast.id)
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '22px 1fr auto auto',
        gap: '12px',
        alignItems: 'flex-start',
        background: VARIANT_BG[toast.variant],
        border: `1px solid ${VARIANT_BORDER[toast.variant]}`,
        borderRadius: '14px',
        padding: '14px 16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        width: '100%',
      }}
    >
      <div style={{ paddingTop: '1px' }}>
        <ToastIcon variant={toast.variant} />
      </div>

      <div>
        <div
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '15px',
            fontWeight: 500,
            letterSpacing: '-0.008em',
            lineHeight: 1.25,
            color: VARIANT_TITLE_COLOR[toast.variant],
          }}
        >
          {toast.title}
        </div>
        {toast.sub !== undefined && toast.sub !== '' && (
          <div
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '12.5px',
              color: VARIANT_SUB_COLOR[toast.variant],
              marginTop: '3px',
              lineHeight: 1.5,
            }}
          >
            {toast.sub}
          </div>
        )}
      </div>

      {toast.undoLabel !== undefined && toast.onUndo !== undefined && (
        <button
          type="button"
          onClick={toast.onUndo}
          style={{
            background: 'transparent',
            border: 0,
            fontFamily: 'var(--sans)',
            fontSize: '12px',
            color: 'var(--green-700)',
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: 0,
            alignSelf: 'center',
          }}
        >
          {toast.undoLabel}
        </button>
      )}

      <button
        type="button"
        onClick={handleClose}
        aria-label="Dismiss"
        style={{
          background: 'transparent',
          border: 0,
          color: 'var(--ink-3)',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      >
        <IconClose />
      </button>
    </div>
  )
}

// ─── ToastHost ────────────────────────────────────────────────────────────────

export function ToastHost() {
  const [toasts, setToasts] = useState<ToastItem[]>(() => drawerStore.getToasts())

  useEffect(() => {
    return drawerStore.subscribe(() => { setToasts([...drawerStore.getToasts()]) })
  }, [])

  if (toasts.length === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        maxWidth: '380px',
        width: '100%',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 60,
      }}
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} />
      ))}
    </div>
  )
}
