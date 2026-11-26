"use client"

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react"
import { CalendarDays, CheckCircle2, Clock3, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

type Slot = { slot_label: string; slots_remaining: number }

export function AvailabilityBooking({
  tourId,
  tourName,
  bookingType = "individual",
  lang = "id",
  children,
}: {
  tourId: string
  tourName: string
  bookingType?: "individual" | "package"
  lang?: string
  children: ReactNode
}) {
  const isId = lang === "id"
  const isPackage = bookingType === "package"
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [slots, setSlots] = useState<Slot[]>([])
  const [partySize, setPartySize] = useState(isPackage ? 4 : 1)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [confirmation, setConfirmation] = useState("")
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const price = isPackage ? 550000 : 300000
  const money = new Intl.NumberFormat(isId ? "id-ID" : "en-US", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date())

  useEffect(() => {
    if (!open || !date || !supabase) return
    let active = true
    setError("")
    setTime("")
    const fetchSlots = async () => {
      const { data, error: rpcError } = await supabase.rpc("get_tour_slots", {
        p_tour_id: tourId,
        p_booking_type: bookingType,
        p_date: date,
      })
      if (!active) return
      if (rpcError) {
        setSlots([])
        setError(isId ? "Jadwal belum tersedia. Silakan hubungi kami untuk konfirmasi." : "Availability is unavailable. Please contact us to confirm.")
        return
      }
      const available = ((data ?? []) as Slot[]).filter((slot) => Number(slot.slots_remaining) > 0)
      setSlots(available)
      if (available.length === 0) setError(isId ? "Slot tanggal ini penuh. Silakan pilih tanggal lain." : "This date is fully booked. Please choose another date.")
    }
    void fetchSlots()
    const interval = window.setInterval(() => void fetchSlots(), 20000)
    const onFocus = () => void fetchSlots()
    window.addEventListener("focus", onFocus)
    return () => {
      active = false
      window.clearInterval(interval)
      window.removeEventListener("focus", onFocus)
    }
  }, [open, date, supabase, tourId, bookingType, isId])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    if (!supabase) {
      setError(isId ? "Layanan pemesanan belum dikonfigurasi." : "Booking service is not configured.")
      return
    }
    setLoading(true)
    const { data, error: rpcError } = await supabase.rpc("create_tour_reservation", {
      p_tour_id: tourId,
      p_tour_name: tourName,
      p_booking_type: bookingType,
      p_date: date,
      p_time_slot: time,
      p_party_size: partySize,
      p_customer_name: name.trim(),
      p_phone: phone.trim(),
      p_email: email.trim() || null,
    })
    setLoading(false)
    if (rpcError) {
      setError(rpcError.message.includes("SLOT_FULL")
        ? (isId ? "Maaf, slot ini baru saja penuh. Pilih waktu lain." : "Sorry, this slot just filled. Choose another time.")
        : (isId ? "Reservasi gagal disimpan. Silakan coba lagi." : "Could not save the reservation. Please try again."))
      const { data: refreshed } = await supabase.rpc("get_tour_slots", { p_tour_id: tourId, p_booking_type: bookingType, p_date: date })
      setSlots(((refreshed ?? []) as Slot[]).filter((slot) => Number(slot.slots_remaining) > 0))
      setTime("")
      return
    }
    const record = Array.isArray(data) ? data[0] : data
    setConfirmation(String(record?.reservation_code ?? ""))
    const { data: refreshed } = await supabase.rpc("get_tour_slots", { p_tour_id: tourId, p_booking_type: bookingType, p_date: date })
    setSlots(((refreshed ?? []) as Slot[]).filter((slot) => Number(slot.slots_remaining) > 0))
  }

  return (
    <Dialog open={open} onOpenChange={(value) => { setOpen(value); if (!value) { setConfirmation(""); setError("") } }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{confirmation ? (isId ? "Reservasi tercatat" : "Reservation received") : (isId ? "Pilih tanggal & waktu" : "Choose date & time")}</DialogTitle>
          <DialogDescription>{tourName} · {isPackage ? (isId ? "Paket wisata" : "Tour package") : (isId ? "Wisata perorangan" : "Individual tour")}</DialogDescription>
        </DialogHeader>

        {confirmation ? (
          <div className="space-y-3 rounded-xl bg-emerald-50 p-5 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            <p className="font-semibold">{isId ? "Slot telah diamankan." : "Your slot is reserved."}</p>
            <p className="text-sm">{isId ? "Kode reservasi" : "Reservation code"}: <strong>{confirmation}</strong></p>
            <p className="text-sm">{date} · {time} · {partySize} {isId ? "orang" : "guests"} · {money.format(price * partySize)}</p>
            <p className="text-xs opacity-80">{isId ? "Simpan kode ini dan hubungi pemandu untuk konfirmasi pembayaran." : "Keep this code and contact your guide to confirm payment."}</p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={submit}>
            <div className="space-y-2">
              <Label htmlFor={`booking-date-${tourId}`}><CalendarDays className="h-4 w-4" />{isId ? "Tanggal perjalanan" : "Tour date"}</Label>
              <Input id={`booking-date-${tourId}`} type="date" min={today} required value={date} onChange={(event) => setDate(event.target.value)} />
            </div>

            {date && <div className="space-y-2">
              <Label><Clock3 className="h-4 w-4" />{isId ? "Waktu mulai · slot tersisa" : "Start time · slots left"}</Label>
              {slots.length ? <div className="grid grid-cols-2 gap-2">{slots.map((slot) => <button key={slot.slot_label} type="button" onClick={() => setTime(slot.slot_label)} className={`rounded-lg border p-3 text-left text-sm transition-colors ${time === slot.slot_label ? "border-primary bg-primary/10" : "hover:border-primary/50"}`}><span className="block font-semibold">{slot.slot_label}</span><span className="text-xs text-muted-foreground">{slot.slots_remaining} {isId ? "tersisa" : "remaining"}</span></button>)}</div> : <p className="text-sm text-muted-foreground">{error || (isId ? "Memuat jadwal…" : "Loading availability…")}</p>}
            </div>}

            <div className="space-y-2">
              <Label htmlFor={`booking-party-${tourId}`}><Users className="h-4 w-4" />{isId ? "Jumlah peserta" : "Guests"}</Label>
              <Input id={`booking-party-${tourId}`} type="number" min={isPackage ? 4 : 1} max="12" required value={partySize} onChange={(event) => setPartySize(Number(event.target.value))} />
              <p className="text-xs text-muted-foreground">{isPackage ? (isId ? "Paket minimal 4 orang · IDR 550.000/orang" : "Package minimum 4 guests · IDR 550,000/person") : (isId ? "IDR 300.000/orang" : "IDR 300,000/person")} · {isId ? "Total" : "Total"}: {money.format(price * partySize)}</p>
            </div>

            <div className="space-y-2"><Label htmlFor={`booking-name-${tourId}`}>{isId ? "Nama lengkap" : "Full name"}</Label><Input id={`booking-name-${tourId}`} autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor={`booking-phone-${tourId}`}>{isId ? "Nomor WhatsApp" : "WhatsApp number"}</Label><Input id={`booking-phone-${tourId}`} type="tel" autoComplete="tel" required value={phone} onChange={(event) => setPhone(event.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor={`booking-email-${tourId}`}>Email ({isId ? "opsional" : "optional"})</Label><Input id={`booking-email-${tourId}`} type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading || !date || !time || !slots.some((slot) => slot.slot_label === time && slot.slots_remaining >= partySize)}>{loading ? (isId ? "Menyimpan…" : "Saving…") : (isId ? "Amankan slot" : "Reserve this slot")}</Button>
            <p className="text-xs text-muted-foreground">{isId ? "Slot diperbarui secara langsung. Pemesanan berhasil langsung mengurangi kapasitas tanggal dan waktu tersebut." : "Live availability. A successful booking immediately reduces capacity for that date and time."}</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
