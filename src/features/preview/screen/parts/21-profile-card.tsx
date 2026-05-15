import { Button } from '@shared/ui/button'
import { ProfileCard } from '@shared/ui/profile-card'
import { Scene } from './preview-canvas'

export function ProfileCardPart() {
  return (
    <div>
      <div className="mb-9">
        <div className="font-mono uppercase mb-1 text-[11px]" style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
          21 / DATA &amp; STATE
        </div>
        <h1 className="font-serif font-medium" style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}>
          Tutor profile card
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          B-style card · locked in Act III
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        The profile card is calm and sans-only by deliberate decision. The list row uses Fraunces serif to
        feel editorial; the profile card uses Inter to feel like a faculty page — the same person, two
        different registers.
      </p>

      <Scene
        label="Scene · hover-preview · the peek"
        title="Hover a row · see the card"
        description="A row hover surfaces the card without leaving the page. Same data the full profile carries, in the shape a parent can scan in three seconds."
      >
        <div style={{ maxWidth: '460px' }}>
          <ProfileCard
            name="Marcus K."
            role="Further Mathematics & Physics tutor · Lekki, Lagos"
            blurb="I teach mathematics the way I wish I'd been taught — slowly, with the why before the how. Eight years working with students preparing for WAEC, SAT and Cambridge A-Levels."
            meta={[
              { label: 'Teaching', value: '8 years' },
              { label: 'Students', value: '142' },
              { label: 'Rate', value: '₦12,000 / hour' },
              { label: 'Connect fee', value: '₦2,500' },
            ]}
          >
            <Button variant="primary">Connect with Marcus</Button>
            <Button variant="secondary">View profile</Button>
          </ProfileCard>
        </div>
      </Scene>

      <Scene
        label={'Scene · side-by-side · "compare these two"'}
        title="Two profile cards on the canvas"
        description="Some parents land on Pracket with a shortlist already. The card layout makes side-by-side comparison work — the meta-grid lines up, the rate lines up."
      >
        <div className="grid gap-[22px]" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <ProfileCard
            name="Marcus K."
            role="Further Maths & Physics · Lekki, Lagos"
            blurb="Slowly, with the why before the how. Eight years preparing students for A-Level and SAT."
            meta={[
              { label: 'Teaching', value: '8 years' },
              { label: 'Students', value: '142' },
              { label: 'Rate', value: '₦12,000' },
              { label: 'Connect fee', value: '₦2,500' },
            ]}
          >
            <Button variant="primary">Connect</Button>
          </ProfileCard>
          <ProfileCard
            name="Aisha O."
            role="Further Maths · Victoria Island, Lagos"
            blurb="Patient explainer. Six years of WAEC and Cambridge results; one Schmidt scholar in 2025."
            meta={[
              { label: 'Teaching', value: '6 years' },
              { label: 'Students', value: '87' },
              { label: 'Rate', value: '₦9,500' },
              { label: 'Connect fee', value: '₦2,500' },
            ]}
          >
            <Button variant="primary">Connect</Button>
          </ProfileCard>
        </div>
      </Scene>

      <Scene
        label="Scene · gallery · saved-for-later"
        title="Three cards in the parent's saved list"
        description="Cards survive at smaller widths. Three across is the cap; more than that pushes the layout toward grid-feel, which the brief rejects."
      >
        <div className="grid gap-[22px]" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            { name: 'Marcus K.', role: 'Further Maths · Lekki', blurb: 'Slowly, with the why before the how.', rate: '₦12,000 / hr' },
            { name: 'Aisha O.', role: 'Further Maths · VI', blurb: 'Patient explainer. Six years of results.', rate: '₦9,500 / hr' },
            { name: 'Tunde A.', role: 'Further Maths · Yaba', blurb: 'Twelve years of patient drill before insight.', rate: '₦15,000 / hr' },
          ].map((t) => (
            <ProfileCard
              key={t.name}
              name={t.name}
              role={t.role}
              blurb={t.blurb}
              meta={[{ label: 'Rate', value: t.rate }]}
            >
              <Button variant="primary" size="sm">Connect</Button>
            </ProfileCard>
          ))}
        </div>
      </Scene>
    </div>
  )
}
