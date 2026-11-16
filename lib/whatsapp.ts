export function getWhatsAppUrl(message: string, phoneNumber: string) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}
