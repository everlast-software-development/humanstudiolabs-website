import { BRAND } from '../data/content'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap f-legal">
        <span><img src={BRAND.icon} alt="" className="footer-icon" aria-hidden="true" />© {new Date().getFullYear()} {BRAND.name}</span>
        <span>Intelligence for the next era of healthcare.</span>
      </div>
    </footer>
  )
}
