# Deployment guide — Strapi Cloud + Vercel/Netlify

This project has two halves that deploy separately:

- **`cms/`** — the Strapi CMS. Deploys to **Strapi Cloud**.
- **`app/`** — the React (Vite) website. Deploys to **Vercel** or **Netlify** (steps for both are included; pick one).

Both platforms have free tiers suitable for a UAT environment. You'll need to create the accounts yourself — I can't do that on your behalf — but everything in the code is already set up to plug in once you have them. This should take about 20–30 minutes end to end.

The two deploys need to happen in this order, because the frontend needs to know the CMS's URL, and the CMS needs to know the frontend's URL:

1. Push both folders to Git
2. Deploy `cms/` to Strapi Cloud → get its URL
3. Deploy `app/` to Vercel/Netlify, pointed at that URL → get its URL
4. Go back and tell Strapi Cloud to trust that frontend URL (CORS)

---

## 0. Push the code to a Git repository

Both platforms deploy from Git (GitHub, GitLab, or Bitbucket). If this project isn't already in a repo:

```bash
cd joseph-site
git init
git add .
git commit -m "Initial site: React frontend + Strapi CMS"
```

Create an empty repository on GitHub (or GitLab), then:

```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

You can keep `app/` and `cms/` in one repo (as they are now) — both Strapi Cloud and Vercel/Netlify let you point a deployment at a subfolder of a repo, so one repo works fine. If you'd rather split them into two repos, that works too; nothing in the code assumes one repo.

A `.gitignore` should already exclude `node_modules/`, `.env`, and `cms/.tmp/` (the local SQLite database file) — double check those aren't committed, since `.env` holds local secrets and the SQLite file is just local dev data that Strapi Cloud won't use anyway.

---

## 1. Deploy the CMS to Strapi Cloud

1. Go to **strapi.io/cloud** and sign up (GitHub login is the fastest route since your code is already on GitHub).
2. Click **Create project**, connect your Git repository, and when asked for the project's root directory, point it at **`cms`** (not the repo root, since `cms/` is a subfolder).
3. Strapi Cloud auto-detects the framework and will offer a **free/trial plan** — that's fine for UAT. It will provision its own **managed Postgres database** automatically; you don't need to configure the SQLite settings from local dev at all, Strapi Cloud replaces that.
4. Deploy. The first build takes a few minutes. When it's done, Strapi Cloud gives you a URL that looks like:
   ```
   https://joseph-nkurunziza-xxxxx.strapiapp.com
   ```
   Save this URL — the frontend needs it in step 2, and you'll use it to reach the admin panel at `<that-url>/admin`.
5. Open `<that-url>/admin` and create your first administrator account (name, email, password) — this is the CMS login for editing content, separate from any site visitor.
6. **Re-seed check:** the bootstrap script in `cms/src/index.js` seeds the profile, articles, media appearances, timeline, and pillars automatically the first time the CMS starts with an empty database — Strapi Cloud's first boot will run this the same way it ran locally, so you should see the existing content already in the admin panel. If any collection looks empty, check the Strapi Cloud deploy logs for a `[seed] ... failed:` line and let me know.
7. **Public read permissions:** the seed script also opens public `find`/`findOne` access for all six content types automatically. Double check under **Settings → Users & Permissions → Roles → Public** that Article, Media Appearance, Timeline Entry, Pillar, Library Item, and Profile all have `find`/`findOne` checked — if the seed step failed for any reason, this is the one thing worth setting by hand.

---

## 2. Deploy the frontend to Vercel (or Netlify)

### Option A — Vercel

1. Go to **vercel.com** and sign up (GitHub login again is easiest).
2. **Add New → Project**, import your repository, and set the **Root Directory** to **`app`**.
3. Vercel auto-detects Vite; the defaults (`npm run build`, output directory `dist`) are correct — leave them.
4. Before deploying, add one **Environment Variable**:
   - `VITE_STRAPI_URL` = the Strapi Cloud URL from step 1 (e.g. `https://joseph-nkurunziza-xxxxx.strapiapp.com`)
5. Deploy. Vercel gives you a URL like `https://joseph-nkurunziza.vercel.app`.
6. Client-side routing is already handled — `app/vercel.json` tells Vercel to serve `index.html` for every route, so `/about`, `/contact`, etc. all work on refresh and direct load, not just when navigated to from the homepage.

### Option B — Netlify

1. Go to **netlify.com** and sign up.
2. **Add new site → Import an existing project**, connect your repository, set **Base directory** to **`app`**, build command `npm run build`, publish directory `app/dist` (Netlify may write this as `dist` once the base directory is set).
3. Under **Site settings → Environment variables**, add:
   - `VITE_STRAPI_URL` = your Strapi Cloud URL
4. Deploy. Netlify gives you a URL like `https://joseph-nkurunziza.netlify.app`.
5. Client-side routing is already handled — `app/public/_redirects` tells Netlify to serve `index.html` for every route, the same way `vercel.json` does for Vercel.

You only need one of these, not both — pick whichever you're more comfortable with. Vercel and Netlify are very similar; this doesn't need to be a hard decision.

---

## 3. Connect the two: allow the frontend's origin in Strapi's CORS

Right now Strapi is configured (in `cms/config/middlewares.js`) to only accept API requests from origins listed in a `CORS_ORIGINS` environment variable, which defaults to just the local dev server. Once your frontend has a real URL, Strapi Cloud needs to be told to trust it:

1. In the Strapi Cloud dashboard, go to your project's **Settings → Environment variables**.
2. Add:
   - `CORS_ORIGINS` = your deployed frontend URL, e.g. `https://joseph-nkurunziza.vercel.app`
   - If you want both a Vercel preview and a custom domain to work, separate multiple origins with commas: `https://joseph-nkurunziza.vercel.app,https://josephnkurunziza.org`
3. Redeploy the Strapi Cloud project for the new environment variable to take effect (Strapi Cloud usually offers a "Redeploy" button; changing an env var may trigger this automatically).

Without this step, the deployed frontend will still work — it silently falls back to its built-in placeholder content if it can't reach the CMS (this was tested locally by stopping Strapi entirely) — but it won't be pulling live content from Strapi until the CORS origin matches.

---

## 4. Verify

1. Open the deployed frontend URL. The homepage should load with the same content currently visible locally (Dr. Nkurunziza's bio, the three featured articles, the four pillars, the timeline, the three media appearances).
2. Open your browser's dev tools → Network tab, reload, and confirm requests to `<strapi-cloud-url>/api/...` return `200`, not blocked by a CORS error in the console.
3. In the Strapi Cloud admin panel, edit a piece of content (e.g. change the hero eyebrow text on the Profile), save and **publish**, then reload the live frontend — the change should appear within a few seconds. This is the core benefit of the CMS: content edits no longer require a code change or a new deploy.

---

## Custom domains (optional, later)

Both Strapi Cloud and Vercel/Netlify support attaching a custom domain (e.g. a subdomain of your existing site) once you're ready to move from UAT to a public URL — this is a DNS change made in each platform's dashboard and doesn't require any code changes here. If/when you're ready for that, update `CORS_ORIGINS` in Strapi Cloud to include the new custom domain too.

## What "UAT" means for this setup

This gives you a fully working, privately-hosted preview of the site that you (and anyone you share the URL with) can click through and test — with content you can edit yourself in the Strapi admin panel, no code changes needed. It's a real deployment, just on free/trial tiers meant for testing rather than a paid production plan. When you're happy with it, moving to a paid tier and/or a custom domain on either platform is a settings change, not a rebuild.
