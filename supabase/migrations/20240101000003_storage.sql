-- ============================================================
-- PK MEDIA OS — Private storage buckets
-- Files are PRIVATE. No public access. Authenticated access only,
-- scoped to the caller's organization via a helper.
-- ============================================================

-- ---------- helper: current org id (reuse from rls migration) ----------
-- (defined in 20240101000002_rls.sql as public.current_org_id)

-- Create private buckets. They are created with public=false.
insert into storage.buckets (id, name, public) values
  ('contracts', 'contracts', false),
  ('invoices', 'invoices', false),
  ('proposals', 'proposals', false),
  ('campaign-assets', 'campaign-assets', false),
  ('reports', 'reports', false)
on conflict (id) do nothing;

-- ---------- helper: is the object path within the caller's org? ----------
-- Storage object names are stored as {organization_id}/{filename}.
create or replace function public.storage_owned_by_org(bucket text, path text)
returns boolean
language sql
stable
as $$
  select
    public.current_user_active()
    and split_part(path, '/', 1) = public.current_org_id()::text;
$$;

-- ---------- contracts: private, org-scoped ----------
create policy "contracts_read_org" on storage.objects
  for select using (bucket_id = 'contracts' and public.storage_owned_by_org(bucket_id, name));
create policy "contracts_insert_org" on storage.objects
  for insert with check (
    bucket_id = 'contracts'
    and public.current_user_active()
    and public.current_user_role() in ('ADMIN','MANAGER')
    and split_part(name, '/', 1) = public.current_org_id()::text
  );
create policy "contracts_delete_org" on storage.objects
  for delete using (bucket_id = 'contracts' and public.storage_owned_by_org(bucket_id, name));

-- ---------- invoices: private, org-scoped ----------
create policy "invoices_read_org" on storage.objects
  for select using (bucket_id = 'invoices' and public.storage_owned_by_org(bucket_id, name));
create policy "invoices_insert_org" on storage.objects
  for insert with check (
    bucket_id = 'invoices'
    and public.current_user_active()
    and public.current_user_role() in ('ADMIN','MANAGER','FINANCE')
    and split_part(name, '/', 1) = public.current_org_id()::text
  );
create policy "invoices_delete_org" on storage.objects
  for delete using (bucket_id = 'invoices' and public.storage_owned_by_org(bucket_id, name));

-- ---------- proposals: private, org-scoped ----------
create policy "proposals_read_org" on storage.objects
  for select using (bucket_id = 'proposals' and public.storage_owned_by_org(bucket_id, name));
create policy "proposals_insert_org" on storage.objects
  for insert with check (
    bucket_id = 'proposals'
    and public.current_user_active()
    and public.current_user_role() in ('ADMIN','MANAGER')
    and split_part(name, '/', 1) = public.current_org_id()::text
  );
create policy "proposals_delete_org" on storage.objects
  for delete using (bucket_id = 'proposals' and public.storage_owned_by_org(bucket_id, name));

-- ---------- campaign-assets: private, org-scoped ----------
create policy "campaign_assets_read_org" on storage.objects
  for select using (bucket_id = 'campaign-assets' and public.storage_owned_by_org(bucket_id, name));
create policy "campaign_assets_insert_org" on storage.objects
  for insert with check (
    bucket_id = 'campaign-assets'
    and public.current_user_active()
    and public.current_user_role() in ('ADMIN','MANAGER','EDITOR','OUTREACH')
    and split_part(name, '/', 1) = public.current_org_id()::text
  );
create policy "campaign_assets_delete_org" on storage.objects
  for delete using (bucket_id = 'campaign-assets' and public.storage_owned_by_org(bucket_id, name));

-- ---------- reports: private, org-scoped ----------
create policy "reports_read_org" on storage.objects
  for select using (bucket_id = 'reports' and public.storage_owned_by_org(bucket_id, name));
create policy "reports_insert_org" on storage.objects
  for insert with check (
    bucket_id = 'reports'
    and public.current_user_active()
    and public.current_user_role() in ('ADMIN','MANAGER','FINANCE')
    and split_part(name, '/', 1) = public.current_org_id()::text
  );
create policy "reports_delete_org" on storage.objects
  for delete using (bucket_id = 'reports' and public.storage_owned_by_org(bucket_id, name));
