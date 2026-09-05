import { Package } from '../types/website.types'
import { Icon } from '../components/Icon'

export function PackageScopeDialog({
  pkg,
  onClose,
  onRequestPackage,
}: {
  pkg: Package
  onClose: () => void
  onRequestPackage: (packageName: string) => void
}) {
  const titleId = `package-scope-${pkg.id}`

  return (
    <div
      className="package-dialog-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section className="package-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button
          className="package-dialog__close"
          type="button"
          aria-label="Close package scope"
          onClick={onClose}
        >
          <Icon name="x" size={18} />
        </button>
        <div className="package-dialog__eyebrow">
          <span>PK Media package scope</span>
          <i>{pkg.badge ?? 'PKM'}</i>
        </div>
        <div className="package-dialog__heading">
          <div>
            <h3 id={titleId}>{pkg.name}</h3>
            <p>{pkg.purpose}</p>
          </div>
          <div className="package-dialog__price">
            <small>{pkg.priceLabel}</small>
            <strong>{pkg.price}</strong>
            {pkg.cadence ? <em>{pkg.cadence}</em> : null}
            {pkg.priceHint ? <em>{pkg.priceHint}</em> : null}
          </div>
        </div>
        <div className="package-dialog__content">
          <div className="package-dialog__included">
            <h4>Included in this package</h4>
            <ul>
              {pkg.fullScope.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">
                    <Icon name="check" size={15} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="package-dialog__supporting">
            <div>
              <h4>What PK Media does</h4>
              <p>{pkg.whatWeHandle}</p>
            </div>
            <div>
              <h4>What the client provides</h4>
              <ul>
                {pkg.clientProvides.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">
                      <Icon name="check" size={14} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Not included by default</h4>
              <ul>
                {pkg.notIncluded.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <aside className="package-dialog__note">
          <span aria-hidden="true">†</span>
          <p>{pkg.scopeNote}</p>
        </aside>
        <button
          type="button"
          className="button button--primary package-dialog__cta"
          onClick={() => {
            onClose()
            onRequestPackage(pkg.name)
          }}
        >
          {pkg.cta}{' '}
          <span aria-hidden="true">
            <Icon name="arrowUpRight" size={16} />
          </span>
        </button>
      </section>
    </div>
  )
}
