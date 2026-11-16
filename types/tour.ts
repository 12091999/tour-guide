export type Tour = {
  id: string
  slug: string
  price: number
  duration: string
  difficulty: string
  rating: number
  max_people: number
  image_url: string
  created_at: string
  updated_at: string
}

export type TourTranslation = {
  id: string
  tour_id: string
  lang: string
  title: string
  description: string
}

export type TourItineraryItem = {
  id: string
  tour_id: string
  lang: string
  step_order: number
  text: string
}

export type TourIncludedItem = {
  id: string
  tour_id: string
  lang: string
  item_order: number
  text: string
}

export type TourDetail = Tour & {
  title: string
  description: string
  itinerary: string[]
  included: string[]
}
