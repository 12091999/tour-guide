import { createClient } from "@supabase/supabase-js"
import { siteUrl } from "@/lib/metadata"

export const dynamic = "force-dynamic"

type TourRow = {
  slug: string
  price: number
  duration: string
  rating: number
  tour_translations: { title: string; lang: string }[]
}

async function getTours(): Promise<TourRow[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  )
  const { data } = await supabase
    .from("tours")
    .select("slug, price, duration, rating, tour_translations(title, lang)")
    .order("created_at")
  return (data as TourRow[]) ?? []
}

export async function GET() {
  const tours = await getTours()

  const tourLines = tours
    .map((tour) => {
      const en = tour.tour_translations.find((t) => t.lang === "en")?.title ?? tour.slug
      const id = tour.tour_translations.find((t) => t.lang === "id")?.title ?? tour.slug
      const price = `Rp ${tour.price.toLocaleString("id-ID")}`
      return `- [${en}](${siteUrl}/en/explore/${tour.slug}): ${id} · ${tour.duration} · ${price} · ⭐ ${tour.rating}`
    })
    .join("\n")

  const text = `# Tour Guide Banyuwangi

> Tour Guide Banyuwangi adalah layanan pemandu wisata lokal di Banyuwangi, Jawa Timur, Indonesia. Menyediakan tur ke destinasi alam dan budaya dengan panduan berpengalaman, pemesanan via WhatsApp, dan dukungan dua bahasa (Indonesia & English).

## Destinations / Destinasi

${tourLines || "- (Tour data not available)"}

## Main Pages

- [Home – EN](${siteUrl}/en): English homepage with featured destinations
- [Home – ID](${siteUrl}/id): Halaman utama bahasa Indonesia
- [Explore All Tours](${siteUrl}/en/explore): Full destination listing
- [About Us](${siteUrl}/en/about): About the Tour Guide team
- [Local Partners](${siteUrl}/en/partners): Recommended dining, stays, and rentals in Banyuwangi
- [Contact](${siteUrl}/en/contact): WhatsApp and email contact info
- [Help & FAQ](${siteUrl}/en/help): Booking, payment, and travel questions
- [Privacy Policy](${siteUrl}/en/privacy): Privacy policy
- [Terms of Service](${siteUrl}/en/terms): Terms of service
- [Cancellation Policy](${siteUrl}/en/cancellation): Cancellation and refund policy

## Key Facts

- Location: Banyuwangi, East Java, Indonesia
- Languages: Indonesian (id), English (en)
- Booking method: WhatsApp (direct messaging)
- Notable destinations: Kawah Ijen / Ijen Crater, Hutan Djawatan / Djawatan Forest, Teluk Hijau, Pulau Merah / Red Island, Tabuhan Island, Bangsring Beach
- Sitemap: ${siteUrl}/sitemap.xml
`

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
