import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PolicyPage } from "@/components/policy-page"
import { getDictionary, isSupportedLanguage } from "../dictionaries"
import { getSiteConfig } from "@/lib/actions/config"

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isSupportedLanguage(lang)) notFound()
  const [dict, config] = await Promise.all([getDictionary(lang), getSiteConfig()])
  return <div className="min-h-screen bg-background"><Header dict={dict} lang={lang} /><PolicyPage kind="privacy" lang={lang} email={config.business_email} /><Footer dict={dict} lang={lang} /></div>
}
