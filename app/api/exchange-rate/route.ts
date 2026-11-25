export const revalidate = 3600

export async function GET() {
  try {
    const response = await fetch("https://api.frankfurter.dev/v2/rate/usd/idr", {
      next: { revalidate: 3600 },
    })
    if (!response.ok) return Response.json({ error: "Exchange rate unavailable" }, { status: 502 })

    const data = await response.json() as { date?: string; rate?: number }
    if (!data.date || typeof data.rate !== "number" || !Number.isFinite(data.rate) || data.rate <= 0) {
      return Response.json({ error: "Invalid exchange rate response" }, { status: 502 })
    }

    return Response.json({ date: data.date, rate: data.rate })
  } catch {
    return Response.json({ error: "Exchange rate unavailable" }, { status: 502 })
  }
}
