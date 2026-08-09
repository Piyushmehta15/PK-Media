import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react'
import { site, whatsappUrl } from './config/site'

type IconName =
  | 'arrow'
  | 'arrowUpRight'
  | 'check'
  | 'chart'
  | 'creator'
  | 'distribution'
  | 'mail'
  | 'menu'
  | 'network'
  | 'play'
  | 'plus'
  | 'send'
  | 'social'
  | 'spark'
  | 'whatsapp'
  | 'x'

type DeliveryResult = 'endpoint' | 'mailto'
type DeliveryStatus = 'idle' | 'loading' | 'endpoint-success' | 'mailto-ready' | 'error'

const serviceLinks: Record<string, string> = {
  'influencer-marketing': '#creator-campaigns',
  'ugc-creator-content': '#creator-campaigns',
  'social-media-management': '#social-management',
  'content-distribution': '#content-distribution',
  'creator-management': '#creator-campaigns',
  'analytics-growth-strategy': '#analytics',
}

const moveTo = (target: string) => {
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const shared = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'arrow':
      return <svg {...shared}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    case 'arrowUpRight':
      return <svg {...shared}><path d="M7 17 17 7M8 7h9v9" /></svg>
    case 'check':
      return <svg {...shared}><path d="m5 12 4.1 4L19 6" /></svg>
    case 'chart':
      return <svg {...shared}><path d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-9" /></svg>
    case 'creator':
      return <svg {...shared}><circle cx="9" cy="8" r="3" /><path d="M3.5 20c.8-3.2 2.7-5 5.5-5s4.7 1.8 5.5 5M16 8h4M18 6v4" /></svg>
    case 'distribution':
      return <svg {...shared}><path d="M5 6h6M5 18h6M13 12h6M10 6l3 6-3 6M18 9l3 3-3 3" /></svg>
    case 'mail':
      return <svg {...shared}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
    case 'menu':
      return <svg {...shared}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
    case 'network':
      return <svg {...shared}><circle cx="5" cy="12" r="2.3" /><circle cx="18.5" cy="6" r="2.3" /><circle cx="18.5" cy="18" r="2.3" /><path d="m7 11 9.2-4M7 13l9.2 4" /></svg>
    case 'play':
      return <svg {...shared}><path d="m9 7 8 5-8 5z" /></svg>
    case 'plus':
      return <svg {...shared}><path d="M12 5v14M5 12h14" /></svg>
    case 'send':
      return <svg {...shared}><path d="m21 3-7.5 18-3.1-7.4L3 10.5zM10.4 13.6 15 9" /></svg>
    case 'social':
      return <svg {...shared}><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.2" /><circle cx="17" cy="7" r=".7" fill="currentColor" stroke="none" /></svg>
    case 'spark':
      return <svg {...shared}><path d="m12 3 1.5 5.6L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.4zM19 16l.6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6z" /></svg>
    case 'whatsapp':
      return <svg {...shared}><path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.4-4.4a8.4 8.4 0 1 1 15.6-4.4Z" /><path d="M8.7 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.5l.7 1.7c.1.3 0 .5-.2.7l-.5.6c.7 1.3 1.8 2.4 3.2 3.1l.6-.6c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.5v.5c0 .4-.3.6-.6.7-.5.2-1 .3-1.5.2-3.7-.5-6.6-3.3-7.1-7-.1-.5 0-1 .2-1.5Z" /></svg>
    case 'x':
      return <svg {...shared}><path d="M5 5l14 14M19 5 5 19" /></svg>
    default:
      return null
  }
}

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={`brand-mark ${inverse ? 'brand-mark--inverse' : ''}`} href="#top" aria-label="PK Media home">
      <span className="brand-mark__image-wrap">
        <img src={site.company.assets.logo} alt="PK Media" />
      </span>
      <span className="brand-mark__text">
        <strong>{site.company.name}</strong>
        <small>Creator-led growth</small>
      </span>
    </a>
  )
}

function Header({ onBookCall }: { onBookCall: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)
    return () => document.body.classList.remove('menu-is-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="shell site-header__inner">
        <BrandMark inverse={!scrolled} />
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-toggle__icon" aria-hidden="true"><Icon name={menuOpen ? 'x' : 'menu'} size={22} /></span>
        </button>
        <nav id="primary-navigation" className={`site-navigation ${menuOpen ? 'site-navigation--open' : ''}`} aria-label="Primary navigation">
          <div className="site-navigation__mobile-heading">
            <span>Navigate PK Media</span>
            <button type="button" aria-label="Close navigation menu" onClick={closeMenu}><Icon name="x" size={19} /></button>
          </div>
          {site.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
          <button className="button button--primary button--small navigation-cta" type="button" onClick={() => { closeMenu(); onBookCall() }}>
            Book a Free Strategy Call <span aria-hidden="true"><Icon name="arrowUpRight" size={16} /></span>
          </button>
        </nav>
      </div>
    </header>
  )
}

function SectionHeading({ eyebrow, title, description, align = 'left', dark = false }: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  dark?: boolean
}) {
  return (
    <div className={`section-heading section-heading--${align} ${dark ? 'section-heading--dark' : ''}`} data-reveal>
      {eyebrow && <span className="eyebrow"><i />{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Illustration of a connected creator, content, and distribution workspace" role="img">
      <div className="hero-visual__glow hero-visual__glow--teal" />
      <div className="hero-visual__glow hero-visual__glow--orange" />
      <div className="hero-dashboard">
        <div className="hero-dashboard__topline">
          <div className="visual-logo-dot"><span /><span /><span /></div>
          <span>Growth workspace</span>
          <span className="hero-dashboard__status"><i /> System ready</span>
        </div>
        <div className="hero-dashboard__head">
          <div>
            <span className="visual-kicker">Campaign view</span>
            <strong>Creators + content<br />+ distribution</strong>
          </div>
          <div className="visual-window-dots"><i /><i /><i /></div>
        </div>
        <div className="hero-dashboard__metrics">
          <div className="visual-metric-card"><span>Attention</span><b>—</b><em className="trend-line trend-line--teal" /></div>
          <div className="visual-metric-card"><span>Engagement</span><b>—</b><em className="trend-line trend-line--orange" /></div>
          <div className="visual-metric-card"><span>Next signal</span><b>—</b><em className="trend-line trend-line--light" /></div>
        </div>
        <div className="hero-dashboard__lower">
          <div className="visual-flow-card">
            <div className="visual-flow-card__title"><span>Content flow</span><small>Live system</small></div>
            <div className="visual-flow">
              <span className="visual-flow__origin"><Icon name="play" size={14} /></span>
              <i />
              <span className="visual-flow__node">Edit</span>
              <i />
              <span className="visual-flow__node visual-flow__node--accent">Share</span>
            </div>
          </div>
          <div className="visual-orbit-card">
            <div className="visual-orbit-card__ring"><i /><i /><i /></div>
            <span>Creator<br />network</span>
          </div>
        </div>
      </div>
      <div className="visual-floating-card visual-floating-card--creator"><span aria-hidden="true"><Icon name="creator" size={17} /></span><div><small>Creator brief</small><b>Aligned</b></div></div>
      <div className="visual-floating-card visual-floating-card--distribution"><span aria-hidden="true"><Icon name="distribution" size={17} /></span><div><small>Distribution</small><b>Connected</b></div></div>
    </div>
  )
}

function Hero({ onBookCall, onBuildPlan }: { onBookCall: () => void; onBuildPlan: () => void }) {
  return (
    <section className="hero" id="top">
      <div className="hero__grid-pattern" aria-hidden="true" />
      <div className="shell hero__inner">
        <div className="hero__content" data-reveal>
          <span className="eyebrow eyebrow--light"><i />{site.hero.eyebrow}</span>
          <h1>{site.hero.title}</h1>
          <p>{site.hero.description}</p>
          <div className="hero__actions">
            <button className="button button--primary" type="button" onClick={onBookCall}>
              Book a Free Strategy Call <span aria-hidden="true"><Icon name="arrowUpRight" size={18} /></span>
            </button>
            <a className="button button--ghost-light" href="#services">
              Explore Our Services <span aria-hidden="true"><Icon name="arrow" size={18} /></span>
            </a>
          </div>
          <button className="hero__trust" type="button" onClick={onBuildPlan}>
            <span><i /><i /><i /></span>{site.hero.trustStatement}<b aria-hidden="true">→</b>
          </button>
        </div>
        <HeroVisual />
      </div>
      <a className="hero__scroll-hint" href="#problem" aria-label="Scroll to the next section"><span /></a>
    </section>
  )
}

function ProblemSection() {
  return (
    <section className="section section--problem" id="problem">
      <div className="shell problem-layout">
        <SectionHeading eyebrow={site.problem.eyebrow} title={site.problem.title} description={site.problem.description} />
        <div className="problem-solution" data-reveal>
          <div className="problem-solution__before">
            <div className="section-card__eyebrow"><span className="status-dot status-dot--orange" />Disconnected activity</div>
            <ul>
              {site.problem.problems.map((problem, index) => <li key={problem}><span>{String(index + 1).padStart(2, '0')}</span>{problem}</li>)}
            </ul>
          </div>
          <div className="problem-solution__connector" aria-hidden="true"><span><Icon name="arrow" size={22} /></span></div>
          <div className="problem-solution__after">
            <div className="section-card__eyebrow"><span className="status-dot" />One focused system</div>
            <div className="solution-mark"><span><Icon name="creator" size={20} /></span><i /><span><Icon name="spark" size={19} /></span><i /><span><Icon name="distribution" size={20} /></span></div>
            <strong>Creators. Content. Distribution.</strong>
            <p>{site.problem.solution}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceIcon({ name }: { name: IconName }) {
  return <span className="service-icon" aria-hidden="true"><Icon name={name} size={23} /></span>
}

function ServicesSection({ onContact }: { onContact: (context?: string) => void }) {
  return (
    <section className="section section--canvas" id="services">
      <div className="shell">
        <div className="services-intro">
          <SectionHeading
            eyebrow="What we do"
            title="One partner for the parts of growth that need to work together."
            description="Our strongest work lives at the intersection of creators, content, and distribution — supported by the strategy and reporting that make it accountable."
          />
          <button type="button" className="text-link" onClick={() => onContact('I would like to discuss the right PK Media services for my brand.')}>
            Tell us what you need <span aria-hidden="true"><Icon name="arrowUpRight" size={17} /></span>
          </button>
        </div>
        <div className="service-grid">
          {site.services.map((service) => (
            <article key={service.id} className={`service-card ${service.featured ? 'service-card--featured' : ''}`} data-reveal>
              <div className="service-card__topline"><span>{service.order}</span><ServiceIcon name={service.icon as IconName} /></div>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <ul className="deliverable-list">
                {service.deliverables.map((item) => <li key={item}><span aria-hidden="true"><Icon name="check" size={14} /></span>{item}</li>)}
              </ul>
              <a className="service-card__link" href={serviceLinks[service.id]}>
                Learn more <span aria-hidden="true"><Icon name="arrow" size={16} /></span>
              </a>
            </article>
          ))}
        </div>
        <div className="capability-row" data-reveal>
          <span>Also available</span>
          <div>{site.additionalCapabilities.map((capability) => <em key={capability}>{capability}</em>)}</div>
        </div>
      </div>
    </section>
  )
}

function DistributionSection({ onBuildPlan }: { onBuildPlan: () => void }) {
  return (
    <section className="section section--distribution" id="content-distribution">
      <div className="shell distribution-layout">
        <div className="distribution-copy">
          <SectionHeading eyebrow={site.distribution.eyebrow} title={site.distribution.title} description={site.distribution.description} />
          <div className="platform-cloud" data-reveal>
            {site.distribution.platforms.map((platform) => <span key={platform}>{platform}</span>)}
          </div>
          <button type="button" className="button button--ink" onClick={onBuildPlan}>
            Build Your Growth Plan <span aria-hidden="true"><Icon name="arrowUpRight" size={18} /></span>
          </button>
        </div>
        <div className="distribution-workflow" data-reveal>
          <div className="distribution-workflow__topline"><span>Content transformation workflow</span><i>01</i></div>
          <div className="workflow-steps">
            {site.distribution.workflow.map((step, index) => (
              <div className="workflow-step" key={step}>
                <div className="workflow-step__node">
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  {index === 0 && <Icon name="play" size={18} />}
                  {index === 1 && <Icon name="spark" size={18} />}
                  {index === 2 && <Icon name="social" size={18} />}
                  {index === 3 && <Icon name="distribution" size={18} />}
                  {index === 4 && <Icon name="chart" size={18} />}
                  {index === 5 && <Icon name="arrowUpRight" size={18} />}
                </div>
                <span>{step}</span>
                {index < site.distribution.workflow.length - 1 && <i className="workflow-step__line" aria-hidden="true" />}
              </div>
            ))}
          </div>
          <div className="distribution-workflow__note"><span aria-hidden="true"><Icon name="spark" size={15} /></span> Designed to help a valuable idea keep working beyond one upload.</div>
        </div>
      </div>
    </section>
  )
}

function InfluencerSection({ onContact }: { onContact: (context?: string) => void }) {
  return (
    <section className="section section--ink" id="creator-campaigns">
      <div className="shell">
        <div className="influencer-heading">
          <SectionHeading eyebrow={site.influencer.eyebrow} title={site.influencer.title} description={site.influencer.description} dark />
          <button type="button" className="button button--orange-outline" onClick={() => onContact('I want to discuss an influencer or creator campaign.')}>
            Plan a Creator Campaign <span aria-hidden="true"><Icon name="arrowUpRight" size={18} /></span>
          </button>
        </div>
        <div className="campaign-rail" data-reveal aria-label="Creator campaign workflow">
          {site.influencer.workflow.map((step, index) => (
            <div className="campaign-rail__item" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
              {index < site.influencer.workflow.length - 1 && <i aria-hidden="true"><Icon name="arrow" size={15} /></i>}
            </div>
          ))}
        </div>
        <div className="influencer-details">
          <div className="influencer-match" data-reveal>
            <span className="detail-label">Creators are considered around</span>
            <div>{site.influencer.matchingCriteria.map((criteria) => <span key={criteria}>{criteria}</span>)}</div>
          </div>
          <p className="influencer-note" data-reveal><span aria-hidden="true"><Icon name="check" size={16} /></span>{site.influencer.note}</p>
        </div>
      </div>
    </section>
  )
}

function SocialManagementSection({ onContact }: { onContact: (context?: string) => void }) {
  return (
    <section className="section section--canvas" id="social-management">
      <div className="shell social-layout">
        <div className="social-workspace" data-reveal>
          <div className="social-workspace__chrome"><span /><span /><span /><b>PKM / social operating system</b></div>
          <div className="social-workspace__body">
            <div className="social-workspace__sidebar"><span className="active" /><span /><span /><span /></div>
            <div className="social-workspace__calendar">
              <div className="calendar-head"><b>Content rhythm</b><span>Monthly view</span></div>
              <div className="calendar-grid">
                <i /><i className="has-teal" /><i /><i className="has-orange" /><i /><i /><i className="has-teal" /><i /><i className="has-orange" /><i /><i /><i /><i className="has-teal" /><i /><i />
              </div>
            </div>
          </div>
          <div className="social-workspace__footer"><span><i />Plan</span><span><i />Create</span><span><i />Publish</span><span><i />Learn</span></div>
        </div>
        <div className="social-copy">
          <SectionHeading eyebrow={site.socialManagement.eyebrow} title={site.socialManagement.title} description={site.socialManagement.description} />
          <ul className="check-grid" data-reveal>
            {site.socialManagement.services.map((item) => <li key={item}><span aria-hidden="true"><Icon name="check" size={15} /></span>{item}</li>)}
          </ul>
          <div className="social-platforms" data-reveal>
            <small>Planned for the channels that matter</small>
            <div>{site.socialManagement.platforms.map((platform) => <span key={platform}>{platform}</span>)}</div>
          </div>
          <button type="button" className="text-link" onClick={() => onContact('I would like to discuss social media management.')}>Talk about your social presence <span aria-hidden="true"><Icon name="arrowUpRight" size={17} /></span></button>
        </div>
      </div>
    </section>
  )
}

function PackagesSection({ onRequestPackage }: { onRequestPackage: (packageName: string) => void }) {
  return (
    <section className="section section--packages" id="packages">
      <div className="shell">
        <SectionHeading
          eyebrow="Starting points, not one-size-fits-all"
          title="Choose the pace your growth needs."
          description="Every engagement is shaped around your goals. These starting prices are editable and provide a clear place to begin the conversation."
          align="center"
        />
        <div className="packages-grid">
          {site.packages.map((pkg) => (
            <article className={`package-card ${pkg.badge ? 'package-card--featured' : ''}`} key={pkg.id} data-reveal>
              {pkg.badge && <span className="package-card__badge">{pkg.badge}</span>}
              <div className="package-card__topline"><span>{pkg.name}</span><i>{pkg.id === 'scale-partner' ? 'Custom' : 'PKM'}</i></div>
              <div className="package-card__price">
                <small>{pkg.price === 'Custom' ? 'Custom pricing' : 'Starting from'}</small>
                <strong>{pkg.price}</strong><em>{pkg.cadence}</em>
              </div>
              <p>{pkg.purpose}</p>
              <ul>
                {pkg.includes.map((item) => <li key={item}><span aria-hidden="true"><Icon name="check" size={14} /></span>{item}</li>)}
              </ul>
              {pkg.note && <div className="package-card__note"><span aria-hidden="true">†</span>{pkg.note}</div>}
              <button type="button" className="package-card__cta" onClick={() => onRequestPackage(pkg.name)}>{pkg.cta}<span aria-hidden="true"><Icon name="arrowUpRight" size={16} /></span></button>
            </article>
          ))}
        </div>
        <p className="packages-disclaimer" data-reveal>Package scopes, creator fees, platform needs, and production requirements are confirmed in your proposal.</p>
      </div>
    </section>
  )
}

function GrowthPlanBuilder({ onRequestProposal }: { onRequestProposal: (summary: string) => void }) {
  const [selected, setSelected] = useState<Record<string, string[]>>({})
  const selectionCount = Object.values(selected).flat().length

  const toggleOption = (groupId: string, option: string, multi: boolean) => {
    setSelected((current) => {
      const previous = current[groupId] ?? []
      if (!multi) return { ...current, [groupId]: previous.includes(option) ? [] : [option] }
      return {
        ...current,
        [groupId]: previous.includes(option) ? previous.filter((value) => value !== option) : [...previous, option],
      }
    })
  }

  const summary = useMemo(() => site.growthPlanBuilder.groups
    .map((group) => {
      const choices = selected[group.id] ?? []
      return choices.length ? `${group.label}: ${choices.join(', ')}` : ''
    })
    .filter(Boolean)
    .join('\n'), [selected])

  return (
    <section className="section section--plan" id="growth-plan">
      <div className="shell plan-layout">
        <div className="plan-copy">
          <SectionHeading eyebrow={site.growthPlanBuilder.eyebrow} title={site.growthPlanBuilder.title} description={site.growthPlanBuilder.description} />
          <div className="plan-summary-card" data-reveal>
            <div><span>Your selected building blocks</span><b>{selectionCount ? `${selectionCount} selected` : 'Nothing selected yet'}</b></div>
            <p>{selectionCount ? 'Your choices will be included with your proposal request.' : 'Select the areas you want to explore — we will not generate an automatic quote.'}</p>
          </div>
        </div>
        <div className="plan-builder" data-reveal>
          {site.growthPlanBuilder.groups.map((group) => (
            <fieldset className="plan-builder__group" key={group.id}>
              <legend>{group.label}<small>{group.multi ? 'Choose any that apply' : 'Choose one option'}</small></legend>
              <div className="plan-options">
                {group.options.map((option) => {
                  const isSelected = (selected[group.id] ?? []).includes(option)
                  return (
                    <button
                      type="button"
                      className={`plan-option ${isSelected ? 'plan-option--selected' : ''}`}
                      aria-pressed={isSelected}
                      key={option}
                      onClick={() => toggleOption(group.id, option, group.multi)}
                    >
                      <span aria-hidden="true">{isSelected ? <Icon name="check" size={14} /> : <Icon name="plus" size={14} />}</span>{option}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ))}
          <button type="button" className="button button--primary plan-builder__cta" disabled={!selectionCount} onClick={() => onRequestProposal(summary)}>
            Request Custom Proposal <span aria-hidden="true"><Icon name="arrowUpRight" size={18} /></span>
          </button>
        </div>
      </div>
    </section>
  )
}

function CustomStrategySection({ onContact }: { onContact: (context?: string) => void }) {
  return (
    <section className="section section--custom-strategy" id="custom-growth-plan">
      <div className="shell custom-strategy__layout">
        <div className="custom-strategy__copy">
          <SectionHeading eyebrow={site.customGrowthPlan.eyebrow} title={site.customGrowthPlan.title} description={site.customGrowthPlan.description} dark />
          <button type="button" className="button button--light" onClick={() => onContact('I would like to request a custom strategy.')}>Request a Custom Strategy <span aria-hidden="true"><Icon name="arrowUpRight" size={18} /></span></button>
        </div>
        <ol className="strategy-steps" data-reveal>
          {site.customGrowthPlan.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}
        </ol>
      </div>
    </section>
  )
}

function HowItWorksSection({ onBookCall }: { onBookCall: () => void }) {
  return (
    <section className="section section--how" id="how-it-works">
      <div className="shell how-layout">
        <div className="how-intro">
          <SectionHeading eyebrow="How it works" title="A clear path from first conversation to the next improvement." description="Each partnership starts with context and keeps a deliberate rhythm from strategy through learning." />
          <button type="button" className="text-link" onClick={onBookCall}>Start with a discovery call <span aria-hidden="true"><Icon name="arrowUpRight" size={17} /></span></button>
        </div>
        <ol className="process-timeline">
          {site.howItWorks.map((item) => (
            <li key={item.number} data-reveal>
              <span className="process-timeline__number">{item.number}</span>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function AnalyticsSection({ onContact }: { onContact: (context?: string) => void }) {
  return (
    <section className="section section--analytics" id="analytics">
      <div className="shell analytics-layout">
        <div className="analytics-copy">
          <SectionHeading eyebrow={site.analytics.eyebrow} title={site.analytics.title} description={site.analytics.description} />
          <button type="button" className="button button--ink" onClick={() => onContact('I would like to see how PK Media reports campaigns.')}>
            See How We Report Campaigns <span aria-hidden="true"><Icon name="arrowUpRight" size={18} /></span>
          </button>
        </div>
        <div className="analytics-dashboard" data-reveal>
          <div className="analytics-dashboard__head"><div><i /><span>Campaign reporting</span></div><small>Values update with real campaign data</small></div>
          <div className="analytics-metrics">
            {site.analytics.metrics.map((metric, index) => (
              <div className="analytics-metric" key={metric}><span>{metric}</span><b>—</b><i className={`metric-dash metric-dash--${index % 3}`} /></div>
            ))}
          </div>
          <div className="analytics-dashboard__foot"><span><i /> Delivery</span><span><i /> Signals</span><span><i /> Next actions</span></div>
        </div>
      </div>
    </section>
  )
}

function CaseStudiesSection({ onContact }: { onContact: (context?: string) => void }) {
  return (
    <section className="section section--canvas" id="case-studies">
      <div className="shell">
        <div className="case-studies-heading">
          <SectionHeading eyebrow="Case studies" title="The work speaks best when the story is verified." description="We will share documented project stories here when there is real context, permission, and outcomes worth reporting." />
          <button type="button" className="text-link" onClick={() => onContact('I would like to discuss what a PK Media partnership could look like.')}>Discuss your next story <span aria-hidden="true"><Icon name="arrowUpRight" size={17} /></span></button>
        </div>
        <div className="case-study-grid">
          {site.caseStudies.map((caseStudy, index) => (
            <article className="case-study-card" key={caseStudy.id} data-reveal>
              <div className="case-study-card__visual"><span>{String(index + 1).padStart(2, '0')}</span><div><i /><i /><i /></div><em>Verified work only</em></div>
              <div className="case-study-card__body"><small>{caseStudy.category}</small><h3>{caseStudy.title}</h3><p>{caseStudy.description}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection({ onContact }: { onContact: (context?: string) => void }) {
  return (
    <section className="section section--about" id="about">
      <div className="shell about-layout">
        <div className="about-seal-wrap" data-reveal>
          <div className="about-seal__ring"><span>GROW ORGANICALLY • SHINE GLOBALLY •</span></div>
          <img src={site.company.assets.seal} alt="PK Media circular logo" />
          <div className="about-seal__orbit about-seal__orbit--one" /><div className="about-seal__orbit about-seal__orbit--two" />
        </div>
        <div className="about-copy">
          <SectionHeading eyebrow={site.about.eyebrow} title={site.about.title} description={site.about.description} />
          <div className="about-founder" data-reveal><span>Founded by</span><b>{site.company.founder}</b></div>
          <blockquote data-reveal><span>Vision</span><p>“{site.about.vision}”</p></blockquote>
          <button type="button" className="text-link" onClick={() => onContact('I would like to learn more about PK Media.')}>
            Start a conversation <span aria-hidden="true"><Icon name="arrowUpRight" size={17} /></span>
          </button>
        </div>
      </div>
    </section>
  )
}

async function deliverForm(kind: string, entries: Array<[string, string]>): Promise<DeliveryResult> {
  if (site.formEndpoint) {
    const response = await fetch(site.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ form: kind, data: Object.fromEntries(entries) }),
    })
    if (!response.ok) throw new Error('Unable to send the form.')
    return 'endpoint'
  }

  const body = entries
    .filter(([, value]) => value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
  const subject = encodeURIComponent(`${kind} — PK Media website`)
  window.location.href = `mailto:${site.company.email}?subject=${subject}&body=${encodeURIComponent(body)}`
  return 'mailto'
}

function FormNotice({ status }: { status: DeliveryStatus }) {
  if (status === 'endpoint-success') return <p className="form-notice form-notice--success" role="status">Thank you — PK Media has received your details and will be in touch.</p>
  if (status === 'mailto-ready') return <p className="form-notice form-notice--success" role="status">Your email app has been opened with this request addressed to PK Media. If it did not open, email {site.company.email} directly.</p>
  if (status === 'error') return <p className="form-notice form-notice--error" role="alert">We could not prepare that request. Please try again, email us directly, or use WhatsApp.</p>
  return null
}

function BrandLeadForm({ context }: { context: string }) {
  const [form, setForm] = useState({
    name: '', company: '', email: '', whatsapp: '', website: '', industry: '', budget: '', message: '', services: [] as string[],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<DeliveryStatus>('idle')

  const update = (field: keyof typeof form, value: string | string[]) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const toggleService = (service: string) => {
    const next = form.services.includes(service) ? form.services.filter((item) => item !== service) : [...form.services, service]
    update('services', next)
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = 'Please add your name.'
    if (!form.company.trim()) next.company = 'Please add your company name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please enter a valid email address.'
    if (form.whatsapp.replace(/\D/g, '').length < 7) next.whatsapp = 'Please enter a valid WhatsApp number.'
    if (!form.budget) next.budget = 'Please select a monthly budget range.'
    if (!form.services.length && !context) next.services = 'Choose at least one service you are interested in.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const result = await deliverForm('Brand strategy call request', [
        ['Name', form.name], ['Company', form.company], ['Email', form.email], ['WhatsApp', form.whatsapp], ['Website', form.website], ['Industry', form.industry], ['Monthly marketing budget', form.budget], ['Services interested in', form.services.join(', ')], ['Request context / growth plan', context], ['Message', form.message],
      ])
      setStatus(result === 'endpoint' ? 'endpoint-success' : 'mailto-ready')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="lead-form" noValidate onSubmit={handleSubmit}>
      {context && <div className="form-context"><span aria-hidden="true"><Icon name="spark" size={16} /></span><p><b>Request included</b>{context}</p></div>}
      <div className="form-grid">
        <FormField label="Name" required error={errors.name}><input id="lead-name" name="name" autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} /></FormField>
        <FormField label="Company" required error={errors.company}><input name="company" autoComplete="organization" value={form.company} onChange={(event) => update('company', event.target.value)} aria-invalid={Boolean(errors.company)} /></FormField>
        <FormField label="Email" required error={errors.email}><input name="email" type="email" autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} /></FormField>
        <FormField label="WhatsApp" required error={errors.whatsapp}><input name="whatsapp" type="tel" autoComplete="tel" inputMode="tel" value={form.whatsapp} onChange={(event) => update('whatsapp', event.target.value)} aria-invalid={Boolean(errors.whatsapp)} /></FormField>
        <FormField label="Website" hint="Optional"><input name="website" type="url" placeholder="https://" value={form.website} onChange={(event) => update('website', event.target.value)} /></FormField>
        <FormField label="Industry"><select name="industry" value={form.industry} onChange={(event) => update('industry', event.target.value)}><option value="">Select an industry</option>{site.forms.industries.map((industry) => <option value={industry} key={industry}>{industry}</option>)}</select></FormField>
        <FormField label="Monthly Marketing Budget" required error={errors.budget}><select name="budget" value={form.budget} onChange={(event) => update('budget', event.target.value)} aria-invalid={Boolean(errors.budget)}><option value="">Select a range</option>{site.forms.brandBudgets.map((budget) => <option value={budget} key={budget}>{budget}</option>)}</select></FormField>
        <fieldset className="form-field form-field--services">
          <legend>Services Interested In <span>Required</span></legend>
          <div className="form-choices">
            {site.forms.serviceOptions.map((service) => <label className={`form-choice ${form.services.includes(service) ? 'form-choice--checked' : ''}`} key={service}><input type="checkbox" checked={form.services.includes(service)} onChange={() => toggleService(service)} /><span aria-hidden="true"><Icon name="check" size={12} /></span>{service}</label>)}
          </div>
          {errors.services && <small className="field-error">{errors.services}</small>}
        </fieldset>
        <FormField label="Message" extraClass="form-field--full"><textarea name="message" rows={4} placeholder="Tell us a little about the growth challenge you want to solve." value={form.message} onChange={(event) => update('message', event.target.value)} /></FormField>
      </div>
      <button className="button button--primary form-submit" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Preparing your request…' : 'Request a Free Strategy Call'} <span aria-hidden="true"><Icon name="send" size={17} /></span></button>
      <FormNotice status={status} />
    </form>
  )
}

function FormField({ label, required, hint, error, extraClass = '', children }: { label: string; required?: boolean; hint?: string; error?: string; extraClass?: string; children: ReactNode }) {
  return <label className={`form-field ${extraClass}`}><span>{label}{required && <em>Required</em>}{hint && <em>{hint}</em>}</span>{children}{error && <small className="field-error">{error}</small>}</label>
}

function CreatorApplicationForm() {
  const [form, setForm] = useState({
    name: '', instagram: '', youtube: '', tiktok: '', category: '', location: '', followers: '', averageViews: '', email: '', phone: '', portfolio: '', rateCard: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<DeliveryStatus>('idle')
  const update = (field: keyof typeof form, value: string) => { setForm((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: '' })) }
  const validate = () => {
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = 'Please add your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please enter a valid email address.'
    if (form.phone.replace(/\D/g, '').length < 7) next.phone = 'Please enter a valid phone number.'
    if (!form.category.trim()) next.category = 'Please share your category or niche.'
    setErrors(next)
    return Object.keys(next).length === 0
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const result = await deliverForm('Creator network application', [
        ['Name', form.name], ['Instagram', form.instagram], ['YouTube', form.youtube], ['TikTok', form.tiktok], ['Category / Niche', form.category], ['Location', form.location], ['Followers', form.followers], ['Average views', form.averageViews], ['Email', form.email], ['Phone', form.phone], ['Portfolio', form.portfolio], ['Rate card', form.rateCard],
      ])
      setStatus(result === 'endpoint' ? 'endpoint-success' : 'mailto-ready')
    } catch { setStatus('error') }
  }
  return (
    <form className="creator-form" id="creator-application" noValidate onSubmit={handleSubmit}>
      <div className="creator-form__intro"><span>Creator application</span><p>Share your details and we’ll have the right information if a relevant opportunity comes up.</p></div>
      <div className="form-grid form-grid--creator">
        <FormField label="Name" required error={errors.name}><input name="creator-name" autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} /></FormField>
        <FormField label="Email" required error={errors.email}><input name="creator-email" type="email" autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} /></FormField>
        <FormField label="Phone" required error={errors.phone}><input name="creator-phone" type="tel" autoComplete="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} aria-invalid={Boolean(errors.phone)} /></FormField>
        <FormField label="Category / Niche" required error={errors.category}><input name="category" placeholder="e.g. Beauty, gaming, fitness" value={form.category} onChange={(event) => update('category', event.target.value)} aria-invalid={Boolean(errors.category)} /></FormField>
        <FormField label="Instagram"><input name="instagram" placeholder="@yourhandle" value={form.instagram} onChange={(event) => update('instagram', event.target.value)} /></FormField>
        <FormField label="YouTube"><input name="youtube" placeholder="Channel URL or handle" value={form.youtube} onChange={(event) => update('youtube', event.target.value)} /></FormField>
        <FormField label="TikTok"><input name="tiktok" placeholder="@yourhandle" value={form.tiktok} onChange={(event) => update('tiktok', event.target.value)} /></FormField>
        <FormField label="Location"><input name="location" autoComplete="address-level2" value={form.location} onChange={(event) => update('location', event.target.value)} /></FormField>
        <FormField label="Followers"><input name="followers" inputMode="numeric" placeholder="e.g. 10K" value={form.followers} onChange={(event) => update('followers', event.target.value)} /></FormField>
        <FormField label="Average Views"><input name="average-views" inputMode="numeric" placeholder="e.g. 8K" value={form.averageViews} onChange={(event) => update('averageViews', event.target.value)} /></FormField>
        <FormField label="Portfolio" hint="Optional"><input name="portfolio" type="url" placeholder="Link to your work" value={form.portfolio} onChange={(event) => update('portfolio', event.target.value)} /></FormField>
        <FormField label="Rate Card" hint="Optional"><input name="rate-card" type="url" placeholder="Link to rate card" value={form.rateCard} onChange={(event) => update('rateCard', event.target.value)} /></FormField>
      </div>
      <button className="button button--light creator-form__submit" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Preparing your application…' : 'Join the PK Media Creator Network'} <span aria-hidden="true"><Icon name="arrowUpRight" size={17} /></span></button>
      <FormNotice status={status} />
    </form>
  )
}

function CreatorsSection() {
  return (
    <section className="section section--creators" id="creators">
      <div className="shell">
        <div className="creators-heading">
          <SectionHeading eyebrow={site.creators.eyebrow} title={site.creators.title} description={site.creators.description} dark />
          <a className="button button--orange-outline" href="#creator-application">Join the Creator Network <span aria-hidden="true"><Icon name="arrow" size={18} /></span></a>
        </div>
        <div className="creator-benefit-grid" data-reveal>
          {site.creators.benefits.map((benefit, index) => <div key={benefit}><span>{String(index + 1).padStart(2, '0')}</span><p>{benefit}</p></div>)}
        </div>
        <CreatorApplicationForm />
      </div>
    </section>
  )
}

function ContactSection({ context }: { context: string }) {
  return (
    <section className="section section--contact" id="contact">
      <div className="shell contact-layout">
        <div className="contact-copy">
          <SectionHeading eyebrow="Let's build deliberately" title="Ready to turn attention into growth?" description="Tell us where you want to go. We’ll use the details to prepare a more relevant first conversation." />
          <div className="contact-direct" data-reveal>
            <a href={`mailto:${site.company.email}`}><span aria-hidden="true"><Icon name="mail" size={19} /></span><div><small>Email PK Media</small><b>{site.company.email}</b></div></a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer"><span aria-hidden="true"><Icon name="whatsapp" size={19} /></span><div><small>Message on WhatsApp</small><b>{site.company.phoneDisplay}</b></div></a>
          </div>
          <div className="contact-socials" data-reveal><span>Follow PK Media</span><div><SocialLink label="Instagram" href={site.social.instagram} /><SocialLink label="LinkedIn" href={site.social.linkedin} /><SocialLink label="X / Twitter" href={site.social.x} /></div></div>
        </div>
        <div className="contact-form-card" data-reveal><BrandLeadForm context={context} /></div>
      </div>
    </section>
  )
}

function SocialLink({ label, href }: { label: string; href: string }) {
  return <a href={href} target="_blank" rel="noreferrer">{label}<span aria-hidden="true"><Icon name="arrowUpRight" size={14} /></span></a>
}

function Footer() {
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
          <div className="footer-brand"><BrandMark inverse /><p>{site.hero.trustStatement}</p></div>
          <nav aria-label="Footer navigation" className="footer-links">{footerLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}</nav>
          <div className="footer-contact"><a href={`mailto:${site.company.email}`}>{site.company.email}</a><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp {site.company.phoneDisplay}</a></div>
        </div>
        <div className="site-footer__bottom"><p>© 2026 PK Media. All rights reserved.</p><div><SocialLink label="Instagram" href={site.social.instagram} /><SocialLink label="LinkedIn" href={site.social.linkedin} /><SocialLink label="X / Twitter" href={site.social.x} /><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp <span aria-hidden="true"><Icon name="arrowUpRight" size={14} /></span></a></div></div>
      </div>
    </footer>
  )
}

function FloatingWhatsApp() {
  return <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with PK Media on WhatsApp"><span aria-hidden="true"><Icon name="whatsapp" size={23} /></span><b>WhatsApp</b></a>
}

export default function App() {
  const [leadContext, setLeadContext] = useState('')

  useEffect(() => {
    document.title = site.seo.title
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', site.seo.description)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (reduceMotion) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const focusLeadForm = () => {
    window.setTimeout(() => document.getElementById('lead-name')?.focus(), 520)
  }
  const goToContact = (context = '') => {
    setLeadContext(context)
    moveTo('#contact')
    focusLeadForm()
  }
  const buildPlan = () => moveTo('#growth-plan')
  const requestProposal = (summary: string) => goToContact(`Custom growth plan selections:\n${summary}`)
  const requestPackage = (packageName: string) => goToContact(`Package interest: ${packageName}`)

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header onBookCall={() => goToContact()} />
      <main id="main-content">
        <Hero onBookCall={() => goToContact()} onBuildPlan={buildPlan} />
        <ProblemSection />
        <ServicesSection onContact={goToContact} />
        <DistributionSection onBuildPlan={buildPlan} />
        <InfluencerSection onContact={goToContact} />
        <SocialManagementSection onContact={goToContact} />
        <PackagesSection onRequestPackage={requestPackage} />
        <GrowthPlanBuilder onRequestProposal={requestProposal} />
        <CustomStrategySection onContact={goToContact} />
        <HowItWorksSection onBookCall={() => goToContact()} />
        <AnalyticsSection onContact={goToContact} />
        <CaseStudiesSection onContact={goToContact} />
        <AboutSection onContact={goToContact} />
        <CreatorsSection />
        <ContactSection context={leadContext} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
