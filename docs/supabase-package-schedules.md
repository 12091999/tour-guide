# Supabase Setup for Tour Schedules

The Indonesian package cards can read their schedules from Supabase. The public site has bundled fallback data, so it remains usable before a Supabase project is connected. The editor at `/admin/tour-packages` needs a Supabase project and an explicitly authorized Auth user.

## 1. Create the database tables and initial data

1. Create or select a Supabase project.
2. Open **SQL Editor** in the Supabase Dashboard.
3. Copy and run the contents of [`supabase/package-schedules.sql`](../supabase/package-schedules.sql).

The script creates or updates the `tour_packages` table, adds editable `price_idr` and `price_usd` columns, seeds the three current packages, and enables Row Level Security. Public visitors can read package schedules. Authenticated users can write only when their user ID is in `schedule_admins`.

The seed uses `ON CONFLICT DO NOTHING`, so rerunning it will not overwrite edits made through the admin page.

## 2. Create an admin account

1. In Supabase, open **Authentication → Users** and create an account with the admin's email and a strong password. Keep public sign-ups disabled unless the project has a separate need for them.
2. Copy the new user's UUID from the Users page.
3. In SQL Editor, add that UUID to the allow-list:

```sql
insert into public.schedule_admins (user_id)
values ('PASTE-AUTH-USER-UUID-HERE');
```

The admin page checks this table after sign-in, and database policies independently enforce the same authorization for writes. Do not add an admin email or UUID to browser code.

## 3. Configure the app

In the Supabase project settings, copy the project URL and the public anon/publishable key. Add them to a local `.env.local` file:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

The checked-in `.env.example` has the variable names without values. Never put a `service_role` key in these variables or in client code. Do not commit `.env.local`.

For the production site, add both variables in **Vercel → Project Settings → Environment Variables**, select the Production environment, then redeploy. Add Preview only if you want the editor and database enabled in preview deployments too.

## 4. Use the editor

Open `/admin/tour-packages`, sign in with the Auth account, and edit each package's name, IDR and USD prices, days, time/activity rows, and included items. Use **Simpan paket** to save or **Batalkan perubahan** to reload the last saved values. Saved Indonesian schedules and prices appear on the public package cards after refresh. Prices can be left blank until they are set.

The editor can add and remove days and activity rows. Every day must have at least one row, and each row needs both a time and an activity description. Included items may be removed; any item left in the list must have text.

## Fallback behavior

- If either environment variable is missing, the public site renders the bundled Indonesian package schedules and the admin page explains that Supabase is not configured.
- If Supabase is configured but the database query fails or has no seeded package rows, public cards use the bundled schedules.
- To make admin edits persist across visitors and devices, apply the SQL, provision an allow-listed Auth user, configure the Vercel variables, and redeploy.
- Destination-detail itineraries are still maintained in the site source. The Supabase editor controls the schedules and inclusions shown on the package cards.
