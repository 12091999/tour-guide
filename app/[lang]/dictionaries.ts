import "server-only"

import english from "./dictionaries/en.json"

export const supportedLanguages = ["id", "en"] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]

export function isSupportedLanguage(locale: string): locale is SupportedLanguage {
  return supportedLanguages.includes(locale as SupportedLanguage)
}

const translations: Partial<Record<SupportedLanguage, Record<string, unknown>>> = {
  id: {
    nav: { home: "Beranda", tours: "Tur Ekstrem", about: "Tentang", contact: "Kontak" },
    hero: { title: "Petualangan Ekstrem di Georgia", subtitle: "Jelajahi alam liar Georgia dengan tur jip, trekking ekstrem, dan petualangan penuh adrenalin", cta: "Jelajahi Petualangan" },
    tours: { title: "Tur Ekstrem", subtitle: "Pilih petualangan yang sesuai untuk Anda", viewDetails: "Lihat Detail", duration: "Durasi", price: "Harga", from: "mulai dari", allTours: "Semua Tur", filterBy: "Filter", all: "Semua", jeep: "Tur Jip", hiking: "Trekking Ekstrem", climbing: "Panjat Tebing", rafting: "Arung Jeram", winter: "Olahraga Musim Dingin", bookNow: "Pesan Sekarang", difficulty: "Tingkat Kesulitan", beginner: "Pemula", intermediate: "Menengah", advanced: "Lanjutan", expert: "Ahli" },
    testimonials: { title: "Ulasan Wisatawan", subtitle: "Pengalaman para pencinta petualangan" },
    staff: { title: "Tim Pemandu Kami", subtitle: "Kenali instruktur tur berpengalaman kami" },
    about: { title: "Tentang Kami", subtitle: "Georgia Extreme Tours", description: "Kami menawarkan pengalaman petualangan unik dan tur alam sejak 2018.", mission: "Misi Kami", missionText: "Menghadirkan petualangan seru dengan mengutamakan keselamatan.", vision: "Visi Kami", visionText: "Menjadi penyedia petualangan alam terkemuka.", values: "Nilai Kami", valuesText: "Keselamatan, profesionalisme, dan kepedulian terhadap alam." },
    contact: { title: "Hubungi Kami", phone: "Telepon", email: "Email", address: "Alamat", workingHours: "Jam Operasional", form: { name: "Nama", email: "Email", subject: "Subjek", message: "Pesan", send: "Kirim Pesan", sending: "Mengirim...", success: "Pesan berhasil dikirim!", error: "Terjadi kesalahan. Silakan coba lagi." }, info: { getInTouch: "Hubungi Kami", description: "Siap untuk petualangan? Hubungi kami untuk merencanakannya.", officeHours: "Jam Kantor", mondayFriday: "Senin–Jumat: 08.00–20.00", saturday: "Sabtu: 09.00–18.00", sunday: "Minggu: 10.00–16.00" } },
    footer: { description: "Georgia Extreme Tours — petualangan alam penuh adrenalin", quickLinks: "Tautan Cepat", followUs: "Ikuti Kami", rights: "Hak cipta dilindungi" },
  },
}

const pageTranslations: Partial<Record<SupportedLanguage, Record<string, unknown>>> = {
  id: {
    site: {
      home: { kicker: "Jelajahi keindahan Jawa Timur", title: "Jelajahi Banyuwangi", description: "Temukan alam yang menakjubkan, pantai tropis, hutan yang asri, dan pengalaman seru di Banyuwangi, Indonesia.", explore: "Jelajahi Destinasi", aboutKicker: "Tentang Banyuwangi", aboutTitle: "Rasakan Keajaiban Banyuwangi", aboutDescription: "Dari api biru Kawah Ijen hingga hutan Djawatan yang teduh dan perairan jernih Pantai Bangsring, Banyuwangi menawarkan pengalaman istimewa bagi setiap wisatawan." },
      destinations: { kicker: "Jelajahi Indonesia", title: "Destinasi Pilihan", description: "Temukan destinasi indah dan pengalaman tak terlupakan di Banyuwangi, Jawa Timur.", explore: "Jelajahi", viewAll: "Lihat Semua Destinasi", ijen: "Temukan api biru yang langka dan danau kawah berwarna toska.", djawatan: "Jelajahi hutan magis dengan pepohonan trembesi raksasa.", bangsring: "Nikmati pantai yang asri, air jernih, dan aktivitas laut.", teluk: "Temukan surga tersembunyi di Taman Nasional Meru Betiri." },
      detail: { about: "Tentang Destinasi Ini", itinerary: "Rencana Perjalanan", included: "Termasuk", maxPeople: "Maksimal {count} orang", maxPeopleLabel: "Maksimal Orang", startingPrice: "Harga mulai", perPerson: "Per orang", duration: "Durasi", rating: "Penilaian", location: "Lokasi", contact: "Hubungi Kami", back: "Kembali ke Destinasi", notFound: "Destinasi Tidak Ditemukan", notFoundDescription: "Destinasi yang Anda cari tidak tersedia.", backHome: "Kembali ke Beranda" },
      footer: { destinations: "Destinasi", company: "Perusahaan", support: "Bantuan", about: "Tentang Kami", careers: "Karier", press: "Pers", blog: "Blog", partners: "Mitra", help: "Pusat Bantuan", contact: "Hubungi Kami", privacy: "Kebijakan Privasi", terms: "Syarat Layanan", cancellation: "Kebijakan Pembatalan", copyright: "Hak cipta dilindungi." },
    },
  },
}

const aboutPageTranslations: Partial<Record<SupportedLanguage, Record<string, unknown>>> = {
  id: { site: { about: { stats: ["Wisatawan Puas", "Tur", "Tahun Pengalaman", "Pemandu Ahli"], team: [["Pendiri & CEO", "Berpengalaman 15 tahun di industri pariwisata"], ["Manajer Operasional", "Spesialis tur budaya"], ["Ahli Tur Pegunungan", "Instruktur dan pemandu pendakian"]], whyTitle: "Mengapa Memilih Kami?", features: [["Kualitas", "Layanan berkualitas tinggi"], ["Pengalaman", "Pengalaman lebih dari 8 tahun"], ["Bahasa", "Pemandu multibahasa"], ["Kepedulian", "Layanan yang personal"]] } } },
}

const aboutBrandTranslations: Partial<Record<SupportedLanguage, Record<string, unknown>>> = {
  en: { about: { title: "About Tour Guide", subtitle: "Your travel guide to Banyuwangi", description: "Tour Guide was created for international travelers planning a holiday in Banyuwangi, with curated nature destinations, outdoor experiences, and contemporary local hangouts.", mission: "Our Mission", missionText: "To introduce Banyuwangi and its destinations to travelers around the world.", vision: "Our Vision", visionText: "To make Tour Guide a trusted travel website known internationally.", values: "Safety and Friendly Support", valuesText: "From arrival in Banyuwangi until the end of each trip, our friendly local companions help guests travel safely." }, staff: { title: "Our Expert Team", subtitle: "Meet the people behind Tour Guide" }, site: { about: { team: [["CEO & Founder", "Founded Tour Guide to introduce Banyuwangi to international travelers."], ["Development", "Builds and maintains the Tour Guide website."], ["Mentor", "Guides and supports the project team."]] } } },
  id: { about: { title: "Tentang Tour Guide", subtitle: "Panduan wisata Anda di Banyuwangi", description: "Tour Guide dibuat untuk wisatawan mancanegara yang ingin berlibur di Banyuwangi, dengan pilihan destinasi alam, pengalaman luar ruang, dan tempat nongkrong lokal yang kekinian.", mission: "Misi Kami", missionText: "Mengenalkan Banyuwangi beserta destinasinya kepada wisatawan dari seluruh dunia.", vision: "Visi Kami", visionText: "Menjadikan Tour Guide sebagai situs wisata tepercaya yang dikenal hingga mancanegara.", values: "Keamanan dan Pendampingan Ramah", valuesText: "Sejak tiba di Banyuwangi hingga perjalanan selesai, teman-teman lokal kami yang ramah siap mendampingi dan membantu menjaga keamanan wisatawan." }, staff: { title: "Tim Ahli Kami", subtitle: "Kenali tim di balik Tour Guide" }, site: { about: { team: [["CEO & Founder", "Mendirikan Tour Guide untuk mengenalkan Banyuwangi kepada wisatawan mancanegara."], ["Pengembangan", "Membangun dan mengelola website Tour Guide."], ["Mentor", "Membimbing dan mendukung tim proyek."]] } } },
}

const defaultSite = {
  site: {
    home: { kicker: "Discover the beauty of East Java", title: "Explore Banyuwangi", description: "Discover breathtaking landscapes, tropical beaches, beautiful forests, and unforgettable adventures in Banyuwangi, Indonesia.", explore: "Explore Destinations", aboutKicker: "About Banyuwangi", aboutTitle: "Experience the Wonders of Banyuwangi", aboutDescription: "From Ijen Crater's spectacular blue fire to the peaceful Djawatan Forest and the clear waters of Bangsring Beach, Banyuwangi offers extraordinary experiences for every traveler." },
    destinations: { kicker: "Explore Indonesia", title: "Featured Destinations", description: "Discover beautiful destinations and unforgettable experiences in Banyuwangi, East Java.", explore: "Explore", viewAll: "View All Destinations", ijen: "Discover the rare blue fire and breathtaking turquoise crater lake.", djawatan: "Explore a magical forest surrounded by giant trembesi trees.", bangsring: "Enjoy pristine beaches, crystal-clear waters, and marine activities.", teluk: "Discover a hidden paradise in Meru Betiri National Park." },
    detail: { about: "About This Destination", itinerary: "Tour Itinerary", included: "What's Included", maxPeople: "Max {count} people", maxPeopleLabel: "Max People", startingPrice: "Starting price", perPerson: "Per person", duration: "Duration", rating: "Rating", location: "Location", contact: "Contact Us", back: "Back to Destinations", notFound: "Destination Not Found", notFoundDescription: "The destination you are looking for is unavailable.", backHome: "Back to Home" },
    footer: { destinations: "Destinations", company: "Company", support: "Support", about: "About Us", careers: "Careers", press: "Press", blog: "Blog", partners: "Partners", help: "Help Center", contact: "Contact Us", privacy: "Privacy Policy", terms: "Terms of Service", cancellation: "Cancellation Policy", copyright: "All rights reserved." },
    about: { stats: ["Happy Travelers", "Tours", "Years Experience", "Expert Guides"], team: [["Founder & CEO", "15 years of experience in the tourism industry"], ["Operations Manager", "Cultural tours specialist"], ["Mountain Tours Expert", "Mountaineering instructor and guide"]], whyTitle: "Why Choose Us?", features: [["Quality", "High quality service"], ["Experience", "More than 8 years of experience"], ["Languages", "Multilingual guides"], ["Care", "Personal approach"]] },
  },
}

function merge(base: Record<string, any>, override: Record<string, unknown>) {
  const result: Record<string, any> = { ...base }
  for (const [key, value] of Object.entries(override)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = merge((base[key] ?? {}) as Record<string, any>, value as Record<string, unknown>)
    } else {
      result[key] = value
    }
  }
  return result
}

export async function getDictionary(locale: SupportedLanguage) {
  const navLabels: Record<SupportedLanguage, string> = {
    id: "Destinasi Lain",
    en: "Other Destinations",
  }
  const footerDescriptions: Record<SupportedLanguage, string> = {
    id: "Tour Guide Traveller membantu wisatawan menjelajahi alam, budaya, dan pengalaman lokal Banyuwangi.",
    en: "Tour Guide Traveller helps international visitors discover Banyuwangi's nature, culture and local experiences.",
  }

  const merged = merge(
    merge(merge(english as Record<string, any>, defaultSite), translations[locale] ?? {}),
    pageTranslations[locale] ?? {},
  )
  const withAboutCopy = merge(
    merge(merged as Record<string, any>, aboutPageTranslations[locale] ?? {}),
    aboutBrandTranslations[locale] ?? aboutBrandTranslations.en!,
  )
  return merge(withAboutCopy, {
    nav: { tours: navLabels[locale] },
    footer: { brandName: "Tour Guide Traveller", description: footerDescriptions[locale] },
  })
}
