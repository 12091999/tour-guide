
"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  Button,
} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languages = [
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "en", name: "English", flag: "🇬🇧" },
]

interface LanguageSwitcherProps {
  currentLang: string
}

export function LanguageSwitcher({
  currentLang,
}: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (newLang: string) => {
    if (!pathname || newLang === currentLang) return

    const segments = pathname.split("/")

    // Replace current language segment
    segments[1] = newLang

    const newPath = segments.join("/") || `/${newLang}`

    router.push(newPath)
  }

  const currentLanguage =
    languages.find((language) => language.code === currentLang) ??
    languages.find((language) => language.code === "en")!

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={currentLanguage.name}
          className="size-10 rounded-full p-0 text-lg hover:bg-gray-100"
        >
          <span aria-hidden="true">{currentLanguage.flag}</span>
          <span className="sr-only">{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className="gap-2 cursor-pointer"
          >
            {language.flag} {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
