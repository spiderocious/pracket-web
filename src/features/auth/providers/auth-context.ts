import { createContext } from 'react'

export interface AuthState {
  readonly user: import('@shared/types').User | null
  readonly token: string | null
  readonly isLoading: boolean
}

export interface AuthContextValue extends AuthState {
  readonly login: (token: string, user: import('@shared/types').User) => void
  readonly logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
