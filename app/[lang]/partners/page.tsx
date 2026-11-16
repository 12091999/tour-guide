import { ArrowUpRight, BedDouble, Bike, Utensils } from "lucide-react"
import { getDictionary, isSupportedLanguage } from "../dictionaries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { getWhatsAppUrl } from "@/lib/whatsapp"
import { getSiteConfig } from "@/lib/actions/config"
import Link from "next/link"

const copy: Record<string, { title: string; intro: string; recommended: string; dining: string; stays: string; mobility: string; contact: string; contactCta: string; note: string }> = {
  id: { title: "Mitra Lokal Tour Guide", intro: "Temukan pilihan tempat makan, penginapan, dan bantuan rental motor untuk perjalanan Anda di Banyuwangi.", recommended: "Pilihan lokal", dining: "Tempat Makan", stays: "Penginapan", mobility: "Rental Motor Roda Dua", contact: "Butuh bantuan mencari rental motor yang tersedia? Hubungi tim Tour Guide.", contactCta: "Hubungi Tour Guide", note: "Pilihan tempat pada halaman ini merupakan rekomendasi lokal. Ketersediaan dan layanan dapat berubah; silakan konfirmasi langsung." },
  en: { title: "Tour Guide Local Partners", intro: "Explore dining, accommodation and motorbike rental options for your trip around Banyuwangi.", recommended: "Local recommendations", dining: "Places to Eat", stays: "Places to Stay", mobility: "Motorbike Rental", contact: "Need help finding an available motorbike rental? Get in touch with the Tour Guide team.", contactCta: "Contact Tour Guide", note: "Listings are local recommendations. Availability and services may change; please confirm directly." },
}

const diningPartners = [
  { name: "Wisma Bar & Restaurant", detail: "Pulau Merah · Indonesian, Javanese and international dishes", href: "https://redislandwisma.com/" },
  { name: "RM Valentine", detail: "Wongsorejo · Indonesian meals", href: "https://www.google.com/maps/search/?api=1&query=RM+Valentine+Wongsorejo+Banyuwangi" },
  { name: "Jawa Jiwa G-Land Dining", detail: "Alas Purwo · Resort dining", href: "https://jawajiwa.com/" },
  { name: "The Osing Bamboo Restaurant", detail: "Glagah · Indonesian food and seafood", href: "https://www.google.com/maps/search/?api=1&query=The+Osing+Bamboo+Restaurant+Banyuwangi" },
]

const stayPartners = [
  { name: "The Wisma Pulau Merah", detail: "Beachside stay · Pesanggaran", href: "https://redislandwisma.com/" },
  { name: "Grand Baluran Villa / RedDoorz near Baluran", detail: "Accommodation near Baluran National Park", href: "https://www.google.com/maps/search/?api=1&query=Grand+Baluran+Villa+Wonorejo" },
  { name: "Jawa Jiwa G-Land", detail: "Glamping and bungalows · Alas Purwo", href: "https://jawajiwa.com/" },
  { name: "Herry's Guesthouse", detail: "Guesthouse · Glagah", href: "https://www.google.com/maps/search/?api=1&query=Herry%27s+Guesthouse+Banyuwangi" },
  { name: "Lintang Luku Tent Resort", detail: "Tent resort · Licin", href: "https://www.google.com/maps/search/?api=1&query=Lintang+Luku+Tent+Resort" },
]

export default async function PartnersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const currentLang = isSupportedLanguage(lang) ? lang : "en"
  const [dict, config] = await Promise.all([getDictionary(currentLang), getSiteConfig()])
  const text = copy[currentLang] ?? copy.en
  const { business_whatsapp: phone } = config
  const groups = [
    { title: text.dining, icon: Utensils, partners: diningPartners },
    { title: text.stays, icon: BedDouble, partners: stayPartners },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header dict={dict} lang={currentLang} />
      <main className="pt-16">
        <section className="relative isolate overflow-hidden bg-linear-to-br from-teal-800 via-cyan-700 to-orange-500 py-16 text-white">
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-amber-300/25 blur-3xl" />
          <div className="absolute -bottom-48 -left-20 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
            <p className="mb-3 text-sm uppercase tracking-widest text-amber-200">{text.recommended}</p>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{text.title}</h1>
            <p className="mx-auto max-w-3xl text-lg text-white/90">{text.intro}</p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl space-y-14 px-6 py-16 lg:px-8">
          {groups.map(({ title, icon: Icon, partners }) => (
            <div key={title}>
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold"><Icon className="h-6 w-6 text-primary" />{title}</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {partners.map((partner) => (
                  <Card key={partner.name} className="h-full">
                    <CardContent className="flex h-full flex-col justify-between gap-4 p-6">
                      <div>
                        <h3 className="text-lg font-semibold">{partner.name}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{partner.detail}</p>
                      </div>
                      <Link className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline" href={partner.href} target="_blank" rel="noreferrer">
                        {text.recommended}<ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
          <div id="join" className="scroll-mt-24 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:flex md:items-center md:justify-between md:gap-8">
            <div>
              <h2 className="text-2xl font-semibold">{currentLang === "id" ? "Ingin menjadi mitra Tour Guide?" : "Want to partner with Tour Guide?"}</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">{currentLang === "id" ? "Kami terbuka untuk bekerja sama dengan tempat makan, penginapan, dan penyedia rental motor di Banyuwangi." : "We welcome dining, accommodation, and motorbike rental businesses in Banyuwangi."}</p>
            </div>
            <Link href={getWhatsAppUrl(currentLang === "id" ? "Halo Tour Guide, saya ingin bergabung sebagai mitra. Nama usaha dan layanan kami: " : "Hi Tour Guide, we would like to become a partner. Our business and services: ", phone)} target="_blank" rel="noreferrer" className="mt-5 inline-flex shrink-0 rounded-full bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700 md:mt-0">{currentLang === "id" ? "Daftar via WhatsApp" : "Contact us on WhatsApp"}</Link>
          </div>
          <div className="rounded-2xl border bg-muted/30 p-6 md:flex md:items-center md:justify-between md:gap-8">
            <div className="flex items-start gap-4">
              <Bike className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <div>
                <h2 className="text-2xl font-semibold">{text.mobility}</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">{text.contact}</p>
              </div>
            </div>
            <Link href={getWhatsAppUrl(currentLang === "id" ? "Halo Tour Guide, saya mencari rental motor roda dua di Banyuwangi." : "Hi Tour Guide, I am looking for a motorbike rental in Banyuwangi.", phone)} target="_blank" rel="noreferrer" className="mt-5 inline-flex shrink-0 rounded-full bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700 md:mt-0">{currentLang === "id" ? "Pesan via WhatsApp" : "Message us on WhatsApp"}</Link>
          </div>
          <p className="text-xs text-muted-foreground">{text.note}</p>
        </section>
      </main>
      <Footer dict={dict} lang={currentLang} />
    </div>
  )
}
