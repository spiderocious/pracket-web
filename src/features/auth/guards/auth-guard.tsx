import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../providers/use-auth'
import { ROUTES } from '@shared/constants/routes'
import type { ReactNode } from 'react'

export function AuthGuard({ children }: { readonly children: ReactNode }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return null

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} state={{ next: location.pathname }} replace />
  }

  return <>{children}</>
}
