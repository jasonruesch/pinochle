import type { ReactNode } from "react";

interface NavLinkProps {
  /** On-page anchor target, e.g. "#features". */
  href: string;
  onClick?: () => void;
  /** Larger block style for the mobile menu. */
  block?: boolean;
  children: ReactNode;
}

/**
 * In-page anchor link styled like the portfolio's nav pills. The marketing site
 * is a single page, so navigation scrolls to section anchors rather than routing.
 */
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
    <a href={href} onClick={onClick} className={base}>
      {children}
    </a>
  );
}
