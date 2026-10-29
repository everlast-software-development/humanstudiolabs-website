import Hero from '../sections/Hero'
import { EVOLVING, PATHWAYS, SOLUTIONS, PRINCIPLES, ECOSYSTEM, AUDIENCES, RESPONSIBLE, PERFORMANCE, PARTNERSHIPS, CLOSING } from '../data/content'
import { Section, Head, Media, Rows, Tiles, Prose, SideNote, Button } from '../components/ui'
import { CtaBand } from '../components/Blocks'

// Homepage in the order recommended by the content brief (01–10). Paragraphs trimmed from here
// are shown in full on the inner pages (solution pages, About, Responsible AI, Partnerships).
export default function Home() {
  return (
    <main>
      <Hero />

      {/* 02 Healthcare's evolving needs */}
      <Section tone="light" aria-labelledby="h2">
        <div className="wrap">
          <Head label={EVOLVING.label} title={EVOLVING.title} intro={EVOLVING.intro} titleId="h2" />
          <div className="g3">
            <div className="rv"><Media {...EVOLVING.image} /></div>
            <div className="span2 rv d1"><Prose paras={EVOLVING.text} lead /></div>
          </div>
        </div>
      </Section>

      {/* 03 Four solution areas */}
      <Section id="solutions" tone="dark" aria-labelledby="h3">
        <div className="wrap">
          <Head label={PATHWAYS.label} title={PATHWAYS.title} titleId="h3" />
          <div className="g3">
            <div className="rv"><Media {...PATHWAYS.image} /></div>
            <div className="span2 rv d1">
              <Tiles items={SOLUTIONS.map((s) => ({ n: s.n, title: s.name, sub: s.tagline, text: s.home[0], to: `/solutions/${s.id}`, linkLabel: `Explore ${s.name}` }))} />
            </div>
          </div>
        </div>
      </Section>

      {/* 04 Practical capabilities */}
      <Section id="approach" tone="light" className="principles" aria-labelledby="h4">
        <div className="wrap">
          <Head label={PRINCIPLES.label} title={PRINCIPLES.title} intro={PRINCIPLES.intro} titleId="h4" />
          <div className="g3">
            <div className="span2 rv"><Rows items={PRINCIPLES.items} /></div>
            <div className="pr-media rv d1"><Media {...PRINCIPLES.image} /></div>
          </div>
        </div>
      </Section>

      {/* 05 Who we serve */}
      <Section id="serve" tone="dark" aria-labelledby="h5">
        <div className="wrap">
          <Head label={AUDIENCES.label} title={AUDIENCES.title} titleId="h5" />
          <div className="g3">
            <div className="rv"><Media {...AUDIENCES.image} video={AUDIENCES.video} /></div>
            <div className="span2 rv d1"><Rows items={AUDIENCES.items} /></div>
          </div>
        </div>
      </Section>

      {/* 06 The innovation ecosystem */}
      <Section tone="light" aria-labelledby="h6">
        <div className="wrap">
          <Head label={ECOSYSTEM.label} title={ECOSYSTEM.title} intro={ECOSYSTEM.intro} titleId="h6" />
          <div className="g3">
            <SideNote><Button to={ECOSYSTEM.link.to} variant="line">{ECOSYSTEM.link.label}</Button></SideNote>
            <div className="span2 rv d1"><Prose paras={ECOSYSTEM.text.slice(0, 1)} /></div>
          </div>
        </div>
      </Section>

      {/* 07 Responsible AI */}
      <Section id="responsible" tone="dark" aria-labelledby="h7">
        <div className="wrap">
          <Head label={RESPONSIBLE.label} title={RESPONSIBLE.title} intro={RESPONSIBLE.intro[1]} titleId="h7" />
          <div className="g3">
            <div className="span2 rv"><Rows items={RESPONSIBLE.areas} /></div>
            <div className="rv d1"><Media {...RESPONSIBLE.homeImage} /><div className="ctas" style={{ marginTop: 18 }}><Button to="/responsible-ai" variant="line">Responsible AI</Button></div></div>
          </div>
        </div>
      </Section>

      {/* 08 Evidence and products */}
      <Section tone="light" aria-labelledby="h8">
        <div className="wrap">
          <Head label={PERFORMANCE.label} title={PERFORMANCE.title} intro={PERFORMANCE.text[0]} titleId="h8" />
          <div className="g3">
            <div />
            <div className="span2 rv d1"><Prose paras={PERFORMANCE.text.slice(1, 2)} /></div>
          </div>
        </div>
      </Section>

      {/* 09 Partnerships */}
      <Section id="partners" tone="dark" aria-labelledby="h9">
        <div className="wrap">
          <Head label={PARTNERSHIPS.label} title={PARTNERSHIPS.title} intro={PARTNERSHIPS.intro[1]} titleId="h9" />
          <div className="g3">
            <SideNote label={PARTNERSHIPS.stepsTitle}>{PARTNERSHIPS.note}<div className="ctas" style={{ marginTop: 24 }}><Button to="/partnerships">{PARTNERSHIPS.label}</Button></div></SideNote>
            <div className="span2 rv d1"><Rows items={PARTNERSHIPS.steps.map(([t, d]) => [t.replace(/^\d+\.\s*/, ''), d])} /></div>
          </div>
        </div>
      </Section>

      {/* 10 Closing statement */}
      <CtaBand label={CLOSING.label} title={CLOSING.title} text={CLOSING.text} line={CLOSING.line} image={CLOSING.image}
        primary={{ label: 'Explore Our Solutions', to: '/solutions' }} secondary={{ label: 'Start a Conversation', to: '/contact' }} />
    </main>
  )
}
