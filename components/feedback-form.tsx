"use client"

import { useState, type FormEvent } from "react"
import { MessageCircle } from "lucide-react"
import { getWhatsAppUrl } from "@/lib/whatsapp"

type Copy = {
  name: string
  email: string
  category: string
  categories: readonly string[]
  message: string
  send: string
  note: string
  required: string
}

export function FeedbackForm({ lang, text, phone }: { lang: string; text: Copy; phone: string }) {
  const [error, setError] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = String(data.get("message") ?? "").trim()
    if (!message) {
      setError(text.required)
      return
    }

    const category = String(data.get("category") ?? "")
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const body = lang === "id"
      ? ["Masukan untuk Tour Guide", `Kategori: ${category}`, `Nama: ${name || "Tidak dicantumkan"}`, `Email: ${email || "Tidak dicantumkan"}`, `Pesan: ${message}`].join("\n")
      : ["Feedback for Tour Guide", `Category: ${category}`, `Name: ${name || "Not provided"}`, `Email: ${email || "Not provided"}`, `Message: ${message}`].join("\n")

    window.open(getWhatsAppUrl(body, phone), "_blank", "noopener,noreferrer")
    event.currentTarget.reset()
    setError("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm md:p-8">
      <div>
        <label htmlFor="feedback-name" className="mb-2 block text-sm font-medium">{text.name}</label>
        <input id="feedback-name" name="name" autoComplete="name" className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label htmlFor="feedback-email" className="mb-2 block text-sm font-medium">{text.email}</label>
        <input id="feedback-email" name="email" type="email" autoComplete="email" className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label htmlFor="feedback-category" className="mb-2 block text-sm font-medium">{text.category}</label>
        <select id="feedback-category" name="category" className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary">
          {text.categories.map((category) => <option key={category}>{category}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="feedback-message" className="mb-2 block text-sm font-medium">{text.message} *</label>
        <textarea id="feedback-message" name="message" required rows={5} className="w-full resize-y rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-700">
        <MessageCircle className="h-5 w-5" />{text.send}
      </button>
      <p className="text-sm text-muted-foreground">{text.note}</p>
    </form>
  )
}
