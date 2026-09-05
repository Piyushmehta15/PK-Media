import { site } from '../../config/site'

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
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
