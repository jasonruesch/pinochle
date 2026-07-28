import { APP } from "../_lib/content";
import { AppLink } from "./app-link";
import { GitHubIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="px-safe-lg pb-safe mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 pt-6 text-sm text-zinc-600 sm:flex-row sm:items-center dark:text-zinc-400">
        <div className="flex flex-col gap-1">
          <p>
            {APP.copyright}. No ads &middot; no tracking &middot; nothing
            collected.
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            Pinochle is a trick-taking card game — no wagering, no stakes.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <AppLink href="https://jasonruesch.dev" variant="external">
            jasonruesch.dev
          </AppLink>
          <AppLink
            href="https://github.com/jasonruesch"
            variant="external"
            icon={<GitHubIcon />}
          >
            GitHub
          </AppLink>
        </div>
      </div>
    </footer>
  );
}
