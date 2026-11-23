
import { getDictionary, isSupportedLanguage, type SupportedLanguage } from "../../dictionaries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, MapPin, Users, Star, CheckCircle } from "lucide-react"
import { formatPrice, getOnePersonLabel } from "@/lib/currency"
import { getWhatsAppUrl } from "@/lib/whatsapp"

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
    duration: "10 hours",
    difficulty: "Moderate",
    price: 300000,
    maxPeople: 5,
    rating: 4.8,
    image: "/ijen.jpg",
    itinerary: {
      en: [
        "00:00 — Hotel pickup in Banyuwangi (suggested time; confirm with your guide)",
        "01:30 — Arrive at Paltuding, check tickets and health documents, and prepare safety equipment",
        "02:00 — Enter the trail when the official hiking gate opens",
        "02:00–05:30 — Guided ascent; crater access depends on current safety instructions",
        "05:30–07:00 — Viewpoint and sunrise, subject to weather and access rules",
        "07:00–08:30 — Descend and have the included meal",
        "08:30–10:00 — Return to Banyuwangi (estimated; traffic may change arrival time)",
      ],
      ka: [
        "00:00 — Hotel pickup in Banyuwangi (suggested time; confirm with your guide)",
        "01:30 — Arrive at Paltuding, check tickets and health documents, and prepare safety equipment",
        "02:00 — Enter the trail when the official hiking gate opens",
        "02:00–05:30 — Guided ascent; crater access depends on current safety instructions",
        "05:30–07:00 — Viewpoint and sunrise, subject to weather and access rules",
        "07:00–08:30 — Descend and have the included meal",
        "08:30–10:00 — Return to Banyuwangi (estimated; traffic may change arrival time)",
      ],
      ru: [
        "00:00 — Выезд из отеля в Баньюванги (время предварительное)",
        "01:30 — Прибытие в Палтудинг, проверка билетов и медицинских документов, подготовка снаряжения",
        "02:00 — Вход на маршрут после открытия официального входа",
        "02:00–05:30 — Подъём с гидом; доступ к кратеру зависит от действующих правил безопасности",
        "05:30–07:00 — Смотровая площадка и рассвет, если позволяют погода и правила доступа",
        "07:00–08:30 — Спуск и включённый приём пищи",
        "08:30–10:00 — Возвращение в Баньюванги (ориентировочно)",
      ],
    },
    included: {
      en: ["Entrance ticket", "Health certificate", "Meal", "Flashlight", "Gas mask", "Hiking pole"],
      ka: ["Entrance ticket", "Health certificate", "Meal", "Flashlight", "Gas mask", "Hiking pole"],
      ru: [
        "Входной билет", "Медицинская справка", "Питание", "Фонарик", "Противогаз", "Палка для треккинга",
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
    duration: "6 hours",
    difficulty: "Easy",
    price: 250000,
    maxPeople: 5,
    rating: 4.8,
    image: "/djawatan.jpg",
    itinerary: {
      en: ["08:00 — Pickup in Banyuwangi", "09:30 — Arrive at Djawatan and enter the forest", "10:00–12:00 — Explore the trembesi trees and photo spots", "12:00–13:00 — Included meal", "13:00–14:00 — Free time and return preparation", "14:00–15:30 — Return to Banyuwangi (estimated)"],
      ka: ["08:00 — Pickup in Banyuwangi", "09:30 — Arrive at Djawatan and enter the forest", "10:00–12:00 — Explore the trembesi trees and photo spots", "12:00–13:00 — Included meal", "13:00–14:00 — Free time and return preparation", "14:00–15:30 — Return to Banyuwangi (estimated)"],
      ru: [
        "08:00 — Выезд из Баньюванги",
        "09:30 — Прибытие в Джаватан и вход в лес",
        "10:00–12:00 — Прогулка среди деревьев трембези и фотопаузы",
        "12:00–13:00 — Включённый приём пищи",
        "13:00–14:00 — Свободное время и подготовка к отъезду",
        "14:00–15:30 — Возвращение в Баньюванги (ориентировочно)",
      ],
    },
    included: {
      en: ["Djawatan entrance ticket", "Meal"],
      ka: ["Djawatan entrance ticket", "Meal"],
      ru: [
        "Входной билет в Джаватан", "Питание",
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
    duration: "8 hours",
    difficulty: "Easy",
    price: 300000,
    maxPeople: 5,
    rating: 4.7,
    image: "/bangsring-underwater.jpg",
    itinerary: {
      en: ["07:30 — Pickup in Banyuwangi", "08:30 — Arrive, check in and prepare for activities", "09:00–11:30 — Beach, conservation area and optional snorkeling", "11:30–12:30 — Lunch break (meal at own expense)", "12:30–14:30 — Continue exploring; boat and water activities depend on availability", "14:30–16:00 — Return to Banyuwangi (estimated; site operating hours may change)"],
      ka: ["07:30 — Pickup in Banyuwangi", "08:30 — Arrive, check in and prepare for activities", "09:00–11:30 — Beach, conservation area and optional snorkeling", "11:30–12:30 — Lunch break (meal at own expense)", "12:30–14:30 — Continue exploring; boat and water activities depend on availability", "14:30–16:00 — Return to Banyuwangi (estimated; site operating hours may change)"],
      ru: ["07:30 — Выезд из Баньюванги", "08:30 — Прибытие, регистрация и подготовка к активностям", "09:00–11:30 — Пляж, природоохранная зона и снорклинг по желанию", "11:30–12:30 — Перерыв на обед (за свой счёт)", "12:30–14:30 — Продолжение прогулки; лодки и водные активности зависят от наличия", "14:30–16:00 — Возвращение в Баньюванги (ориентировочно; часы работы могут меняться)"],
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
    duration: "15 hours",
    difficulty: "Moderate",
    price: 300000,
    maxPeople: 5,
    rating: 4.9,
    image: "/teluk-hijau.jpg",
    itinerary: {
      en: ["05:00 — Pickup in Banyuwangi for the long drive to Rajegwesi (estimated)", "10:00 — Arrive at Rajegwesi, arrange park entry and confirm local access", "10:30–11:00 — Reach Teluk Hijau by local boat (around 20 minutes, weather permitting) or take the land trail (about 1 hour)", "11:00–13:00 — Enjoy the beach, waterfall and free time", "13:00–14:00 — Rest and meal break (meal at own expense)", "14:00–15:00 — Return to Rajegwesi by the agreed boat or trail", "15:00–20:00 — Drive back to Banyuwangi (estimated; road conditions may change timing)"],
      ka: ["05:00 — Pickup in Banyuwangi for the long drive to Rajegwesi (estimated)", "10:00 — Arrive at Rajegwesi, arrange park entry and confirm local access", "10:30–11:00 — Reach Teluk Hijau by local boat (around 20 minutes, weather permitting) or take the land trail (about 1 hour)", "11:00–13:00 — Enjoy the beach, waterfall and free time", "13:00–14:00 — Rest and meal break (meal at own expense)", "14:00–15:00 — Return to Rajegwesi by the agreed boat or trail", "15:00–20:00 — Drive back to Banyuwangi (estimated; road conditions may change timing)"],
      ru: ["05:00 — Выезд из Баньюванги в долгую дорогу до Раджегвеси (ориентировочно)", "10:00 — Прибытие в Раджегвеси, оформление входа и уточнение местного маршрута", "10:30–11:00 — Переход к Телук-Хиджау на местной лодке (около 20 минут, если позволяет погода) или по тропе (около часа)", "11:00–13:00 — Пляж, водопад и свободное время", "13:00–14:00 — Отдых и перерыв на еду (за свой счёт)", "14:00–15:00 — Возвращение в Раджегвеси на лодке или по тропе", "15:00–20:00 — Возвращение в Баньюванги (ориентировочно; время зависит от дороги)"],
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
  5: {
    title: { en: "Tabuhan Island", ka: "Tabuhan Island", ru: "Остров Табухан" },
    description: { en: "Take a boat from the Bangsring coast to Tabuhan Island for a day of clear water, beach time and snorkeling.", ka: "Take a boat from Bangsring to Tabuhan Island for a day of clear water and snorkeling.", ru: "Отправьтесь на лодке от побережья Бангсринга на остров Табухан, чтобы отдохнуть на пляже и заняться снорклингом." },
    duration: "7 hours", difficulty: "Easy", price: 300000, maxPeople: 5, rating: 4.8, image: "/pulau-tabuhan.jpg",
    itinerary: {
      en: ["07:30 — Pickup in Banyuwangi and drive to Kampe Beach at Bangsring", "08:30 — Check in, confirm sea conditions and prepare snorkeling equipment", "09:00 — Boat transfer to Tabuhan Island (departure depends on weather and sea conditions)", "09:30–12:00 — Beach time and snorkeling with provided equipment", "12:00–13:00 — Included meal and rest on the island", "13:00 — Return boat to Kampe Beach", "14:00–15:00 — Return to Banyuwangi (estimated)"],
      ka: ["07:30 — Pickup in Banyuwangi and drive to Kampe Beach at Bangsring", "08:30 — Check in, confirm sea conditions and prepare snorkeling equipment", "09:00 — Boat transfer to Tabuhan Island (departure depends on weather and sea conditions)", "09:30–12:00 — Beach time and snorkeling with provided equipment", "12:00–13:00 — Included meal and rest on the island", "13:00 — Return boat to Kampe Beach", "14:00–15:00 — Return to Banyuwangi (estimated)"],
      ru: ["07:30 — Выезд из Баньюванги на пляж Кампе в Бангсринге", "08:30 — Регистрация, проверка состояния моря и подготовка снаряжения для снорклинга", "09:00 — Лодочный переход на остров Табухан (время зависит от погоды и моря)", "09:30–12:00 — Отдых на пляже и снорклинг с предоставленным снаряжением", "12:00–13:00 — Включённый обед и отдых на острове", "13:00 — Возвращение на лодке к пляжу Кампе", "14:00–15:00 — Возвращение в Баньюванги (ориентировочно)"],
    },
    included: {
      en: ["Tabuhan entrance ticket", "Return boat / sampan transfer", "Meal", "Snorkeling equipment"],
      ka: ["Tabuhan entrance ticket", "Return boat / sampan transfer", "Meal", "Snorkeling equipment"],
      ru: ["Входной билет на Табухан", "Лодка / сампан туда и обратно", "Питание", "Снаряжение для снорклинга"],
    },
  },
  6: {
    title: { en: "Pulau Merah", ka: "Pulau Merah", ru: "Пулау-Мерах" },
    description: { en: "Spend a full day at Pulau Merah, a south-coast beach known for its red offshore hill and sunset views.", ka: "Spend a full day at Pulau Merah beach and enjoy its south-coast scenery.", ru: "Проведите день на пляже Пулау-Мерах, известном красноватым островком у берега и закатами." },
    duration: "10 hours", difficulty: "Easy", price: 250000, maxPeople: 5, rating: 4.7, image: "/pulau-merah.jpg",
    itinerary: {
      en: ["07:00 — Pickup in Banyuwangi", "07:00–10:00 — Drive to Pulau Merah (estimated; traffic may change travel time)", "10:00–12:00 — Beach visit and free time", "12:00–13:00 — Included meal", "13:00–15:30 — Relax, explore the shoreline and enjoy the view", "15:30–18:30 — Return to Banyuwangi (estimated)"],
      ka: ["07:00 — Pickup in Banyuwangi", "07:00–10:00 — Drive to Pulau Merah (estimated; traffic may change travel time)", "10:00–12:00 — Beach visit and free time", "12:00–13:00 — Included meal", "13:00–15:30 — Relax, explore the shoreline and enjoy the view", "15:30–18:30 — Return to Banyuwangi (estimated)"],
      ru: ["07:00 — Выезд из Баньюванги", "07:00–10:00 — Поездка на Пулау-Мерах (ориентировочно)", "10:00–12:00 — Посещение пляжа и свободное время", "12:00–13:00 — Включённый обед", "13:00–15:30 — Отдых и прогулка по побережью", "15:30–18:30 — Возвращение в Баньюванги (ориентировочно)"],
    },
    included: {
      en: ["Pulau Merah entrance ticket", "Meal"],
      ka: ["Pulau Merah entrance ticket", "Meal"],
      ru: ["Входной билет на Пулау-Мерах", "Питание"],
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
    1: { title: { id: "Kawah Ijen" }, description: { id: "Jelajahi Kawah Ijen di Banyuwangi yang terkenal dengan api biru langka, lanskap vulkanik dramatis, dan danau kawah berwarna toska." }, itinerary: { id: ["00.00 — Penjemputan malam dari hotel di Banyuwangi (waktu perkiraan)", "01.30 — Tiba di Paltuding, pemeriksaan tiket dan surat kesehatan, persiapan perlengkapan", "02.00 — Memulai pendakian saat pintu resmi dibuka", "02.00–05.30 — Pendakian dengan pemandu; akses kawah mengikuti aturan keselamatan terbaru", "05.30–07.00 — Menikmati titik pandang dan matahari terbit, sesuai cuaca dan akses", "07.00–08.30 — Turun dan makan", "08.30–10.00 — Kembali ke Banyuwangi (perkiraan)"] } },
    2: { title: { id: "Hutan Djawatan" }, description: { id: "Jelajahi Hutan Djawatan di Benculuk, Banyuwangi, dengan pepohonan trembesi tua yang besar dan suasana alam yang menenangkan." }, itinerary: { id: ["09.00 — Penjemputan di hotel atau homestay", "10.00 — Tiba di Djawatan", "10.00–14.00 — Waktu bermain dan berfoto di Djawatan", "14.30 — Makan dan coffee break", "15.00 — Berangkat menuju penginapan (hotel atau homestay)"] } },
    3: { title: { id: "Pantai Bangsring" }, description: { id: "Nikmati pemandangan pesisir Pantai Bangsring yang indah, air laut jernih, kesempatan snorkeling, dan beragam aktivitas bahari." }, itinerary: { id: ["07.30 — Penjemputan di Banyuwangi", "08.30 — Tiba, registrasi, dan persiapan kegiatan", "09.00–11.30 — Menikmati pantai, area konservasi, dan snorkeling opsional", "11.30–12.30 — Istirahat makan siang (biaya makan ditanggung sendiri)", "12.30–14.30 — Melanjutkan kegiatan; perahu dan aktivitas air menyesuaikan ketersediaan", "14.30–16.00 — Kembali ke Banyuwangi (perkiraan; jam operasional dapat berubah)"] } },
    4: { title: { id: "Teluk Hijau" }, description: { id: "Temukan Teluk Hijau, pantai tersembunyi yang indah di Taman Nasional Meru Betiri, Banyuwangi, Jawa Timur." }, itinerary: { id: ["05.00 — Penjemputan dari Banyuwangi untuk perjalanan panjang ke Rajegwesi (perkiraan)", "10.00 — Tiba di Rajegwesi, mengurus tiket kawasan, dan memastikan akses lokal", "10.30–11.00 — Menuju Teluk Hijau dengan perahu warga (sekitar 20 menit, jika cuaca memungkinkan) atau jalur darat (sekitar 1 jam)", "11.00–13.00 — Menikmati pantai, air terjun, dan waktu bebas", "13.00–14.00 — Istirahat dan makan (biaya makan ditanggung sendiri)", "14.00–15.00 — Kembali ke Rajegwesi dengan perahu atau jalur yang disepakati", "15.00–20.00 — Perjalanan kembali ke Banyuwangi (perkiraan, tergantung kondisi jalan)"] } },
    5: { title: { id: "Pulau Tabuhan" }, description: { id: "Menyeberang dari pesisir Bangsring ke Pulau Tabuhan untuk menikmati pantai, air jernih, dan snorkeling." }, itinerary: { id: ["07.30 — Penjemputan di Banyuwangi dan perjalanan ke Pantai Kampe, Bangsring", "08.30 — Registrasi, memeriksa kondisi laut, dan menyiapkan alat selam", "09.00 — Menyeberang ke Pulau Tabuhan; keberangkatan menyesuaikan cuaca dan kondisi laut", "09.30–12.00 — Menikmati pantai dan snorkeling dengan alat yang disediakan", "12.00–13.00 — Makan dan istirahat di pulau", "13.00 — Kembali dengan perahu ke Pantai Kampe", "14.00–15.00 — Kembali ke Banyuwangi (perkiraan)"] } },
    6: { title: { id: "Pulau Merah" }, description: { id: "Nikmati wisata sehari penuh di Pantai Pulau Merah, pesisir selatan Banyuwangi yang terkenal dengan bukit merah dan pemandangan senja." }, itinerary: { id: ["07.00 — Penjemputan di Banyuwangi", "07.00–10.00 — Perjalanan ke Pulau Merah (perkiraan, dapat berubah karena lalu lintas)", "10.00–12.00 — Kunjungan pantai dan waktu bebas", "12.00–13.00 — Makan siang", "13.00–15.30 — Bersantai, menyusuri pantai, dan menikmati pemandangan", "15.30–18.30 — Kembali ke Banyuwangi (perkiraan)"] } },
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

const translatedIncluded: Record<AdditionalLanguage, Record<number, string[]>> = {
  id: {
    1: ["Tiket masuk Ijen", "Surat keterangan kesehatan", "Makan", "Senter", "Masker gas", "Tongkat daki"],
    2: ["Tiket masuk Djawatan", "Makan"],
    3: ["Pemandu lokal profesional", "Transportasi", "Air minum", "Bantuan perjalanan"],
    4: ["Pemandu lokal profesional", "Transportasi", "Air minum", "Bantuan perjalanan"],
    5: ["Tiket masuk Pulau Tabuhan", "Perahu/sampan pulang-pergi", "Makan", "Alat selam/snorkeling"],
    6: ["Tiket masuk Pulau Merah", "Makan"],
  },
  de: {
    1: ["Eintrittskarte für Ijen", "Gesundheitsbescheinigung", "Mahlzeit", "Taschenlampe", "Gasmaske", "Wanderstock"],
    2: ["Eintrittskarte für Djawatan", "Mahlzeit"], 3: ["Eintrittskarte für Bangsring", "Mahlzeit"], 4: ["Eintrittskarte für Teluk Hijau", "Mahlzeit"],
    5: ["Eintrittskarte für Tabuhan", "Boot/Sampan für Hin- und Rückfahrt", "Mahlzeit", "Schnorchelausrüstung"], 6: ["Eintrittskarte für Pulau Merah", "Mahlzeit"],
  },
  zh: {
    1: ["伊真门票", "健康证明", "餐食", "手电筒", "防毒面具", "登山杖"], 2: ["Djawatan门票", "餐食"], 3: ["Bangsring门票", "餐食"], 4: ["Teluk Hijau门票", "餐食"],
    5: ["塔布汉岛门票", "往返船只/小船", "餐食", "浮潜装备"], 6: ["红岛门票", "餐食"],
  },
  ja: {
    1: ["イジェン入場券", "健康証明書", "食事", "懐中電灯", "ガスマスク", "トレッキングポール"], 2: ["ジャワタン入場券", "食事"], 3: ["バンスリン入場券", "食事"], 4: ["テルク・ヒジャウ入場券", "食事"],
    5: ["タブハン島入場券", "往復のボート／サンパン", "食事", "シュノーケリング用具"], 6: ["プラウ・メラ入場券", "食事"],
  },
  ko: {
    1: ["이젠 입장권", "건강 증명서", "식사", "손전등", "방독면", "등산 스틱"], 2: ["자와탄 입장권", "식사"], 3: ["방스링 입장권", "식사"], 4: ["텔룩 히자우 입장권", "식사"],
    5: ["타부한섬 입장권", "왕복 보트/삼판", "식사", "스노클링 장비"], 6: ["풀라우 메라 입장권", "식사"],
  },
  fr: {
    1: ["Billet d’entrée pour Ijen", "Certificat médical", "Repas", "Lampe torche", "Masque à gaz", "Bâton de randonnée"], 2: ["Billet d’entrée pour Djawatan", "Repas"], 3: ["Billet d’entrée pour Bangsring", "Repas"], 4: ["Billet d’entrée pour Teluk Hijau", "Repas"],
    5: ["Billet pour l’île de Tabuhan", "Bateau/sampan aller-retour", "Repas", "Équipement de snorkeling"], 6: ["Billet d’entrée pour Pulau Merah", "Repas"],
  },
  nl: {
    1: ["Toegangsbewijs voor Ijen", "Gezondheidsverklaring", "Maaltijd", "Zaklamp", "Gasmasker", "Wandelstok"], 2: ["Toegangsbewijs voor Djawatan", "Maaltijd"], 3: ["Toegangsbewijs voor Bangsring", "Maaltijd"], 4: ["Toegangsbewijs voor Teluk Hijau", "Maaltijd"],
    5: ["Toegangsbewijs voor Tabuhan", "Boot/sampan voor heen- en terugreis", "Maaltijd", "Snorkeluitrusting"], 6: ["Toegangsbewijs voor Pulau Merah", "Maaltijd"],
  },
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
    ? translatedIncluded[currentLang as AdditionalLanguage]?.[tourId] ?? tour.included[tourLang]
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
                <a href={getWhatsAppUrl(currentLang === "id" ? `Halo Tour Guide, saya ingin memesan ${title}. Mohon info jadwal dan ketersediaannya.` : `Hi Tour Guide, I would like to book ${title}. Please share available dates and details.`)} target="_blank" rel="noreferrer">
                  {currentLang === "id" ? "Pesan via WhatsApp" : "Book via WhatsApp"}
                </a>
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
