"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

const links = [
  { href: "#destinations", label: "Destinations" },
  { href: "#packages", label: "Packages" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? "bg-white/95 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          <a href="/" className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-semibold tracking-tight" onClick={() => setIsMenuOpen(false)}>
            Tour Guide
          </a>

          <Button
            type="button"
            variant="outline"
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-full gap-2 px-4 text-[clamp(0.875rem,1.5vw,1rem)]"
          >
            Menu
            <ChevronDown size={16} className={`transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`} />
          </Button>
        </div>
      </div>

      <div
        id="site-navigation-menu"
        aria-hidden={!isMenuOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 sm:pb-6">
            <div className="rounded-2xl border border-border bg-background p-2 sm:p-3 shadow-lg">
              {links.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-[clamp(0.9375rem,1.7vw,1.125rem)] font-medium text-foreground/75 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {label}
                </a>
              ))}
              <a
                href="#packages"
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 block rounded-full bg-primary px-5 py-3 text-center text-[clamp(0.9375rem,1.7vw,1.125rem)] font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
