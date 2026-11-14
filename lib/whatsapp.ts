const businessWhatsAppNumber = "6287775916086"

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent(message)}`
}
