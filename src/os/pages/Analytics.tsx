// ============================================================
// PK MEDIA OS — Analytics Dashboard
// Clean CSS bar charts from connected campaign data (no heavy libs).
// ============================================================
import { Card, CardHeader, StatCard } from '../ui/kit'
import { getDashboardSummary, getRevenueByCampaign, getEnrichedCampaigns, fmtINR } from '../services/dataService'

export default function Analytics() {
  const s = getDashboardSummary()
  const revenueByCampaign = getRevenueByCampaign()
  const campaigns = getEnrichedCampaigns()
  const maxRevenue = Math.max(1, ...revenueByCampaign.map((r) => r.revenue))

  const maxReach = Math.max(1, ...campaigns.map((c) => c.results.reach))

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>Analytics</h1><p>Aggregated performance across all campaigns.</p></div>
      </div>

      <div className="os-stat-grid">
        <StatCard label="Total Reach" value={s.totalReach.toLocaleString('en-IN')} tone="teal" />
        <StatCard label="Total Views" value={s.totalViews.toLocaleString('en-IN')} tone="blue" />
        <StatCard label="Avg Engagement" value={`${s.avgEngagement}%`} tone="ink" />
        <StatCard label="Profit Margin" value={`${s.margin}%`} tone="orange" />
      </div>

      <div className="os-grid-2">
        <Card>
          <CardHeader title="Revenue by Campaign" subtitle="Revenue vs profit per live campaign" />
          <div className="os-bar-chart">
            {revenueByCampaign.map((r) => (
              <div className="os-bar-row" key={r.name}>
                <span className="os-bar-label">{r.name}</span>
                <div className="os-bar-track">
                  <div className="os-bar os-bar--revenue" style={{ width: `${(r.revenue / maxRevenue) * 100}%` }} />
                </div>
                <span className="os-bar-value">{fmtINR(r.revenue)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Campaign Reach" subtitle="Audience reached per campaign" />
          <div className="os-bar-chart">
            {campaigns.map((c) => (
              <div className="os-bar-row" key={c.id}>
                <span className="os-bar-label">{c.name}</span>
                <div className="os-bar-track">
                  <div className="os-bar os-bar--reach" style={{ width: `${(c.results.reach / maxReach) * 100}%` }} />
                </div>
                <span className="os-bar-value">{c.results.reach ? c.results.reach.toLocaleString('en-IN') : '—'}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Campaign Snapshot" subtitle="Results across all campaigns" />
        <div className="os-snapshot-grid">
          {campaigns.map((c) => (
            <div className="os-snapshot" key={c.id}>
              <strong>{c.name}</strong>
              <div><span>Reach</span><b>{c.results.reach ? c.results.reach.toLocaleString('en-IN') : '—'}</b></div>
              <div><span>Views</span><b>{c.results.views ? c.results.views.toLocaleString('en-IN') : '—'}</b></div>
              <div><span>Engagement</span><b>{c.results.engagement ? `${c.results.engagement}%` : '—'}</b></div>
              <div><span>Conversions</span><b>{c.results.conversions || '—'}</b></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
