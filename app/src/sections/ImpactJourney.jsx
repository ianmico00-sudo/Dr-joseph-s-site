import { useEffect, useState } from 'react';
import { useProfile } from '../context/ProfileContext.jsx';
import { getTimelineEntries } from '../lib/strapi.js';
import './ImpactJourney.css';

const FALLBACK_TIMELINE = [
  {
    tag: 'Medical Degree',
    title: 'National University of Rwanda — MD',
    description:
      'Graduated as a medical doctor, followed by postgraduate training in public health and HIV/AIDS care at the University of Roehampton, Antwerp, and UC San Diego.',
  },
  {
    tag: '2002 — Present',
    title: 'Co-founder & Executive Director, Never Again Rwanda',
    description:
      'A peacebuilding and social justice organization founded in response to the 1994 Genocide against the Tutsi.',
  },
  {
    tag: '2008 — 2016',
    title: 'Clinical Leadership',
    description:
      'HIV clinician at the Rwanda Military Hospital; Clinical Service Director, Drew Cares International; Clinical Services Specialist, DoD HIV/AIDS Prevention Program & US Embassy Rwanda; Health Coordinator, Earth Institute (Columbia University) Millennium Village Project.',
  },
  {
    tag: '2010',
    title: 'JCI TOYP Award — Osaka, Japan',
    description:
      'Named one of the Ten Most Outstanding Young Persons of the World by Junior Chambers International.',
  },
];

export default function ImpactJourney() {
  const { profile } = useProfile();
  const [timeline, setTimeline] = useState(FALLBACK_TIMELINE);

  useEffect(() => {
    let cancelled = false;
    getTimelineEntries()
      .then((data) => {
        if (!cancelled && data?.length) setTimeline(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="journey section">
      <div className="container">
        <p className="eyebrow">Impact Journey</p>
        <h2 className="section-heading">A career of synthesis.</h2>
        <p className="section-sub">
          The path from medical degree to governance leadership — and the realisation that health
          inequities cannot be solved in the clinic alone.
        </p>

        <div className="journey__grid">
          <div className="journey__photo">
            <img src={profile.communityPhotoUrl} alt="Community engagement session under a tree in rural Rwanda" />
          </div>

          <ol className="journey__timeline">
            {timeline.map((item) => (
              <li key={item.title}>
                <span className="journey__dot" aria-hidden="true" />
                <p className="journey__tag">{item.tag}</p>
                <h3>{item.title}</h3>
                <p className="journey__desc">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
