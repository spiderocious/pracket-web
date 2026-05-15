import { USER_ROLES, type UserRole } from '../types/models'

export function isStudent(role: UserRole | undefined | null): boolean {
  return role === USER_ROLES.STUDENT
}
