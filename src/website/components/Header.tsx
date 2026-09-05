import { useEffect, useState } from 'react'
import { site } from '../../config/site'
import { BrandMark } from './BrandMark'
import { Icon } from './Icon'

export function Header({ onBookCall }: { onBookCall: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)
    return () => document.body.classList.remove('menu-is-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="shell site-header__inner">
        <BrandMark inverse={!scrolled} />
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-toggle__icon" aria-hidden="true">
            <Icon name={menuOpen ? 'x' : 'menu'} size={22} />
          </span>
        </button>
        <nav
          id="primary-navigation"
          className={`site-navigation ${menuOpen ? 'site-navigation--open' : ''}`}
          aria-label="Primary navigation"
        >
          <div className="site-navigation__mobile-heading">
            <span>Navigate PK Media</span>
            <button type="button" aria-label="Close navigation menu" onClick={closeMenu}>
              <Icon name="x" size={19} />
            </button>
          </div>
          {site.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <button
            className="button button--primary button--small navigation-cta"
            type="button"
            onClick={() => {
              closeMenu()
              onBookCall()
            }}
          >
            Book a Free Strategy Call{' '}
            <span aria-hidden="true">
              <Icon name="arrowUpRight" size={16} />
            </span>
          </button>
        </nav>
      </div>
    </header>
  )
}
