// ============================================================
// PK MEDIA OS — Auth service
// Production: Supabase Auth (email/password, session, reset).
// Development: mock demo auth.
// The switch is driven ENTIRELY by environment config (dataSource).
// Roles/org always come from the trusted database profile, never the
// browser.
// ============================================================
import { supabase, SUPABASE_CONFIGURED } from '../../lib/supabase'
import { dataSource } from '../config/dataSource'
import { users } from '../data/mockDb'
import { User, Profile } from '../data/types'
import { recordAudit } from '../security/audit'

export interface AuthResult {
  ok: boolean
  error?: string
  user?: User
}

export interface ProfileFetchResult {
  profile: Profile | null
  error?: string
}

const DEMO_CREDENTIALS: Record<string, string> = {
  'admin@pkmedia.in': 'u-admin',
  'manager@pkmedia.in': 'u-manager',
  'outreach@pkmedia.in': 'u-outreach',
  'editor@pkmedia.in': 'u-editor',
  'finance@pkmedia.in': 'u-finance',
  'client@pkmedia.in': 'u-client',
}

// Convert a Supabase profile row (snake_case) to the app User shape.
export function profileToUser(p: Profile): User {
  return {
    id: p.id,
    name: p.full_name,
    email: p.email,
    role: (p.role as User['role']) || 'CLIENT',
    avatarColor: '#00A7C0',
    active: p.is_active,
    createdAt: p.created_at,
    organization_id: p.organization_id,
  }
}

/** Sign in. Returns { ok, user, error }. */
export async function signIn(email: string, password: string): Promise<AuthResult> {
  console.log('[AUTH DEBUG] 1. Login submitted for email:', email)
  if (dataSource === 'supabase' && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    console.log('[AUTH DEBUG] 2. signInWithPassword response user:', data?.user ? { id: data.user.id, email: data.user.email } : null, 'session:', data?.session ? 'present' : 'null')
    if (error) {
      console.log('[AUTH DEBUG] 3. auth error:', error.message)
    } else {
      console.log('[AUTH DEBUG] 3. auth error: none')
    }

    if (error || !data.user) {
      recordAudit('login.failed', 'anonymous', `sign-in failed for ${email}`)
      return { ok: false, error: 'Invalid email or password.' }
    }

    console.log('[AUTH DEBUG] 4. authenticated user ID:', data.user.id)
    console.log('[AUTH DEBUG] 5. authenticated email:', data.user.email)

    const { data: userData, error: getUserError } = await supabase.auth.getUser()
    if (getUserError || !userData.user) {
      console.error('[AUTH DEBUG] supabase.auth.getUser failed:', getUserError)
      recordAudit('login.failed', data.user.id, `getUser failed after signInWithPassword: ${getUserError?.message ?? 'missing auth user'}`)
      return { ok: false, error: 'Unable to access account profile. Please contact admin.' }
    }

    const fetched = await fetchMyProfile(userData.user.id)
    if (fetched.error) {
      recordAudit('login.failed', userData.user.id, `profile read rejected: ${fetched.error}`)
      return { ok: false, error: 'Unable to access account profile. Please contact admin.' }
    }
    const profile = fetched.profile
    if (!profile) {
      recordAudit('login.failed', userData.user.id, 'authenticated Supabase session but profile query returned no row')
      return { ok: false, error: 'Account profile not found.' }
    }
    
    console.log('[AUTH DEBUG] 10. role check result - role:', profile.role, 'is_active:', profile.is_active)

    if (!profile.is_active) {
      recordAudit('login.failed', profile.id, 'inactive account')
      return { ok: false, error: 'Your account is inactive.' }
    }
    recordAudit('login.success', profile.id, `signed in as ${profile.role}`)
    return { ok: true, user: profileToUser(profile) }
  }

  // ---- Mock / development mode ----
  const id = DEMO_CREDENTIALS[email.trim().toLowerCase()]
  const found = id ? users.find((u) => u.id === id) : undefined
  if (!found) {
    recordAudit('login.failed', 'anonymous', `mock sign-in failed for ${email}`)
    return { ok: false, error: 'Invalid credentials. Use one of the demo accounts.' }
  }
  recordAudit('login.success', found.id, `signed in as ${found.role} (DEV)`)
  return { ok: true, user: found }
}

/** Load the current user's profile from the database. */
export async function fetchMyProfile(userId: string): Promise<ProfileFetchResult> {
  if (!supabase) return { profile: null, error: 'Supabase is not configured.' }
  console.log('[AUTH DEBUG] 6. profiles query request for userId:', userId)
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()
  console.log('[AUTH DEBUG] 7. profiles query response data:', data)
  if (error) {
    console.log('[AUTH DEBUG] 8. profiles query error:', error.message, error.details, error.hint)
  } else {
    console.log('[AUTH DEBUG] 8. profiles query error: none')
  }

  const result = {
    profile: data ? (data as unknown as Profile) : null,
    error: error ? error.message : undefined
  }
  console.log('[AUTH DEBUG] 9. returned profile data:', result.profile, 'error:', result.error)

  if (error) {
    recordAudit('login.failed', userId, error.message)
    return { profile: null, error: error.message }
  }
  if (!data) return { profile: null, error: undefined }
  return { profile: data as unknown as Profile, error: undefined }
}

/** Load the signed-in user for an existing Supabase session. */
export async function loadSessionUser(): Promise<User | null> {
  if (dataSource !== 'supabase' || !supabase) return null
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) return null
  const profileFetch = await fetchMyProfile(session.user.id)
  const profile = profileFetch.profile
  return profile && profile.is_active ? profileToUser(profile) : null
}

/** Sign out. */
export async function signOut(): Promise<void> {
  if (dataSource === 'supabase' && supabase) {
    await supabase.auth.signOut()
  }
  recordAudit('logout', 'anonymous', 'signed out')
}

/** Request a password reset email (Supabase). */
export async function requestPasswordReset(email: string): Promise<{ ok: boolean; error?: string }> {
  if (dataSource !== 'supabase' || !supabase) {
    return { ok: false, error: 'Password reset is only available when Supabase is configured.' }
  }
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/app/reset-password`,
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

/** Update the signed-in user's password (used on reset page). */
export async function updatePassword(newPassword: string): Promise<{ ok: boolean; error?: string }> {
  if (dataSource !== 'supabase' || !supabase) {
    return { ok: false, error: 'Password update is only available when Supabase is configured.' }
  }
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

export const isSupabaseConfigured = SUPABASE_CONFIGURED
