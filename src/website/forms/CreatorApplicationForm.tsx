import { FormEvent, useState } from 'react'
import { DeliveryStatus } from '../types/website.types'
import { Icon } from '../components/Icon'
import { FormField } from './FormField'
import { FormNotice } from './FormNotice'
import { deliverForm } from './formService'

export function CreatorApplicationForm() {
  const [form, setForm] = useState({
    name: '',
    instagram: '',
    youtube: '',
    tiktok: '',
    category: '',
    location: '',
    followers: '',
    averageViews: '',
    email: '',
    phone: '',
    portfolio: '',
    rateCard: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<DeliveryStatus>('idle')

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = 'Please add your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please enter a valid email address.'
    if (form.phone.replace(/\D/g, '').length < 7)
      next.phone = 'Please enter a valid phone number.'
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
        ['Name', form.name],
        ['Instagram', form.instagram],
        ['YouTube', form.youtube],
        ['TikTok', form.tiktok],
        ['Category / Niche', form.category],
        ['Location', form.location],
        ['Followers', form.followers],
        ['Average views', form.averageViews],
        ['Email', form.email],
        ['Phone', form.phone],
        ['Portfolio', form.portfolio],
        ['Rate card', form.rateCard],
      ])
      setStatus(result === 'endpoint' ? 'endpoint-success' : 'mailto-ready')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="creator-form" id="creator-application" noValidate onSubmit={handleSubmit}>
      <div className="creator-form__intro">
        <span>Creator application</span>
        <p>
          Share your details and we’ll have the right information if a relevant opportunity comes
          up.
        </p>
      </div>
      <div className="form-grid form-grid--creator">
        <FormField label="Name" required error={errors.name}>
          <input
            name="creator-name"
            autoComplete="name"
            value={form.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
        </FormField>
        <FormField label="Email" required error={errors.email}>
          <input
            name="creator-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
        </FormField>
        <FormField label="Phone" required error={errors.phone}>
          <input
            name="creator-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => update('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
          />
        </FormField>
        <FormField label="Category / Niche" required error={errors.category}>
          <input
            name="category"
            placeholder="e.g. Beauty, gaming, fitness"
            value={form.category}
            onChange={(event) => update('category', event.target.value)}
            aria-invalid={Boolean(errors.category)}
          />
        </FormField>
        <FormField label="Instagram">
          <input
            name="instagram"
            placeholder="@yourhandle"
            value={form.instagram}
            onChange={(event) => update('instagram', event.target.value)}
          />
        </FormField>
        <FormField label="YouTube">
          <input
            name="youtube"
            placeholder="Channel URL or handle"
            value={form.youtube}
            onChange={(event) => update('youtube', event.target.value)}
          />
        </FormField>
        <FormField label="TikTok">
          <input
            name="tiktok"
            placeholder="@yourhandle"
            value={form.tiktok}
            onChange={(event) => update('tiktok', event.target.value)}
          />
        </FormField>
        <FormField label="Location">
          <input
            name="location"
            autoComplete="address-level2"
            value={form.location}
            onChange={(event) => update('location', event.target.value)}
          />
        </FormField>
        <FormField label="Followers">
          <input
            name="followers"
            inputMode="numeric"
            placeholder="e.g. 10K"
            value={form.followers}
            onChange={(event) => update('followers', event.target.value)}
          />
        </FormField>
        <FormField label="Average Views">
          <input
            name="average-views"
            inputMode="numeric"
            placeholder="e.g. 8K"
            value={form.averageViews}
            onChange={(event) => update('averageViews', event.target.value)}
          />
        </FormField>
        <FormField label="Portfolio" hint="Optional">
          <input
            name="portfolio"
            type="url"
            placeholder="Link to your work"
            value={form.portfolio}
            onChange={(event) => update('portfolio', event.target.value)}
          />
        </FormField>
        <FormField label="Rate Card" hint="Optional">
          <input
            name="rate-card"
            type="url"
            placeholder="Link to rate card"
            value={form.rateCard}
            onChange={(event) => update('rateCard', event.target.value)}
          />
        </FormField>
      </div>
      <button
        className="button button--light creator-form__submit"
        type="submit"
        disabled={status === 'loading'}
      >
        {status === 'loading'
          ? 'Preparing your application…'
          : 'Join the PK Media Creator Network'}{' '}
        <span aria-hidden="true">
          <Icon name="arrowUpRight" size={17} />
        </span>
      </button>
      <FormNotice status={status} />
    </form>
  )
}
