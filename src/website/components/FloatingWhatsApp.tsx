import { whatsappUrl } from '../../config/site'
import { Icon } from './Icon'

export function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with PK Media on WhatsApp"
    >
      <span aria-hidden="true">
        <Icon name="whatsapp" size={23} />
      </span>
      <b>WhatsApp</b>
    </a>
  )
}
