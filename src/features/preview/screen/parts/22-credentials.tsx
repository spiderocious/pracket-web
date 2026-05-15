import { CredentialList, CredentialRow, EvidenceRow, NoteCard } from '@shared/ui/credentials'
import { Scene } from './preview-canvas'

export function CredentialsPart() {
  return (
    <div>
      <div className="mb-9">
        <div className="font-mono uppercase mb-1 text-[11px]" style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
          22 / DATA &amp; STATE
        </div>
        <h1 className="font-serif font-medium" style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}>
          Credentials &amp; evidence
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          The proof a parent reads · no stars, no badges
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        Pracket does not show star ratings. Stars are gamification dressed as trust — they reward
        popularity, not quality. Instead, every tutor is read as the sum of three proofs:{' '}
        <strong style={{ color: 'var(--ink)' }}>credentials</strong> (typeset as a printed CV),{' '}
        <strong style={{ color: 'var(--ink)' }}>evidence</strong> (documents on file, marked verified
        or under review), and <strong style={{ color: 'var(--ink)' }}>thought</strong> (the tutor's
        own Sunday notes, in their voice).
      </p>

      <Scene
        label="Scene · profile · credentials block"
        title="Education &amp; teaching history"
        description="Year column in mono, title in Fraunces. Reads like the back of a published book."
      >
        <CredentialList>
          <CredentialRow year="2016" title="BSc Mathematics (Hons.)" where="University of Cambridge · Trinity College" status="verified" />
          <CredentialRow year="2018" title="PGCE Secondary · Mathematics" where="Institute of Education · UCL" status="verified" />
          <CredentialRow year="2018–2021" title="Mathematics teacher" where="St. Paul's School · London" status="review" />
          <CredentialRow year="2022–" title="Private tutor · A-Level and SAT preparation" where="Lagos, Nigeria · 142 students taught" status="verified" />
        </CredentialList>
      </Scene>

      <Scene
        label="Scene · profile · documents on file"
        title="What our verification team has seen"
        description="Parents can see what's been submitted and confirmed — without ever seeing the documents themselves. The trust is in the verification, not the disclosure."
      >
        <div className="grid gap-3">
          <EvidenceRow name="Cambridge BSc Mathematics certificate" sub="PDF · uploaded Aug 2024" status="verified" />
          <EvidenceRow name="UCL PGCE Mathematics certificate" sub="PDF · uploaded Aug 2024" status="verified" />
          <EvidenceRow name="National Identification" sub="JPEG · uploaded Aug 2024" status="verified" icon="id" />
          <EvidenceRow name="Reference · Head of Maths, St. Paul's London" sub="Email · awaiting response from referee" status="review" />
        </div>
      </Scene>

      <Scene
        label="Scene · profile · proof of thought"
        title="Marcus's Sunday note · 12 Apr 2026"
        description="A tutor's own writing is the strongest signal of how they teach. Each tutor's most recent note appears on their profile as a single excerpt — full archive available behind a 'read more.'"
      >
        <NoteCard date="12 April 2026 · Sunday note" title={'"Why the second derivative isn\'t \'the slope of the slope\'"'} moreCount={23}>
          <p style={{ margin: '0 0 12px' }}>
            Most students arrive at the second derivative thinking it is just the slope of the slope.
            That's true the way <em>nutrition</em> is just the sugar in the apple. It is technically
            correct and it explains nothing.
          </p>
          <p style={{ margin: 0 }}>
            The second derivative tells you how a quantity's rate of change is itself changing — which
            is the same thing, but said with a tense that makes it matter. A ball thrown straight up has
            a velocity that is shrinking, then negative, then growing more negative. The thing that
            doesn't change is the acceleration: minus 9.8. The second derivative is the calm thing under
            the noisy thing.
          </p>
        </NoteCard>
      </Scene>
    </div>
  )
}
