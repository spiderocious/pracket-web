import { USER_ROLES, type UserRole } from '../types/models'

export function isAdmin(role: UserRole | undefined | null): boolean {
  return role === USER_ROLES.ADMIN
}
