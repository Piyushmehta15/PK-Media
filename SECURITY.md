# PK Media — Security Guide

> This document describes the security model, what is already hardened,
> and what is required before production. It is not a claim that the
> application is "unhackable" — no web application is. It is an honest
> description of the trust model and controls.

## 1. Trust model

```
BROWSER      = UNTRUSTED
FRONTEND     = UNTRUSTED
SERVER       = TRUST BOUNDARY
DATABASE     = PROTECTED
SECRETS      = SERVER ONLY
```

Never make a security decision solely in React. The frontend may hide
controls, but the server must authorize every action.

## 2. Where secrets belong

- **NEVER** in frontend React components, `public/`, `src/config/`,
  `localStorage`, or any client bundle.
- **NEVER** prefix a secret with `VITE_` (anything prefixed `VITE_` is
  bundled into the client and publicly readable).
- Server-only secrets (LLM keys, Supabase service-role key, payment
  secrets, email/WhatsApp tokens) live in server environment variables
  and are read by the backend / edge functions only.
- `.env` files are git-ignored. Copy `.env.example` to `.env.local` on
  the server and fill real values there. **Never commit `.env`.**

## 3. Environment variables

See `.env.example` for the full list. Public flags use `VITE_`; secrets
do not. The server is authoritative for enforcement (e.g. a `VITE_AI_ENABLED`
flag is a UI hint only — the server must independently enforce `AI_ENABLED`).

## 4. Authentication architecture

- **Development (current):** demo auth maps fixed emails to mock users.
  Roles are stored in React state and are **never trusted**.
- **Production:** use Supabase Auth (email/password or OAuth) with secure,
  HttpOnly cookies. The server derives identity from the session; the
  browser never supplies the role, user id, or client id.
- Client-side login lockout (8 attempts / 60s) is a demo guard only; the
  server must enforce authoritative rate limits and account lockout.

## 5. Authorization / RBAC

- Roles: `ADMIN`, `MANAGER`, `OUTREACH`, `EDITOR`, `FINANCE`, `CLIENT`.
- Permission map: `src/os/auth/permissions.ts`.
- The UI uses `can(permission)` to hide controls (defense in depth).
- **The server must re-verify** ownership on every request. A CLIENT must
  never read another client's data by changing an ID in the URL/request.
- Never trust `role`, `ownerId`, or `campaignId` supplied by the browser.

## 6. API security

- All API routes require authentication.
- Enforce row-level authorization (ownership + role) per resource.
- Use CSRF protection for state-changing requests (when state is
  cookie/session based).
- Validate every input server-side (see `src/os/security/validate.ts`
  for the same rules the server should replicate).
- Never return stack traces, SQL, or internal paths to clients.

## 7. AI cost & abuse controls

The AI service (`src/os/services/aiService.ts`) is provider-agnostic and
contains **no API keys**. In production, AI calls go through a server
endpoint that **must** enforce:

- Authentication + authorization
- Per-user and per-role rate limits
- Request size limit (input chars)
- Max output token limit
- Daily and monthly usage limits and budgets
- Usage logging + abuse detection
- A global **emergency kill switch**: `AI_ENABLED=false` disables AI
  immediately without taking down the site. The server enforces this;
  the client only reflects it (`src/os/security/appConfig.ts`).

## 8. Financial safety

- Financial totals shown in the Profit Calculator are **planning only** and
  never stored or trusted for billing.
- In production, revenue, costs, invoices, payments, and profit are
  computed **server-side** from the database.
- Never trust `price`, `amount`, `profit`, or `payment status` from the browser.

## 9. File upload security

When uploads are added:

- Restrict allowed file types and size.
- Generate safe, random filenames (never user-supplied names).
- Store outside the public web directory.
- Serve via authenticated, authorization-checked routes.
- Never expose private documents through predictable URLs.

## 10. Security headers & clickjacking

Meta-level headers are set in `index.html` (X-Content-Type-Options,
Referrer-Policy, Permissions-Policy). For production, enforce at the
hosting layer: `Content-Security-Policy` (test carefully against fonts
and third-party scripts), `Strict-Transport-Security`, and
`frame-ancestors 'none'` (or `self`) on authenticated pages to prevent
clickjacking.

## 11. Session security

Production: secure HttpOnly cookies, short TTL, logout, session
revocation, and account lockout after repeated failures. Do not store
auth secrets in `localStorage`.

## 12. Database security (Supabase)

- Enable **Row Level Security** on every table.
- Use least-privilege roles; the client uses the public anon key only.
- The service-role key lives **only** on the server.
- Design policies around `user`, `organization`, `role`, and ownership.

## 13. Public website forms

Contact form, creator application, and strategy-call form are protected
against spam/abuse at the server: rate limiting per IP, bot protection,
request size limits, and input validation. The client uses
`src/os/security/validate.ts` for basic checks.

## 14. Audit logging

Security-sensitive events are logged via `src/os/security/audit.ts`
(login success/failure, logout, role/permission changes, finance changes,
document access, AI usage, deletions). In production these must be
persisted to a server-side, access-controlled, append-only store.
**Never log passwords, tokens, or secrets.**

## 15. Deployment security

- Set secure HTTP headers in the hosting config (see section 10).
- Enable HTTPS with HSTS.
- Keep dependencies updated; run `npm audit` before release.
- Rotate and scope credentials; use per-service keys.
- Configure a monitoring / alerting channel for suspicious activity.

## 16. Incident response (basics)

1. **Identify** — detect suspicious activity (abuse, data access).
2. **Contain** — revoke sessions, rotate keys, flip `AI_ENABLED=false`.
3. **Eradicate** — remove the root cause.
4. **Recover** — restore from verified backups.
5. **Review** — document, update controls, notify affected parties as required.

## 17. Supabase integration (implemented)

The OS now ships with a complete, client-safe Supabase architecture:

- **Client** (`src/lib/supabase.ts`): uses only the public **anon key**.
  The service-role key is never imported into the frontend.
- **Switch** (`src/os/config/dataSource.ts`): `mock` ⇄ `supabase` is
  driven entirely by `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
  No app code changes needed to switch.
- **Migrations** (`supabase/migrations/`): reproducible schema, RLS,
  storage, and seed.
- **RLS** on every table, org-scoped + role-based, **no `USING (true)`**.
- **Supabase Auth**: email/password, session persistence + refresh,
  password reset (`/app/reset-password`), auto profile creation.
- **RBAC**: role & org come from the database profile, re-checked by RLS.
- **Service layer** (`src/os/services/`): auth, domain, activity/audit
  logging, AI usage tracking, storage.
- **Private storage buckets** with signed URLs; no public bucket access.
- **Audit logging** persisted to `activity_logs` (RLS-protected).
- **AI usage** tracked to `ai_usage` (rate/cost/budget readiness).

See `docs/SUPABASE_SETUP.md` for manual connect steps.

### 17a. Security hardening migration (`20240101000005_security_hardening.sql`)

Result of the STEP 3.5 audit. Applies the following fixes:

- **`promote_user_to_admin`** is `SECURITY DEFINER` but was callable by
  any authenticated user. It now checks that the caller is an active
  `ADMIN` before promoting anyone, and `EXECUTE` is revoked from
  `public` (anon can never call it). This removes a privilege-escalation
  vector.
- **`activity_logs` insert** policy now requires `user_id = auth.uid()`
  and `organization_id = current_org_id()`, blocking audit-log
  impersonation (a user can no longer write a log row under another
  user's ID).
- **`ai_usage` insert** policy now requires `user_id = auth.uid()` and
  `organization_id = current_org_id()`, blocking usage-stats
  impersonation.
- `storage_owned_by_org` now rejects paths without an org prefix
  (`path like '%/%'`), so a root-level object can never be read cross-org.
- Helper functions (`current_user_role`, `current_org_id`,
  `current_user_active`, `handle_new_user`, `touch_updated_at`) now set
  `search_path = public, pg_catalog` to mitigate search-path hijacking.

**Still required before production (not fake-able):** server-side rate
limiting, CSRF, secure HttpOnly cookies, HTTP-layer security headers,
immutable append-only audit storage, and server-authoritative AI/payment
execution.

## 18. Current status (frontend foundation)

Implemented in the current codebase:

- `.gitignore` (secrets/build/deps ignored)
- `.env.example` (public flags only; server secrets never in frontend)
- Input validation + sanitization module
- AI kill switch + client-side guardrails
- Audit logging abstraction (frontend) + `activity_logs` (Supabase)
- Login attempt lockout (demo-level)
- Finance input validation
- Meta security headers in `index.html`
- `npm audit` clean (0 vulnerabilities)
- Supabase client-safe integration (anon key only) + RLS + RBAC + storage

**Not yet implemented (production-required):** server-side rate limiting,
CSRF, secure cookies, HTTP-layer security headers, immutable audit storage,
server-authoritative AI/payment execution.
