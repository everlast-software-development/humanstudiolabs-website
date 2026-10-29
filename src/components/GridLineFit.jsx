import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Per section: hide (for the whole section) any inner grid line that would cross content.
// List rows count by their number, name and description, so a line may pass through the gap between them.
const SEL = 'h1,h2,h3,p,.rows li > *,.media,.tiles > *,.btn,.label,.ph-crumb,.contact > div,form,blockquote,.hx-item'

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
  // A visible grid line between names and descriptions replaces the list's own divider.
  const visibleXs = spans.filter((sp, i) => i === 0 || !sp.classList.contains('line-off'))
    .map((sp) => sp.getBoundingClientRect().left)
  visibleXs.push(spans[spans.length - 1].getBoundingClientRect().right)   // right edge
  sec.querySelectorAll('.rows').forEach((list) => {
    const d = list.querySelector('li > :last-child')
    if (!d) return
    const x = d.getBoundingClientRect().left
    list.classList.toggle('rows--on-grid', visibleXs.some((gx) => Math.abs(gx - x) < 12))
  })
}

export default function GridLineFit() {
  const { pathname } = useLocation()
  useEffect(() => {
    const all = () => document.querySelectorAll('.sec, .ph').forEach(fit)
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
