"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateSiteConfig } from "@/lib/actions/config"

type Field = { key: string; label: string; value: string; placeholder: string }

export function SettingsForm({ fields }: { fields: Field[] }) {
  const [saving, setSaving] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})

  async function handleSave(key: string, value: string) {
    setSaving(key)
    setErrors((e) => ({ ...e, [key]: "" }))
    const result = await updateSiteConfig(key, value)
    if (result.error) {
      setErrors((e) => ({ ...e, [key]: result.error! }))
    } else {
      setSaved((s) => ({ ...s, [key]: true }))
      setTimeout(() => setSaved((s) => ({ ...s, [key]: false })), 2000)
    }
    setSaving(null)
  }

  return (
    <div className="space-y-6 max-w-lg">
      {fields.map((field) => (
        <form
          key={field.key}
          onSubmit={(e) => {
            e.preventDefault()
            const value = (e.currentTarget.elements.namedItem("value") as HTMLInputElement).value
            handleSave(field.key, value)
          }}
          className="space-y-2"
        >
          <Label htmlFor={field.key}>{field.label}</Label>
          <div className="flex gap-2">
            <Input
              id={field.key}
              name="value"
              defaultValue={field.value}
              placeholder={field.placeholder}
              className="flex-1"
            />
            <Button type="submit" disabled={saving === field.key} variant="outline">
              {saving === field.key ? "Saving…" : saved[field.key] ? "Saved ✓" : "Save"}
            </Button>
          </div>
          {errors[field.key] && <p className="text-sm text-destructive">{errors[field.key]}</p>}
        </form>
      ))}
    </div>
  )
}
