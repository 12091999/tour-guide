import Image from "next/image"
import { BedDouble, ExternalLink, MapPin, MessageCircle, Utensils } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { SupportedLanguage } from "@/app/[lang]/dictionaries"
import { formatPrice, getDayTourLabel } from "@/lib/currency"
import { getWhatsAppUrl } from "@/lib/whatsapp"
import { getSiteConfig } from "@/lib/actions/config"
import Link from "next/link"

type Copy = {
  eyebrow: string; title: string; intro: string; ticket: string; stay: string
  dining: string; notice: string; verify: string; whatsapp: string
  descriptions: string[]; stayNotes: string[]; diningNotes: string[]
}

const copy: Record<string, Copy> = {
  en: {
    eyebrow: "More to explore", title: "Nature escapes beyond our featured four",
    intro: "Discover more of East Java's coast, rainforest, savanna and waterfalls. The displayed tour rate is for one day; entrance tickets, transport, accommodation and meals are separate.",
    ticket: "Entrance fee per person", stay: "Stay nearby", dining: "Eat nearby",
    notice: "Rates and availability can change. Confirm directly before travelling.", verify: "Check official information", whatsapp: "Book or ask via WhatsApp",
    descriptions: [
      "A south-coast beach known for its red offshore hill, surf breaks and beautiful sunsets. A relaxed day out for beach lovers and beginner surfers.",
      "Explore Bekol savanna, dry forest, wildlife and Bama Beach in this national park. Baluran is in neighbouring Situbondo, on the route between Banyuwangi and Surabaya.",
      "A vast lowland rainforest reserve with Sadengan savanna, ancient forest, secluded beaches and the famous G-Land surf break.",
      "A refreshing stop near Glagah with three waterfalls, clear pools and forest scenery, close to the Ijen highlands.",
    ],
    stayNotes: ["The Wisma Pulau Merah is a beachside homestay; room listings start around IDR 300,000 per night. Confirm current rates.", "RedDoorz near Baluran National Park or Grand Baluran Villa in Wonorejo are practical bases near the park entrance.", "Jawa Jiwa G-Land offers glamping, bungalows and apartments in the Alas Purwo area. Book and confirm access in advance.", "Herry's Guesthouse and Lintang Luku Tent Resort are options around Glagah and Licin, near Jagir and Ijen."],
    diningNotes: ["Wisma Bar & Restaurant serves Indonesian and Javanese dishes, with Western, Chinese and Japanese options too.", "RM Valentine in Wongsorejo is a convenient Indonesian-food stop; Warung Asri is another option near the park entrance.", "Jawa Jiwa G-Land is the closest resort dining option. Confirm meal arrangements before entering the park.", "The Osing Bamboo Restaurant serves Indonesian food and seafood. Small local warungs also operate around the waterfall village."],
  },
  id: {
    eyebrow: "Destinasi lainnya", title: "Wisata alam selain empat pilihan unggulan",
    intro: "Jelajahi pesisir, hutan, savana, dan air terjun di Jawa Timur. Tarif tur yang ditampilkan berlaku untuk satu hari; tiket masuk, transportasi, penginapan, dan makan terpisah.",
    ticket: "Tiket masuk per orang", stay: "Penginapan sekitar", dining: "Tempat makan sekitar",
    notice: "Tarif dan ketersediaan dapat berubah. Konfirmasikan langsung sebelum bepergian.", verify: "Cek informasi resmi", whatsapp: "Pesan / tanya via WhatsApp",
    descriptions: ["Pantai di pesisir selatan dengan bukit kecil kemerahan, ombak untuk berselancar, dan pemandangan matahari terbenam.", "Jelajahi Savana Bekol, hutan kering, satwa liar, dan Pantai Bama. Baluran berada di Situbondo, dekat jalur Banyuwangi.", "Kawasan hutan hujan dengan Savana Sadengan, hutan alami, pantai terpencil, dan ombak selancar G-Land.", "Wisata alam dekat Glagah dengan tiga air terjun, kolam jernih, dan suasana hutan di kaki kawasan Ijen."],
    stayNotes: ["The Wisma Pulau Merah adalah homestay dekat pantai; harga kamar yang tercantum mulai sekitar Rp300.000 per malam. Konfirmasikan tarif terbaru.", "RedDoorz near Baluran National Park atau Grand Baluran Villa di Wonorejo dekat dengan pintu masuk taman nasional.", "Jawa Jiwa G-Land menyediakan glamping, bungalow, dan apartemen di kawasan Alas Purwo. Pesan dan konfirmasikan akses lebih awal.", "Herry's Guesthouse dan Lintang Luku Tent Resort berada di sekitar Glagah dan Licin, dekat Jagir dan Ijen."],
    diningNotes: ["Wisma Bar & Restaurant menyajikan hidangan Indonesia dan Jawa, serta menu Barat, Tiongkok, dan Jepang.", "RM Valentine di Wongsorejo cocok untuk singgah makan; Warung Asri juga dekat pintu masuk taman nasional.", "Jawa Jiwa G-Land adalah pilihan makan terdekat di area resort. Konfirmasikan pengaturan makan sebelum masuk taman.", "The Osing Bamboo Restaurant menyajikan makanan Indonesia dan seafood. Ada juga warung lokal di sekitar desa air terjun."],
  },
}

const destinations = [
  { name: "Pulau Merah", location: "Pesanggaran, Banyuwangi", fee: 10000, dayRate: 250000, image: "/pulau-merah.jpg", url: "https://sisparnas.kemenpar.go.id/p/68539", stay: "The Wisma Pulau Merah", food: "Wisma Bar & Restaurant", stayUrl: "https://redislandwisma.com/" },
  { name: "Baluran National Park", location: "Situbondo, East Java", fee: 205000, dayRate: 300000, image: "/african-safari-wildlife-elephants-sunset.jpg", url: "https://tnbaluran.ksdae.kehutanan.go.id/tiket", stay: "RedDoorz near Baluran National Park / Grand Baluran Villa", food: "RM Valentine, Wongsorejo", stayUrl: "https://www.traveloka.com/id-id/hotel/indonesia/landmark/polsek-wongsorejo-91607407739105" },
  { name: "Alas Purwo & G-Land", location: "Tegaldlimo, Banyuwangi", fee: 150000, dayRate: 300000, image: "/djawatan.jpg", url: "https://tnalaspurwo.org/", stay: "Jawa Jiwa G-Land", food: "Jawa Jiwa G-Land resort dining", stayUrl: "https://jawajiwa.com/" },
  { name: "Jagir Waterfall", location: "Glagah, Banyuwangi", fee: 5000, dayRate: 300000, image: "/iceland-northern-lights-waterfalls-dramatic-landsc.jpg", url: "https://jadesta.kemenpar.go.id/atraksi/air_terjun_jagir", stay: "Herry's Guesthouse / Lintang Luku Tent Resort", food: "The Osing Bamboo Restaurant", stayUrl: "https://www.tripadvisor.co.id/HotelsNear-g317103-d15197910-Jagir_Waterfall-Banyuwangi_East_Java_Java.html" },
]

export async function ExtraDestinations({ lang }: { lang: SupportedLanguage }) {
  const text = copy[lang] ?? copy.en
  const [config, prices, entranceFees] = await Promise.all([
    getSiteConfig(),
    Promise.all(destinations.map(({ dayRate }) => formatPrice(dayRate, "IDR", lang))),
    Promise.all(destinations.map(({ fee }) => formatPrice(fee, "IDR", lang))),
  ])

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-sm uppercase tracking-widest text-primary mb-4">{text.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">{text.title}</h1>
          <p className="text-lg text-muted-foreground">{text.intro}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {destinations.map((destination, index) => (
            <Card key={destination.name} className="overflow-hidden border-0 shadow-sm">
              <div className="relative h-64 w-full">
                <Image src={destination.image} alt={destination.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <CardContent className="p-6 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold">{destination.name}</h2>
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{destination.location}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1.5 text-right text-sm font-semibold text-primary">
                    {prices[index].formatted}<span className="block text-xs font-normal">{getDayTourLabel(lang)}</span>
                    <span className="mt-1 block text-xs font-normal text-muted-foreground">{text.ticket}: {entranceFees[index].formatted}</span>
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{text.descriptions[index]}</p>
                <div className="grid sm:grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold"><BedDouble className="h-4 w-4 text-primary" />{text.stay}</h3>
                    <Link className="text-sm font-medium underline-offset-4 hover:underline" href={destination.stayUrl} target="_blank" rel="noreferrer">{destination.stay}</Link>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text.stayNotes[index]}</p>
                  </div>
                  <div>
                    <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold"><Utensils className="h-4 w-4 text-primary" />{text.dining}</h3>
                    <p className="text-sm font-medium">{destination.food}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text.diningNotes[index]}</p>
                  </div>
                </div>
                <a href={destination.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  {text.verify}<ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href={getWhatsAppUrl(
                    lang === "id"
                      ? `Halo Tour Guide, saya ingin memesan atau bertanya tentang ${destination.name}. Mohon info jadwal dan ketersediaannya.`
                      : `Hello Tour Guide, I would like to book or ask about ${destination.name}. Please share the schedule and availability.`,
                    config.business_whatsapp,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                >
                  <MessageCircle className="h-4 w-4" />{text.whatsapp}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">{text.notice}</p>
      </div>
    </section>
  )
}
