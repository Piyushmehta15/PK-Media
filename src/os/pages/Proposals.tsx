// ============================================================
// PK MEDIA OS — Proposal Generator
// ============================================================
import { Card, CardHeader, Button, Badge, Table } from '../ui/kit'
import { db } from '../data/mockDb'
import { getBrandById, fmtINR } from '../services/dataService'
import { statusTone } from '../ui/kit'

export default function Proposals() {
  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>Proposals</h1><p>Create, send and track client proposals.</p></div>
        <Button variant="primary">+ New Proposal</Button>
      </div>

<Card>
        <CardHeader title="All Proposals" subtitle="Convert conversations into signed scopes" />
        <Table columns={['Proposal', 'Brand', 'Amount', 'Status', 'Created', '']}>
          {db.proposals.map((p) => (
            <tr key={p.id}>
              <td><strong className="os-strong">{p.title}</strong></td>
              <td>{getBrandById(p.brandId)?.name}</td>
              <td>{fmtINR(p.amount)}</td>
              <td><Badge tone={statusTone(p.status)}>{p.status}</Badge></td>
              <td>{p.createdAt}</td>
              <td><Button size="sm" variant="ghost">Open</Button></td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}
