import { useEffect, useState } from 'react';
import { getPillars } from '../lib/strapi.js';
import './Pillars.css';

const FALLBACK_PILLARS = [
  {
    title: 'Public Health',
    description: 'HIV/AIDS care, health systems, and universal coverage in low-resource settings.',
    featured: false,
  },
  {
    title: 'Good Governance',
    description: 'Accountability, decentralization, and citizen-centred service delivery.',
    featured: true,
  },
  {
    title: 'Human Rights',
    description: 'Civic space, dignity, and the protection of vulnerable populations.',
    featured: false,
  },
  {
    title: 'Peacebuilding',
    description: 'Reconciliation, social cohesion, and youth engagement in governance.',
    featured: false,
  },
];

export default function Pillars() {
  const [pillars, setPillars] = useState(FALLBACK_PILLARS);

  useEffect(() => {
    let cancelled = false;
    getPillars()
      .then((data) => {
        if (!cancelled && data?.length) setPillars(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="pillars section section--dark">
      <div className="container">
        <p className="eyebrow">Pillars of Impact</p>
        <h2 className="section-heading pillars__title">
          Where clinical practice meets <span className="accent">social justice.</span>
        </h2>
        <hr className="section-rule" />

        <div className="pillars__grid">
          {pillars.map((p, i) => (
            <div key={p.title ?? i} className={'pillar' + (p.featured ? ' is-featured' : '')}>
              <span className="pillar__n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
