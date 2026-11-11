import { getDictionary } from "./dictionaries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Clock, Mountain, Zap, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BookingModal } from "@/components/booking-modal"

const extremeTours = [
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
  },
]

const testimonials = [
  {
    name: "Alex Johnson",
    country: "USA",
    rating: 5,
    comment: {
      ka: "დაუვიწყარი ადრენალინი! ჯიპ ტური კაზბეგში იყო ფანტასტიკური!",
      en: "Unforgettable adrenaline! The jeep tour in Kazbegi was fantastic!",
      ru: "Незабываемый адреналин! Джип-тур в Казбеги был фантастическим!",
    },
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Maria Volkov",
    country: "Russia",
    rating: 5,
    comment: {
      ka: "ექსტრემალური ტრეკინგი სვანეთში - ჩემი ცხოვრების საუკეთესო გამოცდილება!",
      en: "Extreme trekking in Svaneti - the best experience of my life!",
      ru: "Экстремальный трекинг в Сванетии - лучший опыт в моей жизни!",
    },
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Hans Mueller",
    country: "Germany",
    rating: 5,
    comment: {
      ka: "პროფესიონალური გუნდი და უსაფრთხო ექსტრემალური თავგადასავალი!",
      en: "Professional team and safe extreme adventure!",
      ru: "Профессиональная команда и безопасные экстремальные приключения!",
    },
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const staff = [
  {
    name: "Giorgi Beridze",
    position: {
      ka: "ექსტრემალური ტურების ინსტრუქტორი",
      en: "Extreme Tours Instructor",
      ru: "Инструктор экстремальных туров",
    },
    experience: "12 years",
    specialization: ["Jeep Tours", "Mountain Rescue", "Off-road Driving"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Nino Kvaratskhelia",
    position: {
      ka: "ალპინიზმის ინსტრუქტორი",
      en: "Mountaineering Instructor",
      ru: "Инструктор по альпинизму",
    },
    experience: "10 years",
    specialization: ["Rock Climbing", "High Altitude Trekking", "Rescue Operations"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Levan Maisuradze",
    position: {
      ka: "რაფტინგის ექსპერტი",
      en: "Rafting Expert",
      ru: "Эксперт по рафтингу",
    },
    experience: "8 years",
    specialization: ["White Water Rafting", "Water Safety", "Kayaking"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default async function HomePage({
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
      <section className="relative h-[700px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50">
          <Image
            src="/placeholder.svg?height=700&width=1400"
            alt="Extreme adventure in Georgia"
            fill
            className="object-cover -z-10"
          />
        </div>
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mountain className="h-8 w-8 text-orange-500" />
            <Zap className="h-8 w-8 text-yellow-500" />
            <Mountain className="h-8 w-8 text-orange-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            {dict.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">{dict.hero.subtitle}</p>
          <Button
            size="lg"
            className="text-lg px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          >
            <Zap className="h-5 w-5 mr-2" />
            {dict.hero.cta}
          </Button>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Zap className="h-8 w-8 text-orange-500" />
              {dict.tours.title}
            </h2>
            <p className="text-xl text-muted-foreground">{dict.tours.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {extremeTours.map((tour) => (
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
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-orange-500" />
                    {tour.title[lang as keyof typeof tour.title]}
                  </CardTitle>
                  <CardDescription>{tour.description[lang as keyof typeof tour.description]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      {dict.tours.difficulty}: {dict.tours[tour.difficulty as keyof typeof dict.tours]}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    ${tour.price} <span className="text-sm font-normal text-muted-foreground">{dict.tours.from}</span>
                  </div>
                </CardContent>
                <CardFooter>
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
                      <Mountain className="h-4 w-4 mr-2" />
                      {dict.tours.bookNow}
                    </Button>
                  </BookingModal>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{dict.testimonials.title}</h2>
            <p className="text-xl text-muted-foreground">{dict.testimonials.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.country}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "{testimonial.comment[lang as keyof typeof testimonial.comment]}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{dict.staff.title}</h2>
            <p className="text-xl text-muted-foreground">{dict.staff.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {staff.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-orange-200">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-orange-700">{member.name}</CardTitle>
                  <CardDescription>{member.position[lang as keyof typeof member.position]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <strong>Experience:</strong> {member.experience}
                    </p>
                    <p>
                      <strong>Specialization:</strong> {member.specialization.join(", ")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer dict={dict} lang={lang} />
    </div>
  )
}
