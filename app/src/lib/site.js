import site from '../content/site.json';

// Contact details, footer text and social links, editable in the content editor.
export const SITE = site;

// `divider: true` draws the thin separator before the item in the desktop menu.
export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Analysis', to: '/analysis' },
  { label: 'Reflections', to: '/reflections' },
  { label: 'Media & Conversations', to: '/media', divider: true },
  { label: 'In the News', to: '/in-the-news' },
  { label: 'From My Library', to: '/library' },
  { label: 'Contact & Engagement', to: '/contact' },
];
