"use client"

import { useEffect, useState } from "react"
import { CalendarDays, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { SupportedLanguage } from "@/app/[lang]/dictionaries"
import { getWhatsAppUrl } from "@/lib/whatsapp"
import type { PackageScheduleRecord } from "@/lib/package-schedules"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { getDayTourLabel } from "@/lib/currency"

const labels: Record<string, { title: string; intro: string; schedule: string; included: string; day: string; book: string; notice: string }> = {
  id: { title: "Paket Wisata & Jadwal", intro: "Paket tiga hari dengan urutan destinasi, jam kegiatan, dan fasilitas yang disertakan.", schedule: "Jadwal perjalanan", included: "Termasuk dalam paket", day: "Hari", book: "Tanya harga dan pesan", notice: "Jam adalah perkiraan dan dapat berubah mengikuti titik penjemputan, cuaca, kondisi laut, lalu lintas, serta aturan pengelola. Konfirmasi jadwal dan harga akhir sebelum memesan." },
  en: { title: "Tour Packages & Schedules", intro: "Three-day packages with clear destination order, activity times and included items.", schedule: "Trip schedule", included: "Package includes", day: "Day", book: "Ask for price and book", notice: "Times are estimates and may change with pickup location, weather, sea conditions, traffic and site rules. Confirm the final schedule and quote before booking." },
  "en-au": { title: "Tour Packages & Schedules", intro: "Three-day packages with clear destination order, activity times and included items.", schedule: "Trip schedule", included: "Package includes", day: "Day", book: "Ask for price and book", notice: "Times are estimates and may change with pickup location, weather, sea conditions, traffic and site rules. Confirm the final schedule and quote before booking." },
  de: { title: "Tourpakete & Zeitpläne", intro: "Dreitägige Pakete mit Reiseziel-Reihenfolge, Zeiten und enthaltenen Leistungen.", schedule: "Reiseplan", included: "Im Paket enthalten", day: "Tag", book: "Preis anfragen und buchen", notice: "Zeiten sind Schätzungen und können sich je nach Abholort, Wetter, Seegang, Verkehr und Regeln ändern. Bitte den endgültigen Ablauf und Preis bestätigen." },
  zh: { title: "旅游套餐与行程", intro: "三日套餐，清楚列出目的地顺序、活动时间和包含项目。", schedule: "行程安排", included: "套餐包含", day: "第", book: "咨询价格并预订", notice: "时间为估算，可能受接送地点、天气、海况、交通和景区规定影响。预订前请确认最终行程和报价。" },
  ja: { title: "ツアーパッケージと日程", intro: "訪問順、時間、含まれる内容が分かる3日間のプランです。", schedule: "行程", included: "含まれるもの", day: "日目", book: "料金を問い合わせて予約", notice: "時間は目安です。集合場所、天候、海況、交通、施設の規則により変更されます。予約前に最終日程と料金をご確認ください。" },
  ko: { title: "투어 패키지 및 일정", intro: "방문 순서, 활동 시간, 포함 항목을 명확히 안내하는 3일 패키지입니다.", schedule: "여행 일정", included: "패키지 포함 사항", day: "일차", book: "요금 문의 및 예약", notice: "시간은 예상이며 픽업 장소, 날씨, 해상 상태, 교통 및 시설 규정에 따라 달라질 수 있습니다. 예약 전에 최종 일정과 견적을 확인하세요." },
  fr: { title: "Forfaits et horaires", intro: "Des forfaits de trois jours avec l’ordre des étapes, les horaires et les prestations incluses.", schedule: "Programme", included: "Inclus dans le forfait", day: "Jour", book: "Demander un tarif et réserver", notice: "Les horaires sont estimatifs et peuvent varier selon le lieu de prise en charge, la météo, la mer, la circulation et les règles des sites. Confirmez le programme et le devis avant réservation." },
  nl: { title: "Tourpakketten en schema's", intro: "Driedaagse pakketten met duidelijke bestemmingsvolgorde, tijden en inbegrepen onderdelen.", schedule: "Reisschema", included: "Inbegrepen in het pakket", day: "Dag", book: "Prijs opvragen en boeken", notice: "Tijden zijn schattingen en kunnen wijzigen door ophaallocatie, weer, zeecondities, verkeer en locatievoorschriften. Bevestig het definitieve schema en de prijs vooraf." },
  ru: { title: "Турпакеты и расписание", intro: "Трёхдневные пакеты с порядком посещения, временем и включёнными услугами.", schedule: "Расписание поездки", included: "Включено в пакет", day: "День", book: "Узнать цену и забронировать", notice: "Время ориентировочное и зависит от места встречи, погоды, состояния моря, пробок и правил объектов. Перед бронированием подтвердите маршрут и стоимость." },
  ka: { title: "ტურ პაკეტები და განრიგი", intro: "სამდღიანი პაკეტები მარშრუტის, დროისა და ჩართული მომსახურებების მკაფიო აღწერით.", schedule: "მოგზაურობის განრიგი", included: "პაკეტში შედის", day: "დღე", book: "ფასის კითხვა და დაჯავშნა", notice: "დრო სავარაუდოა და შეიძლება შეიცვალოს შეხვედრის ადგილის, ამინდის, ზღვის, მოძრაობისა და ობიექტების წესების მიხედვით. დაჯავშნამდე დაადასტურეთ განრიგი და ფასი." },
}

const daySchedules = {
  djawatan: [
    ["08:00–09:30", "Pickup and transfer to Djawatan"], ["09:30–12:00", "Djawatan Forest visit and free time"],
    ["12:00–13:00", "Included meal"], ["13:00–15:30", "Return to Banyuwangi (estimated)"],
  ],
  merah: [
    ["06:30–10:00", "Pickup and drive to Pulau Merah (estimated)"], ["10:00–12:00", "Beach visit and free time"],
    ["12:00–13:00", "Included meal"], ["13:00–15:30", "Explore the shore and relax"], ["15:30–18:30", "Return to Banyuwangi (estimated)"],
  ],
  ijen: [
    ["00:00–01:30", "Night pickup and transfer to Paltuding"], ["01:30–02:00", "Ticket and health-document check; prepare safety gear"],
    ["02:00–05:30", "Start hike when the official gate opens; guided ascent"], ["05:30–07:00", "Viewpoint and sunrise, subject to access and weather"],
    ["07:00–08:30", "Descend and have the included meal"], ["08:30–10:00", "Return to Banyuwangi (estimated)"],
  ],
  tabuhan: [
    ["07:30–08:30", "Pickup and transfer to Kampe Beach, Bangsring"], ["08:30–09:00", "Boat safety briefing and snorkeling preparation"],
    ["09:00–09:30", "Boat transfer to Tabuhan Island (weather permitting)"], ["09:30–12:00", "Island visit and snorkeling with provided equipment"],
    ["12:00–13:00", "Included meal and rest"], ["13:00–15:00", "Return by boat and transfer to Banyuwangi (estimated)"],
  ],
}

const packages = [
  { title: "Djawatan → Pulau Merah → Ijen", days: [daySchedules.djawatan, daySchedules.merah, daySchedules.ijen], includes: ["Djawatan: entrance ticket and meal", "Pulau Merah: entrance ticket and meal", "Ijen: ticket, health certificate, meal, flashlight, gas mask and hiking pole"] },
  { title: "Tabuhan → Djawatan → Ijen", days: [daySchedules.tabuhan, daySchedules.djawatan, daySchedules.ijen], includes: ["Tabuhan: ticket, return boat/sampan, meal and snorkeling equipment", "Djawatan: entrance ticket and meal", "Ijen: ticket, health certificate, meal, flashlight, gas mask and hiking pole"] },
  { title: "Djawatan → Ijen → Pulau Merah", days: [daySchedules.djawatan, daySchedules.ijen, daySchedules.merah], includes: ["Djawatan: entrance ticket and meal", "Ijen: ticket, health certificate, meal, flashlight, gas mask and hiking pole", "Pulau Merah: entrance ticket and meal"] },
]

export function TourPackages({ lang, schedules, packagePrice, entranceFee }: { lang: SupportedLanguage; schedules?: PackageScheduleRecord[]; packagePrice: string; entranceFee: string }) {
  const [liveSchedules, setLiveSchedules] = useState(schedules ?? [])

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    if (!supabase) return

    let active = true
    const refreshSchedules = async () => {
      const { data, error } = await supabase
        .from("tour_packages")
        .select("id, position, title, price_idr, price_usd, days, includes")
        .order("position", { ascending: true })
      if (!active || error || !data?.length) return

      setLiveSchedules(data.map((record) => ({
        id: record.id,
        position: record.position,
        title: record.title,
        price_idr: record.price_idr === null ? null : Number(record.price_idr),
        price_usd: record.price_usd === null ? null : Number(record.price_usd),
        days: Array.isArray(record.days) ? record.days : [],
        includes: Array.isArray(record.includes) ? record.includes : [],
      })))
    }

    const channel = supabase
      .channel("public-tour-packages-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "tour_packages" }, () => {
        void refreshSchedules()
      })
      .subscribe()

    return () => {
      active = false
      void supabase.removeChannel(channel)
    }
  }, [])

  const text = labels[lang] ?? labels.en
  const isIndonesian = lang === "id"
  const translateActivity = (activity: string) => isIndonesian ? ({
    "Pickup and transfer to Djawatan": "Penjemputan dan perjalanan menuju Djawatan",
    "Djawatan Forest visit and free time": "Kunjungan Hutan Djawatan dan waktu bebas",
    "Included meal": "Makan sesuai paket",
    "Return to Banyuwangi (estimated)": "Kembali ke Banyuwangi (perkiraan)",
    "Pickup and drive to Pulau Merah (estimated)": "Penjemputan dan perjalanan ke Pulau Merah (perkiraan)",
    "Beach visit and free time": "Kunjungan pantai dan waktu bebas",
    "Explore the shore and relax": "Menjelajahi pantai dan bersantai",
    "Night pickup and transfer to Paltuding": "Penjemputan malam dan perjalanan menuju Paltuding",
    "Ticket and health-document check; prepare safety gear": "Pemeriksaan tiket dan surat kesehatan; persiapan perlengkapan keselamatan",
    "Start hike when the official gate opens; guided ascent": "Mulai mendaki saat pintu resmi dibuka; pendakian dengan pemandu",
    "Viewpoint and sunrise, subject to access and weather": "Menikmati titik pandang dan matahari terbit, sesuai akses dan cuaca",
    "Descend and have the included meal": "Turun dan menikmati makan sesuai paket",
    "Pickup and transfer to Kampe Beach, Bangsring": "Penjemputan dan perjalanan ke Pantai Kampe, Bangsring",
    "Boat safety briefing and snorkeling preparation": "Arahan keselamatan perahu dan persiapan snorkeling",
    "Boat transfer to Tabuhan Island (weather permitting)": "Menyeberang dengan perahu ke Pulau Tabuhan (jika cuaca memungkinkan)",
    "Island visit and snorkeling with provided equipment": "Menjelajahi pulau dan snorkeling dengan alat yang disediakan",
    "Included meal and rest": "Makan sesuai paket dan istirahat",
    "Return by boat and transfer to Banyuwangi (estimated)": "Kembali dengan perahu lalu ke Banyuwangi (perkiraan)",
  } as Record<string, string>)[activity] ?? activity : activity

  const displayPackages = isIndonesian && liveSchedules.length
    ? liveSchedules.map((schedule) => ({
      title: schedule.title,
      price_idr: schedule.price_idr,
      price_usd: schedule.price_usd,
      days: schedule.days.map((day) => day.activities.map(({ time, activity }) => [time, activity] as [string, string])),
      includes: schedule.includes,
    }))
    : packages.map((tourPackage, index) => ({
      ...tourPackage,
      price_idr: liveSchedules[index]?.price_idr ?? null,
      price_usd: liveSchedules[index]?.price_usd ?? null,
    }))

  return (
    <section id="tour-packages" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-widest text-primary">Dolan Bareng Kang Pir</p>
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">{text.title}</h2>
          <p className="text-lg text-muted-foreground">{text.intro}</p>
        </div>
        <div className="grid gap-7 xl:grid-cols-3">
          {displayPackages.map((tourPackage) => (
            <Card key={tourPackage.title} className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">{tourPackage.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-semibold"><CalendarDays className="h-4 w-4 text-primary" />{text.schedule}</h3>
                  <div className="space-y-4">
                    {tourPackage.days.map((schedule, index) => (
                      <div key={index} className="border-l-2 border-primary/30 pl-4">
                        <p className="mb-2 font-semibold">{text.day} {index + 1}</p>
                        <ul className="space-y-2">
                          {schedule.map(([time, activity]) => (
                            <li key={time} className="flex gap-2 text-sm text-muted-foreground">
                              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span><strong className="font-medium text-foreground">{time}</strong> — {translateActivity(activity)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 font-semibold">{text.included}</h3>
                  <ul className="space-y-2">
                    {tourPackage.includes.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-muted-foreground"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />{isIndonesian ? item.replace("entrance ticket", "tiket masuk").replace("meal", "makan").replace("ticket", "tiket").replace("return boat/sampan", "perahu/sampan pulang-pergi").replace("snorkeling equipment", "alat snorkeling").replace("health certificate", "surat kesehatan").replace("flashlight", "senter").replace("gas mask", "masker gas").replace("hiking pole", "tongkat daki").replace(" and ", " dan ") : item}</li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="group relative min-h-[76px] w-full whitespace-normal rounded-xl bg-green-600 px-4 py-3 text-white shadow-sm transition-colors hover:bg-green-700">
                  <a
                    href={getWhatsAppUrl(isIndonesian ? `Hallo Kang Pir, saya ingin bertanya dan memesan paket ${tourPackage.title}. Mohon kirimkan harga dan ketersediaannya.` : `Hi Tour Guide, I would like to ask about and book the ${tourPackage.title} package. Please send the price and availability.`)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={isIndonesian ? "Pesan via WhatsApp" : "Book via WhatsApp"}
                  >
                    <span className="flex flex-col items-center justify-center gap-1 leading-tight group-hover:hidden group-focus-visible:hidden group-active:hidden">
                      <span className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-0.5">
                        <span className="text-lg font-bold tracking-tight sm:text-xl">{packagePrice}</span>
                        <span className="text-sm font-medium">{getDayTourLabel(lang)}</span>
                      </span>
                      <span className="text-xs font-normal leading-snug text-white/90 sm:text-sm">
                        {isIndonesian ? `Tiket masuk per-orang ${entranceFee}` : `Entrance ticket per person ${entranceFee}`}
                      </span>
                    </span>
                    <span className="absolute inset-0 hidden items-center justify-center px-3 text-sm font-semibold group-hover:flex group-focus-visible:flex group-active:flex sm:text-base">
                      {isIndonesian ? "Pesan via WhatsApp" : "Book via WhatsApp"}
                    </span>
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">{text.notice} <a className="font-medium text-primary underline" href="https://ayoketamannasional.kehutanan.go.id/id/taman-wisata-alam/kawah-ijen" target="_blank" rel="noreferrer">Official Ijen operating hours and closure updates</a>.</p>
      </div>
    </section>
  )
}
