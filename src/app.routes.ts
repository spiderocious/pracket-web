import type { RouteObject } from 'react-router-dom'
import { ROUTES } from '@shared/constants/routes'
import { previewRoutes } from '@features/preview/preview.routes'

export const routes: RouteObject[] = [
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
  {
    path: ROUTES.TUTOR_PROFILE,
    lazy: async () => {
      const { TutorProfileScreen } = await import('@features/tutor-profile/screen/tutor-profile-screen')
      return { Component: TutorProfileScreen }
    },
  },
  previewRoutes,
]
