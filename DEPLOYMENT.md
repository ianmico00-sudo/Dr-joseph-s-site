# Deployment guide — Render (CMS) + Vercel/Netlify (frontend)

This project has two halves that deploy separately:

- **`cms/`** — the Strapi CMS. Deploys to **Render.com** (free web service + free Postgres).
- **`app/`** — the React (Vite) website. Deploys to **Vercel** or **Netlify** (steps for both are included; pick one).

> Note: this guide originally targeted Strapi Cloud, but Strapi removed their free plan/trial in August 2026 (paid plans now start around $29–35/month). Render.com's free tier is used instead — genuinely free, no credit card required. The trade-off, covered in step 1, is that Render's free Postgres database expires 30 days after creation and needs recreating — fine for UAT, worth knowing about upfront.

The two deploys need to happen in this order, because the frontend needs to know the CMS's URL, and the CMS needs to know the frontend's URL:

1. Push both folders to Git
2. Deploy `cms/` to Render → get its URL
3. Deploy `app/` to Vercel/Netlify, pointed at that URL → get its URL
4. Go back and tell Render to trust that frontend URL (CORS)

---

## 0. Push the code to a Git repository

Both platforms deploy from Git (GitHub, GitLab, or Bitbucket).

```bash
cd joseph-site
git init
git add .
git commit -m "Initial site: React frontend + Strapi CMS"
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

You can keep `app/` and `cms/` in one repo — both Render and Vercel/Netlify let you point a deployment at a subfolder of a repo, so one repo works fine.

A `.gitignore` should already exclude `node_modules/`, `.env`, and `cms/.tmp/` (the local SQLite database file) — double check those aren't committed.

---

## 1. Deploy the CMS to Render

### 1a. Create the free Postgres database first

Render's free web services have no persistent disk — any local file (including a SQLite database) gets wiped on every restart or redeploy — so the CMS needs a real database, not SQLite, once it's on Render. Render's free Postgres covers this.

1. Go to **render.com** and sign up (GitHub login is fastest).
2. **New → PostgreSQL**. Give it a name (e.g. `joseph-site-db`), pick the **Free** plan, choose a region.
3. Once it's created, open it and find the **Internal Database URL** (starts with `postgres://...`) — copy it, you'll paste it into the web service's environment variables next. Use the *internal* URL, not the external one — it's faster and doesn't count against any external bandwidth limits, since both services will live in the same Render account/region.
4. **Know this going in:** Render's free Postgres expires 30 days after creation (with a 14-day grace period to upgrade before it's actually deleted). For an ongoing UAT period longer than that, plan to either recreate the database (re-running the seed step below repopulates the standard content, though any edits you made by hand in the Strapi admin in the meantime would need to be re-entered) or upgrade that one piece to a paid Postgres instance when you're ready. I can walk you through either when the time comes.

### 1b. Create the web service

1. **New → Web Service**, connect your GitHub repo.
2. **Root Directory**: `cms`
3. **Runtime**: Node
4. **Build Command**: `npm install && npm run build`
5. **Start Command**: `npm run start`
6. **Instance Type**: Free

### 1c. Set environment variables

Under the web service's **Environment** tab, add these. The secret values below were freshly generated for this deployment (not the same ones used in local dev) — copy them exactly as shown, they're meant to be pasted in as-is:

```
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_URL=<paste the Internal Database URL from step 1a>
DATABASE_SSL=false
APP_KEYS=UCJZ7V4uqRKFaSDs0YMyqg==,OAv9lBJwG462vTZuWA2V/Q==,mLiOa7B4ENMcJ4sRGv+org==,yD+HkZpOtvIzLxT0IqYYfQ==
API_TOKEN_SALT=EVaYeVjVpUeXZRqBcrnpdg==
ADMIN_JWT_SECRET=i+dKFpYZPuHl57WmAXuhfw==
JWT_SECRET=KtFAosq3YFo70TjOAk/qkg==
TRANSFER_TOKEN_SALT=X/2DKchriS1jhpUF2jN4BA==
ENCRYPTION_KEY=OyqjHKvTis1UuRukdDkSqA==
CORS_ORIGINS=http://localhost:5173
```

(`DATABASE_SSL=false` is correct for Render's *internal* database URL within the same region; leave it as-is unless Render's dashboard tells you otherwise. `CORS_ORIGINS` gets updated to your real frontend URL in step 3 below — leave the placeholder for now so the first deploy succeeds.)

### 1d. Deploy

Click **Create Web Service**. The first build takes a few minutes — it's installing dependencies, building the admin panel, and on first boot the bootstrap script seeds the profile, articles, media appearances, timeline, and pillars automatically, and opens public read access for the frontend.

When it's done, Render gives you a URL like:
```
https://joseph-site-cms.onrender.com
```
Save this — the frontend needs it in step 2. Open `<that-url>/admin` and create your first administrator account (name, email, password) — this is your CMS login, separate from any site visitor.

**Cold start note:** free web services spin down after 15 minutes of no traffic and take about a minute to wake back up on the next request. The first load after idle time will feel slow — that's normal for the free tier, not a bug.

**Verify the seed worked:** check that Article, Media Appearance, Timeline Entry, Pillar, and Profile all show content in the admin panel. If any look empty, open the Render service's **Logs** tab and look for a line starting `[seed] ... failed:` and send it to me.

---

## 2. Deploy the frontend to Vercel (or Netlify)

### Option A — Vercel

1. Go to **vercel.com** and sign up (GitHub login again is easiest).
2. **Add New → Project**, import your repository, and set the **Root Directory** to **`app`**.
3. Vercel auto-detects Vite; the defaults (`npm run build`, output directory `dist`) are correct — leave them.
4. Before deploying, add one **Environment Variable**:
   - `VITE_STRAPI_URL` = the Render URL from step 1 (e.g. `https://joseph-site-cms.onrender.com`)
5. Deploy. Vercel gives you a URL like `https://joseph-nkurunziza.vercel.app`.
6. Client-side routing is already handled — `app/vercel.json` tells Vercel to serve `index.html` for every route, so `/about`, `/contact`, etc. all work on refresh and direct load, not just when navigated to from the homepage.

### Option B — Netlify

1. Go to **netlify.com** and sign up.
2. **Add new site → Import an existing project**, connect your repository, set **Base directory** to **`app`**, build command `npm run build`, publish directory `app/dist` (Netlify may write this as `dist` once the base directory is set).
3. Under **Site settings → Environment variables**, add:
   - `VITE_STRAPI_URL` = your Render URL
4. Deploy. Netlify gives you a URL like `https://joseph-nkurunziza.netlify.app`.
5. Client-side routing is already handled — `app/public/_redirects` tells Netlify to serve `index.html` for every route, the same way `vercel.json` does for Vercel.

You only need one of these, not both.

---

## 3. Connect the two: allow the frontend's origin in Render's CORS

Strapi (in `cms/config/middlewares.js`) only accepts API requests from origins listed in the `CORS_ORIGINS` environment variable — currently just the placeholder from step 1c. Once your frontend has a real URL:

1. In Render, open the web service → **Environment** tab.
2. Update `CORS_ORIGINS` to your deployed frontend URL, e.g. `https://joseph-nkurunziza.vercel.app`
   - Multiple origins (e.g. a Vercel preview plus a custom domain later) go comma-separated: `https://joseph-nkurunziza.vercel.app,https://josephnkurunziza.org`
3. Save — Render redeploys automatically when an environment variable changes.

Without this step, the deployed frontend still works — it silently falls back to its built-in placeholder content if it can't reach the CMS — but it won't be pulling live content from Strapi until the CORS origin matches.

---

## 4. Verify

1. Open the deployed frontend URL. The homepage should load with the same content currently visible locally.
2. Open your browser's dev tools → Network tab, reload, and confirm requests to `<render-url>/api/...` return `200`, not blocked by a CORS error in the console. (If the CMS had been idle, the very first load may take up to a minute while it wakes up — reload once if the content looks stuck on the fallback.)
3. In the Render-hosted Strapi admin panel, edit a piece of content, save and **publish**, then reload the live frontend — the change should appear within a few seconds.

---

## Custom domains (optional, later)

Both Render and Vercel/Netlify support attaching a custom domain once you're ready to move from UAT to a public URL — a DNS change in each platform's dashboard, no code changes needed. Update `CORS_ORIGINS` in Render to include the new custom domain too when you do.

## What "UAT" means for this setup

A fully working, privately-hosted preview of the site that you (and anyone you share the URL with) can click through and test, with content you can edit yourself in the Strapi admin — no code changes needed. It runs on genuinely free infrastructure with two known trade-offs: a ~1 minute wake-up after 15 minutes idle, and the CMS database needing a refresh every 30 days. Both are fine for testing; when you're ready for a public production launch, upgrading Render's Postgres to a paid tier (or moving back to a paid Strapi Cloud/other host) removes both limits — that's a config change, not a rebuild.
