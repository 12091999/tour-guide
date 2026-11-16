"use server"

import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { createClient as createServiceClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

export type SiteConfig = {
  business_whatsapp: string
  business_email: string
}

const defaults: SiteConfig = {
  business_whatsapp: "6287775916086",
  business_email: "TourGuide@gmail.com",
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data } = await supabase.from("site_config").select("key, value")
  if (!data) return { ...defaults }
  const config = { ...defaults }
  for (const { key, value } of data) {
    if (key in config) (config as Record<string, string>)[key] = value
  }
  return config
}

export async function updateSiteConfig(key: string, value: string): Promise<{ error?: string; success?: true }> {
  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
  const { error } = await supabase
    .from("site_config")
    .upsert({ key, value, updated_at: new Date().toISOString() })
  if (error) return { error: error.message }
  revalidatePath("/", "layout")
  return { success: true }
}
