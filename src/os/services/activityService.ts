// ============================================================
// PK MEDIA OS — Activity / audit service
// Persists security-sensitive events to activity_logs (RLS-protected)
// when Supabase is configured. Falls back to the in-memory audit buffer
// in development. Never stores passwords, tokens, or secrets.
// ============================================================
import { supabase } from '../../lib/supabase'
import { dataSource } from '../config/dataSource'
import { recordAudit, AuditEvent } from '../security/audit'

export interface ActivityInput {
  userId: string
  organizationId: string
  action: string
  entity: string
  entityId?: string
}

/**
 * Persist an activity/audit event. The user_id and organization_id are
 * ALSO enforced by RLS (user_id = auth.uid() and organization_id =
 * current_org_id()), so even if a caller passes mismatched values the
 * insert is rejected server-side. We still only send the caller's
 * intended values; the database is authoritative.
 */
export async function logActivity(input: ActivityInput): Promise<void> {
  const clean = input.action.replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, 300)
  if (dataSource === 'supabase' && supabase) {
    try {
      await supabase.from('activity_logs').insert({
        organization_id: input.organizationId,
        user_id: input.userId,
        action: clean,
        entity: input.entity,
        entity_id: input.entityId ?? '',
      })
      return
    } catch {
      // fall through to local buffer if insert fails
    }
  }
  recordAudit((input.entity.toLowerCase() as AuditEvent) || 'settings.changed', input.userId, clean)
}

/** Read activity logs for the current org (if permitted). */
export async function getActivityLogs() {
  if (dataSource !== 'supabase' || !supabase) return []
  const { data } = await supabase
    .from('activity_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)
  return data ?? []
}
