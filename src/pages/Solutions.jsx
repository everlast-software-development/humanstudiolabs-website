import { PATHWAYS, SOLUTIONS, CLOSING, IMAGES } from '../data/content'
import { Section, Head, Media, Prose, Button } from '../components/ui'
import { PageHero, CtaBand } from '../components/Blocks'

// Overview of the four solution areas, built from the same blocks as the homepage.
export default function Solutions() {
  return (
    <main>
      <PageHero crumb="Solutions" title={PATHWAYS.title} lead={PATHWAYS.label} image={{ src: IMAGES.solutionsHero, alt: 'A digital human figure standing on a smartphone connected by glowing data lines', pos: '50% 18%' }} />
      {SOLUTIONS.map((s, i) => {
        const img = s.heroImage || { src: s.image, pos: s.pos }
        return (
          <Section key={s.id} id={s.id} tone={i % 2 ? 'dark' : 'light'} aria-labelledby={`sol-${s.id}`}>
            <div className="wrap">
              <Head label={`Solution ${s.n}`} title={s.name} intro={s.tagline} titleId={`sol-${s.id}`} />
              <div className="g3">
                <div className="rv"><Media src={img.src} alt={img.alt || ''} pos={img.pos} /></div>
                <div className="span2 rv d1">
                  <Prose paras={s.home} lead />
                  <div className="ctas" style={{ marginTop: 28 }}>
                    <Button to={`/solutions/${s.id}`} className={i % 2 ? 'on-dark' : ''}>Explore {s.name}</Button>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        )
      })}
      <CtaBand label={CLOSING.label} title={CLOSING.title} text={CLOSING.text} line={CLOSING.line} image={CLOSING.image}
        primary={{ label: 'Start a Conversation', to: '/contact' }} secondary={{ label: 'Partner With Us', to: '/partnerships' }} />
    </main>
  )
}
