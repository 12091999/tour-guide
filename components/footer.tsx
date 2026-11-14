import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

export function Footer({ dict, lang = "en" }: { dict?: any; lang?: string }) {
  const labels = dict?.site?.footer ?? {
    destinations: "Destinations", company: "Company", support: "Support", about: "About Us", careers: "Careers", press: "Press", blog: "Blog", partners: "Partners", help: "Help Center", contact: "Contact Us", privacy: "Privacy Policy", terms: "Terms of Service", cancellation: "Cancellation Policy", copyright: "All rights reserved.",
  }
  const description = dict?.footer?.description ?? "Tour Guide Traveller helps international visitors discover Banyuwangi's nature, culture and local experiences."
  return (
    <footer id="contact" className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">{dict?.footer?.brandName ?? "Tour Guide Traveller"}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-semibold mb-4">{labels.destinations}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Ijen
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Djawatan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Teluk Hijau
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Bangsring
                </a>
              </li>
              <li>
                {/* <a href="#" className="hover:text-foreground transition-colors">
                  Oceania
                </a> */}
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{labels.company}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {labels.about}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {labels.careers}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {labels.press}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {labels.blog}
                </a>
              </li>
              <li>
                <Link href={`/${lang}/partners`} className="hover:text-foreground transition-colors">
                  {labels.partners}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">{labels.support}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {labels.help}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {labels.contact}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {labels.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {labels.terms}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {labels.cancellation}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2026 Tour Guide Travel Agency. {labels.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
