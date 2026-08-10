// ============================================================
// PK MEDIA OS — Documents (role-gated)
// Secure documents visible only to permitted roles.
// ============================================================
import { Card, CardHeader, Button, Badge, Table } from '../ui/kit'
import { useAuth } from '../auth/AuthContext'
import { getDocumentsFor } from '../services/dataService'
import { DocumentCategory } from '../data/types'

const CATEGORY_TONE: Record<string, 'teal' | 'orange' | 'green' | 'blue' | 'purple' | 'neutral'> = {
  Contract: 'teal', Invoice: 'orange', Proposal: 'blue', 'Campaign Asset': 'green', Report: 'purple', Client: 'neutral',
}

export default function Documents() {
  const { user } = useAuth()
  const docs = user ? getDocumentsFor(user.role) : []

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>Documents</h1><p>Role-gated files. You can only see documents your role can access.</p></div>
        <Button variant="primary">+ Upload</Button>
      </div>

      <Card>
        <CardHeader title="Secure Documents" subtitle={`${docs.length} accessible to your role`} />
        <Table columns={['Name', 'Category', 'Related', 'Size', 'Uploaded', '']}>
          {docs.map((d) => (
            <tr key={d.id}>
              <td><strong className="os-strong">{d.name}</strong></td>
              <td><Badge tone={CATEGORY_TONE[d.category] ?? 'neutral'}>{d.category}</Badge></td>
              <td>{d.brandId || d.campaignId || '—'}</td>
              <td>{d.size}</td>
              <td>{d.uploadedAt}</td>
              <td><Button size="sm" variant="ghost">Download</Button></td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}
