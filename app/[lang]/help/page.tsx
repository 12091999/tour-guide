import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { getDictionary, isSupportedLanguage } from "../dictionaries"

const copy = {
  id: { title: "Pusat Bantuan", intro: "Jawaban untuk membantu Anda merencanakan perjalanan di Banyuwangi.", questions: [
    ["Bagaimana cara memesan wisata?", "Pilih destinasi atau paket yang diinginkan, lalu tekan tombol Pesan via WhatsApp. Pesan akan disiapkan untuk tim kami; kirim pesan tersebut untuk melanjutkan pemesanan."],
    ["Apa saja yang termasuk dalam harga?", "Isi paket berbeda untuk setiap destinasi. Periksa rinciannya di halaman destinasi dan konfirmasikan melalui WhatsApp sebelum membayar."],
    ["Bagaimana memastikan jadwal dan ketersediaan?", "Hubungi kami melalui WhatsApp dengan menyebutkan destinasi, tanggal perjalanan, dan jumlah peserta. Tim kami akan membantu mengecek ketersediaan."],
    ["Bagaimana pembayaran dan pembatalan?", "Metode pembayaran, uang muka, dan ketentuan perubahan atau pembatalan dikonfirmasikan langsung saat pemesanan. Sepakati rincian pesanan sebelum membayar."],
    ["Apakah perjalanan cocok untuk keluarga atau pemula?", "Kondisi dan tingkat kesulitan berbeda di setiap destinasi. Beri tahu tim tentang kebutuhan khusus, kondisi kesehatan, dan pengalaman peserta agar rencana dapat disesuaikan."],
    ["Bagaimana memberi masukan atau melaporkan kendala?", "Buka halaman Masukan untuk Perusahaan dari footer dan kirim kategori serta pesan Anda melalui WhatsApp."],
  ], feedback: "Masukan untuk Perusahaan", feedbackText: "Punya saran atau mengalami kendala? Ceritakan kepada kami.", feedbackLink: "Kirim masukan" },
  en: { title: "Help Center", intro: "Answers to help you plan your trip in Banyuwangi.", questions: [
    ["How do I book a tour?", "Choose a destination or package and select the WhatsApp booking button. A message will be prepared for our team; send it to continue your booking."],
    ["What is included in the price?", "Package inclusions vary by destination. Check the details on the destination page and confirm them with us on WhatsApp before paying."],
    ["How can I check schedules and availability?", "Contact us on WhatsApp with your destination, travel date, and group size. Our team will help check availability."],
    ["How do payment and cancellations work?", "Payment methods, deposits, and any change or cancellation terms are confirmed directly during booking. Agree on the order details before making a payment."],
    ["Are trips suitable for families or beginners?", "Conditions and difficulty vary by destination. Tell our team about special needs, health considerations, and participant experience so we can help plan accordingly."],
    ["How do I share feedback or report an issue?", "Open the Company Feedback page from the footer and send your category and message through WhatsApp."],
  ], feedback: "Company Feedback", feedbackText: "Have a suggestion or run into a problem? Let us know.", feedbackLink: "Send feedback" },
} as const

export default async function HelpPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const currentLang = isSupportedLanguage(lang) ? lang : "en"
  const dict = await getDictionary(currentLang)
  const text = copy[currentLang === "id" ? "id" : "en"]
  return <div className="min-h-screen bg-background">
    <Header dict={dict} lang={currentLang} />
    <main>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-teal-800 via-cyan-700 to-orange-500 py-16 text-white">
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-amber-300/25 blur-3xl" />
        <div className="container relative mx-auto px-4 text-center"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em]">Tour Guide Traveller</p><h1 className="mb-4 text-4xl font-bold md:text-5xl">{text.title}</h1><p className="mx-auto max-w-2xl text-lg text-white/90">{text.intro}</p></div>
      </section>
      <section className="container mx-auto max-w-4xl px-4 py-14">
        <div className="space-y-4">{text.questions.map(([question, answer]) => <Card key={question}><details className="group p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" /></summary><CardContent className="px-0 pb-0 pt-4 text-muted-foreground">{answer}</CardContent></details></Card>)}</div>
        <Card className="mt-10 border-primary/20 bg-primary/5"><CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-semibold">{text.feedback}</h2><p className="mt-1 text-muted-foreground">{text.feedbackText}</p></div><Link href={`/${currentLang}/feedback`} className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">{text.feedbackLink}</Link></CardContent></Card>
      </section>
    </main>
    <Footer dict={dict} lang={currentLang} />
  </div>
}
