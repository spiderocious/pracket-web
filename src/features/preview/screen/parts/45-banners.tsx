import { Banner } from '@shared/ui/banner'
import { Scene } from './preview-canvas'

export function BannersPart() {
  return (
    <div>
      <div className="mb-9">
        <div
          className="font-mono uppercase mb-1 text-[11px]"
          style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}
        >
          45 / FEEDBACK
        </div>
        <h1
          className="font-serif font-medium"
          style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}
        >
          Banners
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          Page-level notices
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        Banners live at the top of a page section. They are not dismissible by default — they carry
        a persistent fact the user must act on.
      </p>

      <Scene
        label="Scene · info banner"
        title="Information · safety message"
      >
        <Banner
          variant="info"
          title="Your messages are protected"
          sub="Pracket routes all messages until both sides agree to share contact details."
        />
      </Scene>

      <Scene
        label="Scene · warn banner"
        title="Warning · card expiring"
      >
        <Banner
          variant="warn"
          title="Your card is about to expire"
          sub="Update your payment method before your next connection."
        />
      </Scene>
    </div>
  )
}
