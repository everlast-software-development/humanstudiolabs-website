import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Per section: hide (for the whole section) any inner grid line that would cross content.
const SEL = 'h1,h2,h3,p,li,.media,.tiles > *,.btn,.label,.ph-crumb,.contact > div,form,blockquote,.hx-item'

function fit(sec) {
  const spans = [...sec.querySelectorAll(':scope > .lines > span')]
  if (spans.length < 2) return
  const boxes = [...sec.querySelectorAll(SEL)]
    .filter((el) => !el.closest('.lines') && !el.closest('.bg') && !el.closest('.ph-bg') && !el.closest('.hx-bg'))
    .map((el) => el.getBoundingClientRect())
    .filter((r) => r.width && r.height)
  spans.forEach((sp, i) => {
    if (i === 0) return                       // left edge always stays
    sp.classList.remove('line-off')
    const x = sp.getBoundingClientRect().left
    if (boxes.some((r) => r.left < x - 2 && r.right > x + 2)) sp.classList.add('line-off')
  })
}

export default function GridLineFit() {
  const { pathname } = useLocation()
  useEffect(() => {
    const all = () => document.querySelectorAll('.sec, .ph, .hx').forEach(fit)
    let t
    const later = () => { clearTimeout(t); t = setTimeout(all, 100) }
    const ro = new ResizeObserver(later); ro.observe(document.body)
    window.addEventListener('load', all)
    document.fonts?.ready.then(all)
    const a = setTimeout(all, 50), b = setTimeout(all, 1200)
    return () => { ro.disconnect(); clearTimeout(t); clearTimeout(a); clearTimeout(b); window.removeEventListener('load', all) }
  }, [pathname])
  return null
}
