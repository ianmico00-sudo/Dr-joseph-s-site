import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext.jsx';
import './Hero.css';

function RoleRotator({ roles }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!roles.length) return undefined;
    const interval = setInterval(() => {
      setFade(false);
      const timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length);
        setFade(true);
      }, 260);
      return () => clearTimeout(timeout);
    }, 2600);
    return () => clearInterval(interval);
  }, [roles]);

  if (!roles.length) return null;

  return (
    <p className="hero__role">
      <span className="hero__role-dot" aria-hidden="true" />
      <span className={'hero__role-text' + (fade ? ' is-visible' : '')}>{roles[index]}</span>
    </p>
  );
}

export default function Hero() {
  const { profile } = useProfile();
  const roles = Array.isArray(profile.roles) ? profile.roles : [];

  return (
    <section className="hero dot-grid-bg">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">{profile.heroEyebrow}</p>

          <h1 className="hero__title">
            <span className="hero__title-navy">{profile.heroTitleLine1}</span>
            <span className="hero__title-accent">{profile.heroTitleAccent}</span>
          </h1>

          <RoleRotator roles={roles} />

          <p className="hero__lede">{profile.heroLede}</p>

          <div className="hero__actions">
            <Link to="/about" className="btn btn-primary">
              View Full Profile
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link to="/contact" className="btn btn-text">
              Get In Touch
            </Link>
          </div>
        </div>

        <div className="hero__media">
          <div className="hero__photo-frame">
            <img src={profile.portraitUrl} alt="Portrait of Dr. Joseph Ryarasa Nkurunziza" />
            <div className="hero__caption">Kigali &middot; Rwanda</div>
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
