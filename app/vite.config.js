import fs from 'node:fs';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import matter from 'gray-matter';
import { defineConfig } from 'vite';

const ARTICLES_DIR = path.resolve('src/content/articles');

// Reads the heading block (title, date, section…) of every article file and
// exposes the list to the app as `virtual:articles`. The article text itself is
// loaded separately, only when an article is opened.
function articlesIndex() {
  const id = 'virtual:articles';
  const resolved = '\0' + id;
  return {
    name: 'articles-index',
    resolveId: (source) => (source === id ? resolved : null),
    load(loadId) {
      if (loadId !== resolved) return null;
      const list = fs
        .readdirSync(ARTICLES_DIR)
        .filter((file) => file.endsWith('.md'))
        .map((file) => {
          const full = path.join(ARTICLES_DIR, file);
          this.addWatchFile(full);
          const { data } = matter(fs.readFileSync(full, 'utf8'));
          // An unquoted date in the file is read as a Date; keep only YYYY-MM-DD.
          const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date || '').slice(0, 10);
          return {
            slug: file.replace(/\.md$/, ''),
            title: data.title || '',
            excerpt: data.excerpt || '',
            date,
            section: data.section || 'insights',
            tag: data.tag || '',
            readTime: Number(data.readTime) || 1,
            sourceUrl: data.sourceUrl || null,
          };
        })
        .sort((a, b) => b.date.localeCompare(a.date));
      return `export default ${JSON.stringify(list)};`;
    },
    // Reload the list when an article is added, removed or edited during development.
    configureServer(server) {
      const refresh = (file) => {
        if (!file.startsWith(ARTICLES_DIR)) return;
        const mod = server.moduleGraph.getModuleById(resolved);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', refresh).on('unlink', refresh).on('change', refresh);
    },
  };
}

// Copies the content editor (Sveltia CMS) from node_modules into public/admin,
// so the /admin page is served from this site and not from an outside CDN.
function contentEditor() {
  return {
    name: 'content-editor',
    buildStart() {
      const from = path.resolve('node_modules/@sveltia/cms/dist');
      const to = path.resolve('public/admin');
      fs.mkdirSync(path.join(to, 'chunks'), { recursive: true });
      fs.copyFileSync(path.join(from, 'sveltia-cms.js'), path.join(to, 'sveltia-cms.js'));
      for (const file of fs.readdirSync(path.join(from, 'chunks'))) {
        if (file.endsWith('.js')) fs.copyFileSync(path.join(from, 'chunks', file), path.join(to, 'chunks', file));
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), articlesIndex(), contentEditor()],
});
