import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ButtonLink from '../components/ButtonLink.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import { ARTICLES } from '../lib/articles.js';
import { recentAppearances } from '../lib/media.js';
import { formatDate } from '../lib/format.js';
import home from '../content/home.json';

// All of the text and photos on this page come from src/content/home.json.
const { hero, bridge, explore, featured, pillars, journey, appearances, cta } = home;
const ROLES = hero.roles;

const CONTAINER = 'max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16';
const EYEBROW = 'text-[11px] tracking-[0.3em] uppercase text-ochre font-medium';
// Stagger for items in a 3-column grid: 1, 2, 3, 1, 2, 3…
const stagger = (i, columns = 3) => (i % columns) + 1;

function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-7 flex items-center gap-3">
      <span className="block w-2 h-2 rounded-full bg-ochre animate-pulse-soft" />
      <div className="relative h-7 overflow-hidden" aria-live="off">
        {ROLES.map((role, i) => (
          <div
            key={role}
            aria-hidden={i !== index}
            className={`absolute inset-0 font-display text-lg md:text-xl text-oxford/90 whitespace-nowrap transition-all duration-700 ${
              i === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            {role}
          </div>
        ))}
        {/* Invisible copy of the longest role keeps the width steady */}
        <span className="invisible font-display text-lg md:text-xl whitespace-nowrap">
          {ROLES.reduce((longest, role) => (role.length > longest.length ? role : longest), '')}
        </span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 grain opacity-60" />
      <div className="absolute inset-x-0 top-24 bottom-0 pointer-events-none" aria-hidden="true">
        <div className={`${CONTAINER} h-full grid grid-cols-12 gap-4`}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={`border-l hairline h-full ${i === 0 || i === 11 ? 'opacity-0' : 'opacity-50'}`} />
          ))}
        </div>
      </div>

      <div className={`relative ${CONTAINER} w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-16`}>
        <div className="lg:col-span-7 order-2 lg:order-1">
          <Reveal as="p" className={EYEBROW}>
            {hero.eyebrow}
          </Reveal>
          <Reveal
            as="h1"
            delay={1}
            className="font-display text-[3.2rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[0.95] text-oxford mt-6 text-balance"
          >
            {hero.nameLine1}
            <br />
            {hero.nameLine2}
            <br />
            <span className="text-ochre">{hero.nameAccent}</span>
          </Reveal>
          <div className="mt-8 h-px w-24 bg-oxford/30" />
          <RoleRotator />
          <Reveal as="p" delay={2} className="mt-8 text-lg leading-relaxed text-slate max-w-xl">
            {hero.lede}
          </Reveal>
          <Reveal delay={3} className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink to="/about">View Full Profile</ButtonLink>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-2 py-4 text-sm tracking-wide font-medium text-oxford border-b border-oxford/30 hover:border-ochre hover:text-ochre transition-colors"
            >
              Get In Touch
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2">
          <Reveal delay={2} className="relative">
            <div className="absolute -inset-3 border hairline pointer-events-none" />
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <img src={hero.portrait} alt={`${hero.nameLine1} ${hero.nameLine2} ${hero.nameAccent}`} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-oxford/20 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-background px-5 py-3 border hairline">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate">{hero.portraitCaption}</span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2" aria-hidden="true">
        <span className="text-[10px] tracking-[0.3em] uppercase text-slate/60">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-ochre/60 to-transparent" />
      </div>
    </section>
  );
}

function Bridge() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal as="p" className={EYEBROW}>
              {bridge.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={1} className="font-display text-3xl md:text-4xl leading-tight text-oxford mt-5">
              {bridge.title}
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 prose-editorial">
            {bridge.paragraphs.map((paragraph, i) => (
              <Reveal as="p" key={i} delay={stagger(i)}>
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Explore() {
  return (
    <section className="py-24 md:py-32 bg-muted/40 border-y hairline">
      <div className={CONTAINER}>
        <SectionHeading eyebrow={explore.eyebrow} title={explore.title} accent={explore.accent} lede={explore.lede} />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-oxford/10 border hairline">
          {explore.items.map((item, i) => (
            <Reveal key={item.link} delay={stagger(i)}>
              <Link to={item.link} className="group block bg-background p-8 md:p-10 h-full hover:bg-oxford transition-colors duration-500">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] text-slate/50 group-hover:text-background/50 transition-colors duration-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-oxford/30 group-hover:text-background transition-colors duration-500" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl mt-6 text-oxford group-hover:text-background transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate group-hover:text-background/70 transition-colors duration-500">
                  {item.text}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedWritings() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className={CONTAINER}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeading eyebrow={featured.eyebrow} title={featured.title} accent={featured.accent} />
          <Reveal delay={2}>
            <Link to="/insights" className="group inline-flex items-center gap-2 text-sm font-medium text-oxford hover:text-ochre transition-colors">
              View all writings
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.slice(0, 3).map((article, i) => (
            <Reveal key={article.slug} delay={stagger(i)}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="py-24 md:py-32 bg-oxford text-background relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-40" />
      <div className={`relative ${CONTAINER}`}>
        <SectionHeading eyebrow={pillars.eyebrow} title={pillars.title} accent={pillars.accent} dark />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-background/10">
          {pillars.items.map((pillar, i) => (
            <Reveal key={pillar.title} delay={stagger(i)}>
              <div className="bg-oxford p-8 md:p-9 h-full border border-transparent hover:bg-oxford/80 hover:border-ochre/40 transition-colors duration-500">
                <span className="font-mono text-[11px] text-ochre">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-2xl mt-5 text-background">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-background/65">{pillar.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className={CONTAINER}>
        <SectionHeading eyebrow={journey.eyebrow} title={journey.title} accent={journey.accent} lede={journey.lede} />
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden border hairline">
              <img src={journey.image} alt={journey.imageAlt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="relative pl-8 md:pl-10">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-oxford/15" />
              {journey.steps.map((step, i) => (
                <Reveal key={step.title} delay={stagger(i)}>
                  <div className={`relative ${i === journey.steps.length - 1 ? '' : 'pb-10'}`}>
                    <div className="absolute -left-[37.5px] md:-left-[45.5px] top-1.5 w-3 h-3 rounded-full bg-background border-2 border-ochre" />
                    <div className="text-[11px] tracking-[0.2em] uppercase text-ochre font-medium">{step.when}</div>
                    <h3 className="font-display text-xl md:text-2xl text-oxford mt-2">{step.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Appearances() {
  return (
    <section className="py-24 md:py-32 bg-muted/40 border-y hairline">
      <div className={CONTAINER}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeading eyebrow={appearances.eyebrow} title={appearances.title} accent={appearances.accent} />
          <Reveal delay={2}>
            <Link to="/media" className="group inline-flex items-center gap-2 text-sm font-medium text-oxford hover:text-ochre transition-colors">
              All appearances
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentAppearances(3).map((item, i) => (
            <Reveal key={item.sourceUrl} delay={stagger(i)}>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="group block border hairline bg-background p-7 h-full hover:border-ochre/40 transition-colors duration-500"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-ochre font-medium">{item.type}</span>
                  <span className="text-xs text-slate/70">{formatDate(item.date)}</span>
                </div>
                <h3 className="font-display text-xl text-oxford leading-snug group-hover:text-ochre transition-colors">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate line-clamp-2">{item.description}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img src={cta.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-oxford/80" />
      </div>
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Reveal as="p" className={EYEBROW}>
          {cta.eyebrow}
        </Reveal>
        <Reveal as="h2" delay={1} className="font-display text-4xl md:text-5xl text-background mt-5 text-balance">
          {cta.title}
        </Reveal>
        <Reveal as="p" delay={2} className="mt-6 text-lg text-background/70 max-w-xl mx-auto">
          {cta.lede}
        </Reveal>
        <Reveal delay={3} className="mt-10">
          <ButtonLink to="/contact" variant="accent" wide>
            {cta.button}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Bridge />
      <Explore />
      <FeaturedWritings />
      <Pillars />
      <Journey />
      <Appearances />
      <ContactCta />
    </>
  );
}
