import { Suspense, lazy, useState } from 'react'
import { PreviewSidebar } from './parts/preview-sidebar'

const PARTS: Record<string, React.LazyExoticComponent<() => React.ReactElement>> = {
  palette: lazy(() => import('./parts/01-palette').then((m) => ({ default: m.PalettePart }))),
  type: lazy(() => import('./parts/02-type').then((m) => ({ default: m.TypePart }))),
  geometry: lazy(() => import('./parts/03-geometry').then((m) => ({ default: m.GeometryPart }))),
  motion: lazy(() => import('./parts/04-motion').then((m) => ({ default: m.MotionPart }))),
  icons: lazy(() => import('./parts/05-icons').then((m) => ({ default: m.IconsPart }))),
  buttons: lazy(() => import('./parts/10-buttons').then((m) => ({ default: m.ButtonsPart }))),
  inputs: lazy(() => import('./parts/11-inputs').then((m) => ({ default: m.InputsPart }))),
  selection: lazy(() => import('./parts/12-selection').then((m) => ({ default: m.SelectionPart }))),
  'tutor-inputs': lazy(() => import('./parts/13-tutor-inputs').then((m) => ({ default: m.TutorInputsPart }))),
  'list-row': lazy(() => import('./parts/20-list-row').then((m) => ({ default: m.ListRowPart }))),
  'profile-card': lazy(() => import('./parts/21-profile-card').then((m) => ({ default: m.ProfileCardPart }))),
  credentials: lazy(() => import('./parts/22-credentials').then((m) => ({ default: m.CredentialsPart }))),
  price: lazy(() => import('./parts/23-price').then((m) => ({ default: m.PricePart }))),
  'avatars-chips': lazy(() => import('./parts/24-avatars-chips').then((m) => ({ default: m.AvatarsChipsPart }))),
  'empty-loading': lazy(() => import('./parts/25-empty-loading').then((m) => ({ default: m.EmptyLoadingPart }))),
  'stats-strip': lazy(() => import('./parts/50-stats-strip').then((m) => ({ default: m.StatsStripPart }))),
  'message-bubble': lazy(() => import('./parts/40-message-bubble').then((m) => ({ default: m.MessageBubblePart }))),
  conversation: lazy(() => import('./parts/41-conversation').then((m) => ({ default: m.ConversationPart }))),
  modal: lazy(() => import('./parts/42-modal').then((m) => ({ default: m.ModalPart }))),
  'report-modal': lazy(() => import('./parts/43-report-modal').then((m) => ({ default: m.ReportModalPart }))),
  drawer: lazy(() => import('./parts/44-drawer').then((m) => ({ default: m.DrawerPart }))),
  banners: lazy(() => import('./parts/45-banners').then((m) => ({ default: m.BannersPart }))),
}

export function PreviewScreen() {
  const [activeId, setActiveId] = useState('palette')

  const ActivePart = PARTS[activeId]

  return (
    <div
      className="h-screen overflow-hidden"
      style={{ display: 'grid', gridTemplateColumns: '280px 1fr', background: 'var(--paper)' }}
    >
      <PreviewSidebar activeId={activeId} onSelect={setActiveId} />

      <main
        className="flex flex-col min-h-0 min-w-0"
        style={{ background: 'var(--paper)' }}
      >
        {/* Breadcrumb header */}
        <header
          className="flex-shrink-0 flex items-baseline gap-4 px-7 py-[18px]"
          style={{ borderBottom: '1px solid var(--sheet-edge)', background: 'var(--paper)' }}
        >
          <span
            className="font-sans font-semibold uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'var(--ink-3)' }}
          >
            Pracket DS
          </span>
          <span style={{ color: 'var(--hair)', fontSize: '11px' }}>·</span>
          <span
            className="font-sans font-semibold uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'var(--ink)' }}
          >
            {activeId}
          </span>
        </header>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ padding: '48px 64px 96px' }}
        >
          <Suspense
            fallback={
              <div
                className="font-mono text-[11px] uppercase"
                style={{ letterSpacing: '0.14em', color: 'var(--ink-3)' }}
              >
                Loading…
              </div>
            }
          >
            {ActivePart !== undefined ? <ActivePart /> : (
              <p style={{ color: 'var(--ink-3)' }}>Coming soon.</p>
            )}
          </Suspense>
        </div>
      </main>
    </div>
  )
}
