// ============================================================
// PK MEDIA OS — AI service abstraction
// Provider-agnostic. NEVER place API keys here. In production these
// functions call a server-side API route (e.g. /api/ai) which reads
// keys from environment variables. The mock implementation lets the
// UI work end-to-end without a backend.
// ============================================================

export type AIProvider = 'openai' | 'gemini' | 'anthropic' | 'mock'

export interface AIConfig {
  provider: AIProvider
  // model is selected server-side; keep frontend free of secrets
  temperature: number
}

export interface AIResponse {
  text: string
  provider: AIProvider
  usage?: { promptTokens: number; completionTokens: number }
}

// The current provider. Change here to switch providers — the same
// aiService interface is used everywhere.
const config: AIConfig = { provider: 'mock', temperature: 0.7 }

// Abstracted transport — swap for a real fetch to an API route later.
async function request(prompt: string, system: string): Promise<AIResponse> {
  // In production: POST to `/api/ai` with { prompt, system }
  // const res = await fetch('/api/ai', { method: 'POST', body: JSON.stringify({ prompt, system }) })
  // return res.json()
  await delay(350) // simulate latency
  return { text: mockCompletion(system, prompt), provider: config.provider }
}

function delay(ms: number) { return new Promise((r) => setTimeout(r, ms)) }

function mockCompletion(system: string, prompt: string): string {
  if (system.includes('outreach')) {
    return `Hi there,\n\nWe're PK Media, a creator-led growth agency. We loved your content and believe you'd be a great fit for a brand campaign.\n\n${prompt}\n\nWould you be open to a quick conversation this week?\n\nBest,\nPK Media Team`
  }
  if (system.includes('meeting')) {
    return `## Meeting Summary\n- **Key Topics:** ${prompt.split('\n')[0] || 'Project progress'}\n- **Decisions:** Next steps to be confirmed\n- **Action Items:**\n  1. Share updated timeline\n  2. Confirm deliverables\n  3. Schedule next review\n`
  }
  if (system.includes('report')) {
    return `## Campaign Report\n\n- **Reach:** 890,000\n- **Views:** 420,000\n- **Engagement:** 8.4%\n- **Conversions:** 1,250\n\n**Recommendation:** Increase paid amplification for top-performing creatives.\n`
  }
  return `Here is a suggested draft for "${prompt}". Review and refine before sharing.`
}

export async function generateOutreach(input: { influencerName: string; niche: string; campaignGoal: string }): Promise<AIResponse> {
  return request(
    `Draft outreach for ${input.influencerName} (${input.niche}) about: ${input.campaignGoal}`,
    'outreach-copywriter',
  )
}

export async function generateMeetingNotes(input: { transcript: string }): Promise<AIResponse> {
  return request(input.transcript, 'meeting-notes')
}

export async function askCopilot(input: { question: string }): Promise<AIResponse> {
  return request(input.question, 'copilot')
}

export async function generateReport(input: { campaignName: string; metrics: string }): Promise<AIResponse> {
  return request(`Report for ${input.campaignName}. ${input.metrics}`, 'campaign-report')
}

export { config }
