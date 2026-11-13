import { getDictionary } from "./[lang]/dictionaries"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { WhyChooseUs } from "@/components/why-choose-us"
import { PopularPackages } from "@/components/popular-packages"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default async function Home() {
  const dict = await getDictionary("en")

  return (
    <main className="min-h-screen">
      <Header dict={dict} lang="en" />
      <Hero />
      <FeaturedDestinations lang={""} />
      <WhyChooseUs />
      <PopularPackages />
      <Newsletter />
      <Footer />
    </main>
  )
}
