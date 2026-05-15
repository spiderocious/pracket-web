export const Endpoints = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',

  TUTOR_PUBLIC: (id: string) => `/tutors/${id}`,
  TUTOR_ME_PROFILE: '/tutors/me/profile',
  TUTOR_ME_AVAILABILITY: '/tutors/me/availability',
  TUTOR_ME_VISIBILITY: '/tutors/me/visibility',
  TUTOR_ME_CREDENTIALS: '/tutors/me/credentials',

  SEARCH: '/search',

  SHORTLIST: '/shortlist',
  SHORTLIST_ITEM: (tutorId: string) => `/shortlist/${tutorId}`,

  CONNECTIONS: '/connections',
  CONNECTION: (id: string) => `/connections/${id}`,

  MESSAGES: (connectionId: string) => `/messages/${connectionId}`,

  POSTS: '/posts',
  POST: (id: string) => `/posts/${id}`,

  REPORTS: '/reports',

  ADMIN_CREDENTIALS: '/admin/credentials',
  ADMIN_CREDENTIAL: (id: string) => `/admin/credentials/${id}`,
  ADMIN_TUTORS_TOGGLE: (id: string) => `/admin/tutors/${id}`,
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_REPORT: (id: string) => `/admin/reports/${id}`,
} as const
