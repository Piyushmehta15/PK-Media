import { site, whatsappUrl } from '../../config/site'
import { BrandMark } from './BrandMark'
import { Icon } from './Icon'
import { SocialLink } from './SocialLink'

export function Footer() {
  const footerLinks = [
    ...site.navigation.slice(0, 2),
    { label: 'Custom Growth Plan', href: '#custom-growth-plan' },
    ...site.navigation.slice(2, 5),
    { label: 'For Creators', href: '#creators' },
    site.navigation[5],
  ]

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__top">
          <div className="footer-brand">
            <BrandMark inverse />
            <p>{site.hero.trustStatement}</p>
          </div>
          <nav aria-label="Footer navigation" className="footer-links">
            {footerLinks.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="footer-contact">
            <a href={`mailto:${site.company.email}`}>{site.company.email}</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp {site.company.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>© 2026 PK Media. All rights reserved.</p>
          <div>
            <SocialLink label="Instagram" href={site.social.instagram} />
            <SocialLink label="LinkedIn" href={site.social.linkedin} />
            <SocialLink label="X / Twitter" href={site.social.x} />
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp{' '}
              <span aria-hidden="true">
                <Icon name="arrowUpRight" size={14} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
