import { Search } from '@ui/icons'
import { Logo } from '@ui'

export function DiscoveryScreen() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white px-6 py-4 flex items-center gap-4">
        <Logo />
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input
            type="search"
            placeholder="Search by subject, level, or location…"
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Find a tutor</h1>
        <p className="text-neutral-500 mb-8">Browse verified tutors and connect in one step.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLACEHOLDER_TUTORS.map((tutor) => (
            <div key={tutor.id} className="bg-white rounded-xl border border-neutral-200 p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">
                  {tutor.initials}
                </div>
                <div>
                  <p className="font-medium text-neutral-900">{tutor.name}</p>
                  <p className="text-xs text-neutral-500">{tutor.subject}</p>
                </div>
                {tutor.verified && (
                  <span className="ml-auto text-xs bg-success-500/10 text-success-500 px-2 py-0.5 rounded-full font-medium">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-600 line-clamp-2">{tutor.bio}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-semibold text-neutral-900">£{tutor.rate}/hr</span>
                <button className="text-sm bg-brand-600 text-white px-4 py-1.5 rounded-lg hover:bg-brand-700 transition-colors">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

const PLACEHOLDER_TUTORS = [
  { id: '1', initials: 'AJ', name: 'Amara J.', subject: 'Mathematics · GCSE', bio: 'Making maths click for students since 2018. Specialist in algebra and calculus.', rate: 40, verified: true },
  { id: '2', initials: 'BK', name: 'Ben K.', subject: 'English · A-Level', bio: 'Oxford graduate helping students find their voice in writing and literature.', rate: 35, verified: true },
  { id: '3', initials: 'CL', name: 'Clara L.', subject: 'Biology · GCSE', bio: 'Former NHS nurse turned science tutor. Real-world examples for every concept.', rate: 38, verified: false },
]
