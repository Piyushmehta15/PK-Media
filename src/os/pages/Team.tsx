// ============================================================
// PK MEDIA OS — Team
// ============================================================
import { Card, CardHeader, Button, Badge, Table, Avatar } from '../ui/kit'
import { db } from '../data/mockDb'
import { Role } from '../data/types'

const ROLE_LABELS: Record<Role, string> = {
  ADMIN: 'Owner', MANAGER: 'Manager', OUTREACH: 'Outreach', EDITOR: 'Editor', FINANCE: 'Finance', CLIENT: 'Client',
}

export default function Team() {
  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>Team</h1><p>{db.users.length} members powering PK Media operations.</p></div>
        <Button variant="primary">Invite Member</Button>
      </div>

      <Card>
        <CardHeader title="Team Members" subtitle="Roles and access across the OS" />
        <Table columns={['Member', 'Email', 'Role', 'Status', 'Joined', '']}>
          {db.users.map((u) => (
            <tr key={u.id}>
              <td><div className="os-person"><Avatar name={u.name} color={u.avatarColor} /><div><strong className="os-strong">{u.name}</strong></div></div></td>
              <td>{u.email}</td>
              <td><Badge tone={u.role === 'ADMIN' ? 'teal' : 'blue'}>{ROLE_LABELS[u.role]}</Badge></td>
              <td><Badge tone={u.active ? 'green' : 'neutral'}>{u.active ? 'Active' : 'Inactive'}</Badge></td>
              <td>{u.createdAt}</td>
              <td><Button size="sm" variant="ghost">View</Button></td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}
