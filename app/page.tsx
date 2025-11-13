import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MatchmakingForm } from "@/components/matchmaking-form"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MatchmakingForm />
    </main>
  )
}
