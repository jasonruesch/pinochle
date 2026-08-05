import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";

interface HashLinkProps {
  /** Home-page anchor target, e.g. "#features". */
  hash: string;
  onClick?: () => void;
  className?: string;
  /** Passed through as aria-current, e.g. "true" for the in-view section. */
  ariaCurrent?: "true" | "location";
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
  ariaCurrent,
  children,
}: HashLinkProps) {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return (
      <a
        href={hash}
        onClick={onClick}
        className={className}
        aria-current={ariaCurrent}
      >
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
      aria-current={ariaCurrent}
    >
      {children}
    </Link>
  );
}

interface NavLinkProps {
  /** Home-page anchor target, e.g. "#features". */
  href?: string;
  /** Route target, e.g. "/how-to-play". Mutually exclusive with `href`. */
  to?: string;
  onClick?: () => void;
  /** Larger block style for the mobile menu. */
  block?: boolean;
  /**
   * Set when this item is the current one, and how: "page" when its own route is
   * the one being viewed, "true" when its matching section is in view. Both
   * highlight the pill; the distinction is what assistive tech is told, since a
   * section of the current page isn't the same claim as being on that page.
   */
  current?: "page" | "true";
  children: ReactNode;
}

/**
 * A nav pill: a HashLink to a home-page section, or a Link to another route.
 * An item may carry both — "How to Play" links to the full rules route while
 * also tracking the home page's rules section — in which case the route wins as
 * the link target.
 */
export function NavLink({
  href,
  to,
  onClick,
  block = false,
  current,
  children,
}: NavLinkProps) {
  const active = current !== undefined;
  const base = block
    ? "block rounded-lg px-3 py-2 text-base font-medium transition-colors"
    : "rounded-full px-3 py-1.5 text-sm font-medium transition-colors";
  // The active pill reads as the "Coming soon" badge does — brand tint plus
  // brand text — so the highlight isn't carried by color contrast alone.
  const state = active
    ? "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
    : block
      ? "text-zinc-700 hover:bg-zinc-100 hover:text-brand-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-brand-300"
      : "text-zinc-600 hover:text-brand-700 dark:text-zinc-400 dark:hover:text-brand-300";
  const className = `${base} ${state}`;
  // aria-current communicates the highlight to assistive tech, which can't see
  // it; the caller decides which flavor applies.
  if (to) {
    return (
      <Link
        to={to}
        viewTransition
        onClick={onClick}
        className={className}
        aria-current={current}
      >
        {children}
      </Link>
    );
  }
  return (
    <HashLink
      hash={href!}
      onClick={onClick}
      className={className}
      ariaCurrent={current === "true" ? "true" : undefined}
    >
      {children}
    </HashLink>
  );
}
