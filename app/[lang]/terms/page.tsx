import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PolicyPage } from "@/components/policy-page"
import { getDictionary, isSupportedLanguage } from "../dictionaries"
import { getSiteConfig } from "@/lib/actions/config"
import { buildMeta } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const currentLang = isSupportedLanguage(lang) ? lang : "en"
  return buildMeta({
    lang: currentLang,
    path: "/terms",
    title: currentLang === "id" ? "Syarat Layanan" : "Terms of Service",
    description: currentLang === "id"
      ? "Syarat dan ketentuan layanan Tour Guide Banyuwangi."
      : "Tour Guide Banyuwangi terms and conditions of service.",
  })
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isSupportedLanguage(lang)) notFound()
  const [dict, config] = await Promise.all([getDictionary(lang), getSiteConfig()])
  return <div className="min-h-screen bg-background"><Header dict={dict} lang={lang} /><PolicyPage kind="terms" lang={lang} email={config.business_email} /><Footer dict={dict} lang={lang} /></div>
}
