export type ToastVariant = 'default' | 'success' | 'warn' | 'crit'

export interface ToastItem {
  id: string
  variant: ToastVariant
  title: string
  sub?: string
  undoLabel?: string
  onUndo?: () => void
  duration?: number
}

let toasts: ToastItem[] = []
const subscribers: Set<() => void> = new Set()

function notify() {
  subscribers.forEach((fn) => fn())
}

export const drawerStore = {
  getToasts: (): ToastItem[] => toasts,

  subscribe: (fn: () => void): (() => void) => {
    subscribers.add(fn)
    return () => { subscribers.delete(fn) }
  },

  addToast: (item: Omit<ToastItem, 'id'>): void => {
    const id = Math.random().toString(36).slice(2)
    toasts = [...toasts, { ...item, id }]
    notify()
    if (item.duration !== 0) {
      setTimeout(() => { drawerStore.removeToast(id) }, item.duration ?? 4000)
    }
  },

  removeToast: (id: string): void => {
    toasts = toasts.filter((t) => t.id !== id)
    notify()
  },
}
