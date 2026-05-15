import { Navigate } from 'react-router-dom'
import { useAuth } from '../providers/use-auth'
import { ROUTES } from '@shared/constants/routes'
import type { ReactNode } from 'react'
import type { UserRole } from '@shared/types'

interface RoleGuardProps {
  readonly role: UserRole
  readonly children: ReactNode
}

export function RoleGuard({ role, children }: RoleGuardProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) return null

  if (!user || user.role !== role) {
    return <Navigate to={ROUTES.ROOT} replace />
  }

  return <>{children}</>
}
