import { BookOpen } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { LIBRARY } from '../lib/media.js';
import pages from '../content/pages.json';

export default function Library() {
  return (
    <>
      <PageHero {...pages.library} />
      <section className="pb-20 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center gap-3 mb-10">
            <BookOpen className="w-5 h-5 text-ochre" aria-hidden="true" />
            <h2 className="text-[11px] tracking-[0.3em] uppercase text-slate font-medium">Books</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LIBRARY.map((item, i) => (
              <Reveal key={item.url} delay={(i % 2) + 1}>
                <div className="border hairline bg-card p-8 h-full hover:border-ochre/40 transition-colors duration-500">
                  <span className="font-mono text-[11px] text-slate/50">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-2xl text-oxford mt-4">{item.title}</h3>
                  <div className="text-sm text-ochre font-medium mt-1">{item.byline}</div>
                  <p className="mt-4 text-[15px] leading-relaxed text-slate">{item.description}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm text-oxford border-b border-oxford/30 hover:border-ochre hover:text-ochre transition-colors pt-2 pb-1"
                  >
                    View ↗
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
