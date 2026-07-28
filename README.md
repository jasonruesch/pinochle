# Pinochle: Two-Handed — marketing site

Marketing site for **Pinochle: Two-Handed**, the classic two-handed card duel
for iPhone, iPad, Mac, and Apple TV (in App Store review). Built to match
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

## Deploy

Push to `main` → GitHub Actions builds and deploys to GitHub Pages
(`.github/workflows/deploy.yml`).

**One-time setup:** create the `jasonruesch/pinochle` repo on GitHub, push, then
set **Settings → Pages → Source = GitHub Actions**.

## When the app goes live

Replace the "Coming soon" `AppStoreBadge`
(`src/app/_components/app-store-badge.tsx`) with a real link to the App Store
listing.
