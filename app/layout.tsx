import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Tour Guide Banyuwangi| Banyuwangi, Indonesia",
    template: "%s | Tour Guide Banyuwangi",
  },
  description:
    "Plan your Banyuwangi trip with local destination guides, tour ideas, and direct WhatsApp support from Tour Guide Banyuwangi.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
