import type { Metadata } from "next"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { getDictionary, isSupportedLanguage } from "../dictionaries"
import { buildMeta } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const currentLang = isSupportedLanguage(lang) ? lang : "en"
  const isId = currentLang === "id"
  return buildMeta({
    lang: currentLang,
    path: "/help",
    title: isId ? "Bantuan & FAQ" : "Help & FAQ",
    description: isId
      ? "Temukan jawaban atas pertanyaan umum seputar pemesanan, pembayaran, dan perjalanan wisata Banyuwangi."
      : "Find answers to common questions about booking, payment, and travelling in Banyuwangi.",
  })
}

const copy = {
  id: {
    title: "Pusat Bantuan", intro: "Jawaban untuk membantu Anda merencanakan perjalanan di Banyuwangi.",
    questions: [
      { id: "booking", question: "Bagaimana cara memesan wisata?", answer: "Pilih destinasi atau paket, lalu tekan tombol Pesan via WhatsApp. Pesan akan disiapkan untuk tim kami; kirim pesan tersebut untuk melanjutkan pemesanan." },
      { id: "pricing", question: "Apa saja yang termasuk dalam harga?", answer: "Isi paket berbeda untuk setiap destinasi. Periksa rincian pada halaman destinasi dan konfirmasikan melalui WhatsApp sebelum membayar." },
      { id: "schedule", question: "Bagaimana memastikan jadwal dan ketersediaan?", answer: "Hubungi kami melalui WhatsApp dengan menyebutkan destinasi, tanggal perjalanan, dan jumlah peserta. Tim kami akan membantu mengecek ketersediaan." },
      { id: "payments", question: "Bagaimana pembayaran dan pembatalan?", answer: "Metode pembayaran, uang muka, dan ketentuan perubahan atau pembatalan dikonfirmasikan langsung saat pemesanan. Sepakati rincian pesanan sebelum membayar." },
      { id: "safety", question: "Keamanan perjalanan dan bantuan darurat", answer: "Periksa kondisi cuaca dan arahan petugas setempat, ikuti instruksi pemandu, serta beri tahu tim tentang kebutuhan kesehatan atau aksesibilitas sebelum berangkat. Untuk keadaan darurat di Banyuwangi, hubungi Call Center 112. Untuk bantuan pemesanan dan perjalanan, hubungi tim Tour Guide melalui WhatsApp." },
      { id: "feedback", question: "Bagaimana memberi masukan atau melaporkan kendala?", answer: "Gunakan formulir Masukan untuk Perusahaan. Pesan akan disiapkan di WhatsApp agar dapat ditinjau sebelum dikirim." },
    ],
    emergency: "Hubungi layanan darurat Banyuwangi 112", feedback: "Masukan untuk Perusahaan", feedbackText: "Punya saran atau mengalami kendala? Ceritakan kepada kami.", feedbackLink: "Kirim masukan",
  },
  en: {
    title: "Help Center", intro: "Answers to help you plan your trip in Banyuwangi.",
    questions: [
      { id: "booking", question: "How do I book a tour?", answer: "Choose a destination or package and select the WhatsApp booking button. A message will be prepared for our team; send it to continue your booking." },
      { id: "pricing", question: "What is included in the price?", answer: "Package inclusions vary by destination. Check the details on the destination page and confirm them with us on WhatsApp before paying." },
      { id: "schedule", question: "How can I check schedules and availability?", answer: "Contact us on WhatsApp with your destination, travel date, and group size. Our team will help check availability." },
      { id: "payments", question: "How do payment and cancellations work?", answer: "Payment methods, deposits, and any change or cancellation terms are confirmed directly during booking. Agree on the order details before making a payment." },
      { id: "safety", question: "Travel safety and emergency help", answer: "Check weather and local advisories, follow your guide's instructions, and tell our team about health or accessibility needs before departure. In an emergency in Banyuwangi, call the local emergency line at 112. For booking or trip support, contact the Tour Guide team on WhatsApp." },
      { id: "feedback", question: "How do I share feedback or report an issue?", answer: "Use the Company Feedback form. Your message will be prepared in WhatsApp for you to review before sending." },
    ],
    emergency: "Call Banyuwangi emergency services at 112", feedback: "Company Feedback", feedbackText: "Have a suggestion or run into a problem? Let us know.", feedbackLink: "Send feedback",
  },
} as const

export default async function HelpPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const currentLang = isSupportedLanguage(lang) ? lang : "en"
  const dict = await getDictionary(currentLang)
  const text = copy[currentLang === "id" ? "id" : "en"]
  return <div className="min-h-screen bg-background">
    <Header dict={dict} lang={currentLang} />
    <main>
      <section className="relative isolate overflow-hidden bg-linear-to-br from-teal-800 via-cyan-700 to-orange-500 py-16 text-white"><div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-amber-300/25 blur-3xl" /><div className="container relative mx-auto px-4 text-center"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em]">Tour Guide Traveller</p><h1 className="mb-4 text-4xl font-bold md:text-5xl">{text.title}</h1><p className="mx-auto max-w-2xl text-lg text-white/90">{text.intro}</p></div></section>
      <section id="faq" className="container mx-auto max-w-4xl scroll-mt-24 px-4 py-14">
        <div className="space-y-4">{text.questions.map((item) => <Card key={item.id} id={item.id} className="scroll-mt-24"><details className="group p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">{item.question}<ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" /></summary><CardContent className="px-0 pb-0 pt-4 text-muted-foreground">{item.answer}{item.id === "safety" && <p className="mt-3"><Link href="tel:112" className="font-semibold text-primary underline">{text.emergency}</Link></p>}</CardContent></details></Card>)}</div>
        <Card className="mt-10 border-primary/20 bg-primary/5"><CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-semibold">{text.feedback}</h2><p className="mt-1 text-muted-foreground">{text.feedbackText}</p></div><Link href={`/${currentLang}/feedback`} className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">{text.feedbackLink}</Link></CardContent></Card>
      </section>
    </main>
    <Footer dict={dict} lang={currentLang} />
  </div>
}
