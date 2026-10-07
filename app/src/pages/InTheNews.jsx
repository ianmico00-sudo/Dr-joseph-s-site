import { ExternalLink } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { newsItems } from '../lib/media.js';
import pages from '../content/pages.json';
import { formatDate } from '../lib/format.js';

export default function InTheNews() {
  return (
    <>
      <PageHero {...pages.news} />
      <section className="pb-24 md:pb-32 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="border-t hairline">
            {newsItems().map((item, i) => (
              <Reveal key={item.sourceUrl} delay={(i % 3) + 1}>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group block py-8 border-b hairline hover:border-ochre/40 transition-colors duration-500"
                >
                  <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
                    <div className="col-span-12 md:col-span-3">
                      <span className="text-[10px] tracking-[0.25em] uppercase text-ochre font-medium">{item.outlet}</span>
                      <div className="mt-2 text-xs text-slate/70">{[formatDate(item.date), item.category].filter(Boolean).join(' · ')}</div>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                      <h3 className="font-display text-xl md:text-2xl text-oxford group-hover:text-ochre transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-slate">{item.description}</p>
                    </div>
                    <div className="col-span-12 md:col-span-1 flex md:justify-end">
                      <ExternalLink className="w-4 h-4 text-oxford/30 group-hover:text-ochre transition-colors mt-1" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
