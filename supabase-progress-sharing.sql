-- Run this migration in the Supabase SQL Editor to show learner summary status
-- to signed-in users. This function exposes names and aggregate counts only.

drop function if exists public.get_opted_in_learner_progress();

create or replace function public.get_learner_progress_summary()
returns table (
  display_name text,
  completed_count integer,
  last_completed_at timestamptz
)
language sql
stable
security definer
set search_path = pg_catalog, auth
as $$
  select
    coalesce(
      nullif(btrim(users.raw_user_meta_data ->> 'full_name'), ''),
      nullif(btrim(progress.full_name), ''),
      'Learner'
    ) as display_name,
    coalesce(progress.completed_count, 0)::integer as completed_count,
    progress.last_completed_at
  from auth.users as users
  left join lateral (
    select
      count(*) filter (
        where module_progress.module_id ~ '^day-([1-9]|[12][0-9]|3[0-6])$'
      )::integer as completed_count,
      max(module_progress.completed_at) filter (
        where module_progress.module_id ~ '^day-([1-9]|[12][0-9]|3[0-6])$'
      ) as last_completed_at,
      max(module_progress.full_name) as full_name
    from public.user_module_progress as module_progress
    where module_progress.user_id = users.id
  ) as progress on true
  where auth.uid() is not null
  order by display_name;
$$;

revoke all on function public.get_learner_progress_summary() from public, anon;
grant execute on function public.get_learner_progress_summary() to authenticated;
