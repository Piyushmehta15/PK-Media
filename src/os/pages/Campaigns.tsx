// ============================================================
// PK MEDIA OS — Campaign Manager
// Full lifecycle with a connected Nike-style detail view:
// Brand, Budget, Influencers (with outreach status), Deliverables,
// Results, and Finance (revenue, creator cost, other costs, profit).
// ============================================================
import { useState, useEffect } from 'react'
import { Card, Button, Badge, SearchInput, Table, Modal, Progress, Avatar, FormRow, Input, Select, statusTone } from '../ui/kit'
import { loadEnrichedCampaigns, loadCampaignDetail, loadBrands, loadInfluencers, createCampaign, fmtINR } from '../services/dataService'
import { CampaignEnriched, CampaignDetail } from '../services/dataService'
import { Brand, Influencer, CampaignStatus } from '../data/types'
import { useAuth } from '../auth/AuthContext'

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

const STATUSES: CampaignStatus[] = ['Planning', 'Outreach', 'Negotiation', 'Content', 'Approval', 'Live', 'Completed', 'Cancelled']

export default function Campaigns() {
  const { can } = useAuth()
  const [all, setAll] = useState<CampaignEnriched[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [detail, setDetail] = useState<CampaignDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  // Create modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    budget: '',
    startDate: '',
    endDate: '',
    status: 'Planning' as CampaignStatus,
    revenue: '',
    expenses: '',
    influencerIds: [] as string[],
  })

  const canManage = can('campaigns.manage')

  const fetchData = async () => {
    try {
      const [cList, bList, infList] = await Promise.all([
        loadEnrichedCampaigns(),
        loadBrands(),
        loadInfluencers(),
      ])
      setAll(cList)
      setBrands(bList)
      setInfluencers(infList)
      if (bList.length > 0 && !formData.client) {
        setFormData((prev) => ({ ...prev, client: bList[0].id }))
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filtered = all.filter((c) => {
    const q = query.toLowerCase()
    const matchesQ = !q || c.name.toLowerCase().includes(q) || c.clientName.toLowerCase().includes(q)
    return matchesQ && (status === 'All' || c.status === status)
  })

  const openDetail = async (c: CampaignEnriched) => {
    setDetailLoading(true)
    try {
      const d = await loadCampaignDetail(c.id)
      setDetail(d)
    } finally {
      setDetailLoading(false)
    }
  }

  const toggleInfluencer = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      influencerIds: prev.influencerIds.includes(id)
        ? prev.influencerIds.filter((x) => x !== id)
        : [...prev.influencerIds, id],
    }))
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setFormError('Campaign name is required.')
      return
    }
    if (!formData.client) {
      setFormError('Please select a client brand.')
      return
    }

    setSaving(true)
    setFormError(null)

    try {
      const budgetNum = parseFloat(formData.budget) || 0
      const revenueNum = parseFloat(formData.revenue) || budgetNum
      const expensesNum = parseFloat(formData.expenses) || 0

      const res = await createCampaign({
        name: formData.name.trim(),
        client: formData.client,
        budget: budgetNum,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        status: formData.status,
        contentStatus: 0,
        revenue: revenueNum,
        expenses: expensesNum,
        influencerIds: formData.influencerIds,
        results: { reach: 0, views: 0, engagement: 0, conversions: 0 },
      })

      if (!res.ok) {
        setFormError(res.error || 'Failed to create campaign.')
        setSaving(false)
        return
      }

      setIsCreateOpen(false)
      setFormData({
        name: '',
        client: brands[0]?.id ?? '',
        budget: '',
        startDate: '',
        endDate: '',
        status: 'Planning',
        revenue: '',
        expenses: '',
        influencerIds: [],
      })
      await fetchData()
    } catch (err: any) {
      setFormError(err?.message || 'An unexpected error occurred.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>Campaign Manager</h1><p>{all.length} campaigns across strategy, content, distribution and reporting.</p></div>
        {canManage && (
          <Button variant="primary" onClick={() => { setFormError(null); setIsCreateOpen(true) }}>
            + New Campaign
          </Button>
        )}
      </div>

      <Card>
        <div className="os-toolbar">
          <SearchInput placeholder="Search campaigns or clients…" value={query} onChange={setQuery} />
          <select className="os-input" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </Card>

      <Card>
        {loading ? (
          <div className="os-empty"><p>Loading campaigns…</p></div>
        ) : filtered.length === 0 ? (
          <div className="os-empty"><strong>No campaigns found</strong><p>Try adjusting filters or launch a new campaign.</p></div>
        ) : (
          <Table columns={['Campaign', 'Client', 'Status', 'Budget', 'Content', 'Revenue', 'Expenses', 'Profit', '']}>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td><strong className="os-strong">{c.name}</strong><div><small>{c.startDate || 'TBD'} → {c.endDate || 'TBD'}</small></div></td>
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
        )}
      </Card>

      {/* Campaign Detail Modal */}
      <Modal open={!!detail} title={detail?.campaign.name ?? ''} onClose={() => setDetail(null)}>
        {detail && (
          <div className="os-detail os-detail--campaign">
            {/* Status + Brand */}
            <div className="os-detail__meta">
              <Badge tone={statusTone(detail.campaign.status)}>{detail.campaign.status}</Badge>
              <span>{detail.brand.name}</span>
              <span className="os-muted-dot">·</span>
              <small>{detail.campaign.startDate || 'TBD'} → {detail.campaign.endDate || 'TBD'}</small>
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
              {detail.influencers.length === 0 ? (
                <p className="os-muted-text" style={{ fontSize: '12px', padding: '8px 0' }}>No creators assigned to this campaign yet.</p>
              ) : (
                <div className="os-campaign-table">
                  <div className="os-campaign-table__head"><span>Creator</span><span>Platform</span><span>Fee</span><span>Outreach</span></div>
                  {detail.influencers.map((item) => (
                    <div className="os-campaign-table__row" key={item.influencer.id}>
                      <div className="os-person"><Avatar name={item.influencer.name} color="#00A7C0" /><div><strong className="os-strong">{item.influencer.name}</strong><small>@{item.influencer.username}</small></div></div>
                      <span>{item.influencer.platform}</span>
                      <span>{fmtINR(item.fee)}</span>
                      <span><Badge tone={OUTREACH_TONE[item.outreachStatus]}>{OUTREACH_LABEL[item.outreachStatus]}</Badge></span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Deliverables */}
            <div className="os-detail__section">
              <div className="os-detail__section-head">
                <small>Deliverables</small>
                <span>{detail.deliverables.length} items</span>
              </div>
              {detail.deliverables.length === 0 ? (
                <p className="os-muted-text" style={{ fontSize: '12px', padding: '8px 0' }}>No deliverables created yet.</p>
              ) : (
                <div className="os-campaign-table">
                  <div className="os-campaign-table__head"><span>Deliverable</span><span>Type</span><span>Status</span><span>Due</span></div>
                  {detail.deliverables.map((d) => (
                    <div className="os-campaign-table__row" key={d.id}>
                      <strong className="os-strong">{d.title}</strong>
                      <span>{d.type}</span>
                      <span><Badge tone={statusTone(d.status)}>{d.status}</Badge></span>
                      <span>{d.dueDate || '—'}</span>
                    </div>
                  ))}
                </div>
              )}
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

      {/* Add Campaign Modal */}
      <Modal open={isCreateOpen} title="Create New Campaign" onClose={() => !saving && setIsCreateOpen(false)}>
        <form onSubmit={handleCreateSubmit} className="os-form-stack">
          {formError && (
            <div className="os-form-error" style={{ color: 'var(--os-red, #dc2626)', background: '#fee2e2', padding: '10px 14px', borderRadius: '8px', fontSize: '13px' }}>
              {formError}
            </div>
          )}

          <FormRow label="Campaign Name *">
            <Input
              required
              placeholder="e.g. Diwali Mega Launch 2026, Summer Brand Push"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </FormRow>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <FormRow label="Client Brand *">
              <Select
                required
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              >
                {brands.length === 0 ? (
                  <option value="">No brands available (Add Brand first)</option>
                ) : (
                  brands.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))
                )}
              </Select>
            </FormRow>
            <FormRow label="Status">
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </FormRow>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <FormRow label="Budget (₹) *">
              <Input
                type="number"
                min="0"
                required
                placeholder="500000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </FormRow>
            <FormRow label="Revenue (₹)">
              <Input
                type="number"
                min="0"
                placeholder="500000"
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
              />
            </FormRow>
            <FormRow label="Expenses (₹)">
              <Input
                type="number"
                min="0"
                placeholder="150000"
                value={formData.expenses}
                onChange={(e) => setFormData({ ...formData, expenses: e.target.value })}
              />
            </FormRow>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <FormRow label="Start Date">
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </FormRow>
            <FormRow label="End Date">
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </FormRow>
          </div>

          {influencers.length > 0 && (
            <FormRow label="Assign Creators">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxHeight: '160px', overflowY: 'auto', border: '1px solid var(--os-line)', padding: '10px', borderRadius: '8px' }}>
                {influencers.map((inf) => (
                  <label key={inf.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.influencerIds.includes(inf.id)}
                      onChange={() => toggleInfluencer(inf.id)}
                    />
                    <span>{inf.name} <small style={{ color: 'var(--os-muted)' }}>({inf.platform})</small></span>
                  </label>
                ))}
              </div>
            </FormRow>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="ghost" disabled={saving} onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? 'Creating…' : 'Create Campaign'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
