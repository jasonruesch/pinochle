import { AppleIcon } from "./icons";

interface AppStoreBadgeProps {
  className?: string;
}

/**
 * Apple-style "Coming soon" App Store badge. Intentionally non-interactive —
 * the app is still in review, so there is no store URL yet. When it goes live,
 * wrap this in an <a href="…"> (and drop the "Coming soon" ribbon).
 */
export function AppStoreBadge({ className }: AppStoreBadgeProps) {
  return (
    <span
      role="img"
      aria-label="Coming soon on the App Store"
      className={[
        "relative inline-flex cursor-default items-center gap-2.5 rounded-xl bg-black px-4 py-2.5 text-white ring-1 ring-white/15 select-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <AppleIcon className="h-7 w-7" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.625rem] font-medium tracking-wide">
          Coming soon on the
        </span>
        <span className="font-display text-xl font-semibold tracking-tight">
          App Store
        </span>
      </span>
    </span>
  );
}
