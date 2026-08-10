-- ============================================================
-- PK MEDIA OS — Row Level Security policies
-- CRITICAL. Every application table has real policies. No
-- USING (true). Access is scoped by organization_id and role,
-- derived server-side from auth.uid() -> profiles. The browser
-- never supplies role or organization_id.
--
-- Helper functions (security definer) resolve the caller's
-- organization and role from the trusted profiles table.
-- ============================================================

-- ---------- helper: current user's role (read-only) ----------
create or replace function public.current_user_role()
returns text
language sql
stable
security definer set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- ---------- helper: current user's organization ----------
create or replace function public.current_org_id()
returns uuid
language sql
stable
security definer set search_path = public
as $$
  select organization_id from public.profiles where id = auth.uid();
$$;

-- ---------- helper: is the user active? ----------
create or replace function public.current_user_active()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select is_active from public.profiles where id = auth.uid();
$$;

-- ============================================================
-- organizations
-- A user can only read their own organization. Only ADMIN can update.
-- ============================================================
alter table public.organizations enable row level security;
create policy org_select_own on public.organizations
  for select using (public.current_user_active() and id = public.current_org_id());
create policy org_update_own on public.organizations
  for update using (public.current_user_active() and public.current_user_role() = 'ADMIN' and id = public.current_org_id());

-- ============================================================
-- profiles
-- A user can read their own profile and profiles in their org.
-- Only ADMIN can update roles/org. Users can update their own basics.
-- ============================================================
alter table public.profiles enable row level security;
create policy "Users can read own profile" on public.profiles
  for select to authenticated
  using (id = auth.uid());
create policy profile_select_own on public.profiles
  for select using (public.current_user_active() and organization_id = public.current_org_id());
create policy profile_update_self on public.profiles
  for update using (id = auth.uid())
  with check (id = auth.uid() and organization_id = public.current_org_id());
create policy profile_update_admin_role on public.profiles
  for update using (public.current_user_active() and public.current_user_role() = 'ADMIN' and organization_id = public.current_org_id());

-- ============================================================
-- Generic org-scoped helper policies per resource.
-- Role matrix (server-side, enforced via security definer):
--   ADMIN   -> full access to org
--   MANAGER -> full operational access to org
--   OUTREACH-> influencers + outreach + follow_ups
--   EDITOR  -> campaigns(deliverables) assigned to user
--   FINANCE -> finance + read of related
--   CLIENT  -> only brands/campaigns assigned to that client
-- ============================================================

-- ---------- brands ----------
alter table public.brands enable row level security;
create policy brands_select_own_org on public.brands
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and (
      public.current_user_role() in ('ADMIN','MANAGER','OUTREACH','EDITOR','FINANCE')
      or id = (select client from public.campaigns where client = id limit 1)  -- client sees brands they have campaigns with
    )
  );
create policy brands_insert_own_org on public.brands
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );
create policy brands_update_own_org on public.brands
  for update using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );
create policy brands_delete_own_org on public.brands
  for delete using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );

-- ---------- influencers ----------
alter table public.influencers enable row level security;
create policy influencers_select_own_org on public.influencers
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH','EDITOR','FINANCE')
  );
create policy influencers_insert_own_org on public.influencers
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH')
  );
create policy influencers_update_own_org on public.influencers
  for update using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH')
  );
create policy influencers_delete_own_org on public.influencers
  for delete using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );

-- ---------- campaigns ----------
alter table public.campaigns enable row level security;
create policy campaigns_select_own_org on public.campaigns
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and (
      public.current_user_role() in ('ADMIN','MANAGER','OUTREACH','EDITOR','FINANCE')
      -- CLIENT: only campaigns tied to brands they are a client of.
      or (public.current_user_role() = 'CLIENT' and client in (
        select id from public.brands where id = campaigns.client
        and id = (select client from public.campaigns where client = campaigns.client limit 1)
      ))
    )
  );
create policy campaigns_insert_own_org on public.campaigns
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );
create policy campaigns_update_own_org on public.campaigns
  for update using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );
create policy campaigns_delete_own_org on public.campaigns
  for delete using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );

-- ---------- campaign_influencers ----------
alter table public.campaign_influencers enable row level security;
create policy ci_select_own_org on public.campaign_influencers
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH','EDITOR','FINANCE')
  );
create policy ci_insert_own_org on public.campaign_influencers
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH')
  );
create policy ci_update_own_org on public.campaign_influencers
  for update using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH')
  );
create policy ci_delete_own_org on public.campaign_influencers
  for delete using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );

-- ---------- outreach ----------
alter table public.outreach enable row level security;
create policy outreach_select_own_org on public.outreach
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH','EDITOR','FINANCE')
  );
create policy outreach_insert_own_org on public.outreach
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH')
  );
create policy outreach_update_own_org on public.outreach
  for update using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH')
  );
create policy outreach_delete_own_org on public.outreach
  for delete using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH')
  );

-- ---------- follow_ups ----------
alter table public.follow_ups enable row level security;
create policy followups_select_own_org on public.follow_ups
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH','EDITOR','FINANCE')
  );
create policy followups_insert_own_org on public.follow_ups
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH')
  );
create policy followups_update_own_org on public.follow_ups
  for update using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH')
  );
create policy followups_delete_own_org on public.follow_ups
  for delete using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH')
  );

-- ---------- deliverables ----------
alter table public.deliverables enable row level security;
create policy deliverables_select_own_org on public.deliverables
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH','EDITOR','FINANCE')
  );
create policy deliverables_insert_own_org on public.deliverables
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','EDITOR')
  );
create policy deliverables_update_own_org on public.deliverables
  for update using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH','EDITOR')
  );
create policy deliverables_delete_own_org on public.deliverables
  for delete using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );

-- ---------- deliverable_results ----------
alter table public.deliverable_results enable row level security;
create policy dr_select_own_org on public.deliverable_results
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH','EDITOR','FINANCE')
  );
create policy dr_insert_own_org on public.deliverable_results
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','EDITOR')
  );
create policy dr_update_own_org on public.deliverable_results
  for update using (public.current_user_active() and organization_id = public.current_org_id());
create policy dr_delete_own_org on public.deliverable_results
  for delete using (public.current_user_active() and organization_id = public.current_org_id());

-- ---------- proposals ----------
alter table public.proposals enable row level security;
create policy proposals_select_own_org on public.proposals
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','FINANCE')
  );
create policy proposals_insert_own_org on public.proposals
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );
create policy proposals_update_own_org on public.proposals
  for update using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );
create policy proposals_delete_own_org on public.proposals
  for delete using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );

-- ---------- contracts ----------
alter table public.contracts enable row level security;
create policy contracts_select_own_org on public.contracts
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','FINANCE')
  );
create policy contracts_insert_own_org on public.contracts
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );
create policy contracts_update_own_org on public.contracts
  for update using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );
create policy contracts_delete_own_org on public.contracts
  for delete using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );

-- ---------- invoices ----------
alter table public.invoices enable row level security;
create policy invoices_select_own_org on public.invoices
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','FINANCE')
  );
create policy invoices_insert_own_org on public.invoices
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','FINANCE')
  );
create policy invoices_update_own_org on public.invoices
  for update using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','FINANCE')
  );
create policy invoices_delete_own_org on public.invoices
  for delete using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );

-- ---------- payments ----------
alter table public.payments enable row level security;
create policy payments_select_own_org on public.payments
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','FINANCE')
  );
create policy payments_insert_own_org on public.payments
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','FINANCE')
  );
create policy payments_update_own_org on public.payments
  for update using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','FINANCE')
  );
create policy payments_delete_own_org on public.payments
  for delete using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );

-- ---------- expenses ----------
alter table public.expenses enable row level security;
create policy expenses_select_own_org on public.expenses
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','FINANCE')
  );
create policy expenses_insert_own_org on public.expenses
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','FINANCE')
  );
create policy expenses_update_own_org on public.expenses
  for update using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','FINANCE')
  );
create policy expenses_delete_own_org on public.expenses
  for delete using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );

-- ---------- meetings ----------
alter table public.meetings enable row level security;
create policy meetings_select_own_org on public.meetings
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','OUTREACH','EDITOR','FINANCE')
  );
create policy meetings_insert_own_org on public.meetings
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );
create policy meetings_update_own_org on public.meetings
  for update using (public.current_user_active() and organization_id = public.current_org_id());
create policy meetings_delete_own_org on public.meetings
  for delete using (public.current_user_active() and organization_id = public.current_org_id());

-- ---------- notifications (scoped to the receiving user) ----------
alter table public.notifications enable row level security;
create policy notifications_select_own on public.notifications
  for select using (public.current_user_active() and user_id = auth.uid());
create policy notifications_update_own on public.notifications
  for update using (public.current_user_active() and user_id = auth.uid());
create policy notifications_delete_own on public.notifications
  for delete using (public.current_user_active() and user_id = auth.uid());

-- ---------- documents ----------
alter table public.documents enable row level security;
-- Access = org member AND role in access_roles (or admin/manager).
create policy documents_select_own_org on public.documents
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and (
      public.current_user_role() in ('ADMIN','MANAGER')
      or public.current_user_role() = any(access_roles)
    )
  );
create policy documents_insert_own_org on public.documents
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER','EDITOR','FINANCE')
  );
create policy documents_update_own_org on public.documents
  for update using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );
create policy documents_delete_own_org on public.documents
  for delete using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );

-- ---------- activity_logs (ADMIN/MANAGER read; service writes) ----------
alter table public.activity_logs enable row level security;
create policy activity_select_own_org on public.activity_logs
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );
-- Insert allowed for any active org member (self/logged actions).
create policy activity_insert_own_org on public.activity_logs
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
  );

-- ---------- ai_usage (ADMIN/MANAGER read; user sees own; insert own) ----------
alter table public.ai_usage enable row level security;
create policy ai_usage_select_own_org on public.ai_usage
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and (user_id = auth.uid() or public.current_user_role() in ('ADMIN','MANAGER'))
  );
create policy ai_usage_insert_own on public.ai_usage
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and user_id = auth.uid()
  );

-- ---------- team_assignments (ADMIN/MANAGER manage) ----------
alter table public.team_assignments enable row level security;
create policy team_assign_select_own_org on public.team_assignments
  for select using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );
create policy team_assign_insert_own_org on public.team_assignments
  for insert with check (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );
create policy team_assign_update_own_org on public.team_assignments
  for update using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );
create policy team_assign_delete_own_org on public.team_assignments
  for delete using (
    public.current_user_active()
    and organization_id = public.current_org_id()
    and public.current_user_role() in ('ADMIN','MANAGER')
  );
