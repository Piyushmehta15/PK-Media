import { FormEvent, useState } from 'react'
import { site } from '../../config/site'
import { DeliveryStatus } from '../types/website.types'
import { Icon } from '../components/Icon'
import { FormField } from './FormField'
import { FormNotice } from './FormNotice'
import { deliverForm } from './formService'

export function BrandLeadForm({ context }: { context: string }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    website: '',
    industry: '',
    budget: '',
    message: '',
    services: [] as string[],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<DeliveryStatus>('idle')

  const update = (field: keyof typeof form, value: string | string[]) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const toggleService = (service: string) => {
    const next = form.services.includes(service)
      ? form.services.filter((item) => item !== service)
      : [...form.services, service]
    update('services', next)
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = 'Please add your name.'
    if (!form.company.trim()) next.company = 'Please add your company name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please enter a valid email address.'
    if (form.whatsapp.replace(/\D/g, '').length < 7)
      next.whatsapp = 'Please enter a valid WhatsApp number.'
    if (!form.budget) next.budget = 'Please select a monthly budget range.'
    if (!form.services.length && !context)
      next.services = 'Choose at least one service you are interested in.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const result = await deliverForm('Brand strategy call request', [
        ['Name', form.name],
        ['Company', form.company],
        ['Email', form.email],
        ['WhatsApp', form.whatsapp],
        ['Website', form.website],
        ['Industry', form.industry],
        ['Monthly marketing budget', form.budget],
        ['Services interested in', form.services.join(', ')],
        ['Request context / growth plan', context],
        ['Message', form.message],
      ])
      setStatus(result === 'endpoint' ? 'endpoint-success' : 'mailto-ready')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="lead-form" noValidate onSubmit={handleSubmit}>
      {context && (
        <div className="form-context">
          <span aria-hidden="true">
            <Icon name="spark" size={16} />
          </span>
          <p>
            <b>Request included</b>
            {context}
          </p>
        </div>
      )}
      <div className="form-grid">
        <FormField label="Name" required error={errors.name}>
          <input
            id="lead-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
        </FormField>
        <FormField label="Company" required error={errors.company}>
          <input
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={(event) => update('company', event.target.value)}
            aria-invalid={Boolean(errors.company)}
          />
        </FormField>
        <FormField label="Email" required error={errors.email}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
        </FormField>
        <FormField label="WhatsApp" required error={errors.whatsapp}>
          <input
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={form.whatsapp}
            onChange={(event) => update('whatsapp', event.target.value)}
            aria-invalid={Boolean(errors.whatsapp)}
          />
        </FormField>
        <FormField label="Website" hint="Optional">
          <input
            name="website"
            type="url"
            placeholder="https://"
            value={form.website}
            onChange={(event) => update('website', event.target.value)}
          />
        </FormField>
        <FormField label="Industry">
          <select
            name="industry"
            value={form.industry}
            onChange={(event) => update('industry', event.target.value)}
          >
            <option value="">Select an industry</option>
            {site.forms.industries.map((industry) => (
              <option value={industry} key={industry}>
                {industry}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Monthly Marketing Budget" required error={errors.budget}>
          <select
            name="budget"
            value={form.budget}
            onChange={(event) => update('budget', event.target.value)}
            aria-invalid={Boolean(errors.budget)}
          >
            <option value="">Select a range</option>
            {site.forms.brandBudgets.map((budget) => (
              <option value={budget} key={budget}>
                {budget}
              </option>
            ))}
          </select>
        </FormField>
        <fieldset className="form-field form-field--services">
          <legend>
            Services Interested In <span>Required</span>
          </legend>
          <div className="form-choices">
            {site.forms.serviceOptions.map((service) => (
              <label
                className={`form-choice ${form.services.includes(service) ? 'form-choice--checked' : ''}`}
                key={service}
              >
                <input
                  type="checkbox"
                  checked={form.services.includes(service)}
                  onChange={() => toggleService(service)}
                />
                <span aria-hidden="true">
                  <Icon name="check" size={12} />
                </span>
                {service}
              </label>
            ))}
          </div>
          {errors.services && <small className="field-error">{errors.services}</small>}
        </fieldset>
        <FormField label="Message" extraClass="form-field--full">
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us a little about the growth challenge you want to solve."
            value={form.message}
            onChange={(event) => update('message', event.target.value)}
          />
        </FormField>
      </div>
      <button
        className="button button--primary form-submit"
        type="submit"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Preparing your request…' : 'Request a Free Strategy Call'}{' '}
        <span aria-hidden="true">
          <Icon name="send" size={17} />
        </span>
      </button>
      <FormNotice status={status} />
    </form>
  )
}
