// ============================================================
// PK MEDIA OS — Dashboard
// Connected KPIs: active campaigns, influencers, brands, follow-ups,
// meetings, deliverables, revenue/expenses/profit, campaign perf, team.
// ============================================================
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { Card, CardHeader, StatCard, Table, Badge, Progress, Avatar, statusTone } from '../ui/kit'
import {
  loadDashboardSummary, loadEnrichedCampaigns, getTeamActivity, fmtINR,
  getPaymentStatusSummary, DashboardSummary, CampaignEnriched,
} from '../services/dataService'

export default function Dashboard() {
  const { user, can } = useAuth()
  const navigate = useNavigate()
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [campaigns, setCampaigns] = useState<CampaignEnriched[]>([])
  const [loading, setLoading] = useState(true)

  const activity = getTeamActivity()
  const pay = getPaymentStatusSummary()
  const canCreateCampaign = can('campaigns.manage')

  useEffect(() => {
    let active = true
    const fetchData = async () => {
      try {
        const [s, c] = await Promise.all([
          loadDashboardSummary(),
          loadEnrichedCampaigns(),
        ])
        if (active) {
          setSummary(s)
          setCampaigns(c)
        }
      } finally {
        if (active) setLoading(false)
      }
    }
    fetchData()
    return () => { active = false }
  }, [])

  const s = summary || {
    activeCampaigns: 0,
    totalInfluencers: 0,
    totalBrands: 0,
    pendingFollowUps: 0,
    upcomingMeetings: 0,
    pendingDeliverables: 0,
    revenue: 0,
    expenses: 0,
    profit: 0,
    margin: 0,
    totalReach: 0,
    totalViews: 0,
    avgEngagement: 0,
  }

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div>
          <h1>Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p>Here's the health of your agency — updated from live campaign data.</p>
        </div>
        <div className="os-page__head-actions">
          {canCreateCampaign && (
            <button className="os-btn os-btn--secondary os-btn--md" onClick={() => navigate('/app/campaigns')}>
              + New Campaign
            </button>
          )}
          <button className="os-btn os-btn--primary os-btn--md" onClick={() => navigate('/app/calendar')}>
            Book Strategy Call
          </button>
        </div>
      </div>

      <div className="os-stat-grid">
        <StatCard label="Active Campaigns" value={loading ? '…' : String(s.activeCampaigns)} hint="in motion now" tone="teal" />
        <StatCard label="Total Influencers" value={loading ? '…' : String(s.totalInfluencers)} hint="across platforms" tone="blue" />
        <StatCard label="Total Brands" value={loading ? '…' : String(s.totalBrands)} hint="active clients" tone="ink" />
        <StatCard label="Pending Follow-ups" value={loading ? '…' : String(s.pendingFollowUps)} hint="need attention" tone="orange" />
        <StatCard label="Upcoming Meetings" value={loading ? '…' : String(s.upcomingMeetings)} hint="this period" tone="teal" />
        <StatCard label="Pending Deliverables" value={loading ? '…' : String(s.pendingDeliverables)} hint="in progress" tone="orange" />
      </div>

      <div className="os-finance-grid">
        <Card className="os-finance-card">
          <span>Revenue</span>
          <strong className="os-finance-card__value">{loading ? '…' : fmtINR(s.revenue)}</strong>
          <small>invoiced this period</small>
        </Card>
        <Card className="os-finance-card os-finance-card--exp">
          <span>Expenses</span>
          <strong className="os-finance-card__value">{loading ? '…' : fmtINR(s.expenses)}</strong>
          <small>creator + production + ops</small>
        </Card>
        <Card className="os-finance-card os-finance-card--profit">
          <span>Profit</span>
          <strong className="os-finance-card__value">{loading ? '…' : fmtINR(s.profit)}</strong>
          <small>{loading ? '…' : `${s.margin}% margin`}</small>
        </Card>
      </div>

      <div className="os-grid-2">
        <Card>
          <CardHeader title="Campaign Performance" subtitle="Reach, views, engagement and conversions" />
          {loading ? (
            <div className="os-empty"><p>Loading campaigns…</p></div>
          ) : campaigns.length === 0 ? (
            <div className="os-empty"><strong>No active campaigns</strong><p>Launch a campaign to see performance metrics.</p></div>
          ) : (
            <Table columns={['Campaign', 'Client', 'Status', 'Reach', 'Engagement', 'Profit']}>
              {campaigns.map((c) => (
                <tr key={c.id}>
                  <td><strong className="os-strong">{c.name}</strong></td>
                  <td>{c.clientName}</td>
                  <td><Badge tone={statusTone(c.status)}>{c.status}</Badge></td>
                  <td>{c.results.reach ? c.results.reach.toLocaleString('en-IN') : '—'}</td>
                  <td>{c.results.engagement ? `${c.results.engagement}%` : '—'}</td>
                  <td className="os-cell-profit">{fmtINR(c.profit)}</td>
                </tr>
              ))}
            </Table>
          )}
        </Card>

        <Card>
          <CardHeader title="Payments" subtitle="Invoiced vs received" />
          <div className="os-kpi-stack">
            <div className="os-kpi"><span>Total Invoiced</span><strong>{fmtINR(pay.totalInvoiced)}</strong></div>
            <div className="os-kpi"><span>Received</span><strong className="os-text-green">{fmtINR(pay.received)}</strong></div>
            <div className="os-kpi"><span>Outstanding</span><strong className="os-text-orange">{fmtINR(pay.outstanding)}</strong></div>
          </div>
          <div className="os-mt">
            <CardHeader title="Team Activity" subtitle="latest actions across the OS" />
            <div className="os-activity">
              {activity.slice(0, 4).map((a, idx) => (
                <div className="os-activity__item" key={idx}>
                  <Avatar name={a.user?.name ?? '?'} color={a.user?.avatarColor} />
                  <div><p><strong>{a.user?.name ?? 'Team Member'}</strong> · {a.action}</p><small>{a.time}</small></div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Campaign Content Progress" subtitle="Deliverables completion per active campaign" />
        {loading ? (
          <div className="os-empty"><p>Loading progress…</p></div>
        ) : campaigns.length === 0 ? (
          <div className="os-empty"><p>No campaign progress to track.</p></div>
        ) : (
          <div className="os-progress-list">
            {campaigns.map((c) => (
              <div className="os-progress-row" key={c.id}>
                <div className="os-progress-row__label"><strong>{c.name}</strong><span>{c.contentStatus}%</span></div>
                <Progress value={c.contentStatus} tone={c.contentStatus > 60 ? 'teal' : 'orange'} />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
