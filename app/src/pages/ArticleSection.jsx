import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Search } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { SECTIONS, articleHref, articlesInSection } from '../lib/articles.js';
import { formatDate } from '../lib/format.js';

// Listing page shared by Insights, Analysis and Reflections.
export default function ArticleSection({ section }) {
  const info = SECTIONS[section];
  const all = useMemo(() => articlesInSection(section), [section]);
  const tags = useMemo(() => ['All', ...new Set(all.map((a) => a.tag))], [all]);
  const [tag, setTag] = useState('All');
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const shown = all.filter(
    (a) => (tag === 'All' || a.tag === tag) && (!q || `${a.title} ${a.excerpt} ${a.tag}`.toLowerCase().includes(q)),
  );

  return (
    <>
      <PageHero eyebrow={info.eyebrow} title={info.title} lede={info.lede} />

      <section className="pb-24 md:pb-32 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between pb-8 mb-2 border-b hairline">
            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/50" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                aria-label={`Search ${info.eyebrow}`}
                className="w-full pl-7 pr-3 py-2 bg-transparent border-0 border-b hairline focus:border-ochre focus:outline-none text-sm text-oxford placeholder:text-slate/60 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1" role="group" aria-label="Filter by topic">
              {tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={tag === t}
                  onClick={() => setTag(t)}
                  className={`py-2 text-[11px] tracking-[0.15em] uppercase font-medium transition-colors duration-300 ${
                    tag === t ? 'text-ochre' : 'text-slate/70 hover:text-oxford'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-2">
            {shown.map((article) => (
              <Reveal key={article.slug}>
                <Link
                  to={articleHref(article)}
                  className="group block py-8 border-b hairline hover:border-ochre/40 transition-colors duration-500"
                >
                  <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
                    <div className="col-span-12 md:col-span-2">
                      <span className="font-mono text-[11px] text-slate/50" aria-hidden="true">
                        —
                      </span>
                      <div className="mt-2 text-[10px] tracking-[0.2em] uppercase text-ochre font-medium">{article.tag}</div>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                      <h3 className="font-display text-xl md:text-2xl leading-snug text-oxford group-hover:text-ochre transition-colors text-balance">
                        {article.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-slate line-clamp-2">{article.excerpt}</p>
                    </div>
                    <div className="col-span-12 md:col-span-2 flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3">
                      <span className="text-xs text-slate/70">{formatDate(article.date)}</span>
                      <span className="flex items-center gap-1 text-xs text-oxford/60 group-hover:text-ochre transition-colors">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" /> {article.readTime}m
                      </span>
                      <ArrowUpRight
                        className="hidden md:block w-4 h-4 text-oxford/30 group-hover:text-ochre transition-colors mt-2"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
            {shown.length === 0 && (
              <p className="py-16 text-center text-slate">
                No articles match your search.{' '}
                <button
                  type="button"
                  className="text-oxford border-b border-oxford/30 hover:border-ochre hover:text-ochre transition-colors"
                  onClick={() => {
                    setQuery('');
                    setTag('All');
                  }}
                >
                  Show all
                </button>
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
