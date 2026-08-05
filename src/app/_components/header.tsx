import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { asset } from "../_lib/asset";
import { APP, STORE_URL } from "../_lib/content";
import { useActiveSection } from "../_lib/use-active-section";
import { useBodyScrollLock } from "../_lib/use-body-scroll-lock";
import { HashLink, NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

// Mostly sections of the one marketing page, plus the full rules, which is a
// route of its own: it's the page the site wants search traffic to land on, so
// it gets a real URL and a link from every page rather than an anchor. "How to
// Play" carries both — the link goes to the rules route, while the `href` ties
// it to the home page's rules band so scrolling past that band highlights it too.
const NAV_ITEMS: { href?: string; to?: string; label: string }[] = [
  { href: "#screenshots", label: "Screenshots" },
  { href: "#features", label: "Features" },
  { href: "#how-to-play", to: "/how-to-play", label: "How to Play" },
  { href: "#achievements", label: "Achievements" },
];

// Sections tracked for the in-view highlight, in document order.
const TRACKED_HASHES = NAV_ITEMS.map((item) => item.href).filter(
  (href): href is string => href !== undefined,
);

export function Header() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const active = useActiveSection(TRACKED_HASHES);
  const { pathname } = useLocation();
  // GitHub Pages serves a route from its directory and redirects the bare path
  // to the trailing-slash form, so "/how-to-play/" is what a visitor from
  // search actually lands on — normalize before comparing.
  const path = pathname.replace(/\/+$/, "") || "/";

  // "page" when the item's own route is the one being viewed; otherwise "true"
  // when its section is the one in view. An item with both — "How to Play" — is
  // lit either way: on its route, and while scrolling its band of the home page.
  const currentFor = (item: (typeof NAV_ITEMS)[number]) => {
    if (item.to && path === item.to) return "page" as const;
    if (item.href && item.href === active) return "true" as const;
    return undefined;
  };

  useBodyScrollLock(open);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
    const onCancel = (event: Event) => {
      event.preventDefault();
      setOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      // The dialog's own padding reports the same target as the backdrop, so a
      // click on the panel's edges would otherwise close it. Close only when the
      // click lands outside the dialog box, on the real backdrop.
      if (event.target !== el) return;
      const r = el.getBoundingClientRect();
      const outside =
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom;
      if (outside) setOpen(false);
    };
    el.addEventListener("cancel", onCancel);
    el.addEventListener("click", onClick);
    return () => {
      el.removeEventListener("cancel", onCancel);
      el.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <header className="pt-safe sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="px-safe-lg mx-auto flex max-w-6xl items-center gap-3 py-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="hover:text-brand-700 dark:hover:text-brand-300 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-700 ring-1 ring-zinc-200 transition-colors hover:bg-zinc-50 sm:hidden dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        <HashLink
          hash="#top"
          className="flex items-center gap-2 text-base font-semibold tracking-tight"
        >
          <img
            src={asset("img/app-icon.webp")}
            alt=""
            aria-hidden="true"
            className="h-7 w-7 rounded-[0.4rem] ring-1 ring-black/5 dark:ring-white/10"
          />
          <span className="font-display font-bold">Pinochle</span>
        </HashLink>

        <nav
          aria-label="Primary"
          className="ml-auto hidden items-center gap-1 sm:flex"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              to={item.to}
              current={currentFor(item)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:ml-2">
          <a
            href={STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${APP.name} on the App Store`}
            className="hover:bg-brand-100 dark:hover:bg-brand-900/70 hidden rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 transition-colors md:inline-block dark:bg-brand-900/40 dark:text-brand-300"
          >
            Out now
          </a>
          <ThemeToggle />
        </div>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-nav"
        aria-label="Mobile menu"
        className="fixed top-0 right-0 left-0 m-0 w-full max-w-full border-b border-zinc-200 bg-white p-0 backdrop:bg-zinc-900/40 backdrop:backdrop-blur-sm sm:hidden dark:border-zinc-800 dark:bg-zinc-950"
      >
        <ul className="px-safe mx-auto flex max-w-6xl flex-col gap-1 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <NavLink
                href={item.href}
                to={item.to}
                block
                current={currentFor(item)}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </dialog>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
