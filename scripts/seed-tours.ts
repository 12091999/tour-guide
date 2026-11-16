/**
 * Seed script: upload tour images to Cloudinary (WebP) and insert all tour
 * data into Supabase.
 *
 * Run once from the project root:
 *   npx tsx scripts/seed-tours.ts
 *
 * Requires these env vars in .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (service role to bypass RLS)
 *   CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 */

import path from "path"
import { createClient } from "@supabase/supabase-js"
import { uploadImageAsWebP } from "../utils/cloudinary"

import { config } from "dotenv"
config({ path: path.resolve(process.cwd(), ".env.local") })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

// ─── Tour base data ───────────────────────────────────────────────────────────

const tours = [
  { slug: "ijen-crater",     image: "/ijen.jpg",                price: 300000, duration: "10 hours", difficulty: "Moderate", rating: 4.8, max_people: 5 },
  { slug: "djawatan-forest", image: "/djawatan.jpg",            price: 250000, duration: "6 hours",  difficulty: "Easy",     rating: 4.8, max_people: 5 },
  { slug: "bangsring-beach", image: "/bangsring-underwater.jpg", price: 300000, duration: "8 hours",  difficulty: "Easy",     rating: 4.7, max_people: 5 },
  { slug: "teluk-hijau",     image: "/teluk-hijau.jpg",         price: 300000, duration: "15 hours", difficulty: "Moderate", rating: 4.9, max_people: 5 },
  { slug: "tabuhan-island",  image: "/pulau-tabuhan.jpg",       price: 300000, duration: "7 hours",  difficulty: "Easy",     rating: 4.8, max_people: 5 },
  { slug: "pulau-merah",     image: "/pulau-merah.jpg",         price: 250000, duration: "10 hours", difficulty: "Easy",     rating: 4.7, max_people: 5 },
]

// ─── Translations (en + id only) ──────────────────────────────────────────────

type LangData = { title: string; description: string; itinerary: string[]; included: string[] }
type TourTranslations = { en: LangData; id: LangData }

const translationsPerSlug: Record<string, TourTranslations> = {
  "ijen-crater": {
    en: {
      title: "Ijen Crater",
      description: "Discover the spectacular Ijen Crater in Banyuwangi, famous for its rare blue fire, dramatic volcanic landscape, and stunning turquoise crater lake.",
      itinerary: [
        "00:00 — Hotel pickup in Banyuwangi (suggested time; confirm with your guide)",
        "01:30 — Arrive at Paltuding, check tickets and health documents, and prepare safety equipment",
        "02:00 — Enter the trail when the official hiking gate opens",
        "02:00–05:30 — Guided ascent; crater access depends on current safety instructions",
        "05:30–07:00 — Viewpoint and sunrise, subject to weather and access rules",
        "07:00–08:30 — Descend and have the included meal",
        "08:30–10:00 — Return to Banyuwangi (estimated; traffic may change arrival time)",
      ],
      included: ["Entrance ticket", "Health certificate", "Meal", "Flashlight", "Gas mask", "Hiking pole"],
    },
    id: {
      title: "Kawah Ijen",
      description: "Jelajahi Kawah Ijen di Banyuwangi yang terkenal dengan api biru langka, lanskap vulkanik dramatis, dan danau kawah berwarna toska.",
      itinerary: [
        "00.00 — Penjemputan malam dari hotel di Banyuwangi (waktu perkiraan)",
        "01.30 — Tiba di Paltuding, pemeriksaan tiket dan surat kesehatan, persiapan perlengkapan",
        "02.00 — Memulai pendakian saat pintu resmi dibuka",
        "02.00–05.30 — Pendakian dengan pemandu; akses kawah mengikuti aturan keselamatan terbaru",
        "05.30–07.00 — Menikmati titik pandang dan matahari terbit, sesuai cuaca dan akses",
        "07.00–08.30 — Turun dan makan",
        "08.30–10.00 — Kembali ke Banyuwangi (perkiraan)",
      ],
      included: ["Tiket masuk Ijen", "Surat keterangan kesehatan", "Makan", "Senter", "Masker gas", "Tongkat daki"],
    },
  },

  "djawatan-forest": {
    en: {
      title: "Djawatan Forest",
      description: "Explore the magical Djawatan Forest in Benculuk, Banyuwangi, surrounded by enormous old trembesi trees and a peaceful natural atmosphere.",
      itinerary: [
        "08:00 — Pickup in Banyuwangi",
        "09:30 — Arrive at Djawatan and enter the forest",
        "10:00–12:00 — Explore the trembesi trees and photo spots",
        "12:00–13:00 — Included meal",
        "13:00–14:00 — Free time and return preparation",
        "14:00–15:30 — Return to Banyuwangi (estimated)",
      ],
      included: ["Djawatan entrance ticket", "Meal"],
    },
    id: {
      title: "Hutan Djawatan",
      description: "Jelajahi Hutan Djawatan di Benculuk, Banyuwangi, dengan pepohonan trembesi tua yang besar dan suasana alam yang menenangkan.",
      itinerary: [
        "08.00 — Penjemputan di Banyuwangi",
        "09.30 — Tiba di Djawatan dan masuk kawasan",
        "10.00–12.00 — Menjelajahi hutan trembesi dan area berfoto",
        "12.00–13.00 — Makan",
        "13.00–14.00 — Waktu bebas dan persiapan kembali",
        "14.00–15.30 — Kembali ke Banyuwangi (perkiraan)",
      ],
      included: ["Tiket masuk Djawatan", "Makan"],
    },
  },

  "bangsring-beach": {
    en: {
      title: "Bangsring Beach",
      description: "Enjoy the beautiful coastal scenery of Bangsring Beach, known for clear seawater, snorkeling opportunities, and marine activities.",
      itinerary: [
        "07:30 — Pickup in Banyuwangi",
        "08:30 — Arrive, check in and prepare for activities",
        "09:00–11:30 — Beach, conservation area and optional snorkeling",
        "11:30–12:30 — Lunch break (meal at own expense)",
        "12:30–14:30 — Continue exploring; boat and water activities depend on availability",
        "14:30–16:00 — Return to Banyuwangi (estimated)",
      ],
      included: ["Local guide", "Transportation", "Drinking water", "Travel assistance"],
    },
    id: {
      title: "Pantai Bangsring",
      description: "Nikmati pemandangan pesisir Pantai Bangsring yang indah, air laut jernih, kesempatan snorkeling, dan beragam aktivitas bahari.",
      itinerary: [
        "07.30 — Penjemputan di Banyuwangi",
        "08.30 — Tiba, registrasi, dan persiapan kegiatan",
        "09.00–11.30 — Menikmati pantai, area konservasi, dan snorkeling opsional",
        "11.30–12.30 — Istirahat makan siang (biaya makan ditanggung sendiri)",
        "12.30–14.30 — Melanjutkan kegiatan; perahu dan aktivitas air menyesuaikan ketersediaan",
        "14.30–16.00 — Kembali ke Banyuwangi (perkiraan)",
      ],
      included: ["Pemandu lokal profesional", "Transportasi", "Air minum", "Bantuan perjalanan"],
    },
  },

  "teluk-hijau": {
    en: {
      title: "Teluk Hijau (Green Bay)",
      description: "Discover Teluk Hijau, also known as Green Bay, a beautiful hidden beach within Meru Betiri National Park in Banyuwangi, East Java.",
      itinerary: [
        "05:00 — Pickup in Banyuwangi for the long drive to Rajegwesi (estimated)",
        "10:00 — Arrive at Rajegwesi, arrange park entry and confirm local access",
        "10:30–11:00 — Reach Teluk Hijau by local boat (~20 min, weather permitting) or land trail (~1 hour)",
        "11:00–13:00 — Enjoy the beach, waterfall and free time",
        "13:00–14:00 — Rest and meal break (meal at own expense)",
        "14:00–15:00 — Return to Rajegwesi by the agreed boat or trail",
        "15:00–20:00 — Drive back to Banyuwangi (estimated)",
      ],
      included: ["Local guide", "Transportation", "Drinking water", "Travel assistance"],
    },
    id: {
      title: "Teluk Hijau",
      description: "Temukan Teluk Hijau, pantai tersembunyi yang indah di Taman Nasional Meru Betiri, Banyuwangi, Jawa Timur.",
      itinerary: [
        "05.00 — Penjemputan dari Banyuwangi untuk perjalanan panjang ke Rajegwesi (perkiraan)",
        "10.00 — Tiba di Rajegwesi, mengurus tiket kawasan, dan memastikan akses lokal",
        "10.30–11.00 — Menuju Teluk Hijau dengan perahu warga (~20 menit) atau jalur darat (~1 jam)",
        "11.00–13.00 — Menikmati pantai, air terjun, dan waktu bebas",
        "13.00–14.00 — Istirahat dan makan (biaya makan ditanggung sendiri)",
        "14.00–15.00 — Kembali ke Rajegwesi dengan perahu atau jalur yang disepakati",
        "15.00–20.00 — Perjalanan kembali ke Banyuwangi (perkiraan)",
      ],
      included: ["Pemandu lokal profesional", "Transportasi", "Air minum", "Bantuan perjalanan"],
    },
  },

  "tabuhan-island": {
    en: {
      title: "Tabuhan Island",
      description: "Take a boat from the Bangsring coast to Tabuhan Island for a day of clear water, beach time and snorkeling.",
      itinerary: [
        "07:30 — Pickup in Banyuwangi and drive to Kampe Beach at Bangsring",
        "08:30 — Check in, confirm sea conditions and prepare snorkeling equipment",
        "09:00 — Boat transfer to Tabuhan Island (departure depends on weather and sea conditions)",
        "09:30–12:00 — Beach time and snorkeling with provided equipment",
        "12:00–13:00 — Included meal and rest on the island",
        "13:00 — Return boat to Kampe Beach",
        "14:00–15:00 — Return to Banyuwangi (estimated)",
      ],
      included: ["Tabuhan entrance ticket", "Return boat / sampan transfer", "Meal", "Snorkeling equipment"],
    },
    id: {
      title: "Pulau Tabuhan",
      description: "Menyeberang dari pesisir Bangsring ke Pulau Tabuhan untuk menikmati pantai, air jernih, dan snorkeling.",
      itinerary: [
        "07.30 — Penjemputan di Banyuwangi dan perjalanan ke Pantai Kampe, Bangsring",
        "08.30 — Registrasi, memeriksa kondisi laut, dan menyiapkan alat selam",
        "09.00 — Menyeberang ke Pulau Tabuhan; keberangkatan menyesuaikan cuaca dan kondisi laut",
        "09.30–12.00 — Menikmati pantai dan snorkeling dengan alat yang disediakan",
        "12.00–13.00 — Makan dan istirahat di pulau",
        "13.00 — Kembali dengan perahu ke Pantai Kampe",
        "14.00–15.00 — Kembali ke Banyuwangi (perkiraan)",
      ],
      included: ["Tiket masuk Pulau Tabuhan", "Perahu/sampan pulang-pergi", "Makan", "Alat selam/snorkeling"],
    },
  },

  "pulau-merah": {
    en: {
      title: "Pulau Merah",
      description: "Spend a full day at Pulau Merah, a south-coast beach known for its red offshore hill and sunset views.",
      itinerary: [
        "07:00 — Pickup in Banyuwangi",
        "07:00–10:00 — Drive to Pulau Merah (estimated; traffic may change travel time)",
        "10:00–12:00 — Beach visit and free time",
        "12:00–13:00 — Included meal",
        "13:00–15:30 — Relax, explore the shoreline and enjoy the view",
        "15:30–18:30 — Return to Banyuwangi (estimated)",
      ],
      included: ["Pulau Merah entrance ticket", "Meal"],
    },
    id: {
      title: "Pulau Merah",
      description: "Nikmati wisata sehari penuh di Pantai Pulau Merah, pesisir selatan Banyuwangi yang terkenal dengan bukit merah dan pemandangan senja.",
      itinerary: [
        "07.00 — Penjemputan di Banyuwangi",
        "07.00–10.00 — Perjalanan ke Pulau Merah (perkiraan)",
        "10.00–12.00 — Kunjungan pantai dan waktu bebas",
        "12.00–13.00 — Makan siang",
        "13.00–15.30 — Bersantai, menyusuri pantai, dan menikmati pemandangan",
        "15.30–18.30 — Kembali ke Banyuwangi (perkiraan)",
      ],
      included: ["Tiket masuk Pulau Merah", "Makan"],
    },
  },
}

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("Starting seed…\n")
  const publicDir = path.resolve(process.cwd(), "public")

  for (const tour of tours) {
    console.log(`→ Processing ${tour.slug}`)

    // 1. Upload image to Cloudinary as WebP
    const localImage = path.join(publicDir, tour.image)
    console.log(`  Uploading ${tour.image} to Cloudinary…`)
    const imageUrl = await uploadImageAsWebP(localImage, tour.slug)
    console.log(`  ✓ Image URL: ${imageUrl}`)

    // 2. Upsert tour base row
    const { data: tourRow, error: tourError } = await supabase
      .from("tours")
      .upsert(
        {
          slug: tour.slug,
          price: tour.price,
          duration: tour.duration,
          difficulty: tour.difficulty,
          rating: tour.rating,
          max_people: tour.max_people,
          image_url: imageUrl,
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single()

    if (tourError || !tourRow) {
      console.error(`  ✗ Failed to upsert tour: ${tourError?.message}`)
      continue
    }

    const tourId = tourRow.id
    const translations = translationsPerSlug[tour.slug]

    for (const [lang, t] of Object.entries(translations)) {
      // 3. Upsert translation
      const { error: tErr } = await supabase
        .from("tour_translations")
        .upsert(
          { tour_id: tourId, lang, title: t.title, description: t.description },
          { onConflict: "tour_id,lang" },
        )
      if (tErr) console.error(`  ✗ Translation [${lang}]: ${tErr.message}`)

      // 4. Re-insert itinerary items
      await supabase.from("tour_itinerary_items").delete().eq("tour_id", tourId).eq("lang", lang)
      const { error: iErr } = await supabase.from("tour_itinerary_items").insert(
        t.itinerary.map((text, i) => ({ tour_id: tourId, lang, step_order: i + 1, text })),
      )
      if (iErr) console.error(`  ✗ Itinerary [${lang}]: ${iErr.message}`)

      // 5. Re-insert included items
      await supabase.from("tour_included_items").delete().eq("tour_id", tourId).eq("lang", lang)
      const { error: inclErr } = await supabase.from("tour_included_items").insert(
        t.included.map((text, i) => ({ tour_id: tourId, lang, item_order: i + 1, text })),
      )
      if (inclErr) console.error(`  ✗ Included [${lang}]: ${inclErr.message}`)

      console.log(`  ✓ [${lang}] done`)
    }

    console.log(`  ✓ Finished: ${tour.slug}\n`)
  }

  console.log("Seed complete.")
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
