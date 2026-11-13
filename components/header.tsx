
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"

interface HeaderProps {
  dict: any
  lang: string
}

export function Header({ dict, lang }: HeaderProps) {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 text-2xl font-bold text-black hover:text-black transition-colors"
          >
            <ArrowUpRight className="h-7 w-7" aria-hidden="true" />

            Tour Guide
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href={`/${lang}`}
              className="hover:text-orange-600 transition-colors font-medium"
            >
              {dict.nav.home}
            </Link>

            <Link
              href={`/${lang}/tours`}
              className="hover:text-orange-600 transition-colors font-medium"
            >
              {dict.nav.tours}
            </Link>

            <Link
              href={`/${lang}/about`}
              className="hover:text-orange-600 transition-colors font-medium"
            >
              {dict.nav.about}
            </Link>

            <Link
              href={`/${lang}/contact`}
              className="hover:text-orange-600 transition-colors font-medium"
            >
              {dict.nav.contact}
            </Link>
          </nav>

          {/* Language Switcher */}
          <LanguageSwitcher currentLang={lang} />

        </div>
      </div>
    </header>
  )
}
