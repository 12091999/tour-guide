
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import { formatPrice, getOnePersonLabel } from "@/lib/currency"
import type { SupportedLanguage } from "@/app/[lang]/dictionaries"
import { AvailabilityBooking } from "@/components/availability-booking"

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
    price: 300000,
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
  { id: 5, name: "Tabuhan Island", country: "Bangsring, Banyuwangi, Indonesia", image: "/pulau-tabuhan.jpg", description: "Reach this clear-water island by boat from Bangsring and enjoy snorkeling and beach time.", price: 300000 },
  { id: 6, name: "Pulau Merah", country: "Pesanggaran, Banyuwangi, Indonesia", image: "/pulau-merah.jpg", description: "Spend a day at the south-coast beach known for its red offshore hill and sunset views.", price: 300000 },
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
    <section id="destinations" className="bg-background py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 max-w-3xl sm:mb-16">
          <p className="mb-3 text-xs uppercase tracking-widest text-primary sm:mb-4 sm:text-sm">
            {dict.site.destinations.kicker}
          </p>

          <h2 className="mb-4 text-3xl font-light tracking-tight sm:mb-6 sm:text-4xl md:text-6xl">
            {dict.site.destinations.title}
          </h2>

          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {dict.site.destinations.description}
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {destinations.map((destination, index) => (
            <div key={destination.id} className="flex flex-col gap-3">
            <Link
              href={`/${currentLang}/explore/${destination.id}`}
              aria-label={`${dict.site.destinations.explore}: ${destination.name}`}
              className="group block flex-1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
            <Card className="h-full overflow-hidden border-0 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
              {/* Image */}
              <div className="relative h-56 overflow-hidden sm:h-72 xl:h-80">
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
              <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
                <div>
                  <h3 className="mb-2 text-xl font-semibold sm:mb-3 sm:text-2xl">
                    {destination.name}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {dict.site.destinations[["", "ijen", "djawatan", "bangsring", "teluk"][destination.id]] ?? destination.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
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
            <AvailabilityBooking
              tourId={({ 1: "ijen", 2: "djawatan", 3: "bangsring", 5: "tabuhan", 6: "pulau-merah" } as Record<number, string>)[destination.id] ?? "ijen"}
              tourName={destination.name}
              lang={currentLang}
            >
              <Button variant="outline" className="w-full">{currentLang === "id" ? "Pilih tanggal & pesan" : "Choose date & book"}</Button>
            </AvailabilityBooking>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="mt-10 text-center sm:mt-16">
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
