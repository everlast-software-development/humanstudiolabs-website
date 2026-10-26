import { useParams, Navigate } from 'react-router-dom'
import { SOLUTIONS, CLOSING } from '../data/content'
import { Section, Head, Tiles, Prose, Button, SmartLink } from '../components/ui'
import { PageHero, CtaBand } from '../components/Blocks'

export default function Solution() {
  const { id } = useParams()
  const i = SOLUTIONS.findIndex((s) => s.id === id)
  if (i < 0) return <Navigate to="/" replace />
  const s = SOLUTIONS[i], next = SOLUTIONS[(i + 1) % SOLUTIONS.length]
  const contactTo = `/contact?area=${encodeURIComponent(s.name)}`
  return (
    <main key={s.id}>
      <PageHero label={`Solution ${s.n}`} title={s.name} lead={s.pageTagline} image={s.heroImage || { src: s.image, pos: s.pos }}>
        <p className="aud rv d2"><b>Audience:</b> {s.audience}</p>
        <div className="ctas rv d2"><Button to={contactTo}>{s.cta}</Button></div>
      </PageHero>

      <Section tone="light" aria-labelledby="s-intro">
        <div className="wrap">
          <Head label={s.pageTagline} title={s.introTitle} titleId="s-intro" />
          <div className="g3"><div /><div className="span2 rv d1"><Prose paras={[...s.home, ...s.intro]} lead /></div></div>
        </div>
      </Section>

      <Section tone="dark" aria-labelledby="s-caps">
        <div className="wrap">
          <Head label="Capabilities" title={s.capsTitle} titleId="s-caps" />
          {s.groups.map((g) => (
            <div className="g3 group" key={g.title || 'caps'}>
              <div className="rv">{g.title && <h3 className="group-title">{g.title}</h3>}</div>
              <div className="span2 rv d1"><Tiles items={g.caps.map(([t, d]) => ({ title: t, text: d }))} /></div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="light" aria-labelledby="s-ctx">
        <div className="wrap">
          <Head label="Context" title={s.contextTitle} titleId="s-ctx" />
          <div className="g3"><div /><div className="span2 rv d1"><Prose paras={s.context} /></div></div>
          <div className="g3 ambition">
            <div className="rv"><span className="label">The ambition</span></div>
            <div className="span2 rv d1"><p className="quote">{s.ambition}</p></div>
          </div>
        </div>
      </Section>

      <CtaBand label={s.name} title={s.cta} text={s.tagline} image={CLOSING.image}
        primary={{ label: s.cta, to: contactTo }} secondary={{ label: `Next: ${next.name}`, to: `/solutions/${next.id}` }} />
    </main>
  )
}
