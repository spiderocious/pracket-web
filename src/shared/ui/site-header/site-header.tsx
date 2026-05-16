import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MessageSquare, Heart, LayoutDashboard, ShieldCheck, LogOut, LogIn, UserPlus, Flag } from 'lucide-react'
import { Logo } from '../logo'
import { Button } from '../button'
import { ROUTES } from '@shared/constants/routes'
import { useAuth } from '@features/auth/providers/use-auth'
import { isStudent, isTutor, isAdmin, getInitials } from '@shared/helpers'

interface NavLinkProps {
  readonly to: string
  readonly icon: React.ReactNode
  readonly label: string
  readonly active?: boolean
}

function NavLink({ to, icon, label, active }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={[
        'inline-flex items-center gap-[6px] h-[34px] px-[14px] rounded-[10px] font-sans text-[13px] font-medium transition-colors duration-quick whitespace-nowrap',
        active
          ? 'bg-green-100 text-green-800'
          : 'text-ink-2 hover:text-ink hover:bg-sheet',
      ].join(' ')}
    >
      <span className="flex items-center shrink-0" style={{ width: 14, height: 14, opacity: active ? 1 : 0.65 }}>
        {icon}
      </span>
      {label}
    </Link>
  )
}

interface UserBadgeProps {
  readonly initials: string
  readonly name: string
  readonly onLogout: () => void
}

function UserBadge({ initials, name, onLogout }: UserBadgeProps) {
  return (
    <div
      className="flex items-center gap-[6px] h-[34px] pl-[6px] pr-[10px] rounded-[10px] border border-hair"
      style={{ background: 'var(--sheet)' }}
    >
      {/* Avatar circle */}
      <div
        className="w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center font-sans font-semibold text-[10px] text-green-800 select-none"
        style={{ background: 'var(--green-200)', border: '1px solid var(--green-300)', letterSpacing: '0.04em' }}
      >
        {initials}
      </div>
      {/* Name */}
      <span className="font-sans text-[13px] font-medium text-ink-2 max-w-[90px] truncate">
        {name}
      </span>
      {/* Divider */}
      <div className="w-px h-3.5 bg-hair mx-0.5 shrink-0" />
      {/* Sign out */}
      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-1 text-ink-4 hover:text-crit transition-colors duration-quick text-[12px] font-sans font-medium shrink-0"
        aria-label="Sign out"
      >
        <LogOut style={{ width: 12, height: 12 }} />
        Out
      </button>
    </div>
  )
}

export function SiteHeader() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const path = location.pathname

  const role = user?.role ?? null
  const initials = user ? getInitials(`${user.firstName} ${user.lastName}`) : ''
  const firstName = user?.firstName ?? ''

  return (
    <header
      className="sticky top-0 z-40 border-b border-hair"
      style={{ background: 'var(--sheet)', boxShadow: '0 1px 0 var(--hair), 0 2px 8px -4px rgba(31,35,28,0.06)' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to={ROUTES.ROOT} className="shrink-0 flex items-center">
          <Logo />
        </Link>

        {/* Nav + actions */}
        <nav className="flex items-center gap-1">

          {/* Guest */}
          {role === null && (
            <>
              <Button
                variant="quiet"
                size="sm"
                onClick={() => navigate(ROUTES.LOGIN)}
                className="flex items-center gap-1.5"
              >
                <LogIn style={{ width: 14, height: 14 }} />
                Sign in
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate(ROUTES.REGISTER)}
                className="flex items-center gap-1.5"
              >
                <UserPlus style={{ width: 14, height: 14 }} />
                Get started
              </Button>
            </>
          )}

          {/* Student */}
          {isStudent(role) && (
            <>
              <NavLink
                to={ROUTES.STUDENT_DASHBOARD}
                icon={<LayoutDashboard style={{ width: 14, height: 14 }} />}
                label="Dashboard"
                active={path === ROUTES.STUDENT_DASHBOARD}
              />
              <NavLink
                to={ROUTES.SHORTLIST}
                icon={<Heart style={{ width: 14, height: 14 }} />}
                label="Shortlist"
                active={path === ROUTES.SHORTLIST}
              />
              <NavLink
                to={ROUTES.CONVERSATIONS}
                icon={<MessageSquare style={{ width: 14, height: 14 }} />}
                label="Messages"
                active={path.startsWith('/conversations')}
              />
              <div className="w-px h-4 bg-hair mx-1 shrink-0" />
              <UserBadge initials={initials} name={firstName} onLogout={logout} />
            </>
          )}

          {/* Tutor */}
          {isTutor(role) && (
            <>
              <NavLink
                to={ROUTES.TUTOR_DASHBOARD}
                icon={<LayoutDashboard style={{ width: 14, height: 14 }} />}
                label="Dashboard"
                active={path === ROUTES.TUTOR_DASHBOARD}
              />
              <div className="w-px h-4 bg-hair mx-1 shrink-0" />
              <UserBadge initials={initials} name={firstName} onLogout={logout} />
            </>
          )}

          {/* Admin */}
          {isAdmin(role) && (
            <>
              <NavLink
                to={ROUTES.ADMIN_CREDENTIALS}
                icon={<ShieldCheck style={{ width: 14, height: 14 }} />}
                label="Credentials"
                active={path === ROUTES.ADMIN_CREDENTIALS}
              />
              <NavLink
                to={ROUTES.ADMIN_REPORTS}
                icon={<Flag style={{ width: 14, height: 14 }} />}
                label="Reports"
                active={path === ROUTES.ADMIN_REPORTS}
              />
              <div className="w-px h-4 bg-hair mx-1 shrink-0" />
              <UserBadge initials={initials} name={firstName} onLogout={logout} />
            </>
          )}

        </nav>
      </div>
    </header>
  )
}
