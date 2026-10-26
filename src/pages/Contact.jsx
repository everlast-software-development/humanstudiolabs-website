import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CONTACT, BRAND } from '../data/content'
import { Section, Head } from '../components/ui'
import { PageHero } from '../components/Blocks'

// Enquiries are POSTed to /api/contact (server/index.js), which emails them via SMTP settings in .env.
export default function Contact() {
  const [params] = useSearchParams()
  const preset = CONTACT.areas.find((a) => a === params.get('area')) || ''
  const [status, setStatus] = useState({ err: false, text: '' })
  const [sending, setSending] = useState(false)
  const f = CONTACT.fields

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const v = Object.fromEntries(new FormData(form))
    const missing = [['name', f.name], ['org', f.org], ['email', f.email], ['message', f.message]].filter(([k]) => !String(v[k] || '').trim())
    if (missing.length) return setStatus({ err: true, text: `Please complete: ${missing.map((m) => m[1]).join(', ')}.` })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) return setStatus({ err: true, text: 'Please enter a valid professional email address.' })
    setSending(true); setStatus({ err: false, text: '' })
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) })
      const data = await r.json().catch(() => ({}))
      if (!r.ok || !data.ok) throw new Error(data.error || 'Something went wrong.')
      form.reset()
      setStatus({ err: false, text: 'Thank you. Your enquiry has been sent and our team will be in touch.' })
    } catch (err) {
      setStatus({ err: true, text: err.message || `We could not send your message. Please email ${BRAND.email} directly.` })
    } finally { setSending(false) }
  }

  return (
    <main>
      <PageHero label={CONTACT.label} title={CONTACT.title} lead={CONTACT.text[0]} image={CONTACT.image} />
      <Section tone="light" aria-labelledby="c1">
        <div className="wrap">
          <Head label={CONTACT.label} title={f.message} intro={CONTACT.text[1]} titleId="c1" />
          <div className="g3">
            <div className="side-note rv"><span className="label">Email</span><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></div>
            <form className="span2 form rv d1" onSubmit={submit} noValidate>
              <label>{f.name}<input name="name" autoComplete="name" required /></label>
              <label>{f.org}<input name="org" autoComplete="organization" required /></label>
              <label>{f.email}<input name="email" type="email" autoComplete="email" required /></label>
              <label>{f.area}
                <select name="area" defaultValue={preset}>
                  <option value="">—</option>
                  {CONTACT.areas.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </label>
              <label className="full">{f.message}<textarea name="message" required /></label>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
              {status.text && <p className={`status full ${status.err ? 'err' : ''}`} role="status">{status.text}</p>}
              <div className="full"><button type="submit" className="btn solid" disabled={sending}>{sending ? 'Sending…' : CONTACT.submit}<i aria-hidden="true">→</i></button></div>
            </form>
          </div>
        </div>
      </Section>
    </main>
  )
}
