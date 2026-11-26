-- Shared daily inventory and atomic reservation creation for public tour bookings.
create table if not exists public.tour_reservations (
  id uuid primary key default gen_random_uuid(),
  reservation_code text not null unique,
  tour_id text not null,
  tour_name text not null,
  booking_type text not null check (booking_type in ('individual', 'package')),
  travel_date date not null,
  time_slot text not null,
  party_size integer not null check (party_size between 1 and 12),
  unit_price_idr integer not null check (unit_price_idr in (300000, 550000)),
  customer_name text not null,
  phone text not null,
  email text,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists tour_reservations_inventory_idx
  on public.tour_reservations (travel_date, time_slot)
  where status = 'confirmed';

alter table public.tour_reservations enable row level security;
revoke all on public.tour_reservations from anon, authenticated;

create or replace function public.get_tour_slots(
  p_tour_id text,
  p_booking_type text,
  p_date date
)
returns table (slot_label text, slots_remaining integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  allowed_slots text[];
begin
  if p_booking_type not in ('individual', 'package') then
    raise exception 'INVALID_BOOKING_TYPE';
  end if;
  if p_date < (now() at time zone 'Asia/Jakarta')::date then
    raise exception 'DATE_IN_PAST';
  end if;
  if p_tour_id not in (
    'ijen', 'djawatan', 'bangsring', 'tabuhan', 'pulau-merah', 'baluran',
    'alas-purwo', 'jagir', 'teluk-hijau', 'route-south', 'route-west', 'route-north'
  ) then
    raise exception 'INVALID_TOUR';
  end if;

  allowed_slots := case
    when p_tour_id in ('ijen', 'route-west') then array['23:30']::text[]
    when p_tour_id in ('tabuhan', 'bangsring', 'route-north') then array['07:30', '09:00']::text[]
    when p_tour_id in ('pulau-merah', 'route-south') then array['06:30', '13:00']::text[]
    else array['08:00', '10:00', '13:00']::text[]
  end;

  return query
  select requested.slot_label,
    greatest(0, 12 - coalesce(sum(reservation.party_size), 0)::integer) as slots_remaining
  from unnest(allowed_slots) as requested(slot_label)
  left join public.tour_reservations as reservation
    on reservation.travel_date = p_date
    and reservation.time_slot = requested.slot_label
    and reservation.status = 'confirmed'
  where p_date > (now() at time zone 'Asia/Jakarta')::date
    or requested.slot_label::time > (now() at time zone 'Asia/Jakarta')::time
  group by requested.slot_label
  order by requested.slot_label;
end;
$$;

create or replace function public.create_tour_reservation(
  p_tour_id text,
  p_tour_name text,
  p_booking_type text,
  p_date date,
  p_time_slot text,
  p_party_size integer,
  p_customer_name text,
  p_phone text,
  p_email text default null
)
returns table (reservation_code text, slots_remaining integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  allowed_slots text[];
  unit_price integer;
  reserved_code text;
  total_reserved integer;
begin
  if p_booking_type not in ('individual', 'package') then raise exception 'INVALID_BOOKING_TYPE'; end if;
  if p_tour_id not in (
    'ijen', 'djawatan', 'bangsring', 'tabuhan', 'pulau-merah', 'baluran',
    'alas-purwo', 'jagir', 'teluk-hijau', 'route-south', 'route-west', 'route-north'
  ) then raise exception 'INVALID_TOUR'; end if;
  if p_date < (now() at time zone 'Asia/Jakarta')::date then raise exception 'DATE_IN_PAST'; end if;
  if p_party_size is null or p_party_size < (case when p_booking_type = 'package' then 4 else 1 end) or p_party_size > 12 then
    raise exception 'INVALID_PARTY_SIZE';
  end if;
  if length(trim(coalesce(p_customer_name, ''))) < 2 or length(trim(coalesce(p_phone, ''))) < 6 then
    raise exception 'INVALID_CONTACT';
  end if;
  if length(p_customer_name) > 100 or length(p_phone) > 30 or length(coalesce(p_email, '')) > 254 then
    raise exception 'INVALID_CONTACT';
  end if;
  if p_tour_name is null or length(trim(p_tour_name)) < 2 or length(p_tour_name) > 120 then raise exception 'INVALID_TOUR_NAME'; end if;

  allowed_slots := case
    when p_tour_id in ('ijen', 'route-west') then array['23:30']::text[]
    when p_tour_id in ('tabuhan', 'bangsring', 'route-north') then array['07:30', '09:00']::text[]
    when p_tour_id in ('pulau-merah', 'route-south') then array['06:30', '13:00']::text[]
    else array['08:00', '10:00', '13:00']::text[]
  end;
  if not (p_time_slot = any(allowed_slots)) then raise exception 'INVALID_TIME_SLOT'; end if;
  if p_date = (now() at time zone 'Asia/Jakarta')::date and p_time_slot::time <= (now() at time zone 'Asia/Jakarta')::time then
    raise exception 'TIME_IN_PAST';
  end if;

  unit_price := case when p_booking_type = 'package' then 550000 else 300000 end;
  -- Serialize claims for the same trip/date/time so concurrent requests cannot oversell.
  perform pg_advisory_xact_lock(hashtextextended(p_date::text || '|' || p_time_slot, 0));
  select coalesce(sum(reservation.party_size), 0)::integer into total_reserved
  from public.tour_reservations as reservation
  where reservation.travel_date = p_date
    and reservation.time_slot = p_time_slot and reservation.status = 'confirmed';
  if total_reserved + p_party_size > 12 then raise exception 'SLOT_FULL'; end if;

  reserved_code := upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10));
  insert into public.tour_reservations (
    reservation_code, tour_id, tour_name, booking_type, travel_date, time_slot,
    party_size, unit_price_idr, customer_name, phone, email
  ) values (
    reserved_code, p_tour_id, trim(p_tour_name), p_booking_type, p_date, p_time_slot,
    p_party_size, unit_price, trim(p_customer_name), trim(p_phone), nullif(trim(p_email), '')
  );
  return query select reserved_code, 12 - total_reserved - p_party_size;
end;
$$;

revoke all on function public.get_tour_slots(text, text, date) from public;
revoke all on function public.create_tour_reservation(text, text, text, date, text, integer, text, text, text) from public;
grant execute on function public.get_tour_slots(text, text, date) to anon, authenticated;
grant execute on function public.create_tour_reservation(text, text, text, date, text, integer, text, text, text) to anon, authenticated;
