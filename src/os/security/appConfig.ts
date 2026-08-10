// ============================================================
// PK MEDIA OS — Client-side feature flags
// Only PUBLIC, intentionally-safe flags live here. Real enforcement
// of AI/flags/limits MUST happen on the server. These flags only let
// the UI disable features early; the server remains the trust boundary.
// ============================================================

function flag(name: string, fallback: boolean): boolean {
  const raw = import.meta.env[`VITE_${name}`]
  if (raw === undefined) return fallback
  return String(raw).toLowerCase() === 'true'
}

export const appConfig = {
  /** Emergency kill switch for AI actions (server must enforce too). */
  aiEnabled: flag('AI_ENABLED', true),
  /** Enable public lead/creator forms (server must rate-limit). */
  publicFormsEnabled: flag('PUBLIC_FORMS_ENABLED', true),

  /** Client-side guardrails (mirror server limits; server is authoritative). */
  ai: {
    maxInputChars: 4000,
    maxOutputChars: 8000,
  },
} as const

/** True when the AI tools UI should be disabled. */
export const isAiDisabled = () => !appConfig.aiEnabled
