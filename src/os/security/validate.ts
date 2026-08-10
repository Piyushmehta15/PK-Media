// ============================================================
// PK MEDIA OS — Input validation & sanitization
// Trust model: BROWSER = UNTRUSTED. Validate every user-controlled
// input even before it reaches the (future) server. The server MUST
// re-validate independently — this layer is defense-in-depth for the
// current frontend, never a substitute for server-side checks.
// ============================================================

export const MAX_SANE_LENGTH = 5000

/** Strip control characters and trim. React escapes output on render, so
 *  this primarily enforces length + shape. Never treat this as XSS
 *  protection for a server — sanitize server-side too. */
export function sanitizeText(input: unknown, max = MAX_SANE_LENGTH): string {
  if (typeof input !== 'string') return ''
  // eslint-disable-next-line no-control-regex
  return input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max)
}

export function isEmail(input: unknown): boolean {
  if (typeof input !== 'string') return false
  const value = input.trim()
  if (value.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isPhone(input: unknown): boolean {
  if (typeof input !== 'string') return false
  const digits = input.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15
}

/** Allowlist-driven URL validation. Rejects javascript:, data:, vbscript: */
export function isSafeUrl(input: unknown): boolean {
  if (typeof input !== 'string') return false
  const value = input.trim()
  if (value.length === 0) return true // optional URLs allowed
  if (value.length > 2048) return false
  let parsed: URL
  try {
    parsed = new URL(value)
  } catch {
    return false
  }
  return /^(https?|mailto|tel|ftp)$/i.test(parsed.protocol.replace(':', ''))
}

export function isNonNegativeNumber(input: unknown): boolean {
  if (typeof input === 'number') return Number.isFinite(input) && input >= 0
  if (typeof input === 'string' && input.trim() !== '') {
    const n = Number(input)
    return Number.isFinite(n) && n >= 0
  }
  return false
}

export function isWithinMax(input: unknown, max: number): boolean {
  return typeof input === 'string' && input.length <= max
}

/** Reject input that contains executable/script-like patterns. */
export function isSafePlainText(input: unknown): boolean {
  if (typeof input !== 'string') return false
  const value = input.toLowerCase()
  const dangerous = ['<script', 'javascript:', 'onerror=', 'onclick=', 'onload=', '&#', 'vbscript:', 'data:text/html']
  return !dangerous.some((d) => value.includes(d))
}

/** Validate a single text field: must be string, non-empty, within length,
 *  and free of script-like content. Returns a safe string or null. */
export function validateText(input: unknown, opts: { required?: boolean; max?: number; label?: string } = {}): string | null {
  const { required = true, max = 500, label = 'This field' } = opts
  const cleaned = sanitizeText(input, max)
  if (required && !cleaned) return `${label} is required.`
  if (!isWithinMax(cleaned, max)) return `${label} is too long.`
  if (cleaned && !isSafePlainText(cleaned)) return `${label} contains invalid characters.`
  return null
}

export interface FinInput { field: string; value: unknown }
/** Validate a set of financial inputs. Returns map of field -> error, or {} if valid. */
export function validateFinancials(inputs: FinInput[]): Record<string, string> {
  const errors: Record<string, string> = {}
  inputs.forEach(({ field, value }) => {
    if (!isNonNegativeNumber(value)) {
      errors[field] = 'Enter a valid non-negative number.'
    }
  })
  return errors
}
