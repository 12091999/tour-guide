
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
      <section className="relative flex min-h-[min(78svh,650px)] items-center justify-center overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:min-h-[650px]">
        <div className="absolute inset-0">
          <img
            src="/ijen.jpg"
            alt={dict.site.home.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-teal-950/35 to-orange-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/15" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-amber-300 drop-shadow sm:mb-6 sm:text-sm sm:tracking-[0.3em] md:text-base">
            {dict.site.home.kicker}
          </p>

          <h1 className="mb-5 text-[clamp(2.15rem,8vw,4.5rem)] font-bold leading-[1.05] sm:mb-6">
            <span className="drop-shadow-lg">{dict.site.home.title}</span>
          </h1>

          <p className="mb-7 text-base leading-relaxed text-white/95 drop-shadow sm:mb-10 sm:text-lg md:text-xl">
            {dict.site.home.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#destinations"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/30 transition-colors hover:bg-orange-400 sm:px-8 sm:py-4 sm:text-base"
            >
              {dict.site.home.explore}
            </a>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <FeaturedDestinations lang={currentLang} dict={dict} />

      {/* About Section */}
      <section className="bg-muted/30 py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-xs uppercase tracking-widest text-primary sm:mb-4 sm:text-sm">
            {dict.site.home.aboutKicker}
          </p>

          <h2 className="mb-5 text-3xl font-bold sm:mb-6 sm:text-4xl md:text-5xl">
            {dict.site.home.aboutTitle}
          </h2>

          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {dict.site.home.aboutDescription}
          </p>
        </div>
      </section>

      <Footer dict={dict} lang={currentLang} />
    </div>
  )
}
