import { ArrowUpRight, MessageCircle, Play, Users } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { mediaOfType } from '../lib/media.js';
import pages from '../content/pages.json';
import { formatDate } from '../lib/format.js';

const CONTAINER = 'max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16';
const stagger = (i) => (i % 3) + 1;

function GroupTitle({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <Icon className="w-5 h-5 text-ochre" aria-hidden="true" />
      <h2 className="text-[11px] tracking-[0.3em] uppercase text-slate font-medium">{children}</h2>
    </div>
  );
}

export default function Media() {
  const videos = mediaOfType('video');
  const appearances = mediaOfType('appearance');
  const social = mediaOfType('social');

  return (
    <>
      <PageHero {...pages.media} />

      <section className="pb-20 bg-background">
        <div className={CONTAINER}>
          <GroupTitle icon={Play}>Videos</GroupTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {videos.map((item, i) => (
              <Reveal key={item.sourceUrl} delay={stagger(i)}>
                <div className="border hairline bg-card overflow-hidden h-full">
                  <div className="aspect-video bg-oxford">
                    <iframe
                      src={item.embedUrl}
                      title={item.title}
                      className="w-full h-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-7">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-ochre font-medium">{item.outlet}</span>
                    <h3 className="font-display text-xl text-oxford mt-2 leading-snug">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate">{item.description}</p>
                    <div className="mt-5 pt-4 border-t hairline flex items-center justify-between">
                      <span className="text-xs text-slate/70">{formatDate(item.date)}</span>
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-oxford/70 hover:text-ochre transition-colors inline-flex items-center gap-1 py-2"
                      >
                        Watch <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-muted/40 border-y hairline">
        <div className={CONTAINER}>
          <GroupTitle icon={Users}>Appearances &amp; Conversations</GroupTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appearances.map((item, i) => (
              <Reveal key={item.sourceUrl} delay={stagger(i)}>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col border hairline bg-background p-7 h-full hover:border-ochre/40 transition-colors duration-500"
                >
                  <div className="flex items-center justify-between mb-6">
                    <Users className="w-5 h-5 text-ochre" aria-hidden="true" />
                    <span className="text-[10px] tracking-[0.25em] uppercase text-slate/70">{item.category}</span>
                  </div>
                  <h3 className="font-display text-xl text-oxford leading-snug group-hover:text-ochre transition-colors">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate flex-1">{item.description}</p>
                  <div className="mt-6 pt-5 border-t hairline flex items-center justify-between gap-4">
                    <span className="text-xs text-slate/70">{formatDate(item.date)}</span>
                    <span className="text-xs text-oxford/70 text-right">{item.outlet}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-background">
        <div className={CONTAINER}>
          <GroupTitle icon={MessageCircle}>Social Posts</GroupTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {social.map((item, i) => (
              <Reveal key={item.sourceUrl} delay={stagger(i)}>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col border hairline bg-card p-7 h-full hover:border-ochre/40 transition-colors duration-500"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-ochre font-medium">{item.platform}</span>
                  </div>
                  <h3 className="font-display text-lg text-oxford leading-snug group-hover:text-ochre transition-colors">{item.title}</h3>
                  <div className="mt-3 flex-1">
                    <p className="text-sm leading-relaxed text-slate line-clamp-4">{item.description}</p>
                  </div>
                  <div className="mt-5 pt-4 border-t hairline flex items-center gap-1 text-xs text-oxford/70 group-hover:text-ochre transition-colors">
                    View post <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
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
