import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppProvider } from './app.provider'
import { routes } from './app.routes'
import { ToastHost } from '@shared/ui/drawer'
import { ErrorBoundary } from '@shared/ui'

const router = createBrowserRouter(routes)

export function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen bg-paper">
            <span className="font-serif text-[17px] text-ink-3">Loading…</span>
          </div>
        }>
          <RouterProvider router={router} />
        </Suspense>
        <ToastHost />
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App
