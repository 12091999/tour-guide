import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { GeistSans } from "geist/font/sans"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Dolan Bareng Kang Pir",
    template: "%s | Tour Guide Banyuwangi",
  },
  description:
    "Plan your Banyuwangi trip with local destination guides, tour ideas, and direct WhatsApp support from Dolan Bareng Kang Pir. Explore the best of Banyuwangi with our expert guidance.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} ${poppins.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
