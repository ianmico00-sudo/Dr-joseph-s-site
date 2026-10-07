import { Link } from 'react-router-dom';
import { NAV, SITE } from '../lib/site.js';

const linkClass = 'text-sm text-background/70 hover:text-ochre transition-colors duration-300';
const badgeClass =
  'w-9 h-9 flex items-center justify-center border border-background/20 text-background/60 text-xs hover:border-ochre hover:text-ochre transition-colors duration-300';

export default function Footer() {
  return (
    <footer className="bg-oxford text-background mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="font-display text-2xl text-background">{SITE.name}</div>
            <div className="mt-1 text-[11px] tracking-[0.25em] uppercase text-background/50">{SITE.tagline}</div>
            <p className="mt-6 text-sm leading-relaxed text-background/70 max-w-md">{SITE.summary}</p>
          </div>

          <div className="md:col-span-4">
            <div className="text-[11px] tracking-[0.25em] uppercase text-background/40 mb-5">Explore</div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-[11px] tracking-[0.25em] uppercase text-background/40 mb-5">Connect</div>
            <div className="flex flex-col gap-2.5">
              <a href={`mailto:${SITE.email}`} className={linkClass}>
                {SITE.email}
              </a>
              <Link to="/contact" className={linkClass}>
                Speaking &amp; media inquiries
              </Link>
            </div>
            <div className="flex gap-3 mt-6">
              {SITE.socials.map((s) =>
                s.url ? (
                  <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} className={badgeClass}>
                    {s.label}
                  </a>
                ) : (
                  <span key={s.name} title={s.name} className={badgeClass}>
                    {s.label}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-background/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-xs text-background/40">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </div>
          <div className="text-xs text-background/40">{SITE.footerNote}</div>
        </div>
      </div>
    </footer>
  );
}
