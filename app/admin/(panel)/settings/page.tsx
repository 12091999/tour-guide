import { getSiteConfig } from "@/lib/actions/config"
import { SettingsForm } from "@/components/admin/settings-form"

export default async function AdminSettingsPage() {
  const config = await getSiteConfig()

  const fields = [
    {
      key: "business_whatsapp",
      label: "WhatsApp Number (digits only, with country code)",
      value: config.business_whatsapp,
      placeholder: "6287775916086",
    },
    {
      key: "business_email",
      label: "Business Email",
      value: config.business_email,
      placeholder: "TourGuide@gmail.com",
    },
  ]

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage business contact information</p>
      </div>

      <div className="max-w-2xl">
        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-base font-semibold mb-5">Contact Info</h2>
          <SettingsForm fields={fields} />
        </section>
      </div>
    </div>
  )
}
