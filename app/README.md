# Dr. Joseph Ryarasa Nkurunziza — personal website

A React (Vite) site that reproduces the approved reference design
(`dr-joseph-ryarasa-nkurunziza-copy-3baba1cc.base44.app`): same layout, colours, Jost
typeface, scroll-in effects and hover effects.

## Pages

| Address | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/insights`, `/analysis`, `/reflections` | Article listings with search and topic filters |
| `/articles/<slug>` | A single article |
| `/media` | Media & Conversations |
| `/in-the-news` | In the News |
| `/library` | From My Library |
| `/contact` | Contact & Engagement |

Addresses from the earlier build (`/media-conversations`, `/from-my-library`,
`/insights/<slug>`) redirect to the new ones.

## Editing content (the content editor)

The site has a content editor at **`/admin`** (for example
`https://your-site.vercel.app/admin`). It is [Sveltia CMS](https://sveltiacms.app), a
Git-based editor: pressing Save commits the change to the GitHub repository, Vercel
notices the commit and rebuilds the site, and the change is live about a minute later.
There is no separate server or database.

What can be edited there:

| In the editor | File it changes |
| --- | --- |
| Articles | `src/content/articles/<address>.md` (one file per article) |
| Media, news and library | `src/content/media.json`, `src/content/library.json` |
| Page text and photos → Home page | `src/content/home.json` |
| Page text and photos → About page | `src/content/about.json` |
| Page text and photos → Other page introductions | `src/content/pages.json` |
| Site details | `src/content/site.json` |
| Uploaded photos | `public/uploads/` |

Signing in needs a GitHub access token for the repository:

1. On github.com: profile photo → Settings → Developer settings → Personal access
   tokens → Fine-grained tokens → Generate new token.
2. Repository access: "Only select repositories" → `Dr-joseph-s-site`.
3. Permissions → Repository permissions → **Contents: Read and write**.
4. Generate, copy the token, open `/admin`, choose "Sign In Using Access Token" and
   paste it. The browser remembers it; keep the token private.

The editor's settings (which fields exist, their labels) are in
`public/admin/config.yml`. The repository name and branch at the top of that file must
match the GitHub repository the site is deployed from.

Notes:

- An article's address comes from its file name, which the editor creates from the
  title when the article is first saved. Changing the title later does not change the
  address.
- Article text is Markdown, so headings, bold, links, lists and quotes can be used.
- The three newest articles appear on the homepage automatically, as do the three
  newest dated media items.
- The editor has not yet been tested against the live GitHub repository; the first
  sign-in and save after deployment is that test.

The Strapi CMS in `../cms` is not used by this version of the site.

## Design

Tailwind CSS. Colours and fonts are defined once in `src/index.css` (the `:root` block)
and exposed to Tailwind in `tailwind.config.js`:

- Background `hsl(204 33% 98%)` · Navy "oxford" `hsl(210 40% 17%)` · Green "ochre"
  `hsl(142 52% 40%)` · Secondary text "slate" `hsl(217 17% 35%)`
- Font: Jost (self-hosted through `@fontsource-variable/jost`)

Effects are shared so they behave the same everywhere:

- **Scroll-in ("pop up")** — the `<Reveal>` component (`src/components/Reveal.jsx`) and
  the `.reveal` rules in `src/index.css`. Neighbouring items are staggered with `delay`.
- **Card hover** — a border/colour change over 500ms on every card; no card moves or
  resizes, so rows stay aligned.

## Images

`public/uploads/` holds `portrait.jpg`, `community.jpg` and `kigali-dusk.jpg`. These were
cropped from screenshots of the design and are low quality. Replace them by uploading the
original photos in the editor (Page text and photos → Home page / About page).

## Contact form email

The form sends through [Web3Forms](https://web3forms.com), which needs no server.

1. On web3forms.com, create a free access key using the inbox that should receive
   messages (for example `engagement@josephryarasa.rw`).
2. Copy `.env.example` to `.env` and paste the key after `VITE_WEB3FORMS_KEY=`.
3. On the hosting platform (Vercel/Netlify), add the same variable, then redeploy.

Until a key is set, pressing "Send Message" opens the visitor's own email app with the
message filled in. The Web3Forms sending path has not been tested with a real key yet.

## Running locally

```bash
npm install
npm run dev      # prints a local address to open in the browser
```

## Building

```bash
npm run build    # static site in dist/
npm run preview  # serve dist/ locally to check it
npm run lint
```

`vercel.json`, `public/_redirects` and `public/.htaccess` keep page addresses working on
Vercel, Netlify and Apache/cPanel respectively.
