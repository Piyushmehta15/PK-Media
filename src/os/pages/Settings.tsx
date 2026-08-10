// ============================================================
// PK MEDIA OS — Settings
// Team & roles, permissions matrix, company profile, integrations.
// ============================================================
import { Card, CardHeader, Button, Badge, Table, Avatar } from '../ui/kit'
import { db } from '../data/mockDb'
import { useAuth } from '../auth/AuthContext'
import { ROLE_PERMISSIONS } from '../auth/permissions'
import { Permission, Role } from '../data/types'
import { site } from '../../config/site'

const ROLE_LABELS: Record<Role, string> = {
  ADMIN: 'Owner',
  MANAGER: 'Manager',
  OUTREACH: 'Outreach',
  EDITOR: 'Editor',
  FINANCE: 'Finance',
  CLIENT: 'Client',
}

const PERMISSION_LABELS: { key: Permission; label: string }[] = [
  { key: 'dashboard.view', label: 'Dashboard' },
  { key: 'influencers.manage', label: 'Manage Influencers' },
  { key: 'brands.manage', label: 'Manage Brands' },
  { key: 'campaigns.manage', label: 'Manage Campaigns' },
  { key: 'outreach.manage', label: 'Manage Outreach' },
  { key: 'proposals.manage', label: 'Manage Proposals' },
  { key: 'analytics.view', label: 'View Analytics' },
  { key: 'finance.manage', label: 'Manage Finance' },
  { key: 'contracts.manage', label: 'Manage Contracts' },
  { key: 'deliverables.manage', label: 'Manage Deliverables' },
  { key: 'team.view', label: 'View Team' },
  { key: 'documents.manage', label: 'Manage Documents' },
  { key: 'calendar.view', label: 'Calendar' },
  { key: 'settings.manage', label: 'Manage Settings' },
]

const ROLES: Role[] = ['ADMIN', 'MANAGER', 'OUTREACH', 'EDITOR', 'FINANCE', 'CLIENT']

export default function Settings() {
  const { user } = useAuth()
  const isOwner = user?.role === 'ADMIN'

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>Settings</h1><p>Team, roles, permissions and company configuration.</p></div>
        {isOwner && <Button variant="primary">Invite Team Member</Button>}
      </div>

      {!isOwner && (
        <Card><div className="os-note">You have view access. Only the account owner can manage team roles and permissions.</div></Card>
      )}

      <div className="os-grid-2">
        <Card>
          <CardHeader title="Team & Roles" subtitle={`${db.users.length} members on this workspace`} />
          <Table columns={['Member', 'Role', '']}>
            {db.users.map((u) => (
              <tr key={u.id}>
                <td><div className="os-person"><Avatar name={u.name} color={u.avatarColor} /><div><strong className="os-strong">{u.name}</strong><small>{u.email}</small></div></div></td>
                <td><Badge tone={u.role === 'ADMIN' ? 'teal' : 'blue'}>{ROLE_LABELS[u.role]}</Badge></td>
                <td>{u.id === user?.id ? <span className="os-you">You</span> : isOwner ? <Button size="sm" variant="ghost">Edit</Button> : null}</td>
              </tr>
            ))}
          </Table>
        </Card>

        <Card>
          <CardHeader title="Company Profile" subtitle="Editable from src/config/site.ts" />
          <div className="os-company">
            <div className="os-company__logo"><img src={site.company.assets.logo} alt="PK Media" /></div>
            <div className="os-company__row"><span>Company</span><strong>{site.company.name}</strong></div>
            <div className="os-company__row"><span>Founder</span><strong>{site.company.founder}</strong></div>
            <div className="os-company__row"><span>Email</span><strong>{site.company.email}</strong></div>
            <div className="os-company__row"><span>WhatsApp</span><strong>{site.company.phoneDisplay}</strong></div>
            <div className="os-company__row"><span>Tagline</span><strong>{site.company.tagline}</strong></div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Permissions Matrix" subtitle="What each role can access in the OS" />
        <Table columns={['Capability', 'Owner', 'Manager', 'Outreach', 'Editor', 'Finance', 'Client']}>
          {PERMISSION_LABELS.map((p) => (
            <tr key={p.key}>
              <td><strong className="os-strong">{p.label}</strong></td>
              {ROLES.map((role) => (
                <td key={role}>{ROLE_PERMISSIONS[role].includes(p.key) ? '✓' : '—'}</td>
              ))}
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}
