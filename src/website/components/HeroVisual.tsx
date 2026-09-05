import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'

export function HeroVisual() {
  const visualRef = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0, rX: 0, rY: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const heroEl = visualRef.current?.closest('.hero') as HTMLElement | null
    if (!heroEl) return

    const handlePointerMove = (e: PointerEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const rect = heroEl.getBoundingClientRect()
      if (rect.height <= 0 || rect.width <= 0) return

      const relX = (e.clientX - rect.left) / rect.width - 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5

      const clampedX = Math.max(-1, Math.min(1, relX))
      const clampedY = Math.max(-1, Math.min(1, relY))

      setOffset({
        x: clampedX * 10,
        y: clampedY * 8,
        rX: -clampedY * 4,
        rY: clampedX * 5,
      })
      setIsHovered(true)
    }

    const resetTransform = () => {
      setOffset({ x: 0, y: 0, rX: 0, rY: 0 })
      setIsHovered(false)
    }

    heroEl.addEventListener('pointermove', handlePointerMove, { passive: true })
    heroEl.addEventListener('pointerleave', resetTransform)
    window.addEventListener('scroll', resetTransform, { passive: true })
    window.addEventListener('blur', resetTransform)
    window.addEventListener('resize', resetTransform)

    return () => {
      heroEl.removeEventListener('pointermove', handlePointerMove)
      heroEl.removeEventListener('pointerleave', resetTransform)
      window.removeEventListener('scroll', resetTransform)
      window.removeEventListener('blur', resetTransform)
      window.removeEventListener('resize', resetTransform)
    }
  }, [])

  return (
    <div
      ref={visualRef}
      className="hero-visual"
      aria-label="Illustration of a connected creator, content, and distribution workspace"
      role="img"
    >
      <div
        className="hero-visual__inner"
        style={{
          transform: isHovered
            ? `perspective(1000px) translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0) rotateX(${offset.rX.toFixed(1)}deg) rotateY(${offset.rY.toFixed(1)}deg)`
            : 'perspective(1000px) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)',
          transition: isHovered
            ? 'transform 0.12s cubic-bezier(0.2, 0, 0.2, 1)'
            : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <div className="hero-visual__glow hero-visual__glow--teal" />
        <div className="hero-visual__glow hero-visual__glow--orange" />
        <div className="hero-dashboard">
          <div className="hero-dashboard__topline">
            <div className="visual-logo-dot">
              <span />
              <span />
              <span />
            </div>
            <span>Growth workspace</span>
            <span className="hero-dashboard__status">
              <i /> System ready
            </span>
          </div>
          <div className="hero-dashboard__head">
            <div>
              <span className="visual-kicker">Campaign view</span>
              <strong>
                Creators + content
                <br />+ distribution
              </strong>
            </div>
            <div className="visual-window-dots">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="hero-dashboard__metrics">
            <div className="visual-metric-card">
              <span>Attention</span>
              <b>—</b>
              <em className="trend-line trend-line--teal" />
            </div>
            <div className="visual-metric-card">
              <span>Engagement</span>
              <b>—</b>
              <em className="trend-line trend-line--orange" />
            </div>
            <div className="visual-metric-card">
              <span>Next signal</span>
              <b>—</b>
              <em className="trend-line trend-line--light" />
            </div>
          </div>
          <div className="hero-dashboard__lower">
            <div className="visual-flow-card">
              <div className="visual-flow-card__title">
                <span>Content flow</span>
                <small>Live system</small>
              </div>
              <div className="visual-flow">
                <span className="visual-flow__origin">
                  <Icon name="play" size={14} />
                </span>
                <i />
                <span className="visual-flow__node">Edit</span>
                <i />
                <span className="visual-flow__node visual-flow__node--accent">Share</span>
              </div>
            </div>
            <div className="visual-orbit-card">
              <div className="visual-orbit-card__ring">
                <i />
                <i />
                <i />
              </div>
              <span>
                Creator
                <br />
                network
              </span>
            </div>
          </div>
        </div>
        <div className="visual-floating-card visual-floating-card--creator">
          <span aria-hidden="true">
            <Icon name="creator" size={17} />
          </span>
          <div>
            <small>Creator brief</small>
            <b>Aligned</b>
          </div>
        </div>
        <div className="visual-floating-card visual-floating-card--distribution">
          <span aria-hidden="true">
            <Icon name="distribution" size={17} />
          </span>
          <div>
            <small>Distribution</small>
            <b>Connected</b>
          </div>
        </div>
      </div>
    </div>
  )
}
