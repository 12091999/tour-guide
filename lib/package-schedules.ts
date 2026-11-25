import { createClient } from "@supabase/supabase-js"

export type PackageScheduleActivity = {
  time: string
  activity: string
}

export type PackageScheduleDay = {
  activities: PackageScheduleActivity[]
}

export type PackageScheduleRecord = {
  id: string
  position: number
  title: string
  price_idr: number | null
  price_usd: number | null
  days: PackageScheduleDay[]
  includes: string[]
}

export const fallbackPackageSchedules: PackageScheduleRecord[] = [
  {
    id: "djawatan-merah-ijen",
    position: 1,
    title: "Djawatan → Pulau Merah → Ijen",
    price_idr: null,
    price_usd: null,
    days: [
      { activities: [
        { time: "09.00", activity: "Penjemputan di hotel atau homestay" },
        { time: "10.00", activity: "Tiba di Djawatan" },
        { time: "10.00–14.00", activity: "Waktu bermain dan berfoto di Djawatan" },
        { time: "14.30", activity: "Makan dan coffee break" },
        { time: "15.00", activity: "Berangkat menuju penginapan (hotel atau homestay)" },
      ] },
      { activities: [
        { time: "09.00", activity: "Penjemputan di hotel atau homestay" },
        { time: "10.00–11.30", activity: "Makan dan coffee break di kedai kopi rekomendasi" },
        { time: "12.00", activity: "Berangkat menuju Pulau Merah" },
        { time: "13.00", activity: "Tiba di Pulau Merah" },
        { time: "13.30–16.00", activity: "Waktu bermain di tepi pantai dan menikmati sunset" },
        { time: "16.30–17.00", activity: "Bersih-bersih dan berangkat menuju penginapan (hotel atau homestay)" },
      ] },
      { activities: [
        { time: "23.30", activity: "Penjemputan di hotel atau homestay" },
        { time: "00.30", activity: "Tiba di Paltuding" },
        { time: "01.00", activity: "Pembagian perlengkapan untuk mendaki" },
        { time: "01.30–02.00", activity: "Persiapan mendaki" },
        { time: "02.00–05.30", activity: "Memasuki rute pendakian, menikmati suasana perjalanan, dan berfoto" },
        { time: "06.30–07.00", activity: "Turun" },
        { time: "07.00–08.00", activity: "Istirahat, makan, dan coffee break" },
        { time: "08.30–09.00", activity: "Kembali ke penginapan (hotel atau homestay)" },
      ] },
    ],
    includes: [
      "Djawatan: tiket masuk dan makan",
      "Pulau Merah: tiket masuk dan makan",
      "Ijen: tiket, surat kesehatan, makan, senter, masker gas, dan tongkat daki",
    ],
  },
  {
    id: "tabuhan-djawatan-ijen",
    position: 2,
    title: "Tabuhan → Djawatan → Ijen",
    price_idr: null,
    price_usd: null,
    days: [
      { activities: [
        { time: "09.00", activity: "Penjemputan di hotel atau homestay" },
        { time: "10.00", activity: "Tiba di Djawatan" },
        { time: "10.00–14.00", activity: "Waktu bermain dan berfoto di Djawatan" },
        { time: "14.30", activity: "Makan dan coffee break" },
        { time: "15.00", activity: "Berangkat menuju penginapan (hotel atau homestay)" },
      ] },
      { activities: [
        { time: "09.00", activity: "Penjemputan di hotel atau homestay" },
        { time: "10.00", activity: "Tiba di Djawatan" },
        { time: "10.00–14.00", activity: "Waktu bermain dan berfoto di Djawatan" },
        { time: "14.30", activity: "Makan dan coffee break" },
        { time: "15.00", activity: "Berangkat menuju penginapan (hotel atau homestay)" },
      ] },
      { activities: [
        { time: "23.30", activity: "Penjemputan di hotel atau homestay" },
        { time: "00.30", activity: "Tiba di Paltuding" },
        { time: "01.00", activity: "Pembagian perlengkapan untuk mendaki" },
        { time: "01.30–02.00", activity: "Persiapan mendaki" },
        { time: "02.00–05.30", activity: "Memasuki rute pendakian, menikmati suasana perjalanan, dan berfoto" },
        { time: "06.30–07.00", activity: "Turun" },
        { time: "07.00–08.00", activity: "Istirahat, makan, dan coffee break" },
        { time: "08.30–09.00", activity: "Kembali ke penginapan (hotel atau homestay)" },
      ] },
    ],
    includes: [
      "Tabuhan: tiket, perahu/sampan pulang-pergi, makan, dan alat snorkeling",
      "Djawatan: tiket masuk dan makan",
      "Ijen: tiket, surat kesehatan, makan, senter, masker gas, dan tongkat daki",
    ],
  },
  {
    id: "djawatan-ijen-merah",
    position: 3,
    title: "Djawatan → Ijen → Pulau Merah",
    price_idr: null,
    price_usd: null,
    days: [
      { activities: [
        { time: "09.00", activity: "Penjemputan di hotel atau homestay" },
        { time: "10.00", activity: "Tiba di Djawatan" },
        { time: "10.00–14.00", activity: "Waktu bermain dan berfoto di Djawatan" },
        { time: "14.30", activity: "Makan dan coffee break" },
        { time: "15.00", activity: "Berangkat menuju penginapan (hotel atau homestay)" },
      ] },
      { activities: [
        { time: "23.30", activity: "Penjemputan di hotel atau homestay" },
        { time: "00.30", activity: "Tiba di Paltuding" },
        { time: "01.00", activity: "Pembagian perlengkapan untuk mendaki" },
        { time: "01.30–02.00", activity: "Persiapan mendaki" },
        { time: "02.00–05.30", activity: "Memasuki rute pendakian, menikmati suasana perjalanan, dan berfoto" },
        { time: "06.30–07.00", activity: "Turun" },
        { time: "07.00–08.00", activity: "Istirahat, makan, dan coffee break" },
        { time: "08.30–09.00", activity: "Kembali ke penginapan (hotel atau homestay)" },
      ] },
      { activities: [
        { time: "09.00", activity: "Penjemputan di hotel atau homestay" },
        { time: "10.00–11.30", activity: "Makan dan coffee break di kedai kopi rekomendasi" },
        { time: "12.00", activity: "Berangkat menuju Pulau Merah" },
        { time: "13.00", activity: "Tiba di Pulau Merah" },
        { time: "13.30–16.00", activity: "Waktu bermain di tepi pantai dan menikmati sunset" },
        { time: "16.30–17.00", activity: "Bersih-bersih dan berangkat menuju penginapan (hotel atau homestay)" },
      ] },
    ],
    includes: [
      "Djawatan: tiket masuk dan makan",
      "Ijen: tiket, surat kesehatan, makan, senter, masker gas, dan tongkat daki",
      "Pulau Merah: tiket masuk dan makan",
    ],
  },
]

const fallbackById = new Map(fallbackPackageSchedules.map((item) => [item.id, item]))

function isScheduleRecord(value: unknown): value is PackageScheduleRecord {
  if (!value || typeof value !== "object") return false
  const record = value as Partial<PackageScheduleRecord>
  return typeof record.id === "string"
    && typeof record.position === "number"
    && typeof record.title === "string"
    && (record.price_idr === null || typeof record.price_idr === "number")
    && (record.price_usd === null || typeof record.price_usd === "number")
    && Array.isArray(record.days)
    && record.days.every((day) => day && Array.isArray(day.activities)
      && day.activities.every((activity) => activity && typeof activity.time === "string" && typeof activity.activity === "string"))
    && Array.isArray(record.includes)
    && record.includes.every((item) => typeof item === "string")
}

export async function getPackageSchedules(): Promise<PackageScheduleRecord[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) return fallbackPackageSchedules

  try {
    const supabase = createClient(url, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
      global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
    })
    const { data, error } = await supabase
      .from("tour_packages")
      .select("id, position, title, price_idr, price_usd, days, includes")
      .order("position", { ascending: true })

    if (error || !data?.length) return fallbackPackageSchedules

    const records = data.map((item) => ({
      ...item,
      days: Array.isArray(item.days) ? item.days : [],
      includes: Array.isArray(item.includes) ? item.includes : [],
    }))
    if (!records.every(isScheduleRecord)) return fallbackPackageSchedules

    const byId = new Map(records.map((record) => [record.id, record]))
    return fallbackPackageSchedules.map((fallback) => byId.get(fallback.id) ?? fallback)
  } catch {
    return fallbackPackageSchedules
  }
}

export function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
