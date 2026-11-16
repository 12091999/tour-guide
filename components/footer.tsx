import Link from "next/link"

export function Footer({ dict, lang = "en" }: { dict?: any; lang?: string }) {
  const id = lang === "id"
  const labels = {
    destinations: id ? "Destinasi" : "Destinations",
    company: id ? "Perusahaan" : "Company",
    support: id ? "Bantuan" : "Help & Support",
    about: id ? "Tentang Tour Guide Traveler" : "About Tour Guide Traveler",
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
    ? "Tour Guide Traveller membantu wisatawan menjelajahi alam, budaya, dan pengalaman lokal Banyuwangi."
    : "Tour Guide Traveller helps international visitors discover Banyuwangi's nature, culture and local experiences.")
  const linkClass = "transition-colors hover:text-foreground"

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">{dict?.footer?.brandName ?? "Tour Guide Traveller"}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">{labels.destinations}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link className={linkClass} href={`/${lang}/explore/ijen-crater`}>Ijen Crater</Link></li>
              <li><Link className={linkClass} href={`/${lang}/explore/djawatan-forest`}>Djawatan Forest</Link></li>
              <li><Link className={linkClass} href={`/${lang}/explore/teluk-hijau`}>Teluk Hijau</Link></li>
              <li><Link className={linkClass} href={`/${lang}/explore/bangsring-beach`}>Bangsring Beach</Link></li>
              <li><Link className={linkClass} href={`/${lang}/explore/tabuhan-island`}>Tabuhan Island</Link></li>
              <li><Link className={linkClass} href={`/${lang}/explore/pulau-merah`}>Pulau Merah</Link></li>
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
          <div>
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
          <p>© 2026 Tour Guide Traveller. {labels.rights}</p>
        </div>
      </div>
    </footer>
  )
}
