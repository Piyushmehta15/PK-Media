// ============================================================
// PK MEDIA OS — Brand CRM
// ============================================================
import { useState } from 'react'
import { Card, CardHeader, Button, Badge, SearchInput, Table, Modal, statusTone } from '../ui/kit'
import { getBrands, getCampaigns, fmtINR } from '../services/dataService'
import { Brand } from '../data/types'

export default function Brands() {
  const [query, setQuery] = useState('')
  const [detail, setDetail] = useState<Brand | null>(null)
  const brands = getBrands()
  const campaigns = getCampaigns()

  const filtered = brands.filter((b) => {
    const q = query.toLowerCase()
    return !q || b.name.toLowerCase().includes(q) || b.industry.toLowerCase().includes(q) || b.contactPerson.toLowerCase().includes(q)
  })

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>Brand CRM</h1><p>{brands.length} client brands and their campaign relationships.</p></div>
        <Button variant="primary">+ Add Brand</Button>
      </div>

      <Card>
        <div className="os-toolbar">
          <SearchInput placeholder="Search brands, industry, contact…" value={query} onChange={setQuery} />
        </div>
      </Card>

      <Card>
        <Table columns={['Brand', 'Industry', 'Contact', 'Budget', 'Active', 'Previous', 'Payment', '']}>
          {filtered.map((b) => (
            <tr key={b.id}>
              <td><strong className="os-strong">{b.name}</strong><div><small>{b.website}</small></div></td>
              <td>{b.industry}</td>
              <td><div className="os-person"><div><strong className="os-strong">{b.contactPerson}</strong><small>{b.email}</small></div></div></td>
              <td>{b.budget}</td>
              <td>{b.activeCampaigns}</td>
              <td>{b.previousCampaigns}</td>
              <td><Badge tone={statusTone(b.paymentStatus)}>{b.paymentStatus}</Badge></td>
              <td><Button size="sm" variant="ghost" onClick={() => setDetail(b)}>View</Button></td>
            </tr>
          ))}
        </Table>
      </Card>

      <Modal open={!!detail} title={detail?.name ?? ''} onClose={() => setDetail(null)}>
        {detail && (
          <div className="os-detail">
            <div className="os-detail__meta"><Badge tone={statusTone(detail.paymentStatus)}>{detail.paymentStatus}</Badge></div>
            <div className="os-detail__grid">
              <div><small>Contact</small><strong>{detail.contactPerson}</strong></div>
              <div><small>Email</small><strong>{detail.email}</strong></div>
              <div><small>Phone</small><strong>{detail.phone}</strong></div>
              <div><small>Industry</small><strong>{detail.industry}</strong></div>
              <div><small>Budget</small><strong>{detail.budget}</strong></div>
              <div><small>Website</small><strong>{detail.website}</strong></div>
            </div>
            <div className="os-detail__section"><small>Active campaigns</small>
              <div className="os-tags">{campaigns.filter((c) => c.client === detail.id).map((c) => <em key={c.id}>{c.name}</em>)}</div>
            </div>
            <div className="os-detail__section"><small>Notes</small><p>{detail.notes}</p></div>
          </div>
        )}
      </Modal>
    </div>
  )
}
