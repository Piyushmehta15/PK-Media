// ============================================================
// PK MEDIA OS — AI Tools
// AI Outreach Generator, AI Meeting Notes, PK Copilot, AI Report
// Generator. All call the provider-agnostic aiService abstraction.
// No API keys in the frontend.
//
// SECURITY: client-side guardrails (kill switch, length caps, prompt
// validation) are defense-in-depth only. The SERVER is the trust
// boundary: it MUST re-validate, rate-limit per user/role, cap tokens,
// and enforce the AI_ENABLED kill switch. See SECURITY.md.
// ============================================================
import { useState } from 'react'
import { Card, CardHeader, Button, Textarea, Input } from '../ui/kit'
import { generateOutreach, generateMeetingNotes, askCopilot, generateReport } from '../services/aiService'
import { isAiDisabled } from '../security/appConfig'
import { sanitizeText, isSafePlainText, validateText } from '../security/validate'
import { recordAudit } from '../security/audit'
import { useAuth } from '../auth/AuthContext'

const MAX_IN = 4000

export default function AITools() {
  const { user } = useAuth()
  const disabled = isAiDisabled()

  const [outreachGoal, setOutreachGoal] = useState('')
  const [outreachErr, setOutreachErr] = useState('')
  const [outreachRes, setOutreachRes] = useState('')
  const [busy1, setBusy1] = useState(false)

  const [transcript, setTranscript] = useState('')
  const [transcriptErr, setTranscriptErr] = useState('')
  const [notesRes, setNotesRes] = useState('')
  const [busy2, setBusy2] = useState(false)

  const [question, setQuestion] = useState('')
  const [questionErr, setQuestionErr] = useState('')
  const [copilotRes, setCopilotRes] = useState('')
  const [busy3, setBusy3] = useState(false)

  const [campaignName, setCampaignName] = useState('')
  const [metrics, setMetrics] = useState('')
  const [reportErr, setReportErr] = useState('')
  const [reportRes, setReportRes] = useState('')
  const [busy4, setBusy4] = useState(false)

  const guard = (value: string, label: string): string | null => {
    if (disabled) return 'AI tools are currently disabled.'
    return validateText(value, { required: true, max: MAX_IN, label })
  }

  const run = async (
    fn: () => Promise<{ text: string }>,
    setRes: (s: string) => void,
    setBusy: (b: boolean) => void,
    kind: string,
  ) => {
    setBusy(true)
    try {
      const res = await fn()
      setRes(isSafePlainText(res.text) ? res.text : 'AI output was blocked by safety filters.')
      recordAudit('ai.used', user?.id ?? 'anonymous', `generated ${kind}`)
    } catch {
      setRes('Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const runOutreach = () => {
    const err = guard(outreachGoal, 'Campaign description')
    setOutreachErr(err ?? '')
    if (err) return
    run(() => generateOutreach({ influencerName: 'Creator', niche: 'relevant niche', campaignGoal: sanitizeText(outreachGoal, MAX_IN) }), setOutreachRes, setBusy1, 'outreach')
  }
  const runNotes = () => {
    const err = guard(transcript, 'Transcript')
    setTranscriptErr(err ?? '')
    if (err) return
    run(() => generateMeetingNotes({ transcript: sanitizeText(transcript, MAX_IN) }), setNotesRes, setBusy2, 'meeting notes')
  }
  const runCopilot = () => {
    const err = guard(question, 'Question')
    setQuestionErr(err ?? '')
    if (err) return
    run(() => askCopilot({ question: sanitizeText(question, MAX_IN) }), setCopilotRes, setBusy3, 'copilot')
  }
  const runReport = () => {
    const err = guard(campaignName, 'Campaign name')
    setReportErr(err ?? '')
    if (err) return
    run(() => generateReport({ campaignName: sanitizeText(campaignName, 200), metrics: sanitizeText(metrics, MAX_IN) }), setReportRes, setBusy4, 'report')
  }

  const errHint = (msg: string) => (msg ? <p className="os-field-err">{msg}</p> : null)

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>AI Tools</h1><p>AI-assisted workflows backed by a reusable provider service.</p></div>
      </div>

      {disabled && <div className="os-note">AI tools are currently disabled by the safety kill switch.</div>}

      <div className="os-ai-grid">
        <Card>
          <CardHeader title="AI Outreach Generator" subtitle="Personalized creator outreach in seconds" />
          <div className="os-form-stack">
            <Textarea rows={3} placeholder="Describe the campaign and creator fit…" value={outreachGoal} onChange={(e) => setOutreachGoal(e.target.value)} />
            {errHint(outreachErr)}
            <Button variant="primary" disabled={busy1 || disabled || !outreachGoal} onClick={runOutreach}>{busy1 ? 'Generating…' : 'Generate'}</Button>
            {outreachRes && <div className="os-draft"><pre>{outreachRes}</pre></div>}
          </div>
        </Card>

        <Card>
          <CardHeader title="AI Meeting Notes" subtitle="Turn a transcript into crisp notes" />
          <div className="os-form-stack">
            <Textarea rows={3} placeholder="Paste meeting transcript or notes…" value={transcript} onChange={(e) => setTranscript(e.target.value)} />
            {errHint(transcriptErr)}
            <Button variant="primary" disabled={busy2 || disabled || !transcript} onClick={runNotes}>{busy2 ? 'Summarizing…' : 'Generate Notes'}</Button>
            {notesRes && <div className="os-draft"><pre>{notesRes}</pre></div>}
          </div>
        </Card>

        <Card className="os-ai-card--wide">
          <CardHeader title="PK Copilot" subtitle="Ask anything about your agency operations" />
          <div className="os-form-stack">
            <div className="os-copilot-row">
              <Input placeholder="e.g. Which campaign has the highest margin?" value={question} onChange={(e) => setQuestion(e.target.value)} />
              <Button variant="primary" disabled={busy3 || disabled || !question} onClick={runCopilot}>{busy3 ? 'Thinking…' : 'Ask'}</Button>
            </div>
            {errHint(questionErr)}
            {copilotRes && <div className="os-draft"><pre>{copilotRes}</pre></div>}
          </div>
        </Card>

        <Card className="os-ai-card--wide">
          <CardHeader title="AI Report Generator" subtitle="Create campaign reports automatically" />
          <div className="os-form-stack">
            <div className="os-copilot-row">
              <Input placeholder="Campaign name" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} />
              <Input placeholder="Key metrics (reach, views, engagement…)" value={metrics} onChange={(e) => setMetrics(e.target.value)} />
              <Button variant="primary" disabled={busy4 || disabled || !campaignName} onClick={runReport}>{busy4 ? 'Generating…' : 'Generate Report'}</Button>
            </div>
            {errHint(reportErr)}
            {reportRes && <div className="os-draft"><pre>{reportRes}</pre></div>}
          </div>
        </Card>
      </div>
    </div>
  )
}
