import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BRAND, NAV, HEADER_CTA, SOLUTIONS } from '../data/content'
import { SmartLink, Button } from './ui'

export function Mark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true">
      <circle cx="24" cy="9" r="3.2" fill="currentColor" stroke="none" />
      <path d="M24 16v26" strokeWidth="3" /><path d="M10 25h28" strokeWidth="3" /><path d="M14 38l10-9 10 9" strokeWidth="2.4" />
    </svg>
  )
}

// Desktop "Solutions" dropdown: the word links to /solutions; hovering or the small arrow opens the panel;
// it closes on mouse leave, click outside, Escape or navigation.
function SolutionsMenu({ pathname }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const hovered = useRef(false) // a mouse click right after hover-open keeps the panel open instead of toggling it shut
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDoc); document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('pointerdown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [])
  const active = pathname.startsWith('/solutions')
  return (
    <div className="dd" ref={ref} onMouseEnter={() => { hovered.current = true; setOpen(true) }} onMouseLeave={() => { hovered.current = false; setOpen(false) }}>
      <SmartLink to="/solutions" className={`dd-trigger ${active ? 'is-active' : ''}`} aria-current={pathname === '/solutions' ? 'page' : undefined} onClick={() => setOpen(false)}>Solutions</SmartLink>
      <button type="button" className="dd-toggle" aria-label="Show solutions" aria-expanded={open}
        aria-controls="dd-solutions" onClick={(e) => setOpen((o) => (e.detail > 0 && hovered.current ? true : !o))}>
        <span aria-hidden="true" className="dd-caret">▾</span>
      </button>
      <div className={`dd-panel ${open ? 'is-open' : ''}`} id="dd-solutions">
        <div className="dd-box">
          <div className="dd-grid">
            {SOLUTIONS.map((s) => (
              <SmartLink key={s.id} to={`/solutions/${s.id}`} className="dd-item">
                <small>{s.n}</small><b>{s.name}</b><span>{s.tagline}</span>
              </SmartLink>
            ))}
          </div>
          <SmartLink to="/solutions" className="dd-all">View all solutions →</SmartLink>
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  useEffect(() => setOpen(false), [pathname, hash])

  // Logo: always to the top of the homepage. On the homepage itself the address may not change, so scroll
  // up here (and drop any #section); on other pages the link navigates and the route effect scrolls to the top.
  const goHome = (e) => {
    setOpen(false)
    if (pathname === '/') {
      e.preventDefault()
      if (hash) navigate('/', { replace: true })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // While the mobile drawer is open: the page behind it does not scroll, and Escape closes it.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => { root.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [open])

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
    <>
    <header className={`site-header ${overHero && !open ? 'over-hero' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="in">
        <SmartLink className="logo" to="/" aria-label={BRAND.name} onClick={goHome}><img src={BRAND.logo} alt="" className="logo-img" /></SmartLink>
        <div className="right">
          <nav aria-label="Main">
            <SolutionsMenu pathname={pathname} />
            {NAV.filter((n) => n.label !== 'Solutions').map((n) => <SmartLink key={n.to} to={n.to} aria-current={n.to === pathname ? 'page' : undefined}>{n.label}</SmartLink>)}
          </nav>
          <Button to={HEADER_CTA.to} className="header-btn">{HEADER_CTA.label}</Button>
          <button type="button" className="menu-btn" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>{open ? 'Close' : 'Menu'}</button>
        </div>
      </div>
    </header>

    {/* Mobile drawer: outside the header, because the header's backdrop blur would otherwise make it the
        positioning box for these fixed elements and clip them to the header bar. */}
    <div className={`drawer-backdrop ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
    {/* any link closes it, also one to the page you're already on (the address doesn't change then) */}
    <aside id="mobile-nav" className={`drawer ${open ? 'is-open' : ''}`} aria-label="Mobile menu" aria-hidden={!open} inert={open ? undefined : ''}
      onClick={(e) => { if (e.target.closest('a')) setOpen(false) }}>
      <div className="drawer-top">
        <SmartLink className="logo" to="/" aria-label={BRAND.name} onClick={goHome}><img src={BRAND.logo} alt="" className="logo-img" /></SmartLink>
        <button type="button" className="drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
      </div>
      <nav className="drawer-links" aria-label="Mobile">
        {NAV.map((n) => (
          <div key={n.to}>
            <SmartLink to={n.to} className="drawer-link">{n.label}</SmartLink>
            {n.label === 'Solutions' && (
              <div className="drawer-sub">
                {SOLUTIONS.map((s) => <SmartLink key={s.id} to={`/solutions/${s.id}`}>{s.n} · {s.name}</SmartLink>)}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="drawer-foot">
        <Button to={HEADER_CTA.to} className="on-dark">{HEADER_CTA.label}</Button>
        <a className="drawer-mail" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
      </div>
    </aside>
    </>
  )
}
