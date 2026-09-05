import { site } from '../../config/site'
import { HeroVisual } from '../components/HeroVisual'
import { Icon } from '../components/Icon'

export function HeroSection({
  onBookCall,
  onBuildPlan,
}: {
  onBookCall: () => void
  onBuildPlan: () => void
}) {
  return (
    <section className="hero" id="top">
      <div className="hero__grid-pattern" aria-hidden="true" />
      <div className="shell hero__inner">
        <div className="hero__content" data-reveal>
          <span className="eyebrow eyebrow--light">
            <i />
            {site.hero.eyebrow}
          </span>
          <h1>{site.hero.title}</h1>
          <p>{site.hero.description}</p>
          <div className="hero__actions">
            <button className="button button--primary" type="button" onClick={onBookCall}>
              Book a Free Strategy Call{' '}
              <span aria-hidden="true">
                <Icon name="arrowUpRight" size={18} />
              </span>
            </button>
            <a className="button button--ghost-light" href="#services">
              Explore Our Services{' '}
              <span aria-hidden="true">
                <Icon name="arrow" size={18} />
              </span>
            </a>
          </div>
          <button className="hero__trust" type="button" onClick={onBuildPlan}>
            <span>
              <i />
              <i />
              <i />
            </span>
            {site.hero.trustStatement}
            <b aria-hidden="true">→</b>
          </button>
        </div>
        <HeroVisual />
      </div>
      <a className="hero__scroll-hint" href="#problem" aria-label="Scroll to the next section">
        <span />
      </a>
    </section>
  )
}
