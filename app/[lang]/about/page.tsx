import { getDictionary, isSupportedLanguage } from "../dictionaries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Target, Eye, Heart, Award, Users, Globe } from "lucide-react"

const stats = [
  { number: "2000+", label: { ka: "კმაყოფილი მგზავრი", en: "Happy Travelers", ru: "Довольных путешественников" } },
  { number: "50+", label: { ka: "ტური", en: "Tours", ru: "Туров" } },
  { number: "8+", label: { ka: "წლიანი გამოცდილება", en: "Years Experience", ru: "Лет опыта" } },
  { number: "15+", label: { ka: "გამოცდილი გიდი", en: "Expert Guides", ru: "Опытных гидов" } },
]

const team = [
  {
    name: "Giorgi Beridze",
    position: { ka: "დამფუძნებელი და CEO", en: "Founder & CEO", ru: "Основатель и CEO" },
    description: {
      ka: "ტურიზმის სფეროში 15 წლიანი გამოცდილება",
      en: "15 years of experience in tourism industry",
      ru: "15 лет опыта в туристической индустрии",
    },
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Nino Kvaratskhelia",
    position: { ka: "ოპერაციების მენეჯერი", en: "Operations Manager", ru: "Менеджер по операциям" },
    description: {
      ka: "კულტურული ტურების სპეციალისტი",
      en: "Cultural tours specialist",
      ru: "Специалист по культурным турам",
    },
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Levan Maisuradze",
    position: { ka: "მთიანი ტურების ექსპერტი", en: "Mountain Tours Expert", ru: "Эксперт по горным турам" },
    description: {
      ka: "ალპინიზმის ინსტრუქტორი და გიდი",
      en: "Mountaineering instructor and guide",
      ru: "Инструктор по альпинизму и гид",
    },
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default async function AboutPage({
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
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{dict.about.title}</h1>
          <p className="text-xl text-muted-foreground mb-8">{dict.about.subtitle}</p>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed">{dict.about.description}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{dict.site.about.stats[index]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{dict.about.mission}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{dict.about.missionText}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{dict.about.vision}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{dict.about.visionText}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{dict.about.values}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{dict.about.valuesText}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{dict.staff.title}</h2>
            <p className="text-xl text-muted-foreground">{dict.staff.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{dict.site.about.team[index][0]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{dict.site.about.team[index][1]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {dict.site.about.whyTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{dict.site.about.features[0][0]}</h3>
              <p className="text-sm text-muted-foreground">{dict.site.about.features[0][1]}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{dict.site.about.features[1][0]}</h3>
              <p className="text-sm text-muted-foreground">{dict.site.about.features[1][1]}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{dict.site.about.features[2][0]}</h3>
              <p className="text-sm text-muted-foreground">{dict.site.about.features[2][1]}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{dict.site.about.features[3][0]}</h3>
              <p className="text-sm text-muted-foreground">{dict.site.about.features[3][1]}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer dict={dict} />
    </div>
  )
}
