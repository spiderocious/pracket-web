import { useState } from 'react'
import { Checkbox, PillRadio, RadioDot, Toggle, ToggleRow } from '@shared/ui/selection'
import { RefBlock, RefRow, Scene, Section } from './preview-canvas'

const SUBJECTS = ['Further Mathematics', 'English Literature', 'Chemistry', 'Physics', 'Biology', 'Economics', 'Government', 'Yoruba']

const EXAMS = [
  { id: 'waec', label: 'WAEC · West African Examinations', desc: 'May/June and Nov/Dec sittings. Most Lagos tutors focus here.' },
  { id: 'alevel', label: 'A-Level · Cambridge / Edexcel', desc: 'For students applying to UK and Commonwealth universities.' },
  { id: 'sat', label: 'SAT · College Board', desc: 'For students applying to US universities.' },
  { id: 'jamb', label: 'JAMB · UTME', desc: 'For Nigerian university admission.' },
]

export function SelectionPart() {
  const [subject, setSubject] = useState('Further Mathematics')
  const [exams, setExams] = useState(new Set(['waec', 'alevel']))
  const [showInSearch, setShowInSearch] = useState(true)
  const [emailDigest, setEmailDigest] = useState(false)

  function toggleExam(id: string) {
    setExams((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div>
      <div className="mb-9">
        <div className="font-mono uppercase mb-1 text-[11px]" style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
          12 / PRIMITIVES
        </div>
        <h1 className="font-serif font-medium" style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}>
          Selection
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          Checkbox · radio · toggle · pill
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        Selection controls borrow the brand green only when they're <em>chosen</em>. Otherwise they
        sit quietly in sheet-edge grey. The pill is the workhorse for filter chips — large enough to
        read, soft enough to feel like paper.
      </p>

      {/* Scene 1 — pill radio */}
      <Scene
        label="Scene · search filters · subjects"
        title={'Pill-radio for "what do you want learned?"'}
        description="A parent picks one subject at a time. Pills are friendly without being cartoonish; they read as printed labels, not buttons."
      >
        <div className="flex flex-wrap gap-[10px]">
          {SUBJECTS.map((s) => (
            <PillRadio key={s} label={s} checked={subject === s} onChange={() => setSubject(s)} />
          ))}
        </div>
      </Scene>

      {/* Scene 2 — checkbox rows */}
      <Scene
        label="Scene · search filters · level"
        title={'Multi-checkbox for "exam they\'re sitting"'}
        description="A student may be preparing for two exams at once. Checked rows tint pale sage so the choice is felt, not just seen."
      >
        <div className="grid gap-[10px]" style={{ maxWidth: '460px' }}>
          {EXAMS.map((e) => (
            <Checkbox
              key={e.id}
              label={e.label}
              description={e.desc}
              checked={exams.has(e.id)}
              onChange={() => toggleExam(e.id)}
            />
          ))}
        </div>
      </Scene>

      {/* Scene 3 — toggles */}
      <Scene
        label="Scene · tutor settings · availability"
        title={'Toggle for "show me in search results"'}
        description="Used in tutor settings. Toggles never carry meaning beyond on/off — anything more complex becomes a radio set."
      >
        <div className="grid gap-3" style={{ maxWidth: '540px' }}>
          <ToggleRow
            heading="Show me in search results"
            description="When off, your profile is hidden from search. Existing conversations stay open."
            checked={showInSearch}
            onChange={() => setShowInSearch((v) => !v)}
          />
          <ToggleRow
            heading="Email me when a parent reads my profile"
            description="A daily digest, not per-view. We will never email you more than once a day."
            checked={emailDigest}
            onChange={() => setEmailDigest((v) => !v)}
          />
        </div>
      </Scene>

      <Section title="Reference">
        <RefBlock>
          <RefRow label="checkbox · off"><Checkbox /></RefRow>
          <RefRow label="checkbox · on"><Checkbox checked onChange={() => undefined} /></RefRow>
          <RefRow label="radio · off"><RadioDot /></RefRow>
          <RefRow label="radio · on"><RadioDot checked /></RefRow>
          <RefRow label="toggle · off"><Toggle /></RefRow>
          <RefRow label="toggle · on"><Toggle checked /></RefRow>
          <RefRow label="pill · off"><PillRadio label="Chemistry" /></RefRow>
          <RefRow label="pill · on"><PillRadio label="Chemistry" checked /></RefRow>
        </RefBlock>
      </Section>
    </div>
  )
}
