import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Georgia Tours - Discover the Beauty of Georgia",
  description: "Explore Georgia's unique culture, history, and natural beauty with our exclusive tours",
}

export async function generateStaticParams() {
  return [{ lang: "ka" }, { lang: "en" }, { lang: "ru" }]
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  return (
    <html lang={(params as any).lang}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
