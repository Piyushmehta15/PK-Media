// ============================================================
// PK MEDIA OS — Brand CRM
// ============================================================
import { useState, useEffect } from 'react'
import { Card, Button, Badge, SearchInput, Table, Modal, FormRow, Input, Select, Textarea, statusTone } from '../ui/kit'
import { loadBrands, loadCampaigns, createBrand } from '../services/dataService'
import { Brand, Campaign } from '../data/types'
import { useAuth } from '../auth/AuthContext'

export default function Brands() {
  const { can } = useAuth()
  const [query, setQuery] = useState('')
  const [detail, setDetail] = useState<Brand | null>(null)
  const [brands, setBrands] = useState<Brand[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  // Create Modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    budget: '',
    paymentStatus: 'pending' as 'pending' | 'partial' | 'paid',
    notes: '',
  })

  const canManage = can('brands.manage')

  const fetchData = async () => {
    try {
      const [bList, cList] = await Promise.all([loadBrands(), loadCampaigns()])
      setBrands(bList)
      setCampaigns(cList)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setFormError('Brand name is required.')
      return
    }

    setSaving(true)
    setFormError(null)

    try {
      const res = await createBrand({
        name: formData.name.trim(),
        contactPerson: formData.contactPerson.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        website: formData.website.trim(),
        industry: formData.industry.trim(),
        budget: formData.budget.trim(),
        paymentStatus: formData.paymentStatus,
        notes: formData.notes.trim(),
      })

      if (!res.ok) {
        setFormError(res.error || 'Failed to create brand.')
        setSaving(false)
        return
      }

      setIsCreateOpen(false)
      setFormData({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        website: '',
        industry: '',
        budget: '',
        paymentStatus: 'pending',
        notes: '',
      })
      await fetchData()
    } catch (err: any) {
      setFormError(err?.message || 'An unexpected error occurred.')
    } finally {
      setSaving(false)
    }
  }

  const filtered = brands.filter((b) => {
    const q = query.toLowerCase()
    return !q || b.name.toLowerCase().includes(q) || b.industry.toLowerCase().includes(q) || b.contactPerson.toLowerCase().includes(q)
  })

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>Brand CRM</h1><p>{brands.length} client brands and their campaign relationships.</p></div>
        {canManage && (
          <Button variant="primary" onClick={() => { setFormError(null); setIsCreateOpen(true) }}>
            + Add Brand
          </Button>
        )}
      </div>

      <Card>
        <div className="os-toolbar">
          <SearchInput placeholder="Search brands, industry, contact…" value={query} onChange={setQuery} />
        </div>
      </Card>

      <Card>
        {loading ? (
          <div className="os-empty"><p>Loading brands…</p></div>
        ) : filtered.length === 0 ? (
          <div className="os-empty"><strong>No brands found</strong><p>Try adjusting your search or add a new brand.</p></div>
        ) : (
          <Table columns={['Brand', 'Industry', 'Contact', 'Budget', 'Active', 'Previous', 'Payment', '']}>
            {filtered.map((b) => (
              <tr key={b.id}>
                <td><strong className="os-strong">{b.name}</strong><div><small>{b.website || '—'}</small></div></td>
                <td>{b.industry || '—'}</td>
                <td><div className="os-person"><div><strong className="os-strong">{b.contactPerson || '—'}</strong><small>{b.email}</small></div></div></td>
                <td>{b.budget || '—'}</td>
                <td>{b.activeCampaigns}</td>
                <td>{b.previousCampaigns}</td>
                <td><Badge tone={statusTone(b.paymentStatus)}>{b.paymentStatus}</Badge></td>
                <td><Button size="sm" variant="ghost" onClick={() => setDetail(b)}>View</Button></td>
              </tr>
            ))}
          </Table>
        )}
      </Card>

      {/* View Brand Modal */}
      <Modal open={!!detail} title={detail?.name ?? ''} onClose={() => setDetail(null)}>
        {detail && (
          <div className="os-detail">
            <div className="os-detail__meta"><Badge tone={statusTone(detail.paymentStatus)}>{detail.paymentStatus}</Badge></div>
            <div className="os-detail__grid">
              <div><small>Contact</small><strong>{detail.contactPerson || '—'}</strong></div>
              <div><small>Email</small><strong>{detail.email || '—'}</strong></div>
              <div><small>Phone</small><strong>{detail.phone || '—'}</strong></div>
              <div><small>Industry</small><strong>{detail.industry || '—'}</strong></div>
              <div><small>Budget</small><strong>{detail.budget || '—'}</strong></div>
              <div><small>Website</small><strong>{detail.website || '—'}</strong></div>
            </div>
            <div className="os-detail__section"><small>Active campaigns</small>
              <div className="os-tags">
                {campaigns.filter((c) => c.client === detail.id).length > 0 ? (
                  campaigns.filter((c) => c.client === detail.id).map((c) => <em key={c.id}>{c.name}</em>)
                ) : (
                  <span className="os-muted-text">None</span>
                )}
              </div>
            </div>
            {detail.notes && (
              <div className="os-detail__section"><small>Notes</small><p>{detail.notes}</p></div>
            )}
          </div>
        )}
      </Modal>

      {/* Add Brand Modal */}
      <Modal open={isCreateOpen} title="Add New Brand" onClose={() => !saving && setIsCreateOpen(false)}>
        <form onSubmit={handleCreateSubmit} className="os-form-stack">
          {formError && (
            <div className="os-form-error" style={{ color: 'var(--os-red, #dc2626)', background: '#fee2e2', padding: '10px 14px', borderRadius: '8px', fontSize: '13px' }}>
              {formError}
            </div>
          )}

          <FormRow label="Brand Name *">
            <Input
              required
              placeholder="e.g. Nike India, Boat, Unacademy"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </FormRow>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <FormRow label="Contact Person">
              <Input
                placeholder="e.g. Rahul Sharma"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              />
            </FormRow>
            <FormRow label="Contact Email">
              <Input
                type="email"
                placeholder="rahul@brand.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </FormRow>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <FormRow label="Phone">
              <Input
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </FormRow>
            <FormRow label="Website">
              <Input
                placeholder="https://brand.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </FormRow>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <FormRow label="Industry">
              <Input
                placeholder="e.g. D2C, EdTech, FinTech, Fashion"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              />
            </FormRow>
            <FormRow label="Budget">
              <Input
                placeholder="e.g. ₹5,00,000 / campaign"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </FormRow>
          </div>

          <FormRow label="Payment Status">
            <Select
              value={formData.paymentStatus}
              onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as any })}
            >
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
              <option value="paid">Paid</option>
            </Select>
          </FormRow>

          <FormRow label="Notes">
            <Textarea
              placeholder="Campaign objectives, target audience, brand preferences…"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </FormRow>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="ghost" disabled={saving} onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? 'Creating…' : 'Create Brand'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
