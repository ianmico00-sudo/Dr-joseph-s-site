import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV, SITE } from '../lib/site.js';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the mobile menu is open, stop the page scrolling behind it.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
          scrolled ? 'bg-background/85 backdrop-blur-md hairline' : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="group flex items-center gap-3">
              <span className="block w-8 h-px bg-oxford/40 group-hover:bg-ochre transition-colors duration-500" />
              <span className="font-display text-[15px] tracking-tight text-oxford leading-none">
                Dr. Joseph Ryarasa
                <span className="block text-[10px] font-body font-medium tracking-[0.2em] uppercase text-slate mt-1">
                  Nkurunziza
                </span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-7" aria-label="Main">
              {NAV.map((item) => (
                <span key={item.to} className="contents">
                  {item.divider && <span className="w-px h-4 bg-oxford/15" aria-hidden="true" />}
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `relative text-[12px] font-medium tracking-wide transition-colors duration-300 ${
                        isActive ? 'text-ochre' : 'text-oxford/80 hover:text-oxford'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </span>
              ))}
            </nav>

            <button
              type="button"
              className="lg:hidden flex items-center gap-2 text-oxford min-h-[44px]"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase">Menu</span>
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: slides in from the right over a dimmed page */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${open ? 'visible' : 'invisible'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-oxford/40 backdrop-blur-sm transition-opacity duration-500 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[88%] max-w-md bg-background shadow-2xl flex flex-col overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between h-20 px-6 border-b hairline shrink-0">
            <span className="font-display text-sm text-oxford">Pillars of Impact</span>
            <button
              type="button"
              aria-label="Close menu"
              className="text-oxford w-11 h-11 flex items-center justify-center -mr-3"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-4" aria-label="Mobile">
            {NAV.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `group flex items-baseline gap-4 py-4 border-b hairline transition-colors duration-300 ${
                    isActive ? 'text-ochre' : 'text-oxford hover:text-ochre'
                  }`
                }
              >
                <span className="font-mono text-[10px] text-slate/60 w-6">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-2xl leading-tight">{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="px-6 py-8 mt-auto">
            <p className="text-xs text-slate leading-relaxed">
              {SITE.menuNote}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
