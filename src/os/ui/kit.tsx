// ============================================================
// PK MEDIA OS — Reusable UI kit
// Premium SaaS components matching PK Media branding.
// ============================================================
import { ReactNode } from 'react'

export function Card({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`os-card ${className}`} style={style}>{children}</div>
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="os-card-header">
      <div>
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <div className="os-card-header__action">{action}</div>}
    </div>
  )
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'teal' | 'orange' | 'green' | 'red' | 'neutral' | 'blue' | 'purple' }) {
  return <span className={`os-badge os-badge--${tone}`}>{children}</span>
}

export function StatCard({ label, value, hint, tone = 'teal', icon }: { label: string; value: string; hint?: string; tone?: 'teal' | 'orange' | 'green' | 'ink' | 'blue'; icon?: ReactNode }) {
  return (
    <Card className={`os-stat os-stat--${tone}`}>
      <div className="os-stat__icon">{icon}</div>
      <div className="os-stat__body">
        <span className="os-stat__label">{label}</span>
        <strong className="os-stat__value">{value}</strong>
        {hint && <small className="os-stat__hint">{hint}</small>}
      </div>
    </Card>
  )
}

export function Button({ children, variant = 'primary', size = 'md', className = '', disabled, onClick, type = 'button' }: {
  children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; size?: 'sm' | 'md'; className?: string; disabled?: boolean; onClick?: () => void; type?: 'button' | 'submit'
}) {
  return (
    <button type={type} className={`os-btn os-btn--${variant} os-btn--${size} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export function Table({ columns, children }: { columns: string[]; children: ReactNode }) {
  return (
    <div className="os-table-wrap">
      <table className="os-table">
        <thead><tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function Modal({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: ReactNode }) {
  if (!open) return null
  return (
    <div className="os-modal-overlay" onClick={onClose}>
      <div className="os-modal" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="os-modal__head"><h3>{title}</h3><button className="os-modal__close" onClick={onClose}>×</button></div>
        <div className="os-modal__body">{children}</div>
      </div>
    </div>
  )
}

export function Avatar({ name, color }: { name: string; color?: string }) {
  const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
  return <span className="os-avatar" style={color ? { background: color } : undefined}>{initials}</span>
}

export function Progress({ value, tone = 'teal' }: { value: number; tone?: 'teal' | 'orange' }) {
  return (
    <div className="os-progress">
      <div className={`os-progress__fill os-progress__fill--${tone}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}

export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="os-empty">
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  )
}

export function SearchInput({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="os-search">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></svg>
      <input type="search" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

export function FormRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="os-field">
      <span>{label}</span>
      {children}
    </label>
  )
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`os-input ${props.className ?? ''}`} />
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`os-input ${props.className ?? ''}`} />
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`os-input ${props.className ?? ''}`} />
}

export function statusTone(status: string): 'teal' | 'orange' | 'green' | 'red' | 'neutral' | 'blue' | 'purple' {
  const s = status.toLowerCase()
  if (['live', 'active', 'confirmed', 'completed', 'paid', 'received', 'approved', 'signed', 'accepted', 'done'].includes(s)) return 'green'
  if (['planning', 'draft', 'new', 'pending', 'contacted', 'sent'].includes(s)) return 'neutral'
  if (['negotiation', 'in progress', 'replied', 'partial', 'outreach', 'approval'].includes(s)) return 'orange'
  if (['cancelled', 'rejected', 'overdue', 'declined'].includes(s)) return 'red'
  if (['content', 'live campaign', 'submitted'].includes(s)) return 'blue'
  return 'neutral'
}
