import { DocCard, PriceBand, RadiusSlider, SubjectPicker, UploadZone, WeekGrid } from '@shared/ui/tutor-inputs'
import { Scene } from './preview-canvas'

export function TutorInputsPart() {
  return (
    <div>
      <div className="mb-9">
        <div className="font-mono uppercase mb-1 text-[11px]" style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
          13 / PRIMITIVES
        </div>
        <h1 className="font-serif font-medium" style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}>
          Tutor-specific inputs
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          Subject · radius · price · availability · evidence
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        The inputs no other system needs in quite this form: the <em>subject</em> picker (typeahead with
        curriculum hints), the <em>distance radius</em> for local lessons, the <em>price band</em> a
        parent will pay, the <em>weekly availability</em> grid a tutor publishes, and the{' '}
        <em>evidence</em> upload (degree certs, ID) — each shown as its own scene.
      </p>

      <Scene
        label="Scene · search · subject picker"
        title="Type to find · curriculum hints attached"
        description={'A parent types "math" and we suggest the exam-bound versions of the subject so the search lands in the right pool.'}
      >
        <SubjectPicker
          query="math"
          results={[
            { label: 'Further Mathematics', sub: 'A-Level · 142 tutors', selected: true },
            { label: 'Mathematics', sub: 'WAEC + IGCSE · 318 tutors' },
            { label: 'Additional Maths', sub: 'IGCSE · 56 tutors' },
            { label: 'Mathematics', sub: 'JAMB UTME · 84 tutors' },
            { label: 'Quantitative Reasoning', sub: 'Common Entrance · 22 tutors' },
          ]}
        />
      </Scene>

      <Scene
        label="Scene · search · distance"
        title={'Radius slider · "within 12 km of Lekki"'}
        description="A single thumb on a track, in the brand green. The readout is mono so the number reads as a measurement."
      >
        <RadiusSlider label="Distance from Lekki, Lagos" value={12} fillPct={55} />
      </Scene>

      <Scene
        label="Scene · search · price band"
        title={'Two-thumb band · "what we\'ll pay per hour"'}
        description="A parent sets a range. The fill between thumbs is brand green; the rest is sheet-edge."
      >
        <PriceBand min={4000} max={14000} minPct={18} maxPct={68} />
      </Scene>

      <Scene
        label="Scene · tutor settings · availability"
        title="Weekly availability grid"
        description="Tutor taps blocks of time they're available. Pale sage = available; recessed = already-booked. No-one is shown a slot a tutor hasn't published."
      >
        <div style={{ overflowX: 'auto' }}>
          <WeekGrid />
        </div>
      </Scene>

      <Scene
        label="Scene · tutor registration · evidence"
        title="Upload a degree certificate or ID"
        description="Tutors upload documents to the verification team. Files sit in their profile as quiet cards, never as badges."
      >
        <UploadZone />
        <div className="mt-4 grid gap-2">
          <DocCard
            name="Cambridge BSc (Hons) Mathematics · 2016"
            sub="marcus-degree.pdf · 1.2 MB"
            status="review"
          />
          <DocCard
            name="National Identification card"
            sub="id-marcus-k.jpg · 820 KB"
            status="verified"
          />
        </div>
      </Scene>
    </div>
  )
}
