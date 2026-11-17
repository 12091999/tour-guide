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
    path: "/privacy",
    title: currentLang === "id" ? "Kebijakan Privasi" : "Privacy Policy",
    description: currentLang === "id"
      ? "Kebijakan privasi Tour Guide Banyuwangi — cara kami mengelola dan melindungi data Anda."
      : "Tour Guide Banyuwangi privacy policy — how we handle and protect your data.",
  })
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isSupportedLanguage(lang)) notFound()
  const [dict, config] = await Promise.all([getDictionary(lang), getSiteConfig()])
  return <div className="min-h-screen bg-background"><Header dict={dict} lang={lang} /><PolicyPage kind="privacy" lang={lang} email={config.business_email} /><Footer dict={dict} lang={lang} /></div>
}
