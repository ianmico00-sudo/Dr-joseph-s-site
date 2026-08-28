import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedArticles } from '../lib/strapi.js';
import './FeaturedWritings.css';

const FALLBACK_ARTICLES = [
  {
    tag: 'Economy',
    section: 'insights',
    title: 'The National Budget Has Been Approved: Now Citizens Must Demand Accountability',
    excerpt:
      'Every year citizens closely follow the national budget. Once approved, the real test begins: holding institutions accountable for translating allocations in…',
    publishDate: '2026-07-10',
    readTime: '3 min',
  },
  {
    tag: 'Memory & Justice',
    section: 'reflections',
    title: 'Healing Requires Conversation: Breaking the Silence Responsibly',
    excerpt:
      'Healing is not a one time event; it is a continuous process. Silence alone cannot sustain it. Responsible conversation, grounded in respect and a shared…',
    publishDate: '2026-04-15',
    readTime: '5 min',
  },
  {
    tag: 'Memory & Justice',
    section: 'reflections',
    title: 'When Labels Become Dangerous: Lessons from Rwanda 32 Years Later',
    excerpt:
      'Hatred is neither natural nor inevitable; it is a learned behavior. Because it is learned, it can be unlearned. If hatred is built brick by brick, then unity is built th…',
    publishDate: '2026-04-08',
    readTime: '4 min',
  },
];

const SECTION_PATH = {
  insights: '/insights',
  analysis: '/analysis',
  reflections: '/reflections',
};

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function FeaturedWritings() {
  const [articles, setArticles] = useState(FALLBACK_ARTICLES);

  useEffect(() => {
    let cancelled = false;
    getFeaturedArticles()
      .then((data) => {
        if (!cancelled && data?.length) setArticles(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="writings section">
      <div className="container">
        <div className="section-head-row">
          <div>
            <p className="eyebrow">Featured Writings</p>
            <h2 className="section-heading" style={{ marginBottom: 0 }}>
              Selected pieces.
            </h2>
          </div>
          <Link to="/insights" className="link-arrow">
            <span>View all writings</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="writings__grid">
          {articles.map((a) => (
            <Link
              to={SECTION_PATH[a.section] || '/insights'}
              key={a.title}
              className="writing-card"
            >
              <p className="writing-card__tag">{a.tag}</p>
              <h3>{a.title}</h3>
              <p className="writing-card__excerpt">{a.excerpt}</p>
              <div className="writing-card__meta">
                <span>{formatDate(a.publishDate)}</span>
                <span className="writing-card__time">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                  {a.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
