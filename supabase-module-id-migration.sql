alter table public.user_module_progress
  drop constraint if exists user_module_progress_module_id_check;
alter table public.user_module_progress
  add constraint user_module_progress_module_id_check
  check (module_id ~ '^day-[1-9][0-9]*$');

alter table public.user_learning_activity
  drop constraint if exists user_learning_activity_module_id_check;
alter table public.user_learning_activity
  add constraint user_learning_activity_module_id_check
  check (module_id ~ '^day-[1-9][0-9]*$');

alter table public.module_feedback
  drop constraint if exists module_feedback_module_id_check;
alter table public.module_feedback
  add constraint module_feedback_module_id_check
  check (module_id ~ '^day-[1-9][0-9]*$');