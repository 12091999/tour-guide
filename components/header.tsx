import Link from "next/link"
import { LanguageSwitcher } from "./language-switcher"
import { Mountain, Zap } from "lucide-react"

interface HeaderProps {
  dict: any
  lang: string
}

export function Header({ dict, lang }: HeaderProps) {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <div className="flex items-center gap-1">
              <Mountain className="h-7 w-7" />
              <Zap className="h-5 w-5 text-red-500" />
            </div>
            Georgia Extreme Tours
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href={`/${lang}`} className="hover:text-orange-600 transition-colors font-medium">
              {dict.nav.home}
            </Link>
            <Link href={`/${lang}/tours`} className="hover:text-orange-600 transition-colors font-medium">
              {dict.nav.tours}
            </Link>
            <Link href={`/${lang}/about`} className="hover:text-orange-600 transition-colors font-medium">
              {dict.nav.about}
            </Link>
            <Link href={`/${lang}/contact`} className="hover:text-orange-600 transition-colors font-medium">
              {dict.nav.contact}
            </Link>
          </nav>

          <LanguageSwitcher currentLang={lang} />
        </div>
      </div>
    </header>
  )
}
