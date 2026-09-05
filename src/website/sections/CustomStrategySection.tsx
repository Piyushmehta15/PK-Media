import { site } from '../../config/site'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'

export function CustomStrategySection({
  onContact,
}: {
  onContact: (context?: string) => void
}) {
  return (
    <section className="section section--custom-strategy" id="custom-growth-plan">
      <div className="shell custom-strategy__layout">
        <div className="custom-strategy__copy">
          <SectionHeading
            eyebrow={site.customGrowthPlan.eyebrow}
            title={site.customGrowthPlan.title}
            description={site.customGrowthPlan.description}
            dark
          />
          <button
            type="button"
            className="button button--light"
            onClick={() => onContact('I would like to request a custom strategy.')}
          >
            Request a Custom Strategy{' '}
            <span aria-hidden="true">
              <Icon name="arrowUpRight" size={18} />
            </span>
          </button>
        </div>
        <ol className="strategy-steps" data-reveal>
          {site.customGrowthPlan.steps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
