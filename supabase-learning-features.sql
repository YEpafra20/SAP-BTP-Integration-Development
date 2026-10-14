-- Run this migration in the Supabase SQL Editor to enable module bookmarks and quiz scores.

create table if not exists public.user_module_bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null check (module_id ~ '^day-[1-9][0-9]*$'),
  created_at timestamptz not null default now(),
  primary key (user_id, module_id)
);

alter table public.user_module_bookmarks enable row level security;
revoke all on table public.user_module_bookmarks from anon, authenticated;
grant select, insert, delete on table public.user_module_bookmarks to authenticated;

drop policy if exists "Read own module bookmarks" on public.user_module_bookmarks;
create policy "Read own module bookmarks"
  on public.user_module_bookmarks for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Insert own module bookmarks" on public.user_module_bookmarks;
create policy "Insert own module bookmarks"
  on public.user_module_bookmarks for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Delete own module bookmarks" on public.user_module_bookmarks;
create policy "Delete own module bookmarks"
  on public.user_module_bookmarks for delete to authenticated
  using (auth.uid() = user_id);

create table if not exists public.user_module_quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null check (module_id ~ '^day-[1-9][0-9]*$'),
  score smallint not null check (score >= 0),
  question_count smallint not null check (question_count between 1 and 100 and score <= question_count),
  attempted_at timestamptz not null default now()
);

create index if not exists user_module_quiz_attempts_user_module_attempted_idx
  on public.user_module_quiz_attempts (user_id, module_id, attempted_at desc);

alter table public.user_module_quiz_attempts enable row level security;
revoke all on table public.user_module_quiz_attempts from anon, authenticated;
grant select, insert on table public.user_module_quiz_attempts to authenticated;

drop policy if exists "Read own module quiz attempts" on public.user_module_quiz_attempts;
create policy "Read own module quiz attempts"
  on public.user_module_quiz_attempts for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Insert own module quiz attempts" on public.user_module_quiz_attempts;
create policy "Insert own module quiz attempts"
  on public.user_module_quiz_attempts for insert to authenticated
  with check (auth.uid() = user_id);
