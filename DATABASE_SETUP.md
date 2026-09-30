# Feedback database setup

The application uses Supabase for email/password accounts, module progress, learning activity, and feedback. Visitors must sign in to use the app. Learning markdown and images are static files, however, so direct file URLs remain public.

1. Create a Supabase project.
2. Open the Supabase SQL Editor and run `supabase-feedback.sql`, then run `supabase-accounts.sql`.
3. In **Authentication → Providers**, enable the Email provider and email confirmations.
4. In **Authentication → URL Configuration**, set the Site URL to `http://localhost:8001` for local testing, and add `http://localhost:8001/**` to the allowed redirect URLs. Add the production site URL there before deploying.
5. In Project Settings, copy the project URL and the publishable (or legacy `anon`) key. Never use a `service_role` or secret key in this static website.
6. Put the URL and publishable key in `feedback-config.js` as `supabaseUrl` and `supabaseAnonKey`.
7. Run the site over HTTP, create an account, and confirm the email. Password reset links return to the same site URL. Check `user_module_progress` and `user_learning_activity` for private learning records; review comments in `module_feedback`.

The browser key is public by design. Row-level security limits users to their own progress/activity and blocks reading individual feedback comments. Feedback totals are returned by a count-only function. Public module files remain accessible without signing in; a private-content requirement would need a server or authenticated storage layer.