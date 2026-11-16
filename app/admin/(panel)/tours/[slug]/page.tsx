import Link from "next/link"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import { TourForm } from "@/components/admin/tour-form"
import { ChevronLeft } from "lucide-react"

export default async function EditTourPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: tour } = await supabase
    .from("tours")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!tour) notFound()

  const { data: translations } = await supabase
    .from("tour_translations")
    .select("lang, title, description")
    .eq("tour_id", tour.id)

  const { data: itineraryRows } = await supabase
    .from("tour_itinerary_items")
    .select("lang, text, step_order")
    .eq("tour_id", tour.id)
    .order("step_order")

  const { data: includedRows } = await supabase
    .from("tour_included_items")
    .select("lang, text, item_order")
    .eq("tour_id", tour.id)
    .order("item_order")

  function getLang(lang: string) {
    const t = translations?.find((x) => x.lang === lang)
    const itinerary = itineraryRows?.filter((x) => x.lang === lang).map((x) => x.text).join("\n") ?? ""
    const included = includedRows?.filter((x) => x.lang === lang).map((x) => x.text).join("\n") ?? ""
    return { title: t?.title ?? "", description: t?.description ?? "", itinerary, included }
  }

  const en = getLang("en")
  const id = getLang("id")

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link href="/admin">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Tours
          </Link>
        </Button>
        <div className="h-5 w-px bg-border" />
        <h1 className="text-2xl font-bold">Edit — {en.title || slug}</h1>
      </div>

      <div className="max-w-4xl">
        <TourForm
          tourId={tour.id}
          defaultValues={{
            slug: tour.slug,
            price: tour.price,
            duration: tour.duration,
            difficulty: tour.difficulty,
            rating: tour.rating,
            max_people: tour.max_people,
            image_url: tour.image_url,
            en_title: en.title,
            en_description: en.description,
            en_itinerary: en.itinerary,
            en_included: en.included,
            id_title: id.title,
            id_description: id.description,
            id_itinerary: id.itinerary,
            id_included: id.included,
          }}
        />
      </div>
    </div>
  )
}
