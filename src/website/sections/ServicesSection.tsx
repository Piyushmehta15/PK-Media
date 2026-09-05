import { site } from '../../config/site'
import { IconName } from '../types/website.types'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'
import { serviceLinks } from '../utils/navigation'

function ServiceIcon({ name }: { name: IconName }) {
  return (
    <span className="service-icon" aria-hidden="true">
      <Icon name={name} size={23} />
    </span>
  )
}

export function ServicesSection({ onContact }: { onContact: (context?: string) => void }) {
  return (
    <section className="section section--canvas" id="services">
      <div className="shell">
        <div className="services-intro">
          <SectionHeading
            eyebrow="What we do"
            title="One partner for the parts of growth that need to work together."
            description="Our strongest work lives at the intersection of creators, content, and distribution — supported by the strategy and reporting that make it accountable."
          />
          <button
            type="button"
            className="text-link"
            onClick={() => onContact('I would like to discuss the right PK Media services for my brand.')}
          >
            Tell us what you need{' '}
            <span aria-hidden="true">
              <Icon name="arrowUpRight" size={17} />
            </span>
          </button>
        </div>
        <div className="service-grid">
          {site.services.map((service) => (
            <article
              key={service.id}
              className={`service-card ${service.featured ? 'service-card--featured' : ''}`}
              data-reveal
            >
              <div className="service-card__topline">
                <span>{service.order}</span>
                <ServiceIcon name={service.icon as IconName} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <ul className="deliverable-list">
                {service.deliverables.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">
                      <Icon name="check" size={14} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a className="service-card__link" href={serviceLinks[service.id]}>
                Learn more{' '}
                <span aria-hidden="true">
                  <Icon name="arrow" size={16} />
                </span>
              </a>
            </article>
          ))}
        </div>
        <div className="capability-row" data-reveal>
          <span>Also available</span>
          <div>
            {site.additionalCapabilities.map((capability) => (
              <em key={capability}>{capability}</em>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
