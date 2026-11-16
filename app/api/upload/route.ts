import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { uploadBufferAsWebP } from "@/utils/cloudinary"

export async function POST(request: NextRequest) {
  // Only authenticated admin users can upload
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file") as File | null
  const publicId = formData.get("public_id") as string | null

  if (!file || !publicId) {
    return NextResponse.json({ error: "file and public_id are required" }, { status: 400 })
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Only JPEG, PNG, WebP, GIF are allowed" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const url = await uploadBufferAsWebP(buffer, publicId)

  return NextResponse.json({ url })
}
