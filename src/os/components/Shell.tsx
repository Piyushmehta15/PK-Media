// ============================================================
// PK MEDIA OS — App shell
// Responsive sidebar (collapses on mobile) + top nav with search,
// notifications, profile menu, and logout. Role-gated menu items.
// ============================================================
import { useState } from 'react'
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { Avatar } from '../ui/kit'
import { getNotificationsFor } from '../services/dataService'
import { Permission } from '../data/types'

interface NavItem {
  label: string
  to: string
  icon: string
  perm?: Permission
}

const NAV: NavItem[] = [
  { label: 'Dashboard', to: '/app/dashboard', icon: 'grid', perm: 'dashboard.view' },
  { label: 'Influencers', to: '/app/influencers', icon: 'users', perm: 'influencers.view' },
  { label: 'Brands', to: '/app/brands', icon: 'briefcase', perm: 'brands.view' },
  { label: 'Campaigns', to: '/app/campaigns', icon: 'rocket', perm: 'campaigns.view' },
  { label: 'Outreach', to: '/app/outreach', icon: 'send', perm: 'outreach.view' },
  { label: 'Proposals', to: '/app/proposals', icon: 'file', perm: 'proposals.view' },
  { label: 'Finance', to: '/app/finance', icon: 'wallet', perm: 'finance.view' },
  { label: 'Deliverables', to: '/app/deliverables', icon: 'check', perm: 'deliverables.view' },
  { label: 'Analytics', to: '/app/analytics', icon: 'chart', perm: 'analytics.view' },
  { label: 'AI Tools', to: '/app/ai', icon: 'spark', perm: 'campaigns.view' },
  { label: 'Documents', to: '/app/documents', icon: 'folder', perm: 'documents.view' },
  { label: 'Calendar', to: '/app/calendar', icon: 'calendar', perm: 'calendar.view' },
  { label: 'Team', to: '/app/team', icon: 'team', perm: 'team.view' },
  { label: 'Settings', to: '/app/settings', icon: 'gear', perm: 'settings.manage' },
]

function SideIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
    rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4z" /><path d="M22 2 11 13" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></>,
    wallet: <><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4z" /></>,
    check: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></>,
    chart: <><path d="M3 3v18h18" /><path d="M18 17V9M13 17V5M8 17v-3" /></>,
    spark: <><path d="M12 3v18M3 12h18" /></>,
    folder: <><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    team: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    gear: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  }
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

export function Shell() {
  const { user, can, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [query, setQuery] = useState('')

  const items = NAV.filter((n) => !n.perm || can(n.perm))
  const notifs = user ? getNotificationsFor(user.id) : []
  const unread = notifs.filter((n) => !n.read).length

  const handleLogout = async () => {
    await logout()
    navigate('/app/login')
  }

  return (
    <div className="os-shell">
      <aside className={`os-sidebar ${mobileOpen ? 'os-sidebar--open' : ''}`}>
        <div className="os-sidebar__brand">
          <img src="/brand/pk-media-logo.png" alt="PK Media" />
          <div><strong>PK MEDIA</strong><small>OS</small></div>
        </div>
        <nav className="os-sidebar__nav">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `os-nav-link ${isActive ? 'os-nav-link--active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <SideIcon name={item.icon} /><span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="os-sidebar__foot">
          <Link to="/" className="os-nav-link"><span className="os-back-icon">↩</span><span>Back to Website</span></Link>
        </div>
      </aside>

      {mobileOpen && <div className="os-mask" onClick={() => setMobileOpen(false)} />}

      <div className="os-main">
        <header className="os-topbar">
          <button className="os-hamburger" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
          <div className="os-search os-search--bar">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></svg>
            <input placeholder="Search campaigns, influencers, brands…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="os-topbar__actions">
            <div className="os-notif-wrap">
              <button className="os-icon-btn" onClick={() => { setNotifOpen((o) => !o); setProfileOpen(false) }} aria-label="Notifications">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                {unread > 0 && <span className="os-badge-dot">{unread}</span>}
              </button>
              {notifOpen && (
                <div className="os-popover os-notif">
                  <div className="os-popover__head"><strong>Notifications</strong><span>{unread} unread</span></div>
                  {notifs.slice(0, 5).map((n) => (
                    <div className={`os-notif__item ${!n.read ? 'os-notif__item--unread' : ''}`} key={n.id}>
                      <strong>{n.title}</strong>
                      <p>{n.message}</p>
                      <small>{new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="os-profile-wrap">
              <button className="os-profile-btn" onClick={() => { setProfileOpen((o) => !o); setNotifOpen(false) }}>
                <Avatar name={user?.name ?? '?'} color={user?.avatarColor} />
                <div className="os-profile-btn__text"><strong>{user?.name}</strong><small>{user?.role}</small></div>
              </button>
              {profileOpen && (
                <div className="os-popover os-profile-menu">
                  <div className="os-profile-menu__head"><Avatar name={user?.name ?? '?'} color={user?.avatarColor} /><div><strong>{user?.name}</strong><small>{user?.email}</small></div></div>
                  <Link to="/app/settings" onClick={() => setProfileOpen(false)}>Profile &amp; Settings</Link>
                  <button onClick={handleLogout}>Log out</button>
                </div>
              )}
            </div>
          </div>
        </header>
<main className="os-content"><Outlet /></main>
      </div>
    </div>
  )
}
