import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext.jsx';
import './ContactCta.css';

export default function ContactCta() {
  const { profile } = useProfile();

  return (
    <section className="cta" style={{ backgroundImage: `url(${profile.kigaliPhotoUrl})` }}>
      <div className="cta__overlay" />
      <div className="container cta__content">
        <p className="eyebrow">Contact &amp; Engagement</p>
        <h2 className="cta__title">{profile.ctaTitle}</h2>
        <p className="cta__sub">{profile.ctaSub}</p>
        <Link to="/contact" className="btn btn-accent">
          Send a Message
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
