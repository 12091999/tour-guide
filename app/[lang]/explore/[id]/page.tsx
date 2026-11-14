
import { getDictionary, isSupportedLanguage, type SupportedLanguage } from "../../dictionaries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, MapPin, Users, Star, CheckCircle } from "lucide-react"
import { formatPrice, getOnePersonLabel } from "@/lib/currency"

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
    price: 300000,
    maxPeople: 5,
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
    price: 250000,
    maxPeople: 5,
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
    price: 300000,
    maxPeople: 5,
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
    price: 300000,
    maxPeople: 5,
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

type AdditionalLanguage = "id" | "de" | "zh" | "ja" | "ko" | "fr" | "nl"
type LocalizedTourCopy = {
  title?: Partial<Record<AdditionalLanguage, string>>
  description?: Partial<Record<AdditionalLanguage, string>>
  itinerary?: Partial<Record<AdditionalLanguage, string[]>>
}
const translatedTours: Record<AdditionalLanguage, Record<number, LocalizedTourCopy>> = {
  id: {
    1: { title: { id: "Kawah Ijen" }, description: { id: "Jelajahi Kawah Ijen di Banyuwangi yang terkenal dengan api biru langka, lanskap vulkanik dramatis, dan danau kawah berwarna toska." }, itinerary: { id: ["Penjemputan dari hotel di Banyuwangi", "Perjalanan menuju pintu masuk pendakian Ijen", "Mendaki ke titik pandang kawah", "Menikmati pemandangan vulkanik yang menakjubkan", "Kembali ke Banyuwangi"] } },
    2: { title: { id: "Hutan Djawatan" }, description: { id: "Jelajahi Hutan Djawatan di Benculuk, Banyuwangi, dengan pepohonan trembesi tua yang besar dan suasana alam yang menenangkan." }, itinerary: { id: ["Penjemputan di Banyuwangi", "Perjalanan menuju Hutan Djawatan", "Menjelajahi pepohonan trembesi raksasa", "Berfoto dan menikmati waktu santai", "Kembali ke hotel"] } },
    3: { title: { id: "Pantai Bangsring" }, description: { id: "Nikmati pemandangan pesisir Pantai Bangsring yang indah, air laut jernih, kesempatan snorkeling, dan beragam aktivitas bahari." }, itinerary: { id: ["Penjemputan di Banyuwangi", "Perjalanan menuju Pantai Bangsring", "Menikmati pantai dan pemandangan pesisir", "Pilihan aktivitas snorkeling", "Kembali ke Banyuwangi"] } },
    4: { title: { id: "Teluk Hijau" }, description: { id: "Temukan Teluk Hijau, pantai tersembunyi yang indah di Taman Nasional Meru Betiri, Banyuwangi, Jawa Timur." }, itinerary: { id: ["Penjemputan di Banyuwangi", "Perjalanan menuju Taman Nasional Meru Betiri", "Melanjutkan perjalanan ke kawasan Teluk Hijau", "Menikmati pantai dan pemandangan alam", "Kembali ke Banyuwangi"] } },
  },
  de: {
    1: { title: { de: "Ijen-Krater" }, description: { de: "Entdecken Sie den Ijen-Krater in Banyuwangi, bekannt für sein seltenes blaues Feuer, die eindrucksvolle Vulkanlandschaft und den türkisfarbenen Kratersee." }, itinerary: { de: ["Abholung am Hotel in Banyuwangi", "Fahrt zum Startpunkt der Ijen-Wanderung", "Wanderung zum Aussichtspunkt am Krater", "Die beeindruckende Vulkanlandschaft genießen", "Rückfahrt nach Banyuwangi"] } },
    2: { title: { de: "Djawatan-Wald" }, description: { de: "Erkunden Sie den Djawatan-Wald in Benculuk bei Banyuwangi mit seinen riesigen alten Trembesi-Bäumen und der friedlichen Natur." }, itinerary: { de: ["Abholung in Banyuwangi", "Fahrt zum Djawatan-Wald", "Spaziergang zwischen den riesigen Trembesi-Bäumen", "Zeit für Fotos und Erholung", "Rückfahrt zum Hotel"] } },
    3: { title: { de: "Bangsring-Strand" }, description: { de: "Genießen Sie die Küstenlandschaft am Bangsring-Strand mit klarem Wasser, guten Schnorchelmöglichkeiten und Aktivitäten auf dem Meer." }, itinerary: { de: ["Abholung in Banyuwangi", "Fahrt zum Bangsring-Strand", "Strand und Küstenlandschaft genießen", "Optionales Schnorcheln", "Rückfahrt nach Banyuwangi"] } },
    4: { title: { de: "Teluk Hijau (Grüne Bucht)" }, description: { de: "Entdecken Sie Teluk Hijau, einen versteckten Strand im Nationalpark Meru Betiri bei Banyuwangi in Ostjava." }, itinerary: { de: ["Abholung in Banyuwangi", "Fahrt zum Nationalpark Meru Betiri", "Weiterfahrt in die Gegend von Teluk Hijau", "Strand und Natur genießen", "Rückfahrt nach Banyuwangi"] } },
  },
  zh: {
    1: { title: { zh: "伊真火山口" }, description: { zh: "探索外南梦的伊真火山口，这里以罕见的蓝色火焰、壮观的火山地貌和碧绿色火山湖闻名。" }, itinerary: { zh: ["从外南梦酒店接您", "前往伊真徒步入口", "徒步前往火山口观景点", "欣赏壮丽的火山景色", "返回外南梦"] } },
    2: { title: { zh: "爪哇森林" }, description: { zh: "探索外南梦本朱卢克的爪哇森林，欣赏高大的古老雨树，感受宁静的自然氛围。" }, itinerary: { zh: ["在外南梦接您", "前往爪哇森林", "漫步观赏巨大的雨树", "拍照并自由休息", "返回酒店"] } },
    3: { title: { zh: "邦斯林海滩" }, description: { zh: "欣赏邦斯林海滩的美丽海岸风光，体验清澈海水、浮潜和丰富的海上活动。" }, itinerary: { zh: ["在外南梦接您", "前往邦斯林海滩", "享受海滩与海岸风光", "可选择参加浮潜活动", "返回外南梦"] } },
    4: { title: { zh: "绿湾（特鲁克希瑙）" }, description: { zh: "探索东爪哇外南梦梅鲁贝蒂里国家公园内风景优美的隐秘海滩绿湾。" }, itinerary: { zh: ["在外南梦接您", "前往梅鲁贝蒂里国家公园", "继续前往绿湾区域", "享受海滩与自然风光", "返回外南梦"] } },
  },
  ja: {
    1: { title: { ja: "イジェン火口" }, description: { ja: "珍しい青い炎、迫力ある火山の景色、ターコイズ色の火口湖で知られるバニュワンギのイジェン火口を訪れます。" }, itinerary: { ja: ["バニュワンギのホテルへお迎え", "イジェン登山口まで移動", "火口の展望地点までハイキング", "壮大な火山の景色を満喫", "バニュワンギへ戻ります"] } },
    2: { title: { ja: "ジャワタンの森" }, description: { ja: "バニュワンギ近郊のベンチュルクにあるジャワタンの森で、巨大な古木と穏やかな自然をお楽しみください。" }, itinerary: { ja: ["バニュワンギでお迎え", "ジャワタンの森へ移動", "巨大なトレンベシの木々を散策", "写真撮影と自由時間", "ホテルへ戻ります"] } },
    3: { title: { ja: "バンスリン海岸" }, description: { ja: "透明な海とシュノーケリング、マリンアクティビティで人気のバンスリン海岸の美しい景色を楽しみます。" }, itinerary: { ja: ["バニュワンギでお迎え", "バンスリン海岸へ移動", "ビーチと海岸の景色を満喫", "希望者はシュノーケリング", "バニュワンギへ戻ります"] } },
    4: { title: { ja: "テルク・ヒジャウ（グリーンベイ）" }, description: { ja: "東ジャワのバニュワンギにあるメル・ベティリ国立公園で、隠れた美しいビーチを訪れます。" }, itinerary: { ja: ["バニュワンギでお迎え", "メル・ベティリ国立公園へ移動", "グリーンベイエリアへ移動", "ビーチと自然の景色を満喫", "バニュワンギへ戻ります"] } },
  },
  ko: {
    1: { title: { ko: "이젠 분화구" }, description: { ko: "희귀한 푸른 불꽃과 웅장한 화산 풍경, 청록색 분화호로 유명한 반유왕이의 이젠 분화구를 만나보세요." }, itinerary: { ko: ["반유왕이 호텔에서 픽업", "이젠 트레킹 입구로 이동", "분화구 전망대까지 트레킹", "아름다운 화산 풍경 감상", "반유왕이로 돌아갑니다"] } },
    2: { title: { ko: "자와탄 숲" }, description: { ko: "반유왕이 벤출룩의 자와탄 숲에서 거대한 오래된 트렘베시 나무와 평화로운 자연을 즐겨보세요." }, itinerary: { ko: ["반유왕이에서 픽업", "자와탄 숲으로 이동", "거대한 트렘베시 나무 사이 산책", "사진 촬영 및 자유 시간", "호텔로 돌아갑니다"] } },
    3: { title: { ko: "방스링 해변" }, description: { ko: "맑은 바다와 스노클링, 다양한 해양 활동으로 유명한 방스링 해변의 아름다운 해안 풍경을 즐겨보세요." }, itinerary: { ko: ["반유왕이에서 픽업", "방스링 해변으로 이동", "해변과 해안 풍경 즐기기", "선택 가능한 스노클링", "반유왕이로 돌아갑니다"] } },
    4: { title: { ko: "텔룩 히자우 (그린 베이)" }, description: { ko: "동자바 반유왕이의 메루 베티리 국립공원에 숨겨진 아름다운 해변 텔룩 히자우를 만나보세요." }, itinerary: { ko: ["반유왕이에서 픽업", "메루 베티리 국립공원으로 이동", "그린 베이 지역으로 이동", "해변과 자연 풍경 즐기기", "반유왕이로 돌아갑니다"] } },
  },
  fr: {
    1: { title: { fr: "Cratère d’Ijen" }, description: { fr: "Découvrez le cratère d’Ijen à Banyuwangi, célèbre pour son rare feu bleu, ses paysages volcaniques et son lac turquoise." }, itinerary: { fr: ["Prise en charge à l’hôtel à Banyuwangi", "Route jusqu’au départ de la randonnée d’Ijen", "Marche jusqu’au belvédère du cratère", "Admirez les paysages volcaniques", "Retour à Banyuwangi"] } },
    2: { title: { fr: "Forêt de Djawatan" }, description: { fr: "Explorez la forêt de Djawatan à Benculuk, près de Banyuwangi, avec ses immenses trembesi centenaires et son atmosphère paisible." }, itinerary: { fr: ["Prise en charge à Banyuwangi", "Route vers la forêt de Djawatan", "Promenade parmi les immenses trembesi", "Photos et temps libre", "Retour à l’hôtel"] } },
    3: { title: { fr: "Plage de Bangsring" }, description: { fr: "Profitez du littoral de Bangsring, de ses eaux limpides, de ses possibilités de snorkeling et de ses activités nautiques." }, itinerary: { fr: ["Prise en charge à Banyuwangi", "Route vers la plage de Bangsring", "Profitez de la plage et du littoral", "Snorkeling en option", "Retour à Banyuwangi"] } },
    4: { title: { fr: "Teluk Hijau (Baie Verte)" }, description: { fr: "Découvrez Teluk Hijau, une plage préservée du parc national de Meru Betiri, à Banyuwangi, dans l’est de Java." }, itinerary: { fr: ["Prise en charge à Banyuwangi", "Route vers le parc national de Meru Betiri", "Continuation vers la baie de Teluk Hijau", "Profitez de la plage et de la nature", "Retour à Banyuwangi"] } },
  },
  nl: {
    1: { title: { nl: "Ijen-krater" }, description: { nl: "Ontdek de Ijen-krater bij Banyuwangi, bekend om het zeldzame blauwe vuur, het indrukwekkende vulkaanlandschap en het turquoise kratermeer." }, itinerary: { nl: ["Ophalen bij je hotel in Banyuwangi", "Rit naar het startpunt van de Ijen-wandeling", "Wandeling naar het uitzichtpunt bij de krater", "Geniet van het indrukwekkende vulkaanlandschap", "Terug naar Banyuwangi"] } },
    2: { title: { nl: "Djawatan-bos" }, description: { nl: "Verken het Djawatan-bos in Benculuk bij Banyuwangi, met enorme oude trembesibomen en een rustige natuurlijke sfeer." }, itinerary: { nl: ["Ophalen in Banyuwangi", "Rit naar het Djawatan-bos", "Wandeling langs de reusachtige trembesibomen", "Tijd voor foto's en ontspanning", "Terug naar het hotel"] } },
    3: { title: { nl: "Bangsring-strand" }, description: { nl: "Geniet van de kust bij Bangsring, met helder zeewater, snorkelmogelijkheden en leuke activiteiten op zee." }, itinerary: { nl: ["Ophalen in Banyuwangi", "Rit naar Bangsring-strand", "Geniet van het strand en de kust", "Optioneel snorkelen", "Terug naar Banyuwangi"] } },
    4: { title: { nl: "Teluk Hijau (Groene Baai)" }, description: { nl: "Ontdek Teluk Hijau, een verborgen strand in nationaal park Meru Betiri bij Banyuwangi in Oost-Java." }, itinerary: { nl: ["Ophalen in Banyuwangi", "Rit naar nationaal park Meru Betiri", "Verder naar de omgeving van Teluk Hijau", "Geniet van het strand en de natuur", "Terug naar Banyuwangi"] } },
  },
}

const translatedIncluded: Record<AdditionalLanguage, string[]> = {
  id: ["Pemandu lokal profesional", "Transportasi", "Air minum", "Bantuan perjalanan"],
  de: ["Professioneller lokaler Guide", "Transport", "Trinkwasser", "Reiseunterstützung"],
  zh: ["专业当地向导", "交通", "饮用水", "旅行协助"],
  ja: ["経験豊富な現地ガイド", "交通", "飲料水", "旅行サポート"],
  ko: ["전문 현지 가이드", "교통편", "식수", "여행 지원"],
  fr: ["Guide local professionnel", "Transport", "Eau potable", "Assistance pendant le voyage"],
  nl: ["Professionele lokale gids", "Vervoer", "Drinkwater", "Reisassistentie"],
}

function formatDuration(duration: string, locale: SupportedLanguage) {
  const match = duration.match(/^(\d+)\s+(hours?|days?)$/i)
  if (!match) return duration

  const [, amount, unit] = match
  const isDay = unit.toLowerCase().startsWith("day")
  const units: Record<SupportedLanguage, [string, string]> = {
    id: ["jam", "hari"], en: ["hours", "days"], "en-au": ["hours", "days"],
    de: ["Stunden", "Tage"], zh: ["小时", "天"], ja: ["時間", "日"],
    ko: ["시간", "일"], fr: ["heures", "jours"], nl: ["uur", "dagen"],
    ru: ["часов", "дней"], ka: ["hours", "days"],
  }
  return `${amount} ${units[locale][isDay ? 1 : 0]}`
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id } = await params

  const currentLang: SupportedLanguage = isSupportedLanguage(lang) ? lang : "en"

  const dict = await getDictionary(currentLang)
  const labels = dict.site.detail

  const tourId = Number(id)
  const tour = tourData[tourId]
  const localizedPrice = tour ? await formatPrice(tour.price, "IDR", currentLang) : null

  if (!Number.isInteger(tourId) || !tour) {
    return (
      <div className="min-h-screen bg-background">
        <Header dict={dict} lang={currentLang} />

        <main className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {labels.notFound}
          </h1>

          <p className="text-muted-foreground mb-8">
            {labels.notFoundDescription}
          </p>

          <Button asChild>
            <Link href={`/${currentLang}`}>
              {labels.backHome}
            </Link>
          </Button>
        </main>

        <Footer dict={dict} lang={currentLang} />
      </div>
    )
  }

  const tourLang: TourLanguage = currentLang in tour.title ? currentLang as TourLanguage : "en"
  const hasAdditionalTranslation = currentLang in translatedTours
  const localeCopy = hasAdditionalTranslation
    ? translatedTours[currentLang as AdditionalLanguage][tourId]
    : undefined
  const title = localeCopy?.title?.[currentLang as AdditionalLanguage] ?? tour.title[tourLang]
  const description = localeCopy?.description?.[currentLang as AdditionalLanguage] ?? tour.description[tourLang]
  const itinerary = localeCopy?.itinerary?.[currentLang as AdditionalLanguage] ?? tour.itinerary[tourLang]
  const included = hasAdditionalTranslation
    ? translatedIncluded[currentLang as AdditionalLanguage]
    : tour.included[tourLang]
  const duration = formatDuration(tour.duration, currentLang)

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
              {duration}
            </span>

            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {labels.maxPeople.replace("{count}", String(tour.maxPeople))}
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
                {labels.about}
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {description}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">
                {labels.itinerary}
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
                {labels.included}
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
                  {labels.startingPrice}
                </p>

                <p className="text-3xl font-bold text-primary">
                  {localizedPrice?.formatted}
                </p>

                <p className="text-sm text-muted-foreground">
                  {getOnePersonLabel(currentLang)}
                </p>
              </div>

              <div className="border-t pt-5 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {labels.duration}
                  </span>
                  <span>{duration}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {labels.maxPeopleLabel}
                  </span>
                  <span>{tour.maxPeople}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    {labels.rating}
                  </span>
                  <span>{tour.rating}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {labels.location}
                  </span>
                  <span>Banyuwangi</span>
                </div>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link href={`/${currentLang}/contact`}>
                  {labels.contact}
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href={`/${currentLang}`}>
                  {labels.back}
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </main>

      <Footer dict={dict} lang={currentLang} />
    </div>
  )
}
