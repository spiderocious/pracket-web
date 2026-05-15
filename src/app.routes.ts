import type { RouteObject } from 'react-router-dom'
import { ROUTES } from '@shared/constants/routes'
import { previewRoutes } from '@features/preview/preview.routes'

export const routes: RouteObject[] = [
  // Discovery / landing
  {
    path: ROUTES.ROOT,
    lazy: async () => {
      const { DiscoveryScreen } = await import('@features/discovery/screen/discovery-screen')
      return { Component: DiscoveryScreen }
    },
  },
  {
    path: ROUTES.DISCOVERY,
    lazy: async () => {
      const { DiscoveryScreen } = await import('@features/discovery/screen/discovery-screen')
      return { Component: DiscoveryScreen }
    },
  },
  // Tutor public profile
  {
    path: ROUTES.TUTOR_PROFILE,
    lazy: async () => {
      const { TutorProfileScreen } = await import('@features/tutor-profile/screen/tutor-profile-screen')
      return { Component: TutorProfileScreen }
    },
  },
  // Auth
  {
    path: ROUTES.LOGIN,
    lazy: async () => {
      const { LoginScreen } = await import('@features/auth/screen/login-screen')
      return { Component: LoginScreen }
    },
  },
  {
    path: ROUTES.REGISTER,
    lazy: async () => {
      const { RegisterScreen } = await import('@features/auth/screen/register-screen')
      return { Component: RegisterScreen }
    },
  },
  // Conversations
  {
    path: ROUTES.CONVERSATIONS,
    lazy: async () => {
      const { ConversationsScreen } = await import('@features/conversations/screen/conversations-screen')
      return { Component: ConversationsScreen }
    },
  },
  {
    path: ROUTES.CONVERSATION,
    lazy: async () => {
      const { ConversationScreen } = await import('@features/conversations/screen/conversation-screen')
      return { Component: ConversationScreen }
    },
  },
  // Shortlist
  {
    path: ROUTES.SHORTLIST,
    lazy: async () => {
      const { ShortlistScreen } = await import('@features/shortlist/screen/shortlist-screen')
      return { Component: ShortlistScreen }
    },
  },
  // Tutor
  {
    path: ROUTES.TUTOR_ONBOARDING,
    lazy: async () => {
      const { TutorOnboardingScreen } = await import('@features/tutor/screen/tutor-onboarding-screen')
      return { Component: TutorOnboardingScreen }
    },
  },
  {
    path: ROUTES.TUTOR_DASHBOARD,
    lazy: async () => {
      const { TutorDashboardScreen } = await import('@features/tutor/screen/tutor-dashboard-screen')
      return { Component: TutorDashboardScreen }
    },
  },
  {
    path: ROUTES.TUTOR_NOTE_NEW,
    lazy: async () => {
      const { NoteEditorScreen } = await import('@features/tutor/screen/note-editor-screen')
      return { Component: NoteEditorScreen }
    },
  },
  {
    path: ROUTES.TUTOR_NOTE_EDIT,
    lazy: async () => {
      const { NoteEditorScreen } = await import('@features/tutor/screen/note-editor-screen')
      return { Component: NoteEditorScreen }
    },
  },
  // Admin
  {
    path: ROUTES.ADMIN_CREDENTIALS,
    lazy: async () => {
      const { AdminCredentialsScreen } = await import('@features/admin/screen/admin-credentials-screen')
      return { Component: AdminCredentialsScreen }
    },
  },
  {
    path: ROUTES.ADMIN_REPORTS,
    lazy: async () => {
      const { AdminReportsScreen } = await import('@features/admin/screen/admin-reports-screen')
      return { Component: AdminReportsScreen }
    },
  },
  {
    path: ROUTES.ADMIN,
    lazy: async () => {
      const { AdminCredentialsScreen } = await import('@features/admin/screen/admin-credentials-screen')
      return { Component: AdminCredentialsScreen }
    },
  },
  previewRoutes,
]
