# Tour Schedules and Admin Editor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update Indonesian destination itineraries and footer branding, and add a responsive Supabase-backed admin editor for all package schedules and inclusions.

**Architecture:** Keep the current itinerary and package definitions as bundled fallback data. Add a Supabase table keyed by package, public read access, and an admin allow-list enforced by Row Level Security. The public Indonesian package cards read database data when configured and fall back to bundled data; a client-side admin route signs in with Supabase Auth and edits the same records. Non-Indonesian schedule copy stays localized in the current code.

**Tech Stack:** Next.js 15 App Router, React, TypeScript, Tailwind CSS, Supabase Auth, Supabase Postgres with Row Level Security.

**Spec:** `docs/superpowers/specs/2026-11-23-tour-schedules-design.md`

## Global Constraints

- Keep Supabase credentials out of Git; public URL and anon key are supplied through environment variables.
- Public visitors may read package schedules; only user IDs explicitly listed as admins may write.
- Database failure or missing configuration must preserve usable public fallback cards.
- Admin-managed schedule copy is Indonesian only; other language copy stays as currently localized.
- Keep the user-confirmed Djawatan references in the Teluk Hijau and Tabuhan itineraries exactly as supplied.
- Support all current three-day packages and a flexible number of days/activity rows.
- Keep the admin editor and public schedule cards usable on phone, tablet, and desktop.
- Do not change package order, names, prices, or booking behavior.

## Review Focus

- Missing or invalid Supabase configuration: public schedule cards fall back; admin receives a clear unavailable message.
- Anonymous or non-admin write attempts: Supabase RLS denies them.
- A saved change: Indonesian public cards show the saved value after refresh, on another device.
- A package with more or fewer days/activity rows: editor and cards render all rows without fixed-count assumptions.
- Empty values or cancelled edits: saving validates required fields and cancel restores the persisted values.

---

### Task 1: Update Destination Itineraries and Footer Brand

**Files:**
- Modify: `app/[lang]/explore/[id]/page.tsx`
- Modify: `components/footer.tsx`
- Modify: `app/[lang]/dictionaries.ts` only if needed to override the existing footer brand dictionary value.

**Interfaces:**
- Consumes the current `translatedTours` Indonesian entries and shared `Footer` props.
- Produces the user-supplied Indonesian itinerary lists and footer heading/copyright brand “Dolen Bareng Kang Pir”.

- [ ] Replace Indonesian itinerary entries for IDs 1, 2, 3, 4, 5, and 6 with the times and activities in the approved design, retaining the confirmed Djawatan text for IDs 4 and 5.
- [ ] Update the shared footer heading and copyright brand on every route; leave localized footer descriptions and links unchanged.
- [ ] Run `npm run build`; expect successful TypeScript validation and route generation.

### Task 2: Add Supabase Schema, Seed, and Client Configuration

**Files:**
- Create: `lib/package-schedules.ts` for shared package schedule and includes types plus bundled Indonesian fallback data.
- Create: `lib/supabase/client.ts` for the browser client.
- Create: `lib/supabase/server.ts` for the public server-side read client, if server fetch is used.
- Create: `supabase/package-schedules.sql` with table, seed, RLS, and admin allow-list policies.
- Create: `.env.example` with variable names only.
- Modify: `package.json` and `package-lock.json` to add the Supabase JS client.

**Interfaces:**
- `PackageScheduleRecord`: `{ id: string; title: string; days: { activities: { time: string; activity: string }[] }[]; includes: string[] }`.
- `getPackageSchedules(): Promise<PackageScheduleRecord[]>` returns Supabase rows when configured and valid, otherwise the fallback records.
- Browser client reads `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` only.

- [ ] Add the minimal Supabase client dependency and define the shared package record type and current package fallback data.
- [ ] Write SQL that creates the package table and admin allow-list, enables RLS, permits public reads, and restricts inserts/updates/deletes to authenticated allow-listed user IDs.
- [ ] Seed all three existing package cards with their current days and included items.
- [ ] Document `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.example`; do not add real credentials.
- [ ] Run `npm run build`; expect the shared module and schema integration to compile.

### Task 3: Connect Public Indonesian Package Cards to Saved Data

**Files:**
- Modify: `components/tour-packages.tsx`
- Modify: `app/[lang]/explore/page.tsx` if it must become async to pass fetched schedule records.
- Modify: `lib/package-schedules.ts` if a server data access helper is needed.

**Interfaces:**
- `TourPackages` receives `lang` and package records; the Indonesian route uses Supabase records with bundled fallback, while other languages retain existing localized card behavior.
- Saved records preserve package order and title while rendering all configured days, activity rows, and include items.
- Indonesian package-card data is read without a stale build-time cache so a saved admin edit is visible to visitors after refresh across devices.

- [ ] Replace hard-coded Indonesian package schedule rows and includes with records from `getPackageSchedules()`.
- [ ] Keep existing non-Indonesian labels and localized content behavior unchanged.
- [ ] Preserve responsive card layout and render schedules with any day/activity count.
- [ ] Run `npm run build`; expect successful build with and without Supabase environment variables.

### Task 4: Add Responsive Authenticated Admin Editor

**Files:**
- Create: `app/admin/tour-packages/page.tsx`
- Create: `components/admin/package-schedule-editor.tsx`
- Create: `components/admin/package-schedule-login.tsx` if separation improves clarity.
- Modify: `lib/supabase/client.ts` as required for Auth and data access.

**Interfaces:**
- Admin route reads and writes `PackageScheduleRecord` through the Supabase browser client.
- Supabase Auth signs the admin in; the UI checks that the user is on the database allow-list. Database RLS remains the authoritative write gate.

- [ ] Add sign-in and sign-out UI and handle loading, invalid credentials, missing configuration, and non-admin sessions.
- [ ] List every package and allow editing title, any number of days, ordered activity rows and their time/text, and package includes.
- [ ] Add controls to add/remove days, activity rows, and included items; provide save and cancel actions with required-field validation.
- [ ] Make forms usable at phone, tablet, and desktop widths, with clear save/error feedback.
- [ ] Run `npm run build`; expect admin route and client components to compile.

### Task 5: Document Supabase Setup and Admin Provisioning

**Files:**
- Create: `docs/supabase-package-schedules.md`
- Modify: `.env.example` if setup documentation identifies missing variable names.

**Interfaces:**
- Setup guide connects the SQL schema, Supabase project, Auth admin account, local environment, and Vercel production environment.

- [ ] Document how to create/apply the schema and seed, create an Auth user, add that user ID to the admin allow-list, and configure the two public environment variables locally and in Vercel.
- [ ] Explain that credentials are configured through the Supabase and Vercel dashboards and must not be committed.
- [ ] Document the current fallback behavior before Supabase is configured.

### Task 6: Build, Push, and Deploy

**Files:**
- Modify: all files above as needed from build feedback.

- [ ] Run `npm run build`; require a successful production build before deployment.
- [ ] Review `git diff` and `git status` to ensure only requested code/docs and no local secrets are included.
- [ ] Commit the changes and push `main` to `origin` as previously requested.
- [ ] Deploy to Vercel production and capture the deployment URL/result. If Vercel still returns `fetch failed`, report the failed deployment separately from the successful push and preserve the successful production build.
- [ ] Confirm the production site loads the new branding and itineraries; after Supabase credentials/admin are configured, confirm an admin edit persists and appears on the Indonesian package cards.
