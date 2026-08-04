import { useLocation } from "react-router";
import { Button } from "./_components/button";
import { Eyebrow } from "./_components/eyebrow";
import { NOT_FOUND_SEO } from "./_lib/seo";
import { usePageMeta } from "./_lib/use-page-meta";

export default function NotFound() {
  // A 404 can land on any path, so it carries its own metadata rather than a
  // PAGES lookup — and marks itself noindex, since GitHub Pages answers unknown
  // URLs with 404.html and the SPA fallback, not with a 404 status.
  const { pathname } = useLocation();
  usePageMeta(pathname, { seo: NOT_FOUND_SEO });
  return (
    <div className="px-safe-lg mx-auto flex max-w-2xl flex-col items-start gap-6 py-24">
      <Eyebrow>404</Eyebrow>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        We couldn&apos;t find that page
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        The link may be broken or the page may have moved. Head back to the
        Pinochle home page and try again.
      </p>
      <Button to="/">Back to home</Button>
    </div>
  );
}
