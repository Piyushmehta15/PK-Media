// ============================================================
// PK MEDIA OS — Outreach Hub
// AI Outreach Generator + Follow-up Automation + outreach list.
// ============================================================
import { useState } from 'react'
import { Card, CardHeader, Button, Badge, Table, Textarea, Input, Select, statusTone } from '../ui/kit'
import { db } from '../data/mockDb'
import { getInfluencerById } from '../services/dataService'
import { generateOutreach } from '../services/aiService'

export default function Outreach() {
  const [influencerId, setInfluencerId] = useState('inf-6')
  const [goal, setGoal] = useState('')
  const [generating, setGenerating] = useState(false)
  const [draft, setDraft] = useState('')

  const runGenerate = async () => {
    if (!goal.trim()) return
    setGenerating(true)
    const inf = getInfluencerById(influencerId)
    const res = await generateOutreach({ influencerName: inf?.name ?? 'Creator', niche: inf?.niche ?? '', campaignGoal: goal })
    setDraft(res.text)
    setGenerating(false)
  }

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>Outreach Hub</h1><p>Generate, send and follow up on creator outreach — all in one place.</p></div>
        <Button variant="primary">New Outreach</Button>
      </div>

      <div className="os-grid-2">
        <Card>
          <CardHeader title="AI Outreach Generator" subtitle="Draft a personalized message in seconds" />
          <div className="os-form-stack">
            <label className="os-field"><span>Influencer</span>
              <Select value={influencerId} onChange={(e) => setInfluencerId(e.target.value)}>
                {db.influencers.map((i) => <option value={i.id} key={i.id}>{i.name} ({i.username})</option>)}
              </Select>
            </label>
            <label className="os-field"><span>Campaign goal / context</span>
              <Textarea rows={3} placeholder="e.g. Launch a summer UGC campaign for our sports drink…" value={goal} onChange={(e) => setGoal(e.target.value)} />
            </label>
            <Button variant="primary" onClick={runGenerate} disabled={generating || !goal.trim()}>{generating ? 'Generating…' : 'Generate Outreach'}</Button>
            {draft && (
              <div className="os-draft">
                <div className="os-draft__head"><strong>Draft</strong><div><Button size="sm" variant="secondary">Copy</Button><Button size="sm" variant="primary">Send</Button></div></div>
                <pre>{draft}</pre>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader title="Follow-up Automation" subtitle="Scheduled follow-ups that never slip" />
          <Table columns={['Creator', 'Due', 'Note', 'Status', '']}>
            {db.followUps.map((f) => {
              const inf = getInfluencerById(f.influencerId)
              return (
                <tr key={f.id}>
                  <td><strong className="os-strong">{inf?.name}</strong></td>
                  <td>{f.dueDate}</td>
                  <td><small>{f.note}</small></td>
                  <td><Badge tone={statusTone(f.status)}>{f.status}</Badge></td>
                  <td><Button size="sm" variant="ghost">Mark done</Button></td>
                </tr>
              )
            })}
          </Table>
        </Card>
      </div>

      <Card>
        <CardHeader title="Outreach Log" subtitle="All sent and drafted messages" />
        <Table columns={['Creator', 'Channel', 'Subject', 'Status', 'Sent']}>
          {db.outreach.map((o) => {
            const inf = getInfluencerById(o.influencerId)
            return (
              <tr key={o.id}>
                <td><strong className="os-strong">{inf?.name}</strong></td>
                <td>{o.channel}</td>
                <td>{o.subject}</td>
                <td><Badge tone={statusTone(o.status)}>{o.status}</Badge></td>
                <td>{o.sentAt || 'Draft'}</td>
              </tr>
            )
          })}
        </Table>
      </Card>
    </div>
  )
}
