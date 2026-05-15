import { useEffect, useState, type ReactNode } from 'react'
import { apiClient, to } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import type { User } from '@shared/types'
import { AuthContext } from './auth-context'

const TOKEN_KEY = 'pracket_token'

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    void (async () => {
      if (!token) {
        setIsLoading(false)
        return
      }
      const [err, me] = await to(apiClient.get<User>(Endpoints.ME))
      if (err !== null) {
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
      } else {
        setUser(me)
      }
      setIsLoading(false)
    })()
  }, [token])

  function login(newToken: string, newUser: User) {
    localStorage.setItem(TOKEN_KEY, newToken)
    setToken(newToken)
    setUser(newUser)
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
