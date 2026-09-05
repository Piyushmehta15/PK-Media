import { site } from '../../config/site'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'

export function DistributionSection({ onBuildPlan }: { onBuildPlan: () => void }) {
  return (
    <section className="section section--distribution" id="content-distribution">
      <div className="shell distribution-layout">
        <div className="distribution-copy">
          <SectionHeading
            eyebrow={site.distribution.eyebrow}
            title={site.distribution.title}
            description={site.distribution.description}
          />
          <div className="platform-cloud" data-reveal>
            {site.distribution.platforms.map((platform) => (
              <span key={platform}>{platform}</span>
            ))}
          </div>
          <button type="button" className="button button--ink" onClick={onBuildPlan}>
            Build Your Growth Plan{' '}
            <span aria-hidden="true">
              <Icon name="arrowUpRight" size={18} />
            </span>
          </button>
        </div>
        <div className="distribution-workflow" data-reveal>
          <div className="distribution-workflow__topline">
            <span>Content transformation workflow</span>
            <i>01</i>
          </div>
          <div className="workflow-steps">
            {site.distribution.workflow.map((step, index) => (
              <div className="workflow-step" key={step}>
                <div className="workflow-step__node">
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  {index === 0 && <Icon name="play" size={18} />}
                  {index === 1 && <Icon name="spark" size={18} />}
                  {index === 2 && <Icon name="social" size={18} />}
                  {index === 3 && <Icon name="distribution" size={18} />}
                  {index === 4 && <Icon name="chart" size={18} />}
                  {index === 5 && <Icon name="arrowUpRight" size={18} />}
                </div>
                <span>{step}</span>
                {index < site.distribution.workflow.length - 1 && (
                  <i className="workflow-step__line" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
          <div className="distribution-workflow__note">
            <span aria-hidden="true">
              <Icon name="spark" size={15} />
            </span>{' '}
            Designed to help a valuable idea keep working beyond one upload.
          </div>
        </div>
      </div>
    </section>
  )
}
