"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { saveTour } from "@/lib/actions/admin-tours"

type TourFormProps = {
  tourId?: string
  defaultValues?: {
    slug: string
    price: number
    duration: string
    difficulty: string
    rating: number
    max_people: number
    image_url: string
    en_title: string
    en_description: string
    en_itinerary: string
    en_included: string
    id_title: string
    id_description: string
    id_itinerary: string
    id_included: string
  }
}

export function TourForm({ tourId, defaultValues }: TourFormProps) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [imageUrl, setImageUrl] = useState(defaultValues?.image_url ?? "")
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    const slug = (document.getElementById("slug") as HTMLInputElement)?.value || "tour"
    const formData = new FormData()
    formData.append("file", file)
    formData.append("public_id", slug)

    const res = await fetch("/api/upload", { method: "POST", body: formData })
    const json = await res.json()

    if (!res.ok) {
      setError(json.error ?? "Upload failed")
    } else {
      setImageUrl(json.url)
    }
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const fd = new FormData(e.currentTarget)
    const input = {
      slug: fd.get("slug") as string,
      price: Number(fd.get("price")),
      duration: fd.get("duration") as string,
      difficulty: fd.get("difficulty") as string,
      rating: Number(fd.get("rating")),
      max_people: Number(fd.get("max_people")),
      image_url: imageUrl,
      en_title: fd.get("en_title") as string,
      en_description: fd.get("en_description") as string,
      en_itinerary: fd.get("en_itinerary") as string,
      en_included: fd.get("en_included") as string,
      id_title: fd.get("id_title") as string,
      id_description: fd.get("id_description") as string,
      id_itinerary: fd.get("id_itinerary") as string,
      id_included: fd.get("id_included") as string,
    }

    const result = await saveTour(tourId ?? null, input)

    if ("error" in result && result.error) {
      setError(result.error)
      setSaving(false)
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">

      {/* Base info */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Tour Info</h2>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug (URL)" name="slug" defaultValue={defaultValues?.slug} required
            placeholder="ijen-crater" />
          <Field label="Price (IDR)" name="price" type="number" defaultValue={defaultValues?.price} required />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Duration" name="duration" defaultValue={defaultValues?.duration} required
            placeholder="10 hours" />
          <Field label="Difficulty" name="difficulty" defaultValue={defaultValues?.difficulty} required
            placeholder="Easy / Moderate" />
          <Field label="Rating" name="rating" type="number" step="0.1" min="0" max="5"
            defaultValue={defaultValues?.rating} required />
        </div>

        <Field label="Max People" name="max_people" type="number"
          defaultValue={defaultValues?.max_people ?? 5} required />
      </section>

      {/* Image */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Tour Image</h2>

        {imageUrl && (
          <div className="relative w-full h-56">
            <Image src={imageUrl} alt="Preview" fill className="object-cover rounded-lg" sizes="100vw" />
          </div>
        )}

        <div className="flex gap-3 items-center">
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={handleImageUpload} />
          <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}
            disabled={uploading}>
            {uploading ? "Uploading…" : "Upload image"}
          </Button>
          <span className="text-xs text-muted-foreground">
            Automatically converted to WebP
          </span>
        </div>

        {imageUrl && (
          <p className="text-xs text-muted-foreground break-all">{imageUrl}</p>
        )}
      </section>

      {/* English content */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">English (EN)</h2>
        <Field label="Title" name="en_title" defaultValue={defaultValues?.en_title} required />
        <TextareaField label="Description" name="en_description"
          defaultValue={defaultValues?.en_description} rows={3} required />
        <TextareaField label="Itinerary (one step per line)" name="en_itinerary"
          defaultValue={defaultValues?.en_itinerary} rows={7} required />
        <TextareaField label="Included (one item per line)" name="en_included"
          defaultValue={defaultValues?.en_included} rows={4} required />
      </section>

      {/* Indonesian content */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Indonesian (ID)</h2>
        <Field label="Judul" name="id_title" defaultValue={defaultValues?.id_title} required />
        <TextareaField label="Deskripsi" name="id_description"
          defaultValue={defaultValues?.id_description} rows={3} required />
        <TextareaField label="Itinerary (satu langkah per baris)" name="id_itinerary"
          defaultValue={defaultValues?.id_itinerary} rows={7} required />
        <TextareaField label="Termasuk (satu item per baris)" name="id_included"
          defaultValue={defaultValues?.id_included} rows={4} required />
      </section>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={saving || uploading || !imageUrl}>
          {saving ? "Saving…" : tourId ? "Save changes" : "Create tour"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function Field({ label, name, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...props} />
    </div>
  )
}

function TextareaField({ label, name, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; name: string }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Textarea id={name} name={name} {...props} />
    </div>
  )
}
