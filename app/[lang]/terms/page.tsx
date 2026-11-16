import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PolicyPage } from "@/components/policy-page"
import { getDictionary, isSupportedLanguage } from "../dictionaries"

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isSupportedLanguage(lang)) notFound()
  const dict = await getDictionary(lang)
  return <div className="min-h-screen bg-background"><Header dict={dict} lang={lang} /><PolicyPage kind="terms" lang={lang} /><Footer dict={dict} lang={lang} /></div>
}
