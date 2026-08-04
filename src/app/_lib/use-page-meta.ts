import { useEffect } from "react";
import { canonicalUrl, PAGES, type PageSeo } from "./seo";

interface Options {
  /** Overrides the PAGES lookup — used by the 404 page, which has no route. */
  seo?: PageSeo;
  /** schema.org objects, injected as one application/ld+json script. */
  jsonLd?: object[];
}

/**
 * Applies a route's search metadata to the document: title, description,
 * canonical, Open Graph, and the robots directive.
 *
 * scripts/build-routes.mjs bakes the same values into each route's static HTML
 * from the same PAGES table, so a crawler that never runs the bundle already
 * has them; this keeps them right for client-side navigations too. Tags are
 * updated in place rather than removed on unmount — every route sets all of
 * them, so there is nothing to go stale between pages.
 */
export function usePageMeta(path: string, options: Options = {}) {
  const { seo = PAGES[path], jsonLd } = options;
  const { title, description, noindex } = seo;
  const url = canonicalUrl(path);
  // Serialize outside the effect so a fresh object literal per render doesn't
  // re-run it; the JSON is the actual dependency.
  const schema = jsonLd?.length ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    document.title = title;
    metaByName("description").content = description;
    metaByName("robots").content = noindex
      ? "noindex, follow"
      : "index, follow";

    // A noindex URL shouldn't nominate itself as canonical — the 404 page can
    // be reached at any path, and none of them is a page.
    if (noindex) document.head.querySelector("link[rel='canonical']")?.remove();
    else linkByRel("canonical").href = url;

    metaByProperty("og:title").content = title;
    metaByProperty("og:description").content = description;
    metaByProperty("og:url").content = url;
    metaByProperty("og:type").content = "website";
    metaByName("twitter:card").content = "summary";
  }, [title, description, noindex, url]);

  useEffect(() => {
    if (!schema) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = schema;
    document.head.appendChild(script);
    return () => script.remove();
  }, [schema]);
}

function metaByName(name: string): HTMLMetaElement {
  return upsert(`meta[name="${name}"]`, () => {
    const el = document.createElement("meta");
    el.name = name;
    return el;
  });
}

function metaByProperty(property: string): HTMLMetaElement {
  return upsert(`meta[property="${property}"]`, () => {
    const el = document.createElement("meta");
    el.setAttribute("property", property);
    return el;
  });
}

function linkByRel(rel: string): HTMLLinkElement {
  return upsert(`link[rel="${rel}"]`, () => {
    const el = document.createElement("link");
    el.rel = rel;
    return el;
  });
}

function upsert<T extends HTMLElement>(selector: string, create: () => T): T {
  const existing = document.head.querySelector<T>(selector);
  if (existing) return existing;
  const el = create();
  document.head.appendChild(el);
  return el;
}
