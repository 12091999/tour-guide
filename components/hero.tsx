import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Teluk hijau.jpg"
          alt="Turquoise waters and tropical coast of Banyuwangi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-teal-950/35 to-orange-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center text-white py-32">
        <div className="space-y-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-balance">
            <span className="drop-shadow-lg">Discover Your Next</span>
            <span className="block font-semibold mt-2 text-amber-300 drop-shadow-lg">Adventure</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto text-balance leading-relaxed drop-shadow">
            Explore breathtaking destinations around the world with curated travel experiences designed for the modern
            explorer
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              className="bg-orange-500 text-white hover:bg-orange-400 rounded-full px-8 h-14 text-base group shadow-lg shadow-orange-950/30"
            >
              Explore Destinations
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-2 border-white/80 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white">
              View Packages
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 md:gap-16 max-w-3xl mx-auto mt-24 pt-16 border-t border-white/30 text-white">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-light">15+</div>
            <div className="text-sm text-white/75">Destinations</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-light">50K+</div>
            <div className="text-sm text-white/75">Happy Travelers</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-light">5.5</div>
            <div className="text-sm text-white/75">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
