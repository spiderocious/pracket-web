import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Switch, Case, Show } from 'meemaw'
import { Logo, Button, Input, Field, Textarea } from '@shared/ui'
import { DocCard } from '@shared/ui'
import { ROUTES } from '@shared/constants/routes'
import { useAuth } from '@features/auth/providers/use-auth'
import { isTutor } from '@shared/helpers'
import { useUpdateProfile, useMyCredentials, useSubmitCredential } from '../api/use-my-profile'
import type { LessonFormat, CredentialType } from '@shared/types'
import { ApiRequestError } from '@shared/api'

type Step = 'profile' | 'credentials' | 'done'

const LEVELS = ['Primary', 'GCSE', 'A-Level', 'University', 'Professional'] as const
const FORMATS: { label: string; value: LessonFormat }[] = [
  { label: 'Online', value: 'online' },
  { label: 'In-person', value: 'inPerson' },
  { label: 'Both', value: 'both' },
]
const CRED_TYPES: { label: string; value: CredentialType }[] = [
  { label: 'Degree certificate', value: 'degree' },
  { label: 'Government ID', value: 'governmentId' },
  { label: 'Reference letter', value: 'reference' },
]

interface StepIndicatorProps {
  current: Step
}

function StepIndicator({ current }: Readonly<StepIndicatorProps>) {
  const steps: Step[] = ['profile', 'credentials', 'done']
  const idx = steps.indexOf(current)
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.slice(0, 2).map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className={[
            'w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-medium',
            i <= idx ? 'bg-green-500 text-white' : 'bg-sheet border border-hair text-ink-4',
          ].join(' ')}>{i + 1}</div>
          {i < 1 && <div className={['h-px w-8', i < idx ? 'bg-green-500' : 'bg-hair'].join(' ')} />}
        </div>
      ))}
    </div>
  )
}

interface PillToggleProps {
  label: string
  active: boolean
  onClick: () => void
}

function PillToggle({ label, active, onClick }: Readonly<PillToggleProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'h-8 px-4 rounded-pill text-[12.5px] font-sans border transition-colors duration-quick',
        active ? 'bg-green-50 border-green-500 text-green-700 font-medium' : 'bg-sheet border-hair text-ink-2 hover:border-sheet-edge-2',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

export function TutorOnboardingScreen() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const updateProfile = useUpdateProfile()
  const credentialsQuery = useMyCredentials()
  const submitCredential = useSubmitCredential()

  const [step, setStep] = useState<Step>('profile')

  // Profile step state
  const [bio, setBio] = useState('')
  const [subjects, setSubjects] = useState('')
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [format, setFormat] = useState<LessonFormat>('online')
  const [location, setLocation] = useState('')
  const [rate, setRate] = useState('')
  const [profileError, setProfileError] = useState('')

  // Credentials step state
  const [fileKey, setFileKey] = useState('')
  const [credType, setCredType] = useState<CredentialType>('degree')
  const [credError, setCredError] = useState('')

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />
  if (!isTutor(user.role)) return <Navigate to={ROUTES.ROOT} replace />

  function toggleLevel(level: string) {
    setSelectedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    )
  }

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault()
    setProfileError('')
    try {
      await updateProfile.mutateAsync({
        bio,
        subjects: subjects.split(',').map(s => s.trim()).filter(Boolean),
        levels: selectedLevels,
        format,
        location,
        rate: Math.round(parseFloat(rate) * 100),
      })
      setStep('credentials')
    } catch (err) {
      setProfileError(err instanceof ApiRequestError ? err.message : 'Failed to save profile')
    }
  }

  async function handleAddCredential(e: React.FormEvent) {
    e.preventDefault()
    setCredError('')
    try {
      await submitCredential.mutateAsync({ fileKey, type: credType })
      setFileKey('')
    } catch (err) {
      setCredError(err instanceof ApiRequestError ? err.message : 'Failed to submit credential')
    }
  }

  const credentials = credentialsQuery.data ?? []

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[520px]">
        <div className="text-center mb-8">
          <Logo />
          <h1 className="font-serif font-medium text-[28px] tracking-display text-ink mt-4 mb-1">
            Set up your profile
          </h1>
          <p className="font-sans text-[14px] text-ink-3">Let students find and connect with you</p>
        </div>

        <StepIndicator current={step} />

        <Switch>
          <Case when={step === 'profile'}>
            <div className="bg-sheet rounded-[20px] border border-hair p-7">
              <h2 className="font-serif font-medium text-[20px] text-ink mb-5">Your teaching profile</h2>
              {profileError !== '' && (
                <div className="mb-4 px-4 py-3 rounded-[12px] bg-[var(--crit-bg)] border border-[var(--crit-edge)]">
                  <p className="font-sans text-[13px] text-[var(--crit)]">{profileError}</p>
                </div>
              )}
              <form onSubmit={handleProfileSubmit} className="grid gap-5">
                <Field label="Bio" help="Tell students about your teaching style and experience">
                  <Textarea
                    placeholder="Experienced A-Level Maths tutor based in London…"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    rows={4}
                  />
                </Field>
                <Field label="Subjects" help="Comma-separated, e.g. Mathematics, Physics">
                  <Input
                    placeholder="Mathematics, Further Maths"
                    value={subjects}
                    onChange={e => setSubjects(e.target.value)}
                  />
                </Field>
                <Field label="Levels">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {LEVELS.map(l => (
                      <PillToggle key={l} label={l} active={selectedLevels.includes(l)} onClick={() => toggleLevel(l)} />
                    ))}
                  </div>
                </Field>
                <Field label="Format">
                  <div className="flex gap-2">
                    {FORMATS.map(f => (
                      <PillToggle key={f.value} label={f.label} active={format === f.value} onClick={() => setFormat(f.value)} />
                    ))}
                  </div>
                </Field>
                <Field label="Location" help="City or area, e.g. London">
                  <Input placeholder="London" value={location} onChange={e => setLocation(e.target.value)} />
                </Field>
                <Field label="Hourly rate (₦)" help="Enter your rate in Naira, e.g. 6000">
                  <Input
                    type="number"
                    placeholder="6000"
                    value={rate}
                    onChange={e => setRate(e.target.value)}
                    mono
                  />
                </Field>
                <Button type="submit" variant="primary" block disabled={updateProfile.isPending}>
                  {updateProfile.isPending ? 'Saving…' : 'Continue'}
                </Button>
              </form>
            </div>
          </Case>

          <Case when={step === 'credentials'}>
            <div className="bg-sheet rounded-[20px] border border-hair p-7">
              <h2 className="font-serif font-medium text-[20px] text-ink mb-2">Identity verification</h2>
              <p className="font-sans text-[13px] text-ink-3 mb-5 leading-relaxed">
                Submit your degree, government ID, or a reference letter. Our team reviews credentials within 24 hours. You must be verified before students can connect with you.
              </p>

              {credError !== '' && (
                <div className="mb-4 px-4 py-3 rounded-[12px] bg-[var(--crit-bg)] border border-[var(--crit-edge)]">
                  <p className="font-sans text-[13px] text-[var(--crit)]">{credError}</p>
                </div>
              )}

              <Show when={credentials.length > 0}>
                <div className="grid gap-2 mb-5">
                  {credentials.map(cred => (
                    <DocCard
                      key={cred.id}
                      name={cred.type === 'degree' ? 'Degree certificate' : cred.type === 'governmentId' ? 'Government ID' : 'Reference letter'}
                      sub={cred.fileKey}
                      status={cred.reviewStatus === 'approved' ? 'verified' : 'review'}
                    />
                  ))}
                </div>
              </Show>

              <form onSubmit={handleAddCredential} className="grid gap-4">
                <Field label="Document type">
                  <div className="flex flex-wrap gap-2">
                    {CRED_TYPES.map(ct => (
                      <PillToggle key={ct.value} label={ct.label} active={credType === ct.value} onClick={() => setCredType(ct.value)} />
                    ))}
                  </div>
                </Field>
                <Field label="File key" help="The storage key for your uploaded document">
                  <Input
                    placeholder="deg_abc123"
                    value={fileKey}
                    onChange={e => setFileKey(e.target.value)}
                    mono
                  />
                </Field>
                <Button type="submit" variant="secondary" disabled={!fileKey || submitCredential.isPending}>
                  {submitCredential.isPending ? 'Submitting…' : 'Submit credential'}
                </Button>
              </form>

              <div className="mt-6 pt-5 border-t border-hair">
                <Button variant="primary" block onClick={() => navigate(ROUTES.TUTOR_DASHBOARD)}>
                  {credentials.length > 0 ? 'Go to dashboard' : 'Skip for now'}
                </Button>
              </div>
            </div>
          </Case>
        </Switch>
      </div>
    </div>
  )
}
