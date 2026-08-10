// ============================================================
// PK MEDIA OS — Supabase-backed domain service layer
// Keeps the existing UI abstraction. Reads/writes through Supabase
// (RLS-enforced) when configured; otherwise falls back to mock DB.
// No raw Supabase queries in UI components.
// ============================================================
import { supabase } from '../../lib/supabase'
import { dataSource } from '../config/dataSource'
import { db } from '../data/mockDb'
import {
  Brand, Influencer, Campaign, CampaignInfluencer, Deliverable, Outreach,
  FollowUp, Proposal, Invoice, Contract, Payment, Expense, Meeting,
  Notification, Document, ActivityLog,
} from '../data/types'

// ---------- mapping helpers ----------
function mapCampaign(row: any): Campaign {
  return {
    id: row.id,
    name: row.name,
    client: row.client,
    budget: Number(row.budget),
    startDate: row.start_date,
    endDate: row.end_date,
    influencerIds: [],
    deliverables: [],
    status: row.status,
    contentStatus: row.content_status,
    revenue: Number(row.revenue),
    expenses: Number(row.expenses),
    results: {
      reach: Number(row.results_reach),
      views: Number(row.results_views),
      engagement: Number(row.results_engagement),
      conversions: Number(row.results_conversions),
    },
    organization_id: row.organization_id,
  }
}

/**
 * Resolve the caller's organization_id from the authenticated session.
 * NEVER trusts a client-supplied org id. Returns null when not in
 * Supabase mode or when no session is present.
 */
async function getCurrentOrgId(): Promise<string | null> {
  if (dataSource !== 'supabase' || !supabase) return null
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) return null
  const { data } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', session.user.id)
    .single()
  return data?.organization_id ?? null
}

// ============================================================
// BRANDS
// ============================================================
export async function getBrands(): Promise<Brand[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('brands').select('*').order('created_at', { ascending: false })
    return (data ?? []).map((r: any) => ({
      id: r.id, organization_id: r.organization_id, name: r.name, contactPerson: r.contact_person,
      email: r.email, phone: r.phone, website: r.website, industry: r.industry, budget: r.budget,
      activeCampaigns: Number(r.active_campaigns), previousCampaigns: Number(r.previous_campaigns),
      notes: r.notes, paymentStatus: r.payment_status, createdAt: r.created_at,
    }))
  }
  return db.brands
}

// ============================================================
// INFLUENCERS
// ============================================================
export async function getInfluencers(): Promise<Influencer[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('influencers').select('*').order('created_at', { ascending: false })
    return (data ?? []).map((r: any) => ({
      id: r.id, organization_id: r.organization_id, name: r.name, username: r.username,
      platform: r.platform, niche: r.niche, location: r.location, followers: Number(r.followers),
      engagementRate: Number(r.engagement_rate), email: r.email, phone: r.phone, rate: Number(r.rate),
      status: r.status, campaigns: [], notes: r.notes, tags: r.tags ?? [], createdAt: r.created_at,
    }))
  }
  return db.influencers
}

export async function createInfluencer(input: Partial<Influencer>): Promise<{ ok: boolean; error?: string }> {
  if (dataSource === 'supabase' && supabase) {
    // organization_id is resolved from the session, never from the client.
    const organization_id = await getCurrentOrgId()
    if (!organization_id) return { ok: false, error: 'No organization context for this session.' }
    const { error } = await supabase.from('influencers').insert({
      organization_id,
      name: input.name ?? '', username: input.username ?? '', platform: input.platform ?? 'Instagram',
      niche: input.niche ?? '', location: input.location ?? '', email: input.email ?? '', phone: input.phone ?? '',
      rate: input.rate ?? 0, status: input.status ?? 'New', notes: input.notes ?? '', tags: input.tags ?? [],
    })
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  }
  return { ok: true }
}

export async function updateInfluencer(id: string, patch: Partial<Influencer>): Promise<{ ok: boolean; error?: string }> {
  if (dataSource === 'supabase' && supabase) {
    const { error } = await supabase.from('influencers').update({
      status: patch.status, rate: patch.rate, notes: patch.notes, tags: patch.tags,
    }).eq('id', id)
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  }
  return { ok: true }
}

// ============================================================
// CAMPAIGNS
// ============================================================
export async function getCampaigns(): Promise<Campaign[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('campaigns').select('*').order('created_at', { ascending: false })
    return (data ?? []).map(mapCampaign)
  }
  return db.campaigns
}

export async function getCampaignDeliverables(campaignId: string): Promise<Deliverable[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('deliverables').select('*').eq('campaign_id', campaignId)
    return (data ?? []).map((r: any) => ({
      id: r.id, organization_id: r.organization_id, campaignId: r.campaign_id, influencerId: r.influencer_id,
      title: r.title, type: r.type, status: r.status, dueDate: r.due_date, link: r.link,
    }))
  }
  return db.deliverables.filter((d) => d.campaignId === campaignId)
}

export async function getCampaignInfluencers(campaignId: string): Promise<CampaignInfluencer[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('campaign_influencers').select('*').eq('campaign_id', campaignId)
    return (data ?? []).map((r: any) => ({
      id: r.id, organization_id: r.organization_id, campaignId: r.campaign_id, influencerId: r.influencer_id,
      fee: Number(r.fee), status: r.status, deliverables: [],
    }))
  }
  return db.campaignInfluencers.filter((ci) => ci.campaignId === campaignId)
}

// ============================================================
// DELIVERABLES
// ============================================================
export async function getDeliverables(): Promise<Deliverable[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('deliverables').select('*').order('due_date', { ascending: true })
    return (data ?? []).map((r: any) => ({
      id: r.id, organization_id: r.organization_id, campaignId: r.campaign_id, influencerId: r.influencer_id,
      title: r.title, type: r.type, status: r.status, dueDate: r.due_date, link: r.link,
    }))
  }
  return db.deliverables
}

export async function updateDeliverable(id: string, status: string): Promise<{ ok: boolean; error?: string }> {
  if (dataSource === 'supabase' && supabase) {
    const { error } = await supabase.from('deliverables').update({ status }).eq('id', id)
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  }
  return { ok: true }
}

// ============================================================
// OUTREACH
// ============================================================
export async function getOutreach(): Promise<Outreach[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('outreach').select('*').order('created_at', { ascending: false })
    return (data ?? []).map((r: any) => ({
      id: r.id, organization_id: r.organization_id, influencerId: r.influencer_id, campaignId: r.campaign_id,
      subject: r.subject, message: r.message, channel: r.channel, status: r.status, sentAt: r.sent_at,
    }))
  }
  return db.outreach
}

// ============================================================
// FOLLOW-UPS
// ============================================================
export async function getFollowUps(): Promise<FollowUp[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('follow_ups').select('*').order('due_date', { ascending: true })
    return (data ?? []).map((r: any) => ({
      id: r.id, organization_id: r.organization_id, influencerId: r.influencer_id, outreachId: r.outreach_id,
      dueDate: r.due_date, note: r.note, status: r.status,
    }))
  }
  return db.followUps
}

// ============================================================
// FINANCE (invoices, payments, expenses)
// ============================================================
export async function getInvoices(): Promise<Invoice[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('invoices').select('*').order('created_at', { ascending: false })
    return (data ?? []).map((r: any) => ({
      id: r.id, organization_id: r.organization_id, brandId: r.brand_id, campaignId: r.campaign_id,
      number: r.number, amount: Number(r.amount), status: r.status, issuedAt: r.issued_at, dueAt: r.due_at,
    }))
  }
  return db.invoices
}

export async function getPayments(): Promise<Payment[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('payments').select('*').order('created_at', { ascending: false })
    return (data ?? []).map((r: any) => ({
      id: r.id, organization_id: r.organization_id, invoiceId: r.invoice_id, amount: Number(r.amount),
      method: r.method, status: r.status, receivedAt: r.received_at,
    }))
  }
  return db.payments
}

export async function getExpenses(): Promise<Expense[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('expenses').select('*').order('date', { ascending: false })
    return (data ?? []).map((r: any) => ({
      id: r.id, organization_id: r.organization_id, category: r.category, amount: Number(r.amount),
      note: r.note, date: r.date,
    }))
  }
  return db.expenses
}

// ============================================================
// PROPOSALS / CONTRACTS
// ============================================================
export async function getProposals(): Promise<Proposal[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('proposals').select('*').order('created_at', { ascending: false })
    return (data ?? []).map((r: any) => ({
      id: r.id, organization_id: r.organization_id, brandId: r.brand_id, title: r.title,
      amount: Number(r.amount), status: r.status, createdAt: r.created_at,
    }))
  }
  return db.proposals
}

export async function getContracts(): Promise<Contract[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('contracts').select('*').order('created_at', { ascending: false })
    return (data ?? []).map((r: any) => ({
      id: r.id, organization_id: r.organization_id, brandId: r.brand_id, campaignId: r.campaign_id,
      title: r.title, status: r.status, createdAt: r.created_at,
    }))
  }
  return db.contracts
}

// ============================================================
// MEETINGS / NOTIFICATIONS / DOCUMENTS
// ============================================================
export async function getMeetings(): Promise<Meeting[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('meetings').select('*').order('date', { ascending: true })
    return (data ?? []).map((r: any) => ({
      id: r.id, organization_id: r.organization_id, title: r.title, date: r.date,
      attendees: r.attendees ?? [], type: r.type, notes: r.notes,
    }))
  }
  return db.meetings
}

export async function getNotifications(userId: string): Promise<Notification[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    return (data ?? []).map((r: any) => ({
      id: r.id, userId: r.user_id, title: r.title, message: r.message, read: r.read, createdAt: r.created_at,
    }))
  }
  return db.notifications.filter((n) => n.userId === userId || n.userId === 'u-admin')
}

export async function getDocuments(): Promise<Document[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('documents').select('*').order('created_at', { ascending: false })
    return (data ?? []).map((r: any) => ({
      id: r.id, organization_id: r.organization_id, name: r.name, category: r.category,
      brandId: r.brand_id, campaignId: r.campaign_id, size: r.size, uploadedAt: r.created_at,
      uploadedBy: r.uploaded_by, accessRoles: r.access_roles ?? [],
    }))
  }
  return db.documents
}

// ============================================================
// ACTIVITY LOGS
// ============================================================
export async function getTeamActivity(): Promise<ActivityLog[]> {
  if (dataSource === 'supabase' && supabase) {
    const { data } = await supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(50)
    return (data ?? []).map((r: any) => ({
      id: r.id, organization_id: r.organization_id, userId: r.user_id, action: r.action,
      entity: r.entity, entityId: r.entity_id, createdAt: r.created_at,
    }))
  }
  return db.activityLogs
}
