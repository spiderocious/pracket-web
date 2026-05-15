import { drawerStore } from './drawer-store'
import type { ToastItem } from './drawer-store'

type ToastOpts = Partial<Omit<ToastItem, 'id' | 'title' | 'variant'>>

export const DrawerService = {
  toast: (title: string, opts?: ToastOpts): void =>
    drawerStore.addToast({ variant: 'default', title, ...opts }),

  success: (title: string, opts?: ToastOpts): void =>
    drawerStore.addToast({ variant: 'success', title, ...opts }),

  warn: (title: string, opts?: ToastOpts): void =>
    drawerStore.addToast({ variant: 'warn', title, ...opts }),

  crit: (title: string, opts?: ToastOpts): void =>
    drawerStore.addToast({ variant: 'crit', title, ...opts }),
}
