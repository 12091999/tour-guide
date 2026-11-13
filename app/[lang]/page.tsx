
import { getDictionary } from "./dictionaries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedDestinations } from "@/components/featured-destinations"

type SupportedLanguage = "ka" | "en" | "ru"

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  const currentLang: SupportedLanguage =
    ["ka", "en", "ru"].includes(lang)
      ? (lang as SupportedLanguage)
      : "en"

  const dict = await getDictionary(currentLang)

  return (
    <div className="min-h-screen bg-background">
      <Header dict={dict} lang={currentLang} />

      {/* Hero Section */}
      <section className="relative min-h-[650px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/ijen.jpg"
            alt="Beautiful Banyuwangi landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-6 text-orange-300">
            Discover the Beauty of East Java
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Explore Banyuwangi
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-white/90 mb-10">
            Discover breathtaking landscapes, tropical beaches,
            beautiful forests, and unforgettable adventures in
            Banyuwangi, Indonesia.
          </p>

          <a
            href="#destinations"
            className="inline-flex items-center justify-center rounded-full bg-orange-600 hover:bg-orange-700 px-8 py-4 font-semibold text-white transition-colors"
          >
            Explore Destinations
          </a>
        </div>
      </section>

      {/* Featured Destinations */}
      <FeaturedDestinations lang={currentLang} />

      {/* About Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-primary mb-4">
            About Banyuwangi
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience the Wonders of Banyuwangi
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            From the spectacular blue fire of Ijen Crater to the
            peaceful atmosphere of Djawatan Forest and the
            crystal-clear waters of Bangsring Beach, Banyuwangi
            offers extraordinary experiences for every traveler.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
