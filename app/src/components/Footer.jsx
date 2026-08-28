import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext.jsx';
import './Footer.css';

const exploreColA = [
  { to: '/', label: 'Home' },
  { to: '/insights', label: 'Insights' },
  { to: '/reflections', label: 'Reflections' },
  { to: '/in-the-news', label: 'In the News' },
  { to: '/contact', label: 'Contact & Engagement' },
];

const exploreColB = [
  { to: '/about', label: 'About' },
  { to: '/analysis', label: 'Analysis' },
  { to: '/media-conversations', label: 'Media & Conversations' },
  { to: '/from-my-library', label: 'From My Library' },
];

export default function Footer() {
  const { profile } = useProfile();
  const year = new Date().getFullYear();

  const socials = [
    { label: 'in', name: 'LinkedIn', href: profile.socialLinkedin || '#' },
    { label: 'X', name: 'X (Twitter)', href: profile.socialX || '#' },
    { label: 'RG', name: 'ResearchGate', href: profile.socialResearchGate || '#' },
    { label: 'GS', name: 'Google Scholar', href: profile.socialGoogleScholar || '#' },
  ];

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="footer-about">
          <h3>Dr. Joseph Ryarasa Nkurunziza</h3>
          <p className="footer-about__title">MD · Public Health · Human Rights</p>
          <p className="footer-about__bio">
            Medical doctor and public health practitioner bridging healthcare and social
            justice. Executive Director, Never Again Rwanda.
          </p>
        </div>

        <div className="footer-explore">
          <p className="footer-heading">Explore</p>
          <div className="footer-explore__cols">
            <ul>
              {exploreColA.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <ul>
              {exploreColB.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-connect">
          <p className="footer-heading">Connect</p>
          <a className="footer-email" href={`mailto:${profile.contactEmail}`}>
            {profile.contactEmail}
          </a>
          <p className="footer-connect__note">Speaking &amp; media inquiries</p>
          <ul className="footer-socials">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} aria-label={s.name} title={s.name}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>© {year} Dr. Joseph Ryarasa Nkurunziza. All rights reserved.</p>
          <p className="footer-credit">Designed with intention · Kigali, Rwanda</p>
        </div>
      </div>
    </footer>
  );
}
