"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"

interface HeaderProps {
  dict: any
  lang: string
}

export function Header({ dict, lang }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/explore`, label: dict.nav.tours },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
    { href: "/admin/tour-packages", label: lang === "id" ? "Login Admin" : "Admin Login", admin: true },
  ]

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex min-h-16 items-center gap-1 py-2 sm:gap-4">
          <Link
            href={`/${lang}`}
            onClick={() => setMenuOpen(false)}
            className="flex min-w-0 flex-1 items-center gap-1 text-[clamp(0.75rem,4vw,1.5rem)] font-bold text-black transition-colors hover:text-black sm:gap-2"
          >
            <ArrowUpRight className="size-[clamp(1rem,5vw,1.75rem)] shrink-0" aria-hidden="true" />
            <span className="truncate">Dolen Bareng Kang Pir</span>
          </Link>

          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <LanguageSwitcher currentLang={lang} />
            <button
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="main-navigation-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex size-10 items-center justify-center rounded-full text-gray-800 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              {menuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div
          id="main-navigation-menu"
          aria-hidden={!menuOpen}
          className={`relative left-1/2 grid w-screen -translate-x-1/2 transition-[grid-template-rows,opacity,transform] duration-300 ease-in-out ${
            menuOpen ? "grid-rows-[1fr] translate-y-0 opacity-100" : "pointer-events-none grid-rows-[0fr] -translate-y-2 opacity-0"
          }`}
        >
          <nav aria-label="Main navigation" className="min-h-0 overflow-hidden border-t border-gray-100">
            <div className="mx-auto max-w-7xl py-2 sm:py-3">
              <div className="flex flex-col">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-gray-100 px-3 py-3.5 text-[clamp(0.9375rem,2.8vw,1.125rem)] font-medium text-gray-700 transition-colors last:border-b-0 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:px-4"
                >
                  {label}
                </Link>
              ))}
              </div>
              <Link
                href={`/${lang}/contact`}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
                className="mt-3 flex min-h-12 items-center justify-center rounded-sm bg-amber-400 px-4 py-3 text-center text-[clamp(0.9375rem,2.8vw,1.125rem)] font-semibold text-slate-900 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:mt-4"
              >
                {lang === "id" ? "Cek Ketersediaan" : "Check Availability"}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
