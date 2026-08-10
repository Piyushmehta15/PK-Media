// ============================================================
// PK MEDIA OS — Campaign Manager
// Full lifecycle with a connected Nike-style detail view:
// Brand, Budget, Influencers (with outreach status), Deliverables,
// Results, and Finance (revenue, creator cost, other costs, profit).
// ============================================================
import { useState } from 'react'
import { Card, CardHeader, Button, Badge, SearchInput, Table, Modal, Progress, Avatar, statusTone } from '../ui/kit'
import { getEnrichedCampaigns, getCampaignDetail, fmtINR } from '../services/dataService'
import { CampaignEnriched, CampaignDetail } from '../services/dataService'

const OUTREACH_TONE: Record<string, 'teal' | 'orange' | 'green' | 'blue' | 'neutral'> = {
  sent: 'neutral',
  replied: 'blue',
  negotiating: 'orange',
  confirmed: 'green',
}

const OUTREACH_LABEL: Record<string, string> = {
  sent: 'Sent',
  replied: 'Replied',
  negotiating: 'Negotiating',
  confirmed: 'Confirmed',
}

export default function Campaigns() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [detail, setDetail] = useState<CampaignDetail | null>(null)
  const all = getEnrichedCampaigns()
  const statuses = ['Planning', 'Outreach', 'Negotiation', 'Content', 'Approval', 'Live', 'Completed', 'Cancelled']

  const filtered = all.filter((c) => {
    const q = query.toLowerCase()
    const matchesQ = !q || c.name.toLowerCase().includes(q) || c.clientName.toLowerCase().includes(q)
    return matchesQ && (status === 'All' || c.status === status)
  })

  const openDetail = (c: CampaignEnriched) => {
    setDetail(getCampaignDetail(c.id))
  }

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>Campaign Manager</h1><p>{all.length} campaigns across strategy, content, distribution and reporting.</p></div>
        <Button variant="primary">+ New Campaign</Button>
      </div>

      <Card>
        <div className="os-toolbar">
          <SearchInput placeholder="Search campaigns or clients…" value={query} onChange={setQuery} />
          <select className="os-input" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>{statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </Card>

      <Card>
        <Table columns={['Campaign', 'Client', 'Status', 'Budget', 'Content', 'Revenue', 'Expenses', 'Profit', '']}>
          {filtered.map((c) => (
            <tr key={c.id}>
              <td><strong className="os-strong">{c.name}</strong><div><small>{c.startDate} → {c.endDate}</small></div></td>
              <td>{c.clientName}</td>
              <td><Badge tone={statusTone(c.status)}>{c.status}</Badge></td>
              <td>{fmtINR(c.budget)}</td>
              <td><div className="os-progress-inline"><Progress value={c.contentStatus} /><span>{c.contentStatus}%</span></div></td>
              <td>{fmtINR(c.revenue)}</td>
              <td>{fmtINR(c.expenses)}</td>
              <td className="os-cell-profit">{fmtINR(c.profit)}</td>
              <td><Button size="sm" variant="ghost" onClick={() => openDetail(c)}>View</Button></td>
            </tr>
          ))}
        </Table>
      </Card>

      <Modal open={!!detail} title={detail?.campaign.name ?? ''} onClose={() => setDetail(null)}>
        {detail && (
          <div className="os-detail os-detail--campaign">
            {/* Status + Brand */}
            <div className="os-detail__meta">
              <Badge tone={statusTone(detail.campaign.status)}>{detail.campaign.status}</Badge>
              <span>{detail.brand.name}</span>
              <span className="os-muted-dot">·</span>
              <small>{detail.campaign.startDate} → {detail.campaign.endDate}</small>
            </div>

            {/* Budget */}
            <div className="os-detail__grid">
              <div><small>Campaign Budget</small><strong className="os-big-num">{fmtINR(detail.campaign.budget)}</strong></div>
              <div><small>Revenue</small><strong className="os-big-num">{fmtINR(detail.campaign.revenue)}</strong></div>
              <div><small>Profit</small><strong className="os-big-num os-text-green">{fmtINR(detail.profit)}</strong></div>
            </div>

            {/* Influencers + outreach status */}
            <div className="os-detail__section">
              <div className="os-detail__section-head">
                <small>Influencers</small>
                <span>{detail.influencers.length} creators</span>
              </div>
              <div className="os-campaign-table">
                <div className="os-campaign-table__head"><span>Creator</span><span>Platform</span><span>Fee</span><span>Outreach</span></div>
                {detail.influencers.map((item) => (
                  <div className="os-campaign-table__row" key={item.influencer.id}>
                    <div className="os-person"><Avatar name={item.influencer.name} color="#00A7C0" /><div><strong className="os-strong">{item.influencer.name}</strong><small>{item.influencer.username}</small></div></div>
                    <span>{item.influencer.platform}</span>
                    <span>{fmtINR(item.fee)}</span>
                    <span><Badge tone={OUTREACH_TONE[item.outreachStatus]}>{OUTREACH_LABEL[item.outreachStatus]}</Badge></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="os-detail__section">
              <div className="os-detail__section-head">
                <small>Deliverables</small>
                <span>{detail.deliverables.length} items</span>
              </div>
              <div className="os-campaign-table">
                <div className="os-campaign-table__head"><span>Deliverable</span><span>Type</span><span>Status</span><span>Due</span></div>
                {detail.deliverables.map((d) => (
                  <div className="os-campaign-table__row" key={d.id}>
                    <strong className="os-strong">{d.title}</strong>
                    <span>{d.type}</span>
                    <span><Badge tone={statusTone(d.status)}>{d.status}</Badge></span>
                    <span>{d.dueDate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="os-detail__section">
              <div className="os-detail__section-head"><small>Results</small></div>
              <div className="os-detail__grid">
                <div><small>Views</small><strong>{detail.campaign.results.views ? detail.campaign.results.views.toLocaleString('en-IN') : '—'}</strong></div>
                <div><small>Reach</small><strong>{detail.campaign.results.reach ? detail.campaign.results.reach.toLocaleString('en-IN') : '—'}</strong></div>
                <div><small>Engagement</small><strong>{detail.campaign.results.engagement ? `${detail.campaign.results.engagement}%` : '—'}</strong></div>
                <div><small>Conversions</small><strong>{detail.campaign.results.conversions || '—'}</strong></div>
              </div>
            </div>

            {/* Finance breakdown */}
            <div className="os-detail__section">
              <div className="os-detail__section-head"><small>Finance</small></div>
              <div className="os-finance-break">
                <div className="os-finance-break__row"><span>Revenue</span><strong>{fmtINR(detail.campaign.revenue)}</strong></div>
                <div className="os-finance-break__row os-finance-break__row--sub"><span>Creator Cost</span><strong>− {fmtINR(detail.creatorCost)}</strong></div>
                <div className="os-finance-break__row os-finance-break__row--sub"><span>Other Costs</span><strong>− {fmtINR(detail.otherCosts)}</strong></div>
                <div className="os-finance-break__row os-finance-break__row--sub"><span>Total Cost</span><strong>{fmtINR(detail.totalCost)}</strong></div>
                <div className="os-finance-break__row os-finance-break__row--total"><span>Profit</span><strong className="os-text-green">{fmtINR(detail.profit)} <em>({detail.margin}% margin)</em></strong></div>
              </div>
            </div>

            {/* Content progress */}
            <div className="os-detail__section">
              <div className="os-detail__section-head"><small>Content progress</small><span>{detail.campaign.contentStatus}%</span></div>
              <Progress value={detail.campaign.contentStatus} tone={detail.campaign.contentStatus > 60 ? 'teal' : 'orange'} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
