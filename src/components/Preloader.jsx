import { useEffect, useRef, useState } from 'react'
import { BRAND } from '../data/content'

// Shown once per session: the logo is revealed, a counter runs to 100, then the screen lifts up.
export default function Preloader() {
  const [show] = useState(() => {
    try { return !sessionStorage.getItem('hsl-preloaded') } catch { return true }
  })
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(!show)
  const countRef = useRef(null), barRef = useRef(null)

  useEffect(() => {
    if (!show) { document.documentElement.classList.remove('is-loading'); return }
    const root = document.documentElement
    root.classList.add('is-loading')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dur = reduce ? 300 : 1700, t0 = performance.now()
    let raf, t1, t2
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3)
      if (countRef.current) countRef.current.textContent = String(Math.round(e * 100)).padStart(2, '0')
      if (barRef.current) barRef.current.style.width = e * 100 + '%'
      if (p < 1) raf = requestAnimationFrame(tick)
      else t1 = setTimeout(() => {
        setLeaving(true)
        root.classList.remove('is-loading')            // hero animations start now
        try { sessionStorage.setItem('hsl-preloaded', '1') } catch {}
        t2 = setTimeout(() => setGone(true), reduce ? 300 : 1000)
      }, reduce ? 0 : 250)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); root.classList.remove('is-loading') }
  }, [show])

  if (gone) return null
  return (
    <div className={`pl ${leaving ? 'pl-out' : ''}`} role="status" aria-label={`Loading ${BRAND.name}`}>
      <div className="pl-center">
        <img className="pl-logo" src={BRAND.logo} alt="" />
      </div>
      <div className="pl-foot">
        <span className="pl-tag">{BRAND.tagline}</span>
        <span className="pl-count" ref={countRef}>00</span>
      </div>
      <div className="pl-bar"><i ref={barRef} /></div>
    </div>
  )
}
