import { getDictionary } from "../dictionaries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, MapPin, Mountain, Zap, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BookingModal } from "@/components/booking-modal"

const allExtremeTours = [
  {
    id: 1,
    title: {
      ka: "კაზბეგის ექსტრემალური ჯიპ ტური",
      en: "Kazbegi Extreme Jeep Tour",
      ru: "Экстремальный джип-тур в Казбеги",
    },
    description: {
      ka: "ექსტრემალური ჯიპ ტური კაზბეგის მთებში 4x4 მანქანებით",
      en: "Extreme jeep tour in Kazbegi mountains with 4x4 vehicles",
      ru: "Экстремальный джип-тур в горах Казбеги на внедорожниках 4x4",
    },
    duration: "8h",
    price: 180,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    difficulty: "advanced",
    category: "jeep",
    location: "Kazbegi",
  },
  {
    id: 2,
    title: {
      ka: "სვანეთის ექსტრემალური ტრეკინგი",
      en: "Svaneti Extreme Trekking",
      ru: "Экстремальный трекинг в Сванетии",
    },
    description: {
      ka: "5-დღიანი ექსტრემალური ტრეკინგი სვანეთის ველურ ბუნებაში",
      en: "5-day extreme trekking in Svaneti's wilderness",
      ru: "5-дневный экстремальный трекинг в дикой природе Сванетии",
    },
    duration: "5 days",
    price: 450,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    difficulty: "expert",
    category: "hiking",
    location: "Svaneti",
  },
  {
    id: 3,
    title: {
      ka: "მტკვრის რაფტინგი",
      en: "Mtkvari River Rafting",
      ru: "Рафтинг по реке Мтквари",
    },
    description: {
      ka: "ექსტრემალური რაფტინგი მტკვრის ველურ წყლებში",
      en: "Extreme rafting on Mtkvari's wild waters",
      ru: "Экстремальный рафтинг по диким водам Мтквари",
    },
    duration: "6h",
    price: 120,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    difficulty: "intermediate",
    category: "rafting",
    location: "Tbilisi Region",
  },
  {
    id: 4,
    title: {
      ka: "ტუშეთის ოფ-როუდ ექსპედიცია",
      en: "Tusheti Off-Road Expedition",
      ru: "Внедорожная экспедиция в Тушетию",
    },
    description: {
      ka: "3-დღიანი ოფ-როუდ ექსპედიცია ტუშეთის მიუვალ მთებში",
      en: "3-day off-road expedition in Tusheti's remote mountains",
      ru: "3-дневная внедорожная экспедиция в отдаленные горы Тушетии",
    },
    duration: "3 days",
    price: 320,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    difficulty: "expert",
    category: "jeep",
    location: "Tusheti",
  },
  {
    id: 5,
    title: {
      ka: "კავკასიონის ალპინიზმი",
      en: "Caucasus Rock Climbing",
      ru: "Скалолазание на Кавказе",
    },
    description: {
      ka: "ექსტრემალური ალპინიზმი კავკასიონის მთებში",
      en: "Extreme rock climbing in Caucasus mountains",
      ru: "Экстремальное скалолазание в горах Кавказа",
    },
    duration: "4 days",
    price: 380,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    difficulty: "expert",
    category: "climbing",
    location: "Caucasus",
  },
  {
    id: 6,
    title: {
      ka: "გუდაურის ზამთრის ექსტრემი",
      en: "Gudauri Winter Extreme",
      ru: "Зимний экстрим в Гудаури",
    },
    description: {
      ka: "ზამთრის ექსტრემალური სპორტი გუდაურში",
      en: "Winter extreme sports in Gudauri",
      ru: "Зимние экстремальные виды спорта в Гудаури",
    },
    duration: "2 days",
    price: 250,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    difficulty: "advanced",
    category: "winter",
    location: "Gudauri",
  },
]

export default async function ToursPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as "ka" | "en" | "ru")

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500"
      case "intermediate":
        return "bg-yellow-500"
      case "advanced":
        return "bg-orange-500"
      case "expert":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header dict={dict} lang={lang} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600/10 to-red-600/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mountain className="h-8 w-8 text-orange-600" />
            <Zap className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{dict.tours.allTours}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{dict.tours.subtitle}</p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allExtremeTours.map((tour) => (
              <Card
                key={tour.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200"
              >
                <div className="relative h-48">
                  <Image
                    src={tour.image || "/placeholder.svg"}
                    alt={tour.title[lang as keyof typeof tour.title]}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-orange-600">
                    <Star className="h-3 w-3 mr-1" />
                    {tour.rating}
                  </Badge>
                  <Badge className={`absolute top-4 left-4 ${getDifficultyColor(tour.difficulty)} text-white`}>
                    {dict.tours[tour.difficulty as keyof typeof dict.tours]}
                  </Badge>
                  <Badge variant="secondary" className="absolute bottom-4 left-4 bg-black/70 text-white">
                    {dict.tours[tour.category as keyof typeof dict.tours] || tour.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-orange-500" />
                    {tour.title[lang as keyof typeof tour.title]}
                  </CardTitle>
                  <CardDescription>{tour.description[lang as keyof typeof tour.description]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {tour.location}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        {dict.tours[tour.difficulty as keyof typeof dict.tours]}
                      </div>
                      <div className="text-2xl font-bold text-orange-600">
                        ${tour.price}{" "}
                        <span className="text-sm font-normal text-muted-foreground">{dict.tours.from}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Link href={`/${lang}/tours/${tour.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent border-orange-200 hover:bg-orange-50">
                      {dict.tours.viewDetails}
                    </Button>
                  </Link>
                  <BookingModal
                    tourTitle={tour.title[lang as keyof typeof tour.title]}
                    tourPrice={tour.price}
                    duration={tour.duration}
                    difficulty={dict.tours[tour.difficulty as keyof typeof dict.tours]}
                    dict={dict}
                  >
                    <Button className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                      <Mountain className="h-4 w-4 mr-1" />
                      {dict.tours.bookNow}
                    </Button>
                  </BookingModal>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  )
}
