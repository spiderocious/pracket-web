import { Button } from '@shared/ui/button'
import { Field, Input, Textarea } from '@shared/ui/input'
import { RefBlock, RefRow, Scene, Section } from './preview-canvas'

export function InputsPart() {
  return (
    <div>
      <div className="mb-9">
        <div className="font-mono uppercase mb-1 text-[11px]" style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
          11 / PRIMITIVES
        </div>
        <h1 className="font-serif font-medium" style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}>
          Inputs
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          Filled · 14px radius · sage focus halo
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        Filled inputs on cream paper, 14px radius, 48px tall. The focus halo is the brand green at 18% —
        a calm signal that the field is listening. Labels are small-caps overline; help text is muted ink.
        Errors are warm brick-red, never Bootstrap-red.
      </p>

      {/* Scene 1 — search */}
      <Scene
        label="Scene · search · the top of the marketplace"
        title="One big search row · the front door"
        description="The home page leads with this. Subject and location are the only required inputs to start."
      >
        <div
          className="grid gap-[14px] rounded-[18px]"
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--sheet-edge)',
            padding: '22px',
            gridTemplateColumns: '2fr 1fr auto',
            alignItems: 'end',
          }}
        >
          <Field label="Subject or topic">
            <Input size="lg" defaultValue="Further Mathematics" />
          </Field>
          <Field label="Near">
            <Input size="lg" defaultValue="Lekki, Lagos" />
          </Field>
          <Button variant="primary" size="lg">Find tutors</Button>
        </div>
      </Scene>

      {/* Scene 2 — tutor registration */}
      <Scene
        label="Scene · tutor registration · step 1"
        title="Tutors fill these to claim a profile"
        description="The longest form in the product. We keep it spacious — one decision per row — and never ask for more than the screen needs at one time."
      >
        <div
          className="rounded-[18px]"
          style={{ background: 'var(--paper)', border: '1px solid var(--sheet-edge)', padding: '28px', maxWidth: '540px' }}
        >
          <div
            className="font-sans font-semibold uppercase mb-2"
            style={{ fontSize: '10.5px', letterSpacing: '0.22em', color: 'var(--ink-3)' }}
          >
            Step 1 of 4 · About you
          </div>
          <h2 className="font-serif font-medium mb-1" style={{ fontSize: '26px', letterSpacing: '-0.018em', color: 'var(--ink)', margin: '0 0 6px' }}>
            Tell us who you are
          </h2>
          <p className="text-[13px] mb-[22px]" style={{ color: 'var(--ink-3)', lineHeight: '1.6', margin: '0 0 22px' }}>
            Your full legal name and a photo go to our verification team. Students only ever see your first name and last initial.
          </p>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="First name">
                <Input defaultValue="Marcus" />
              </Field>
              <Field label="Last name" help={'Only the first letter — "K." — will show publicly.'}>
                <Input defaultValue="Kowalski" />
              </Field>
            </div>
            <Field label="Email · for sign-in only">
              <Input defaultValue="marcus@example.com" type="email" />
            </Field>
            <Field label="Phone · verification" error="This number isn't reachable. Try a different number — we'll text a 6-digit code.">
              <Input defaultValue="0801-555-200" error type="tel" />
            </Field>
            <Field label="A note for parents · 1–2 sentences" help="This appears in italic at the top of your profile.">
              <Textarea rows={3} defaultValue="I teach mathematics the way I wish I'd been taught — slowly, with the why before the how." />
            </Field>
          </div>
        </div>
      </Scene>

      <Section title="Variant reference">
        <RefBlock>
          <RefRow label="default · md">
            <Input placeholder="Subject — Further Maths, English, Chemistry…" />
          </RefRow>
          <RefRow label="focused">
            <Input defaultValue="Further Mathematics" className="border-[var(--green-500)] shadow-[0_0_0_3px_rgba(59,183,94,0.18)]" />
          </RefRow>
          <RefRow label="filled">
            <Input defaultValue="Lekki, Lagos" />
          </RefRow>
          <RefRow label="error">
            <Input defaultValue="0801-555-200" error />
          </RefRow>
          <RefRow label="disabled">
            <Input defaultValue="adenijiadewale12@gmail.com" disabled />
          </RefRow>
          <RefRow label="large · search">
            <Input size="lg" placeholder="What do you want to learn?" />
          </RefRow>
          <RefRow label="small · filter">
            <Input size="sm" defaultValue="Below ₦15,000 / hour" />
          </RefRow>
          <RefRow label="mono · price">
            <Input mono defaultValue="₦12,000" />
          </RefRow>
          <RefRow label="textarea">
            <Textarea rows={3} defaultValue="Marcus has been teaching A-Level Mathematics in Lekki for eight years…" />
          </RefRow>
        </RefBlock>
      </Section>
    </div>
  )
}
