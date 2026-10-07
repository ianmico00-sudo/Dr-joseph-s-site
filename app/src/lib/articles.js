import articles from 'virtual:articles';
import pages from '../content/pages.json';

// All articles, newest first. Each one is a file in src/content/articles;
// the file name is the article's address (/articles/<file name>).
export const ARTICLES = articles;

export const SECTIONS = {
  insights: { path: '/insights', ...pages.insights },
  analysis: { path: '/analysis', ...pages.analysis },
  reflections: { path: '/reflections', ...pages.reflections },
};

export const articleHref = (article) => `/articles/${article.slug}`;
export const articlesInSection = (section) => ARTICLES.filter((a) => a.section === section);
export const findArticle = (slug) => ARTICLES.find((a) => a.slug === slug) ?? null;

// Article files are fetched one at a time, only when an article is opened.
const files = import.meta.glob('../content/articles/*.md', { query: '?raw', import: 'default' });

export async function loadArticleBody(slug) {
  const load = files[`../content/articles/${slug}.md`];
  if (!load) return '';
  const raw = await load();
  // Drop the heading block between the two "---" lines; the rest is the article text.
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim();
}
