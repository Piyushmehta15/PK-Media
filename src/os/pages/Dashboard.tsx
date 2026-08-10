// ============================================================
// PK MEDIA OS — Dashboard
// Connected KPIs: active campaigns, influencers, brands, follow-ups,
// meetings, deliverables, revenue/expenses/profit, campaign perf, team.
// ============================================================
import { useAuth } from '../auth/AuthContext'
import { Card, CardHeader, StatCard, Table, Badge, Progress, Avatar, statusTone } from '../ui/kit'
import {
  getDashboardSummary, getEnrichedCampaigns, getTeamActivity, fmtINR,
  getPaymentStatusSummary,
} from '../services/dataService'

export default function Dashboard() {
  const { user } = useAuth()
  const s = getDashboardSummary()
  const campaigns = getEnrichedCampaigns()
  const activity = getTeamActivity()
  const pay = getPaymentStatusSummary()

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div>
          <h1>Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p>Here's the health of your agency — updated from live campaign data.</p>
        </div>
        <div className="os-page__head-actions">
          <button className="os-btn os-btn--secondary os-btn--md">+ New Campaign</button>
          <button className="os-btn os-btn--primary os-btn--md">Book Strategy Call</button>
        </div>
      </div>

      <div className="os-stat-grid">
        <StatCard label="Active Campaigns" value={String(s.activeCampaigns)} hint="in motion now" tone="teal" />
        <StatCard label="Total Influencers" value={String(s.totalInfluencers)} hint="across platforms" tone="blue" />
        <StatCard label="Total Brands" value={String(s.totalBrands)} hint="active clients" tone="ink" />
        <StatCard label="Pending Follow-ups" value={String(s.pendingFollowUps)} hint="need attention" tone="orange" />
        <StatCard label="Upcoming Meetings" value={String(s.upcomingMeetings)} hint="this period" tone="teal" />
        <StatCard label="Pending Deliverables" value={String(s.pendingDeliverables)} hint="in progress" tone="orange" />
      </div>

      <div className="os-finance-grid">
        <Card className="os-finance-card">
          <span>Revenue</span>
          <strong className="os-finance-card__value">{fmtINR(s.revenue)}</strong>
          <small>invoiced this period</small>
        </Card>
        <Card className="os-finance-card os-finance-card--exp">
          <span>Expenses</span>
          <strong className="os-finance-card__value">{fmtINR(s.expenses)}</strong>
          <small>creator + production + ops</small>
        </Card>
        <Card className="os-finance-card os-finance-card--profit">
          <span>Profit</span>
          <strong className="os-finance-card__value">{fmtINR(s.profit)}</strong>
          <small>{s.margin}% margin</small>
        </Card>
      </div>

      <div className="os-grid-2">
        <Card>
          <CardHeader title="Campaign Performance" subtitle="Reach, views, engagement and conversions" />
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
                  <Avatar name={a.user.name} color={a.user.avatarColor} />
                  <div><p><strong>{a.user.name}</strong> · {a.action}</p><small>{a.time}</small></div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Campaign Content Progress" subtitle="Deliverables completion per active campaign" />
        <div className="os-progress-list">
          {campaigns.map((c) => (
            <div className="os-progress-row" key={c.id}>
              <div className="os-progress-row__label"><strong>{c.name}</strong><span>{c.contentStatus}%</span></div>
              <Progress value={c.contentStatus} tone={c.contentStatus > 60 ? 'teal' : 'orange'} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
