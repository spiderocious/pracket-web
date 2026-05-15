import type { RouteObject } from 'react-router-dom'
import { ROUTES } from '@shared/constants/routes'

export const discoveryRoutes: RouteObject = {
  path: ROUTES.DISCOVERY,
  lazy: async () => {
    const { DiscoveryScreen } = await import('./screen/discovery-screen')
    return { Component: DiscoveryScreen }
  },
}
