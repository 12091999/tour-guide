-- Tours base table
create table if not exists tours (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  price       integer not null,
  duration    text not null,
  difficulty  text not null,
  rating      numeric(2, 1) not null,
  max_people  integer not null default 5,
  image_url   text not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Multilingual title + description
create table if not exists tour_translations (
  id          uuid primary key default gen_random_uuid(),
  tour_id     uuid not null references tours (id) on delete cascade,
  lang        text not null,
  title       text not null,
  description text not null,
  unique (tour_id, lang)
);

-- Itinerary steps (ordered per language)
create table if not exists tour_itinerary_items (
  id          uuid primary key default gen_random_uuid(),
  tour_id     uuid not null references tours (id) on delete cascade,
  lang        text not null,
  step_order  integer not null,
  text        text not null
);

create index if not exists idx_tour_itinerary_tour_lang
  on tour_itinerary_items (tour_id, lang, step_order);

-- Included items (ordered per language)
create table if not exists tour_included_items (
  id          uuid primary key default gen_random_uuid(),
  tour_id     uuid not null references tours (id) on delete cascade,
  lang        text not null,
  item_order  integer not null,
  text        text not null
);

create index if not exists idx_tour_included_tour_lang
  on tour_included_items (tour_id, lang, item_order);

-- Auto-update updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger tours_updated_at
  before update on tours
  for each row execute function set_updated_at();

-- RLS: public read access (no auth required for tour listings)
alter table tours enable row level security;
alter table tour_translations enable row level security;
alter table tour_itinerary_items enable row level security;
alter table tour_included_items enable row level security;

create policy "Public can read tours"
  on tours for select to anon, authenticated using (true);

create policy "Public can read tour_translations"
  on tour_translations for select to anon, authenticated using (true);

create policy "Public can read tour_itinerary_items"
  on tour_itinerary_items for select to anon, authenticated using (true);

create policy "Public can read tour_included_items"
  on tour_included_items for select to anon, authenticated using (true);
