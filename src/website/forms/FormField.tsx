import { FormFieldProps } from '../types/website.types'

export function FormField({
  label,
  required,
  hint,
  error,
  extraClass = '',
  children,
}: FormFieldProps) {
  return (
    <label className={`form-field ${extraClass}`}>
      <span>
        {label}
        {required && <em>Required</em>}
        {hint && <em>{hint}</em>}
      </span>
      {children}
      {error && <small className="field-error">{error}</small>}
    </label>
  )
}
