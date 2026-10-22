import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BRAND, NAV, HEADER_CTA } from '../data/content'
import { SmartLink, Button } from './ui'

export function Mark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true">
      <circle cx="24" cy="9" r="3.2" fill="currentColor" stroke="none" />
      <path d="M24 16v26" strokeWidth="3" /><path d="M10 25h28" strokeWidth="3" /><path d="M14 38l10-9 10 9" strokeWidth="2.4" />
    </svg>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()
  useEffect(() => setOpen(false), [pathname, hash])

  // Transparent header with a white logo while a dark hero (homepage .hx or inner-page .ph) is behind it;
  // "scrolled" turns it into a dark frosted bar once the page moves.
  const [overHero, setOverHero] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('.hx, .ph')
      setOverHero(!!hero && window.scrollY < hero.offsetHeight - 80)
      setScrolled(window.scrollY > 10)
    }
    const raf = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  return (
    <header className={`site-header ${overHero && !open ? 'over-hero' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="in">
        <SmartLink className="logo" to="/"><img src={BRAND.logo} alt={BRAND.name} className="logo-img" /></SmartLink>
        <div className="right">
          <nav aria-label="Main">
            {NAV.map((n) => <SmartLink key={n.to} to={n.to} aria-current={n.to === pathname ? 'page' : undefined}>{n.label}</SmartLink>)}
          </nav>
          <Button to={HEADER_CTA.to} className="header-btn">{HEADER_CTA.label}</Button>
          <button type="button" className="menu-btn" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>{open ? 'Close' : 'Menu'}</button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile">
          {NAV.map((n) => <SmartLink key={n.to} to={n.to}>{n.label}</SmartLink>)}
          <SmartLink to={HEADER_CTA.to}>{HEADER_CTA.label} →</SmartLink>
        </nav>
      )}
    </header>
  )
}
