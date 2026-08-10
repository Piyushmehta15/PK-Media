-- ============================================================
-- PK MEDIA OS — Seed (safe, reproducible)
-- Creates the PK Media organization.
--
-- NOTE ON ADMIN PROFILE:
-- profiles.id references auth.users.id. Because we cannot know the
-- Supabase auth user UUID at migration time, the ADMIN profile is
-- created via a SECURITY DEFINER function that lets you run:
--
--   select public.promote_user_to_admin('<auth-user-uuid>', '<org-uuid-here>');
--
-- after signing up. Alternatively, the app's settings page can assign
-- an admin once the first user signs up. This file is non-destructive:
-- it never drops existing data.
-- ============================================================

-- ---------- PK Media organization ----------
insert into public.organizations (id, name, website)
values (
  '00000000-0000-0000-0000-000000000001',
  'PK Media',
  'https://pkmedia.in'
)
on conflict (id) do nothing;

-- ---------- helper: promote an existing auth user to an org ADMIN ----------
create or replace function public.promote_user_to_admin(p_user uuid, p_org uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  update public.profiles
     set role = 'ADMIN', organization_id = p_org, is_active = true
   where id = p_user;
end;
$$;

-- ---------- helper: create/demo a dev org + demo users (optional) ----------
-- Used only in development to seed demo data pointing at the PK org.
insert into public.brands (id, organization_id, name, contact_person, email, phone, industry, budget)
values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Bright Stores', 'Mira Khanna', 'mira@brightstores.in', '+91 98200 11111', 'D2C / E-commerce', '₹1L–₹3L')
on conflict (id) do nothing;
