import { Card, CardContent } from "@/components/ui/card"

type PolicySection = { title: string; paragraphs: string[] }

const policies: Record<string, Record<string, { title: string; intro: string; sections: PolicySection[] }>> = {
  privacy: {
    en: {
      title: "Privacy Policy",
      intro: "This page explains how Tour Guide Traveller handles information when you browse this site or contact us about a Banyuwangi trip. Last updated: 16 November 2026.",
      sections: [
        { title: "Information you choose to share", paragraphs: ["If you contact us by email, your email application receives the name, email address, subject and message you enter. If you contact us through WhatsApp, Meta receives your message and the account details associated with your WhatsApp account. The site does not take payments or ask you to submit payment card details.", "Please share only information needed to answer your question. Do not send passport, payment-card or sensitive health information through this site or WhatsApp unless our team explains why it is needed and how it will be handled."] },
        { title: "Website analytics and service providers", paragraphs: ["This site uses Vercel Web Analytics to understand aggregated site usage and improve the experience. The site is hosted by Vercel. When you follow an email or WhatsApp link, the selected third-party service processes your information under its own terms and privacy policy."] },
        { title: "Use, storage and your choices", paragraphs: ["Information you send is used to reply to your inquiry, discuss availability and prepare a trip. Email and WhatsApp conversations are stored by the respective service and may remain in the Tour Guide Traveller business accounts for as long as needed to handle the inquiry or booking and related records. Contact us at TourGuide@gmail.com to request access, correction or deletion where applicable.", "We do not sell contact details. We may disclose information where required by law or when necessary to provide a trip you request, such as sharing relevant booking details with a local service provider after telling you."] },
        { title: "Contact", paragraphs: ["Tour Guide Traveller serves visitors planning trips in Banyuwangi, East Java, Indonesia. For privacy questions, email TourGuide@gmail.com or message us through the WhatsApp link on our Contact page."] },
      ],
    },
    id: {
      title: "Kebijakan Privasi",
      intro: "Halaman ini menjelaskan cara Tour Guide Traveller menangani informasi saat Anda membuka situs atau menghubungi kami tentang perjalanan di Banyuwangi. Terakhir diperbarui: 16 November 2026.",
      sections: [
        { title: "Informasi yang Anda berikan", paragraphs: ["Jika menghubungi kami melalui email, aplikasi email Anda akan menerima nama, alamat email, subjek, dan pesan yang Anda isi. Jika menghubungi kami melalui WhatsApp, Meta memproses pesan dan informasi akun WhatsApp Anda. Situs ini tidak menerima pembayaran dan tidak meminta data kartu pembayaran.", "Berikan hanya informasi yang diperlukan untuk menjawab pertanyaan Anda. Jangan mengirim paspor, data kartu pembayaran, atau informasi kesehatan sensitif melalui situs atau WhatsApp kecuali tim kami menjelaskan alasan dan cara penanganannya."] },
        { title: "Analitik dan penyedia layanan", paragraphs: ["Situs ini menggunakan Vercel Web Analytics untuk memahami penggunaan situs secara agregat dan memperbaiki pengalaman pengunjung. Situs di-host oleh Vercel. Saat Anda membuka tautan email atau WhatsApp, layanan pihak ketiga tersebut memproses informasi berdasarkan ketentuan dan kebijakan privasinya sendiri."] },
        { title: "Penggunaan, penyimpanan, dan pilihan Anda", paragraphs: ["Informasi yang Anda kirim digunakan untuk menjawab pertanyaan, membahas ketersediaan, dan menyiapkan perjalanan. Percakapan email dan WhatsApp disimpan oleh layanan masing-masing dan dapat tersimpan di akun bisnis Tour Guide Traveller selama diperlukan untuk menangani pertanyaan atau pemesanan beserta catatan terkait. Hubungi TourGuide@gmail.com untuk meminta akses, koreksi, atau penghapusan sesuai ketentuan yang berlaku.", "Kami tidak menjual data kontak. Informasi dapat dibagikan jika diwajibkan hukum atau diperlukan untuk menyediakan perjalanan yang Anda minta, misalnya detail pemesanan yang relevan kepada penyedia layanan lokal setelah Anda diberi tahu."] },
        { title: "Kontak", paragraphs: ["Tour Guide Traveller melayani wisatawan yang merencanakan perjalanan di Banyuwangi, Jawa Timur, Indonesia. Untuk pertanyaan privasi, kirim email ke TourGuide@gmail.com atau hubungi kami melalui WhatsApp pada halaman Kontak."] },
      ],
    },
  },
  terms: {
    en: {
      title: "Terms of Service",
      intro: "These terms cover use of the Tour Guide Traveller website and inquiries about local trips in Banyuwangi. Last updated: 16 November 2026.",
      sections: [
        { title: "Website information", paragraphs: ["Destination descriptions, suggested itineraries, estimated times and starting prices are provided for planning. Conditions, opening hours, access, weather, sea conditions and local rules can change. Confirm current details with our team and the relevant destination operator before travelling.", "Prices shown are indicative starting prices in Indonesian rupiah and may depend on group size, pickup location, availability and inclusions. A price, schedule or itinerary is not confirmed until our team provides the details in writing and you accept them."] },
        { title: "Inquiries and bookings", paragraphs: ["The website does not take payment and submitting an inquiry does not create a booking. To request a trip, contact us using the WhatsApp or email links. A booking is confirmed only after Tour Guide Traveller confirms the agreed itinerary, price, inclusions, payment method and any applicable cancellation terms in writing.", "Some activities, transport, accommodation, meals and entry tickets may be supplied by independent local operators. Their availability and operating rules apply to those services; ask us to identify inclusions and providers before you pay."] },
        { title: "Travel responsibility", paragraphs: ["You are responsible for providing accurate booking information, following guide and site instructions, and checking that an activity suits your abilities and needs. Tell us about relevant accessibility or health requirements before a booking is confirmed. Activities may be changed or stopped when conditions or local authorities require it."] },
        { title: "Contact", paragraphs: ["Questions about these terms or a trip: TourGuide@gmail.com or the WhatsApp link on our Contact page. These website terms do not replace the written terms confirmed for an individual booking."] },
      ],
    },
    id: {
      title: "Syarat Layanan",
      intro: "Syarat ini berlaku untuk penggunaan situs Tour Guide Traveller dan pertanyaan mengenai perjalanan lokal di Banyuwangi. Terakhir diperbarui: 16 November 2026.",
      sections: [
        { title: "Informasi di situs", paragraphs: ["Deskripsi destinasi, saran rencana perjalanan, perkiraan waktu, dan harga mulai ditampilkan untuk membantu perencanaan. Kondisi, jam buka, akses, cuaca, kondisi laut, dan aturan setempat dapat berubah. Konfirmasikan informasi terkini kepada tim kami dan pengelola destinasi sebelum berangkat.", "Harga yang ditampilkan merupakan perkiraan harga awal dalam rupiah dan dapat bergantung pada jumlah peserta, lokasi penjemputan, ketersediaan, dan fasilitas yang termasuk. Harga, jadwal, atau rencana perjalanan baru pasti setelah tim kami mengirimkan rinciannya secara tertulis dan Anda menyetujuinya."] },
        { title: "Pertanyaan dan pemesanan", paragraphs: ["Situs ini tidak menerima pembayaran dan pengiriman pertanyaan belum berarti pemesanan. Untuk meminta perjalanan, hubungi kami melalui tautan WhatsApp atau email. Pemesanan dikonfirmasi setelah Tour Guide Traveller menyetujui secara tertulis rencana perjalanan, harga, fasilitas, metode pembayaran, dan ketentuan pembatalan yang berlaku.", "Sebagian aktivitas, transportasi, akomodasi, makanan, dan tiket masuk dapat disediakan oleh operator lokal independen. Ketersediaan dan aturan operasional mereka berlaku untuk layanan tersebut; tanyakan fasilitas dan penyedia yang termasuk sebelum membayar."] },
        { title: "Tanggung jawab perjalanan", paragraphs: ["Anda bertanggung jawab memberikan informasi pemesanan yang benar, mengikuti arahan pemandu dan pengelola lokasi, serta memastikan aktivitas sesuai kemampuan dan kebutuhan Anda. Beri tahu kami kebutuhan aksesibilitas atau kesehatan yang relevan sebelum pemesanan dikonfirmasi. Aktivitas dapat diubah atau dihentikan jika kondisi atau otoritas setempat mengharuskannya."] },
        { title: "Kontak", paragraphs: ["Pertanyaan tentang syarat ini atau perjalanan: TourGuide@gmail.com atau tautan WhatsApp di halaman Kontak. Syarat situs ini tidak menggantikan ketentuan tertulis yang dikonfirmasi untuk pemesanan tertentu."] },
      ],
    },
  },
  cancellation: {
    en: {
      title: "Cancellation Policy",
      intro: "Cancellation, changes and refunds are confirmed for each trip before payment. Last updated: 16 November 2026.",
      sections: [
        { title: "Before you pay", paragraphs: ["There is no fixed cancellation window or fee published on this site. Before you pay, ask us to confirm in writing the deadline and method for changes or cancellation, any deposit or cancellation charge, the refund timing and method, and the plan if weather, access restrictions or an operator cancellation affects the trip.", "Please do not pay until you have received and accepted the trip details and its cancellation terms. The website itself does not collect payments."] },
        { title: "Requesting a change or cancellation", paragraphs: ["Contact us as soon as possible through the WhatsApp or email link used for your booking. Include the lead traveller's name, trip date and booking details. We will confirm the available options and any charges that were agreed for that booking."] },
        { title: "Weather, safety and local operator changes", paragraphs: ["Some destinations and activities depend on weather, sea conditions, access rules and local operators. If a trip cannot proceed safely or an operator changes the service, we will discuss the options and any refund or rescheduling under the terms confirmed for your booking. Do not assume an automatic refund or fee; have the applicable arrangement confirmed in writing before payment."] },
        { title: "Contact", paragraphs: ["For a change or cancellation, contact Tour Guide Traveller through the WhatsApp or email link on our Contact page."] },
      ],
    },
    id: {
      title: "Kebijakan Pembatalan",
      intro: "Pembatalan, perubahan, dan pengembalian dana dikonfirmasi untuk setiap perjalanan sebelum pembayaran. Terakhir diperbarui: 16 November 2026.",
      sections: [
        { title: "Sebelum membayar", paragraphs: ["Situs ini belum menetapkan batas waktu atau biaya pembatalan yang berlaku untuk semua perjalanan. Sebelum membayar, minta konfirmasi tertulis mengenai batas waktu dan cara mengubah atau membatalkan, uang muka atau biaya pembatalan jika ada, waktu dan cara pengembalian dana, serta solusi jika cuaca, pembatasan akses, atau pembatalan operator memengaruhi perjalanan.", "Jangan membayar sebelum menerima dan menyetujui rincian perjalanan serta ketentuan pembatalannya. Situs ini tidak menerima pembayaran."] },
        { title: "Meminta perubahan atau pembatalan", paragraphs: ["Hubungi kami sesegera mungkin melalui tautan WhatsApp atau email yang digunakan saat pemesanan. Sertakan nama pemesan utama, tanggal perjalanan, dan detail pemesanan. Kami akan mengonfirmasi pilihan yang tersedia dan biaya yang telah disepakati untuk pemesanan tersebut."] },
        { title: "Cuaca, keselamatan, dan perubahan operator lokal", paragraphs: ["Beberapa destinasi dan aktivitas bergantung pada cuaca, kondisi laut, aturan akses, dan operator lokal. Jika perjalanan tidak dapat berlangsung dengan aman atau operator mengubah layanan, kami akan membahas pilihan yang tersedia dan pengembalian dana atau penjadwalan ulang sesuai ketentuan pemesanan Anda. Jangan mengasumsikan pengembalian dana atau biaya tertentu secara otomatis; minta kesepakatan yang berlaku dikonfirmasi secara tertulis sebelum membayar."] },
        { title: "Kontak", paragraphs: ["Untuk perubahan atau pembatalan, hubungi Tour Guide Traveller melalui tautan WhatsApp atau email pada halaman Kontak."] },
      ],
    },
  },
}

export function PolicyPage({ kind, lang, email }: { kind: keyof typeof policies; lang: string; email: string }) {
  const content = policies[kind][lang === "id" ? "id" : "en"]

  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{content.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{content.intro}</p>
      </header>
      <div className="space-y-5">
        {content.sections.map((section) => (
          <Card key={section.title}>
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph.replaceAll("TourGuide@gmail.com", email)}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
