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

Screenshots are resized in 16 bits, dithered back to 8 bits with the game's own
noise and saved as near-lossless WebP at 1200 px (~150–500 KB each). The felt is a
shallow gradient the game dithers so it doesn't band into concentric rings, and
both an 8-bit resize and lossy WebP would undo that.

The home page's gameplay clip (`public/video/pinochle-2.0-preview.mp4`, 32.6s,
1920x1080, 30fps H.264 + AAC, faststart, ~19.9 MB, loaded only on play) is the 2.0 press clip: an animated
title card ("New in 2.0"), 24s of a real hand recorded by the app's harness
(seed 42, 2.0's cameo courts, the Medallion back), and an animated closing card. Its poster, `pinochle-2.0-preview-poster.webp`,
is the finished title card (intro frame 110). Neither is produced by
`optimize:assets`. (`deal-and-meld.mp4` and `pinochle-2.3-preview.mp4` are older
hosted clips kept so existing links keep working.)

To rebuild it (frames are ~1 GB — keep them in a scratch dir, `$T` below):

1. Record gameplay with the app's capture build, per the app repo's
   `Docs/PressKit.md`:
   `"Builds/dev-macos-mobile/Pinochle Capture.app/Contents/MacOS/Pinochle" -pinochle-autoplay -pinochle-cleanshot -pinochle-seed 42 -pinochle-table 0 -pinochle-backpattern 1 -pinochle-cardback 0 -screen-width 1920 -screen-height 1080 -pinochle-record $T/frames -pinochle-recordfps 30 -pinochle-recordseconds 50`
2. Card faces for the title cards come from the How to Play screen at 8K
   (`-pinochle-menuscreen rules -pinochle-rulestab 0|3 -screen-width 7680 -screen-height 4320 -pinochle-screenshot …`),
   cut to `$T/cards/{A,10,K,Q,J,9}{s,d}.png` (368x522, rounded alpha).
3. Render the cards: `python3 scripts/press-video/title-cards.py $T <pinochle-app>/Assets/Icons/icon-1024.png`
   (needs Pillow; `preview` renders stills first).
4. Mix the game's own sounds — the deal slide (audio.wav 0.355s, 0.36s long)
   under each card in both fans and the meld chime (8.13s, 0.66s) on the
   pinochle pair and the closing flush — with the gameplay audio delayed 3.7s, then
   encode: intro (4.2s) → 0.5s fade → gameplay frames 0–719 → 0.6s fade at
   27.1s → outro (5.5s), fading out over the last 0.6s. Encode with a fixed grain pattern appended to the filter chain (`noise=c0s=3:c0f=p`) and x264 at `-crf 18 -tune grain -x264-params aq-mode=3:aq-strength=1.2:deblock=-2,-2`: x264 smooths a sub-level dither away in dark, flat areas whatever the CRF, and the felt and the title cards' ground band back into rings. The static grain survives, can't be seen at normal contrast, and is cheap because it doesn't move (see the app repo's `Docs/PressKit.md`).

The app repo's `Docs/press/` keeps each version's clip; this file is
`pinochle-2.0-deal-and-meld.mp4` there, byte for byte. The featuring nomination
links to the hosted copy, so it must reach `main` before the nomination is
reviewed. 2.0's vertical cut for social posts, `pinochle-2.0-vertical.mp4`
(1080x1920), lives only in the app repo's `Docs/press/` — render its title
cards with `PINOCHLE_FORMAT=portrait python3 scripts/press-video/title-cards.py …`
(the pill and chips default to 2.0's).

The gallery's iPhone tab shows the upright (2.0) captures, `iphone69p-*`, three
across; the hero keeps the sideways `iphone69-classic`.

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
