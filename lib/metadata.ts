import type { Metadata } from "next"

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tourguide-banyuwangi.com"
export const siteName = "Tour Guide Banyuwangi"
export const defaultOgImage = {
  url: "/ijen.jpg",
  width: 1200,
  height: 630,
  alt: "Kawah Ijen – Banyuwangi, Indonesia",
}

export function buildMeta(options: {
  lang: string
  title: string
  description: string
  path?: string
  ogImage?: { url: string; width?: number; height?: number; alt?: string }
  noindex?: boolean
}): Metadata {
  const { lang, title, description, path = "", ogImage = defaultOgImage, noindex = false } = options
  const pageUrl = `${siteUrl}/${lang}${path}`

  return {
    title,
    description,
    ...(noindex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${siteUrl}/en${path}`,
        id: `${siteUrl}/id${path}`,
        "x-default": `${siteUrl}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      images: [ogImage],
    },
  }
}
