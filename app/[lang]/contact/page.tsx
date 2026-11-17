import type { Metadata } from "next"
import { getDictionary, isSupportedLanguage } from "../dictionaries"
import { buildMeta } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const currentLang = isSupportedLanguage(lang) ? lang : "en"
  const isId = currentLang === "id"
  return buildMeta({
    lang: currentLang,
    path: "/contact",
    title: isId ? "Hubungi Kami" : "Contact Us",
    description: isId
      ? "Hubungi Tour Guide Banyuwangi via WhatsApp atau email. Kami siap membantu perencanaan perjalanan Anda."
      : "Contact Tour Guide Banyuwangi via WhatsApp or email. We're ready to help plan your trip.",
  })
}
import { getSiteConfig } from "@/lib/actions/config"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { getWhatsAppUrl } from "@/lib/whatsapp"
import Link from "next/link"

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const currentLang = isSupportedLanguage(lang) ? lang : "en"
  const [dict, config] = await Promise.all([getDictionary(currentLang), getSiteConfig()])
  const { business_whatsapp: phone, business_email: email } = config

  return (
    <div className="min-h-screen bg-background">
      <Header dict={dict} lang={currentLang} />

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-teal-800 via-cyan-700 to-orange-500 py-16 text-white">
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-amber-300/25 blur-3xl" />
        <div className="absolute -bottom-48 -left-20 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{dict.contact.title}</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">{dict.contact.info.description}</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm dict={dict} email={email} />

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{dict.contact.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href={getWhatsAppUrl(currentLang === "id" ? "Halo Tour Guide, saya ingin bertanya tentang wisata Banyuwangi." : "Hi Tour Guide, I would like to ask about trips in Banyuwangi.", phone)} target="_blank" rel="noreferrer" className="mb-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-700">
                    <MessageCircle className="h-5 w-5" />{currentLang === "id" ? "Pesan via WhatsApp" : "Message us on WhatsApp"}
                  </Link>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{dict.contact.phone}</p>
                      <Link href={getWhatsAppUrl(currentLang === "id" ? "Halo Tour Guide, saya ingin menghubungi tim Anda." : "Hi Tour Guide, I would like to contact your team.", phone)} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">+{phone} (WhatsApp)</Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{dict.contact.email}</p>
                      <Link href={`mailto:${email}`} className="text-muted-foreground hover:text-primary">{email}</Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{dict.contact.address}</p>
                      <p className="text-muted-foreground">Bumi Blambangan, Jawa Timur, Indonesia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{dict.contact.info.officeHours}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{dict.contact.info.mondayFriday}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{dict.contact.info.saturday}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{dict.contact.info.sunday}</span>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>

      <Footer dict={dict} lang={currentLang} />
    </div>
  )
}
