// Per-route search metadata, in one table because it has to be applied twice:
//
//   * at runtime by usePageMeta(), for people arriving through the SPA, and
//   * at build time by scripts/build-routes.mjs, which stamps the same title,
//     description and canonical into a real index.html per route.
//
// The build step is what makes these pages indexable at all. GitHub Pages has
// no server-side rewrite, so without a file at dist/how-to-play/index.html the
// URL answers 404.html — a genuine HTTP 404, which crawlers treat as a missing
// page no matter what the SPA fallback paints afterwards.
//
// Node imports this .ts file directly (Node 24 strips types; the app's
// erasableSyntaxOnly keeps it strip-safe), so the two copies cannot drift.
// Keep it free of imports and of any syntax that needs real compilation.

/** Canonical origin + base path, no trailing slash. */
export const SITE_URL = "https://jasonruesch.dev/pinochle";

export interface PageSeo {
  /**
   * The whole <title>, written out — no site suffix is appended. Front-load the
   * words someone would actually search and stay near 60 characters, which is
   * about where Google truncates.
   */
  title: string;
  /** ~155 characters. Not a ranking factor, but it is the click-through pitch. */
  description: string;
  /** Kept out of the sitemap and marked noindex. */
  noindex?: boolean;
}

/**
 * Every indexable route. Adding an entry here is what gives a new route its
 * static HTML file — scripts/build-routes.mjs iterates this table.
 */
export const PAGES: Record<string, PageSeo> = {
  "/": {
    title: "Pinochle: Two-Handed — Two-Player Pinochle for Apple Devices",
    description:
      "The classic two-handed card duel for iPhone, iPad, Mac, and Apple TV. Full pinochle rules, three AI opponents, Game Center online play, and SharePlay.",
  },
  "/how-to-play": {
    title: "How to Play Two-Handed Pinochle — the Complete Rules",
    description:
      "Complete rules for two-handed pinochle: the 48-card deck, the deal, melding and meld values, the dix, the phase-two playoff, counting, and the race to 1,000.",
  },
  "/privacy": {
    title: "Privacy Policy — Pinochle: Two-Handed",
    description:
      "Pinochle: Two-Handed collects nothing at all — no accounts, no analytics, no advertising, no tracking. Read the full privacy policy.",
  },
  "/support": {
    title: "Support — Pinochle: Two-Handed",
    description:
      "Help with Pinochle: Two-Handed — bug reports, Game Center and SharePlay troubleshooting, rules questions, and answers to the things that come up most.",
  },
};

/** Applied to any URL that didn't match a route, so 404s stay out of the index. */
export const NOT_FOUND_SEO: PageSeo = {
  title: "Page not found — Pinochle: Two-Handed",
  description: "That page doesn't exist. Head back to the Pinochle home page.",
  noindex: true,
};

/**
 * The URL a page declares as its own. GitHub Pages serves a route's directory
 * and redirects the bare path to it, so the canonical carries the trailing
 * slash the server actually settles on.
 */
export function canonicalUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}/`;
}
