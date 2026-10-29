import { ABOUT, ECOSYSTEM, CLOSING, IMAGES } from '../data/content'
import { Section, Head, Media, Rows, Tiles, Prose } from '../components/ui'
import { PageHero, CtaBand } from '../components/Blocks'

// About page: the same blocks as the homepage (section head, image + text, 2×2 tiles,
// numbered rows + image, closing band), alternating light and dark.
export default function About() {
  return (
    <main>
      <PageHero crumb="About" title={ABOUT.title} lead={ABOUT.intro[0]} image={ABOUT.image} />

      {/* like homepage section 02: image left, text right */}
      <Section tone="light" aria-labelledby="a1">
        <div className="wrap">
          <Head label={ABOUT.label} title={ABOUT.philosophy.title} intro={ABOUT.intro[1]} titleId="a1" />
          <div className="g3">
            <div className="rv"><Media src={IMAGES.aboutLabs} alt="A visitor facing a holographic model of the human body in a futuristic innovation lab" pos="50% 52%" /></div>
            <div className="span2 rv d1"><Prose paras={[ABOUT.intro[2], ABOUT.intro[3]]} lead /></div>
          </div>
        </div>
      </Section>

      {/* like homepage section 03: image left, 2×2 tiles right */}
      <Section tone="dark" aria-labelledby="a2">
        <div className="wrap">
          <Head label="Vision · Mission · Philosophy" title="Our Vision, Mission and Philosophy." titleId="a2" />
          <div className="g3">
            <div className="rv"><Media src={IMAGES.portraitBlue} pos="50% 28%" /></div>
            <div className="span2 rv d1">
              <Tiles items={[
                { title: 'Our Vision', text: ABOUT.vision },
                { title: 'Our Mission', text: ABOUT.mission },
                { title: 'Our Philosophy', sub: ABOUT.philosophy.title, text: ABOUT.philosophy.text[0] },
                { title: 'Our Approach', text: ABOUT.philosophy.text[1] },
              ]} />
            </div>
          </div>
        </div>
      </Section>

      {/* like homepage section 04: numbered rows left, image right */}
      <Section tone="light" aria-labelledby="a3">
        <div className="wrap">
          <Head label="Our Innovation Model" title="Human. Studio. Labs. Intelligence." intro={ABOUT.modelNote} titleId="a3" />
          <div className="g3">
            <div className="span2 rv"><Rows items={ABOUT.model} /></div>
            <div className="rv d1 split-side split-side--right"><Media src={IMAGES.innovationModel} alt="A digital model of the human body surrounded by medical scans and data" pos="49% 40%" /></div>
          </div>
        </div>
      </Section>

      {/* like homepage section 02: image left, text right */}
      <Section tone="dark" aria-labelledby="a4">
        <div className="wrap">
          <Head label={ECOSYSTEM.label} title={ECOSYSTEM.title} intro={ECOSYSTEM.intro} titleId="a4" />
          <div className="g3">
            <div className="rv"><Media src={IMAGES.specializedProducts} alt="A glowing digital human figure rising from a smartphone screen" pos="50% 12%" /></div>
            <div className="span2 rv d1"><Prose paras={ECOSYSTEM.text} /></div>
          </div>
        </div>
      </Section>

      {/* like homepage section 08: text across columns 2–3 */}
      <Section tone="light" aria-labelledby="a5">
        <div className="wrap">
          <Head label="Looking Forward" title="Building the foundation for what comes next." intro={ABOUT.forward[0]} titleId="a5" />
          <div className="g3">
            <div />
            <div className="span2 rv d1"><Prose paras={[ABOUT.forward[1]]} /></div>
          </div>
        </div>
      </Section>

      {/* closing band: identical to the homepage */}
      <CtaBand label={CLOSING.label} title={CLOSING.title} text={CLOSING.text} line={CLOSING.line} image={CLOSING.image}
        primary={{ label: 'Explore Our Solutions', to: '/solutions' }} secondary={{ label: 'Start a Conversation', to: '/contact' }} />
    </main>
  )
}
