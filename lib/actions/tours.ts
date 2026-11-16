"use server"

import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import type { TourDetail } from "@/types/tour"

type TourRow = {
  id: string
  slug: string
  price: number
  duration: string
  difficulty: string
  rating: number
  max_people: number
  image_url: string
}

/** Returns all tours with title/description in the requested language. */
export async function getAllTours(lang: string): Promise<(TourRow & { title: string; description: string })[]> {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from("tours")
    .select(`
      id, slug, price, duration, difficulty, rating, max_people, image_url,
      tour_translations!inner ( title, description, lang )
    `)
    .eq("tour_translations.lang", lang)

  if (error) throw new Error(error.message)
  if (!data) return []

  return data.map((row: any) => ({
    id: row.id,
    slug: row.slug,
    price: row.price,
    duration: row.duration,
    difficulty: row.difficulty,
    rating: row.rating,
    max_people: row.max_people,
    image_url: row.image_url,
    title: row.tour_translations[0]?.title ?? "",
    description: row.tour_translations[0]?.description ?? "",
  }))
}

/** Returns a single tour with all localized content for the given language. */
export async function getTour(slug: string, lang: string): Promise<TourDetail | null> {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: tour, error: tourError } = await supabase
    .from("tours")
    .select("*")
    .eq("slug", slug)
    .single()

  if (tourError || !tour) return null

  // Fetch translation, falling back to English
  const { data: translation } = await supabase
    .from("tour_translations")
    .select("title, description")
    .eq("tour_id", tour.id)
    .eq("lang", lang)
    .maybeSingle()

  const { data: translationFallback } = !translation
    ? await supabase
        .from("tour_translations")
        .select("title, description")
        .eq("tour_id", tour.id)
        .eq("lang", "en")
        .maybeSingle()
    : { data: null }

  const t = translation ?? translationFallback

  // Fetch itinerary, falling back to English
  const { data: itineraryRows } = await supabase
    .from("tour_itinerary_items")
    .select("text, step_order")
    .eq("tour_id", tour.id)
    .eq("lang", lang)
    .order("step_order")

  const itinerary =
    itineraryRows && itineraryRows.length > 0
      ? itineraryRows.map((r: any) => r.text)
      : await getFallbackList(supabase, "tour_itinerary_items", tour.id, "step_order")

  // Fetch included items, falling back to English
  const { data: includedRows } = await supabase
    .from("tour_included_items")
    .select("text, item_order")
    .eq("tour_id", tour.id)
    .eq("lang", lang)
    .order("item_order")

  const included =
    includedRows && includedRows.length > 0
      ? includedRows.map((r: any) => r.text)
      : await getFallbackList(supabase, "tour_included_items", tour.id, "item_order")

  return {
    ...tour,
    title: t?.title ?? tour.slug,
    description: t?.description ?? "",
    itinerary,
    included,
  }
}

async function getFallbackList(
  supabase: any,
  table: string,
  tourId: string,
  orderCol: string,
): Promise<string[]> {
  const { data } = await supabase
    .from(table)
    .select("text")
    .eq("tour_id", tourId)
    .eq("lang", "en")
    .order(orderCol)
  return data ? data.map((r: any) => r.text) : []
}
