
import { getDictionary, isSupportedLanguage } from "./dictionaries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedDestinations } from "@/components/featured-destinations"

export default async function HomePage({
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
      <section className="relative min-h-[650px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/teluk-hijau.jpg"
            alt={dict.site.home.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-teal-950/35 to-orange-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/15" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-6 text-amber-300 drop-shadow">
            {dict.site.home.kicker}
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="drop-shadow-lg">{dict.site.home.title}</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-white/95 mb-10 drop-shadow">
            {dict.site.home.description}
          </p>

          <a
            href="#destinations"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 px-8 py-4 font-semibold text-white shadow-lg shadow-orange-950/30 transition-colors"
          >
            {dict.site.home.explore}
          </a>
        </div>
      </section>

      {/* Featured Destinations */}
      <FeaturedDestinations lang={currentLang} dict={dict} />

      {/* About Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-primary mb-4">
            {dict.site.home.aboutKicker}
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {dict.site.home.aboutTitle}
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            {dict.site.home.aboutDescription}
          </p>
        </div>
      </section>

      <Footer dict={dict} lang={currentLang} />
    </div>
  )
}
