// ============================================================
// PK MEDIA OS — Protected route + permission gate
// Blocks unauthenticated access and enforces role permissions.
// ============================================================
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { Permission } from '../data/types'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  // Do not redirect a persisted Supabase session before its profile has
  // finished hydrating. A redirect here loses the protected route on refresh.
  if (loading) return null
  if (!user) return <Navigate to="/app/login" replace />
  return <>{children}</>
}

export function RequirePermission({ permission, children }: { permission: Permission; children: ReactNode }) {
  const { user, can, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/app/login" replace />
  if (!can(permission)) return <Navigate to="/app/dashboard" replace />
  return <>{children}</>
}
