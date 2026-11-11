
import type React from "react"

export async function generateStaticParams() {
  return [
    { lang: "ka" },
    { lang: "en" },
    { lang: "ru" },
  ]
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
