import { site, whatsappUrl } from '../../config/site'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'
import { SocialLink } from '../components/SocialLink'
import { BrandLeadForm } from '../forms/BrandLeadForm'

export function ContactSection({ context }: { context: string }) {
  return (
    <section className="section section--contact" id="contact">
      <div className="shell contact-layout">
        <div className="contact-copy">
          <SectionHeading
            eyebrow="Let's build deliberately"
            title="Ready to turn attention into growth?"
            description="Tell us where you want to go. We’ll use the details to prepare a more relevant first conversation."
          />
          <div className="contact-direct" data-reveal>
            <a href={`mailto:${site.company.email}`}>
              <span aria-hidden="true">
                <Icon name="mail" size={19} />
              </span>
              <div>
                <small>Email PK Media</small>
                <b>{site.company.email}</b>
              </div>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <span aria-hidden="true">
                <Icon name="whatsapp" size={19} />
              </span>
              <div>
                <small>Message on WhatsApp</small>
                <b>{site.company.phoneDisplay}</b>
              </div>
            </a>
          </div>
          <div className="contact-socials" data-reveal>
            <span>Follow PK Media</span>
            <div>
              <SocialLink label="Instagram" href={site.social.instagram} />
              <SocialLink label="LinkedIn" href={site.social.linkedin} />
              <SocialLink label="X / Twitter" href={site.social.x} />
            </div>
          </div>
        </div>
        <div className="contact-form-card" data-reveal>
          <BrandLeadForm context={context} />
        </div>
      </div>
    </section>
  )
}
