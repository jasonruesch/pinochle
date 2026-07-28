import { APP, STORE_URL } from "../_lib/content";
import { AppleIcon } from "./icons";

interface AppStoreBadgeProps {
  className?: string;
}

/**
 * Apple-style "Download on the App Store" badge linking to the live listing.
 * The URL comes from STORE_URL so the app id lives in exactly one place
 * (src/app/_lib/content.ts).
 */
export function AppStoreBadge({ className }: AppStoreBadgeProps) {
  return (
    <a
      href={STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download ${APP.name} on the App Store`}
      className={[
        "relative inline-flex items-center gap-2.5 rounded-xl bg-black px-4 py-2.5 text-white ring-1 ring-white/15 transition-colors hover:bg-zinc-900 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <AppleIcon className="h-7 w-7" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.625rem] font-medium tracking-wide">
          Download on the
        </span>
        <span className="font-display text-xl font-semibold tracking-tight">
          App Store
        </span>
      </span>
    </a>
  );
}
