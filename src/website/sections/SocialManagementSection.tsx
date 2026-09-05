import { site } from '../../config/site'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'

export function SocialManagementSection({
  onContact,
}: {
  onContact: (context?: string) => void
}) {
  return (
    <section className="section section--canvas" id="social-management">
      <div className="shell social-layout">
        <div className="social-workspace" data-reveal>
          <div className="social-workspace__chrome">
            <span />
            <span />
            <span />
            <b>PKM / social operating system</b>
          </div>
          <div className="social-workspace__body">
            <div className="social-workspace__sidebar">
              <span className="active" />
              <span />
              <span />
              <span />
            </div>
            <div className="social-workspace__calendar">
              <div className="calendar-head">
                <b>Content rhythm</b>
                <span>Monthly view</span>
              </div>
              <div className="calendar-grid">
                <i />
                <i className="has-teal" />
                <i />
                <i className="has-orange" />
                <i />
                <i />
                <i className="has-teal" />
                <i />
                <i className="has-orange" />
                <i />
                <i />
                <i />
                <i className="has-teal" />
                <i />
                <i />
              </div>
            </div>
          </div>
          <div className="social-workspace__footer">
            <span>
              <i />
              Plan
            </span>
            <span>
              <i />
              Create
            </span>
            <span>
              <i />
              Publish
            </span>
            <span>
              <i />
              Learn
            </span>
          </div>
        </div>
        <div className="social-copy">
          <SectionHeading
            eyebrow={site.socialManagement.eyebrow}
            title={site.socialManagement.title}
            description={site.socialManagement.description}
          />
          <ul className="check-grid" data-reveal>
            {site.socialManagement.services.map((item) => (
              <li key={item}>
                <span aria-hidden="true">
                  <Icon name="check" size={15} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="social-platforms" data-reveal>
            <small>Planned for the channels that matter</small>
            <div>
              {site.socialManagement.platforms.map((platform) => (
                <span key={platform}>{platform}</span>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="text-link"
            onClick={() => onContact('I would like to discuss social media management.')}
          >
            Talk about your social presence{' '}
            <span aria-hidden="true">
              <Icon name="arrowUpRight" size={17} />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
