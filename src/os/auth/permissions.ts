// ============================================================
// PK MEDIA OS — Reusable role-based permission system
// Declarative role -> permission map. Pages/components consume
// `can(permission)` from useAuth. No permission hard-coded anywhere.
// ============================================================
import { Role, Permission } from '../data/types'

// Base permissions every authenticated user has.
const BASE: Permission[] = ['dashboard.view', 'notifications.manage', 'calendar.view']

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: [
    'dashboard.view',
    'influencers.manage', 'influencers.view',
    'brands.manage', 'brands.view',
    'campaigns.manage', 'campaigns.view',
    'outreach.manage', 'outreach.view',
    'proposals.manage', 'proposals.view',
    'analytics.view',
    'finance.manage', 'finance.view',
    'contracts.manage', 'contracts.view',
    'deliverables.manage', 'deliverables.view',
    'notifications.manage',
    'team.view',
    'documents.manage', 'documents.view',
    'calendar.view',
    'settings.manage',
    'files.secure',
  ],
  MANAGER: [
    'dashboard.view',
    'influencers.manage', 'influencers.view',
    'brands.manage', 'brands.view',
    'campaigns.manage', 'campaigns.view',
    'outreach.manage', 'outreach.view',
    'proposals.manage', 'proposals.view',
    'analytics.view',
    'deliverables.manage', 'deliverables.view',
    'notifications.manage',
    'team.view',
    'documents.manage', 'documents.view',
    'calendar.view',
  ],
  OUTREACH: [
    'dashboard.view',
    'influencers.manage', 'influencers.view',
    'campaigns.view',
    'outreach.manage', 'outreach.view',
    'notifications.manage',
    'calendar.view',
  ],
  EDITOR: [
    'dashboard.view',
    'campaigns.view',
    'deliverables.manage', 'deliverables.view',
    'notifications.manage',
    'documents.view',
    'calendar.view',
  ],
  FINANCE: [
    'dashboard.view',
    'finance.manage', 'finance.view',
    'contracts.view', 'proposals.view',
    'influencers.view', 'brands.view', 'campaigns.view',
    'notifications.manage',
    'calendar.view',
  ],
  CLIENT: [
    'dashboard.view',
    'campaigns.view',
    'deliverables.view',
    'documents.view',
    'notifications.manage',
    'calendar.view',
    'analytics.view',
  ],
}

export function permissionsFor(role: Role): Permission[] {
  return [...new Set([...BASE, ...(ROLE_PERMISSIONS[role] ?? [])])]
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return permissionsFor(role).includes(permission)
}
