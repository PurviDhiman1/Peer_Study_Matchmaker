"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToForm = () => {
    const formElement = document.getElementById("matchmaking-form")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative py-20 sm:py-32 lg:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
            Stumble upon the <span className="text-primary">right study peers</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
            Connect with fellow students who share your academic goals. Our AI-powered matching system finds study
            partners based on your subjects, learning style, and preferences.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={scrollToForm} size="lg" className="text-lg px-8 py-6 rounded-xl">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl bg-transparent" asChild>
              <a href="/about">Learn More</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl"></div>
        </div>
      </div>
    </section>
  )
}
