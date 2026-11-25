"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, ChevronDown } from "lucide-react"
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
        <div className="flex min-h-14 items-center gap-1 py-2 sm:min-h-[4.5rem] sm:gap-4">
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
              className="flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-gray-200 px-2.5 text-[clamp(0.75rem,3vw,1rem)] font-medium text-gray-800 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:gap-2 sm:px-4"
            >
              <span>{lang === "id" ? "Menu" : "Menu"}</span>
              <ChevronDown className={`size-4 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          id="main-navigation-menu"
          aria-hidden={!menuOpen}
          className={`grid transition-[grid-template-rows,opacity,transform] duration-300 ease-in-out ${
            menuOpen ? "grid-rows-[1fr] translate-y-0 opacity-100" : "pointer-events-none grid-rows-[0fr] -translate-y-2 opacity-0"
          }`}
        >
          <nav aria-label="Main navigation" className="min-h-0 overflow-hidden">
            <div className="mx-auto mb-3 flex max-w-7xl flex-col rounded-2xl border border-gray-200 bg-white p-2 shadow-lg sm:mb-4 sm:p-3">
              {navLinks.map(({ href, label, admin }) => (
                <Link
                  key={href}
                  href={href}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-[clamp(0.9375rem,2.8vw,1.125rem)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                    admin
                      ? "mt-1 bg-orange-500 text-white hover:bg-orange-600"
                      : "text-gray-800 hover:bg-orange-50 hover:text-orange-700"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
