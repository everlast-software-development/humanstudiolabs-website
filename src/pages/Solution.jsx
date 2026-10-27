import { useParams, Navigate } from 'react-router-dom'
import { SOLUTIONS, CLOSING } from '../data/content'
import { Section, Media, Tiles, Prose, Button } from '../components/ui'
import { PageHero, CtaBand } from '../components/Blocks'

// Column 1 of each section: the label with an image under it (sticky in the capabilities section).
function Side({ label, img, sticky }) {
  return (
    <div className="sol-side">
      <div className={sticky ? 'sol-sticky' : ''}>
        <span className="label rv">{label}</span>
        {img && <div className="rv d1" style={{ marginTop: 26 }}><Media src={img.src} alt={img.alt || ''} pos={img.pos} /></div>}
      </div>
    </div>
  )
}

export default function Solution() {
  const { id } = useParams()
  const i = SOLUTIONS.findIndex((s) => s.id === id)
  if (i < 0) return <Navigate to="/" replace />
  const s = SOLUTIONS[i], next = SOLUTIONS[(i + 1) % SOLUTIONS.length]
  const contactTo = `/contact?area=${encodeURIComponent(s.name)}`
  const im = s.sectionImages || {}
  return (
    <main key={s.id}>
      <PageHero label={`Solution ${s.n}`} title={s.name} lead={s.pageTagline} image={s.heroImage || { src: s.image, pos: s.pos }}>
        <p className="aud rv d2"><b>Audience:</b> {s.audience}</p>
        <div className="ctas rv d2"><Button to={contactTo}>{s.cta}</Button></div>
      </PageHero>

      {/* intro */}
      <Section tone="light" aria-labelledby="s-intro">
        <div className="wrap"><div className="g3">
          <Side label={s.pageTagline} img={im.intro} />
          <div className="span2">
            <h2 id="s-intro" className="sol-title rv">{s.introTitle}</h2>
            <div className="rv d1" style={{ marginTop: 28 }}><Prose paras={[...(s.home || []), ...s.intro]} lead /></div>
          </div>
        </div></div>
      </Section>

      {/* capabilities */}
      <Section tone="dark" aria-labelledby="s-caps">
        <div className="wrap"><div className="g3">
          <Side label="Capabilities" img={im.caps} sticky />
          <div className="span2">
            <h2 id="s-caps" className="sol-title rv">{s.capsTitle}</h2>
            {s.groups.map((g) => (
              <div className="sol-group rv d1" key={g.title || 'caps'}>
                {g.title && <h3 className="group-title">{g.title}</h3>}
                <Tiles items={g.caps.map(([t, d]) => ({ title: t, text: d }))} />
              </div>
            ))}
          </div>
        </div></div>
      </Section>

      {/* context + ambition */}
      <Section tone="light" aria-labelledby="s-ctx">
        <div className="wrap"><div className="g3">
          <Side label="Context" img={im.context} />
          <div className="span2">
            <h2 id="s-ctx" className="sol-title rv">{s.contextTitle}</h2>
            <div className="rv d1" style={{ marginTop: 28 }}><Prose paras={s.context} /></div>
            <div className="sol-ambition rv"><span className="label">The ambition</span><p className="quote">{s.ambition}</p></div>
          </div>
        </div></div>
      </Section>

      <CtaBand label={s.name} title={s.cta} text={s.tagline} image={CLOSING.image}
        primary={{ label: 'Start a Conversation', to: contactTo }} secondary={{ label: `Next: ${next.name}`, to: `/solutions/${next.id}` }} />
    </main>
  )
}
