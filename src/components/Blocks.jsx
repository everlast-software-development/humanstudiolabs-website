import { useEffect, useRef } from 'react'
import { Section, Button, SmartLink } from './ui'
import { BRAND } from '../data/content'

// Page hero for inner pages: text in column 1, image across columns 2–3 to the screen edge.
// Cinematic page hero shared by all inner pages (same style as the homepage hero, shorter).
// image.video (optional): muted looping background clip, with image.src as its poster; visitors who
// prefer reduced motion keep the still image.
// tone (optional): the image's darkest edge colour, used by the "ph-blend" class as the hero background.
// alive: the still image gets a slow drift, a light sweep, floating particles and a gentle mouse parallax.
export function PageHero({ crumb, label, title, lead, image, className = '', alive = false, tone, children }) {
  const video = image.video && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const bgRef = useRef(null)
  useEffect(() => {
    // desktop only (fine pointer), and never for visitors who prefer reduced motion
    if (!alive || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0
    const onMove = (e) => { tx = (e.clientX / window.innerWidth - 0.5) * 14; ty = (e.clientY / window.innerHeight - 0.5) * 10 }
    const tick = () => { cx += (tx - cx) * 0.05; cy += (ty - cy) * 0.05; if (bgRef.current) bgRef.current.style.translate = `${-cx}px ${-cy}px`; raf = requestAnimationFrame(tick) }
    window.addEventListener('pointermove', onMove); raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf) }
  }, [alive])
  return (
    <section className={`ph ${alive ? 'ph--alive ' : ''}${className}`} style={tone ? { '--ph-tone': tone } : undefined} aria-labelledby="page-title">
      <div className="ph-bg" aria-hidden="true" ref={bgRef}>
        {video
          ? <video src={image.video} poster={image.src} autoPlay muted loop playsInline preload="auto" style={{ objectPosition: image.pos }} />
          : <img src={image.src} alt="" style={{ objectPosition: image.pos }} />}
        {alive && <div className="ph-sweep" aria-hidden="true" />}
        {alive && <div className="ph-dust" aria-hidden="true" />}
      </div>
      <div className="lines" aria-hidden="true"><span /><span /><span /></div>
      <div className="ph-content">
        <div className="wrap">
          <div className="g3">
            <div className="span2">
              <p className="ph-crumb"><SmartLink to="/">Home</SmartLink> / <b>{crumb || label}</b></p>
              <h1 id="page-title">{title}</h1>
              {lead && <p className="ph-lead">{lead}</p>}
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Closing band used at the end of every page (full image, statement, buttons, contact strip).
export function CtaBand({ label, title, text, line, image, primary, secondary }) {
  return (
    <Section tone="" className="closing" aria-labelledby="cta-title" style={{ '--line': 'var(--on-line)' }}>
      <div className="bg" aria-hidden="true"><img src={image} alt="" loading="lazy" /></div>
      <div className="wrap">
        <div className="g3">
          <div className="rv">{label && <span className="label" style={{ color: 'var(--sky)' }}>{label}</span>}</div>
          <div className="span2">
            <h2 id="cta-title" className="rv cta-title">{title}</h2>
            {text && <p className="rv d1 cta-text">{text}</p>}
            {line && <p className="rv d1 cta-line">{line}</p>}
            <div className="ctas rv d2" style={{ marginTop: 28 }}>
              {primary && <Button to={primary.to} className="on-dark">{primary.label}</Button>}
              {secondary && <Button to={secondary.to} variant="line">{secondary.label}</Button>}
            </div>
          </div>
        </div>
        <div className="g3 contact rv">
          <div><small>Email</small><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></div>
          <div><small>Website</small><p>{BRAND.site}</p></div>
          <div><small>Philosophy</small><p>{BRAND.tagline}</p></div>
        </div>
      </div>
    </Section>
  )
}
