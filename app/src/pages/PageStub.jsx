import { Link } from 'react-router-dom';
import './PageStub.css';

export default function PageStub({ eyebrow, title, description, note }) {
  return (
    <section className="page-stub dot-grid-bg">
      <div className="container page-stub__inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="section-heading page-stub__title">{title}</h1>
        <hr className="section-rule" />
        <p className="section-sub page-stub__desc">{description}</p>
        {note && <p className="page-stub__note">{note}</p>}
        <Link to="/" className="link-arrow page-stub__back">
          <span>Back to home</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
