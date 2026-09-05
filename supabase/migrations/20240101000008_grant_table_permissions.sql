-- ============================================================
-- PK MEDIA OS — Migration 08: Explicit DML table grants
-- Ensures authenticated role has table-level DML privileges,
-- with Row Level Security (RLS) policies governing row access.
-- ============================================================

grant select, insert, update, delete on public.brands to authenticated;
grant select, insert, update, delete on public.influencers to authenticated;
grant select, insert, update, delete on public.campaigns to authenticated;
grant select, insert, update, delete on public.campaign_influencers to authenticated;
grant select, insert, update, delete on public.deliverables to authenticated;
grant select, insert, update, delete on public.outreach to authenticated;
grant select, insert, update, delete on public.follow_ups to authenticated;
grant select, insert, update, delete on public.proposals to authenticated;
grant select, insert, update, delete on public.invoices to authenticated;
grant select, insert, update, delete on public.contracts to authenticated;
grant select, insert, update, delete on public.payments to authenticated;
grant select, insert, update, delete on public.expenses to authenticated;
grant select, insert, update, delete on public.meetings to authenticated;
grant select, insert, update, delete on public.notifications to authenticated;
grant select, insert, update, delete on public.documents to authenticated;
grant select, insert, update, delete on public.activity_logs to authenticated;

grant execute on function public.current_user_role() to authenticated;
grant execute on function public.current_org_id() to authenticated;
grant execute on function public.current_user_active() to authenticated;
