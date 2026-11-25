
"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface LanguageSwitcherProps {
  currentLang: string
}

export function LanguageSwitcher({
  currentLang,
}: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  const nextLang = currentLang === "id" ? "en" : "id"
  const nextLanguageLabel = nextLang === "en" ? "English" : "Bahasa Indonesia"

  const switchLanguage = () => {
    if (!pathname) return

    const segments = pathname.split("/")

    segments[1] = nextLang

    const newPath = segments.join("/") || `/${nextLang}`

    router.push(newPath)
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-label={`Switch language to ${nextLanguageLabel}`}
      title={nextLanguageLabel}
      onClick={switchLanguage}
      className="h-10 min-w-12 rounded-full px-2 font-semibold hover:bg-gray-100"
    >
      {nextLang.toUpperCase()}
    </Button>
  )
}
