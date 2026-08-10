# PK Media OS — Supabase Setup & Connection Guide

This guide explains how to connect the PK Media OS to a real Supabase
project. **Nothing in this guide is required to run the app** — without
credentials the app runs fully in **mock mode** with demo data.

> **Security rule:** the frontend only ever uses the **public anon key**.
> The **service_role key** must never be placed in the browser or in any
> `VITE_*` variable. It lives only in your server / edge functions.

---

## 1. How the mock ↔ Supabase switch works

The switch is **entirely environment-driven** — no code changes:

| `VITE_SUPABASE_URL` | `VITE_SUPABASE_ANON_KEY` | Mode |
|---|---|---|
| (empty) | (empty) | **MOCK** — demo data, demo login |
| set | set | **SUPABASE** — real auth + RLS-protected data |

The switch is decided in:
- `src/lib/supabase.ts` — creates the client (or `null`)
- `src/os/config/dataSource.ts` — exports `dataSource = 'mock' | 'supabase'`

---

## 2. Files & migrations

All schema is versioned and reproducible under `supabase/migrations/`:

| File | Purpose |
|---|---|
| `20240101000001_schema.sql` | Tables, enums, triggers, indexes |
| `20240101000002_rls.sql` | **RLS policies** (org-scoped, role-based) |
| `20240101000003_storage.sql` | Private storage buckets + policies |
| `20240101000004_seed.sql` | PK Media org + demo brand + admin helper |

The migrations are meant to be applied with the **Supabase CLI**:

```bash
supabase db reset            # applies all migrations in order
# or
supabase db push             # apply pending migrations to linked project
```

---

## 3. Tables & RLS

Every table has **Row Level Security enabled** and **no `USING (true)`**
broad-access policy. Access is scoped to the caller's organization and
role via helper functions (`current_org_id()`, `current_user_role()`,
`current_user_active()`).

Tables created:

`profiles`, `organizations`, `brands`, `influencers`, `campaigns`,
`campaign_influencers`, `deliverables`, `outreach`, `follow_ups`,
`proposals`, `contracts`, `invoices`, `payments`, `expenses`,
`meetings`, `notifications`, `documents`, `activity_logs`, `ai_usage`.

---

## 4. Auth (Supabase Auth)

- Email/password sign in
- Session persistence + auto-refresh
- Password reset (`/app/reset-password`)
- Profile is auto-created on sign-up via a trigger
- Role & organization come from the **database profile**, never the browser

**Demo mode** (no Supabase) uses the demo accounts on the login page.

---

## 5. RBAC

Roles: `ADMIN`, `MANAGER`, `OUTREACH`, `EDITOR`, `FINANCE`, `CLIENT`.

- The UI gates controls via `can(permission)` (defense in depth).
- **The database re-authorizes** every query via RLS. A client can never
  read another client's rows by changing an ID.

---

## 6. Storage (private buckets)

Buckets: `contracts`, `invoices`, `proposals`, `campaign-assets`,
`reports` — all **private** (`public=false`).

- Object paths are `{organization_id}/{random-filename}`.
- Access requires an authenticated session and is checked by RLS.
- Files are served via short-lived signed URLs.

---

## 7. Manual connect steps

1. **Create a Supabase project** at https://supabase.com.
2. **Install the CLI** (if not present):
   ```bash
   npm i -g supabase
   supabase login
   ```
3. **Link your project**:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```
4. **Apply migrations** (creates tables, RLS, buckets, seed):
   ```bash
   supabase db push
   ```
5. **Copy the env template:**
   ```bash
   cp .env.example .env.local
   ```
6. **Fill in `.env.local`:**
   ```
   VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   VITE_SUPABASE_ANON_KEY=your-public-anon-key
   ```
   (Get the URL + anon key from **Project Settings → API**.)
7. **Restart the dev server** so the new env is loaded:
   ```bash
   npm run dev
   ```
8. **Make the first user an ADMIN.**
   - Sign up a user, then run (in Supabase SQL editor):
     ```sql
     select public.promote_user_to_admin('<auth-user-uuid>', '00000000-0000-0000-0000-000000000001');
     ```
   - or use the Settings page in the app to assign admin.

> **Never** put the `service_role` key in `.env.local`. The anon key is
> safe for the browser; the service role bypasses RLS and must stay
> server-side only.

---

## 8. Verify it's working

- The login page shows the **Supabase** mode (no "DEVELOPMENT MODE" badge).
- Signing in with a real account loads rows from your database.
- The floating "Supabase configured" indicator (if added) confirms the switch.

---

## 9. Keeping mock mode (default)

Simply **don't set** `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
The app stays fully functional with demo data and demo login.
