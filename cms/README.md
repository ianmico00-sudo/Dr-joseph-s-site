# Never Again Rwanda ED site — CMS (Strapi)

Headless CMS for Dr. Joseph Ryarasa Nkurunziza's personal website. The React frontend
(in the sibling `app/` folder) reads content from here over the REST API.

See **`../DEPLOYMENT.md`** for the full Strapi Cloud + frontend deployment guide.

## Content types

- **Profile** (single type) — hero copy, bio ("The Bridge"), CTA text, contact email,
  social links, and the three homepage photos (portrait, community photo, Kigali dusk).
- **Article** — Insights / Analysis / Reflections posts, including which ones are
  featured on the homepage.
- **Media Appearance** — News / Video / Podcast / Interview entries for Media &
  Conversations / In the News.
- **Timeline Entry** — the career "Impact Journey" timeline.
- **Pillar** — the four Pillars of Impact.
- **Library Item** — books/reports for "From My Library" (schema only, not seeded with
  content yet).

## Running locally

```bash
npm install
npm run develop     # starts Strapi with the admin panel at http://localhost:1337/admin
```

On first run, a bootstrap script (`src/index.js`) seeds all of the above from the
approved homepage content and opens public read (`find`/`findOne`) access so the
frontend can fetch it without authentication. It only seeds once — it checks for
existing content first, so it won't duplicate data on later restarts.

Uses SQLite locally (`.tmp/data.db`, gitignored). Strapi Cloud provisions its own
managed Postgres automatically on deploy — nothing here needs to change for that.

## CORS

`config/middlewares.js` restricts the API to the origins listed in the `CORS_ORIGINS`
environment variable (defaults to the local Vite dev server, `http://localhost:5173`).
When deploying, set `CORS_ORIGINS` to the deployed frontend's URL — see
`../DEPLOYMENT.md`.
