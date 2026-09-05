import { site } from '../../config/site'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'

export function AnalyticsSection({ onContact }: { onContact: (context?: string) => void }) {
  return (
    <section className="section section--analytics" id="analytics">
      <div className="shell analytics-layout">
        <div className="analytics-copy">
          <SectionHeading
            eyebrow={site.analytics.eyebrow}
            title={site.analytics.title}
            description={site.analytics.description}
          />
          <button
            type="button"
            className="button button--ink"
            onClick={() => onContact('I would like to see how PK Media reports campaigns.')}
          >
            See How We Report Campaigns{' '}
            <span aria-hidden="true">
              <Icon name="arrowUpRight" size={18} />
            </span>
          </button>
        </div>
        <div className="analytics-dashboard" data-reveal>
          <div className="analytics-dashboard__head">
            <div>
              <i />
              <span>Campaign reporting</span>
            </div>
            <small>Values update with real campaign data</small>
          </div>
          <div className="analytics-metrics">
            {site.analytics.metrics.map((metric, index) => (
              <div className="analytics-metric" key={metric}>
                <span>{metric}</span>
                <b>—</b>
                <i className={`metric-dash metric-dash--${index % 3}`} />
              </div>
            ))}
          </div>
          <div className="analytics-dashboard__foot">
            <span>
              <i /> Delivery
            </span>
            <span>
              <i /> Signals
            </span>
            <span>
              <i /> Next actions
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
