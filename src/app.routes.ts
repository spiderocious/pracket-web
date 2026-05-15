import type { RouteObject } from 'react-router-dom'
import { ROUTES } from '@shared/constants/routes'
import { discoveryRoutes } from '@features/discovery/discovery.routes'
import { previewRoutes } from '@features/preview/preview.routes'

export const routes: RouteObject[] = [
  {
    path: ROUTES.ROOT,
    lazy: async () => {
      const { DiscoveryScreen } = await import('@features/discovery/screen/discovery-screen')
      return { Component: DiscoveryScreen }
    },
  },
  discoveryRoutes,
  previewRoutes,
]
