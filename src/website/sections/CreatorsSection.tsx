import { site } from '../../config/site'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'
import { CreatorApplicationForm } from '../forms/CreatorApplicationForm'

export function CreatorsSection() {
  return (
    <section className="section section--creators" id="creators">
      <div className="shell">
        <div className="creators-heading">
          <SectionHeading
            eyebrow={site.creators.eyebrow}
            title={site.creators.title}
            description={site.creators.description}
            dark
          />
          <a className="button button--orange-outline" href="#creator-application">
            Join the Creator Network{' '}
            <span aria-hidden="true">
              <Icon name="arrow" size={18} />
            </span>
          </a>
        </div>
        <div className="creator-benefit-grid" data-reveal>
          {site.creators.benefits.map((benefit, index) => (
            <div key={benefit}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{benefit}</p>
            </div>
          ))}
        </div>
        <CreatorApplicationForm />
      </div>
    </section>
  )
}
