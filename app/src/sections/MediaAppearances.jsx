import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedMediaAppearances } from '../lib/strapi.js';
import './MediaAppearances.css';

const FALLBACK_APPEARANCES = [
  {
    appearanceType: 'News',
    date: '2019-06-15',
    title: 'Dutch Students Explore the Role of Youth in Peacebuilding',
    excerpt:
      'The opening of a youth peacebuilding exchange was chaired by Dr. Joseph Ryarasa Nkurunziza, Executive…',
  },
  {
    appearanceType: 'News',
    date: '2019-04-06',
    title: 'Trauma Healing Needs to Be at the Centre of Peace and Development Efforts',
    excerpt:
      '25 years after the Genocide against the Tutsi, Dr Joseph Ryarasa Nkurunziza, Executive Director of Never Again…',
  },
  {
    appearanceType: 'Video',
    date: '2018-12-17',
    title: 'Interview with Dr. Joseph Nkurunziza, Executive Director of Never Again Rwanda',
    excerpt:
      'Dr. Joseph Ryarasa Nkurunziza speaks about the vision and mission of Never Again Rwanda, peacebuilding after the…',
  },
];

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function MediaAppearances() {
  const [appearances, setAppearances] = useState(FALLBACK_APPEARANCES);

  useEffect(() => {
    let cancelled = false;
    getFeaturedMediaAppearances()
      .then((data) => {
        if (!cancelled && data?.length) setAppearances(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="appearances section">
      <div className="container">
        <div className="section-head-row">
          <div>
            <p className="eyebrow">Media &amp; Conversations</p>
            <h2 className="section-heading" style={{ marginBottom: 0 }}>
              Recent appearances.
            </h2>
          </div>
          <Link to="/media-conversations" className="link-arrow">
            <span>All appearances</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="appearances__grid">
          {appearances.map((item) => {
            const card = (
              <>
                <div className="appearance-card__meta">
                  <span className={'appearance-card__type type-' + (item.appearanceType || '').toLowerCase()}>
                    {item.appearanceType}
                  </span>
                  <span>{formatDate(item.date)}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </>
            );

            return item.externalUrl ? (
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={item.title}
                className="appearance-card"
              >
                {card}
              </a>
            ) : (
              <Link to="/media-conversations" key={item.title} className="appearance-card">
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
