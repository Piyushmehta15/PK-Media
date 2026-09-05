export const serviceLinks: Record<string, string> = {
  'influencer-marketing': '#creator-campaigns',
  'ugc-creator-content': '#creator-campaigns',
  'social-media-management': '#social-management',
  'content-distribution': '#content-distribution',
  'creator-management': '#creator-campaigns',
  'analytics-growth-strategy': '#analytics',
}

export const moveTo = (target: string) => {
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
