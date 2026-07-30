import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";

interface HashLinkProps {
  /** Home-page anchor target, e.g. "#features". */
  hash: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

/**
 * Link to a section of the home page. The marketing content is all one page, so
 * on "/" this is a native anchor — the browser handles it with the smooth
 * in-page scroll and header-clearing scroll-padding set in index.css. On other
 * routes (e.g. /privacy) the same target has to route home first; <Link> does
 * that and <ScrollRestoration /> in the root layout scrolls to the anchor once
 * the home page renders.
 */
export function HashLink({
  hash,
  onClick,
  className,
  children,
}: HashLinkProps) {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return (
      <a href={hash} onClick={onClick} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link
      to={{ pathname: "/", hash }}
      viewTransition
      onClick={onClick}
      className={className}
    >
      {children}
    </Link>
  );
}

interface NavLinkProps {
  /** Home-page anchor target, e.g. "#features". */
  href: string;
  onClick?: () => void;
  /** Larger block style for the mobile menu. */
  block?: boolean;
  children: ReactNode;
}

/** A HashLink styled as one of the portfolio's nav pills. */
export function NavLink({
  href,
  onClick,
  block = false,
  children,
}: NavLinkProps) {
  const base = block
    ? "block rounded-lg px-3 py-2 text-base font-medium transition-colors text-zinc-700 hover:bg-zinc-100 hover:text-brand-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-brand-300"
    : "rounded-full px-3 py-1.5 text-sm font-medium transition-colors text-zinc-600 hover:text-brand-700 dark:text-zinc-400 dark:hover:text-brand-300";
  return (
    <HashLink hash={href} onClick={onClick} className={base}>
      {children}
    </HashLink>
  );
}
