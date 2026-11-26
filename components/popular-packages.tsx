import { Card } from "@/components/ui/card"
import { Calendar, Users, Star } from "lucide-react"
import { formatPrice } from "@/lib/currency"
import Link from "next/link"
import { getWhatsAppUrl } from "@/lib/whatsapp"

const packages = [
  {
    title: "Ngalor Package",
    duration: "4 Days",
    groupSize: "1-5 People",
    rating: "4.9",
    reviews: "234",
    image: "/bangsring.jpg",
    highlights: ["Grand Watu Dodol", "Ayam Pedas", "Wongsorejo"],
    price: 1500000,
  },
  {
    title: "Ngulon Package",
    duration: "5 Days",
    groupSize: "1-5 People",
    rating: "4.8",
    reviews: "189",
    image: "/ijen.jpg",
    highlights: ["Ijen skylight", "Bobocabin",],
    price: 1500000,
  },
  {
    title: "Ngidul Package",
    duration: "6 Days",
    groupSize: "1-5 People",
    rating: "5.0",
    reviews: "156",
    image: "/djawatan.jpg",
    highlights: ["Warung Mbok Sul (WSL)", "Kohay Coffee", "Ngorongoro", "Amboseli"],
    price: 1500000,
  },
]

export async function PopularPackages() {
  const twoPersonPerGuest = await formatPrice(1500000, "IDR", "en")
  const twoPersonTotal = await formatPrice(3000000, "IDR", "en")
  const fourPersonPerGuest = await formatPrice(1200000, "IDR", "en")
  const fourPersonTotal = await formatPrice(4800000, "IDR", "en")
  return (
    <section id="packages" className="bg-background py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl sm:mb-14 lg:mb-20">
          <h2 className="mb-4 text-3xl font-light tracking-tight text-balance sm:mb-6 sm:text-4xl md:text-6xl">
            Popular <span className="font-semibold">Packages</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Carefully curated travel packages that combine the best destinations and experiences
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid gap-5 md:grid-cols-2 md:gap-6 2xl:grid-cols-3 lg:gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              <Link href="/en/explore#tour-packages" aria-label={`View ${pkg.title} itinerary`} className="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset" />
              {/* Image */}
              <div className="relative h-52 overflow-hidden sm:h-64">
                <img
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-xs font-semibold">{pkg.rating}</span>
                  <span className="text-xs text-muted-foreground">({pkg.reviews})</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">{pkg.title}</h3>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      <span>{pkg.groupSize}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {pkg.highlights.map((highlight, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-muted rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex flex-col items-stretch justify-between gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:pt-6">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Group price</div>
                    <div className="text-sm font-semibold text-primary">2 people: {twoPersonPerGuest.formatted}/person ({twoPersonTotal.formatted} total)</div>
                    <div className="text-sm font-semibold text-primary">4 people: {fourPersonPerGuest.formatted}/person ({fourPersonTotal.formatted} total)</div>
                  </div>
                  <a href={getWhatsAppUrl(`Hi Tour Guide, I am interested in the ${pkg.title}. Please send me the package details and availability.`)} target="_blank" rel="noreferrer" className="relative z-20 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Book via WhatsApp</a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
