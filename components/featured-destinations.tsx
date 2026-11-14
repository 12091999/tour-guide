
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import { formatPrice, getOnePersonLabel } from "@/lib/currency"
import type { SupportedLanguage } from "@/app/[lang]/dictionaries"

interface FeaturedDestinationsProps {
  lang: string
  dict: any
}

const destinations = [
  {
    id: 1,
    name: "Ijen Crater",
    country: "Banyuwangi, Indonesia",
    image: "/ijen.jpg",
    description:
      "Discover the spectacular blue fire and breathtaking turquoise crater lake.",
    price: 300000,
  },
  {
    id: 2,
    name: "Djawatan",
    country: "Benculuk, Banyuwangi, Indonesia",
    image: "/djawatan.jpg",
    description:
      "Explore a magical forest surrounded by giant and ancient trembesi trees.",
    price: 250000,
  },
  {
    id: 3,
    name: "Bangsring Beach",
    country: "Banyuwangi, Indonesia",
    image: "/bangsring-underwater.jpg",
    description:
      "Enjoy pristine beaches, crystal-clear waters, and exciting marine activities.",
    price: 300000,
  },
  {
    id: 4,
    name: "Teluk Hijau",
    country: "Banyuwangi, Indonesia",
    image: "/Teluk hijau.jpg",
    description:
      "Discover Green Bay, a hidden coastal paradise in Meru Betiri National Park.",
    price: 300000,
  },
  { id: 5, name: "Tabuhan Island", country: "Bangsring, Banyuwangi, Indonesia", image: "/pulau-tabuhan.jpg", description: "Reach this clear-water island by boat from Bangsring and enjoy snorkeling and beach time.", price: 300000 },
  { id: 6, name: "Pulau Merah", country: "Pesanggaran, Banyuwangi, Indonesia", image: "/Teluk hijau.jpg", description: "Spend a day at the south-coast beach known for its red offshore hill and sunset views.", price: 250000 },
]

export async function FeaturedDestinations({
  lang,
  dict,
}: FeaturedDestinationsProps) {
  const currentLang = ["id", "en", "en-au", "de", "zh", "ja", "ko", "fr", "nl", "ru", "ka"].includes(lang)
    ? lang
    : "en"
  const prices = await Promise.all(destinations.map(({ price }) => formatPrice(price, "IDR", currentLang as SupportedLanguage)))

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
          {destinations.map((destination, index) => (
            <Link
              key={destination.id}
              href={`/${currentLang}/explore/${destination.id}`}
              aria-label={`${dict.site.destinations.explore}: ${destination.name}`}
              className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
            <Card className="h-full overflow-hidden border-0 bg-card transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Location */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 px-3 py-2 rounded-full">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-black">
                    {destination.country}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-2xl font-semibold mb-3">
                    {destination.name}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dict.site.destinations[["", "ijen", "djawatan", "bangsring", "teluk"][destination.id]] ?? destination.description}
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
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-2"
          >
            <Link href={`/${currentLang}/explore`}>
              {dict.site.destinations.viewAll}
            </Link>
          </Button>
        </div>

      </div>
    </section>
  )
}
