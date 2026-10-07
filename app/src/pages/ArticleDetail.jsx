import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import NotFound from './NotFound.jsx';
import { SECTIONS, articleHref, articlesInSection, findArticle, loadArticleBody } from '../lib/articles.js';
import { formatDate } from '../lib/format.js';

// Paragraphs fade in as they are reached; links open in a new tab.
const MARKDOWN = {
  p: ({ children }) => <Reveal as="p">{children}</Reveal>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
};

const Dot = () => <span className="w-1 h-1 rounded-full bg-slate/40" aria-hidden="true" />;

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = findArticle(slug);
  // Text of the article that was loaded last; ignored once another article is opened.
  const [loaded, setLoaded] = useState({ slug: null, text: '' });

  useEffect(() => {
    if (!article) return undefined;
    let cancelled = false;
    loadArticleBody(article.slug)
      .then((text) => !cancelled && setLoaded({ slug: article.slug, text }))
      .catch(() => !cancelled && setLoaded({ slug: article.slug, text: '' }));
    return () => {
      cancelled = true;
    };
  }, [article]);

  if (!article) return <NotFound />;

  const section = SECTIONS[article.section];
  const more = articlesInSection(article.section)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);
  const body = loaded.slug === article.slug ? loaded.text : '';

  return (
    <>
      <article className="pt-32 md:pt-40 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <Link
              to={section.path}
              className="group inline-flex items-center gap-2 py-2 text-[11px] tracking-[0.2em] uppercase text-slate hover:text-ochre transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" /> {section.eyebrow}
            </Link>
          </Reveal>
          <Reveal delay={1} className="mt-4 flex items-center gap-4 flex-wrap">
            <span className="text-[10px] tracking-[0.25em] uppercase text-ochre font-medium">{article.tag}</span>
            <Dot />
            <span className="text-xs text-slate/70">{formatDate(article.date)}</span>
            <Dot />
            <span className="flex items-center gap-1.5 text-xs text-slate/70">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" /> {article.readTime} min read
            </span>
          </Reveal>
          <Reveal as="h1" delay={2} className="font-display text-4xl md:text-5xl leading-[1.05] text-oxford mt-6 text-balance">
            {article.title}
          </Reveal>
          <Reveal as="p" delay={3} className="mt-6 text-xl leading-relaxed text-slate font-display italic">
            {article.excerpt}
          </Reveal>
          <div className="mt-10 h-px w-full bg-oxford/15" />
        </div>

        <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
          <div className="prose-editorial min-h-[12rem]">
            {/* The text is Markdown, so headings, bold, links and lists typed in the editor all work. */}
            <ReactMarkdown components={MARKDOWN}>{body}</ReactMarkdown>
          </div>
          {article.sourceUrl && (
            <div className="mt-10 pt-6 border-t hairline">
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-oxford border-b border-oxford/30 hover:border-ochre hover:text-ochre transition-colors pb-1"
              >
                View original source ↗
              </a>
            </div>
          )}
        </div>
      </article>

      {more.length > 0 && (
        <section className="py-20 md:py-24 bg-muted/40 border-t hairline">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
            <div className="flex items-baseline justify-between gap-4 mb-10">
              <h2 className="font-display text-2xl md:text-3xl text-oxford">More from {section.eyebrow}</h2>
              <Link to={section.path} className="group inline-flex items-center gap-2 text-sm text-oxford hover:text-ochre transition-colors shrink-0">
                All {section.eyebrow.toLowerCase()}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {more.map((item, i) => (
                <Reveal key={item.slug} delay={i + 1}>
                  <Link
                    to={articleHref(item)}
                    className="group block border hairline bg-background p-7 h-full hover:border-ochre/40 transition-colors duration-500"
                  >
                    <span className="text-[10px] tracking-[0.25em] uppercase text-ochre font-medium">{item.tag}</span>
                    <h3 className="font-display text-xl text-oxford mt-4 leading-snug group-hover:text-ochre transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate line-clamp-2">{item.excerpt}</p>
                    <div className="mt-5 pt-4 border-t hairline text-xs text-slate/70">{formatDate(item.date)}</div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
