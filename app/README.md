# Dr. Joseph Ryarasa Nkurunziza — personal website

A React (Vite) rebuild of the approved design, matching its layout, colors, and typography.
Content (bio, articles, media appearances, timeline, pillars) is served by a headless
Strapi CMS in the sibling `cms/` folder — see **`../DEPLOYMENT.md`** for how the two
deploy together to Strapi Cloud + Vercel/Netlify. If the CMS is ever unreachable, the
site falls back to built-in placeholder content automatically, so it never breaks or
shows blank sections.

## What's built

- **Home page** — fully built: hero, bio ("The Bridge"), the 6-section explore grid,
  featured writings, Pillars of Impact, the career timeline, media appearances, and the
  contact call-to-action band — all using the real copy from the approved design.
- **Header & footer** — shared across every page, with a working mobile menu.
- **Contact page** (`/contact`) — a real, validated message form. It is **UI-only for
  now**: submitting shows a success message but does not actually send an email. See
  "Wiring up the contact form" below.
- **Placeholder pages** for About, Insights, Analysis, Reflections, Media & Conversations,
  In the News, and From My Library — styled consistently so navigation works everywhere,
  each with a short one-line description of what will go there. These are meant to be
  filled in next, page by page.

## Design tokens

Colors and the font were sampled directly from the approved screenshots:

- Background: `#f9fafc` · Navy (text/dark sections): `#1e2b3b` · Green accent: `#52995f`
- Font: Google Font "Nunito" (weights 300–800), loaded in `index.html`
- All tokens live in `src/styles/variables.css`

## Running locally

```bash
npm install
cp .env.example .env    # points the app at a local Strapi instance (see cms/)
npm run dev              # starts a local dev server, prints a URL to open
```

Start the CMS too (`cd ../cms && npm run develop`) if you want live content — otherwise
the site runs fine on its own bundled fallback content.

## Building for production

```bash
npm run build      # outputs a static site to dist/
npm run preview    # optional: serve dist/ locally to double-check the build
```

## Deploying

The current plan is a managed-cloud UAT setup: this app on **Vercel or Netlify**, CMS
on **Strapi Cloud**. Full walkthrough in **`../DEPLOYMENT.md`**. `vercel.json` and
`public/_redirects` are already included so client-side routing (React Router) works
correctly on either platform — no extra config needed there.

`public/.htaccess` is also still included in case a cPanel/Apache static deploy is ever
used instead — `npm run build` produces a fully static site in `dist/`, and uploading
its contents plus `.htaccess` works the same way as before.

## Wiring up the contact form

`src/pages/Contact.jsx` has a `handleSubmit` function with a comment marking where to
add the real send logic — the same place the Microsoft Graph mailer pattern used on the
main NAR site would plug in, or any other form backend/API route.

## Next steps

Build out the placeholder pages with real content, one at a time — the pattern in
`src/pages/PageStub.jsx` can either be extended or replaced per page as content is
ready.
