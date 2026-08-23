// ============================================================
// PK MEDIA OS — Login
// Production: Supabase Auth (email/password + password reset).
// Development: mock demo accounts (clearly labeled DEVELOPMENT ONLY).
// The mode is controlled by environment config, not application code.
// ============================================================
import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../auth/AuthContext'

const DEMO_ACCOUNTS = [
  { email: 'admin@pkmedia.in', role: 'ADMIN' },
  { email: 'manager@pkmedia.in', role: 'MANAGER' },
  { email: 'outreach@pkmedia.in', role: 'OUTREACH' },
  { email: 'editor@pkmedia.in', role: 'EDITOR' },
  { email: 'finance@pkmedia.in', role: 'FINANCE' },
  { email: 'client@pkmedia.in', role: 'CLIENT' },
]

export default function Login() {
  const { user, loading, login, requestPasswordReset } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const supabaseMode = isSupabaseConfigured

  // A refresh can land on /app/login before AuthProvider finishes restoring a
  // persisted session. Once hydration completes, return valid users to the OS.
  if (!loading && user) return <Navigate to="/app/dashboard" replace />

  const submit = async (e: React.FormEvent, demoEmail?: string) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    const value = demoEmail ?? email
    const res = await login(value, password)
    setBusy(false)
    if (res.ok) {
      console.log('[AUTH DEBUG] 11. Redirecting to dashboard')
      navigate('/app/dashboard')
    } else {
      setError(res.error ?? (supabaseMode ? 'Invalid email or password.' : 'Invalid credentials. Use one of the demo accounts below.'))
    }
  }

  const handleReset = async () => {
    if (!email.trim()) { setError('Enter your email to reset your password.'); return }
    setError('')
    setBusy(true)
    const res = await requestPasswordReset(email.trim())
    setBusy(false)
    if (res.ok) setResetSent(true)
    else setError(res.error ?? 'Password reset request failed.')
  }

  return (
    <div className="os-login">
      <div className="os-login__card">
        <div className="os-login__brand">
          <img src="/brand/pk-media-logo.png" alt="PK Media" />
          <h1>PK MEDIA OS</h1>
          <p>Creator-led growth operating system</p>
        </div>

        {!supabaseMode && (
          <div className="os-login__devbadge">DEVELOPMENT MODE — using mock data &amp; demo accounts</div>
        )}

        <form onSubmit={submit} className="os-login__form">
          <label className="os-field"><span>Email</span>
            <input className="os-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@pkmedia.in" required />
          </label>
          <label className="os-field"><span>Password</span>
            <input className="os-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </label>
          {error && <p className="os-login__error">{error}</p>}
          {resetSent && <p className="os-login__success">Password reset link sent. Check your inbox.</p>}
          <button className="os-btn os-btn--primary os-btn--md" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
        </form>

        {supabaseMode && (
          <div className="os-login__reset">
            <button className="os-login__reset-btn" onClick={handleReset} disabled={busy}>Forgot password?</button>
          </div>
        )}

        {!supabaseMode && (
          <div className="os-login__demo">
            <span>Demo accounts</span>
            <div className="os-login__demo-grid">
              {DEMO_ACCOUNTS.map((a) => (
                <button key={a.email} onClick={(e) => submit(e, a.email)} className="os-demo-chip">
                  <strong>{a.role}</strong><small>{a.email}</small>
                </button>
              ))}
            </div>
          </div>
        )}
        <Link to="/" className="os-login__back">← Back to public website</Link>
      </div>
    </div>
  )
}
