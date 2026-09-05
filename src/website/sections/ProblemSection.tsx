import { site } from '../../config/site'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'

export function ProblemSection() {
  return (
    <section className="section section--problem" id="problem">
      <div className="shell problem-layout">
        <SectionHeading
          eyebrow={site.problem.eyebrow}
          title={site.problem.title}
          description={site.problem.description}
        />
        <div className="problem-solution" data-reveal>
          <div className="problem-solution__before">
            <div className="section-card__eyebrow">
              <span className="status-dot status-dot--orange" />
              Disconnected activity
            </div>
            <ul>
              {site.problem.problems.map((problem, index) => (
                <li key={problem}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {problem}
                </li>
              ))}
            </ul>
          </div>
          <div className="problem-solution__connector" aria-hidden="true">
            <span>
              <Icon name="arrow" size={22} />
            </span>
          </div>
          <div className="problem-solution__after">
            <div className="section-card__eyebrow">
              <span className="status-dot" />
              One focused system
            </div>
            <div className="solution-mark">
              <span>
                <Icon name="creator" size={20} />
              </span>
              <i />
              <span>
                <Icon name="spark" size={19} />
              </span>
              <i />
              <span>
                <Icon name="distribution" size={20} />
              </span>
            </div>
            <strong>Creators. Content. Distribution.</strong>
            <p>{site.problem.solution}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
