import { site } from '../../config/site'
import { DeliveryStatus } from '../types/website.types'

export function FormNotice({ status }: { status: DeliveryStatus }) {
  if (status === 'endpoint-success') {
    return (
      <p className="form-notice form-notice--success" role="status">
        Thank you — PK Media has received your details and will be in touch.
      </p>
    )
  }
  if (status === 'mailto-ready') {
    return (
      <p className="form-notice form-notice--success" role="status">
        Your email app has been opened with this request addressed to PK Media. If it did not open, email{' '}
        {site.company.email} directly.
      </p>
    )
  }
  if (status === 'error') {
    return (
      <p className="form-notice form-notice--error" role="alert">
        We could not prepare that request. Please try again, email us directly, or use WhatsApp.
      </p>
    )
  }
  return null
}
