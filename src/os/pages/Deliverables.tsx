// ============================================================
// PK MEDIA OS — Deliverable Tracker
// ============================================================
import { useState } from 'react'
import { Card, CardHeader, Button, Badge, Table, Select, statusTone } from '../ui/kit'
import { db } from '../data/mockDb'
import { getInfluencerById, getCampaignById } from '../services/dataService'

export default function Deliverables() {
  const [status, setStatus] = useState('All')
  const all = db.deliverables
  const filtered = all.filter((d) => status === 'All' || d.status === status)

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>Deliverables</h1><p>Track every piece of content from brief to approval.</p></div>
        <Button variant="primary">+ Add Deliverable</Button>
      </div>

      <Card>
        <div className="os-toolbar">
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option><option>Pending</option><option>In Progress</option><option>Submitted</option><option>Approved</option><option>Rejected</option>
          </Select>
        </div>
      </Card>

      <Card>
        <Table columns={['Deliverable', 'Campaign', 'Creator', 'Type', 'Status', 'Due', '']}>
          {filtered.map((d) => {
            const inf = getInfluencerById(d.influencerId)
            const camp = getCampaignById(d.campaignId)
            return (
              <tr key={d.id}>
                <td><strong className="os-strong">{d.title}</strong></td>
                <td>{camp?.name}</td>
                <td>{inf?.name}</td>
                <td>{d.type}</td>
                <td><Badge tone={statusTone(d.status)}>{d.status}</Badge></td>
                <td>{d.dueDate}</td>
                <td><Button size="sm" variant="ghost">{d.status === 'Submitted' ? 'Review' : 'Update'}</Button></td>
              </tr>
            )
          })}
        </Table>
      </Card>
    </div>
  )
}
