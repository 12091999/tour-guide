import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tourguide-banyuwangi.com"),
  title: {
    default: "Tour Guide Banyuwangi | Destinasi Wisata Lokal",
    template: "%s | Tour Guide Banyuwangi",
  },
  description:
    "Discover Banyuwangi with Tour Guide. Expert local guides for Ijen Crater, Djawatan Forest, Teluk Hijau, and more destinations in East Java, Indonesia.",
  keywords: ["Banyuwangi", "tour guide", "Ijen Crater", "Kawah Ijen", "Djawatan Forest", "tours Indonesia", "wisata Banyuwangi"],
  openGraph: {
    type: "website",
    siteName: "Tour Guide Traveller",
    images: [{ url: "/ijen.jpg", width: 1200, height: 630, alt: "Kawah Ijen – Banyuwangi, Indonesia" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/ijen.jpg"],
  },
  robots: { index: true, follow: true },
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
