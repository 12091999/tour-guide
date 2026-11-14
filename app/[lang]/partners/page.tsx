import { ArrowUpRight, BedDouble, Bike, Utensils } from "lucide-react"
import { getDictionary, isSupportedLanguage } from "../dictionaries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { getWhatsAppUrl } from "@/lib/whatsapp"

const copy: Record<string, { title: string; intro: string; recommended: string; dining: string; stays: string; mobility: string; contact: string; contactCta: string; note: string }> = {
  id: { title: "Mitra Lokal Tour Guide", intro: "Temukan pilihan tempat makan, penginapan, dan bantuan rental motor untuk perjalanan Anda di Banyuwangi.", recommended: "Pilihan lokal", dining: "Tempat Makan", stays: "Penginapan", mobility: "Rental Motor Roda Dua", contact: "Butuh bantuan mencari rental motor yang tersedia? Hubungi tim Tour Guide.", contactCta: "Hubungi Tour Guide", note: "Pilihan tempat pada halaman ini merupakan rekomendasi lokal. Ketersediaan dan layanan dapat berubah; silakan konfirmasi langsung." },
  en: { title: "Tour Guide Local Partners", intro: "Explore dining, accommodation and motorbike rental options for your trip around Banyuwangi.", recommended: "Local recommendations", dining: "Places to Eat", stays: "Places to Stay", mobility: "Motorbike Rental", contact: "Need help finding an available motorbike rental? Get in touch with the Tour Guide team.", contactCta: "Contact Tour Guide", note: "Listings are local recommendations. Availability and services may change; please confirm directly." },
  "en-au": { title: "Tour Guide Local Partners", intro: "Explore dining, accommodation and motorbike hire options for your trip around Banyuwangi.", recommended: "Local recommendations", dining: "Places to Eat", stays: "Places to Stay", mobility: "Motorbike Hire", contact: "Need help finding an available motorbike hire? Get in touch with the Tour Guide team.", contactCta: "Contact Tour Guide", note: "Listings are local recommendations. Availability and services may change; please confirm directly." },
  de: { title: "Lokale Partner von Tour Guide", intro: "Entdecken Sie Restaurants, Unterkünfte und Motorradverleihe für Ihre Reise durch Banyuwangi.", recommended: "Lokale Empfehlungen", dining: "Restaurants", stays: "Unterkünfte", mobility: "Motorradverleih", contact: "Sie suchen einen verfügbaren Motorradverleih? Kontaktieren Sie das Tour-Guide-Team.", contactCta: "Tour Guide kontaktieren", note: "Die Einträge sind lokale Empfehlungen. Verfügbarkeit und Leistungen können sich ändern; bitte direkt bestätigen." },
  zh: { title: "Tour Guide 本地合作推荐", intro: "查看巴纽旺宜旅行中的餐饮、住宿和摩托车租赁选择。", recommended: "本地推荐", dining: "餐饮", stays: "住宿", mobility: "摩托车租赁", contact: "需要协助寻找可租用的摩托车？请联系 Tour Guide 团队。", contactCta: "联系 Tour Guide", note: "本页所列为本地推荐，服务和空位可能变化，请直接确认。" },
  ja: { title: "Tour Guideの現地パートナー", intro: "バニュワンギ旅行に便利な飲食店、宿泊施設、バイクレンタルをご紹介します。", recommended: "現地のおすすめ", dining: "飲食店", stays: "宿泊施設", mobility: "バイクレンタル", contact: "利用可能なレンタルバイクをお探しですか？Tour Guideまでお問い合わせください。", contactCta: "Tour Guideに問い合わせる", note: "掲載先は現地のおすすめです。営業状況や空き状況は変わるため、直接ご確認ください。" },
  ko: { title: "Tour Guide 현지 파트너", intro: "반유왕이 여행에 필요한 식당, 숙박 시설 및 오토바이 대여 정보를 확인하세요.", recommended: "현지 추천", dining: "식당", stays: "숙박", mobility: "오토바이 대여", contact: "이용 가능한 오토바이 대여를 찾고 계신가요? Tour Guide 팀에 문의하세요.", contactCta: "Tour Guide 문의", note: "이 목록은 현지 추천 정보입니다. 영업 및 이용 가능 여부는 직접 확인해 주세요." },
  fr: { title: "Partenaires locaux de Tour Guide", intro: "Découvrez des restaurants, hébergements et options de location de motos pour votre séjour à Banyuwangi.", recommended: "Recommandations locales", dining: "Où manger", stays: "Où séjourner", mobility: "Location de motos", contact: "Besoin d’aide pour trouver une moto disponible ? Contactez l’équipe Tour Guide.", contactCta: "Contacter Tour Guide", note: "Ces adresses sont des recommandations locales. Vérifiez directement les services et disponibilités." },
  nl: { title: "Lokale partners van Tour Guide", intro: "Bekijk restaurants, accommodaties en motorverhuur voor je reis door Banyuwangi.", recommended: "Lokale aanbevelingen", dining: "Eten", stays: "Overnachten", mobility: "Motorverhuur", contact: "Hulp nodig bij het vinden van beschikbare motorverhuur? Neem contact op met Tour Guide.", contactCta: "Contact met Tour Guide", note: "Dit zijn lokale aanbevelingen. Controleer diensten en beschikbaarheid rechtstreeks." },
  ru: { title: "Местные партнёры Tour Guide", intro: "Рестораны, жильё и аренда мотоциклов для поездки по Баньюванги.", recommended: "Местные рекомендации", dining: "Где поесть", stays: "Где остановиться", mobility: "Аренда мотоциклов", contact: "Нужна помощь с поиском свободного мотоцикла? Свяжитесь с командой Tour Guide.", contactCta: "Связаться с Tour Guide", note: "В списке представлены местные рекомендации. Уточняйте услуги и наличие напрямую." },
  ka: { title: "Tour Guide-ის ადგილობრივი პარტნიორები", intro: "აღმოაჩინეთ კვების ობიექტები, საცხოვრებლები და მოტოციკლების გაქირავება ბანიუვანგიში.", recommended: "ადგილობრივი რეკომენდაციები", dining: "კვება", stays: "განთავსება", mobility: "მოტოციკლის გაქირავება", contact: "გჭირდებათ დახმარება ხელმისაწვდომი მოტოციკლის პოვნაში? დაუკავშირდით Tour Guide-ის გუნდს.", contactCta: "Tour Guide-თან დაკავშირება", note: "ჩამონათვალი ადგილობრივი რეკომენდაციებია. მომსახურება და ხელმისაწვდომობა პირდაპირ გადაამოწმეთ." },
}

const diningPartners = [
  { name: "Wisma Bar & Restaurant", detail: "Pulau Merah · Indonesian, Javanese and international dishes", href: "https://redislandwisma.com/" },
  { name: "RM Valentine", detail: "Wongsorejo · Indonesian meals", href: "https://www.google.com/maps/search/?api=1&query=RM+Valentine+Wongsorejo+Banyuwangi" },
  { name: "Jawa Jiwa G-Land Dining", detail: "Alas Purwo · Resort dining", href: "https://jawajiwa.com/" },
  { name: "The Osing Bamboo Restaurant", detail: "Glagah · Indonesian food and seafood", href: "https://www.google.com/maps/search/?api=1&query=The+Osing+Bamboo+Restaurant+Banyuwangi" },
]

const stayPartners = [
  { name: "The Wisma Pulau Merah", detail: "Beachside stay · Pesanggaran", href: "https://redislandwisma.com/" },
  { name: "Grand Baluran Villa / RedDoorz near Baluran", detail: "Accommodation near Baluran National Park", href: "https://www.google.com/maps/search/?api=1&query=Grand+Baluran+Villa+Wonorejo" },
  { name: "Jawa Jiwa G-Land", detail: "Glamping and bungalows · Alas Purwo", href: "https://jawajiwa.com/" },
  { name: "Herry's Guesthouse", detail: "Guesthouse · Glagah", href: "https://www.google.com/maps/search/?api=1&query=Herry%27s+Guesthouse+Banyuwangi" },
  { name: "Lintang Luku Tent Resort", detail: "Tent resort · Licin", href: "https://www.google.com/maps/search/?api=1&query=Lintang+Luku+Tent+Resort" },
]

export default async function PartnersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const currentLang = isSupportedLanguage(lang) ? lang : "en"
  const dict = await getDictionary(currentLang)
  const text = copy[currentLang] ?? copy.en
  const groups = [
    { title: text.dining, icon: Utensils, partners: diningPartners },
    { title: text.stays, icon: BedDouble, partners: stayPartners },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header dict={dict} lang={currentLang} />
      <main className="pt-16">
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-teal-800 via-cyan-700 to-orange-500 py-16 text-white">
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-amber-300/25 blur-3xl" />
          <div className="absolute -bottom-48 -left-20 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
            <p className="mb-3 text-sm uppercase tracking-widest text-amber-200">{text.recommended}</p>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{text.title}</h1>
            <p className="mx-auto max-w-3xl text-lg text-white/90">{text.intro}</p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl space-y-14 px-6 py-16 lg:px-8">
          {groups.map(({ title, icon: Icon, partners }) => (
            <div key={title}>
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold"><Icon className="h-6 w-6 text-primary" />{title}</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {partners.map((partner) => (
                  <Card key={partner.name} className="h-full">
                    <CardContent className="flex h-full flex-col justify-between gap-4 p-6">
                      <div>
                        <h3 className="text-lg font-semibold">{partner.name}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{partner.detail}</p>
                      </div>
                      <a className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline" href={partner.href} target="_blank" rel="noreferrer">
                        {text.recommended}<ArrowUpRight className="h-4 w-4" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
          <div className="rounded-2xl border bg-muted/30 p-6 md:flex md:items-center md:justify-between md:gap-8">
            <div className="flex items-start gap-4">
              <Bike className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <div>
                <h2 className="text-2xl font-semibold">{text.mobility}</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">{text.contact}</p>
              </div>
            </div>
            <a href={getWhatsAppUrl(currentLang === "id" ? "Halo Tour Guide, saya mencari rental motor roda dua di Banyuwangi." : "Hi Tour Guide, I am looking for a motorbike rental in Banyuwangi.")} target="_blank" rel="noreferrer" className="mt-5 inline-flex shrink-0 rounded-full bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700 md:mt-0">{currentLang === "id" ? "Pesan via WhatsApp" : "Message us on WhatsApp"}</a>
          </div>
          <p className="text-xs text-muted-foreground">{text.note}</p>
        </section>
      </main>
      <Footer dict={dict} lang={currentLang} />
    </div>
  )
}
