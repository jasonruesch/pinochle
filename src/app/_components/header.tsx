import { useEffect, useRef, useState } from "react";
import { asset } from "../_lib/asset";
import { useActiveSection } from "../_lib/use-active-section";
import { useBodyScrollLock } from "../_lib/use-body-scroll-lock";
import { HashLink, NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

const NAV_ITEMS = [
  { href: "#screenshots", label: "Screenshots" },
  { href: "#features", label: "Features" },
  { href: "#how-to-play", label: "How to Play" },
  { href: "#achievements", label: "Achievements" },
];

const NAV_HASHES = NAV_ITEMS.map((item) => item.href);

export function Header() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const active = useActiveSection(NAV_HASHES);

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
              key={item.href}
              href={item.href}
              active={item.href === active}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:ml-2">
          <span className="hidden rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 md:inline-block dark:bg-brand-900/40 dark:text-brand-300">
            Coming soon
          </span>
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
            <li key={item.href}>
              <NavLink
                href={item.href}
                block
                active={item.href === active}
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
