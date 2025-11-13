"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

export function Navbar() {
  const scrollToForm = () => {
    const formElement = document.getElementById("matchmaking-form")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="logo2.png" alt="Stumble Logo" width={40} height={40} />
              <span className="ml-2 text-2xl font-bold text-primary">Stumble</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </Link>
              <button
                onClick={scrollToForm}
                className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Match
              </button>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
