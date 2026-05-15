import { Button } from '@shared/ui/button'
import { RefBlock, RefRow, Scene, Section } from './preview-canvas'

export function ButtonsPart() {
  return (
    <div>
      <div className="mb-9">
        <div className="font-mono uppercase mb-1 text-[11px]" style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
          10 / PRIMITIVES
        </div>
        <h1 className="font-serif font-medium" style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}>
          Buttons
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          Drawn in scenes · single accent
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        Five variants, but the only one you'll see often is <strong style={{ color: 'var(--ink)' }}>Primary</strong>.
        Pracket's signature interaction is Connect — pay the fee, start the conversation — and the button is
        designed for that single act. Danger appears only on irreversible safety actions (report-a-tutor,
        leave-conversation). Buttons are shown here in the situations they actually live in.
      </p>

      {/* Scene 1 — profile rail */}
      <Scene
        label="Scene · profile rail · the connect moment"
        title="The button that earns the company money"
        description="A parent has read Marcus's profile and decided. The Connect button anchors the right rail — full-width, 52px tall, with the fee shown inline so the price is never a surprise."
      >
        <div
          className="rounded-[16px]"
          style={{ background: 'var(--paper)', border: '1px solid var(--sheet-edge)', padding: '22px', maxWidth: '320px' }}
        >
          <div style={{ paddingBottom: '18px', marginBottom: '18px', borderBottom: '1px solid var(--hair)' }}>
            <div
              className="font-sans font-semibold uppercase mb-1.5"
              style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ink-3)' }}
            >
              Lesson rate
            </div>
            <div className="font-mono font-medium" style={{ fontSize: '28px', color: 'var(--ink)', fontFeatureSettings: '"tnum" 1' }}>
              ₦12,000
              <span className="font-sans font-medium uppercase ml-1.5" style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'var(--ink-3)' }}>per hour</span>
            </div>
          </div>
          <Button variant="primary" size="lg" block>Connect with Marcus — ₦2,500</Button>
          <p className="font-sans text-[12px] text-center mt-3" style={{ color: 'var(--ink-3)', margin: '12px 0 0' }}>
            One-time fee. Identity stays masked until you both agree.
          </p>
        </div>
      </Scene>

      {/* Scene 2 — list row */}
      <Scene
        label="Scene · list row · the toolbar"
        title="Quiet actions inside a row"
        description="Save-for-later and Compare are quiet secondary actions. They never compete with Connect."
      >
        <div
          className="grid items-center gap-[14px] rounded-[14px]"
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--sheet-edge)',
            padding: '14px 18px',
            gridTemplateColumns: '44px 1fr auto auto',
          }}
        >
          <div
            className="rounded-full flex-shrink-0"
            style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #D9C9A9, #B59F76)', border: '1px solid #C2B69B' }}
          />
          <div>
            <div className="font-serif font-medium" style={{ fontSize: '17px', color: 'var(--ink)' }}>Marcus K.</div>
            <div className="font-sans text-[12px] mt-0.5" style={{ color: 'var(--ink-3)' }}>Further Maths · 8 yrs · Lekki</div>
          </div>
          <Button variant="quiet" size="sm">Save</Button>
          <Button variant="primary" size="sm">Connect</Button>
        </div>
      </Scene>

      {/* Scene 3 — modal foot */}
      <Scene
        label="Scene · modal foot · the confirmation"
        title="Cancel sits left of the action, never beside it"
        description={'On a confirm modal, the cancel always sits at the left and the action at the right. The action’s label restates the consequence — not “Confirm” but “Connect — ₦2,500.”'}
      >
        <div
          className="rounded-[18px]"
          style={{ background: 'var(--paper)', border: '1px solid var(--sheet-edge)', padding: '22px 24px' }}
        >
          <p className="font-serif italic mb-4" style={{ fontSize: '17px', color: 'var(--ink)', letterSpacing: '-0.008em', margin: '0 0 16px' }}>
            "Once you connect, ₦2,500 will be charged. You'll be able to message Marcus immediately."
          </p>
          <div className="flex items-center gap-3">
            <span className="font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>You can cancel before you send your first message.</span>
            <div className="flex-1" />
            <Button variant="quiet">Cancel</Button>
            <Button variant="primary">Connect — ₦2,500</Button>
          </div>
        </div>
      </Scene>

      {/* Scene 4 — danger */}
      <Scene
        label="Scene · safety · the danger variant"
        title="The irreversible button is drawn in brick-red, not Bootstrap-red"
        description="Used on report-a-tutor, leave-conversation, and delete-account. Pairs with a critical-bg modal background so the danger always reads as one composition, not a loose button."
      >
        <div
          className="rounded-[18px]"
          style={{ background: 'var(--crit-bg)', border: '1px solid var(--crit-edge)', padding: '22px 24px' }}
        >
          <p className="font-serif italic mb-4" style={{ fontSize: '17px', color: 'var(--crit)', letterSpacing: '-0.008em', margin: '0 0 16px' }}>
            "Reporting Marcus will close this conversation immediately and notify our trust team. This cannot be undone."
          </p>
          <div className="flex items-center justify-end gap-3">
            <Button variant="quiet">Cancel</Button>
            <Button variant="danger">Report &amp; close conversation</Button>
          </div>
        </div>
      </Scene>

      <Section title="Variant reference · small grid at the end">
        <RefBlock>
          <RefRow label="primary · md">
            <Button variant="primary">Connect — ₦2,500</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </RefRow>
          <RefRow label="primary · lg">
            <Button variant="primary" size="lg">Connect with Marcus</Button>
          </RefRow>
          <RefRow label="primary · sm">
            <Button variant="primary" size="sm">Connect</Button>
          </RefRow>
          <RefRow label="secondary">
            <Button variant="secondary">Save tutor</Button>
            <Button variant="secondary" size="sm">Save</Button>
          </RefRow>
          <RefRow label="quiet">
            <Button variant="quiet">Cancel</Button>
            <Button variant="quiet" size="sm">Filter</Button>
          </RefRow>
          <RefRow label="link">
            <Button variant="link">Read Marcus's Sunday note →</Button>
          </RefRow>
          <RefRow label="danger">
            <Button variant="danger">Report tutor</Button>
          </RefRow>
        </RefBlock>
      </Section>
    </div>
  )
}
