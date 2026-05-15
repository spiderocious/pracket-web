import { Navigate } from 'react-router-dom'
import { useAuth } from '../providers/use-auth'
import { ROUTES } from '@shared/constants/routes'
import type { ReactNode } from 'react'

export function GuestGuard({ children }: { readonly children: ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) return null

  if (user) {
    if (user.role === 'tutor') return <Navigate to={ROUTES.TUTOR_DASHBOARD} replace />
    if (user.role === 'admin') return <Navigate to={ROUTES.ADMIN} replace />
    return <Navigate to={ROUTES.ROOT} replace />
  }

  return <>{children}</>
}
