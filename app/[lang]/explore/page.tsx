import type { Metadata } from "next"
import { getDictionary, isSupportedLanguage } from "../dictionaries"
import { buildMeta } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const currentLang = isSupportedLanguage(lang) ? lang : "en"
  const isId = currentLang === "id"
  return buildMeta({
    lang: currentLang,
    path: "/explore",
    title: isId ? "Semua Destinasi Wisata Banyuwangi" : "All Banyuwangi Destinations",
    description: isId
      ? "Temukan semua destinasi wisata Banyuwangi — Kawah Ijen, Hutan Djawatan, Teluk Hijau, Pulau Merah, dan lebih banyak lagi."
      : "Browse all Banyuwangi tour destinations — Ijen Crater, Djawatan Forest, Teluk Hijau, Pulau Merah, and more.",
  })
}
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { ExtraDestinations } from "@/components/extra-destinations"

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const currentLang = isSupportedLanguage(lang) ? lang : "en"
  const dict = await getDictionary(currentLang)

  return (
    <div className="min-h-screen bg-background">
      <Header dict={dict} lang={currentLang} />
      <main className="pt-16">
        <FeaturedDestinations lang={currentLang} dict={dict} />
        <ExtraDestinations lang={currentLang} />
      </main>
      <Footer dict={dict} lang={currentLang} />
    </div>
  )
}
