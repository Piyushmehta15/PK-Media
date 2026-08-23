-- 1. Redefine current_user_role to language plpgsql to prevent inlining
create or replace function public.current_user_role()
returns text
language plpgsql
stable
security definer set search_path = public, pg_catalog
as $$
declare
  v_role text;
begin
  select role into v_role from public.profiles where id = auth.uid();
  return v_role;
end;
$$;

-- 2. Redefine current_org_id to language plpgsql to prevent inlining
create or replace function public.current_org_id()
returns uuid
language plpgsql
stable
security definer set search_path = public, pg_catalog
as $$
declare
  v_org_id uuid;
begin
  select organization_id into v_org_id from public.profiles where id = auth.uid();
  return v_org_id;
end;
$$;

-- 3. Redefine current_user_active to language plpgsql to prevent inlining
create or replace function public.current_user_active()
returns boolean
language plpgsql
stable
security definer set search_path = public, pg_catalog
as $$
declare
  v_active boolean;
begin
  select is_active from public.profiles where id = auth.uid();
  return coalesce(v_active, false);
end;
$$;

-- 4. Recreate select policy on profiles to match the expected name
drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles
  for select to authenticated
  using (auth.uid() = id);

-- 5. Fix the trigger function for new user profiles to avoid foreign key violations and default to active
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public, pg_catalog
as $$
declare
  v_org_id uuid;
begin
  v_org_id := (new.raw_user_meta_data->>'organization_id')::uuid;
  
  if v_org_id is null or not exists (select 1 from public.organizations where id = v_org_id) then
    select id into v_org_id from public.organizations order by id limit 1;
  end if;

  if v_org_id is null then
    v_org_id := '00000000-0000-0000-0000-000000000001';
    insert into public.organizations (id, name, website)
    values (v_org_id, 'PK Media', 'https://pkmedia.in')
    on conflict (id) do nothing;
  end if;

  insert into public.profiles (id, email, full_name, role, organization_id, is_active)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'CLIENT'),
    v_org_id,
    coalesce((new.raw_user_meta_data->>'is_active')::boolean, true)
  );
  return new;
end;
$$;

-- 6. Grant select on public.profiles to authenticated and anon roles
grant select on public.profiles to authenticated, anon;
grant select on public.organizations to authenticated, anon;

-- 7. Backfill profiles for existing users who might have failed creation due to the trigger bug
insert into public.profiles (id, email, full_name, role, organization_id, is_active)
select 
  u.id,
  coalesce(u.email, ''),
  coalesce(u.raw_user_meta_data->>'full_name', ''),
  coalesce(u.raw_user_meta_data->>'role', 'ADMIN'),
  '00000000-0000-0000-0000-000000000001',
  true
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null
on conflict (id) do nothing;
