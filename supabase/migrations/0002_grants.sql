-- Grant full access to service_role (used by seed script and admin server actions)
grant usage on schema public to service_role;
grant all on tours to service_role;
grant all on tour_translations to service_role;
grant all on tour_itinerary_items to service_role;
grant all on tour_included_items to service_role;

-- Grant read access to anon and authenticated (public facing pages)
grant usage on schema public to anon, authenticated;
grant select on tours to anon, authenticated;
grant select on tour_translations to anon, authenticated;
grant select on tour_itinerary_items to anon, authenticated;
grant select on tour_included_items to anon, authenticated;
