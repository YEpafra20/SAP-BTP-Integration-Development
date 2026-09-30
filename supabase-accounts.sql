create table if not exists public.user_module_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null check (module_id in ('day-1', 'day-2', 'day-3', 'day-4')),
  full_name text,
  completed_at timestamptz not null default now(),
  primary key (user_id, module_id)
);

alter table public.user_module_progress add column if not exists full_name text;

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
  full_name text,
  visited_at timestamptz not null default now()
);

alter table public.user_learning_activity add column if not exists full_name text;

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

create table if not exists public.account_access_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(btrim(full_name)) between 1 and 120),
  email text not null check (char_length(email) <= 254 and email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  message text not null default '' check (char_length(message) <= 500),
  created_at timestamptz not null default now()
);

alter table public.account_access_requests add column if not exists full_name text not null default '';

create unique index if not exists account_access_requests_email_uidx
  on public.account_access_requests (lower(email));

alter table public.account_access_requests enable row level security;
revoke all on table public.account_access_requests from anon, authenticated;
grant insert on table public.account_access_requests to anon;

drop policy if exists "Submit account access requests" on public.account_access_requests;
create policy "Submit account access requests"
  on public.account_access_requests for insert to anon
  with check (email <> '');

update public.user_module_progress as progress
set full_name = nullif(btrim(user_record.raw_user_meta_data ->> 'full_name'), '')
from auth.users as user_record
where user_record.id = progress.user_id
  and progress.full_name is distinct from nullif(btrim(user_record.raw_user_meta_data ->> 'full_name'), '');

update public.user_learning_activity as activity
set full_name = nullif(btrim(user_record.raw_user_meta_data ->> 'full_name'), '')
from auth.users as user_record
where user_record.id = activity.user_id
  and activity.full_name is distinct from nullif(btrim(user_record.raw_user_meta_data ->> 'full_name'), '');

revoke insert on table public.module_feedback from anon;
grant insert on table public.module_feedback to authenticated;
drop policy if exists "Allow feedback submissions" on public.module_feedback;
drop policy if exists "Allow signed-in feedback submissions" on public.module_feedback;
create policy "Allow signed-in feedback submissions"
  on public.module_feedback for insert to authenticated
  with check (true);