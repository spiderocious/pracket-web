import { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { Switch, Case } from 'meemaw'
import { Logo, Button, Input, Field } from '@shared/ui'
import { ApiRequestError } from '@shared/api'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import { ROUTES } from '@shared/constants/routes'
import { useAuth } from '../providers/use-auth'
import type { User, UserRole } from '@shared/types'

interface AuthResponse {
  token: string
  user: User
}

interface FieldErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

type Step = 'role' | 'form'

interface RoleCardProps {
  title: string
  description: string
  selected: boolean
  onClick: () => void
}

function RoleCard({ title, description, selected, onClick }: Readonly<RoleCardProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full text-left p-5 rounded-[16px] border-2 transition-[border-color,background] duration-quick',
        selected
          ? 'border-green-500 bg-green-50'
          : 'border-hair bg-sheet hover:border-sheet-edge-2',
      ].join(' ')}
    >
      <p className="font-sans font-semibold text-[15px] text-ink mb-1">{title}</p>
      <p className="font-sans text-[13px] text-ink-3 leading-relaxed">{description}</p>
    </button>
  )
}

export function RegisterScreen() {
  const { user, login } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>('role')
  const [role, setRole] = useState<UserRole>('student')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [topError, setTopError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (user) return <Navigate to={ROUTES.ROOT} replace />

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFieldErrors({})
    setTopError('')
    setIsLoading(true)

    try {
      const res = await apiClient.post<AuthResponse>(Endpoints.REGISTER, {
        firstName,
        lastName,
        email,
        password,
        role,
      })
      login(res.token, res.user)
      navigate(res.user.role === 'tutor' ? ROUTES.TUTOR_ONBOARDING : ROUTES.ROOT)
    } catch (err) {
      if (err instanceof ApiRequestError) {
        if (err.fieldErrors) {
          setFieldErrors({
            firstName: err.fieldErrors['firstName']?.[0],
            lastName: err.fieldErrors['lastName']?.[0],
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

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[440px]">
        <div className="text-center mb-8">
          <Logo />
          <h1 className="font-serif font-medium text-[28px] tracking-display text-ink mt-4 mb-1">
            Create your account
          </h1>
          <p className="font-sans text-[14px] text-ink-3">Join Pracket today</p>
        </div>

        <Switch>
          <Case when={step === 'role'}>
            <div className="bg-sheet rounded-[20px] border border-hair p-7">
              <p className="font-mono text-[10.5px] uppercase tracking-overline text-ink-4 mb-4">
                I am a…
              </p>
              <div className="grid gap-3 mb-6">
                <RoleCard
                  title="Student"
                  description="I'm looking for a tutor to help me with my studies."
                  selected={role === 'student'}
                  onClick={() => setRole('student')}
                />
                <RoleCard
                  title="Tutor"
                  description="I want to offer tutoring sessions and connect with students."
                  selected={role === 'tutor'}
                  onClick={() => setRole('tutor')}
                />
              </div>
              <Button variant="primary" block onClick={() => setStep('form')}>
                Continue
              </Button>
            </div>
          </Case>

          <Case when={step === 'form'}>
            <div className="bg-sheet rounded-[20px] border border-hair p-7">
              <button
                type="button"
                onClick={() => setStep('role')}
                className="font-sans text-[13px] text-ink-3 hover:text-ink mb-5 flex items-center gap-1 transition-colors duration-quick"
              >
                ← Back
              </button>

              <div className="mb-5 px-4 py-2.5 rounded-[10px] bg-green-50 border border-green-200">
                <p className="font-sans text-[13px] text-green-700">
                  Signing up as <strong>{role === 'tutor' ? 'a Tutor' : 'a Student'}</strong>
                </p>
              </div>

              {topError !== '' && (
                <div className="mb-5 px-4 py-3 rounded-[12px] bg-[var(--crit-bg)] border border-[var(--crit-edge)]">
                  <p className="font-sans text-[13px] text-[var(--crit)]">{topError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First name" error={fieldErrors.firstName}>
                    <Input
                      placeholder="Ada"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      error={!!fieldErrors.firstName}
                      autoComplete="given-name"
                      required
                    />
                  </Field>
                  <Field label="Last name" error={fieldErrors.lastName}>
                    <Input
                      placeholder="Lovelace"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      error={!!fieldErrors.lastName}
                      autoComplete="family-name"
                      required
                    />
                  </Field>
                </div>

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
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    error={!!fieldErrors.password}
                    autoComplete="new-password"
                    required
                  />
                </Field>

                <Button type="submit" variant="primary" block disabled={isLoading}>
                  {isLoading ? 'Creating account…' : 'Create account'}
                </Button>
              </form>
            </div>
          </Case>
        </Switch>

        <p className="text-center font-sans text-[13px] text-ink-3 mt-5">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-green-700 font-medium hover:text-green-800">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
