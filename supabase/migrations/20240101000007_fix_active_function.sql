-- Correct the current_user_active function to assign the selected value using INTO
create or replace function public.current_user_active()
returns boolean
language plpgsql
stable
security definer set search_path = public, pg_catalog
as $$
declare
  v_active boolean;
begin
  select is_active into v_active from public.profiles where id = auth.uid();
  return coalesce(v_active, false);
end;
$$;
