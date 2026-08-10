// ============================================================
// PK MEDIA OS — Reset password
// Reached at /app/reset-password via the Supabase recovery link.
// Lets the user set a new password (Supabase Auth updates the session).
// ============================================================
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function ResetPassword() {
  const { updatePassword } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirm) { setError('Passwords do not match.'); return }
    setBusy(true)
    const res = await updatePassword(password)
    setBusy(false)
    if (res.ok) {
      navigate('/app/dashboard')
    } else {
      setError(res.error ?? 'Unable to update password.')
    }
  }

  return (
    <div className="os-login">
      <div className="os-login__card">
        <div className="os-login__brand">
          <img src="/brand/pk-media-logo.png" alt="PK Media" />
          <h1>Reset Password</h1>
          <p>Choose a new password for your account</p>
        </div>
        <form onSubmit={submit} className="os-login__form">
          <label className="os-field"><span>New password</span>
            <input className="os-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" required />
          </label>
          <label className="os-field"><span>Confirm password</span>
            <input className="os-input" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat password" required />
          </label>
          {error && <p className="os-login__error">{error}</p>}
          <button className="os-btn os-btn--primary os-btn--md" type="submit" disabled={busy}>{busy ? 'Updating…' : 'Update password'}</button>
        </form>
        <Link to="/app/login" className="os-login__back">← Back to login</Link>
      </div>
    </div>
  )
}
