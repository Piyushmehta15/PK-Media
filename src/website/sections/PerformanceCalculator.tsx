import { useState } from 'react'
import { Icon } from '../components/Icon'

export function PerformanceCalculator({
  onRequestPackage,
}: {
  onRequestPackage: (details: string) => void
}) {
  const [budget, setBudget] = useState<number>(50000)
  const [cpm, setCpm] = useState<number>(50)

  const targetViews = Math.round((budget / Math.max(1, cpm)) * 1000)

  return (
    <div className="perf-calculator-card" data-reveal>
      <div className="perf-calculator-card__head">
        <span className="perf-calculator-badge">Views Estimator</span>
        <h4>Interactive View Target Calculator</h4>
        <p>Estimate your guaranteed views based on your custom campaign budget and target CPM.</p>
      </div>
      <div className="perf-calculator-inputs">
        <div className="perf-calc-field">
          <label htmlFor="calc-budget">Campaign Budget (₹)</label>
          <input
            id="calc-budget"
            type="number"
            min="10000"
            step="5000"
            value={budget}
            onChange={(e) => setBudget(Math.max(0, parseInt(e.target.value) || 0))}
          />
          <span className="perf-calc-field__hint">Suggested minimum: ₹25,000</span>
        </div>
        <div className="perf-calc-field">
          <label htmlFor="calc-cpm">Agreed CPM (₹)</label>
          <input
            id="calc-cpm"
            type="number"
            min="10"
            step="5"
            value={cpm}
            onChange={(e) => setCpm(Math.max(1, parseInt(e.target.value) || 1))}
          />
          <span className="perf-calc-field__hint">Cost per 1,000 views (depends on niche)</span>
        </div>
      </div>
      <div className="perf-calculator-output">
        <small>Estimated View Target</small>
        <strong>{targetViews.toLocaleString('en-IN')} views</strong>
        <p className="perf-calc-formula">
          Formula: Budget (₹{budget.toLocaleString('en-IN')}) ÷ CPM (₹{cpm}) × 1,000
        </p>
      </div>
      <button
        type="button"
        className="button button--primary perf-calculator__btn"
        onClick={() =>
          onRequestPackage(
            `Custom Campaign - Budget: ₹${budget.toLocaleString('en-IN')}, CPM: ₹${cpm}`,
          )
        }
      >
        Lock in View Target{' '}
        <span aria-hidden="true">
          <Icon name="arrowUpRight" size={16} />
        </span>
      </button>
    </div>
  )
}
