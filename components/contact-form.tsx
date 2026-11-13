"use client"

import type { FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type ContactFormDictionary = {
  contact: {
    form: {
      name: string
      email: string
      subject: string
      message: string
      send: string
    }
  }
}

export function ContactForm({ dict }: { dict: ContactFormDictionary }) {
  const form = dict.contact.form

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const values = new FormData(event.currentTarget)
    const name = String(values.get("name") ?? "")
    const email = String(values.get("email") ?? "")
    const subject = String(values.get("subject") ?? "")
    const message = String(values.get("message") ?? "")
    const body = `${message}\n\nFrom: ${name}\nEmail: ${email}`
    const mailto = `mailto:info@georgiatours.ge?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="contact-name" className="text-sm font-medium">{form.name}</label>
        <Input id="contact-name" name="name" autoComplete="name" required />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-email" className="text-sm font-medium">{form.email}</label>
        <Input id="contact-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-subject" className="text-sm font-medium">{form.subject}</label>
        <Input id="contact-subject" name="subject" required />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-sm font-medium">{form.message}</label>
        <Textarea id="contact-message" name="message" rows={5} required />
      </div>
      <Button type="submit">{form.send}</Button>
    </form>
  )
}
