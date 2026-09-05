import { useMemo, useState } from 'react'
import { site } from '../../config/site'
import { Icon } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'

export function GrowthPlanBuilder({
  onRequestProposal,
}: {
  onRequestProposal: (summary: string) => void
}) {
  const [selected, setSelected] = useState<Record<string, string[]>>({})
  const selectionCount = Object.values(selected).flat().length

  const toggleOption = (groupId: string, option: string, multi: boolean) => {
    setSelected((current) => {
      const previous = current[groupId] ?? []
      if (!multi) return { ...current, [groupId]: previous.includes(option) ? [] : [option] }
      return {
        ...current,
        [groupId]: previous.includes(option)
          ? previous.filter((value) => value !== option)
          : [...previous, option],
      }
    })
  }

  const summary = useMemo(
    () =>
      site.growthPlanBuilder.groups
        .map((group) => {
          const choices = selected[group.id] ?? []
          return choices.length ? `${group.label}: ${choices.join(', ')}` : ''
        })
        .filter(Boolean)
        .join('\n'),
    [selected],
  )

  return (
    <section className="section section--plan" id="growth-plan">
      <div className="shell plan-layout">
        <div className="plan-copy">
          <SectionHeading
            eyebrow={site.growthPlanBuilder.eyebrow}
            title={site.growthPlanBuilder.title}
            description={site.growthPlanBuilder.description}
          />
          <div className="plan-summary-card" data-reveal>
            <div>
              <span>Your selected building blocks</span>
              <b>{selectionCount ? `${selectionCount} selected` : 'Nothing selected yet'}</b>
            </div>
            <p>
              {selectionCount
                ? 'Your choices will be included with your proposal request.'
                : 'Select the areas you want to explore — we will not generate an automatic quote.'}
            </p>
          </div>
        </div>
        <div className="plan-builder" data-reveal>
          {site.growthPlanBuilder.groups.map((group) => (
            <fieldset className="plan-builder__group" key={group.id}>
              <legend>
                {group.label}
                <small>{group.multi ? 'Choose any that apply' : 'Choose one option'}</small>
              </legend>
              <div className="plan-options">
                {group.options.map((option) => {
                  const isSelected = (selected[group.id] ?? []).includes(option)
                  return (
                    <button
                      type="button"
                      className={`plan-option ${isSelected ? 'plan-option--selected' : ''}`}
                      aria-pressed={isSelected}
                      key={option}
                      onClick={() => toggleOption(group.id, option, group.multi)}
                    >
                      <span aria-hidden="true">
                        {isSelected ? (
                          <Icon name="check" size={14} />
                        ) : (
                          <Icon name="plus" size={14} />
                        )}
                      </span>
                      {option}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ))}
          <button
            type="button"
            className="button button--primary plan-builder__cta"
            disabled={!selectionCount}
            onClick={() => onRequestProposal(summary)}
          >
            Request Custom Proposal{' '}
            <span aria-hidden="true">
              <Icon name="arrowUpRight" size={18} />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
