// ============================================================
// PK MEDIA OS — Mock relational database (Supabase-ready)
// Clean mock data with foreign-key relationships so features
// are connected: Influencers -> Campaigns -> Deliverables ->
// Payments -> Analytics. Replace with Supabase via services later.
// ============================================================
import {
  User, Brand, Influencer, Campaign, CampaignInfluencer, Deliverable,
  Outreach, FollowUp, Proposal, Invoice, Contract, Payment, Expense,
  Meeting, Notification, Document, Report, AIRequest, ActivityLog,
} from './types'

export const users: User[] = [
  { id: 'u-admin', name: 'Piyush Mehta', email: 'piyush@pkmedia.in', role: 'ADMIN', avatarColor: '#FF8A23', active: true, createdAt: '2024-01-01' },
  { id: 'u-manager', name: 'Aarav Shah', email: 'aarav@pkmedia.in', role: 'MANAGER', avatarColor: '#00A7C0', active: true, createdAt: '2024-02-10' },
  { id: 'u-outreach', name: 'Neha Kapoor', email: 'neha@pkmedia.in', role: 'OUTREACH', avatarColor: '#007F94', active: true, createdAt: '2024-03-05' },
  { id: 'u-editor', name: 'Rohan Das', email: 'rohan@pkmedia.in', role: 'EDITOR', avatarColor: '#5B8DEF', active: true, createdAt: '2024-03-20' },
  { id: 'u-finance', name: 'Sara Iyer', email: 'sara@pkmedia.in', role: 'FINANCE', avatarColor: '#7C5CFF', active: true, createdAt: '2024-04-01' },
  { id: 'u-client', name: 'Mira Khanna', email: 'mira@brightstores.in', role: 'CLIENT', avatarColor: '#E26AA5', active: true, createdAt: '2024-05-12' },
]

export const brands: Brand[] = [
  { id: 'b-bright', name: 'Bright Stores', contactPerson: 'Mira Khanna', email: 'mira@brightstores.in', phone: '+91 98200 11111', website: 'brightstores.in', industry: 'D2C / E-commerce', budget: '₹1L–₹3L', activeCampaigns: 2, previousCampaigns: 1, notes: 'Interested in quarterly UGC + influencer program.', paymentStatus: 'partial', createdAt: '2024-05-12' },
  { id: 'b-nova', name: 'Nova Fitness', contactPerson: 'Karan Mehta', email: 'karan@novafit.in', phone: '+91 98111 22222', website: 'novafit.in', industry: 'Fitness / Wellness', budget: '₹50K–₹1L', activeCampaigns: 1, previousCampaigns: 0, notes: 'Focus on nano/micro creators for organic reach.', paymentStatus: 'paid', createdAt: '2024-06-01' },
  { id: 'b-saas', name: 'Pulse Analytics', contactPerson: 'Divya Nair', email: 'divya@pulseanalytics.io', phone: '+91 98000 33333', website: 'pulseanalytics.io', industry: 'SaaS / Technology', budget: '₹3L–₹5L', activeCampaigns: 1, previousCampaigns: 2, notes: 'B2B creator + LinkedIn distribution focus.', paymentStatus: 'pending', createdAt: '2024-03-15' },
  { id: 'b-glow', name: 'Glow Beauty', contactPerson: 'Anita Rao', email: 'anita@glowbeauty.in', phone: '+91 97999 44444', website: 'glowbeauty.in', industry: 'Fashion / Beauty', budget: '₹50K–₹1L', activeCampaigns: 1, previousCampaigns: 0, notes: 'UGC-heavy campaign for new serum launch.', paymentStatus: 'paid', createdAt: '2024-06-20' },
]

export const influencers: Influencer[] = [
  { id: 'inf-1', name: 'Aditi Sharma', username: '@aditisharma', platform: 'Instagram', niche: 'Beauty', location: 'Mumbai', followers: 125000, engagementRate: 4.8, email: 'aditi@mail.com', phone: '+91 90001 00001', rate: 45000, status: 'Confirmed', campaigns: ['c-bright-1'], notes: 'Great with skincare demos.', tags: ['beauty', 'ugc', 'macro'], createdAt: '2024-05-01' },
  { id: 'inf-2', name: 'Vikram Singh', username: '@vikramfits', platform: 'Instagram', niche: 'Fitness', location: 'Delhi', followers: 82000, engagementRate: 5.2, email: 'vikram@mail.com', phone: '+91 90001 00002', rate: 30000, status: 'Confirmed', campaigns: ['c-nova-1'], notes: 'Consistent posting, strong DM community.', tags: ['fitness', 'micro'], createdAt: '2024-05-10' },
  { id: 'inf-3', name: 'Sneha Patel', username: '@sneha.code', platform: 'LinkedIn', niche: 'SaaS / Tech', location: 'Bengaluru', followers: 45000, engagementRate: 6.1, email: 'sneha@mail.com', phone: '+91 90001 00003', rate: 38000, status: 'Negotiating', campaigns: ['c-pulse-1'], notes: 'Strong B2B audience, thought-leader style.', tags: ['b2b', 'linkedin', 'micro'], createdAt: '2024-06-01' },
  { id: 'inf-4', name: 'Rahul Verma', username: '@rahulgaming', platform: 'YouTube', niche: 'Gaming', location: 'Pune', followers: 300000, engagementRate: 4.1, email: 'rahul@mail.com', phone: '+91 90001 00004', rate: 60000, status: 'Contacted', campaigns: [], notes: 'Prefers long-form + shorts bundle.', tags: ['gaming', 'macro'], createdAt: '2024-06-10' },
{ id: 'inf-5', name: 'Priya Nair', username: '@priyanair', platform: 'Instagram', niche: 'Lifestyle', location: 'Kochi', followers: 28000, engagementRate: 5.8, email: 'priya@mail.com', phone: '+91 90001 00005', rate: 15000, status: 'Replied', campaigns: ['c-glow-1'], notes: 'Local lifestyle, good with product demos.', tags: ['lifestyle', 'nano', 'ugc'], createdAt: '2024-06-15' },
  { id: 'inf-6', name: 'Arjun Khanna', username: '@arjuncreates', platform: 'TikTok', niche: 'Food', location: 'Gurgaon', followers: 150000, engagementRate: 7.0, email: 'arjun@mail.com', phone: '+91 90001 00006', rate: 40000, status: 'New', campaigns: [], notes: 'Strong short-form food content.', tags: ['food', 'shortform'], createdAt: '2024-06-22' },
]

export const campaigns: Campaign[] = [
  { id: 'c-bright-1', name: 'Bright Stores Summer UGC', client: 'b-bright', budget: 120000, startDate: '2024-07-01', endDate: '2024-08-15', influencerIds: ['inf-1'], deliverables: ['d-1'], status: 'Live', contentStatus: 65, revenue: 120000, expenses: 78000, results: { reach: 890000, views: 420000, engagement: 8.4, conversions: 1250 } },
  { id: 'c-nova-1', name: 'Nova Fitness Launch', client: 'b-nova', budget: 80000, startDate: '2024-07-10', endDate: '2024-08-10', influencerIds: ['inf-2'], deliverables: ['d-2'], status: 'Content', contentStatus: 40, revenue: 80000, expenses: 45000, results: { reach: 0, views: 0, engagement: 0, conversions: 0 } },
  { id: 'c-pulse-1', name: 'Pulse B2B Thought Leadership', client: 'b-saas', budget: 250000, startDate: '2024-08-01', endDate: '2024-09-30', influencerIds: ['inf-3'], deliverables: ['d-3'], status: 'Negotiation', contentStatus: 10, revenue: 250000, expenses: 150000, results: { reach: 0, views: 0, engagement: 0, conversions: 0 } },
  { id: 'c-glow-1', name: 'Glow Serum UGC', client: 'b-glow', budget: 60000, startDate: '2024-07-05', endDate: '2024-07-30', influencerIds: ['inf-5'], deliverables: ['d-4'], status: 'Approval', contentStatus: 80, revenue: 60000, expenses: 30000, results: { reach: 120000, views: 60000, engagement: 6.2, conversions: 300 } },
]

export const campaignInfluencers: CampaignInfluencer[] = [
  { id: 'ci-1', campaignId: 'c-bright-1', influencerId: 'inf-1', fee: 45000, status: 'Confirmed', deliverables: ['d-1'] },
  { id: 'ci-2', campaignId: 'c-nova-1', influencerId: 'inf-2', fee: 30000, status: 'Confirmed', deliverables: ['d-2'] },
  { id: 'ci-3', campaignId: 'c-pulse-1', influencerId: 'inf-3', fee: 38000, status: 'Negotiating', deliverables: ['d-3'] },
  { id: 'ci-4', campaignId: 'c-glow-1', influencerId: 'inf-5', fee: 15000, status: 'Confirmed', deliverables: ['d-4'] },
]

export const deliverables: Deliverable[] = [
  { id: 'd-1', campaignId: 'c-bright-1', influencerId: 'inf-1', title: '3 Reels + 6 Instagram posts', type: 'UGC', status: 'In Progress', dueDate: '2024-07-20', link: '' },
  { id: 'd-2', campaignId: 'c-nova-1', influencerId: 'inf-2', title: 'Fitness transformation reel', type: 'Reel', status: 'Pending', dueDate: '2024-07-25', link: '' },
  { id: 'd-3', campaignId: 'c-pulse-1', influencerId: 'inf-3', title: '2 LinkedIn thought-leadership posts', type: 'Post', status: 'Pending', dueDate: '2024-08-15', link: '' },
  { id: 'd-4', campaignId: 'c-glow-1', influencerId: 'inf-5', title: 'Serum demo video + 3 UGC clips', type: 'UGC', status: 'Submitted', dueDate: '2024-07-15', link: 'https://drive.google.com/glow-ugc' },
]

export const outreach: Outreach[] = [
  { id: 'o-1', influencerId: 'inf-4', subject: 'Gaming campaign collaboration', message: 'Hi Rahul, we loved your gaming content...', channel: 'email', status: 'sent', sentAt: '2024-06-20' },
  { id: 'o-2', influencerId: 'inf-6', subject: 'Food content partnership', message: 'Hi Arjun, we have a food brand campaign...', channel: 'dm', status: 'draft', sentAt: '' },
]

export const followUps: FollowUp[] = [
  { id: 'f-1', influencerId: 'inf-4', outreachId: 'o-1', dueDate: '2024-06-25', note: 'Follow up on gaming proposal', status: 'Pending' },
  { id: 'f-2', influencerId: 'inf-3', dueDate: '2024-06-28', note: 'Re-confirm fee for Pulse', status: 'Pending' },
  { id: 'f-3', influencerId: 'inf-6', outreachId: 'o-2', dueDate: '2024-06-24', note: 'Send food campaign brief', status: 'Done' },
]

export const proposals: Proposal[] = [
  { id: 'p-1', brandId: 'b-bright', title: 'Bright Summer UGC Program', amount: 120000, status: 'Accepted', createdAt: '2024-06-10' },
  { id: 'p-2', brandId: 'b-pulse', title: 'Pulse B2B Creator Program', amount: 250000, status: 'Sent', createdAt: '2024-07-01' },
]

export const invoices: Invoice[] = [
  { id: 'inv-1', brandId: 'b-bright', campaignId: 'c-bright-1', number: 'INV-2024-001', amount: 120000, status: 'Sent', issuedAt: '2024-07-05', dueAt: '2024-07-20' },
  { id: 'inv-2', brandId: 'b-nova', campaignId: 'c-nova-1', number: 'INV-2024-002', amount: 80000, status: 'Paid', issuedAt: '2024-07-12', dueAt: '2024-07-27' },
  { id: 'inv-3', brandId: 'b-glow', campaignId: 'c-glow-1', number: 'INV-2024-003', amount: 60000, status: 'Paid', issuedAt: '2024-07-08', dueAt: '2024-07-23' },
]

export const contracts: Contract[] = [
  { id: 'ct-1', brandId: 'b-bright', campaignId: 'c-bright-1', title: 'Bright x PK Media Agreement', status: 'Signed', createdAt: '2024-06-12' },
  { id: 'ct-2', brandId: 'b-nova', campaignId: 'c-nova-1', title: 'Nova x PK Media Agreement', status: 'Signed', createdAt: '2024-07-01' },
]

export const payments: Payment[] = [
  { id: 'pay-1', invoiceId: 'inv-2', amount: 80000, method: 'Bank transfer', status: 'Received', receivedAt: '2024-07-15' },
  { id: 'pay-2', invoiceId: 'inv-3', amount: 60000, method: 'UPI', status: 'Received', receivedAt: '2024-07-14' },
]

export const expenses: Expense[] = [
  { id: 'e-1', category: 'Influencer', amount: 45000, note: 'Aditi fee - Bright', date: '2024-07-01' },
  { id: 'e-2', category: 'Influencer', amount: 30000, note: 'Vikram fee - Nova', date: '2024-07-11' },
  { id: 'e-3', category: 'Editor', amount: 15000, note: 'Editing - Bright UGC', date: '2024-07-08' },
  { id: 'e-4', category: 'Ads', amount: 12000, note: 'Boost - Nova', date: '2024-07-13' },
]

export const meetings: Meeting[] = [
  { id: 'm-1', title: 'Bright quarterly review', date: '2024-07-22T10:00:00', attendees: ['u-manager', 'u-client'], type: 'Client', notes: '' },
  { id: 'm-2', title: 'Weekly growth standup', date: '2024-07-24T09:30:00', attendees: ['u-admin', 'u-manager', 'u-outreach'], type: 'Standup', notes: '' },
  { id: 'm-3', title: 'Nova campaign kickoff', date: '2024-07-26T14:00:00', attendees: ['u-manager', 'u-outreach'], type: 'Internal', notes: '' },
  { id: 'm-4', title: 'Pulse discovery call', date: '2024-08-01T11:00:00', attendees: ['u-manager'], type: 'Discovery', notes: '' },
]

export const notifications: Notification[] = [
  { id: 'n-1', userId: 'u-admin', title: 'New reply', message: 'Sneha replied to the Pulse proposal.', read: false, createdAt: '2024-07-19T09:00:00' },
  { id: 'n-2', userId: 'u-admin', title: 'Deliverable submitted', message: 'Priya submitted the Glow UGC clips.', read: false, createdAt: '2024-07-18T14:30:00' },
  { id: 'n-3', userId: 'u-admin', title: 'Payment received', message: 'Nova invoice INV-2024-002 paid.', read: true, createdAt: '2024-07-15T11:00:00' },
  { id: 'n-4', userId: 'u-admin', title: 'Follow-up due', message: 'Rahul follow-up is due today.', read: false, createdAt: '2024-07-19T08:00:00' },
]

export const documents: Document[] = [
  { id: 'doc-1', name: 'Bright_Agreement.pdf', category: 'Contract', brandId: 'b-bright', campaignId: 'c-bright-1', size: '2.4 MB', uploadedAt: '2024-06-12', uploadedBy: 'Piyush Mehta', accessRoles: ['ADMIN', 'MANAGER', 'CLIENT'] },
  { id: 'doc-2', name: 'Nova_Invoice_INV-002.pdf', category: 'Invoice', brandId: 'b-nova', campaignId: 'c-nova-1', size: '180 KB', uploadedAt: '2024-07-12', uploadedBy: 'Sara Iyer', accessRoles: ['ADMIN', 'FINANCE', 'CLIENT'] },
  { id: 'doc-3', name: 'Bright_UGC_Assets.zip', category: 'Campaign Asset', brandId: 'b-bright', campaignId: 'c-bright-1', size: '128 MB', uploadedAt: '2024-07-15', uploadedBy: 'Rohan Das', accessRoles: ['ADMIN', 'MANAGER', 'EDITOR', 'CLIENT'] },
  { id: 'doc-4', name: 'Pulse_Proposal.pdf', category: 'Proposal', brandId: 'b-saas', size: '640 KB', uploadedAt: '2024-07-01', uploadedBy: 'Piyush Mehta', accessRoles: ['ADMIN', 'MANAGER', 'CLIENT'] },
  { id: 'doc-5', name: 'July_Report.pdf', category: 'Report', size: '1.1 MB', uploadedAt: '2024-07-18', uploadedBy: 'Aarav Shah', accessRoles: ['ADMIN', 'MANAGER', 'FINANCE', 'CLIENT'] },
]

export const reports: Report[] = [
  { id: 'r-1', title: 'Monthly Growth Report — July', period: 'July 2024', summary: '4 campaigns active, 890K reach delivered, 3 invoices issued.', createdAt: '2024-07-18' },
  { id: 'r-2', title: 'Bright Summer UGC — Mid Review', campaignId: 'c-bright-1', period: 'July 2024', summary: 'Content 65% complete, engagement 8.4%, on track.', createdAt: '2024-07-15' },
]

export const aiRequests: AIRequest[] = [
  { id: 'ai-1', type: 'outreach', prompt: 'Food brand nano creators', response: 'Sample outreach message generated.', model: 'mock', createdAt: '2024-07-18' },
]

export const activityLogs: ActivityLog[] = [
  { id: 'log-1', userId: 'u-admin', action: 'Logged in', entity: 'User', entityId: 'u-admin', createdAt: '2024-07-19T09:00:00' },
  { id: 'log-2', userId: 'u-outreach', action: 'Sent outreach to Rahul', entity: 'Outreach', entityId: 'o-1', createdAt: '2024-06-20T15:00:00' },
  { id: 'log-3', userId: 'u-finance', action: 'Marked INV-2024-002 paid', entity: 'Invoice', entityId: 'inv-2', createdAt: '2024-07-15T11:05:00' },
]

// Currency config
export const currencyConfig = { code: 'INR', symbol: '₹' }

export const db = {
  users, brands, influencers, campaigns, campaignInfluencers, deliverables,
  outreach, followUps, proposals, invoices, contracts, payments, expenses,
  meetings, notifications, documents, reports, aiRequests, activityLogs,
}
