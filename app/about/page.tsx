import { MatchmakingForm } from "@/components/matchmaking-form"

import { Navbar } from "@/components/navbar"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Intro Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">About Stumble</h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
                Connecting students through intelligent study partner matching
              </p>
            </div>

            {/* Mission & How It Works */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Stumble was created to solve one of the biggest challenges students face: finding the right study
                    partners. We believe that collaborative learning is more effective, engaging, and enjoyable when
                    you're matched with peers who complement your academic strengths and learning style.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Our AI-powered clustering algorithm analyzes your academic profile, including your strong subjects,
                    areas where you need help, preferred study style, and scheduling preferences. It then matches you
                    with students who have complementary skills and compatible learning approaches.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Why Choose Stumble */}
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-8">Why Choose Stumble?</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-primary rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Smart Matching</h3>
                  <p className="text-muted-foreground">
                    Our algorithm considers multiple factors to find your ideal study partners, not just subject
                    overlap.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-accent rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Flexible Scheduling</h3>
                  <p className="text-muted-foreground">
                    Match with students who share your availability and preferred study session frequency.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-primary rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Cross-Branch Learning</h3>
                  <p className="text-muted-foreground">
                    Choose to connect within your branch or explore interdisciplinary study opportunities.
                  </p>
                </div>
              </div>
            </div>

            {/* Match Form Section */}
            <div id="matchmaking-form" className="mt-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                Find Your Study Matches
              </h2>
              <MatchmakingForm />
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <Card className="shadow-lg bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-2xl">Ready to Find Your Study Partners?</CardTitle>
                  <CardDescription className="text-lg">
                    Join thousands of students who have improved their academic performance through collaborative
                    learning.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href="/#matchmaking-form"
                    className="inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 py-6 text-lg"
                  >
                    Get Started Now
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
