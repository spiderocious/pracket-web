import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { ROUTES } from '@shared/constants/routes'

const DiscoveryScreen = lazy(() =>
  import('./screen/discovery-screen').then((m) => ({ default: m.DiscoveryScreen }))
)

export const discoveryRoutes: RouteObject = {
  path: ROUTES.DISCOVERY,
  Component: DiscoveryScreen,
}
