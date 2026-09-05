import { useEffect, useState } from 'react'
import { site } from '../../config/site'
import { Package } from '../types/website.types'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'
import { PackageCard } from './PackageCard'
import { PackageComparison } from './PackageComparison'
import { PackageScopeDialog } from './PackageScopeDialog'

export function PackagesSection({
  onRequestPackage,
}: {
  onRequestPackage: (packageName: string) => void
}) {
  const [activePackage, setActivePackage] = useState<Package | null>(null)

  useEffect(() => {
    if (!activePackage) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePackage(null)
    }
    document.body.classList.add('package-dialog-is-open')
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('package-dialog-is-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activePackage])

  return (
    <section className="section section--packages" id="packages">
      <div className="shell">
        <SectionHeading
          eyebrow="Starting points, not one-size-fits-all"
          title="Choose the Right Growth System for Your Brand"
          description="From consistent content to full-scale creator-led growth, PK Media offers flexible solutions based on your business stage and goals."
          align="center"
        />

        <div className="positioning-statement-container" data-reveal>
          <div className="positioning-statement">
            <span className="positioning-statement__badge">Core Positioning</span>
            <p>
              “PK Media connects content, creators, distribution, and analytics into one coordinated
              growth system.”
            </p>
          </div>
        </div>

        <div className="packages-grid">
          {site.packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onRequestPackage={onRequestPackage}
              onViewFullDetails={() => setActivePackage(pkg)}
            />
          ))}
        </div>

        {/* Custom package CTA */}
        <div className="custom-package-cta-container" data-reveal>
          <div className="custom-package-cta">
            <div className="custom-package-cta__text">
              <h3>Need something tailored to your brand?</h3>
              <p>
                We can build a custom growth plan based on your goals, content needs, creator
                budget, and growth stage.
              </p>
            </div>
            <button
              type="button"
              className="button button--primary custom-package-cta__btn"
              onClick={() => onRequestPackage('Custom Tailored Growth Plan')}
            >
              Book a Free Strategy Call{' '}
              <span aria-hidden="true">
                <Icon name="arrowUpRight" size={18} />
              </span>
            </button>
          </div>
        </div>

        <p className="packages-disclaimer" data-reveal>
          {site.packageExperience.shortPositioning} Package scopes, creator fees, platform needs
          and production requirements are confirmed in your proposal.
        </p>
        <PackageComparison />
      </div>
      {activePackage && (
        <PackageScopeDialog
          pkg={activePackage}
          onClose={() => setActivePackage(null)}
          onRequestPackage={onRequestPackage}
        />
      )}
    </section>
  )
}
