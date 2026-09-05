import { site } from '../../config/site'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'

export function CaseStudiesSection({
  onContact,
}: {
  onContact: (context?: string) => void
}) {
  return (
    <section className="section section--canvas" id="case-studies">
      <div className="shell">
        <div className="case-studies-heading">
          <SectionHeading
            eyebrow="Case studies"
            title="The work speaks best when the story is verified."
            description="We will share documented project stories here when there is real context, permission, and outcomes worth reporting."
          />
          <button
            type="button"
            className="text-link"
            onClick={() => onContact('I would like to discuss what a PK Media partnership could look like.')}
          >
            Discuss your next story{' '}
            <span aria-hidden="true">
              <Icon name="arrowUpRight" size={17} />
            </span>
          </button>
        </div>
        <div className="case-study-grid">
          {site.caseStudies.map((caseStudy, index) => (
            <article className="case-study-card" key={caseStudy.id} data-reveal>
              <div className="case-study-card__visual">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <i />
                  <i />
                  <i />
                </div>
                <em>Verified work only</em>
              </div>
              <div className="case-study-card__body">
                <small>{caseStudy.category}</small>
                <h3>{caseStudy.title}</h3>
                <p>{caseStudy.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
