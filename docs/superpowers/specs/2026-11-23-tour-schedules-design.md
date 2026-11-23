# Tour Schedules and Admin Editor Design

## Intent

Update the Indonesian destination itineraries, rename the footer brand to “Dolen Bareng Kang Pir”, and let an authenticated admin edit the schedules and included items shown on every tour package card. Schedule changes must be stored centrally so the public site reflects them for visitors on every device.

## Goals

- Use the supplied Indonesian itinerary text for Ijen, Djawatan, Bangsring, Teluk Hijau, Tabuhan Island, and Pulau Merah.
- Change footer branding from “Tour Guide Traveller” to “Dolen Bareng Kang Pir”.
- Provide a responsive admin editor that can edit every package and its trip schedule, day sections, pickup, visiting/free time, meals, return, and package includes.
- Persist edits in Supabase and render the same saved data on public package cards.
- Keep public schedule cards readable on mobile, tablet, and desktop.

## Non-goals

- Rewriting itinerary content in other languages; non-Indonesian pages retain their current localized copy unless they already fall back to Indonesian.
- Changing package names, prices, destinations, booking flow, or package composition.
- Giving unauthenticated visitors any write access.

## Constraints

- The site is Next.js 15 on Vercel.
- Today, package cards and destination itineraries are hard-coded in React components; there is no admin route, database client, or Supabase environment configuration in the repository.
- Supabase project URL and anon key, plus an admin user, must be configured outside source control before the live editor can connect.
- Supabase Row Level Security must allow public reads but restrict package writes to explicitly authorized admin users.
- The project has three existing three-day packages; the editor must support all current days and keep the number of days flexible for future edits.

## Approaches

1. **Supabase-backed admin editor (selected by the user).** Supabase Auth identifies the admin, a database table stores each package’s schedule and includes, and Row Level Security protects writes. This makes changes visible to every visitor and device.
2. **External CMS.** Avoids building a bespoke editor but adds a separate editing workflow and integration dependency.
3. **Local-only editor.** Quick to build, but edits would remain in one browser and would not update the public site for other visitors; this does not meet the request.

## Content supplied by the user

Destination itinerary lists are displayed in this order and wording, with standard spelling normalization for “coffee break”, “homestay”, and obvious typos in surrounding Indonesian copy:

- **Ijen:** 23.30 pickup at hotel/homestay; 00.30 arrive at Paltuding; 01.00 distribute hiking equipment; 01.30–02.00 hiking preparation; 02.00–05.30 enter the hiking route, enjoy the journey, and take photos; 06.30–07.00 descend; 07.00–08.00 meal/coffee break; 08.30–09.00 return to lodging/hotel/homestay.
- **Djawatan:** retain the itinerary already supplied in the previous request: 09.00 pickup at hotel/homestay; 10.00 arrive at Djawatan; 10.00–14.00 play and take photos at Djawatan; 14.30 meal/coffee break; 15.00 depart for lodging/hotel/homestay.
- **Bangsring:** 09.00 pickup at hotel/homestay; 10.30 arrive at Bangsring; 10.30–10.45 distribute swimming equipment; 11.00–11.30 take a boat to the floating house; 12.00 arrive at the floating house, play, and take photos; 14.00 meal/coffee break; 14.30–15.30 free time to continue activities; 16.00–16.30 return and clean up; 17.00 depart for lodging/hotel/homestay.
- **Teluk Hijau:** 09.00 pickup at hotel/homestay; 10.00 arrive at Djawatan; 10.00–14.00 play and take photos at Djawatan; 14.30 meal/coffee break; 15.00 depart for lodging/hotel/homestay. The user explicitly confirmed that the Djawatan references should remain as supplied.
- **Tabuhan Island:** same schedule and Djawatan references as explicitly supplied and confirmed by the user.
- **Pulau Merah:** 09.00 pickup at hotel/homestay; 10.00–11.30 meal/coffee break at a recommended coffee shop; 12.00 depart for Pulau Merah; 13.00 arrive at Pulau Merah; 13.30–16.00 beach time and sunset; 16.30–17.00 clean up and return toward lodging/hotel/homestay.

## Product behavior

### Destination details

The Indonesian itinerary displayed on `/id/explore/{id}` uses the supplied times and activities for each of the six listed destinations. Other languages keep their existing translations. The detail layout remains responsive and uses the existing itinerary list presentation.

### Footer

The footer brand heading and copyright brand use “Dolen Bareng Kang Pir” wherever the shared footer appears. The description and navigation labels remain localized as currently implemented. Existing responsive footer columns continue to stack on smaller screens.

### Package cards

- Public package cards load saved schedule and included-item data for every package from Supabase.
- The admin manages the Indonesian schedule copy requested here. Indonesian package cards use saved Supabase content; non-Indonesian pages retain their existing localized schedule copy.
- Schedule data is organized by package, then by day, then by ordered activity rows. Each row has an editable time and activity label; labels cover pickup, visit/free time, meal, and return without hard-coding a fixed day count.
- Included items are editable per package.
- The admin page lists every package and lets the admin edit day sections, activity rows, times, labels, and included items, then save or cancel changes.
- Admin page controls and package cards adapt to phone, tablet, and desktop widths.
- Public visitors can read data but cannot edit it. Admin access requires Supabase Auth and explicit admin authorization enforced by Row Level Security.

## Data and security design

- Store one record per package, keyed by a stable package identifier, with the current title, ordered day arrays, ordered `{ time, activity }` rows, and ordered package includes.
- Seed the database with the current three packages and their existing schedule/content before switching public cards to database reads.
- Keep Supabase URL and anon key in Vercel environment settings and local environment configuration; never commit credentials.
- Define an explicit admin allow-list in the database. Enable RLS on the package and admin tables; permit anonymous/authenticated public reads of package data and permit inserts/updates only when the authenticated Supabase user is on the allow-list.
- A missing database configuration or read error must not take down the rest of the site; public cards should show the bundled initial schedules as a fallback and the editor should explain that it cannot save until configuration is available.

## Implementation choices left to the builder

- Follow existing Next.js and Tailwind conventions, reuse current UI primitives, and avoid adding a broad UI framework.
- Keep database schema and setup instructions in a checked-in SQL/setup document, but keep live Supabase credentials and admin identity out of Git.
- Make the initial public fallback data match the database seed so the site remains consistent before and during Supabase setup.
- Preserve current package card design while making the admin interface clear on narrow viewports.

## Approval needed

This design reflects the selected Supabase approach and preserves the Djawatan references in the Teluk Hijau and Tabuhan itineraries exactly as the user confirmed. The builder-check review asked whether admin-edited schedules should also be translated; this design assumes the editor manages Indonesian copy only, since that is the supplied content, while existing non-Indonesian copy stays as-is. Implementation should start after the user approves this design.
