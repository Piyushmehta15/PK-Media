import { IconName } from '../types/website.types'

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const shared = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'arrow':
      return <svg {...shared}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    case 'arrowUpRight':
      return <svg {...shared}><path d="M7 17 17 7M8 7h9v9" /></svg>
    case 'check':
      return <svg {...shared}><path d="m5 12 4.1 4L19 6" /></svg>
    case 'chart':
      return <svg {...shared}><path d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-9" /></svg>
    case 'creator':
      return <svg {...shared}><circle cx="9" cy="8" r="3" /><path d="M3.5 20c.8-3.2 2.7-5 5.5-5s4.7 1.8 5.5 5M16 8h4M18 6v4" /></svg>
    case 'distribution':
      return <svg {...shared}><path d="M5 6h6M5 18h6M13 12h6M10 6l3 6-3 6M18 9l3 3-3 3" /></svg>
    case 'mail':
      return <svg {...shared}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
    case 'menu':
      return <svg {...shared}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
    case 'network':
      return <svg {...shared}><circle cx="5" cy="12" r="2.3" /><circle cx="18.5" cy="6" r="2.3" /><circle cx="18.5" cy="18" r="2.3" /><path d="m7 11 9.2-4M7 13l9.2 4" /></svg>
    case 'play':
      return <svg {...shared}><path d="m9 7 8 5-8 5z" /></svg>
    case 'plus':
      return <svg {...shared}><path d="M12 5v14M5 12h14" /></svg>
    case 'send':
      return <svg {...shared}><path d="m21 3-7.5 18-3.1-7.4L3 10.5zM10.4 13.6 15 9" /></svg>
    case 'social':
      return <svg {...shared}><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.2" /><circle cx="17" cy="7" r=".7" fill="currentColor" stroke="none" /></svg>
    case 'spark':
      return <svg {...shared}><path d="m12 3 1.5 5.6L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.4zM19 16l.6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6z" /></svg>
    case 'whatsapp':
      return <svg {...shared}><path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.4-4.4a8.4 8.4 0 1 1 15.6-4.4Z" /><path d="M8.7 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.5l.7 1.7c.1.3 0 .5-.2.7l-.5.6c.7 1.3 1.8 2.4 3.2 3.1l.6-.6c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.5v.5c0 .4-.3.6-.6.7-.5.2-1 .3-1.5.2-3.7-.5-6.6-3.3-7.1-7-.1-.5 0-1 .2-1.5Z" /></svg>
    case 'x':
      return <svg {...shared}><path d="M5 5l14 14M19 5 5 19" /></svg>
    default:
      return null
  }
}
