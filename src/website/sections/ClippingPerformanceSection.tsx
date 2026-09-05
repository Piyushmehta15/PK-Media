import { site } from '../../config/site'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'
import { PerformanceCalculator } from './PerformanceCalculator'

export function ClippingPerformanceSection({
  onRequestPackage,
}: {
  onRequestPackage: (packageName: string) => void
}) {
  return (
    <section className="section section--perf-distribution" id="performance-distribution">
      <div className="shell">
        <SectionHeading
          eyebrow="Premium Curation & Reach"
          title="Turn One Long-Form Video Into a High-Volume Short-Form Growth Engine"
          description="One piece of long-form content can become dozens of strategic short-form assets. PK Media helps creators, founders, podcasters and brands identify high-potential moments, create multiple content variations and distribute them strategically."
          align="center"
          dark
        />

        <div
          className="positioning-statement-container positioning-statement-container--dark"
          data-reveal
        >
          <div className="positioning-statement positioning-statement--dark">
            <span className="positioning-statement__badge">Clipping Philosophy</span>
            <p>
              “We don’t just edit clips. We strategically curate moments, create multiple creative
              variations and distribute content to maximize reach.”
            </p>
          </div>
        </div>

        {/* Curation Approach Pillars */}
        <div className="perf-approach-grid">
          {site.clippingApproach.map((approach, idx) => (
            <article className="perf-approach-card" key={idx} data-reveal>
              <div className="perf-approach-card__num">0{idx + 1}</div>
              <h4>{approach.title}</h4>
              <p>{approach.description}</p>
            </article>
          ))}
        </div>

        <div className="perf-divider" />

        <div className="perf-pricing-header">
          <SectionHeading
            eyebrow="Guaranteed View Campaigns"
            title="CHOOSE YOUR BUDGET. BUILD YOUR VIEW TARGET."
            description="Our distribution campaigns scale based on an agreed Cost Per Mille (CPM) model. Define your budget, and we back it up with view guarantees."
            align="center"
            dark
          />
        </div>

        {/* Pricing & Calculator Grid */}
        <div className="perf-pricing-calculator-layout">
          <div className="perf-pricing-grid">
            {site.clipPerformancePackages.map((pkg) => (
              <article className="perf-card" key={pkg.id} data-reveal>
                <div className="perf-card__top">
                  <span>Campaign Tier</span>
                  <h3>{pkg.name}</h3>
                </div>
                <div className="perf-card__metrics">
                  <div className="perf-metric">
                    <small>Campaign Budget</small>
                    <strong>{pkg.price}</strong>
                  </div>
                  <div className="perf-metric">
                    <small>Guaranteed View Target</small>
                    <span className="perf-metric__views">{pkg.targetViews}</span>
                  </div>
                </div>
                <div className="perf-card__best-for">
                  <span>Best for:</span> {pkg.bestFor}
                </div>
                <ul className="perf-card__checklist">
                  {pkg.includes.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">
                        <Icon name="check" size={14} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="button button--primary perf-card__cta"
                  onClick={() => onRequestPackage(pkg.name)}
                >
                  {pkg.cta}{' '}
                  <span aria-hidden="true">
                    <Icon name="arrowUpRight" size={14} />
                  </span>
                </button>
              </article>
            ))}

            {/* Custom Campaign Option */}
            <article className="perf-card perf-card--custom" data-reveal>
              <div className="perf-card__top">
                <span>Enterprise Tier</span>
                <h3>Custom Campaign</h3>
              </div>
              <div className="perf-card__metrics">
                <div className="perf-metric">
                  <small>Budget Options</small>
                  <strong>Custom Pricing</strong>
                </div>
                <div className="perf-metric">
                  <small>View Target Guarantee</small>
                  <span className="perf-metric__views">Custom Scope</span>
                </div>
              </div>
              <p className="perf-card__custom-desc">
                For large-scale creators, agencies, and brands seeking custom CPM models,
                whitelisting, paid amplification, and dedicated syndication.
              </p>
              <ul className="perf-card__checklist">
                <li>
                  <span aria-hidden="true">
                    <Icon name="check" size={14} />
                  </span>
                  Starting from 5M+ guaranteed views
                </li>
                <li>
                  <span aria-hidden="true">
                    <Icon name="check" size={14} />
                  </span>
                  Tailored niche CPM parameters
                </li>
                <li>
                  <span aria-hidden="true">
                    <Icon name="check" size={14} />
                  </span>
                  Cross-platform whitelisting & amplification
                </li>
              </ul>
              <button
                type="button"
                className="button button--ghost-light perf-card__cta"
                onClick={() => onRequestPackage('Custom Performance Campaign')}
              >
                Build Custom Campaign{' '}
                <span aria-hidden="true">
                  <Icon name="arrowUpRight" size={14} />
                </span>
              </button>
            </article>
          </div>

          <div className="perf-calculator-sidebar">
            <PerformanceCalculator onRequestPackage={onRequestPackage} />
          </div>
        </div>

        {/* Protection & Disclaimer */}
        <div className="perf-protection-container" data-reveal>
          <div className="perf-protection-card">
            <div className="perf-protection-card__header">
              <span className="perf-badge">Performance Protection</span>
              <h4>Our Performance Protection Policy</h4>
            </div>
            <p>
              If the agreed view target is not achieved within the initial campaign duration, PK
              Media first continues content optimization and distribution during an agreed extension
              period at no additional management cost.
            </p>
            <p>
              If the agreed target is still not met after the extension, the unachieved portion of
              the campaign value may be refunded proportionally based on the agreed CPM and
              campaign agreement terms.
            </p>
          </div>
          <div className="perf-terms-card">
            <h4>Campaign Agreements & Terms</h4>
            <ul>
              <li>View targets depend on the agreed CPM, target channels, and campaign scope.</li>
              <li>Only eligible views counted under the final signed campaign agreement are included.</li>
              <li>
                Influencer, creator, and third-party advertising distribution costs may be handled
                separately.
              </li>
              <li>Final pricing, CPM targets, and guarantees are subject to a signed campaign agreement.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
