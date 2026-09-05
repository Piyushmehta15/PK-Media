import { site } from '../../config/site'
import { DeliveryResult } from '../types/website.types'

export async function deliverForm(
  kind: string,
  entries: Array<[string, string]>,
): Promise<DeliveryResult> {
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
