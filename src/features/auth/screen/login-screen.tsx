import { useState } from 'react'
import { useNavigate, Navigate, Link, useSearchParams, useLocation } from 'react-router-dom'
import { Logo, Button, Input, Field } from '@shared/ui'
import { ApiRequestError } from '@shared/api'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import { ROUTES } from '@shared/constants/routes'
import { useAuth } from '../providers/use-auth'
import type { User } from '@shared/types'

interface AuthResponse {
  token: string
  user: User
}

interface FieldErrors {
  email?: string
  password?: string
}

export function LoginScreen() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const next = searchParams.get('next') ?? (location.state as { next?: string } | null)?.next ?? null

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [topError, setTopError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (user) return <Navigate to={next ?? ROUTES.ROOT} replace />

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFieldErrors({})
    setTopError('')
    setIsLoading(true)

    try {
      const res = await apiClient.post<AuthResponse>(Endpoints.LOGIN, { email, password })
      login(res.token, res.user)
      const defaultDest = res.user.role === 'tutor' ? ROUTES.TUTOR_DASHBOARD : res.user.role === 'student' ? ROUTES.STUDENT_DASHBOARD : ROUTES.ROOT
      const dest = next ?? defaultDest
      navigate(dest, { replace: true })
    } catch (err) {
      if (err instanceof ApiRequestError) {
        if (err.fieldErrors) {
          setFieldErrors({
            email: err.fieldErrors['email']?.[0],
            password: err.fieldErrors['password']?.[0],
          })
        } else {
          setTopError(err.message)
        }
      } else {
        setTopError('Something went wrong. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const registerHref = next
    ? `${ROUTES.REGISTER}?next=${encodeURIComponent(next)}`
    : ROUTES.REGISTER

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <Logo />
          <h1 className="font-serif font-medium text-[28px] tracking-display text-ink mt-4 mb-1">
            Welcome back
          </h1>
          <p className="font-sans text-[14px] text-ink-3">Sign in to your account</p>
        </div>

        <div className="bg-sheet rounded-[20px] border border-hair p-7">
          {topError !== '' && (
            <div className="mb-5 px-4 py-3 rounded-[12px] bg-crit-bg border border-crit-edge">
              <p className="font-sans text-[13px] text-crit">{topError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-5">
            <Field label="Email" error={fieldErrors.email}>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={!!fieldErrors.email}
                autoComplete="email"
                required
              />
            </Field>

            <Field label="Password" error={fieldErrors.password}>
              <Input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={!!fieldErrors.password}
                autoComplete="current-password"
                required
              />
            </Field>

            <Button type="submit" variant="primary" block disabled={isLoading}>
              {isLoading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>

        <p className="text-center font-sans text-[13px] text-ink-3 mt-5">
          Don&apos;t have an account?{' '}
          <Link to={registerHref} className="text-green-700 font-medium hover:text-green-800">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
