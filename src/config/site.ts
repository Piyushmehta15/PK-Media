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
      leafLogo: '/brand/pk-media-logo-leaf.png',
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
      priceLabel: 'Starting from',
      priceHint: '',
      purpose: 'Build a consistent content foundation from your existing brand assets and footage.',
      bestFor: 'Small businesses, startups, and personal brands that want consistent content.',
      includes: [
        'Basic content strategy',
        'Monthly content calendar',
        '8–12 post videos',
        'Static posts or carousels',
        'Video editing',
        'Captions and subtitles',
        'Content repurposing',
        'Caption writing',
        'Basic publishing support',
        'Basic monthly analytics',
      ],
      fullScope: [
        'Basic content strategy',
        'Monthly content calendar',
        '8–12 short-form edited videos per month',
        'Basic static posts or carousel content',
        'Video editing and enhancement',
        'Captions and subtitles generation',
        'Content repurposing for social channels',
        'Social copy and caption writing',
        'Basic publishing and scheduling support',
        'Basic monthly performance analytics',
      ],
      whatWeHandle: 'PK Media plans content, edits client-provided footage, creates short-form content assets, repurposes content, prepares captions and helps maintain a consistent content calendar.',
      clientProvides: ['Raw footage or content assets', 'Product information', 'Brand assets and logo', 'Required approvals', 'Feedback'],
      notIncluded: ['Influencer marketing', 'Creator fees', 'UGC creator fees', 'Professional shooting', 'Ad spend', 'Full community management'],
      scopeNote: 'Designed to make your existing content more consistent; physical shoots are not automatically included.',
      badge: undefined,
      note: undefined,
      cta: 'Build Your Content Plan',
    },
    {
      id: 'social-growth',
      name: 'Social Growth',
      price: '₹30,000',
      cadence: '/month',
      priceLabel: 'Starting from',
      priceHint: '',
      purpose: 'Build and manage a consistent social media presence with strategy, content and execution.',
      bestFor: 'Brands that want consistent social media growth and management.',
      includes: [
        'Monthly social media strategy',
        'Competitor research',
        'Content pillars and content calendar',
        '12–20 content pieces',
        'Short-form video editing',
        'Static posts and carousels',
        'Captions and scheduling',
        'Social media management',
        'Basic community management',
        'Analytics and optimization',
      ],
      fullScope: [
        'Monthly social media strategy development',
        'Competitor and industry research',
        'Content pillars and monthly content calendar',
        '12–20 content pieces per month',
        'Short-form video editing',
        'Static posts and custom carousels',
        'Captions writing and posts scheduling',
        'End-to-end social media management',
        'Basic community management (comments, DMs)',
        'Monthly analytics and recommendations optimization',
      ],
      whatWeHandle: 'PK Media creates the monthly strategy, plans content, edits content, prepares posts, writes captions, schedules content, manages agreed social media accounts and provides monthly performance analysis.',
      clientProvides: ['Raw footage', 'Product information', 'Brand assets', 'Important customer information', 'Timely approvals', 'Access to agreed social media accounts'],
      notIncluded: ['Unlimited content creation', '24/7 customer support', 'Influencer or creator fees', 'Paid advertising spend'],
      scopeNote: 'Social media management means managing agreed platforms and publishing content. It does NOT mean unlimited content creation or 24/7 customer support.',
      badge: undefined,
      note: undefined,
      cta: 'Book a Strategy Call',
    },
    {
      id: 'creator-boost',
      name: 'Creator Boost',
      price: '₹50,000',
      cadence: '/campaign',
      priceLabel: 'Starting from',
      priceHint: '',
      purpose: 'Launch a coordinated influencer, creator or UGC campaign with strategy and full campaign coordination.',
      bestFor: 'Brands launching influencer marketing or UGC campaigns.',
      includes: [
        'Campaign strategy',
        'Creator and influencer research',
        'Creator shortlisting',
        'Influencer outreach',
        'Negotiation support',
        'Campaign briefs',
        'Creator coordination',
        'Approval and deadline tracking',
        'UGC coordination',
        'Campaign reporting',
      ],
      fullScope: [
        'Campaign strategy formulation',
        'Creator and influencer discovery & research',
        'Creator vetting and shortlisting',
        'Influencer outreach and communication',
        'Negotiation support and deal closing',
        'Detailed campaign briefs',
        'Creator coordination and relationship management',
        'Approval process and deadline tracking',
        'UGC creator coordination',
        'Campaign performance reporting',
      ],
      whatWeHandle: 'PK Media finds suitable creators, contacts them, negotiates, prepares campaign briefs, coordinates deliverables and manages the campaign process.',
      clientProvides: ['Campaign objective', 'Product information', 'Product samples if needed', 'Creator budget', 'Required approvals', 'Timely feedback'],
      notIncluded: ['Influencer payments', 'Creator fees', 'UGC creator payments', 'Paid advertising spend', 'Professional production'],
      scopeNote: 'Influencer and creator fees are scoped separately from PK Media’s management fee.',
      badge: undefined,
      note: 'Influencer and creator fees are scoped separately from PK Media’s management fee.',
      cta: 'Plan a Campaign',
    },
    {
      id: 'growth-engine',
      name: 'Growth Engine',
      price: '₹1,00,000',
      cadence: '/month',
      priceLabel: 'Starting from',
      priceHint: '',
      purpose: 'A complete monthly growth system combining strategy, content, social media, creators and distribution.',
      bestFor: 'Brands that want PK Media as a complete external growth team.',
      includes: [
        'Complete monthly growth strategy',
        'Content planning and calendar',
        '20–30 content assets',
        'Video editing and content repurposing',
        'Social media management',
        'Community support',
        'Creator discovery and outreach',
        'Influencer campaign management',
        'UGC coordination',
        'Content distribution',
        'Analytics and reports',
        'Continuous optimization',
      ],
      fullScope: [
        'Complete monthly growth strategy',
        'Content planning and monthly content calendar',
        '20–30 content assets per month',
        'Video editing and content repurposing',
        'Social media management & posting',
        'Community support & engagement',
        'Creator discovery and outreach',
        'Influencer campaign management',
        'UGC production coordination',
        'Multi-platform content distribution',
        'Advanced analytics and detailed reports',
        'Continuous performance optimization',
      ],
      whatWeHandle: 'PK Media acts as an external growth partner by managing the content system, social media execution, creator activity, content distribution and performance optimization.',
      clientProvides: ['Raw footage and content', 'Product access', 'Founder or team participation where required', 'Marketing information', 'Timely approvals', 'Influencer and creator budget', 'UGC budget', 'Advertising budget where applicable'],
      notIncluded: ['Creator and influencer fees', 'UGC creator payments', 'Paid advertising spend', 'Professional production and studio costs', 'Travel and other third-party costs'],
      scopeNote: 'Creator fees, influencer payments, advertising spend and third-party production costs are separate unless included in the proposal.',
      badge: 'Most Popular',
      note: undefined,
      cta: 'Build Your Growth Plan',
    },
    {
      id: 'scale-partner',
      name: 'Scale Partner',
      price: 'Custom pricing',
      cadence: '',
      priceLabel: 'Custom Engagement',
      priceHint: 'Suggested minimum: ₹2,50,000+/month',
      purpose: 'A customized external growth team for brands, startups and companies with complex or large-scale growth requirements.',
      bestFor: 'Established brands, startups, and companies with large-scale or complex growth requirements.',
      includes: [
        'Dedicated account management',
        'Custom growth strategy',
        'Dedicated content team',
        'Multi-platform social media management',
        'Large-scale creator campaigns',
        '50–100+ creators when required',
        'UGC production coordination',
        'Paid amplification and whitelisting',
        'Advanced analytics and dashboards',
        'Custom reporting',
        'Custom team structure',
      ],
      fullScope: [
        'Dedicated account management',
        'Custom growth strategy',
        'Dedicated content team',
        'Multi-platform social media management',
        'Large-scale creator campaigns',
        '50–100+ creators when required',
        'UGC production coordination',
        'Paid amplification and whitelisting',
        'Advanced analytics and dashboards',
        'Custom reporting & audits',
        'Custom team structure',
      ],
      whatWeHandle: 'PK Media builds a custom external growth and creator marketing team around your priorities, channels, content system and campaign requirements.',
      clientProvides: ['Business and growth objectives', 'Product and brand access', 'Timely decision-makers and approvals', 'Required platform access', 'Creator, advertising and production budgets where applicable'],
      notIncluded: ['Creator, influencer and UGC payments unless stated', 'Paid advertising spend unless stated', 'Professional production, travel and third-party costs unless stated'],
      scopeNote: 'Everything in this engagement is customized to your requirements and confirmed in a written proposal.',
      badge: undefined,
      note: undefined,
      cta: 'Talk to Our Growth Team',
    },
  ],


  clippingApproach: [
    {
      title: 'Strategic Clip Curation',
      description: 'We identify the strongest moments and understand what should come first, what should come next and how to create curiosity.'
    },
    {
      title: 'Multiple Creative Variations',
      description: 'The same moment can be transformed with different hooks, storytelling structures, music, emotional angles and endings.'
    },
    {
      title: 'Frankenstein Edits',
      description: 'We can combine moments from different videos or podcasts to create completely new stories.'
    },
    {
      title: 'High-Volume Testing',
      description: 'We produce and test multiple quality content variations to create more opportunities to discover winning content.'
    },
    {
      title: 'Performance-Based Distribution',
      description: 'Clients can choose a campaign budget, and PK Media creates a distribution plan based on an agreed CPM and target number of views.'
    }
  ],

  clipPerformancePackages: [
    {
      id: 'clip-performance-starter',
      name: 'Clip Performance Starter',
      price: '₹25,000',
      cadence: ' / campaign',
      priceLabel: 'Starting from',
      targetViews: '250K–500K views*',
      bestFor: 'Creators and brands starting out with view-guaranteed performance campaigns.',
      includes: [
        'Strategic clip curation',
        '8–12 creative clip variations',
        'Frankenstein editing techniques',
        'Standard platform distribution',
        'Basic performance tracking & analytics',
        'Guaranteed CPM calculation model',
      ],
      cta: 'Launch Starter Campaign'
    },
    {
      id: 'clip-growth-campaign',
      name: 'Clip Growth Campaign',
      price: '₹50,000',
      cadence: ' / campaign',
      priceLabel: 'Starting from',
      targetViews: '500K–1M views*',
      bestFor: 'Brands looking for aggressive growth with higher guaranteed view targets.',
      includes: [
        'Strategic clip curation & hooks',
        '15–25 creative variations & testing',
        'Advanced Frankenstein edits',
        'Multi-platform optimization & delivery',
        'Dedicated distribution setup',
        'Full performance analytics dashboard',
        'Guaranteed CPM optimization',
      ],
      cta: 'Launch Growth Campaign'
    },
    {
      id: 'clip-scale-campaign',
      name: 'Clip Scale Campaign',
      price: '₹1,00,000',
      cadence: ' / campaign',
      priceLabel: 'Starting from',
      targetViews: '1M–2M+ views*',
      bestFor: 'Established creators and brands requiring massive reach and custom distribution scale.',
      includes: [
        'Dedicated clip strategy & curation team',
        '30–50+ creative content variations',
        'Complex Frankenstein & high-tier editing',
        'Full-scale multi-platform distribution engine',
        'Priority publisher network whitelisting',
        'Advanced attribution & performance reporting',
        'Guaranteed CPM volume pricing',
      ],
      cta: 'Launch Scale Campaign'
    }
  ],

  packageExperience: {
    positioning: 'PK Media combines content, creators and distribution to help brands build attention and grow.',
    shortPositioning: 'Create. Distribute. Grow.',
    comparison: [
      { name: 'Content Starter', focus: 'Content execution', strategy: 'Basic', content: 'Yes', social: 'Limited support', creators: 'No', analytics: 'Basic' },
      { name: 'Social Growth', focus: 'Social media growth', strategy: 'Yes', content: 'Yes', social: 'Yes', creators: 'Add-on', analytics: 'Monthly' },
      { name: 'Creator Boost', focus: 'Creator campaign', strategy: 'Campaign strategy', content: 'Campaign-related', social: 'No', creators: 'Yes', analytics: 'Campaign reporting' },
      { name: 'Growth Engine', focus: 'Complete growth system', strategy: 'Advanced', content: 'Extensive', social: 'Yes', creators: 'Yes', analytics: 'Advanced' },
      { name: 'Scale Partner', focus: 'Custom external growth team', strategy: 'Custom', content: 'Custom', social: 'Custom', creators: 'Custom', analytics: 'Custom' },
    ],
    process: [
      { number: 'STEP 1', title: 'Strategy', description: 'We understand the brand, audience, competitors and growth objectives.' },
      { number: 'STEP 2', title: 'Create & Distribute', description: 'We plan content, create or edit assets, coordinate creators and distribute content across the right channels.' },
      { number: 'STEP 3', title: 'Measure & Optimize', description: 'We analyze performance, identify what works and improve the next cycle.' },
    ],
    commercialScope: "PK Media's management and strategy fees are separate from influencer fees, creator fees, paid advertising spend, professional production, studio rentals, travel and other third-party costs unless specifically included in a written proposal.",
    clientProvides: [
      'Raw footage or brand assets where content production is required',
      'Product information and product access',
      'Brand guidelines',
      'Timely approvals and feedback',
      'Creator, advertising or production budgets where applicable',
      'Access to relevant social media accounts',
    ],
    pkMediaHandles: [
      'Strategy',
      'Content planning',
      'Content editing and production coordination',
      'Content repurposing',
      'Publishing',
      'Social media management',
      'Creator discovery',
      'Creator outreach',
      'Campaign coordination',
      'Content distribution',
      'Analytics',
      'Reporting',
      'Optimization',
    ],
  },

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
