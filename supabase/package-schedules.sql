create table if not exists public.tour_packages (
  id text primary key,
  position integer not null unique,
  title text not null,
  price_idr bigint,
  price_usd numeric(12, 2),
  days jsonb not null default '[]'::jsonb check (jsonb_typeof(days) = 'array'),
  includes jsonb not null default '[]'::jsonb check (jsonb_typeof(includes) = 'array'),
  updated_at timestamptz not null default now()
);

alter table public.tour_packages
  add column if not exists price_idr bigint,
  add column if not exists price_usd numeric(12, 2);

create table if not exists public.schedule_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.tour_packages enable row level security;
alter table public.schedule_admins enable row level security;

grant select on public.tour_packages to anon, authenticated;
grant insert, update, delete on public.tour_packages to authenticated;
grant select on public.schedule_admins to authenticated;

drop policy if exists "Public can read tour packages" on public.tour_packages;
create policy "Public can read tour packages"
  on public.tour_packages for select to anon, authenticated using (true);

drop policy if exists "Admins can insert tour packages" on public.tour_packages;
create policy "Admins can insert tour packages"
  on public.tour_packages for insert to authenticated
  with check (exists (select 1 from public.schedule_admins where user_id = (select auth.uid())));

drop policy if exists "Admins can update tour packages" on public.tour_packages;
create policy "Admins can update tour packages"
  on public.tour_packages for update to authenticated
  using (exists (select 1 from public.schedule_admins where user_id = (select auth.uid())))
  with check (exists (select 1 from public.schedule_admins where user_id = (select auth.uid())));

drop policy if exists "Admins can delete tour packages" on public.tour_packages;
create policy "Admins can delete tour packages"
  on public.tour_packages for delete to authenticated
  using (exists (select 1 from public.schedule_admins where user_id = (select auth.uid())));

drop policy if exists "Admins can read their own allow-list row" on public.schedule_admins;
create policy "Admins can read their own allow-list row"
  on public.schedule_admins for select to authenticated
  using (user_id = (select auth.uid()));

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'tour_packages'
  ) then
    alter publication supabase_realtime add table public.tour_packages;
  end if;
end;
$$;

insert into public.tour_packages (id, position, title, price_idr, price_usd, days, includes)
values
  ('djawatan-merah-ijen', 1, 'Djawatan → Pulau Merah → Ijen', null, null, '[{"activities":[{"time":"09.00","activity":"Penjemputan di hotel atau homestay"},{"time":"10.00","activity":"Tiba di Djawatan"},{"time":"10.00–14.00","activity":"Waktu bermain dan berfoto di Djawatan"},{"time":"14.30","activity":"Makan dan coffee break"},{"time":"15.00","activity":"Berangkat menuju penginapan (hotel atau homestay)"}]},{"activities":[{"time":"09.00","activity":"Penjemputan di hotel atau homestay"},{"time":"10.00–11.30","activity":"Makan dan coffee break di kedai kopi rekomendasi"},{"time":"12.00","activity":"Berangkat menuju Pulau Merah"},{"time":"13.00","activity":"Tiba di Pulau Merah"},{"time":"13.30–16.00","activity":"Waktu bermain di tepi pantai dan menikmati sunset"},{"time":"16.30–17.00","activity":"Bersih-bersih dan berangkat menuju penginapan (hotel atau homestay)"}]},{"activities":[{"time":"23.30","activity":"Penjemputan di hotel atau homestay"},{"time":"00.30","activity":"Tiba di Paltuding"},{"time":"01.00","activity":"Pembagian perlengkapan untuk mendaki"},{"time":"01.30–02.00","activity":"Persiapan mendaki"},{"time":"02.00–05.30","activity":"Memasuki rute pendakian, menikmati suasana perjalanan, dan berfoto"},{"time":"06.30–07.00","activity":"Turun"},{"time":"07.00–08.00","activity":"Istirahat, makan, dan coffee break"},{"time":"08.30–09.00","activity":"Kembali ke penginapan (hotel atau homestay)"}]}]', '["Djawatan: tiket masuk dan makan","Pulau Merah: tiket masuk dan makan","Ijen: tiket, surat kesehatan, makan, senter, masker gas, dan tongkat daki"]'),
  ('tabuhan-djawatan-ijen', 2, 'Tabuhan → Djawatan → Ijen', null, null, '[{"activities":[{"time":"09.00","activity":"Penjemputan di hotel atau homestay"},{"time":"10.00","activity":"Tiba di Djawatan"},{"time":"10.00–14.00","activity":"Waktu bermain dan berfoto di Djawatan"},{"time":"14.30","activity":"Makan dan coffee break"},{"time":"15.00","activity":"Berangkat menuju penginapan (hotel atau homestay)"}]},{"activities":[{"time":"09.00","activity":"Penjemputan di hotel atau homestay"},{"time":"10.00","activity":"Tiba di Djawatan"},{"time":"10.00–14.00","activity":"Waktu bermain dan berfoto di Djawatan"},{"time":"14.30","activity":"Makan dan coffee break"},{"time":"15.00","activity":"Berangkat menuju penginapan (hotel atau homestay)"}]},{"activities":[{"time":"23.30","activity":"Penjemputan di hotel atau homestay"},{"time":"00.30","activity":"Tiba di Paltuding"},{"time":"01.00","activity":"Pembagian perlengkapan untuk mendaki"},{"time":"01.30–02.00","activity":"Persiapan mendaki"},{"time":"02.00–05.30","activity":"Memasuki rute pendakian, menikmati suasana perjalanan, dan berfoto"},{"time":"06.30–07.00","activity":"Turun"},{"time":"07.00–08.00","activity":"Istirahat, makan, dan coffee break"},{"time":"08.30–09.00","activity":"Kembali ke penginapan (hotel atau homestay)"}]}]', '["Tabuhan: tiket, perahu/sampan pulang-pergi, makan, dan alat snorkeling","Djawatan: tiket masuk dan makan","Ijen: tiket, surat kesehatan, makan, senter, masker gas, dan tongkat daki"]'),
  ('djawatan-ijen-merah', 3, 'Djawatan → Ijen → Pulau Merah', null, null, '[{"activities":[{"time":"09.00","activity":"Penjemputan di hotel atau homestay"},{"time":"10.00","activity":"Tiba di Djawatan"},{"time":"10.00–14.00","activity":"Waktu bermain dan berfoto di Djawatan"},{"time":"14.30","activity":"Makan dan coffee break"},{"time":"15.00","activity":"Berangkat menuju penginapan (hotel atau homestay)"}]},{"activities":[{"time":"23.30","activity":"Penjemputan di hotel atau homestay"},{"time":"00.30","activity":"Tiba di Paltuding"},{"time":"01.00","activity":"Pembagian perlengkapan untuk mendaki"},{"time":"01.30–02.00","activity":"Persiapan mendaki"},{"time":"02.00–05.30","activity":"Memasuki rute pendakian, menikmati suasana perjalanan, dan berfoto"},{"time":"06.30–07.00","activity":"Turun"},{"time":"07.00–08.00","activity":"Istirahat, makan, dan coffee break"},{"time":"08.30–09.00","activity":"Kembali ke penginapan (hotel atau homestay)"}]},{"activities":[{"time":"09.00","activity":"Penjemputan di hotel atau homestay"},{"time":"10.00–11.30","activity":"Makan dan coffee break di kedai kopi rekomendasi"},{"time":"12.00","activity":"Berangkat menuju Pulau Merah"},{"time":"13.00","activity":"Tiba di Pulau Merah"},{"time":"13.30–16.00","activity":"Waktu bermain di tepi pantai dan menikmati sunset"},{"time":"16.30–17.00","activity":"Bersih-bersih dan berangkat menuju penginapan (hotel atau homestay)"}]}]', '["Djawatan: tiket masuk dan makan","Ijen: tiket, surat kesehatan, makan, senter, masker gas, dan tongkat daki","Pulau Merah: tiket masuk dan makan"]')
on conflict (id) do nothing;
