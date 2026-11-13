
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
import { Globe } from "lucide-react"

const languages = [
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "en-au", name: "English (Australia)", flag: "🇦🇺" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
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
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent"
        >
          <Globe className="h-4 w-4" />
          {currentLanguage.flag} {currentLanguage.name}
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
