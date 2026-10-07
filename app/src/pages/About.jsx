import { Briefcase, GraduationCap, Heart, MapPin } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ButtonLink from '../components/ButtonLink.jsx';
import about from '../content/about.json';

// All of the text and photos on this page come from src/content/about.json.
const { hero, bio, facts, roles, awards, education, interests, statement, banner } = about;
const FACT_ICONS = [MapPin, Briefcase, Heart];

const CONTAINER = 'max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16';
const EYEBROW = 'text-[11px] tracking-[0.3em] uppercase text-ochre font-medium';
const stagger = (i, columns) => (i % columns) + 1;

export default function About() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background">
        <div className={CONTAINER}>
          <Reveal as="p" className={EYEBROW}>
            {hero.eyebrow}
          </Reveal>
          <Reveal
            as="h1"
            delay={1}
            className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] text-oxford mt-5 max-w-4xl text-balance"
          >
            {hero.titleStart} <em className="text-ochre not-italic">{hero.titleAccent}</em>
            {hero.titleEnd}
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28 bg-background">
        <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16`}>
          <div className="lg:col-span-5">
            <Reveal className="relative">
              <div className="absolute -inset-3 border hairline pointer-events-none" />
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img src={hero.portrait} alt={statement.attribution} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="prose-editorial">
              {bio.map((paragraph, i) => (
                <Reveal as="p" key={i} delay={Math.min(i, 3)}>
                  {paragraph}
                </Reveal>
              ))}
            </div>
            <Reveal delay={3} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {facts.map((text, i) => {
                const Icon = FACT_ICONS[i % FACT_ICONS.length];
                return (
                  <span key={text} className="flex items-center gap-2 text-sm text-slate">
                    <Icon className="w-4 h-4 text-ochre" aria-hidden="true" /> {text}
                  </span>
                );
              })}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-muted/40 border-y hairline">
        <div className={CONTAINER}>
          <SectionHeading eyebrow={roles.eyebrow} title={roles.title} accent={roles.accent} />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-oxford/10 border hairline">
            {roles.items.map((item, i) => (
              <Reveal key={item.org} delay={stagger(i, 2)}>
                <div className="bg-background p-8 md:p-10 h-full">
                  <span className="font-mono text-[11px] text-slate/50">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-2xl text-oxford mt-4">{item.org}</h3>
                  <div className="text-sm text-ochre font-medium mt-1">{item.role}</div>
                  <p className="mt-4 text-[15px] leading-relaxed text-slate">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-muted/40">
        <div className={CONTAINER}>
          <SectionHeading eyebrow={awards.eyebrow} title={awards.title} accent={awards.accent} />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-oxford/10 border hairline">
            {awards.items.map((item, i) => (
              <Reveal key={item.title} delay={stagger(i, 3)}>
                <div className="bg-background p-8 md:p-9 h-full">
                  <span className="font-mono text-[11px] text-ochre">{item.year}</span>
                  <h3 className="font-display text-xl text-oxford mt-4 leading-snug">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16`}>
          <div className="lg:col-span-4">
            <SectionHeading eyebrow={education.eyebrow} title={education.title} accent={education.accent} />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border hairline">
              {education.items.map((item, i) => (
                <Reveal key={item.school} delay={stagger(i, 3)}>
                  <div
                    className={`bg-background p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-2 ${
                      i === education.items.length - 1 ? '' : 'border-b hairline'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <GraduationCap className="w-5 h-5 text-ochre shrink-0" aria-hidden="true" />
                      <span className="font-display text-lg text-oxford">{item.school}</span>
                    </div>
                    <span className="text-sm text-slate md:text-right">{item.award}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-oxford text-background relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-40" />
        <div className={`relative ${CONTAINER}`}>
          <SectionHeading eyebrow={interests.eyebrow} title={interests.title} accent={interests.accent} dark />
          <div className="mt-14 flex flex-wrap gap-3">
            {interests.items.map((interest, i) => (
              <Reveal key={interest} delay={stagger(i, 3)}>
                <span className="inline-block px-5 py-3 border border-background/20 text-sm text-background/80 hover:border-ochre hover:text-ochre transition-colors duration-300 cursor-default">
                  {interest}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal as="p" className={`${EYEBROW} text-center`}>
            {statement.eyebrow}
          </Reveal>
          <Reveal as="blockquote" delay={1} className="font-display text-2xl md:text-3xl leading-snug text-oxford mt-8 text-center text-balance">
            <span className="text-ochre text-5xl font-display leading-none align-top mr-1" aria-hidden="true">
              “
            </span>
            {statement.quote}
          </Reveal>
          <Reveal delay={2} className="mt-8 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-oxford/30" />
            <span className="text-sm text-slate">{statement.attribution}</span>
            <span className="w-8 h-px bg-oxford/30" />
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden border-y hairline">
        <div className="absolute inset-0">
          <img src={banner.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className={`relative ${CONTAINER} flex flex-col md:flex-row md:items-center md:justify-between gap-8`}>
          <Reveal as="h2" className="font-display text-3xl md:text-4xl text-oxford text-balance">
            {banner.title}
          </Reveal>
          <Reveal delay={1}>
            <ButtonLink to="/insights">{banner.button}</ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
