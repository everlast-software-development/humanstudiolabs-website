import { RESPONSIBLE, PARTNERSHIPS, CLOSING, IMAGES } from '../data/content'
import { Section, Head, Media, Rows, Prose } from '../components/ui'
import { PageHero, CtaBand } from '../components/Blocks'

// Responsible AI page, built from the same blocks as the homepage.
export default function ResponsibleAI() {
  return (
    <main>
      <PageHero crumb="Responsible AI" className="ph-soft" title={RESPONSIBLE.title} lead={RESPONSIBLE.intro[0]} image={RESPONSIBLE.image} />

      {/* like homepage section 04: numbered rows left, image right */}
      <Section tone="light" aria-labelledby="r1">
        <div className="wrap">
          <Head label={RESPONSIBLE.label} title={RESPONSIBLE.areasIntro} intro={RESPONSIBLE.intro[1]} titleId="r1" />
          <div className="g3">
            <div className="span2 rv"><Rows items={RESPONSIBLE.areas} /></div>
            <div className="rv d1"><Media src="/images/our-approach.webp" alt="A woman's face analysed by a digital interface" pos="45% 40%" /></div>
          </div>
        </div>
      </Section>

      {/* like homepage section 02: image left, text right */}
      <Section tone="dark" aria-labelledby="r2">
        <div className="wrap">
          <Head label="Tailored to each solution" title="Accountability by design." titleId="r2" />
          <div className="g3">
            <div className="rv"><Media src={IMAGES.headScan} pos="62% 45%" video="https://pub-cf581317971544ca8bc920fcb6643c6c.r2.dev/Tailored%20to%20each%20solution.mp4" videoPos="50% 50%" /></div>
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
