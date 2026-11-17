import type { MetadataRoute } from "next"
import { createClient } from "@supabase/supabase-js"
import { siteUrl } from "@/lib/metadata"

const langs = ["en", "id"] as const

const staticPaths = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/explore", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/partners", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/help", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/feedback", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/cancellation", priority: 0.3, changeFrequency: "yearly" as const },
]

async function getTourSlugs(): Promise<string[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  )
  const { data } = await supabase.from("tours").select("slug").order("created_at")
  return data?.map((t) => t.slug) ?? []
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getTourSlugs()

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap(({ path, priority, changeFrequency }) =>
    langs.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      priority,
      changeFrequency,
      alternates: {
        languages: Object.fromEntries(langs.map((l) => [l, `${siteUrl}/${l}${path}`])),
      },
    })),
  )

  const tourEntries: MetadataRoute.Sitemap = slugs.flatMap((slug) =>
    langs.map((lang) => ({
      url: `${siteUrl}/${lang}/explore/${slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
      alternates: {
        languages: Object.fromEntries(langs.map((l) => [l, `${siteUrl}/${l}/explore/${slug}`])),
      },
    })),
  )

  return [...staticEntries, ...tourEntries]
}
