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
(`/Users/jason/code/pinochle`) into `public/img/` and committed:

```bash
# regenerate optimized assets (needs the app repo present)
PINOCHLE_DIR=/path/to/pinochle npm run optimize:assets
```

Site copy lives in `src/app/_lib/content.ts`, sourced from the app's App Store
listing kit (`Docs/StoreListing.md`).

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
