import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Users, Star, CheckCircle } from "lucide-react"
import { getDictionary, isSupportedLanguage, type SupportedLanguage } from "../../dictionaries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { formatPrice, getOnePersonLabel } from "@/lib/currency"
import { getWhatsAppUrl } from "@/lib/whatsapp"
import { getTour } from "@/lib/actions/tours"
import { getSiteConfig } from "@/lib/actions/config"
import { buildMeta, siteUrl } from "@/lib/metadata"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}): Promise<Metadata> {
  const { lang, id: slug } = await params
  const currentLang: SupportedLanguage = isSupportedLanguage(lang) ? lang : "en"
  const tour = await getTour(slug, currentLang)
  if (!tour) return { robots: { index: false, follow: false } }

  const description = tour.description.replace(/\s+/g, " ").slice(0, 160).trim()
  return {
    ...buildMeta({
      lang: currentLang,
      path: `/explore/${slug}`,
      title: tour.title,
      description,
      ogImage: { url: tour.image_url, width: 1200, height: 630, alt: tour.title },
    }),
    alternates: {
      canonical: `${siteUrl}/${currentLang}/explore/${slug}`,
      languages: {
        en: `${siteUrl}/en/explore/${slug}`,
        id: `${siteUrl}/id/explore/${slug}`,
        "x-default": `${siteUrl}/en/explore/${slug}`,
      },
    },
  }
}

function formatDuration(duration: string, locale: SupportedLanguage) {
  const match = duration.match(/^(\d+)\s+(hours?|days?)$/i)
  if (!match) return duration

  const [, amount, unit] = match
  const isDay = unit.toLowerCase().startsWith("day")
  const units: Record<SupportedLanguage, [string, string]> = {
    id: ["jam", "hari"], en: ["hours", "days"],
  }
  return `${amount} ${units[locale][isDay ? 1 : 0]}`
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id: slug } = await params

  const currentLang: SupportedLanguage = isSupportedLanguage(lang) ? lang : "en"
  const [dict, config] = await Promise.all([getDictionary(currentLang), getSiteConfig()])
  const labels = dict.site.detail

  const fetchLang = ["en", "id"].includes(currentLang) ? currentLang : "en"
  const tour = await getTour(slug, fetchLang)
  const localizedPrice = tour ? await formatPrice(tour.price, "IDR", currentLang) : null

  if (!tour) {
    return (
      <div className="min-h-screen bg-background">
        <Header dict={dict} lang={currentLang} />

        <main className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">{labels.notFound}</h1>
          <p className="text-muted-foreground mb-8">{labels.notFoundDescription}</p>
          <Button asChild>
            <Link href={`/${currentLang}`}>{labels.backHome}</Link>
          </Button>
        </main>

        <Footer dict={dict} lang={currentLang} />
      </div>
    )
  }

  const duration = formatDuration(tour.duration, currentLang)

  return (
    <div className="min-h-screen bg-background">
      <Header dict={dict} lang={currentLang} />

      {/* Hero */}
      <section className="relative h-105">
        <Image
          src={tour.image_url}
          alt={tour.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 container mx-auto h-full px-6 flex flex-col justify-end pb-10 text-white">
          <p className="uppercase tracking-widest text-sm mb-3">Banyuwangi, Indonesia</p>

          <h1 className="text-4xl md:text-6xl font-bold mb-5">{tour.title}</h1>

          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {tour.rating}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {duration}
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {labels.maxPeople.replace("{count}", String(tour.max_people))}
            </span>
          </div>
        </div>
      </section>

      {/* Details */}
      <main className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-3xl font-bold mb-5">{labels.about}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{tour.description}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">{labels.itinerary}</h2>
              <div className="space-y-5">
                {tour.itinerary.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground pt-1">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">{labels.included}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {tour.included.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Sidebar */}
          <aside>
            <div className="border rounded-xl p-6 space-y-6 sticky top-8">
              <div>
                <p className="text-sm text-muted-foreground">{labels.startingPrice}</p>
                <p className="text-3xl font-bold text-primary">{localizedPrice?.formatted}</p>
                <p className="text-sm text-muted-foreground">{getOnePersonLabel(currentLang)}</p>
              </div>

              <div className="border-t pt-5 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />{labels.duration}
                  </span>
                  <span>{duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />{labels.maxPeopleLabel}
                  </span>
                  <span>{tour.max_people}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Star className="h-4 w-4" />{labels.rating}
                  </span>
                  <span>{tour.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />{labels.location}
                  </span>
                  <span>Banyuwangi</span>
                </div>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link
                  href={getWhatsAppUrl(
                    currentLang === "id"
                      ? `Halo Tour Guide, saya ingin memesan ${tour.title}. Mohon info jadwal dan ketersediaannya.`
                      : `Hi Tour Guide, I would like to book ${tour.title}. Please share available dates and details.`,
                    config.business_whatsapp,
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  {currentLang === "id" ? "Pesan via WhatsApp" : "Book via WhatsApp"}
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href={`/${currentLang}`}>{labels.back}</Link>
              </Button>
            </div>
          </aside>
        </div>
      </main>

      <Footer dict={dict} lang={currentLang} />
    </div>
  )
}
