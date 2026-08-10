// ============================================================
// PK MEDIA OS — Auth context
// Production: Supabase Auth (email/password, session persistence and
// refresh, password reset). Development: mock demo auth.
// The data source is decided by environment config (dataSource).
// Role/org always comes from the trusted database profile.
// ============================================================
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import { User, Permission } from '../data/types'
import { hasPermission } from './permissions'
import { signIn, signOut, loadSessionUser, isSupabaseConfigured, requestPasswordReset, updatePassword, AuthResult } from '../services/authService'
import { supabase } from '../../lib/supabase'
import { dataSource } from '../config/dataSource'
import { recordAudit } from '../security/audit'

interface AuthContextValue {
  user: User | null
  loading: boolean
  /** DEVELOPMENT demo login only (works without Supabase). */
  login: (email: string, password?: string) => Promise<AuthResult>
  logout: () => Promise<void>
  can: (permission: Permission) => boolean
  isDemoMode: boolean
  requestPasswordReset: (email: string) => Promise<{ ok: boolean; error?: string }>
  updatePassword: (password: string) => Promise<{ ok: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Restore session on mount (Supabase), or null for mock.
  useEffect(() => {
    let active = true
    const restore = async () => {
      const restored = await loadSessionUser()
      if (active) {
        setUser(restored)
        setLoading(false)
      }
    }
    restore()

    // Listen for auth changes (sign in/out, token refresh).
    if (supabase) {
      const { data: sub } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT') {
          if (active) setUser(null)
          return
        }
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session?.user) {
            const p = await loadSessionUser()
            if (active) setUser(p)
          }
        }
        if (active) setLoading(false)
      })
      return () => { active = false; sub.subscription.unsubscribe() }
    }
    return () => { active = false }
  }, [])

  const login = async (email: string, password?: string): Promise<AuthResult> => {
    const res = await signIn(email, password ?? '')
    if (res.ok && res.user) {
      setUser(res.user)
    }
    return res
  }

  const logout = async () => {
    if (user) recordAudit('logout', user.id, 'signed out')
    await signOut()
    setUser(null)
  }

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    login,
    logout,
can: (permission) => (user ? hasPermission(user.role, permission) : false),
    isDemoMode: dataSource === 'mock',
    requestPasswordReset,
    updatePassword,
  }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export { isSupabaseConfigured }
