import { site } from '../../config/site'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'

export function InfluencerSection({ onContact }: { onContact: (context?: string) => void }) {
  return (
    <section className="section section--ink" id="creator-campaigns">
      <div className="shell">
        <div className="influencer-heading">
          <SectionHeading
            eyebrow={site.influencer.eyebrow}
            title={site.influencer.title}
            description={site.influencer.description}
            dark
          />
          <button
            type="button"
            className="button button--orange-outline"
            onClick={() => onContact('I want to discuss an influencer or creator campaign.')}
          >
            Plan a Creator Campaign{' '}
            <span aria-hidden="true">
              <Icon name="arrowUpRight" size={18} />
            </span>
          </button>
        </div>
        <div className="campaign-rail" data-reveal aria-label="Creator campaign workflow">
          {site.influencer.workflow.map((step, index) => (
            <div className="campaign-rail__item" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
              {index < site.influencer.workflow.length - 1 && (
                <i aria-hidden="true">
                  <Icon name="arrow" size={15} />
                </i>
              )}
            </div>
          ))}
        </div>
        <div className="influencer-details">
          <div className="influencer-match" data-reveal>
            <span className="detail-label">Creators are considered around</span>
            <div>
              {site.influencer.matchingCriteria.map((criteria) => (
                <span key={criteria}>{criteria}</span>
              ))}
            </div>
          </div>
          <p className="influencer-note" data-reveal>
            <span aria-hidden="true">
              <Icon name="check" size={16} />
            </span>
            {site.influencer.note}
          </p>
        </div>
      </div>
    </section>
  )
}
