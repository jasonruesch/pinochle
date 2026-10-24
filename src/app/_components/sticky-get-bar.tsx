import { useEffect, useState } from "react";
import { APP, HERO } from "../_lib/content";
import { StoreBadges } from "./store-badges";

/**
 * Phones only: once the hero's own badge has scrolled away, a slim bar keeps the
 * download one tap away for the rest of a long page. It watches the element with
 * id `watchId` (the hero) and stays hidden while that is on screen.
 */
export function StickyGetBar({ watchId }: { watchId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) =>
      setShow(!entry.isIntersecting),
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [watchId]);

  return (
    <div
      aria-hidden={!show}
      className={[
        "pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-zinc-950/90 backdrop-blur transition-transform duration-300 md:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            {APP.shortName}
          </p>
          <p className="truncate text-xs text-white/70">{HERO.trust[0]}</p>
        </div>
        <StoreBadges single className="flex-none scale-90 origin-right" />
      </div>
    </div>
  );
}
