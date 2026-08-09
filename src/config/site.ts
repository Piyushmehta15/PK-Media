/**
 * PK Media content source of truth.
 * Update company details, social links, services, package prices, and form behavior here.
 */
export const site = {
  company: {
    name: 'PK MEDIA',
    founder: 'Piyush Mehta',
    tagline: 'Grow organically, shine globally',
    email: 'pkmedia.in@gmail.com',
    phoneDisplay: '+91 70659 69643',
    whatsappNumber: '917065969643',
    whatsappMessage:
      "Hi PK Media, I'm interested in discussing a growth campaign for my brand.",
    website: '',
    address: '',
assets: {
      logo: '/brand/pk-media-logo.png',
      seal: '/brand/pk-media-seal.jpg',
    },
  },

  brand: {
    teal: '#00A7C0',
    tealDeep: '#007F94',
    orange: '#FF8A23',
    ink: '#0B171B',
    canvas: '#F7FBFC',
  },

  seo: {
    title: 'PK Media — Creator-Led Growth Agency',
    description:
      'PK Media helps brands turn attention into growth through creator partnerships, content systems, and distribution.',
  },

  social: {
    instagram: 'https://www.instagram.com/pkmedia____/',
    linkedin: 'https://www.linkedin.com/company/pkmediaagency',
    x: 'https://x.com/PKMediaAgency',
  },

  // Optional: add a hosted form/API endpoint here when one is available. Leaving it blank uses a transparent mailto fallback.
  formEndpoint: '',

  navigation: [
    { label: 'Services', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    eyebrow: 'Creator-led growth partner',
    title: 'Turn Attention Into Growth.',
    description:
      'PK Media helps brands grow through creators, content, and distribution — combining influencer marketing, UGC, social media, and content systems into one growth partner.',
    trustStatement: 'Creators × Content × Distribution × Growth',
  },

  problem: {
    eyebrow: 'The growth gap',
    title: "Your brand doesn't need more random marketing.",
    description:
      'It needs a connected system that turns good ideas into consistent, measurable momentum.',
    problems: [
      'Inconsistent content',
      'Difficult creator discovery',
      'Poor campaign coordination',
      'Low social media consistency',
      'Content created but never distributed',
      'No clear campaign analytics',
      'Multiple freelancers or agencies for different tasks',
    ],
    solution:
      'PK Media brings creators, content, distribution, strategy, and reporting into one focused growth partnership.',
  },

  services: [
    {
      id: 'influencer-marketing',
      order: '01',
      title: 'Influencer Marketing',
      summary:
        'Creator campaigns designed around relevance, a clear brief, and disciplined execution.',
      deliverables: ['Campaign strategy', 'Creator discovery', 'Shortlisting & negotiation', 'Campaign reporting'],
      icon: 'creator',
      featured: true,
    },
    {
      id: 'ugc-creator-content',
      order: '02',
      title: 'UGC & Creator Content',
      summary:
        'Native-feeling content that makes a product easier to understand, trust, and share.',
      deliverables: ['UGC concepts', 'Creator briefs', 'Raw & edited assets', 'Content usage planning'],
      icon: 'spark',
      featured: true,
    },
    {
      id: 'social-media-management',
      order: '03',
      title: 'Social Media Management',
      summary:
        'A dependable social presence built with a strategy, calendar, content, and community rhythm.',
      deliverables: ['Content strategy', 'Calendar & publishing', 'Captions & community', 'Monthly analytics'],
      icon: 'social',
      featured: false,
    },
    {
      id: 'content-distribution',
      order: '04',
      title: 'Content Distribution',
      summary:
        'Turn one strong idea into a system of platform-ready content with a longer working life.',
      deliverables: ['Repurposing plan', 'Short-form clipping', 'Platform formatting', 'Distribution tracking'],
      icon: 'distribution',
      featured: true,
    },
    {
      id: 'creator-management',
      order: '05',
      title: 'Creator Management',
      summary:
        'Clear coordination for creators, deliverables, approvals, timelines, and long-term partnerships.',
      deliverables: ['Creator coordination', 'Brief management', 'Approvals & timelines', 'Partnership support'],
      icon: 'network',
      featured: false,
    },
    {
      id: 'analytics-growth-strategy',
      order: '06',
      title: 'Analytics & Growth Strategy',
      summary:
        'Reporting and strategic review that connect activity to the next decision.',
      deliverables: ['Measurement framework', 'Campaign reporting', 'Insight reviews', 'Optimization roadmap'],
      icon: 'chart',
      featured: false,
    },
  ],

  additionalCapabilities: [
    'Short-form video repurposing & clipping',
    'Campaign strategy',
    'Creator whitelisting',
    'AI-powered marketing tools & automation',
    'Performance marketing (future capability)',
  ],

  distribution: {
    eyebrow: 'A PK Media differentiator',
    title: 'Create Once. Distribute Everywhere.',
    description:
      'A long-form video, podcast, or interview can become a focused content engine — shaped for the channels where your audience already pays attention.',
    platforms: [
      'Instagram Reels',
      'YouTube Shorts',
      'TikTok',
      'Facebook',
      'LinkedIn',
      'X / Twitter',
      'Blog content',
      'Ad creatives',
    ],
    workflow: [
      'Long-form content',
      'AI + editing',
      'Short-form content',
      'Multi-platform distribution',
      'Analytics',
      'Optimization',
    ],
  },

  influencer: {
    eyebrow: 'Creator campaigns',
    title: "Don't just find influencers. Build creator campaigns.",
    description:
      'We match campaign needs with relevant creators, organize the work, and make every stage easier to manage.',
    workflow: [
      'Strategy',
      'Creator discovery',
      'Shortlisting',
      'Negotiation',
      'Content brief',
      'Campaign management',
      'Publishing',
      'Analytics',
      'Optimization',
    ],
    matchingCriteria: [
      'Niche',
      'Audience',
      'Location',
      'Platform',
      'Content style',
      'Engagement',
      'Campaign objectives',
    ],
    note: 'Creator selection is based on information available from creators and public platform signals — never unverified private audience data.',
  },

  socialManagement: {
    eyebrow: 'Always-on growth channel',
    title: 'Your social media, managed like a growth channel.',
    description:
      'A practical operating system for showing up consistently, learning what lands, and building on it.',
    services: [
      'Content strategy',
      'Content calendar',
      'Reels & posts',
      'Captions',
      'Publishing',
      'Community management',
      'Competitor research',
      'Monthly analytics',
    ],
    platforms: ['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'X / Twitter', 'TikTok'],
  },

  packages: [
    {
      id: 'content-starter',
      name: 'Content Starter',
      price: '₹15,000',
      cadence: '/month',
purpose: 'Build a consistent content foundation.',
      includes: [
        'Short-form content',
        'Video editing',
        'Content repurposing',
        'Captions',
        'Content calendar',
        'Basic analytics',
      ],
      badge: undefined,
      note: undefined,
      cta: 'Build Your Plan',
    },
    {
      id: 'social-growth',
      name: 'Social Growth',
      price: '₹30,000',
      cadence: '/month',
purpose: 'Build a consistent, managed social presence.',
      includes: [
        'Social media management',
        'Content strategy',
        '12–20 content pieces',
        'Captions',
        'Publishing',
        'Community management',
        'Analytics',
      ],
      badge: undefined,
      note: undefined,
      cta: 'Book a Strategy Call',
    },
    {
      id: 'creator-boost',
      name: 'Creator Boost',
      price: '₹50,000',
      cadence: '/campaign',
      purpose: 'Launch a coordinated, creator-led campaign.',
      includes: [
        'Influencer strategy',
        'Creator discovery',
        'Creator shortlist',
        'Negotiation',
        'Campaign management',
        'UGC',
        'Campaign reporting',
      ],
note: 'Influencer and creator fees are scoped separately from PK Media’s management fee.',
      badge: undefined,
      cta: 'Plan a Campaign',
    },
    {
      id: 'growth-engine',
      name: 'Growth Engine',
      price: '₹1,00,000',
      cadence: '/month',
      purpose: 'Connect creators, content, and distribution into one growth system.',
      includes: [
        'Strategy',
        'Content creation',
        'Influencer marketing',
        'UGC',
        'Content distribution',
        'Social media',
        'Analytics',
        'Monthly optimization',
      ],
badge: 'Most Popular',
      note: undefined,
      cta: 'Build Your Growth Plan',
    },
    {
      id: 'scale-partner',
      name: 'Scale Partner',
      price: 'Custom',
      cadence: 'pricing',
      purpose: 'A custom engagement for complex growth requirements.',
      includes: [
        'Large creator campaigns',
        '50–100+ creators',
        'UGC production',
        'Whitelisting',
        'Paid amplification',
'Content production',
        'Advanced analytics',
        'Dedicated account management',
        'Custom strategy',
      ],
      badge: undefined,
      note: undefined,
      cta: 'Talk to Our Growth Team',
    },
  ],

  growthPlanBuilder: {
    eyebrow: 'Make it yours',
    title: 'Build Your Own Growth Plan',
    description: 'Choose exactly what your business needs. No unnecessary services.',
    groups: [
      {
        id: 'foundation',
        label: 'Foundation',
        multi: true,
        options: ['Content', 'Social Media', 'Influencer Marketing', 'UGC', 'Content Distribution'],
      },
      {
        id: 'platforms',
        label: 'Platforms',
        multi: true,
        options: ['Instagram', 'YouTube', 'Facebook', 'LinkedIn', 'X / Twitter', 'TikTok'],
      },
      {
        id: 'creatorCampaign',
        label: 'Creator campaign',
        multi: false,
        options: ['Nano', 'Micro', 'Mid-tier', 'Macro', 'Custom'],
      },
      {
        id: 'addOns',
        label: 'Add-ons',
        multi: true,
        options: [
          'Video Editing',
          'Social Media Management',
          'Content Strategy',
          'Analytics',
          'Creator Management',
          'Paid Ads',
          'Whitelisting',
        ],
      },
    ],
  },

  customGrowthPlan: {
    eyebrow: 'Custom strategy',
    title: 'Your Business Is Different. Your Strategy Should Be Too.',
    description:
      'For brands with specific goals, budgets, markets, or campaign requirements, PK Media creates a customized growth plan.',
    steps: [
      'Business audit',
      'Competitor research',
      'Growth strategy',
      'Channel selection',
      'Creator strategy',
      'Content strategy',
      'Distribution plan',
      'Campaign budget',
      'Analytics framework',
      'Monthly optimization',
    ],
  },

  howItWorks: [
    { number: '01', title: 'Discovery Call', text: 'Align on your goals, context, and what a useful next step looks like.' },
    { number: '02', title: 'Business & Audience Research', text: 'Map your category, audience, content environment, and opportunities.' },
    { number: '03', title: 'Strategy', text: 'Define the creator, content, distribution, and measurement approach.' },
    { number: '04', title: 'Proposal', text: 'Share the recommended scope, deliverables, investment, and timeline.' },
    { number: '05', title: 'Agreement', text: 'Confirm responsibilities, working rhythm, and campaign foundations.' },
    { number: '06', title: 'Campaign Execution', text: 'Coordinate the people, content, approvals, and publishing.' },
    { number: '07', title: 'Analytics & Reporting', text: 'Review the activity and agreed measurement signals clearly.' },
    { number: '08', title: 'Optimization', text: 'Use the learnings to improve the next creative or distribution decision.' },
  ],

  analytics: {
    eyebrow: 'Clear reporting',
    title: 'Marketing should be measurable.',
    description:
      'A reporting view that keeps delivery, signals, and next decisions visible. Campaign values appear only when real data is available.',
    metrics: ['Reach', 'Views', 'Engagement', 'Creators', 'Content Published', 'Clicks', 'Conversions', 'ROI'],
  },

  caseStudies: [
    {
      id: 'case-study-01',
      category: 'Creator-led growth',
      title: 'Case Study Coming Soon',
      description: 'Verified project stories and outcomes will be added here when they are ready to share.',
    },
    {
      id: 'case-study-02',
      category: 'Content distribution',
      title: 'Case Study Coming Soon',
      description: 'This space is reserved for a future documented engagement.',
    },
    {
      id: 'case-study-03',
      category: 'Social growth',
      title: 'Case Study Coming Soon',
      description: 'This space is reserved for a future documented engagement.',
    },
  ],

  about: {
    eyebrow: 'About PK Media',
    title: 'Built for the New Era of Marketing.',
    description:
      'PK Media is a creator-led growth agency combining influencer marketing, content distribution, social media, and data to help brands build attention and turn it into business growth.',
    vision:
      'To become a global creator-led growth company connecting brands, creators, content, technology, and data.',
  },

  creators: {
    eyebrow: 'For creators',
    title: "Creators, Let's Build Together.",
    description:
      'PK Media connects creators with brand opportunities while keeping communication, campaign coordination, and partnership building clear.',
    benefits: [
      'Brand collaborations',
      'Paid campaigns',
      'UGC opportunities',
      'Creator management',
      'Campaign coordination',
      'Long-term partnerships',
    ],
  },

  forms: {
    brandBudgets: ['₹25K–₹50K', '₹50K–₹1L', '₹1L–₹3L', '₹3L–₹5L', '₹5L+'],
    industries: [
      'D2C / E-commerce',
      'Startup',
      'SaaS / Technology',
      'Gaming & esports',
      'Fashion / Beauty',
      'Fitness / Wellness',
      'Food & beverage',
      'Personal brand / Coach',
      'Other',
    ],
    serviceOptions: [
      'Influencer Marketing',
      'UGC & Creator Content',
      'Social Media Management',
      'Content Distribution',
      'Creator Management',
      'Analytics & Growth Strategy',
      'Custom Growth Plan',
    ],
  },
} as const

export const whatsappUrl = `https://wa.me/${site.company.whatsappNumber}?text=${encodeURIComponent(site.company.whatsappMessage)}`
