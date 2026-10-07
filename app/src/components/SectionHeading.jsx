import Reveal from './Reveal.jsx';

// Eyebrow + large heading + short rule, used at the top of most sections.
// `accent` is the green-coloured tail of the heading; `dark` is for navy sections.
export default function SectionHeading({ eyebrow, title, accent, lede, dark = false }) {
  return (
    <div className="max-w-3xl">
      <Reveal as="p" className="text-[11px] tracking-[0.3em] uppercase font-medium text-ochre">
        {eyebrow}
      </Reveal>
      <Reveal
        as="h2"
        delay={1}
        className={`font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05] mt-5 text-balance ${
          dark ? 'text-background' : 'text-oxford'
        }`}
      >
        {title} {accent && <em className="text-ochre not-italic font-normal">{accent}</em>}
      </Reveal>
      <div className={`mt-7 w-16 h-px ${dark ? 'bg-ochre' : 'bg-oxford/30'}`} />
      {lede && (
        <Reveal as="p" delay={2} className="mt-7 text-lg leading-relaxed text-slate max-w-2xl">
          {lede}
        </Reveal>
      )}
    </div>
  );
}
