import type { SupportedLanguage } from "@/app/[lang]/dictionaries"

const localeCurrency: Record<SupportedLanguage, { currency: string; locale: string }> = {
  id: { currency: "IDR", locale: "id-ID" },
  en: { currency: "USD", locale: "en-US" },
}

const extraPersonLabel: Record<SupportedLanguage, string> = {
  id: "tambahan per orang",
  en: "per extra person",
}

const onePersonLabel: Record<SupportedLanguage, string> = {
  id: "untuk 1 orang",
  en: "for 1 person",
}

const dayTourLabel: Record<SupportedLanguage, string> = {
  id: "tur 1 hari",
  en: "1-day tour",
}

export function getExtraPersonLabel(language: SupportedLanguage) {
  return extraPersonLabel[language]
}

export function getOnePersonLabel(language: SupportedLanguage) {
  return onePersonLabel[language]
}

export function getDayTourLabel(language: SupportedLanguage) {
  return dayTourLabel[language]
}

type LatestRates = { date: string; rates: Record<string, number> }

async function getUsdRates(): Promise<LatestRates | null> {
  try {
    const response = await fetch(
      "https://api.frankfurter.dev/v1/latest?base=USD&symbols=IDR",
      { next: { revalidate: 3600 } },
    )
    if (!response.ok) return null
    return (await response.json()) as LatestRates
  } catch {
    return null
  }
}

export async function formatPrice(amount: number, sourceCurrency: "USD" | "IDR", language: SupportedLanguage) {
  const target = localeCurrency[language]
  const rates = await getUsdRates()
  let converted = amount
  let displayCurrency = target.currency

  if (target.currency !== sourceCurrency && rates) {
    const targetRate = target.currency === "USD" ? 1 : rates.rates[target.currency]
    const sourceRate = sourceCurrency === "USD" ? 1 : rates.rates[sourceCurrency]
    if (targetRate && sourceRate) converted = amount * targetRate / sourceRate
    else displayCurrency = sourceCurrency
  } else if (target.currency !== sourceCurrency) {
    displayCurrency = sourceCurrency
  }

  const formatted = new Intl.NumberFormat(target.locale, {
    style: "currency",
    currency: displayCurrency,
    maximumFractionDigits: displayCurrency === "IDR" ? 0 : 2,
  }).format(converted)

  return { formatted, rateDate: rates?.date }
}
