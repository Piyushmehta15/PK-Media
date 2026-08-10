// ============================================================
// PK MEDIA OS — Influencer CRM
// Search, filters, sorting, tags, bulk actions, status management.
// Connected to campaigns + deliverables.
// ============================================================
import { useMemo, useState } from 'react'
import { Card, CardHeader, Button, Badge, SearchInput, Select, Modal, Table, Avatar, statusTone } from '../ui/kit'
import { getInfluencers, getCampaignById, fmtINR } from '../services/dataService'
import { Influencer, InfluencerStatus } from '../data/types'

const STATUSES: InfluencerStatus[] = ['New', 'Contacted', 'Replied', 'Negotiating', 'Confirmed', 'Completed', 'Rejected']

export default function Influencers() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [platform, setPlatform] = useState('All')
  const [tag, setTag] = useState('All')
  const [selected, setSelected] = useState<string[]>([])
  const [detail, setDetail] = useState<Influencer | null>(null)

  const all = getInfluencers()
  const tags = useMemo(() => [...new Set(all.flatMap((i) => i.tags))], [all])

  const filtered = useMemo(() => all.filter((i) => {
    const q = query.toLowerCase()
    const matchesQ = !q || i.name.toLowerCase().includes(q) || i.username.toLowerCase().includes(q) || i.niche.toLowerCase().includes(q)
    const matchesStatus = status === 'All' || i.status === status
    const matchesPlatform = platform === 'All' || i.platform === platform
    const matchesTag = tag === 'All' || i.tags.includes(tag)
    return matchesQ && matchesStatus && matchesPlatform && matchesTag
  }), [all, query, status, platform, tag])

  const toggleSelect = (id: string) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id])
  const toggleAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map((i) => i.id))
  const bulkUpdate = (newStatus: InfluencerStatus) => {
    // In a connected system this persists. Mock: just clear selection.
    setSelected([])
  }

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>Influencer CRM</h1><p>{all.length} creators across platforms, connected to campaigns &amp; deliverables.</p></div>
        <Button variant="primary">+ Add Influencer</Button>
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
        {filtered.length === 0 ? (
          <div className="os-empty"><strong>No influencers found</strong><p>Try adjusting filters.</p></div>
        ) : (
          <Table columns={['', 'Creator', 'Platform', 'Niche', 'Followers', 'Eng.', 'Rate', 'Status', 'Tags', '']}>
            {filtered.map((i) => (
              <tr key={i.id}>
                <td><input type="checkbox" checked={selected.includes(i.id)} onChange={() => toggleSelect(i.id)} /></td>
                <td>
                  <div className="os-person">
                    <Avatar name={i.name} color="#00A7C0" />
                    <div><strong className="os-strong">{i.name}</strong><small>{i.username}</small></div>
                  </div>
                </td>
                <td>{i.platform}</td>
                <td>{i.niche}</td>
                <td>{i.followers.toLocaleString('en-IN')}</td>
                <td>{i.engagementRate}%</td>
                <td>{fmtINR(i.rate)}</td>
                <td><Badge tone={statusTone(i.status)}>{i.status}</Badge></td>
                <td><div className="os-tags">{i.tags.map((t) => <em key={t}>{t}</em>)}</div></td>
                <td><Button size="sm" variant="ghost" onClick={() => setDetail(i)}>View</Button></td>
              </tr>
            ))}
          </Table>
        )}
      </Card>

      <Modal open={!!detail} title={detail?.name ?? ''} onClose={() => setDetail(null)}>
        {detail && (
          <div className="os-detail">
            <div className="os-detail__meta">
              <span>@{detail.username}</span><Badge tone={statusTone(detail.status)}>{detail.status}</Badge>
            </div>
            <div className="os-detail__grid">
              <div><small>Platform</small><strong>{detail.platform}</strong></div>
              <div><small>Niche</small><strong>{detail.niche}</strong></div>
              <div><small>Location</small><strong>{detail.location}</strong></div>
              <div><small>Followers</small><strong>{detail.followers.toLocaleString('en-IN')}</strong></div>
              <div><small>Engagement</small><strong>{detail.engagementRate}%</strong></div>
              <div><small>Rate</small><strong>{fmtINR(detail.rate)}</strong></div>
            </div>
            <div className="os-detail__section"><small>Email</small><strong>{detail.email}</strong></div>
            <div className="os-detail__section"><small>Phone</small><strong>{detail.phone}</strong></div>
            <div className="os-detail__section"><small>Campaigns</small>
              <div className="os-tags">{detail.campaigns.map((c) => <em key={c}>{getCampaignById(c)?.name}</em>)}</div>
            </div>
            <div className="os-detail__section"><small>Notes</small><p>{detail.notes}</p></div>
            <div className="os-tags">{detail.tags.map((t) => <em key={t}>{t}</em>)}</div>
          </div>
        )}
      </Modal>
    </div>
  )
}
