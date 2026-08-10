// ============================================================
// PK MEDIA OS — Audit logging (frontend foundation)
// In production, these events MUST be sent to a server audit log
// that appends to an immutable, access-controlled store. This module
// is the clean abstraction the UI calls; today it records to an
// in-memory ring buffer for development visibility.
//
// NEVER log passwords, API keys, tokens, or secrets.
// ============================================================

export type AuditEvent =
  | 'login.success'
  | 'login.failed'
  | 'logout'
  | 'user.created'
  | 'role.changed'
  | 'permission.changed'
  | 'campaign.updated'
  | 'finance.updated'
  | 'invoice.changed'
  | 'payment.changed'
  | 'document.accessed'
  | 'document.uploaded'
  | 'ai.used'
  | 'data.deleted'
  | 'outreach.sent'
  | 'settings.changed'

export interface AuditEntry {
  id: string
  ts: string
  actor: string        // user id (or 'anonymous')
  event: AuditEvent
  detail: string
}

const buffer: AuditEntry[] = []
const MAX_BUFFER = 200

/** Record an audit event. Safe by construction: detail is sanitized
 *  and length-limited; never include secrets. */
export function recordAudit(event: AuditEvent, actor: string, detail: string): void {
  const clean = detail.replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, 300)
  const entry: AuditEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ts: new Date().toISOString(),
    actor,
    event,
    detail: clean,
  }
  buffer.push(entry)
  if (buffer.length > MAX_BUFFER) buffer.shift()

  // In production: POST to /api/audit (server-side, auth required).
  // console.log('[audit]', entry.event, entry.actor, entry.detail)
}

export function getAuditBuffer(): readonly AuditEntry[] {
  return buffer
}
