import media from '../content/media.json';
import library from '../content/library.json';

// type: 'video' | 'appearance' | 'social' | 'news'
export const MEDIA = media.items;
export const LIBRARY = library.items;

// Newest first; undated items keep their listed order at the end.
const byDateDesc = (a, b) => (b.date || '').localeCompare(a.date || '');

export const mediaOfType = (type) => MEDIA.filter((m) => m.type === type);
export const newsItems = () => mediaOfType('news').sort(byDateDesc);
export const recentAppearances = (count = 3) =>
  MEDIA.filter((m) => m.date)
    .sort(byDateDesc)
    .slice(0, count);
