import { Link } from 'react-router-dom';
import './ExploreGrid.css';

const items = [
  {
    n: '01',
    title: 'Insights',
    desc: 'Short commentary on public issues, civic debate, and service delivery.',
    to: '/insights',
  },
  {
    n: '02',
    title: 'Analysis',
    desc: 'In-depth work on systems, law, policy, and governance implementation.',
    to: '/analysis',
    featured: true,
  },
  {
    n: '03',
    title: 'Reflections',
    desc: 'Brief, self-contained ideas and observations drawn from experience.',
    to: '/reflections',
  },
  {
    n: '04',
    title: 'Media & Conversations',
    desc: 'Interviews, panels, and public discussions.',
    to: '/media-conversations',
  },
  {
    n: '05',
    title: 'In the News',
    desc: 'External coverage, profiles, and press stories.',
    to: '/in-the-news',
  },
  {
    n: '06',
    title: 'From My Library',
    desc: 'Books, reports, and intellectual influences.',
    to: '/from-my-library',
  },
];

export default function ExploreGrid() {
  return (
    <section className="explore section">
      <div className="container">
        <p className="eyebrow">Explore the Site</p>
        <h2 className="section-heading">A clearer path to every section.</h2>
        <p className="section-sub">
          The work spans writing, analysis, and public engagement. Each section holds a distinct
          purpose — from short commentary to in-depth policy analysis and the books that shape the
          thinking behind it all.
        </p>

        <div className="explore__grid">
          {items.map((item) => (
            <Link
              key={item.n}
              to={item.to}
              className={'explore-card' + (item.featured ? ' is-featured' : '')}
            >
              <div className="explore-card__top">
                <span className="explore-card__n">{item.n}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
