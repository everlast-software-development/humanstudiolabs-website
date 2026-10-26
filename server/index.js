import 'dotenv/config'
import express from 'express'
import nodemailer from 'nodemailer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
app.set('trust proxy', 1)
app.use(express.json({ limit: '20kb' }))

const { EMAIL_HOST, EMAIL_PORT = '587', EMAIL_SECURE = 'false', EMAIL_USER, EMAIL_PASS, EMAIL_TO, PORT = '3001' } = process.env
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST, port: Number(EMAIL_PORT), secure: EMAIL_SECURE === 'true',
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
})

// simple protection: max 5 enquiries per IP every 10 minutes
const hits = new Map()
const limited = (ip) => {
  const now = Date.now(), list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000)
  list.push(now); hits.set(ip, list); return list.length > 5
}
const clean = (v, max) => String(v ?? '').trim().slice(0, max)
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

app.post('/api/contact', async (req, res) => {
  if (limited(req.ip)) return res.status(429).json({ ok: false, error: 'Too many requests. Please try again later.' })
  const b = req.body || {}
  if (b.website) return res.json({ ok: true }) // hidden anti-spam field filled by bots
  const name = clean(b.name, 120), org = clean(b.org, 160), email = clean(b.email, 160)
  const area = clean(b.area, 80), message = clean(b.message, 5000)
  if (!name || !org || !email || !message) return res.status(400).json({ ok: false, error: 'Please complete all required fields.' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' })
  try {
    await transporter.sendMail({
      from: `"Human Studio Labs website" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `New enquiry: ${area || 'General'} — ${org}`,
      text: `Name: ${name}\nOrganization: ${org}\nEmail: ${email}\nArea of interest: ${area || 'Not specified'}\n\n${message}`,
      html: `<p><b>Name:</b> ${esc(name)}<br><b>Organization:</b> ${esc(org)}<br><b>Email:</b> ${esc(email)}<br><b>Area of interest:</b> ${esc(area || 'Not specified')}</p><p>${esc(message).replace(/\n/g, '<br>')}</p>`,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Mail error:', err.message)
    res.status(500).json({ ok: false, error: 'We could not send your message. Please email info@humanstudiolabs.com directly.' })
  }
})

// in production the same server also serves the built website (dist/)
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
app.use(express.static(dist))
app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')))

app.listen(Number(PORT), () => console.log(`Server running on http://localhost:${PORT}`))
