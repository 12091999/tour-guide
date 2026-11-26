import Link from "next/link"

export function Footer({ dict, lang = "en" }: { dict?: any; lang?: string }) {
  const id = lang === "id"
  const labels = {
    destinations: id ? "Destinasi" : "Destinations",
    company: id ? "Perusahaan" : "Company",
    support: id ? "Bantuan" : "Help & Support",
    about: id ? "Tentang Dolan Bareng Kang Pir" : "About Dolan Bareng Kang Pir",
    partners: id ? "Mitra lokal" : "Local partners",
    becomePartner: id ? "Ingin menjadi mitra?" : "Become a partner",
    help: id ? "FAQ / Pusat Bantuan" : "FAQ / Help Center",
    booking: id ? "Cara memesan" : "How to book",
    payment: id ? "Pembayaran & pembatalan" : "Payments & cancellations",
    safety: id ? "Keamanan & darurat" : "Travel safety & emergencies",
    feedback: id ? "Masukan untuk Perusahaan" : "Company Feedback",
    contact: id ? "Kontak: WhatsApp & jam layanan" : "Contact: WhatsApp & hours",
    privacy: id ? "Kebijakan Privasi" : "Privacy Policy",
    terms: id ? "Syarat Layanan" : "Terms of Service",
    cancellation: id ? "Kebijakan Pembatalan" : "Cancellation Policy",
    rights: id ? "Hak cipta dilindungi." : "All rights reserved.",
  }
  const description = dict?.footer?.description ?? (id
    ? "Dolan Bareng Kang Pir membantu wisatawan menjelajahi alam, budaya, dan pengalaman lokal Banyuwangi."
    : "Discover Banyuwangi's blue fire, vintage forest, ocean adventures, coral reefs and southern coast sunsets with local guides.")
  const linkClass = "transition-colors hover:text-foreground"

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:mb-12 lg:gap-x-12 lg:gap-y-12 2xl:grid-cols-[1.3fr_1fr_1fr_1.15fr] 2xl:gap-x-16">
          <div className="space-y-4 lg:pr-6">
            <h3 className="text-xl font-semibold sm:text-2xl">{dict?.footer?.brandName ?? "Dolan Bareng Kang Pir"}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">{labels.destinations}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link className={linkClass} href={`/${lang}/explore/1`}>Ijen Crater</Link></li>
              <li><Link className={linkClass} href={`/${lang}/explore/2`}>Djawatan</Link></li>
              <li><Link className={linkClass} href={`/${lang}/explore/3`}>Bangsring Beach</Link></li>
              <li><Link className={linkClass} href={`/${lang}/explore/5`}>Tabuhan Island</Link></li>
              <li><Link className={linkClass} href={`/${lang}/explore/6`}>Pulau Merah</Link></li>
              <li><Link className={linkClass} href={`/${lang}/explore`}>Teluk Hijau & destinasi eksklusif</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">{labels.company}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link className={linkClass} href={`/${lang}/about`}>{labels.about}</Link></li>
              <li><Link className={linkClass} href={`/${lang}/partners`}>{labels.partners}</Link></li>
              <li><Link className={linkClass} href={`/${lang}/partners#join`}>{labels.becomePartner}</Link></li>
            </ul>
          </div>
          <div className="text-left lg:ml-8 xl:ml-12">
            <h4 className="mb-4 font-semibold">{labels.support}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link className={linkClass} href={`/${lang}/help#faq`}>{labels.help}</Link></li>
              <li><Link className={linkClass} href={`/${lang}/help#booking`}>{labels.booking}</Link></li>
              <li><Link className={linkClass} href={`/${lang}/help#payments`}>{labels.payment}</Link></li>
              <li><Link className={linkClass} href={`/${lang}/help#safety`}>{labels.safety}</Link></li>
              <li><Link className={linkClass} href={`/${lang}/feedback`}>{labels.feedback}</Link></li>
              <li><Link className={linkClass} href={`/${lang}/contact`}>{labels.contact}</Link></li>
              <li><Link className={linkClass} href={`/${lang}/privacy`}>{labels.privacy}</Link></li>
              <li><Link className={linkClass} href={`/${lang}/terms`}>{labels.terms}</Link></li>
              <li><Link className={linkClass} href={`/${lang}/cancellation`}>{labels.cancellation}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-7 text-center text-sm text-muted-foreground">
          <p>© 2026 Dolan Bareng Kang Pir. {labels.rights}</p>
        </div>
      </div>
    </footer>
  )
}
