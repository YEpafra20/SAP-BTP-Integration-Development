create table if not exists public.user_module_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null check (module_id in ('day-1', 'day-2', 'day-3', 'day-4')),
  completed_at timestamptz not null default now(),
  primary key (user_id, module_id)
);

alter table public.user_module_progress enable row level security;
revoke all on table public.user_module_progress from anon, authenticated;
grant select, insert, update, delete on table public.user_module_progress to authenticated;

drop policy if exists "Read own module progress" on public.user_module_progress;
create policy "Read own module progress"
  on public.user_module_progress for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Insert own module progress" on public.user_module_progress;
create policy "Insert own module progress"
  on public.user_module_progress for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Update own module progress" on public.user_module_progress;
create policy "Update own module progress"
  on public.user_module_progress for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Delete own module progress" on public.user_module_progress;
create policy "Delete own module progress"
  on public.user_module_progress for delete to authenticated
  using (auth.uid() = user_id);

create table if not exists public.user_learning_activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null check (module_id in ('day-1', 'day-2', 'day-3', 'day-4')),
  visited_at timestamptz not null default now()
);

create index if not exists user_learning_activity_user_visited_idx
  on public.user_learning_activity (user_id, visited_at desc);

alter table public.user_learning_activity enable row level security;
revoke all on table public.user_learning_activity from anon, authenticated;
grant select, insert on table public.user_learning_activity to authenticated;

drop policy if exists "Read own learning activity" on public.user_learning_activity;
create policy "Read own learning activity"
  on public.user_learning_activity for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Insert own learning activity" on public.user_learning_activity;
create policy "Insert own learning activity"
  on public.user_learning_activity for insert to authenticated
  with check (auth.uid() = user_id);

revoke insert on table public.module_feedback from anon;
grant insert on table public.module_feedback to authenticated;
drop policy if exists "Allow feedback submissions" on public.module_feedback;
drop policy if exists "Allow signed-in feedback submissions" on public.module_feedback;
create policy "Allow signed-in feedback submissions"
  on public.module_feedback for insert to authenticated
  with check (true);