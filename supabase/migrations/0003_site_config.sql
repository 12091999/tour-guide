create table if not exists site_config (
  key   text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table site_config enable row level security;

create policy "Public read" on site_config
  for select to anon, authenticated using (true);

grant usage on schema public to anon, authenticated;
grant select on site_config to anon, authenticated;
grant all on site_config to service_role;

insert into site_config (key, value) values
  ('business_whatsapp', '6287775916086'),
  ('business_email',    'TourGuide@gmail.com')
on conflict (key) do nothing;
