import { Button } from "./_components/button";
import { Eyebrow } from "./_components/eyebrow";
import { useDocumentTitle } from "./_lib/use-document-title";

export default function NotFound() {
  useDocumentTitle("Page not found");
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
