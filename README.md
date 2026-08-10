# PK Media — Growth Agency Website + OS

A premium, conversion-focused marketing website for **PK Media** plus a
role-based **Creator Growth OS** for managing brands, influencers,
campaigns, outreach, deliverables, and finance.

Built with **React + TypeScript + Vite + Tailwind CSS**.

---

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

- The **public website** loads at `/`.
- The **OS** (login + dashboard) loads at `/app`.

### Logging into the OS (mock mode)

Without Supabase credentials the app runs in **mock mode**. On the login
page use one of the demo accounts:

| Role | Email |
|---|---|
| ADMIN | `admin@pkmedia.in` |
| MANAGER | `manager@pkmedia.in` |
| OUTREACH | `outreach@pkmedia.in` |
| EDITOR | `editor@pkmedia.in` |
| FINANCE | `finance@pkmedia.in` |
| CLIENT | `client@pkmedia.in` |

---

## Production build

```bash
npm run build
npm run preview
```

---

## Enabling Supabase (optional)

The OS ships with a real **Supabase** backend that activates automatically
when credentials are present. Without them it stays fully functional in
mock mode.

```bash
cp .env.example .env.local
# fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
```

See **`docs/SUPABASE_SETUP.md`** for the full, step-by-step connect guide
(CLI, migrations, RLS, buckets, admin setup).

> **Security:** only the public **anon key** is used in the frontend. The
> service-role key must never appear in the browser or in any `VITE_*`
> variable.

---

## Project structure

```
src/
  App.tsx                 # public website (single-page sections)
  main.tsx
  config/site.ts          # public website editable content (company, packages, services)
  lib/supabase.ts         # client-safe Supabase client (anon key only)
  os/                     # Creator Growth OS (separate app under /app)
    config/dataSource.ts  # mock ⇄ supabase switch (env-driven)
    auth/                 # AuthContext, ProtectedRoute, permissions
    data/                 # types, mock DB, Supabase DB types
    services/             # auth, domain, audit, AI usage, storage, data
    security/             # validation, appConfig (AI kill switch), audit
    pages/                # dashboard, influencers, brands, campaigns, ...
    components/           # Shell, UI kit
    styles/os.css
supabase/
  migrations/             # schema, RLS, storage, seed
docs/
  SUPABASE_SETUP.md       # Supabase connect guide
```

---

## Where to edit content

- **Company info, packages, services, WhatsApp, social links** →
  `src/config/site.ts`
- **Brand colors** → `src/config/site.ts` (`brand`) and `src/styles.css`
  (`:root` tokens)
- **Logo** → replace files in `public/brand/` and update
  `src/config/site.ts` → `company.assets.logo`
- **Schema / RLS** → `supabase/migrations/`

---

## Security

See **`SECURITY.md`** for the full security model: trust boundaries, RBAC,
RLS, AI kill switch, financial safety, file upload rules, and audit
logging. The OS uses org-scoped, role-based Row Level Security and never
passes private secrets to the browser.
