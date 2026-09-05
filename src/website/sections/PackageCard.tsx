import { useState } from 'react'
import { Package } from '../types/website.types'
import { Icon } from '../components/Icon'

export function PackageCard({
  pkg,
  onRequestPackage,
  onViewFullDetails,
}: {
  pkg: Package
  onRequestPackage: (packageName: string) => void
  onViewFullDetails: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const limit = 5
  const hasMore = pkg.includes.length > limit
  const visibleIncludes = expanded ? pkg.includes : pkg.includes.slice(0, limit)
  const isFeatured = pkg.id === 'growth-engine'

  return (
    <article
      className={`package-card ${isFeatured ? 'package-card--featured' : ''}`}
      key={pkg.id}
      data-reveal
    >
      {pkg.badge && <span className="package-card__badge">{pkg.badge}</span>}
      <div className="package-card__topline">
        <span>{pkg.name}</span>
        <i>{pkg.id === 'scale-partner' || pkg.id.includes('scale') ? 'Custom' : 'PKM'}</i>
      </div>
      <div className="package-card__price">
        <small>{pkg.priceLabel}</small>
        <strong>{pkg.price}</strong>
        {pkg.cadence && <em>{pkg.cadence}</em>}
        {pkg.priceHint && <em className="package-card__price-hint">{pkg.priceHint}</em>}
      </div>
      {pkg.bestFor && (
        <div className="package-card__best-for">
          <span>Best for:</span> {pkg.bestFor}
        </div>
      )}
      <p className="package-card__purpose">{pkg.purpose}</p>

      <div className="package-card__checklist-container">
        <ul className="package-card__checklist">
          {visibleIncludes.map((item) => (
            <li key={item}>
              <span aria-hidden="true">
                <Icon name="check" size={14} />
              </span>
              {item}
            </li>
          ))}
        </ul>
        {hasMore && (
          <button
            type="button"
            className="package-card__expand-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show Less Features' : 'View Full Scope'}
            <span
              aria-hidden="true"
              style={{
                display: 'inline-flex',
                transform: expanded ? 'rotate(45deg)' : 'none',
                transition: 'transform 0.2s',
                marginLeft: '6px',
              }}
            >
              <Icon name="plus" size={10} />
            </span>
          </button>
        )}
      </div>

      {pkg.note && (
        <div className="package-card__note">
          <span aria-hidden="true">†</span>
          {pkg.note}
        </div>
      )}

      <div className="package-card__actions">
        <button
          type="button"
          className="package-card__scope"
          aria-haspopup="dialog"
          onClick={onViewFullDetails}
        >
          Scope Breakdown{' '}
          <span aria-hidden="true">
            <Icon name="plus" size={12} />
          </span>
        </button>
        <button
          type="button"
          className="package-card__cta"
          onClick={() => onRequestPackage(pkg.name)}
        >
          {pkg.cta}{' '}
          <span aria-hidden="true">
            <Icon name="arrowUpRight" size={14} />
          </span>
        </button>
      </div>
    </article>
  )
}
