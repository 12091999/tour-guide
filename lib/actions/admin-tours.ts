"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"

type TourInput = {
  slug: string
  price: number
  duration: string
  difficulty: string
  rating: number
  max_people: number
  image_url: string
  en_title: string
  en_description: string
  en_itinerary: string   // newline-separated
  en_included: string    // newline-separated
  id_title: string
  id_description: string
  id_itinerary: string
  id_included: string
}

async function requireAdmin() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")
  return supabase
}

export async function saveTour(tourId: string | null, input: TourInput) {
  const supabase = await requireAdmin()

  const tourPayload = {
    slug: input.slug,
    price: input.price,
    duration: input.duration,
    difficulty: input.difficulty,
    rating: input.rating,
    max_people: input.max_people,
    image_url: input.image_url,
  }

  let id = tourId

  if (id) {
    const { error } = await supabase.from("tours").update(tourPayload).eq("id", id)
    if (error) return { error: error.message }
  } else {
    const { data, error } = await supabase.from("tours").insert(tourPayload).select("id").single()
    if (error || !data) return { error: error?.message ?? "Insert failed" }
    id = data.id
  }

  for (const lang of ["en", "id"] as const) {
    const title = lang === "en" ? input.en_title : input.id_title
    const description = lang === "en" ? input.en_description : input.id_description
    const itinerary = (lang === "en" ? input.en_itinerary : input.id_itinerary)
      .split("\n").map((s) => s.trim()).filter(Boolean)
    const included = (lang === "en" ? input.en_included : input.id_included)
      .split("\n").map((s) => s.trim()).filter(Boolean)

    const { error: tErr } = await supabase.from("tour_translations").upsert(
      { tour_id: id, lang, title, description },
      { onConflict: "tour_id,lang" },
    )
    if (tErr) return { error: `Translation [${lang}]: ${tErr.message}` }

    await supabase.from("tour_itinerary_items").delete().eq("tour_id", id).eq("lang", lang)
    const { error: iErr } = await supabase.from("tour_itinerary_items").insert(
      itinerary.map((text, i) => ({ tour_id: id, lang, step_order: i + 1, text })),
    )
    if (iErr) return { error: `Itinerary [${lang}]: ${iErr.message}` }

    await supabase.from("tour_included_items").delete().eq("tour_id", id).eq("lang", lang)
    const { error: inclErr } = await supabase.from("tour_included_items").insert(
      included.map((text, i) => ({ tour_id: id, lang, item_order: i + 1, text })),
    )
    if (inclErr) return { error: `Included [${lang}]: ${inclErr.message}` }
  }

  revalidatePath("/admin")
  revalidatePath("/en")
  revalidatePath("/id")
  return { success: true, id }
}

export async function deleteTour(id: string) {
  const supabase = await requireAdmin()
  const { error } = await supabase.from("tours").delete().eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/admin")
  revalidatePath("/en")
  revalidatePath("/id")
  return { success: true }
}

export async function signOut() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  await supabase.auth.signOut()
  redirect("/admin/login")
}
