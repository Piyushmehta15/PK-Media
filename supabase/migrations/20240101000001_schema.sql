-- ============================================================
-- PK MEDIA OS — Schema migration
-- Created via reproducible SQL. All tables are RLS-protected.
-- Data is scoped to organization_id. Roles come from profiles.
-- Never log secrets. No USING (true) production policies.
-- ============================================================

-- ---------- extensions ----------
create extension if not exists "pgcrypto";       -- gen_random_uuid()
create extension if not exists "uuid-ossp";

-- ---------- organizations ----------
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- profiles (extends auth.users) ----------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  avatar_url text,
  role text not null default 'CLIENT'
    check (role in ('ADMIN','MANAGER','OUTREACH','EDITOR','FINANCE','CLIENT')),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_org_idx on public.profiles(organization_id);
create index profiles_role_idx on public.profiles(role);

-- Auto-create a profile row when a new auth user signs up.
-- The default org is resolved by the provided metadata; without it,
-- the user is inactive until an ADMIN assigns an organization.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
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

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------- brands ----------
create table public.brands (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  contact_person text not null default '',
  email text not null default '',
  phone text not null default '',
  website text not null default '',
  industry text not null default '',
  budget text not null default '',
  active_campaigns integer not null default 0 check (active_campaigns >= 0),
  previous_campaigns integer not null default 0 check (previous_campaigns >= 0),
  notes text not null default '',
  payment_status text not null default 'pending'
    check (payment_status in ('pending','partial','paid')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index brands_org_idx on public.brands(organization_id);

-- ---------- influencers ----------
create table public.influencers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  username text not null default '',
  platform text not null default 'Instagram'
    check (platform in ('Instagram','YouTube','TikTok','LinkedIn','X')),
  niche text not null default '',
  location text not null default '',
  followers bigint not null default 0 check (followers >= 0),
  engagement_rate numeric not null default 0 check (engagement_rate >= 0),
  email text not null default '',
  phone text not null default '',
  rate numeric not null default 0 check (rate >= 0),
  status text not null default 'New'
    check (status in ('New','Contacted','Replied','Negotiating','Confirmed','Completed','Rejected')),
  notes text not null default '',
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index influencers_org_idx on public.influencers(organization_id);
create index influencers_status_idx on public.influencers(status);
create index influencers_platform_idx on public.influencers(platform);

-- ---------- campaigns ----------
create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  client uuid not null references public.brands(id) on delete restrict,
  budget numeric not null default 0 check (budget >= 0),
  start_date date,
  end_date date,
  status text not null default 'Planning'
    check (status in ('Planning','Outreach','Negotiation','Content','Approval','Live','Completed','Cancelled')),
  content_status integer not null default 0 check (content_status between 0 and 100),
  revenue numeric not null default 0 check (revenue >= 0),
  expenses numeric not null default 0 check (expenses >= 0),
  results_reach bigint not null default 0 check (results_reach >= 0),
  results_views bigint not null default 0 check (results_views >= 0),
  results_engagement numeric not null default 0 check (results_engagement >= 0),
  results_conversions integer not null default 0 check (results_conversions >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index campaigns_org_idx on public.campaigns(organization_id);
create index campaigns_client_idx on public.campaigns(client);
create index campaigns_status_idx on public.campaigns(status);

-- ---------- campaign_influencers ----------
create table public.campaign_influencers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  influencer_id uuid not null references public.influencers(id) on delete cascade,
  fee numeric not null default 0 check (fee >= 0),
  status text not null default 'New'
    check (status in ('New','Contacted','Replied','Negotiating','Confirmed','Completed','Rejected')),
  created_at timestamptz not null default now()
);
create index campaign_influencers_org_idx on public.campaign_influencers(organization_id);
create index campaign_influencers_campaign_idx on public.campaign_influencers(campaign_id);
create index campaign_influencers_influencer_idx on public.campaign_influencers(influencer_id);

-- ---------- outreach ----------
create table public.outreach (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  influencer_id uuid not null references public.influencers(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete set null,
  subject text not null default '',
  message text not null default '',
  channel text not null default 'email' check (channel in ('email','whatsapp','dm')),
  status text not null default 'draft' check (status in ('draft','sent','replied','no_reply')),
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index outreach_org_idx on public.outreach(organization_id);
create index outreach_influencer_idx on public.outreach(influencer_id);
create index outreach_campaign_idx on public.outreach(campaign_id);

-- ---------- follow_ups ----------
create table public.follow_ups (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  influencer_id uuid not null references public.influencers(id) on delete cascade,
  outreach_id uuid references public.outreach(id) on delete set null,
  due_date date not null,
  note text not null default '',
  status text not null default 'Pending' check (status in ('Pending','Done','Skipped')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index follow_ups_org_idx on public.follow_ups(organization_id);
create index follow_ups_influencer_idx on public.follow_ups(influencer_id);
create index follow_ups_status_idx on public.follow_ups(status);

-- ---------- deliverables ----------
create table public.deliverables (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  influencer_id uuid not null references public.influencers(id) on delete cascade,
  title text not null,
  type text not null default 'UGC',
  status text not null default 'Pending'
    check (status in ('Pending','In Progress','Submitted','Approved','Rejected')),
  due_date date,
  link text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index deliverables_org_idx on public.deliverables(organization_id);
create index deliverables_campaign_idx on public.deliverables(campaign_id);
create index deliverables_influencer_idx on public.deliverables(influencer_id);

-- ---------- deliverable_results ----------
create table public.deliverable_results (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  deliverable_id uuid not null references public.deliverables(id) on delete cascade,
  result_type text not null default 'views',
  value numeric not null default 0 check (value >= 0),
  note text not null default '',
  created_at timestamptz not null default now()
);
create index deliverable_results_org_idx on public.deliverable_results(organization_id);
create index deliverable_results_deliverable_idx on public.deliverable_results(deliverable_id);

-- ---------- proposals ----------
create table public.proposals (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  brand_id uuid not null references public.brands(id) on delete cascade,
  title text not null,
  amount numeric not null default 0 check (amount >= 0),
  status text not null default 'Draft' check (status in ('Draft','Sent','Accepted','Declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index proposals_org_idx on public.proposals(organization_id);
create index proposals_brand_idx on public.proposals(brand_id);

-- ---------- contracts ----------
create table public.contracts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  brand_id uuid not null references public.brands(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete set null,
  title text not null,
  status text not null default 'Draft' check (status in ('Draft','Sent','Signed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index contracts_org_idx on public.contracts(organization_id);
create index contracts_brand_idx on public.contracts(brand_id);

-- ---------- invoices ----------
create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  brand_id uuid not null references public.brands(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete set null,
  number text not null unique,
  amount numeric not null default 0 check (amount >= 0),
  status text not null default 'Draft' check (status in ('Draft','Sent','Paid','Overdue')),
  issued_at date,
  due_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index invoices_org_idx on public.invoices(organization_id);
create index invoices_brand_idx on public.invoices(brand_id);

-- ---------- payments ----------
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  amount numeric not null default 0 check (amount >= 0),
  method text not null default 'Bank transfer',
  status text not null default 'Pending' check (status in ('Pending','Received','Overdue')),
  received_at timestamptz,
  created_at timestamptz not null default now()
);
create index payments_org_idx on public.payments(organization_id);
create index payments_invoice_idx on public.payments(invoice_id);

-- ---------- expenses ----------
create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  category text not null default 'Other'
    check (category in ('Influencer','Editor','Ads','Tools','Other')),
  amount numeric not null default 0 check (amount >= 0),
  note text not null default '',
  date date,
  created_at timestamptz not null default now()
);
create index expenses_org_idx on public.expenses(organization_id);

-- ---------- meetings ----------
create table public.meetings (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  date timestamptz not null,
  attendees text[] not null default '{}',
  type text not null default 'Internal'
    check (type in ('Discovery','Review','Standup','Client','Internal')),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index meetings_org_idx on public.meetings(organization_id);

-- ---------- notifications ----------
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  message text not null default '',
  read boolean not null default false,
  created_at timestamptz not null default now()
);
create index notifications_user_idx on public.notifications(user_id);
create index notifications_read_idx on public.notifications(read);

-- ---------- documents ----------
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  category text not null default 'Report'
    check (category in ('Contract','Invoice','Proposal','Campaign Asset','Report','Client')),
  brand_id uuid references public.brands(id) on delete set null,
  campaign_id uuid references public.campaigns(id) on delete set null,
  size text not null default '',
  storage_path text,
  uploaded_by uuid references public.profiles(id) on delete set null,
  access_roles text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index documents_org_idx on public.documents(organization_id);
create index documents_category_idx on public.documents(category);

-- ---------- activity_logs ----------
create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity text not null default '',
  entity_id text not null default '',
  created_at timestamptz not null default now()
);
create index activity_logs_org_idx on public.activity_logs(organization_id);
create index activity_logs_user_idx on public.activity_logs(user_id);

-- ---------- ai_usage ----------
create table public.ai_usage (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  provider text not null default 'mock',
  model text not null default '',
  request_type text not null default 'generic',
  request_count integer not null default 1 check (request_count >= 0),
  input_tokens integer not null default 0 check (input_tokens >= 0),
  output_tokens integer not null default 0 check (output_tokens >= 0),
  estimated_cost numeric not null default 0 check (estimated_cost >= 0),
  created_at timestamptz not null default now()
);
create index ai_usage_org_idx on public.ai_usage(organization_id);
create index ai_usage_user_idx on public.ai_usage(user_id);
create index ai_usage_created_idx on public.ai_usage(created_at);

-- ---------- team_assignments ----------
create table public.team_assignments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  entity text not null default 'campaign',   -- campaign | brand | deliverable
  entity_id uuid not null,
  role text not null default 'EDITOR',
  created_at timestamptz not null default now(),
  unique (organization_id, user_id, entity, entity_id)
);
create index team_assignments_org_idx on public.team_assignments(organization_id);
create index team_assignments_user_idx on public.team_assignments(user_id);
create index team_assignments_entity_idx on public.team_assignments(entity, entity_id);

-- ---------- updated_at trigger helper ----------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Apply updated_at triggers
do $$
declare t text;
begin
  foreach t in array array[
    'public.organizations','public.profiles','public.brands','public.influencers',
    'public.campaigns','public.outreach','public.follow_ups','public.deliverables',
    'public.proposals','public.contracts','public.invoices','public.meetings','public.documents'
  ]
  loop
    execute format('create trigger trg_touch_updated_at before update on %I.%I for each row execute function public.touch_updated_at();',
      split_part(t, '.', 1), split_part(t, '.', 2));
  end loop;
end $$;
