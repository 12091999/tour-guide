import Image from "next/image"
import Link from "next/link"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import { DeleteTourButton } from "@/components/admin/delete-tour-button"
import { PlusCircle, Star } from "lucide-react"

export default async function AdminToursPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: tours } = await supabase
    .from("tours")
    .select(`
      id, slug, price, duration, difficulty, rating, image_url,
      tour_translations ( title, lang )
    `)
    .order("created_at")

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Tours</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your tour listings</p>
        </div>
        <Button asChild>
          <Link href="/admin/tours/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Tour
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {tours?.map((tour) => {
          const enTitle = tour.tour_translations?.find((t: any) => t.lang === "en")?.title
          const idTitle = tour.tour_translations?.find((t: any) => t.lang === "id")?.title

          return (
            <div
              key={tour.id}
              className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={tour.image_url}
                  alt={enTitle ?? tour.slug}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{enTitle ?? tour.slug}</p>
                <p className="text-sm text-muted-foreground truncate">{idTitle}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {tour.slug} · Rp {tour.price.toLocaleString("id-ID")} · {tour.duration} · <Star className="inline h-3 w-3 fill-amber-400 text-amber-400 mb-0.5" /> {tour.rating}
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/tours/${tour.slug}`}>Edit</Link>
                </Button>
                <DeleteTourButton id={tour.id} title={enTitle ?? tour.slug} />
              </div>
            </div>
          )
        })}

        {(!tours || tours.length === 0) && (
          <div className="rounded-lg border border-dashed bg-card p-16 text-center">
            <p className="text-muted-foreground">
              No tours yet.{" "}
              <Link href="/admin/tours/new" className="text-primary hover:underline font-medium">
                Add your first tour
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
