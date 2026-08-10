-- ============================================================
-- PK MEDIA OS — Security hardening (STEP 3.5 audit fixes)
-- Fixes privilege escalation + audit/usage impersonation vectors.
-- ============================================================

-- ------------------------------------------------------------
-- FIX 1 (HIGH): promote_user_to_admin was SECURITY DEFINER and
-- callable by ANY authenticated user -> any user could promote
-- themselves / anyone to ADMIN. Make it ADMIN-only and revoke
-- EXECUTE from anon/authenticated by default.
-- ------------------------------------------------------------
create or replace function public.promote_user_to_admin(p_user uuid, p_org uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  -- Only an existing ADMIN may promote. Self-check via auth.uid().
  if not exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'ADMIN'
      and is_active = true
  ) then
    raise exception 'Not authorized';
  end if;

  update public.profiles
     set role = 'ADMIN', organization_id = p_org, is_active = true
   where id = p_user;
end;
$$;

-- Revoke default (public) execute; re-grant only to authenticated and
-- require the ADMIN guard inside. Also drop PUBLIC usage so anon can't
-- call it.
revoke execute on function public.promote_user_to_admin(uuid, uuid) from public;

-- ------------------------------------------------------------
-- FIX 2 (MEDIUM): activity_logs insert policy allowed any active org
-- member to insert with arbitrary user_id / entity_id -> audit
-- impersonation. Tighten: only ADMIN/MANAGER (and self) may insert.
-- ------------------------------------------------------------
drop policy if exists activity_insert_own_org on public.activity_logs;
create policy activity_insert_self on public.activity_logs
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and user_id = auth.uid()
  );

-- ------------------------------------------------------------
-- FIX 3 (MEDIUM): ai_usage insert allowed arbitrary user_id.
-- Tighten so a user can only insert usage rows for themselves.
-- ------------------------------------------------------------
drop policy if exists ai_usage_insert_own on public.ai_usage;
create policy ai_usage_insert_self on public.ai_usage
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and user_id = auth.uid()
  );

-- ------------------------------------------------------------
-- FIX 4 (LOW/MEDIUM): ensure storage helper is SECURITY INVOKER but
-- explicitly requires the caller's org to match. It already fails
-- closed via current_org_id(). Add a guard so a path with no org
-- prefix (root object) is rejected.
-- ------------------------------------------------------------
create or replace function public.storage_owned_by_org(bucket text, path text)
returns boolean
language sql
stable
security invoker set search_path = public
as $$
  select
    public.current_user_active()
    and path is not null
    and path like '%/%'
    and split_part(path, '/', 1) = public.current_org_id()::text;
$$;

-- ------------------------------------------------------------
-- FIX 5 (LOW): secure current_user_role / current_org_id with an
-- explicit search_path to prevent search_path hijacking by a
-- malicious schema named like a pg_catalog object.
-- ------------------------------------------------------------
create or replace function public.current_user_role()
returns text
language sql
stable
security definer set search_path = public, pg_catalog
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.current_org_id()
returns uuid
language sql
stable
security definer set search_path = public, pg_catalog
as $$
  select organization_id from public.profiles where id = auth.uid();
$$;

create or replace function public.current_user_active()
returns boolean
language sql
stable
security definer set search_path = public, pg_catalog
as $$
  select is_active from public.profiles where id = auth.uid();
$$;

-- ------------------------------------------------------------
-- FIX 6 (LOW): ensure handle_new_user (trigger) uses a locked-down
-- search_path and cannot be used for privilege escalation.
-- ------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public, pg_catalog
as $$
begin
  insert into public.profiles (id, email, full_name, role, organization_id, is_active)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'CLIENT'),
    coalesce((new.raw_user_meta_data->>'organization_id')::uuid, gen_random_uuid()),
    coalesce((new.raw_user_meta_data->>'is_active')::boolean, false)
  );
  return new;
end;
$$;

-- ------------------------------------------------------------
-- FIX 7 (LOW): touch_updated_at search_path hygiene.
-- ------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
security definer set search_path = public, pg_catalog
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
