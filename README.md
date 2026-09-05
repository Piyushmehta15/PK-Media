# PK Media — Growth Agency Website + OS

A premium, conversion-focused marketing website for **PK Media** plus a role-based **Creator Growth OS** for managing brands, influencers, campaigns, outreach, deliverables, and finance.

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

Without Supabase credentials the app runs in **mock mode**. On the login page use one of the demo accounts:

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

The OS ships with a real **Supabase** backend that activates automatically when credentials are present. Without them it stays fully functional in mock mode.

```bash
cp .env.example .env.local
# fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
```

See **`docs/SUPABASE_SETUP.md`** for the full, step-by-step connect guide (CLI, migrations, RLS, buckets, admin setup).

> **Security:** only the public **anon key** is used in the frontend. The service-role key must never appear in the browser or in any `VITE_*` variable.

---

## Clean Codebase & Project Architecture

The project is structured into clear, decoupled modules so developers can easily find, edit, and extend features without navigating through monolithic files:

```
src/
├── App.tsx                     # Top-level router (< 15 lines)
├── main.tsx                    # React DOM entry point & providers
├── styles.css                  # Global website styles & theme tokens
│
├── config/                     # Static configuration & content source of truth
│   └── site.ts                 # Company info, packages, services, copy, prices
│
├── lib/                        # Shared client instances
│   └── supabase.ts             # Supabase client initialization (anon key)
│
├── website/                    # Public Agency Marketing Website
│   ├── components/             # Reusable UI elements (Header, Footer, Icon, BrandMark, etc.)
│   ├── forms/                  # Lead capture & creator application forms + formService
│   ├── pages/                  # Landing page entry (`HomePage.tsx`)
│   ├── sections/               # Individual modular landing page sections (Hero, Packages, etc.)
│   ├── types/                  # TypeScript definitions (`website.types.ts`)
│   └── utils/                  # Navigation & smooth scroll helpers
│
└── os/                         # Creator Growth OS (Portal at `/app`)
    ├── auth/                   # AuthContext, ProtectedRoute, RBAC permissions
    ├── components/             # OS Shell & Layout components
    ├── config/                 # Data source config (mock ⇄ Supabase)
    ├── data/                   # Types, mock database, Supabase database types
    ├── pages/                  # OS pages (Dashboard, Brands, Influencers, Campaigns, etc.)
    ├── security/               # Form validation, app config, audit logging
    ├── services/               # Auth, domain, storage, and AI usage services
    ├── styles/                 # OS specific styles (`os.css`)
    └── ui/                     # OS UI kit components
```

---

## Developer Guide: Where to edit

- **Content & Copy (Packages, pricing, contact, services)** → `src/config/site.ts`
- **Landing Page Sections & UI** → `src/website/sections/` and `src/website/components/`
- **Lead / Contact Forms** → `src/website/forms/`
- **Theme Colors & Global Styles** → `src/styles.css` (`:root` variables)
- **Agency OS Pages & Logic** → `src/os/pages/` and `src/os/services/`
- **Brand Assets & Logos** → `public/brand/`
- **Database Schema & RLS Policies** → `supabase/migrations/`

---

## Security

See **`SECURITY.md`** for the full security model: trust boundaries, RBAC, RLS, AI kill switch, financial safety, file upload rules, and audit logging. The OS uses org-scoped, role-based Row Level Security and never passes private secrets to the browser.
