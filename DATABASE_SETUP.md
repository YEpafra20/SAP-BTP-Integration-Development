# Feedback database setup

The module feedback form uses Supabase. Votes are collected per day module, and visitors can optionally submit a comment for the site owner. Anonymous visitors can submit feedback and read aggregate vote counts, but row-level security does not allow them to read individual comments.

1. Create a Supabase project.
2. Open the Supabase SQL Editor and run `supabase-feedback.sql`.
3. In Project Settings, copy the project URL and the publishable (or legacy `anon`) key. Never use a `service_role` or secret key in this static website.
4. Put the URL and publishable key in `feedback-config.js` as `supabaseUrl` and `supabaseAnonKey`.
5. Deploy the site and submit a test vote. Review private comments in the Supabase Table Editor under `module_feedback`.

The browser key is public by design. Row-level security limits it to inserts and the vote-count function; it cannot read comment rows. Public anonymous submissions can still be spammed, so add CAPTCHA or server-side rate limiting before relying on this for high-volume or sensitive feedback.