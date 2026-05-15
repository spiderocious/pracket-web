export const ROUTES = {
  ROOT: '/',
  DISCOVERY: '/discover',
  TUTOR_PROFILE: '/tutor/:id',
  CONNECTION: '/connect/:id',
  CONVERSATIONS: '/conversations',
  CONVERSATION: '/conversations/:id',
  SHORTLIST: '/shortlist',
  LOGIN: '/login',
  REGISTER: '/register',
  TUTOR_ONBOARDING: '/tutor/onboard',
  TUTOR_DASHBOARD: '/tutor/dashboard',
  TUTOR_PROFILE_EDIT: '/tutor/profile/edit',
  TUTOR_NOTE_NEW: '/tutor/notes/new',
  TUTOR_NOTE_EDIT: '/tutor/notes/:id',
  ADMIN: '/admin',
  ADMIN_CREDENTIALS: '/admin/credentials',
  ADMIN_REPORTS: '/admin/reports',
  PREVIEW: '/preview',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
