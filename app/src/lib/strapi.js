// Small client for the Strapi CMS API. Every function returns Strapi's raw
// `data` payload, or throws — callers are expected to catch and fall back to
// the hardcoded content already in each section (see FALLBACK constants),
// so a slow or offline CMS never breaks the site.

const API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

/** Builds an absolute URL for a Strapi media object (image, file, etc). */
export function mediaUrl(media) {
  const url = media?.url;
  if (!url) return null;
  return url.startsWith('http') ? url : `${API_URL}${url}`;
}

async function fetchAPI(path) {
  const res = await fetch(`${API_URL}/api${path}`);
  if (!res.ok) {
    throw new Error(`Strapi request failed (${res.status}): ${path}`);
  }
  const json = await res.json();
  return json.data;
}

export function getProfile() {
  return fetchAPI('/profile?populate=*');
}

export function getFeaturedArticles() {
  return fetchAPI('/articles?filters[featuredOnHome][$eq]=true&sort=homeOrder:asc');
}

export function getFeaturedMediaAppearances() {
  return fetchAPI(
    '/media-appearances?filters[featuredOnHome][$eq]=true&sort=homeOrder:asc'
  );
}

export function getTimelineEntries() {
  return fetchAPI('/timeline-entries?sort=order:asc');
}

export function getPillars() {
  return fetchAPI('/pillars?sort=order:asc');
}

export function getLibraryItems() {
  return fetchAPI('/library-items?sort=order:asc');
}

export function getArticlesBySection(section) {
  return fetchAPI(`/articles?filters[section][$eq]=${section}&sort=publishDate:desc`);
}

export function getMediaAppearancesBySection(section) {
  return fetchAPI(
    `/media-appearances?filters[section][$eq]=${section}&sort=date:desc`
  );
}
