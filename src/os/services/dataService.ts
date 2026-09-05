// ============================================================
// PK MEDIA OS — Data service layer
// Unified facade over mock + Supabase. The UI consumes these
// functions; the implementation is swapped by dataSource config.
// Influencers -> Campaigns -> Deliverables -> Payments -> Analytics
// are all connected here.
// ============================================================
import { db, currencyConfig } from '../data/mockDb'
import { dataSource } from '../config/dataSource'
import * as sb from './supabaseService'
import {
  Campaign, Influencer, Deliverable, Brand, Invoice, Expense,
  User, Role,
} from '../data/types'

export const fmtINR = (n: number) => `${currencyConfig.symbol}${n.toLocaleString('en-IN')}`

// ---- Async data-source-aware accessors (used when Supabase is configured) ----
export const useSupabase = dataSource === 'supabase'
export function isSupabaseMode() { return dataSource === 'supabase' }

export async function loadCampaigns(): Promise<Campaign[]> {
  return useSupabase ? sb.getCampaigns() : db.campaigns
}
export async function loadInfluencers(): Promise<Influencer[]> {
  return useSupabase ? sb.getInfluencers() : db.influencers
}
export async function loadBrands(): Promise<Brand[]> {
  return useSupabase ? sb.getBrands() : db.brands
}
export async function loadDeliverables(): Promise<Deliverable[]> {
  return useSupabase ? sb.getDeliverables() : db.deliverables
}
export async function loadInvoices(): Promise<Invoice[]> {
  return useSupabase ? sb.getInvoices() : db.invoices
}
export async function loadExpenses(): Promise<Expense[]> {
  return useSupabase ? sb.getExpenses() : db.expenses
}

export async function createCampaign(input: Partial<Campaign>) {
  return sb.createCampaign(input)
}
export async function createInfluencer(input: Partial<Influencer>) {
  return sb.createInfluencer(input)
}
export async function createBrand(input: Partial<Brand>) {
  return sb.createBrand(input)
}

export function getCampaigns(): Campaign[] { return db.campaigns }
export function getInfluencers(): Influencer[] { return db.influencers }
export function getBrands(): Brand[] { return db.brands }
export function getDeliverables(): Deliverable[] { return db.deliverables }
export function getInvoices(): Invoice[] { return db.invoices }
export function getExpenses(): Expense[] { return db.expenses }
export function getNotificationsFor(userId: string) {
  return db.notifications.filter((n) => n.userId === userId || n.userId === 'u-admin')
}
export function getDocumentsFor(role: Role) {
  return db.documents.filter((d) => d.accessRoles.includes(role))
}

export function getCampaignById(id: string) { return db.campaigns.find((c) => c.id === id) }
export function getBrandById(id: string) { return db.brands.find((b) => b.id === id) }
export function getInfluencerById(id: string) { return db.influencers.find((i) => i.id === id) }

export interface CampaignEnriched extends Campaign {
  clientName: string
  assignedInfluencers: Influencer[]
  campaignDeliverables: Deliverable[]
  profit: number
  margin: number
}

export function getEnrichedCampaigns(): CampaignEnriched[] {
  return db.campaigns.map((c) => {
    const client = getBrandById(c.client)
    const assignedInfluencers = c.influencerIds.map(getInfluencerById).filter(Boolean) as Influencer[]
    const campaignDeliverables = db.deliverables.filter((d) => d.campaignId === c.id)
    const profit = c.revenue - c.expenses
    const margin = c.revenue > 0 ? Math.round((profit / c.revenue) * 100) : 0
    return {
      ...c,
      clientName: client?.name ?? 'Unknown',
      assignedInfluencers,
      campaignDeliverables,
      profit,
      margin,
    }
  })
}

export async function loadEnrichedCampaigns(): Promise<CampaignEnriched[]> {
  const [campaigns, brands, influencers, deliverables] = await Promise.all([
    loadCampaigns(),
    loadBrands(),
    loadInfluencers(),
    loadDeliverables(),
  ])
  const brandMap = new Map(brands.map((b) => [b.id, b]))
  const infMap = new Map(influencers.map((i) => [i.id, i]))
  return campaigns.map((c) => {
    const client = brandMap.get(c.client)
    const assignedInfluencers = c.influencerIds.map((id) => infMap.get(id)).filter(Boolean) as Influencer[]
    const campaignDeliverables = deliverables.filter((d) => d.campaignId === c.id)
    const profit = c.revenue - c.expenses
    const margin = c.revenue > 0 ? Math.round((profit / c.revenue) * 100) : 0
    return {
      ...c,
      clientName: client?.name ?? 'Unknown',
      assignedInfluencers,
      campaignDeliverables,
      profit,
      margin,
    }
  })
}

export interface DashboardSummary {
  activeCampaigns: number
  totalInfluencers: number
  totalBrands: number
  pendingFollowUps: number
  upcomingMeetings: number
  pendingDeliverables: number
  revenue: number
  expenses: number
  profit: number
  margin: number
  totalReach: number
  totalViews: number
  avgEngagement: number
}

export function getDashboardSummary(): DashboardSummary {
  const campaigns = db.campaigns
  const active = campaigns.filter((c) => ['Planning', 'Outreach', 'Negotiation', 'Content', 'Approval', 'Live'].includes(c.status))
  const revenue = campaigns.reduce((s, c) => s + c.revenue, 0)
  const expenses = campaigns.reduce((s, c) => s + c.expenses, 0) + db.expenses.reduce((s, e) => s + e.amount, 0)
  const profit = revenue - expenses
  const totalReach = campaigns.reduce((s, c) => s + c.results.reach, 0)
  const totalViews = campaigns.reduce((s, c) => s + c.results.views, 0)
  const withResults = campaigns.filter((c) => c.results.engagement > 0)
  const avgEngagement = withResults.length ? Math.round((withResults.reduce((s, c) => s + c.results.engagement, 0) / withResults.length) * 10) / 10 : 0

  return {
    activeCampaigns: active.length,
    totalInfluencers: db.influencers.length,
    totalBrands: db.brands.length,
    pendingFollowUps: db.followUps.filter((f) => f.status === 'Pending').length,
    upcomingMeetings: db.meetings.length,
    pendingDeliverables: db.deliverables.filter((d) => d.status === 'Pending' || d.status === 'In Progress').length,
    revenue,
    expenses,
    profit,
    margin: revenue > 0 ? Math.round((profit / revenue) * 100) : 0,
    totalReach,
    totalViews,
    avgEngagement,
  }
}

export async function loadDashboardSummary(): Promise<DashboardSummary> {
  const [campaigns, influencers, brands, deliverables, expenses] = await Promise.all([
    loadCampaigns(),
    loadInfluencers(),
    loadBrands(),
    loadDeliverables(),
    loadExpenses(),
  ])
  const active = campaigns.filter((c) => ['Planning', 'Outreach', 'Negotiation', 'Content', 'Approval', 'Live'].includes(c.status))
  const revenue = campaigns.reduce((s, c) => s + c.revenue, 0)
  const totalExpenses = campaigns.reduce((s, c) => s + c.expenses, 0) + expenses.reduce((s, e) => s + e.amount, 0)
  const profit = revenue - totalExpenses
  const totalReach = campaigns.reduce((s, c) => s + c.results.reach, 0)
  const totalViews = campaigns.reduce((s, c) => s + c.results.views, 0)
  const withResults = campaigns.filter((c) => c.results.engagement > 0)
  const avgEngagement = withResults.length ? Math.round((withResults.reduce((s, c) => s + c.results.engagement, 0) / withResults.length) * 10) / 10 : 0

  return {
    activeCampaigns: active.length,
    totalInfluencers: influencers.length,
    totalBrands: brands.length,
    pendingFollowUps: db.followUps.filter((f) => f.status === 'Pending').length,
    upcomingMeetings: db.meetings.length,
    pendingDeliverables: deliverables.filter((d) => d.status === 'Pending' || d.status === 'In Progress').length,
    revenue,
    expenses: totalExpenses,
    profit,
    margin: revenue > 0 ? Math.round((profit / revenue) * 100) : 0,
    totalReach,
    totalViews,
    avgEngagement,
  }
}

export function getTeamActivity(): { user: User; action: string; time: string }[] {
  return db.activityLogs.map((log) => ({
    user: db.users.find((u) => u.id === log.userId)!,
    action: log.action,
    time: new Date(log.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
  }))
}

export function getPaymentStatusSummary() {
  const totalInvoiced = db.invoices.reduce((s, i) => s + i.amount, 0)
  const received = db.payments.reduce((s, p) => s + p.amount, 0)
  return {
    totalInvoiced,
    received,
    outstanding: totalInvoiced - received,
    paidCount: db.payments.length,
    invoiceCount: db.invoices.length,
  }
}

export function getProfitBreakdown() {
  const byCategory = db.expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + e.amount
    return acc
  }, {})
  return byCategory
}

export function getRevenueByCampaign() {
  return db.campaigns.map((c) => ({ name: c.name, revenue: c.revenue, profit: c.revenue - c.expenses }))
}

export function getDeliverablesForUser(role: Role, userId: string): Deliverable[] {
  if (role === 'EDITOR') {
    // Editors see deliverables on campaigns they are assigned to (mock: all, since no editor-campaign map)
    return db.deliverables
  }
  if (role === 'CLIENT') {
    return db.deliverables // mock: client sees their deliverables
  }
  return db.deliverables
}

export function getMeetingAttendees(attendeeIds: string[]): User[] {
  return attendeeIds.map((id) => db.users.find((u) => u.id === id)).filter(Boolean) as User[]
}

// ---- Comprehensive campaign detail (Nike-style breakdown) ----
export interface CampaignDetail {
  campaign: CampaignEnriched
  brand: Brand
  influencers: {
    influencer: Influencer
    fee: number
    outreachStatus: 'sent' | 'replied' | 'negotiating' | 'confirmed'
  }[]
  deliverables: Deliverable[]
  creatorCost: number
  otherCosts: number
  totalCost: number
  profit: number
  margin: number
}

const OUTREACH_STATUS: Record<string, 'sent' | 'replied' | 'negotiating' | 'confirmed'> = {
  New: 'sent',
  Contacted: 'sent',
  Replied: 'replied',
  Negotiating: 'negotiating',
  Confirmed: 'confirmed',
  Completed: 'confirmed',
}

export function getCampaignDetail(campaignId: string): CampaignDetail | null {
  const base = getEnrichedCampaigns().find((c) => c.id === campaignId)
  if (!base) return null
  const brand = getBrandById(base.client) ?? db.brands[0]
  const campaignInfluencers = db.campaignInfluencers.filter((ci) => ci.campaignId === campaignId)

  const influencers = base.assignedInfluencers.map((inf) => {
    const ci = campaignInfluencers.find((x) => x.influencerId === inf.id)
    return {
      influencer: inf,
      fee: ci?.fee ?? 0,
      outreachStatus: (OUTREACH_STATUS[ci?.status ?? inf.status] ?? 'sent') as 'sent' | 'replied' | 'negotiating' | 'confirmed',
    }
  })

  const creatorCost = campaignInfluencers.reduce((s, ci) => s + ci.fee, 0)
  const otherCosts = Math.max(0, base.expenses - creatorCost)
  const totalCost = creatorCost + otherCosts
  const profit = base.revenue - totalCost
  const margin = base.revenue > 0 ? Math.round((profit / base.revenue) * 100) : 0

  return {
    campaign: base,
    brand,
    influencers,
    deliverables: base.campaignDeliverables,
    creatorCost,
    otherCosts,
    totalCost,
    profit,
    margin,
  }
}

export async function loadCampaignDetail(campaignId: string): Promise<CampaignDetail | null> {
  const enriched = await loadEnrichedCampaigns()
  const base = enriched.find((c) => c.id === campaignId)
  if (!base) return null
  const brands = await loadBrands()
  const brand = brands.find((b) => b.id === base.client) ?? {
    id: base.client,
    name: base.clientName || 'Unknown Brand',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    budget: '',
    activeCampaigns: 1,
    previousCampaigns: 0,
    notes: '',
    paymentStatus: 'pending' as const,
    createdAt: new Date().toISOString(),
  }
  const cis = useSupabase ? await sb.getCampaignInfluencers(campaignId) : db.campaignInfluencers.filter((x) => x.campaignId === campaignId)

  const influencers = base.assignedInfluencers.map((inf) => {
    const ci = cis.find((x) => x.influencerId === inf.id)
    return {
      influencer: inf,
      fee: ci?.fee ?? 0,
      outreachStatus: (OUTREACH_STATUS[ci?.status ?? inf.status] ?? 'sent') as 'sent' | 'replied' | 'negotiating' | 'confirmed',
    }
  })

  const creatorCost = cis.reduce((s, ci) => s + ci.fee, 0)
  const otherCosts = Math.max(0, base.expenses - creatorCost)
  const totalCost = creatorCost + otherCosts
  const profit = base.revenue - totalCost
  const margin = base.revenue > 0 ? Math.round((profit / base.revenue) * 100) : 0

  return {
    campaign: base,
    brand,
    influencers,
    deliverables: base.campaignDeliverables,
    creatorCost,
    otherCosts,
    totalCost,
    profit,
    margin,
  }
}
