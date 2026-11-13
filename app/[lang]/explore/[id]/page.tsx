
import { getDictionary, isSupportedLanguage, type SupportedLanguage } from "../../dictionaries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, MapPin, Users, Star, CheckCircle } from "lucide-react"

type TourLanguage = "ka" | "en" | "ru"
type LocalizedText = Record<TourLanguage, string>
type LocalizedList = Record<TourLanguage, string[]>

type Tour = {
  title: LocalizedText
  description: LocalizedText
  duration: string
  difficulty: string
  price: number
  maxPeople: number
  rating: number
  image: string
  itinerary: LocalizedList
  included: LocalizedList
}

const tourData: Record<number, Tour> = {
  1: {
    title: {
      en: "Ijen Crater",
      ka: "Ijen Crater",
      ru: "Кратер Иджен",
    },
    description: {
      en: "Discover the spectacular Ijen Crater in Banyuwangi, famous for its rare blue fire, dramatic volcanic landscape, and stunning turquoise crater lake.",
      ka: "Discover the spectacular Ijen Crater in Banyuwangi, famous for its rare blue fire and beautiful crater lake.",
      ru: "Откройте для себя кратер Иджен в Баньюванги, известный голубым пламенем и красивым бирюзовым озером.",
    },
    duration: "8 hours",
    difficulty: "Moderate",
    price: 2499,
    maxPeople: 15,
    rating: 4.8,
    image: "/ijen.jpg",
    itinerary: {
      en: [
        "Hotel pickup in Banyuwangi",
        "Travel to the Ijen hiking entrance",
        "Hike to the crater viewpoint",
        "Enjoy the spectacular volcanic scenery",
        "Return to Banyuwangi",
      ],
      ka: [
        "Hotel pickup in Banyuwangi",
        "Travel to the Ijen hiking entrance",
        "Hike to the crater viewpoint",
        "Enjoy the spectacular volcanic scenery",
        "Return to Banyuwangi",
      ],
      ru: [
        "Сбор в отеле в Баньюванги",
        "Поездка ко входу на маршрут Иджен",
        "Подъем к смотровой площадке кратера",
        "Осмотр вулканических пейзажей",
        "Возвращение в Баньюванги",
      ],
    },
    included: {
      en: [
        "Professional local guide",
        "Transportation",
        "Drinking water",
        "Travel assistance",
      ],
      ka: [
        "Professional local guide",
        "Transportation",
        "Drinking water",
        "Travel assistance",
      ],
      ru: [
        "Профессиональный местный гид",
        "Транспорт",
        "Питьевая вода",
        "Помощь в поездке",
      ],
    },
  },

  2: {
    title: {
      en: "Djawatan Forest",
      ka: "Djawatan Forest",
      ru: "Лес Джаватан",
    },
    description: {
      en: "Explore the magical Djawatan Forest in Benculuk, Banyuwangi, surrounded by enormous old trembesi trees and a peaceful natural atmosphere.",
      ka: "Explore the magical Djawatan Forest in Banyuwangi, surrounded by enormous old trees.",
      ru: "Посетите волшебный лес Джаватан в Баньюванги с огромными старыми деревьями и спокойной атмосферой.",
    },
    duration: "4 hours",
    difficulty: "Easy",
    price: 1899,
    maxPeople: 15,
    rating: 4.8,
    image: "/djawatan.jpg",
    itinerary: {
      en: [
        "Pickup in Banyuwangi",
        "Travel to Djawatan Forest",
        "Explore the giant trembesi trees",
        "Photography and leisure time",
        "Return to your hotel",
      ],
      ka: [
        "Pickup in Banyuwangi",
        "Travel to Djawatan Forest",
        "Explore the giant trembesi trees",
        "Photography and leisure time",
        "Return to your hotel",
      ],
      ru: [
        "Сбор в Баньюванги",
        "Поездка в лес Джаватан",
        "Прогулка среди гигантских деревьев",
        "Фотографии и свободное время",
        "Возвращение в отель",
      ],
    },
    included: {
      en: [
        "Local guide",
        "Transportation",
        "Drinking water",
        "Travel assistance",
      ],
      ka: [
        "Local guide",
        "Transportation",
        "Drinking water",
        "Travel assistance",
      ],
      ru: [
        "Местный гид",
        "Транспорт",
        "Питьевая вода",
        "Помощь в поездке",
      ],
    },
  },

  3: {
    title: {
      en: "Bangsring Beach",
      ka: "Bangsring Beach",
      ru: "Пляж Бангсринг",
    },
    description: {
      en: "Enjoy the beautiful coastal scenery of Bangsring Beach, known for clear seawater, snorkeling opportunities, and marine activities.",
      ka: "Enjoy the beautiful coastal scenery and clear waters of Bangsring Beach.",
      ru: "Насладитесь красивыми пейзажами пляжа Бангсринг, чистой водой и морскими развлечениями.",
    },
    duration: "5 hours",
    difficulty: "Easy",
    price: 1599,
    maxPeople: 15,
    rating: 4.7,
    image: "/bangsring.jpg",
    itinerary: {
      en: [
        "Pickup in Banyuwangi",
        "Travel to Bangsring Beach",
        "Enjoy the beach and coastal scenery",
        "Optional snorkeling activities",
        "Return to Banyuwangi",
      ],
      ka: [
        "Pickup in Banyuwangi",
        "Travel to Bangsring Beach",
        "Enjoy the beach and coastal scenery",
        "Optional snorkeling activities",
        "Return to Banyuwangi",
      ],
      ru: [
        "Сбор в Баньюванги",
        "Поездка на пляж Бангсринг",
        "Отдых и осмотр побережья",
        "Дополнительное занятие снорклингом",
        "Возвращение в Баньюванги",
      ],
    },
    included: {
      en: [
        "Local guide",
        "Transportation",
        "Drinking water",
        "Travel assistance",
      ],
      ka: [
        "Local guide",
        "Transportation",
        "Drinking water",
        "Travel assistance",
      ],
      ru: [
        "Местный гид",
        "Транспорт",
        "Питьевая вода",
        "Помощь в поездке",
      ],
    },
  },

  4: {
    title: {
      en: "Teluk Hijau (Green Bay)",
      ka: "Teluk Hijau (Green Bay)",
      ru: "Зеленая бухта (Телук Хиджау)",
    },
    description: {
      en: "Discover Teluk Hijau, also known as Green Bay, a beautiful hidden beach within Meru Betiri National Park in Banyuwangi, East Java.",
      ka: "Discover the beautiful hidden beach of Teluk Hijau in Meru Betiri National Park.",
      ru: "Откройте для себя Телук Хиджау, красивый уединенный пляж в национальном парке Меру-Бетири.",
    },
    duration: "8 hours",
    difficulty: "Moderate",
    price: 3499,
    maxPeople: 15,
    rating: 4.9,
    image: "/Teluk hijau.jpg",
    itinerary: {
      en: [
        "Pickup in Banyuwangi",
        "Travel to Meru Betiri National Park",
        "Continue to the Green Bay area",
        "Enjoy the beach and natural scenery",
        "Return to Banyuwangi",
      ],
      ka: [
        "Pickup in Banyuwangi",
        "Travel to Meru Betiri National Park",
        "Continue to the Green Bay area",
        "Enjoy the beach and natural scenery",
        "Return to Banyuwangi",
      ],
      ru: [
        "Сбор в Баньюванги",
        "Поездка в национальный парк Меру-Бетири",
        "Путь к Зеленой бухте",
        "Отдых на пляже и осмотр природы",
        "Возвращение в Баньюванги",
      ],
    },
    included: {
      en: [
        "Local guide",
        "Transportation",
        "Drinking water",
        "Travel assistance",
      ],
      ka: [
        "Local guide",
        "Transportation",
        "Drinking water",
        "Помощь в поездке",
      ],
      ru: [
        "Местный гид",
        "Транспорт",
        "Питьевая вода",
        "Помощь в поездке",
      ],
    },
  },
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id } = await params

  const currentLang: SupportedLanguage = isSupportedLanguage(lang) ? lang : "en"

  const dict = await getDictionary(currentLang)

  const tourId = Number(id)
  const tour = tourData[tourId]

  if (!Number.isInteger(tourId) || !tour) {
    return (
      <div className="min-h-screen bg-background">
        <Header dict={dict} lang={currentLang} />

        <main className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Destination Not Found
          </h1>

          <p className="text-muted-foreground mb-8">
            The destination you are looking for does not exist.
          </p>

          <Button asChild>
            <Link href={`/${currentLang}`}>
              Back to Home
            </Link>
          </Button>
        </main>

        <Footer />
      </div>
    )
  }

  const tourLang: TourLanguage = currentLang in tour.title ? currentLang as TourLanguage : "en"
  const title = tour.title[tourLang]
  const description = tour.description[tourLang]
  const itinerary = tour.itinerary[tourLang]
  const included = tour.included[tourLang]

  return (
    <div className="min-h-screen bg-background">
      <Header dict={dict} lang={currentLang} />

      {/* Hero */}
      <section className="relative h-[420px]">
        <img
          src={tour.image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 container mx-auto h-full px-6 flex flex-col justify-end pb-10 text-white">
          <p className="uppercase tracking-widest text-sm mb-3">
            Banyuwangi, Indonesia
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-5">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {tour.rating}
            </span>

            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {tour.duration}
            </span>

            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Max {tour.maxPeople} people
            </span>
          </div>
        </div>
      </section>

      {/* Details */}
      <main className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-3xl font-bold mb-5">
                About This Destination
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {description}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">
                Tour Itinerary
              </h2>

              <div className="space-y-5">
                {itinerary.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                      {index + 1}
                    </div>

                    <p className="text-muted-foreground pt-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">
                What's Included
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {included.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Information */}
          <aside>
            <div className="border rounded-xl p-6 space-y-6 sticky top-8">
              <div>
                <p className="text-sm text-muted-foreground">
                  Starting price
                </p>

                <p className="text-3xl font-bold text-primary">
                  ${tour.price.toLocaleString("en-US")}
                </p>

                <p className="text-sm text-muted-foreground">
                  Per person
                </p>
              </div>

              <div className="border-t pt-5 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Duration
                  </span>
                  <span>{tour.duration}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Max People
                  </span>
                  <span>{tour.maxPeople}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Rating
                  </span>
                  <span>{tour.rating}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </span>
                  <span>Banyuwangi</span>
                </div>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link href={`/${currentLang}/contact`}>
                  Contact Us
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href={`/${currentLang}`}>
                  Back to Destinations
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
