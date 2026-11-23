import { getDictionary, isSupportedLanguage } from "../dictionaries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { ExtraDestinations } from "@/components/extra-destinations"
import { TourPackages } from "@/components/tour-packages"
import { getPackageSchedules } from "@/lib/package-schedules"

export const dynamic = "force-dynamic"

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const currentLang = isSupportedLanguage(lang) ? lang : "en"
  const dict = await getDictionary(currentLang)
  const schedules = currentLang === "id" ? await getPackageSchedules() : undefined

  return (
    <div className="min-h-screen bg-background">
      <Header dict={dict} lang={currentLang} />
      <main className="pt-16">
        <FeaturedDestinations lang={currentLang} dict={dict} />
        <ExtraDestinations lang={currentLang} />
        <TourPackages lang={currentLang} schedules={schedules} />
      </main>
      <Footer dict={dict} lang={currentLang} />
    </div>
  )
}
