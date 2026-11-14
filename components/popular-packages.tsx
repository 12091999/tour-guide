import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Star } from "lucide-react"
import { formatPrice } from "@/lib/currency"

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
    <section id="packages" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-balance">
            Popular <span className="font-semibold">Packages</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Carefully curated travel packages that combine the best destinations and experiences
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 bg-card hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
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
              <div className="p-6 space-y-6">
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
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Group price</div>
                    <div className="text-sm font-semibold text-primary">2 people: {twoPersonPerGuest.formatted}/person ({twoPersonTotal.formatted} total)</div>
                    <div className="text-sm font-semibold text-primary">4 people: {fourPersonPerGuest.formatted}/person ({fourPersonTotal.formatted} total)</div>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
