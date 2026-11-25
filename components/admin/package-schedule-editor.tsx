"use client"

import { useEffect, useState, type FormEvent } from "react"
import { ArrowLeft, LogOut, Plus, RotateCcw, Save, Trash2 } from "lucide-react"
import Link from "next/link"
import type { SupabaseClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import type { PackageScheduleActivity, PackageScheduleDay, PackageScheduleRecord } from "@/lib/package-schedules"

type PageState = "starting" | "unavailable" | "signed-out" | "checking" | "ready" | "denied" | "error"

function cloneRecord(record: PackageScheduleRecord): PackageScheduleRecord {
  return JSON.parse(JSON.stringify(record)) as PackageScheduleRecord
}

function formatIdrInput(value: number | null) {
  return value === null ? "" : new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(value)
}

function parseIdrInput(value: string) {
  const digits = value.replace(/\D/g, "")
  if (!digits) return null
  const parsed = Number(digits)
  return Number.isSafeInteger(parsed) ? parsed : null
}

function getIdrCaretPosition(formatted: string, digitsBeforeCaret: number) {
  if (digitsBeforeCaret === 0) return 0
  let digitsSeen = 0
  for (let index = 0; index < formatted.length; index += 1) {
    if (/\d/.test(formatted[index])) digitsSeen += 1
    if (digitsSeen === digitsBeforeCaret) return index + 1
  }
  return formatted.length
}

export function PackageScheduleEditor() {
  const [client, setClient] = useState<SupabaseClient | null>(null)
  const [pageState, setPageState] = useState<PageState>("starting")
  const [records, setRecords] = useState<PackageScheduleRecord[]>([])
  const [drafts, setDrafts] = useState<Record<string, PackageScheduleRecord>>({})
  const [idrInputs, setIdrInputs] = useState<Record<string, string>>({})
  const [usdToIdrRate, setUsdToIdrRate] = useState<number | null>(null)
  const [rateDate, setRateDate] = useState<string | null>(null)
  const [rateUnavailable, setRateUnavailable] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [busy, setBusy] = useState(false)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    let active = true
    fetch("/api/exchange-rate", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Kurs tidak tersedia")
        return response.json() as Promise<{ rate: number; date: string }>
      })
      .then(({ rate, date }) => {
        if (!active || !Number.isFinite(rate) || rate <= 0) return
        setUsdToIdrRate(rate)
        setRateDate(date)
      })
      .catch(() => { if (active) setRateUnavailable(true) })
    return () => { active = false }
  }, [])

  useEffect(() => {
    let active = true
    const supabase = createSupabaseBrowserClient()
    if (!supabase) {
      setPageState("unavailable")
      return () => { active = false }
    }

    setClient(supabase)

    const loadAdmin = async () => {
      if (!active) return
      setPageState("checking")
      setMessage("")
      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (!active) return
      if (userError || !userData.user) {
        setPageState("signed-out")
        return
      }

      const { data: admin, error: adminError } = await supabase
        .from("schedule_admins")
        .select("user_id")
        .eq("user_id", userData.user.id)
        .maybeSingle()
      if (!active) return
      if (adminError) {
        setMessage(`Tidak dapat memeriksa akses admin. Pastikan SQL Supabase sudah diterapkan. ${adminError.message}`)
        setPageState("error")
        return
      }
      if (!admin) {
        setMessage("Akun ini belum terdaftar sebagai admin jadwal.")
        setPageState("denied")
        return
      }

      const { data, error } = await supabase
        .from("tour_packages")
        .select("id, position, title, price_idr, price_usd, days, includes")
        .order("position", { ascending: true })
      if (!active) return
      if (error) {
        setMessage(`Tidak dapat memuat paket. ${error.message}`)
        setPageState("error")
        return
      }
      if (!data?.length) {
        setMessage("Data paket belum tersedia. Jalankan file SQL setup untuk membuat tabel dan data awal.")
        setPageState("error")
        return
      }

      const loaded = data.map((record) => ({
        id: record.id,
        position: record.position,
        title: record.title,
        price_idr: record.price_idr === null ? null : Number(record.price_idr),
        price_usd: record.price_usd === null ? null : Number(record.price_usd),
        days: Array.isArray(record.days) ? record.days as PackageScheduleDay[] : [],
        includes: Array.isArray(record.includes) ? record.includes as string[] : [],
      }))
      setRecords(loaded)
      setDrafts(Object.fromEntries(loaded.map((record) => [record.id, cloneRecord(record)])))
      setPageState("ready")
    }

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return
      if (error) {
        setMessage(`Tidak dapat memeriksa sesi admin. ${error.message}`)
        setPageState("error")
      } else if (data.session) {
        void loadAdmin()
      } else {
        setPageState("signed-out")
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setRecords([])
        setDrafts({})
        setPageState("signed-out")
        return
      }
      void Promise.resolve().then(loadAdmin)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!client) return
    setBusy(true)
    setMessage("")
    const { error } = await client.auth.signInWithPassword({ email: email.trim(), password })
    setBusy(false)
    if (error) setMessage(`Gagal masuk. ${error.message}`)
  }

  async function handleLogout() {
    if (!client) return
    setBusy(true)
    const { error } = await client.auth.signOut()
    setBusy(false)
    if (error) setMessage(`Gagal keluar. ${error.message}`)
  }

  function updateDraft(id: string, updater: (record: PackageScheduleRecord) => PackageScheduleRecord) {
    setDrafts((current) => {
      const record = current[id]
      return record ? { ...current, [id]: updater(record) } : current
    })
  }

  function updateActivity(id: string, dayIndex: number, activityIndex: number, key: keyof PackageScheduleActivity, value: string) {
    updateDraft(id, (record) => ({
      ...record,
      days: record.days.map((day, index) => index !== dayIndex ? day : {
        ...day,
        activities: day.activities.map((activity, rowIndex) => rowIndex !== activityIndex ? activity : { ...activity, [key]: value }),
      }),
    }))
  }

  function validate(record: PackageScheduleRecord): string | null {
    if (!record.title.trim()) return "Nama paket wajib diisi."
    if (record.price_idr !== null && (!Number.isFinite(record.price_idr) || record.price_idr < 0)) return "Harga IDR harus berupa angka nol atau lebih."
    if (record.price_usd !== null && (!Number.isFinite(record.price_usd) || record.price_usd < 0)) return "Harga USD harus berupa angka nol atau lebih."
    if (!record.days.length) return "Paket harus memiliki minimal satu hari perjalanan."
    for (const [dayIndex, day] of record.days.entries()) {
      if (!day.activities.length) return `Hari ${dayIndex + 1} harus memiliki minimal satu kegiatan.`
      if (day.activities.some((activity) => !activity.time.trim() || !activity.activity.trim())) {
        return `Lengkapi waktu dan kegiatan pada Hari ${dayIndex + 1}.`
      }
    }
    if (record.includes.some((item) => !item.trim())) return "Isi fasilitas yang kosong atau hapus barisnya."
    return null
  }

  async function saveRecord(id: string) {
    if (!client) return
    const draft = drafts[id]
    if (!draft) return
    const validationError = validate(draft)
    if (validationError) {
      setMessage(validationError)
      return
    }

    const saved: PackageScheduleRecord = {
      ...draft,
      title: draft.title.trim(),
      days: draft.days.map((day) => ({
        activities: day.activities.map((activity) => ({ time: activity.time.trim(), activity: activity.activity.trim() })),
      })),
      includes: draft.includes.map((item) => item.trim()),
    }
    setSavingId(id)
    setMessage("")
    const { error } = await client.from("tour_packages").upsert({ ...saved, updated_at: new Date().toISOString() })
    setSavingId(null)
    if (error) {
      setMessage(`Jadwal belum tersimpan. ${error.message}`)
      return
    }
    setRecords((current) => current.map((record) => record.id === id ? saved : record))
    setDrafts((current) => ({ ...current, [id]: cloneRecord(saved) }))
    setIdrInputs((current) => ({ ...current, [id]: formatIdrInput(saved.price_idr) }))
    setMessage(`Perubahan paket “${saved.title}” sudah tersimpan.`)
  }

  function cancelRecord(id: string) {
    const saved = records.find((record) => record.id === id)
    if (saved) {
      setDrafts((current) => ({ ...current, [id]: cloneRecord(saved) }))
      setIdrInputs((current) => ({ ...current, [id]: formatIdrInput(saved.price_idr) }))
    }
    setMessage("")
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[url('/ijen.jpg')] bg-cover bg-center" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-teal-950/80 to-orange-950/70" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl space-y-6">
        <Link href="/id" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/40 bg-slate-950/30 px-4 text-sm font-medium text-white backdrop-blur transition hover:bg-white hover:text-slate-950">
          <ArrowLeft className="h-4 w-4" />Kembali
        </Link>
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Dolan Bareng Kang Pir · Jelajah Banyuwangi</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Kelola Jadwal Paket</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/80">Edit jadwal perjalanan dan fasilitas paket. Perubahan tersimpan akan tampil di kartu paket bahasa Indonesia.</p>
          </div>
          {(pageState === "ready" || pageState === "denied" || pageState === "error") && client && (
            <Button variant="outline" onClick={handleLogout} disabled={busy} className="shrink-0">
              <LogOut className="mr-2 h-4 w-4" />Keluar
            </Button>
          )}
        </header>

        {pageState === "starting" || pageState === "checking" ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">Memeriksa akses admin…</CardContent></Card>
        ) : null}

        {pageState === "unavailable" ? (
          <Card><CardHeader><CardTitle>Supabase belum dikonfigurasi</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Tambahkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` pada environment lokal dan Vercel, lalu jalankan SQL setup.</p>
            <p>Petunjuk lengkap tersedia pada file `docs/supabase-package-schedules.md` di repositori proyek.</p>
          </CardContent></Card>
        ) : null}

        {pageState === "signed-out" ? (
          <Card className="mx-auto w-full max-w-md border-emerald-100/80 bg-gradient-to-br from-emerald-50/95 via-sky-50/95 to-amber-50/95 shadow-2xl backdrop-blur dark:from-emerald-950/90 dark:via-slate-900/95 dark:to-sky-950/90"><CardHeader><CardTitle>Masuk sebagai admin</CardTitle><p className="text-sm text-muted-foreground">Siap mengatur perjalanan berikutnya?</p></CardHeader><CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2"><Label htmlFor="admin-email">Email</Label><Input id="admin-email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
              <div className="space-y-2"><Label htmlFor="admin-password">Kata sandi</Label><Input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
              {message ? <p role="alert" className="text-sm text-destructive">{message}</p> : null}
              <Button className="w-full" type="submit" disabled={busy}>{busy ? "Memeriksa…" : "Masuk"}</Button>
            </form>
          </CardContent></Card>
        ) : null}

        {pageState === "denied" ? <Card><CardContent className="py-6"><p role="alert" className="text-sm text-destructive">{message}</p></CardContent></Card> : null}
        {pageState === "error" ? <Card><CardContent className="py-6"><p role="alert" className="text-sm text-destructive">{message}</p></CardContent></Card> : null}
        {pageState === "ready" && message ? <p role="status" className="rounded-lg border bg-background px-4 py-3 text-sm">{message}</p> : null}

        {pageState === "ready" ? (
          <p className="rounded-lg border border-white/20 bg-slate-950/35 px-4 py-3 text-sm text-white/90">
            {usdToIdrRate !== null
              ? <>Kurs referensi terbaru: <strong>1 USD = Rp{new Intl.NumberFormat("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(usdToIdrRate)}</strong>{rateDate ? ` (tanggal ${rateDate})` : ""}. Harga akan dikonversi otomatis saat salah satu kolom diubah.</>
              : rateUnavailable
                ? "Kurs USD/IDR tidak tersedia. Harga tetap dapat diisi manual, tetapi konversi otomatis belum aktif."
                : "Sedang mengambil kurs USD/IDR terbaru…"}
          </p>
        ) : null}

        {pageState === "ready" ? records.map((record) => {
          const draft = drafts[record.id]
          if (!draft) return null
          return (
            <Card key={record.id}>
              <CardHeader><CardTitle className="text-xl">{record.title}</CardTitle></CardHeader>
              <CardContent className="space-y-7">
                <div className="space-y-2"><Label htmlFor={`${record.id}-title`}>Nama paket</Label><Input id={`${record.id}-title`} value={draft.title} onChange={(event) => updateDraft(record.id, (current) => ({ ...current, title: event.target.value }))} /></div>

                <section className="space-y-3">
                  <h2 className="text-lg font-semibold">Harga paket</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2"><Label htmlFor={`${record.id}-price-idr`}>Harga dalam IDR (Rp)</Label><Input id={`${record.id}-price-idr`} type="text" inputMode="numeric" placeholder="Contoh: 10.000" value={idrInputs[record.id] ?? formatIdrInput(draft.price_idr)} onChange={(event) => {
                      const input = event.currentTarget
                      const rawValue = input.value
                      const digitsBeforeCaret = rawValue.slice(0, input.selectionStart ?? rawValue.length).replace(/\D/g, "").length
                      const priceIdr = parseIdrInput(rawValue)
                      const formattedValue = formatIdrInput(priceIdr)
                      setIdrInputs((current) => ({ ...current, [record.id]: formattedValue }))
                      updateDraft(record.id, (current) => ({
                        ...current,
                        price_idr: priceIdr,
                        price_usd: priceIdr === null ? null : usdToIdrRate ? Math.round((priceIdr / usdToIdrRate) * 100) / 100 : current.price_usd,
                      }))
                      window.requestAnimationFrame(() => {
                        const updatedInput = document.getElementById(`${record.id}-price-idr`) as HTMLInputElement | null
                        if (updatedInput) {
                          const caret = getIdrCaretPosition(formattedValue, digitsBeforeCaret)
                          updatedInput.setSelectionRange(caret, caret)
                        }
                      })
                    }} onBlur={() => setIdrInputs((current) => ({ ...current, [record.id]: formatIdrInput(drafts[record.id]?.price_idr ?? null) }))} /></div>
                    <div className="space-y-2"><Label htmlFor={`${record.id}-price-usd`}>Harga dalam Dollar (USD)</Label><Input id={`${record.id}-price-usd`} type="number" min="0" step="0.01" inputMode="decimal" placeholder="Contoh: 95" value={draft.price_usd ?? ""} onChange={(event) => {
                      const priceUsd = event.target.value === "" ? null : Number(event.target.value)
                      const priceIdr = priceUsd === null ? null : usdToIdrRate ? Math.round(priceUsd * usdToIdrRate) : draft.price_idr
                      updateDraft(record.id, (current) => ({ ...current, price_usd: priceUsd, price_idr: priceIdr }))
                      setIdrInputs((current) => ({ ...current, [record.id]: formatIdrInput(priceIdr) }))
                    }} /></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Nilai IDR ditampilkan dengan pemisah ribuan, misalnya 10.000. Mengubah IDR atau USD akan menghitung ulang kolom lainnya menggunakan kurs referensi terbaru.</p>
                </section>

                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-semibold">Jadwal perjalanan</h2><Button type="button" variant="outline" size="sm" onClick={() => updateDraft(record.id, (current) => ({ ...current, days: [...current.days, { activities: [] }] }))}><Plus className="mr-1 h-4 w-4" />Tambah hari</Button></div>
                  {draft.days.map((day: PackageScheduleDay, dayIndex: number) => (
                    <section key={dayIndex} className="space-y-4 rounded-xl border p-4 sm:p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-semibold">Hari {dayIndex + 1}</h3><Button type="button" variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => updateDraft(record.id, (current) => ({ ...current, days: current.days.filter((_, index) => index !== dayIndex) }))}><Trash2 className="mr-1 h-4 w-4" />Hapus hari</Button></div>
                      <div className="space-y-3">
                        {day.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="grid gap-3 rounded-lg bg-muted/40 p-3 sm:grid-cols-[minmax(7rem,0.3fr)_minmax(0,1fr)_auto] sm:items-end">
                            <div className="space-y-2"><Label htmlFor={`${record.id}-${dayIndex}-${activityIndex}-time`}>Jam</Label><Input id={`${record.id}-${dayIndex}-${activityIndex}-time`} value={activity.time} onChange={(event) => updateActivity(record.id, dayIndex, activityIndex, "time", event.target.value)} placeholder="09.00–10.00" /></div>
                            <div className="space-y-2"><Label htmlFor={`${record.id}-${dayIndex}-${activityIndex}-activity`}>Kegiatan</Label><Input id={`${record.id}-${dayIndex}-${activityIndex}-activity`} value={activity.activity} onChange={(event) => updateActivity(record.id, dayIndex, activityIndex, "activity", event.target.value)} placeholder="Penjemputan, waktu bebas, makan, perjalanan pulang…" /></div>
                            <Button type="button" variant="ghost" size="icon" aria-label={`Hapus kegiatan ${activityIndex + 1} Hari ${dayIndex + 1}`} className="text-destructive hover:text-destructive sm:mb-0.5" onClick={() => updateDraft(record.id, (current) => ({ ...current, days: current.days.map((currentDay, index) => index !== dayIndex ? currentDay : { ...currentDay, activities: currentDay.activities.filter((_, rowIndex) => rowIndex !== activityIndex) }) }))}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        ))}
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={() => updateDraft(record.id, (current) => ({ ...current, days: current.days.map((currentDay, index) => index !== dayIndex ? currentDay : { ...currentDay, activities: [...currentDay.activities, { time: "", activity: "" }] }) }))}><Plus className="mr-1 h-4 w-4" />Tambah kegiatan</Button>
                    </section>
                  ))}
                </div>

                <section className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-semibold">Termasuk dalam paket</h2><Button type="button" variant="outline" size="sm" onClick={() => updateDraft(record.id, (current) => ({ ...current, includes: [...current.includes, ""] }))}><Plus className="mr-1 h-4 w-4" />Tambah fasilitas</Button></div>
                  {draft.includes.map((item, itemIndex) => (
                    <div key={itemIndex} className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"><div className="space-y-2"><Label htmlFor={`${record.id}-include-${itemIndex}`}>Fasilitas {itemIndex + 1}</Label><Input id={`${record.id}-include-${itemIndex}`} value={item} onChange={(event) => updateDraft(record.id, (current) => ({ ...current, includes: current.includes.map((value, index) => index === itemIndex ? event.target.value : value) }))} /></div><Button type="button" variant="ghost" size="icon" aria-label={`Hapus fasilitas ${itemIndex + 1}`} className="text-destructive hover:text-destructive" onClick={() => updateDraft(record.id, (current) => ({ ...current, includes: current.includes.filter((_, index) => index !== itemIndex) }))}><Trash2 className="h-4 w-4" /></Button></div>
                  ))}
                </section>

                <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                  <Button type="button" variant="outline" onClick={() => cancelRecord(record.id)} disabled={savingId === record.id}><RotateCcw className="mr-2 h-4 w-4" />Batalkan perubahan</Button>
                  <Button type="button" onClick={() => void saveRecord(record.id)} disabled={savingId === record.id} className="sm:min-w-36"><Save className="mr-2 h-4 w-4" />{savingId === record.id ? "Menyimpan…" : "Simpan paket"}</Button>
                </div>
              </CardContent>
            </Card>
          )
        }) : null}
      </div>
    </main>
  )
}
