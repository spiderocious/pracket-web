import { LandingNav } from './parts/landing-nav'
import { HeroSection } from './parts/hero-section'
import { HowItWorksSection } from './parts/how-it-works'
import { ForSection } from './parts/for-section'
import { TrustSection } from './parts/trust-section'
import { TutorSpotlightSection } from './parts/tutor-spotlight'
import { SundayNotesSection } from './parts/sunday-notes'
import { CtaBand } from './parts/cta-band'
import { LandingFooter } from './parts/landing-footer'

export function LandingScreen() {
  return (
    <div className="min-h-screen bg-paper">
      <LandingNav />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ForSection />
        <TrustSection />
        <TutorSpotlightSection />
        <SundayNotesSection />
        <CtaBand />
      </main>
      <LandingFooter />
    </div>
  )
}
