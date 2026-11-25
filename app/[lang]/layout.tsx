
import type React from "react"
import { supportedLanguages } from "./dictionaries"

export const dynamicParams = false

export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }))
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
