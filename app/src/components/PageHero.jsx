import Reveal from './Reveal.jsx';

// The eyebrow / big title / intro block at the top of every inner page.
export default function PageHero({ eyebrow, title, lede }) {
  return (
    <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <Reveal as="p" className="text-[11px] tracking-[0.3em] uppercase text-ochre font-medium">
          {eyebrow}
        </Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] text-oxford mt-5 max-w-4xl text-balance"
        >
          {title}
        </Reveal>
        <div className="mt-8 h-px w-20 bg-oxford/30" />
        {lede && (
          <Reveal as="p" delay={2} className="mt-7 text-lg leading-relaxed text-slate max-w-2xl">
            {lede}
          </Reveal>
        )}
      </div>
    </section>
  );
}
