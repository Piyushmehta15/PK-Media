import { site } from '../../config/site'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'

export function AboutSection({ onContact }: { onContact: (context?: string) => void }) {
  return (
    <section className="section section--about" id="about">
      <div className="shell about-layout">
        <div className="about-logo-wrap" data-reveal>
          <img src={site.company.assets.leafLogo} alt="PK Media Logo" className="about-logo-img" />
        </div>
        <div className="about-copy">
          <SectionHeading
            eyebrow={site.about.eyebrow}
            title={site.about.title}
            description={site.about.description}
          />
          <div className="about-founder" data-reveal>
            <span>Founded by</span>
            <b>{site.company.founder}</b>
          </div>
          <blockquote data-reveal>
            <span>Vision</span>
            <p>“{site.about.vision}”</p>
          </blockquote>
          <button
            type="button"
            className="text-link"
            onClick={() => onContact('I would like to learn more about PK Media.')}
          >
            Start a conversation{' '}
            <span aria-hidden="true">
              <Icon name="arrowUpRight" size={17} />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
