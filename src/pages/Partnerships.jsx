import { PARTNERSHIPS, CLOSING } from '../data/content'
import { Section, Head, Rows, Prose, SideNote } from '../components/ui'
import { PageHero, CtaBand } from '../components/Blocks'

export default function Partnerships() {
  const p = PARTNERSHIPS
  return (
    <main>
      <PageHero label={p.label} title={p.title} lead={p.intro[0]} image={p.image} />

      <Section tone="light" aria-labelledby="p1">
        <div className="wrap">
          <Head label={p.label} title={p.title} titleId="p1" />
          <div className="g3"><div /><div className="span2 rv d1"><Prose paras={p.intro} lead /></div></div>
        </div>
      </Section>

      <Section tone="dark" aria-labelledby="p2">
        <div className="wrap">
          <Head label="Process" title={p.stepsTitle} titleId="p2" />
          <div className="g3">
            <SideNote label="Our commitment" className="split-side split-side--left">{p.note}</SideNote>
            <div className="span2 rv d1"><Rows items={p.steps.map(([t, d]) => [t.replace(/^\d+\.\s*/, ''), d])} /></div>
          </div>
        </div>
      </Section>

      <CtaBand label={p.label} title={p.ctaTitle} text={p.ctaText} image={CLOSING.image}
        primary={{ label: 'Start a Conversation', to: '/contact' }} secondary={{ label: 'Explore Our Solutions', to: '/solutions' }} />
    </main>
  )
}
