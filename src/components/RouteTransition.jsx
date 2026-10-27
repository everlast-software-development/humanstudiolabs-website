import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

// Thin progress line at the top on every page change (not on the first load, not on #section links).
export default function RouteTransition() {
  const { pathname } = useLocation()
  const first = useRef(true)
  const [run, setRun] = useState(0)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    setRun((n) => n + 1)
  }, [pathname])
  if (!run) return null
  return <div key={run} className="route-bar" aria-hidden="true" />
}
