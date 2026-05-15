import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { Button } from '@shared/ui/button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) return this.props.fallback

      return (
        <div className="min-h-screen bg-paper flex items-center justify-center px-4">
          <div className="max-w-sm w-full text-center">
            <p className="font-mono text-[10.5px] uppercase tracking-overline text-ink-4 mb-3">
              Something went wrong
            </p>
            <h1 className="font-serif font-medium text-[26px] tracking-display text-ink mb-3">
              Unexpected error
            </h1>
            <p className="font-sans text-[14px] text-ink-3 leading-relaxed mb-8">
              {this.state.error?.message ?? 'An unknown error occurred.'}
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="quiet" onClick={() => window.history.back()}>
                Go back
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  this.handleReset()
                  window.location.reload()
                }}
              >
                Refresh page
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
