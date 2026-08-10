// ============================================================
// PK MEDIA OS — Calendar
// Meetings, reviews, standups and client calls.
// ============================================================
import { Card, CardHeader, Button, Badge, Table } from '../ui/kit'
import { db } from '../data/mockDb'
import { getMeetingAttendees } from '../services/dataService'

const TYPE_TONE: Record<string, 'teal' | 'orange' | 'green' | 'blue' | 'purple'> = {
  Discovery: 'teal', Review: 'orange', Standup: 'green', Client: 'blue', Internal: 'purple',
}

export default function Calendar() {
  const meetings = db.meetings.map((m) => ({
    ...m,
    attendees: getMeetingAttendees(m.attendees),
  }))

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>Calendar</h1><p>Upcoming meetings, reviews and client calls.</p></div>
        <Button variant="primary">+ Schedule Meeting</Button>
      </div>

      <Card>
        <CardHeader title="Upcoming Meetings" subtitle={`${meetings.length} scheduled`} />
        <Table columns={['Meeting', 'Type', 'Date', 'Attendees', '']}>
          {meetings.map((m) => (
            <tr key={m.id}>
              <td><strong className="os-strong">{m.title}</strong></td>
              <td><Badge tone={TYPE_TONE[m.type] ?? 'neutral'}>{m.type}</Badge></td>
              <td>{new Date(m.date).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
              <td><div className="os-avatar-stack">{m.attendees.map((a) => <span key={a.id} className="os-avatar" style={{ background: a.avatarColor }} title={a.name}>{a.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}</span>)}</div></td>
              <td><Button size="sm" variant="ghost">Open</Button></td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}
