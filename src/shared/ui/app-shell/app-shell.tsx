import type { ReactNode } from 'react'

interface AppShellProps {
  readonly header: ReactNode
  readonly children: ReactNode
}

export function AppShell({ header, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-paper">
      {header}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
