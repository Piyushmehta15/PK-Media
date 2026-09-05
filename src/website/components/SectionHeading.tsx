import { SectionHeadingProps } from '../types/website.types'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align} ${dark ? 'section-heading--dark' : ''}`} data-reveal>
      {eyebrow && <span className="eyebrow"><i />{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
