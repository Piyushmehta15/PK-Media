import { ReactNode } from 'react'

export type IconName =
  | 'arrow'
  | 'arrowUpRight'
  | 'check'
  | 'chart'
  | 'creator'
  | 'distribution'
  | 'mail'
  | 'menu'
  | 'network'
  | 'play'
  | 'plus'
  | 'send'
  | 'social'
  | 'spark'
  | 'whatsapp'
  | 'x'

export type DeliveryResult = 'endpoint' | 'mailto'
export type DeliveryStatus = 'idle' | 'loading' | 'endpoint-success' | 'mailto-ready' | 'error'

export interface Package {
  readonly id: string
  readonly name: string
  readonly price: string
  readonly cadence: string
  readonly priceLabel: string
  readonly purpose: string
  readonly includes: readonly string[]
  readonly fullScope: readonly string[]
  readonly whatWeHandle: string
  readonly clientProvides: readonly string[]
  readonly notIncluded: readonly string[]
  readonly scopeNote: string
  readonly cta: string
  readonly bestFor?: string
  readonly badge?: string
  readonly note?: string
  readonly priceHint?: string
}

export interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  dark?: boolean
}

export interface FormFieldProps {
  label: string
  required?: boolean
  hint?: string
  error?: string
  extraClass?: string
  children: ReactNode
}
