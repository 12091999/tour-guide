import type { SupportedLanguage } from "@/app/[lang]/dictionaries"

const localeCurrency: Record<SupportedLanguage, { currency: string; locale: string }> = {
  id: { currency: "IDR", locale: "id-ID" },
  en: { currency: "USD", locale: "en-US" },
  "en-au": { currency: "AUD", locale: "en-AU" },
  de: { currency: "EUR", locale: "de-DE" },
  zh: { currency: "CNY", locale: "zh-CN" },
  ja: { currency: "JPY", locale: "ja-JP" },
  ko: { currency: "KRW", locale: "ko-KR" },
  fr: { currency: "EUR", locale: "fr-FR" },
  nl: { currency: "EUR", locale: "nl-NL" },
  ru: { currency: "RUB", locale: "ru-RU" },
  ka: { currency: "GEL", locale: "ka-GE" },
}

type LatestRates = { date: string; rates: Record<string, number> }

async function getUsdRates(): Promise<LatestRates | null> {
  try {
    const response = await fetch(
      "https://api.frankfurter.dev/v1/latest?base=USD&symbols=IDR,AUD,EUR,CNY,JPY,KRW,RUB,GEL",
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
    maximumFractionDigits: ["IDR", "JPY", "KRW"].includes(displayCurrency) ? 0 : 2,
  }).format(converted)

  return { formatted, rateDate: rates?.date }
}
