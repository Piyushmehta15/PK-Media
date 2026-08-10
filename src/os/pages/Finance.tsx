// ============================================================
// PK MEDIA OS — Finance
// Profit Calculator, Invoice Generator, Payment Tracker, Contract
// Generator. INR default, currency-configurable.
// ============================================================
import { useMemo, useState } from 'react'
import { Card, CardHeader, Button, Badge, Table, Input, Select, statusTone } from '../ui/kit'
import { db } from '../data/mockDb'
import { getBrandById, fmtINR, getPaymentStatusSummary, getProfitBreakdown } from '../services/dataService'
import { validateFinancials } from '../security/validate'
import { recordAudit } from '../security/audit'
import { useAuth } from '../auth/AuthContext'

export default function Finance() {
  const { user } = useAuth()
  const pay = getPaymentStatusSummary()
  const breakdown = getProfitBreakdown()

  // Profit calculator state (client-side tool only).
  // SECURITY: financial totals shown here are for planning only and are
  // NEVER stored or trusted for billing. In production, revenue, costs,
  // invoices and profit are computed server-side from the database.
  const [revenue, setRevenue] = useState(250000)
  const [agencyFee, setAgencyFee] = useState(50000)
  const [influencerCost, setInfluencerCost] = useState(90000)
  const [editorCost, setEditorCost] = useState(20000)
  const [other, setOther] = useState(15000)
  const [finErrors, setFinErrors] = useState<Record<string, string>>({})
  const [audited, setAudited] = useState(false)

  const setNum = (field: string, value: number, setter: (n: number) => void) => {
    setter(value)
    setAudited(false)
    // Clear the error for this field immediately
    setFinErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const totalCost = influencerCost + editorCost + other
  const operatingProfit = agencyFee - totalCost
  const projectProfit = revenue - totalCost
  const margin = projectProfit > 0 ? Math.round((projectProfit / revenue) * 100) : 0

  const auditFinances = () => {
    const errors = validateFinancials([
      { field: 'revenue', value: revenue },
      { field: 'agencyFee', value: agencyFee },
      { field: 'influencerCost', value: influencerCost },
      { field: 'editorCost', value: editorCost },
      { field: 'other', value: other },
    ])
    setFinErrors(errors)
    if (Object.keys(errors).length === 0) {
      setAudited(true)
      recordAudit('finance.updated', user?.id ?? 'anonymous', 'profit calculator inputs validated')
    }
  }

  const totalExpenses = useMemo(() => db.expenses.reduce((s, e) => s + e.amount, 0), [])

  return (
    <div className="os-page">
      <div className="os-page__head">
        <div><h1>Finance</h1><p>Profit, invoices, payments and contracts — clear and connected.</p></div>
        <Button variant="primary">+ New Invoice</Button>
      </div>

      <div className="os-finance-grid os-finance-grid--4">
        <Card className="os-finance-card"><span>Invoiced</span><strong className="os-finance-card__value">{fmtINR(pay.totalInvoiced)}</strong><small>{pay.invoiceCount} invoices</small></Card>
        <Card className="os-finance-card os-finance-card--profit"><span>Received</span><strong className="os-finance-card__value">{fmtINR(pay.received)}</strong><small>{pay.paidCount} payments</small></Card>
        <Card className="os-finance-card os-finance-card--exp"><span>Outstanding</span><strong className="os-finance-card__value">{fmtINR(pay.outstanding)}</strong><small>to collect</small></Card>
        <Card className="os-finance-card"><span>Campaign Expenses</span><strong className="os-finance-card__value">{fmtINR(totalExpenses)}</strong><small>all categories</small></Card>
      </div>

      <div className="os-grid-2">
        <Card>
          <CardHeader title="Profit Calculator" subtitle="Live agency + project profitability" />
<div className="os-form-stack">
            <label className="os-field"><span>Project Revenue (₹)</span><Input type="number" value={revenue} onChange={(e) => setNum('revenue', +e.target.value, setRevenue)} />{finErrors.revenue && <small className="os-field-err">{finErrors.revenue}</small>}</label>
            <label className="os-field"><span>Agency Fee (₹)</span><Input type="number" value={agencyFee} onChange={(e) => setNum('agencyFee', +e.target.value, setAgencyFee)} />{finErrors.agencyFee && <small className="os-field-err">{finErrors.agencyFee}</small>}</label>
            <label className="os-field"><span>Influencer Cost (₹)</span><Input type="number" value={influencerCost} onChange={(e) => setNum('influencerCost', +e.target.value, setInfluencerCost)} />{finErrors.influencerCost && <small className="os-field-err">{finErrors.influencerCost}</small>}</label>
            <label className="os-field"><span>Editor Cost (₹)</span><Input type="number" value={editorCost} onChange={(e) => setNum('editorCost', +e.target.value, setEditorCost)} />{finErrors.editorCost && <small className="os-field-err">{finErrors.editorCost}</small>}</label>
            <label className="os-field"><span>Other Expenses (₹)</span><Input type="number" value={other} onChange={(e) => setNum('other', +e.target.value, setOther)} />{finErrors.other && <small className="os-field-err">{finErrors.other}</small>}</label>
            <Button variant="secondary" onClick={auditFinances}>Validate Inputs</Button>
            {audited && <p className="os-field-ok">All inputs are valid non-negative numbers.</p>}
            <div className="os-profit-result">
              <div><span>Total Cost</span><strong>{fmtINR(totalCost)}</strong></div>
              <div><span>Operating Profit</span><strong>{fmtINR(operatingProfit)}</strong></div>
              <div><span>Project Profit</span><strong className="os-text-green">{fmtINR(projectProfit)}</strong></div>
              <div><span>Margin</span><strong>{margin}%</strong></div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Expense Breakdown" subtitle="Where the money goes across campaigns" />
          <div className="os-expense-breakdown">
            {Object.entries(breakdown).map(([cat, amt]) => (
              <div className="os-expense-row" key={cat}>
                <span>{cat}</span>
                <div className="os-expense-bar"><div style={{ width: `${Math.min(100, (amt / Math.max(1, totalExpenses)) * 100)}%` }} /></div>
                <strong>{fmtINR(amt)}</strong>
              </div>
            ))}
          </div>
          <div className="os-mt">
            <CardHeader title="Contract Generator" subtitle="Create agreements from campaigns" />
            <Table columns={['Contract', 'Brand', 'Status', 'Created']}>
              {db.contracts.map((c) => (
                <tr key={c.id}>
                  <td><strong className="os-strong">{c.title}</strong></td>
                  <td>{getBrandById(c.brandId)?.name}</td>
                  <td><Badge tone={statusTone(c.status)}>{c.status}</Badge></td>
                  <td>{c.createdAt}</td>
                </tr>
              ))}
            </Table>
          </div>
        </Card>
      </div>

      <div className="os-grid-2">
        <Card>
          <CardHeader title="Invoice Generator" subtitle="Issue and track invoices" />
          <Table columns={['Invoice', 'Brand', 'Amount', 'Status', 'Due']}>
            {db.invoices.map((i) => (
              <tr key={i.id}>
                <td><strong className="os-strong">{i.number}</strong></td>
                <td>{getBrandById(i.brandId)?.name}</td>
                <td>{fmtINR(i.amount)}</td>
                <td><Badge tone={statusTone(i.status)}>{i.status}</Badge></td>
                <td>{i.dueAt}</td>
              </tr>
            ))}
          </Table>
        </Card>

        <Card>
          <CardHeader title="Payment Tracker" subtitle="Received payments and methods" />
          <Table columns={['Invoice', 'Amount', 'Method', 'Status', 'Received']}>
            {db.payments.map((p) => (
              <tr key={p.id}>
                <td><strong className="os-strong">{db.invoices.find((i) => i.id === p.invoiceId)?.number}</strong></td>
                <td>{fmtINR(p.amount)}</td>
                <td>{p.method}</td>
                <td><Badge tone={statusTone(p.status)}>{p.status}</Badge></td>
                <td>{p.receivedAt}</td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>
    </div>
  )
}
