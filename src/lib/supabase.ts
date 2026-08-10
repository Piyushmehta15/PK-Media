// ============================================================
// PK MEDIA OS — Supabase client (client-safe)
// Uses ONLY the public anon key. NEVER import the service-role key
// here or anywhere in the frontend. All sensitive access is governed
// by Row Level Security on the server.
//
// When VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are absent, this
// returns null and the app runs in mock/development mode.
// ============================================================
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const SUPABASE_CONFIGURED = Boolean(url && anonKey)

export const supabase: SupabaseClient | null = SUPABASE_CONFIGURED
  ? createClient(url as string, anonKey as string)
  : null

/** Safe accessor — returns null when Supabase is not configured. */
export function getSupabase(): SupabaseClient | null {
  return supabase
}
