import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const primaryLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/insights', label: 'Insights' },
  { to: '/analysis', label: 'Analysis' },
  { to: '/reflections', label: 'Reflections' },
];

const secondaryLinks = [
  { to: '/media-conversations', label: 'Media & Conversations' },
  { to: '/in-the-news', label: 'In the News' },
  { to: '/from-my-library', label: 'From My Library' },
  { to: '/contact', label: 'Contact & Engagement' },
];

function NavGroup({ links, onNavigate }) {
  return (
    <ul className="nav-group">
      {links.map((link) => (
        <li key={link.to}>
          <NavLink
            to={link.to}
            end={link.to === '/'}
            onClick={onNavigate}
            className={({ isActive }) => 'nav-link' + (isActive ? ' is-active' : '')}
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <NavLink to="/" className="brand" onClick={close} aria-label="Dr. Joseph Ryarasa Nkurunziza — Home">
          <span className="brand__rule" aria-hidden="true" />
          <span className="brand__name">
            <span className="brand__first">Dr. Joseph Ryarasa</span>
            <span className="brand__last">Nkurunziza</span>
          </span>
        </NavLink>

        <nav className="site-nav" aria-label="Primary">
          <NavGroup links={primaryLinks} />
          <span className="nav-divider" aria-hidden="true" />
          <NavGroup links={secondaryLinks} />
        </nav>

        <button
          type="button"
          className={'nav-toggle' + (open ? ' is-open' : '')}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={'mobile-nav' + (open ? ' is-open' : '')}>
        <div className="container">
          <NavGroup links={primaryLinks} onNavigate={close} />
          <span className="mobile-nav__divider" aria-hidden="true" />
          <NavGroup links={secondaryLinks} onNavigate={close} />
        </div>
      </div>
    </header>
  );
}
