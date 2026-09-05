import { site } from '../../config/site'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'

export function PackageOperatingModelSection() {
  return (
    <section className="section section--package-operations" aria-label="How PK Media Works">
      <div className="shell">
        <SectionHeading
          eyebrow="A clear working rhythm"
          title="How PK Media Works"
          description="A connected process for building attention, improving consistency and learning from each cycle."
          align="center"
        />
        <div className="package-process" data-reveal>
          {site.packageExperience.process.map((step) => (
            <article className="package-process__step" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <aside className="commercial-scope" data-reveal>
          <div>
            <span>Commercial Scope</span>
            <i aria-hidden="true">†</i>
          </div>
          <p>{site.packageExperience.commercialScope}</p>
        </aside>
        <div className="package-responsibilities" data-reveal>
          <details className="package-responsibility" open>
            <summary>
              <span>
                <i aria-hidden="true">01</i>What Does the Client Provide?
              </span>
              <b aria-hidden="true">
                <Icon name="plus" size={17} />
              </b>
            </summary>
            <ul>
              {site.packageExperience.clientProvides.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">
                    <Icon name="check" size={15} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </details>
          <details className="package-responsibility" open>
            <summary>
              <span>
                <i aria-hidden="true">02</i>What Does PK Media Handle?
              </span>
              <b aria-hidden="true">
                <Icon name="plus" size={17} />
              </b>
            </summary>
            <ul>
              {site.packageExperience.pkMediaHandles.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">
                    <Icon name="check" size={15} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </section>
  )
}
