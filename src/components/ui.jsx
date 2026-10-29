import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Internal links ("/about", "/#solutions") use the router; mailto and external links stay as <a>.
export function SmartLink({ to, children, ...rest }) {
  if (/^(mailto:|https?:)/.test(to)) return <a href={to} {...rest}>{children}</a>
  if (to.startsWith('/#')) return <Link to={{ pathname: '/', hash: to.slice(1) }} {...rest}>{children}</Link>
  return <Link to={to} {...rest}>{children}</Link>
}

// A section that fades its .rv children in when it enters the viewport.
export function Section({ id, tone = 'light', className = '', children, ...rest }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { rootMargin: '0px 0px -10% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <section ref={ref} id={id} className={`sec ${tone} ${className} ${seen ? 'in-view' : ''}`} {...rest}>
      <Lines />
      {children}
    </section>
  )
}

export function Lines() {
  return <div className="lines" aria-hidden="true"><span /><span /><span /></div>
}

// The same head everywhere: label in column 1, title + intro across columns 2–3.
export function Head({ label, title, intro, titleId, as: H = 'h2' }) {
  return (
    <div className="g3 head">
      <div className="rv">{label && <span className="label">{label}</span>}</div>
      <div className="span2">
        <H id={titleId} className="rv">{title}</H>
        {intro && <p className="intro rv d1">{intro}</p>}
      </div>
    </div>
  )
}

export function Button({ to, variant = 'solid', className = '', children, ...rest }) {
  return <SmartLink to={to} className={`btn ${variant} ${className}`} {...rest}>{children}<i aria-hidden="true">→</i></SmartLink>
}

// video: optional muted, looping clip shown instead of the image (the image is its poster, and is
// shown on its own for visitors who prefer reduced motion).
export function Media({ src, alt = '', pos, contain, style, video, videoPos }) {
  const still = !video || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <div className="media" style={style}>
      {still
        ? <img src={src} alt={alt} loading="lazy" style={{ objectPosition: pos, ...(contain ? { objectFit: 'contain', paddingTop: '8%' } : {}) }} />
        : <video src={video} poster={src} autoPlay muted loop playsInline preload="metadata" aria-label={alt || undefined} style={{ objectPosition: videoPos || pos }} />}
    </div>
  )
}

export const bodyGradient = { background: 'radial-gradient(circle at 50% 30%, #8A8A8F, #2A2A2D 65%, #0B0B0C)' }

// compact: number + title only; an item's optional third value ("to") turns the title into a link.
export function Rows({ items, numbered = true, compact = false }) {
  return (
    <ol className={`rows ${compact ? 'compact' : ''}`}>
      {items.map(([t, d, to], i) => (
        <li key={t}>
          <span className="n">{numbered ? String(i + 1).padStart(2, '0') : ''}</span>
          {compact ? (to ? <SmartLink to={to}><b>{t}</b></SmartLink> : <b>{t}</b>) : <><b>{t}</b><span>{d}</span></>}
        </li>
      ))}
    </ol>
  )
}

// Two-column cards. Each item: { title, text (string or array), to?, linkLabel? }
export function Tiles({ items }) {
  return (
    <div className="tiles">
      {items.map((it, i) => {
        const paras = Array.isArray(it.text) ? it.text : [it.text]
        const inner = (
          <>
            <span className="n">{it.n || String(i + 1).padStart(2, '0')}</span>
            <h3>{it.title}</h3>
            {it.sub && <p className="sub">{it.sub}</p>}
            {paras.map((p) => <p key={p}>{p}</p>)}
            {it.to && <span className="go">{it.linkLabel || 'Explore'} →</span>}
          </>
        )
        return it.to ? <SmartLink key={it.title} to={it.to}>{inner}</SmartLink> : <div key={it.title}>{inner}</div>
      })}
    </div>
  )
}

export function Prose({ paras, lead = false }) {
  return <div className={`prose ${lead ? 'lead-first' : ''}`}>{paras.map((p) => <p key={p}>{p}</p>)}</div>
}

export function SideNote({ label, className = '', children }) {
  return <div className={`side-note rv ${className}`}>{label && <span className="label">{label}</span>}{children}</div>
}
