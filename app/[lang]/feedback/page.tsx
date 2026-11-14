import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeedbackForm } from "@/components/feedback-form"
import { getDictionary, isSupportedLanguage } from "../dictionaries"

const copy = {
  id: { title: "Masukan untuk Perusahaan", intro: "Bantu kami meningkatkan pengalaman wisata di Banyuwangi. Masukan Anda akan diteruskan ke tim Tour Guide melalui WhatsApp.", name: "Nama (opsional)", email: "Email (opsional)", category: "Kategori masukan", categories: ["Saran", "Kendala pemesanan", "Informasi destinasi", "Pengalaman perjalanan", "Lainnya"], message: "Pesan", send: "Kirim masukan via WhatsApp", note: "WhatsApp akan terbuka dengan pesan yang sudah disiapkan. Tinjau lalu tekan Kirim di WhatsApp.", required: "Silakan tulis pesan Anda." },
  en: { title: "Company Feedback", intro: "Help us improve travel experiences in Banyuwangi. Your feedback will be sent to the Tour Guide team through WhatsApp.", name: "Name (optional)", email: "Email (optional)", category: "Feedback category", categories: ["Suggestion", "Booking issue", "Destination information", "Trip experience", "Other"], message: "Message", send: "Send feedback via WhatsApp", note: "WhatsApp will open with your message prepared. Review it and press Send in WhatsApp.", required: "Please enter your message." },
} as const

export default async function FeedbackPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const currentLang = isSupportedLanguage(lang) ? lang : "en"
  const dict = await getDictionary(currentLang)
  const text = copy[currentLang === "id" ? "id" : "en"]
  return <div className="min-h-screen bg-background">
    <Header dict={dict} lang={currentLang} />
    <main>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-teal-800 via-cyan-700 to-orange-500 py-16 text-white"><div className="absolute -left-24 -top-32 h-96 w-96 rounded-full bg-amber-300/25 blur-3xl" /><div className="container relative mx-auto px-4 text-center"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em]">Tour Guide Traveller</p><h1 className="mb-4 text-4xl font-bold md:text-5xl">{text.title}</h1><p className="mx-auto max-w-2xl text-lg text-white/90">{text.intro}</p></div></section>
      <section className="container mx-auto max-w-3xl px-4 py-14"><FeedbackForm lang={currentLang} text={text} /></section>
    </main>
    <Footer dict={dict} lang={currentLang} />
  </div>
}
