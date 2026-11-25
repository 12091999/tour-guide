import { getDictionary, isSupportedLanguage } from "../dictionaries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { getWhatsAppUrl } from "@/lib/whatsapp"

export default async function ContactPage({
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

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-teal-800 via-cyan-700 to-orange-500 py-16 text-white">
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
            <ContactForm dict={dict} />

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{dict.contact.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a href={getWhatsAppUrl(currentLang === "id" ? "Halo Dolan Bareng Kang Pir bertanya tentang wisata Banyuwangi." : "Hi Dolan Bareng Kang Pir, I would like to ask about trips in Banyuwangi.")} target="_blank" rel="noreferrer" className="mb-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-700">
                    <MessageCircle className="h-5 w-5" />{currentLang === "id" ? "Pesan via WhatsApp" : "Message us on WhatsApp"}
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{dict.contact.phone}</p>
                      <a href={getWhatsAppUrl(currentLang === "id" ? "Halo Dolan Bareng Kang Pir, saya ingin menghubungi tim Anda." : "Hi Dolan Bareng Kang Pir, I would like to contact your team.")} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">+62 877-7591-6086 (WhatsApp)</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{dict.contact.email}</p>
                      <a href="mailto:DolanBarengKangPir@gmail.com" className="text-muted-foreground hover:text-primary">DolanBarengKangPir@gmail.com</a>
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
