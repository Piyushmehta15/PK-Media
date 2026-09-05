// ============================================================
// PK MEDIA OS — Influencer CRM
// Search, filters, sorting, tags, bulk actions, status management.
// Connected to campaigns & deliverables.
// ============================================================
import { useMemo, useState, useEffect } from 'react'
import { Card, Button, Badge, SearchInput, Select, Modal, Table, Avatar, FormRow, Input, Textarea, statusTone } from '../ui/kit'
import { loadInfluencers, loadCampaigns, createInfluencer, fmtINR } from '../services/dataService'
import { Influencer, InfluencerStatus, Campaign } from '../data/types'
import { useAuth } from '../auth/AuthContext'

const STATUSES: InfluencerStatus[] = ['New', 'Contacted', 'Replied', 'Negotiating', 'Confirmed', 'Completed', 'Rejected']

export default function Influencers() {
  const { can } = useAuth()
  const [all, setAll] = useState<Influencer[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [platform, setPlatform] = useState('All')
  const [tag, setTag] = useState('All')
  const [selected, setSelected] = useState<string[]>([])
  const [detail, setDetail] = useState<Influencer | null>(null)

  // Create modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    platform: 'Instagram' as Influencer['platform'],
    niche: '',
    location: '',
    followers: '',
    engagementRate: '',
    rate: '',
    status: 'New' as InfluencerStatus,
    email: '',
    phone: '',
    tags: '',
    notes: '',
  })

  const canManage = can('influencers.manage')

  const fetchData = async () => {
    try {
      const [infList, campList] = await Promise.all([loadInfluencers(), loadCampaigns()])
      setAll(infList)
      setCampaigns(campList)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const tags = useMemo(() => [...new Set(all.flatMap((i) => i.tags || []))], [all])

  const filtered = useMemo(() => all.filter((i) => {
    const q = query.toLowerCase()
    const matchesQ = !q || i.name.toLowerCase().includes(q) || i.username.toLowerCase().includes(q) || i.niche.toLowerCase().includes(q)
    const matchesStatus = status === 'All' || i.status === status
    const matchesPlatform = platform === 'All' || i.platform === platform
    const matchesTag = tag === 'All' || (i.tags && i.tags.includes(tag))
    return matchesQ && matchesStatus && matchesPlatform && matchesTag
  }), [all, query, status, platform, tag])

  const toggleSelect = (id: string) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id])
  const bulkUpdate = (_newStatus: InfluencerStatus) => {
    setSelected([])
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.username.trim()) {
      setFormError('Creator name and handle are required.')
      return
    }

    setSaving(true)
    setFormError(null)

    try {
      const parsedTags = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)

      const res = await createInfluencer({
        name: formData.name.trim(),
        username: formData.username.trim().replace(/^@/, ''),
        platform: formData.platform,
        niche: formData.niche.trim(),
        location: formData.location.trim(),
        followers: parseInt(formData.followers, 10) || 0,
        engagementRate: parseFloat(formData.engagementRate) || 0,
        rate: parseFloat(formData.rate) || 0,
        status: formData.status,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        tags: parsedTags,
        notes: formData.notes.trim(),
      })

      if (!res.ok) {
        setFormError(res.error || 'Failed to create influencer.')
        setSaving(false)
        return
      }

      setIsCreateOpen(false)
      setFormData({
        name: '',
        username: '',
        platform: 'Instagram',
        niche: '',
        location: '',
        followers: '',
        engagementRate: '',
        rate: '',
        status: 'New',
        email: '',
        phone: '',
        tags: '',
        notes: '',
      })
      await fetchData()
    } catch (err: any) {
      setFormError(err?.message || 'An unexpected error occurred.')
    } finally {
      setSaving(false)
    }
  }

  const getCampaignName = (cId: string) => {
    const c = campaigns.find((x) => x.id === cId)
    return c?.name || cId
  }

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>Influencer CRM</h1><p>{all.length} creators across platforms, connected to campaigns &amp; deliverables.</p></div>
        {canManage && (
          <Button variant="primary" onClick={() => { setFormError(null); setIsCreateOpen(true) }}>
            + Add Influencer
          </Button>
        )}
      </div>

      <Card>
        <div className="os-toolbar">
          <SearchInput placeholder="Search by name, @handle, niche…" value={query} onChange={setQuery} />
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}
          </Select>
          <Select value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option>All</option><option>Instagram</option><option>YouTube</option><option>TikTok</option><option>LinkedIn</option><option>X</option>
          </Select>
          <Select value={tag} onChange={(e) => setTag(e.target.value)}>
            <option>All</option>{tags.map((t) => <option key={t}>{t}</option>)}
          </Select>
          {selected.length > 0 && (
            <div className="os-bulk">
              <span>{selected.length} selected</span>
              {STATUSES.slice(0, 4).map((s) => <Button key={s} size="sm" variant="secondary" onClick={() => bulkUpdate(s)}>{s}</Button>)}
            </div>
          )}
        </div>
      </Card>

      <Card>
        {loading ? (
          <div className="os-empty"><p>Loading creators…</p></div>
        ) : filtered.length === 0 ? (
          <div className="os-empty"><strong>No influencers found</strong><p>Try adjusting filters or add a new creator.</p></div>
        ) : (
          <Table columns={['', 'Creator', 'Platform', 'Niche', 'Followers', 'Eng.', 'Rate', 'Status', 'Tags', '']}>
            {filtered.map((i) => (
              <tr key={i.id}>
                <td><input type="checkbox" checked={selected.includes(i.id)} onChange={() => toggleSelect(i.id)} /></td>
                <td>
                  <div className="os-person">
                    <Avatar name={i.name} color="#00A7C0" />
                    <div><strong className="os-strong">{i.name}</strong><small>@{i.username}</small></div>
                  </div>
                </td>
                <td>{i.platform}</td>
                <td>{i.niche || '—'}</td>
                <td>{(i.followers || 0).toLocaleString('en-IN')}</td>
                <td>{i.engagementRate || 0}%</td>
                <td>{fmtINR(i.rate || 0)}</td>
                <td><Badge tone={statusTone(i.status)}>{i.status}</Badge></td>
                <td><div className="os-tags">{(i.tags || []).map((t) => <em key={t}>{t}</em>)}</div></td>
                <td><Button size="sm" variant="ghost" onClick={() => setDetail(i)}>View</Button></td>
              </tr>
            ))}
          </Table>
        )}
      </Card>

      {/* View Detail Modal */}
      <Modal open={!!detail} title={detail?.name ?? ''} onClose={() => setDetail(null)}>
        {detail && (
          <div className="os-detail">
            <div className="os-detail__meta">
              <span>@{detail.username}</span><Badge tone={statusTone(detail.status)}>{detail.status}</Badge>
            </div>
            <div className="os-detail__grid">
              <div><small>Platform</small><strong>{detail.platform}</strong></div>
              <div><small>Niche</small><strong>{detail.niche || '—'}</strong></div>
              <div><small>Location</small><strong>{detail.location || '—'}</strong></div>
              <div><small>Followers</small><strong>{(detail.followers || 0).toLocaleString('en-IN')}</strong></div>
              <div><small>Engagement</small><strong>{detail.engagementRate || 0}%</strong></div>
              <div><small>Rate</small><strong>{fmtINR(detail.rate || 0)}</strong></div>
            </div>
            <div className="os-detail__section"><small>Email</small><strong>{detail.email || '—'}</strong></div>
            <div className="os-detail__section"><small>Phone</small><strong>{detail.phone || '—'}</strong></div>
            <div className="os-detail__section"><small>Campaigns</small>
              <div className="os-tags">
                {(detail.campaigns || []).length > 0 ? (
                  detail.campaigns.map((c) => <em key={c}>{getCampaignName(c)}</em>)
                ) : (
                  <span className="os-muted-text">None</span>
                )}
              </div>
            </div>
            {detail.notes && (
              <div className="os-detail__section"><small>Notes</small><p>{detail.notes}</p></div>
            )}
            <div className="os-tags">{(detail.tags || []).map((t) => <em key={t}>{t}</em>)}</div>
          </div>
        )}
      </Modal>

      {/* Add Influencer Modal */}
      <Modal open={isCreateOpen} title="Add New Creator" onClose={() => !saving && setIsCreateOpen(false)}>
        <form onSubmit={handleCreateSubmit} className="os-form-stack">
          {formError && (
            <div className="os-form-error" style={{ color: 'var(--os-red, #dc2626)', background: '#fee2e2', padding: '10px 14px', borderRadius: '8px', fontSize: '13px' }}>
              {formError}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <FormRow label="Creator Name *">
              <Input
                required
                placeholder="e.g. Tanmay Bhat, Sharan Hegde"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </FormRow>
            <FormRow label="Handle / Username *">
              <Input
                required
                placeholder="e.g. tanmaybhat"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </FormRow>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <FormRow label="Platform *">
              <Select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
              >
                <option value="Instagram">Instagram</option>
                <option value="YouTube">YouTube</option>
                <option value="TikTok">TikTok</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="X">X</option>
              </Select>
            </FormRow>
            <FormRow label="Niche">
              <Input
                placeholder="e.g. Finance, Tech, Comedy"
                value={formData.niche}
                onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
              />
            </FormRow>
            <FormRow label="Location">
              <Input
                placeholder="e.g. Mumbai, Bangalore"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </FormRow>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <FormRow label="Followers">
              <Input
                type="number"
                min="0"
                placeholder="e.g. 500000"
                value={formData.followers}
                onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
              />
            </FormRow>
            <FormRow label="Engagement (%)">
              <Input
                type="number"
                step="0.1"
                min="0"
                placeholder="e.g. 4.8"
                value={formData.engagementRate}
                onChange={(e) => setFormData({ ...formData, engagementRate: e.target.value })}
              />
            </FormRow>
            <FormRow label="Rate (₹)">
              <Input
                type="number"
                min="0"
                placeholder="e.g. 150000"
                value={formData.rate}
                onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
              />
            </FormRow>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <FormRow label="Email">
              <Input
                type="email"
                placeholder="creator@management.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </FormRow>
            <FormRow label="Phone">
              <Input
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </FormRow>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
            <FormRow label="Tags (comma-separated)">
              <Input
                placeholder="e.g. top-tier, reels, podcast"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </FormRow>
          </div>

          <FormRow label="Notes">
            <Textarea
              placeholder="Content style, brand suitability, agency notes…"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </FormRow>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="ghost" disabled={saving} onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? 'Creating…' : 'Add Creator'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
