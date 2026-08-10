// ============================================================
// PK MEDIA OS — Domain types
// Shared relational data architecture. Each entity maps to a
// table in schema.sql and a service in src/os/services.
// ============================================================

export type Role = 'ADMIN' | 'MANAGER' | 'OUTREACH' | 'EDITOR' | 'FINANCE' | 'CLIENT'

export interface Organization {
  id: string
  name: string
  website: string
  created_at?: string
  updated_at?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatarColor: string
  active: boolean
  createdAt: string
  organization_id?: string
}

export interface Profile {
  id: string
  email: string
  full_name: string
  avatar_url?: string | null
  role: Role
  organization_id: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Brand {
  id: string
  organization_id?: string
  name: string
  contactPerson: string
  email: string
  phone: string
  website: string
  industry: string
  budget: string
  activeCampaigns: number
  previousCampaigns: number
  notes: string
  paymentStatus: 'pending' | 'partial' | 'paid'
  createdAt: string
}

export type InfluencerStatus =
  | 'New'
  | 'Contacted'
  | 'Replied'
  | 'Negotiating'
  | 'Confirmed'
  | 'Completed'
  | 'Rejected'

export interface Influencer {
  id: string
  name: string
  username: string
  platform: 'Instagram' | 'YouTube' | 'TikTok' | 'LinkedIn' | 'X'
  niche: string
  location: string
  followers: number
  engagementRate: number
  email: string
  phone: string
  rate: number
  status: InfluencerStatus
  campaigns: string[] // Campaign ids
  notes: string
  tags: string[]
  createdAt: string
}

export type CampaignStatus =
  | 'Planning'
  | 'Outreach'
  | 'Negotiation'
  | 'Content'
  | 'Approval'
  | 'Live'
  | 'Completed'
  | 'Cancelled'

export interface Campaign {
  id: string
  organization_id?: string
  name: string
  client: string // Brand id
  budget: number
  startDate: string
  endDate: string
  influencerIds: string[]
  deliverables: string[] // Deliverable ids
  status: CampaignStatus
  contentStatus: number // 0-100
  revenue: number
  expenses: number
  results: { reach: number; views: number; engagement: number; conversions: number }
}

export interface CampaignInfluencer {
  id: string
  campaignId: string
  influencerId: string
  fee: number
  status: InfluencerStatus
  deliverables: string[]
}

export type DeliverableStatus = 'Pending' | 'In Progress' | 'Submitted' | 'Approved' | 'Rejected'

export interface Deliverable {
  id: string
  campaignId: string
  influencerId: string
  title: string
  type: string
  status: DeliverableStatus
  dueDate: string
  link: string
}

export interface Outreach {
  id: string
  influencerId: string
  campaignId?: string
  subject: string
  message: string
  channel: 'email' | 'whatsapp' | 'dm'
  status: 'draft' | 'sent' | 'replied' | 'no_reply'
  sentAt: string
}

export type FollowUpStatus = 'Pending' | 'Done' | 'Skipped'

export interface FollowUp {
  id: string
  influencerId: string
  outreachId?: string
  dueDate: string
  note: string
  status: FollowUpStatus
}

export interface Proposal {
  id: string
  brandId: string
  title: string
  amount: number
  status: 'Draft' | 'Sent' | 'Accepted' | 'Declined'
  createdAt: string
}

export interface Invoice {
  id: string
  brandId: string
  campaignId?: string
  number: string
  amount: number
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue'
  issuedAt: string
  dueAt: string
}

export interface Contract {
  id: string
  brandId: string
  campaignId?: string
  title: string
  status: 'Draft' | 'Sent' | 'Signed'
  createdAt: string
}

export type PaymentStatus = 'Pending' | 'Received' | 'Overdue'

export interface Payment {
  id: string
  invoiceId: string
  amount: number
  method: string
  status: PaymentStatus
  receivedAt: string
}

export interface Expense {
  id: string
  category: 'Influencer' | 'Editor' | 'Ads' | 'Tools' | 'Other'
  amount: number
  note: string
  date: string
}

export interface Meeting {
  id: string
  title: string
  date: string // ISO date-time
  attendees: string[]
  type: 'Discovery' | 'Review' | 'Standup' | 'Client' | 'Internal'
  notes: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  read: boolean
  createdAt: string
}

export type DocumentCategory = 'Contract' | 'Invoice' | 'Proposal' | 'Campaign Asset' | 'Report' | 'Client'

export interface Document {
  id: string
  name: string
  category: DocumentCategory
  brandId?: string
  campaignId?: string
  size: string
  uploadedAt: string
  uploadedBy: string
  accessRoles: Role[]
}

export interface Report {
  id: string
  title: string
  campaignId?: string
  period: string
  summary: string
  createdAt: string
}

export interface AIRequest {
  id: string
  type: 'outreach' | 'meeting_notes' | 'copilot' | 'report'
  prompt: string
  response: string
  model: string
  createdAt: string
}

export interface ActivityLog {
  id: string
  userId: string
  action: string
  entity: string
  entityId: string
  createdAt: string
}

// Currency config (INR default, configurable)
export interface CurrencyConfig {
  code: string
  symbol: string
}

export type Permission =
  | 'dashboard.view'
  | 'influencers.manage' | 'influencers.view'
  | 'brands.manage' | 'brands.view'
  | 'campaigns.manage' | 'campaigns.view'
  | 'outreach.manage' | 'outreach.view'
  | 'proposals.manage' | 'proposals.view'
  | 'analytics.view'
  | 'finance.manage' | 'finance.view'
  | 'contracts.manage' | 'contracts.view'
  | 'deliverables.manage' | 'deliverables.view'
  | 'notifications.manage'
  | 'team.view'
  | 'documents.manage' | 'documents.view'
  | 'calendar.view'
  | 'settings.manage'
  | 'files.secure'
