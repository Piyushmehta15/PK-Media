// ============================================================
// PK MEDIA OS — AI usage tracking
// Records every AI call to ai_usage (RLS-protected). Enables future
// per-user/org/daily/monthly limits, cost monitoring, and emergency
// shutdown. No paid AI APIs are connected yet.
// ============================================================
import { supabase } from '../../lib/supabase'
import { dataSource } from '../config/dataSource'

export interface AIUsageInput {
  userId: string
  organizationId: string
  provider: string
  model: string
  requestType: string
  inputTokens?: number
  outputTokens?: number
  estimatedCost?: number
}

export async function trackAIUsage(input: AIUsageInput): Promise<void> {
  if (dataSource !== 'supabase' || !supabase) return
  try {
    // RLS enforces user_id = auth.uid() and organization_id =
    // current_org_id(), so a caller cannot record usage under another
    // user or organization. Non-fatal on failure.
    await supabase.from('ai_usage').insert({
      organization_id: input.organizationId,
      user_id: input.userId,
      provider: input.provider,
      model: input.model,
      request_type: input.requestType,
      input_tokens: input.inputTokens ?? 0,
      output_tokens: input.outputTokens ?? 0,
      estimated_cost: input.estimatedCost ?? 0,
    })
  } catch {
    // Non-fatal: AI usage logging must never break the user's workflow.
  }
}

/** Aggregate AI usage for the current org (permission governed by RLS). */
export async function getAIUsageSummary() {
  if (dataSource !== 'supabase' || !supabase) return null
  const { data } = await supabase.from('ai_usage').select('id, request_type, estimated_cost, created_at')
  if (!data) return null
  const totalCost = data.reduce((s, r) => s + (r.estimated_cost ?? 0), 0)
  const byType: Record<string, number> = {}
  data.forEach((r) => { byType[r.request_type] = (byType[r.request_type] ?? 0) + 1 })
  return { totalRequests: data.length, totalCost, byType }
}
