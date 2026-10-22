import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CONTACT, BRAND } from '../data/content'
import { Section, Head } from '../components/ui'
import { PageHero } from '../components/Blocks'

// No server yet: submitting opens the visitor's email app with the enquiry addressed to BRAND.email.
export default function Contact() {
  const [params] = useSearchParams()
  const preset = CONTACT.areas.find((a) => a === params.get('area')) || ''
  const [status, setStatus] = useState({ err: false, text: '' })
  const f = CONTACT.fields

  const submit = (e) => {
    e.preventDefault()
    const v = Object.fromEntries(new FormData(e.currentTarget))
    const missing = [['name', f.name], ['org', f.org], ['email', f.email], ['message', f.message]].filter(([k]) => !String(v[k] || '').trim())
    if (missing.length) return setStatus({ err: true, text: `Please complete: ${missing.map((m) => m[1]).join(', ')}.` })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) return setStatus({ err: true, text: 'Please enter a valid professional email address.' })
    const body = `${f.name}: ${v.name}\n${f.org}: ${v.org}\n${f.email}: ${v.email}\n${f.area}: ${v.area || 'Not specified'}\n\n${v.message}`
    window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(`Enquiry: ${v.area || 'General'} — ${v.org}`)}&body=${encodeURIComponent(body)}`
    setStatus({ err: false, text: `Your email app should open with the enquiry ready to send. If it doesn't, write to ${BRAND.email}.` })
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
              {status.text && <p className={`status full ${status.err ? 'err' : ''}`} role="status">{status.text}</p>}
              <div className="full"><button type="submit" className="btn solid">{CONTACT.submit}<i aria-hidden="true">→</i></button></div>
            </form>
          </div>
        </div>
      </Section>
    </main>
  )
}
