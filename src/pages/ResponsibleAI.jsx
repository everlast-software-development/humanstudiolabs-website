import { RESPONSIBLE, PARTNERSHIPS, CLOSING } from '../data/content'
import { Section, Head, Media, Rows, Prose } from '../components/ui'
import { PageHero, CtaBand } from '../components/Blocks'

// Responsible AI page, built from the same blocks as the homepage.
export default function ResponsibleAI() {
  return (
    <main>
      <PageHero crumb="Responsible AI" className="ph-soft ph-blend" tone="#000000" title={RESPONSIBLE.title} lead={RESPONSIBLE.intro[0]} image={RESPONSIBLE.image} />

      {/* like homepage section 04: numbered rows left, image right */}
      <Section tone="light" aria-labelledby="r1">
        <div className="wrap">
          <Head label={RESPONSIBLE.label} title={RESPONSIBLE.areasIntro} intro={RESPONSIBLE.intro[1]} titleId="r1" />
          <div className="g3">
            <div className="span2 rv"><Rows items={RESPONSIBLE.areas} /></div>
            <div className="rv d1 split-side split-side--right"><Media src="/images/our-approach.webp" alt="A woman's face analysed by a digital interface" pos="45% 40%" /></div>
          </div>
        </div>
      </Section>

      {/* like homepage section 02: image left, text right */}
      <Section tone="dark" aria-labelledby="r2">
        <div className="wrap">
          <Head label="Tailored to each solution" title="Accountability by design." titleId="r2" />
          <div className="g3">
            <div className="rv"><Media src="/images/tailored-to-each-solution.webp" alt="A digital human profile made of circuits" pos="40% 45%" alive /></div>
            <div className="span2 rv d1"><Prose paras={RESPONSIBLE.closing} lead /></div>
          </div>
        </div>
      </Section>

      {/* closing band */}
      <CtaBand label={CLOSING.label} title={PARTNERSHIPS.ctaTitle} text={PARTNERSHIPS.ctaText} image={CLOSING.image}
        primary={{ label: 'Start a Conversation', to: '/contact' }} secondary={{ label: 'Explore Our Solutions', to: '/solutions' }} />
    </main>
  )
}
