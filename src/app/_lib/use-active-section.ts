import { useEffect, useState } from "react";

/**
 * Tracks which of `hashes` (e.g. ["#features", ...]) is the section currently in
 * view, so the header can highlight the matching nav item while scrolling.
 *
 * Position-based rather than IntersectionObserver: the anchors aren't uniform —
 * some are whole <section> elements, others a heading <div> a few rems tall at
 * the top of one — so "is it intersecting" means different things per target.
 * Instead each anchor's document offset is compared against an activation line
 * placed at the sticky header's bottom edge (the same offset as the CSS
 * `scroll-padding-top`), and the last anchor above the line wins. That makes
 * clicking a nav item land exactly on its own section becoming active.
 *
 * Returns "" above the first section, and forces the last one at the end of the
 * page so a short final section can still be reached.
 */
export function useActiveSection(hashes: string[]): string {
  const [active, setActive] = useState("");

  // Join so the effect re-runs when the list's contents change, not on every
  // render of a caller that passes a fresh array literal.
  const key = hashes.join(",");

  useEffect(() => {
    const ids = key.split(",").map((hash) => hash.replace(/^#/, ""));

    const update = () => {
      // Mirrors html { scroll-padding-top } in index.css; that resolves to a px
      // length, but fall back to the header's own height if it ever reads
      // "auto" so the line never lands at NaN.
      const padding = parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingTop,
      );
      const line = window.scrollY + (Number.isNaN(padding) ? 80 : padding) + 1;

      // Within a pixel of the bottom nothing scrolls further, so the last
      // section is as active as it will ever get.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;

      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        // Subtract the anchor's own scroll-margin-top (Tailwind `scroll-mt-*`,
        // used on the heading-div anchors but not the full-section ones). An
        // anchor with scroll-margin comes to rest that much further down the
        // viewport, so without this it would never reach the line and clicking
        // its nav item wouldn't highlight it.
        const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        const top = el.getBoundingClientRect().top + window.scrollY - margin;
        if (top <= line) current = `#${id}`;
      }
      if (atBottom) {
        const last = ids.findLast((id) => document.getElementById(id));
        if (last) current = `#${last}`;
      }

      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [key]);

  return active;
}
