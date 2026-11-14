import { getDictionary, isSupportedLanguage } from "../dictionaries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Target, Eye, Heart } from "lucide-react"

const team = [
  { name: "Rizky Frimansyah Ramadhan", avatar: "/placeholder-user.jpg" },
  { name: "Fajar Kurniawan", avatar: "/placeholder-user.jpg" },
  { name: "Kungking", avatar: "/placeholder-user.jpg" },
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
      <section className="relative isolate overflow-hidden py-20 text-white bg-gradient-to-br from-teal-800 via-cyan-700 to-orange-500">
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-amber-300/25 blur-3xl" />
        <div className="absolute -bottom-48 -left-20 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{dict.about.title}</h1>
          <p className="text-xl text-white/85 mb-8">{dict.about.subtitle}</p>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed text-white/95">{dict.about.description}</p>
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
                  <p className="text-sm text-muted-foreground">{dict.site.about.team[index][0]}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{dict.site.about.team[index][1]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer dict={dict} lang={currentLang} />
    </div>
  )
}
