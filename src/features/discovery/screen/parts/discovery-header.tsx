import { Link, useNavigate } from 'react-router-dom'
import { Switch, Case, Default } from 'meemaw'
import { Search } from '@shared/ui/icons'
import { Logo, Button } from '@shared/ui'
import { useAuth } from '@features/auth/providers/use-auth'
import { ROUTES } from '@shared/constants/routes'
import { getInitials, isStudent, isTutor, isAdmin } from '@shared/helpers'

interface DiscoveryHeaderProps {
  readonly searchValue: string
  readonly onSearchChange: (value: string) => void
}

export function DiscoveryHeader({ searchValue, onSearchChange }: DiscoveryHeaderProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const role = user?.role ?? null
  const initials = user ? getInitials(`${user.firstName} ${user.lastName}`) : ''

  const isGuest = role === null
  const isStudentUser = isStudent(role)
  const isTutorUser = isTutor(role)
  const isAdminUser = isAdmin(role)

  return (
    <header className="bg-paper border-b border-hair">
      {/* Nav bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
        <Link to={ROUTES.ROOT} className="shrink-0">
          <Logo />
        </Link>

        <nav className="flex items-center gap-2 shrink-0">
          <Switch>
            <Case when={isGuest}>
              <Button variant="quiet" size="sm" onClick={() => navigate(ROUTES.LOGIN)}>
                Sign in
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate(`${ROUTES.REGISTER}?role=tutor`)}>
                Become a tutor
              </Button>
            </Case>

            <Case when={isStudentUser}>
              <Button variant="quiet" size="sm" onClick={() => navigate(ROUTES.CONVERSATIONS)}>
                Messages
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={logout}
                aria-label="Sign out"
              >
                {initials}
              </Button>
            </Case>

            <Case when={isTutorUser}>
              <Button variant="primary" size="sm" onClick={() => navigate(ROUTES.TUTOR_DASHBOARD)}>
                Go to dashboard
              </Button>
            </Case>

            <Case when={isAdminUser}>
              <Button variant="secondary" size="sm" onClick={() => navigate(ROUTES.ADMIN)}>
                Admin panel
              </Button>
            </Case>

            <Default>{null}</Default>
          </Switch>
        </nav>
      </div>

      {/* Search band */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-7">
        <h1 className="font-serif font-medium text-[28px] sm:text-[34px] tracking-display text-ink mb-1 leading-tight">
          Find a verified tutor
        </h1>
        <p className="font-sans text-[14px] text-ink-3 mb-5">
          Every tutor on Pracket is identity-verified before their profile goes live.
        </p>
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-ink-4 pointer-events-none" />
          <input
            type="search"
            value={searchValue}
            onChange={e => onSearchChange(e.target.value)}
            placeholder={'Subject, level, or location — e.g. "Further Maths · A-Level · Lekki"'}
            className="w-full h-12 pl-11 pr-5 bg-sheet border border-hair rounded-card text-[14px] font-sans text-ink placeholder:text-ink-4 focus:outline-none focus:border-green-500 focus:shadow-[0_0_0_3px_rgba(59,183,94,0.15)] transition-[border-color,box-shadow] duration-quick shadow-shade"
          />
        </div>
      </div>
    </header>
  )
}
