import { getDictionary } from "../../dictionaries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Clock,
  MapPin,
  Users,
  Star,
  Phone,
  Mail,
} from "lucide-react"
import Image from "next/image"
import { BookingModal } from "@/components/booking-modal"

type SupportedLanguage = "ka" | "en" | "ru"

const tourData = {
  1: {
    title: {
      ka: "თბილისის ისტორიული ტური",
      en: "Tbilisi Historical Tour",
      ru: "Исторический тур по Тбилиси",
    },
    description: {
      ka: "აღმოაჩინე თბილისის ძველი ქალაქის ისტორია და კულტურა ამ დაუვიწყარ ტურში. ნახავ ნარიყალას ციხეს, აბანოთუბანს, შარდენის ქუჩას და სხვა ისტორიულ ადგილებს.",
      en: "Discover the history and culture of Tbilisi Old Town in this unforgettable tour. Visit Narikala Fortress, Abanotubani, Shardeni Street and other historical places.",
      ru: "Откройте историю и культуру Старого города Тбилиси в этом незабываемом туре. Посетите крепость Нарикала, Абанотубани, улицу Шардени и другие исторические места.",
    },
    duration: "4 hours",
    difficulty: "easy",
    price: 50,
    maxPeople: 15,
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=800",

    itinerary: {
      ka: [
        "შეხვედრა თავისუფლების მოედანზე",
        "ნარიყალას ციხის მონახულება",
        "აბანოთუბნის გასეირნება",
        "შარდენის ქუჩაზე ლანჩი",
        "მეტეხის ეკლესიის ნახვა",
      ],
      en: [
        "Meeting at Freedom Square",
        "Visit to Narikala Fortress",
        "Walk through Abanotubani",
        "Lunch on Shardeni Street",
        "Visit to Metekhi Church",
      ],
      ru: [
        "Встреча на площади Свободы",
        "Посещение крепости Нарикала",
        "Прогулка по Абанотубани",
        "Обед на улице Шардени",
        "Посещение церкви Метехи",
      ],
    },

    included: {
      ka: ["გამოცდილი გიდი", "ტრანსპორტი", "შესვლის ბილეთები", "წყალი"],
      en: ["Professional guide", "Transportation", "Entrance tickets", "Water"],
      ru: ["Профессиональный гид", "Транспорт", "Входные билеты", "Вода"],
    },
  },
}

type Tour = (typeof tourData)[1]

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id } = await params

  // Validate language
  const supportedLanguages: SupportedLanguage[] = ["ka", "en", "ru"]

  const currentLang: SupportedLanguage = supportedLanguages.includes(
    lang as SupportedLanguage
  )
    ? (lang as SupportedLanguage)
    : "en"

  // Load dictionary
  const dict = await getDictionary(currentLang)

  // Get tour data
  const tourId = Number(id)
  const tour: Tour | undefined =
    tourData[tourId as keyof typeof tourData]

  // Handle invalid tour ID
  if (!tour) {
    return (
      <div className="min-h-screen bg-background">
        <Header dict={dict} lang={currentLang} />

        <main className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">
            Tour Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The tour you are looking for does not exist.
          </p>
          <Button asChild>
            <a href={`/${currentLang}/explore`}>
              Back to Explore
            </a>
          </Button>
        </main>

        <Footer dict={dict} lang={currentLang} />
      </div>
    )
  }

  // Language fallback helper
  const getLocalizedValue = <T,>(
    translations: Record<SupportedLanguage, T>
  ): T => {
    return (
      translations[currentLang] ??
      translations.en ??
      translations.ka
    )
  }

  // Get translated data safely
  const title = getLocalizedValue(tour.title)
  const description = getLocalizedValue(tour.description)

  const itinerary =
    getLocalizedValue(tour.itinerary) ?? []

  const included =
    getLocalizedValue(tour.included) ?? []

  return (
    <div className="min-h-screen bg-background">
      <Header dict={dict} lang={currentLang} />

      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src={tour.image || "/placeholder.svg"}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-bold mb-2">
            {title}
          </h1>

          <div className="flex items-center gap-4 flex-wrap">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white"
            >
              <Star className="h-3 w-3 mr-1" />
              {tour.rating}
            </Badge>

            <div className="flex items-center gap-1 text-white/90">
              <Clock className="h-4 w-4" />
              {tour.duration}
            </div>

            <div className="flex items-center gap-1 text-white/90">
              <Users className="h-4 w-4" />
              Max {tour.maxPeople} people
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Tour Description</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle>Itinerary</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {Array.isArray(itinerary) &&
                    itinerary.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>

                        <p className="text-muted-foreground">
                          {item}
                        </p>
                      </div>
                    ))}

                  {(!Array.isArray(itinerary) ||
                    itinerary.length === 0) && (
                    <p className="text-muted-foreground">
                      No itinerary available.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {Array.isArray(included) &&
                    included.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />

                        <span className="text-sm text-muted-foreground">
                          {item}
                        </span>
                      </div>
                    ))}

                  {(!Array.isArray(included) ||
                    included.length === 0) && (
                    <p className="text-sm text-muted-foreground">
                      No included services available.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Booking Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  ${tour.price}

                  <span className="text-base font-normal text-muted-foreground">
                    {" "}per person
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <BookingModal
                  tourTitle={title}
                  tourPrice={tour.price}
                  duration={tour.duration}
                  difficulty={
                    dict.tours?.[
                      tour.difficulty as keyof typeof dict.tours
                    ] || tour.difficulty
                  }
                  dict={dict}
                >
                  <Button className="w-full" size="lg">
                    Book Now
                  </Button>
                </BookingModal>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Duration:
                    </span>
                    <span>{tour.duration}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Max People:
                    </span>
                    <span>{tour.maxPeople}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Rating:
                    </span>

                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{tour.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {dict.contact?.title || "Contact Us"}
                </CardTitle>

                <CardDescription>
                  Have questions? Get in touch with us
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    +995 555 123 456
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    info@georgiatours.ge
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Rustaveli Ave 12, Tbilisi
                  </span>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer dict={dict} lang={currentLang} />
    </div>
  )
}
