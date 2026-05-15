import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppProvider } from './app.provider'
import { routes } from './app.routes'
import { ToastHost } from '@shared/ui/drawer'

const router = createBrowserRouter(routes)

export function App() {
  return (
    <AppProvider>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-neutral-400">Loading…</div>}>
        <RouterProvider router={router} />
      </Suspense>
      <ToastHost />
    </AppProvider>
  )
}

export default App
