import { Icon } from './Icon'

export function SocialLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {label}
      <span aria-hidden="true">
        <Icon name="arrowUpRight" size={14} />
      </span>
    </a>
  )
}
