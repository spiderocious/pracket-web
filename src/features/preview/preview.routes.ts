import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { ROUTES } from '@shared/constants/routes'

const PreviewScreen = lazy(() =>
  import('./screen/preview-screen').then((m) => ({ default: m.PreviewScreen }))
)

export const previewRoutes: RouteObject = {
  path: ROUTES.PREVIEW,
  Component: PreviewScreen,
}
