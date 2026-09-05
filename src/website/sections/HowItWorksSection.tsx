import { site } from '../../config/site'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'

export function HowItWorksSection({ onBookCall }: { onBookCall: () => void }) {
  return (
    <section className="section section--how" id="how-it-works">
      <div className="shell how-layout">
        <div className="how-intro">
          <SectionHeading
            eyebrow="How it works"
            title="A clear path from first conversation to the next improvement."
            description="Each partnership starts with context and keeps a deliberate rhythm from strategy through learning."
          />
          <button type="button" className="text-link" onClick={onBookCall}>
            Start with a discovery call{' '}
            <span aria-hidden="true">
              <Icon name="arrowUpRight" size={17} />
            </span>
          </button>
        </div>
        <ol className="process-timeline">
          {site.howItWorks.map((item) => (
            <li key={item.number} data-reveal>
              <span className="process-timeline__number">{item.number}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
