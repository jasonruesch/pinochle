# Pinochle: Two-Handed — marketing site

Marketing site for **Pinochle: Two-Handed**, the classic two-handed card duel
for iPhone, iPad, Mac, and Apple TV, out now on the App Store. Built to match
[jasonruesch.dev](https://jasonruesch.dev) and hosted as a GitHub Pages project
site at **https://jasonruesch.dev/pinochle/** (the `jasonruesch.github.io`
repo serves that custom domain; the bare `github.io` host 301s to it).

## Stack

React 19 · Vite 8 · Tailwind CSS v4 (CSS-first `@theme`) ·
[`@evolonix/react-router-next`](https://github.com/evolonix/react-router-next)
file-based routing · TypeScript · npm · Node 24.

## Develop

```bash
nvm use            # Node 24
npm install
npm run dev        # http://localhost:5173/pinochle/
```

The site is served under the `/pinochle/` base in dev and prod (`vite.config.ts`
`base`), so always open the `/pinochle/` path locally.

## Assets

Screenshots, Game Center art, and the app icon are generated from the app repo
(`/Users/jason/code/jasonruesch/pinochle-app`) into `public/img/` and committed:

```bash
# regenerate optimized assets (needs the app repo present)
PINOCHLE_DIR=/path/to/pinochle-app npm run optimize:assets
```

Site copy lives in `src/app/_lib/content.ts`, sourced from the app's App Store
listing kit (`Docs/StoreListing.md`).

## Search (`/how-to-play` and the route build step)

**https://jasonruesch.dev/pinochle/how-to-play/** (`src/app/how-to-play/page.tsx`)
is the site's one page written for search rather than for the store listing:
the complete two-handed pinochle rules. "How to play pinochle 2 players" is a
steady query with few good modern pages, and every reader is a prospect one
click from the App Store badge. The rules are the ruleset the app actually
plays — sourced from `MenuView.RulesText` and the `Core/Rules` defaults in the
app repo — so if the engine changes, this page has to change with it.

Two pieces of plumbing keep it findable:

- **`src/app/_lib/seo.ts`** holds every route's title, description and canonical
  in one table. `usePageMeta()` applies it at runtime; adding a route means
  adding an entry here.
- **`scripts/build-routes.mjs`** (runs as part of `npm run build`) copies the
  built `index.html` into a directory per route, stamps each copy with that
  route's metadata, and writes `sitemap.xml`. Without it GitHub Pages answers
  every route but `/` with a real HTTP 404 and the `404.html` SPA fallback —
  fine for a person, fatal for a crawler that has already recorded a missing
  page. Node imports `seo.ts` directly (Node 24 strips the types), so the
  build-time and runtime copies can't drift.

`sitemap.xml` is served at `/pinochle/sitemap.xml`. Crawlers only look for a
sitemap at the domain root, so submit it in Search Console, or add a
`Sitemap: https://jasonruesch.dev/pinochle/sitemap.xml` line to a `robots.txt`
in the `jasonruesch.github.io` repo (there isn't one today — which allows
everything, so nothing is blocked either way).

## Privacy policy

App Store Connect requires a privacy policy URL; this site serves it at
**https://jasonruesch.dev/pinochle/privacy** (`src/app/privacy/page.tsx`). The
prose there is the published policy — when it changes, bump `PRIVACY.updated` in
`src/app/_lib/content.ts` so the "Last updated" line stays honest.

## Deploy

Push to `main` → GitHub Actions builds and deploys to GitHub Pages
(`.github/workflows/deploy.yml`).

**One-time setup:** create the `jasonruesch/pinochle` repo on GitHub, push, then
set **Settings → Pages → Source = GitHub Actions**.

## App Store listing

The store facts live in one place — the `STORE` constant in
`src/app/_lib/content.ts`. `STORE.appId` is the numeric id from the listing URL
(`apps.apple.com/app/<slug>/id123456789`), and every store link on the site is
built from it via `STORE_URL`. Update that one value and the header pill, the
hero badge, and the closing CTA all follow.
