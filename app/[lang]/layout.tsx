
import type React from "react"
import type { Metadata } from "next"
import { supportedLanguages, isSupportedLanguage } from "./dictionaries"
import { siteName } from "@/lib/metadata"

export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const currentLang = isSupportedLanguage(lang) ? lang : "en"
  return {
    openGraph: {
      siteName,
      locale: currentLang === "id" ? "id_ID" : "en_US",
      alternateLocale: currentLang === "id" ? ["en_US"] : ["id_ID"],
    },
  }
}

export default function LangLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
