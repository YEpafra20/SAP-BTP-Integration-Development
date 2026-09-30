create table if not exists public.module_feedback (
  id uuid primary key default gen_random_uuid(),
  module_id text not null check (module_id in ('day-1', 'day-2', 'day-3', 'day-4')),
  is_useful boolean not null,
  comment text check (comment is null or char_length(comment) <= 1000),
  created_at timestamptz not null default now()
);

alter table public.module_feedback enable row level security;
revoke all on table public.module_feedback from anon, authenticated;
grant insert on table public.module_feedback to anon, authenticated;

drop policy if exists "Allow feedback submissions" on public.module_feedback;
create policy "Allow feedback submissions"
  on public.module_feedback
  for insert
  to anon, authenticated
  with check (true);

create or replace function public.get_module_feedback_counts(requested_module text)
returns table (useful_count bigint, not_useful_count bigint)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select
    count(*) filter (where is_useful) as useful_count,
    count(*) filter (where not is_useful) as not_useful_count
  from public.module_feedback
  where module_id = requested_module;
$$;

revoke all on function public.get_module_feedback_counts(text) from public;
grant execute on function public.get_module_feedback_counts(text) to anon, authenticated;