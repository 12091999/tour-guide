
import Link from "next/link"
import { ArrowUpRight, Menu } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"

interface HeaderProps {
  dict: any
  lang: string
}

export function Header({ dict, lang }: HeaderProps) {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex min-w-0 items-center justify-between gap-2 sm:gap-4">

          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex min-w-0 items-center gap-1.5 text-lg font-bold text-black transition-colors hover:text-black sm:gap-2 sm:text-2xl"
          >
            <ArrowUpRight className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" aria-hidden="true" />

            <span className="truncate">Tour Guide</span>
          </Link>

          {/* Navigation */}
          <nav aria-label="Main navigation" className="hidden items-center space-x-4 lg:flex xl:space-x-6">
            <Link
              href={`/${lang}`}
              className="hover:text-orange-600 transition-colors font-medium"
            >
              {dict.nav.home}
            </Link>

            <Link
              href={`/${lang}/explore`}
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
          <div className="ml-auto shrink-0 lg:ml-0">
            <LanguageSwitcher currentLang={lang} />
          </div>

          {/* Compact navigation for phones and tablets */}
          <details className="group relative shrink-0 lg:hidden">
            <summary
              aria-label="Open navigation menu"
              className="flex size-10 cursor-pointer list-none items-center justify-center rounded-md border border-gray-200 text-gray-800 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 [&::-webkit-details-marker]:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
              <span className="sr-only">Menu</span>
            </summary>
            <nav
              aria-label="Main navigation"
              className="absolute right-0 top-full z-50 mt-2 flex w-56 flex-col rounded-lg border bg-white p-2 shadow-lg"
            >
              <Link href={`/${lang}`} className="rounded-md px-3 py-2.5 font-medium hover:bg-orange-50 hover:text-orange-700">
                {dict.nav.home}
              </Link>
              <Link href={`/${lang}/explore`} className="rounded-md px-3 py-2.5 font-medium hover:bg-orange-50 hover:text-orange-700">
                {dict.nav.tours}
              </Link>
              <Link href={`/${lang}/about`} className="rounded-md px-3 py-2.5 font-medium hover:bg-orange-50 hover:text-orange-700">
                {dict.nav.about}
              </Link>
              <Link href={`/${lang}/contact`} className="rounded-md px-3 py-2.5 font-medium hover:bg-orange-50 hover:text-orange-700">
                {dict.nav.contact}
              </Link>
            </nav>
          </details>

        </div>
      </div>
    </header>
  )
}
