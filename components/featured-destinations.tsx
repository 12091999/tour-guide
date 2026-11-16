import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import { formatPrice, getOnePersonLabel } from "@/lib/currency"
import type { SupportedLanguage } from "@/app/[lang]/dictionaries"
import { getAllTours } from "@/lib/actions/tours"

interface FeaturedDestinationsProps {
  lang: string
  dict: any
}

export async function FeaturedDestinations({ lang, dict }: FeaturedDestinationsProps) {
  const supportedLangs = ["id", "en", "en-au", "de", "zh", "ja", "ko", "fr", "nl", "ru", "ka"]
  const currentLang = supportedLangs.includes(lang) ? lang : "en"

  // Fetch only en/id from Supabase; others fall back to English
  const fetchLang = ["en", "id"].includes(currentLang) ? currentLang : "en"
  const tours = await getAllTours(fetchLang)

  const prices = await Promise.all(
    tours.map(({ price }) => formatPrice(price, "IDR", currentLang as SupportedLanguage)),
  )

  return (
    <section id="destinations" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm uppercase tracking-widest text-primary mb-4">
            {dict.site.destinations.kicker}
          </p>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
            {dict.site.destinations.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {dict.site.destinations.description}
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((destination, index) => (
            <Link
              key={destination.id}
              href={`/${currentLang}/explore/${destination.slug}`}
              aria-label={`${dict.site.destinations.explore}: ${destination.title}`}
              className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
              <Card className="h-full overflow-hidden border-0 bg-card transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={destination.image_url}
                    alt={destination.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 px-3 py-2 rounded-full">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-black">Banyuwangi, Indonesia</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">{destination.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {destination.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm font-semibold text-primary">
                      {dict.tours.from} {prices[index].formatted} {getOnePersonLabel(currentLang as SupportedLanguage)}
                    </span>
                    <span className="inline-flex items-center text-sm font-medium text-foreground group-hover:text-primary">
                      {dict.site.destinations.explore}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-2">
            <Link href={`/${currentLang}/explore`}>
              {dict.site.destinations.viewAll}
            </Link>
          </Button>
        </div>

      </div>
    </section>
  )
}
