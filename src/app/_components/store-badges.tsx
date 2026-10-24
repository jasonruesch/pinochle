import { useState } from "react";
import { PLAY } from "../_lib/content";
import { AppStoreBadge } from "./app-store-badge";
import { GooglePlayBadge } from "./google-play-badge";

interface StoreBadgesProps {
  className?: string;
  /** Where there's room for one badge only: the visitor's own store. */
  single?: boolean;
}

/**
 * The store badges, wherever the site asks for the download. The App Store
 * always; Google Play once the Play listing is live (PLAY.live). `single` picks
 * the one that fits the device — Google Play on Android, the App Store
 * everywhere else.
 */
export function StoreBadges({ className, single }: StoreBadgesProps) {
  const [android] = useState(
    () =>
      typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent),
  );

  if (!PLAY.live) return <AppStoreBadge className={className} />;
  if (single)
    return android ? (
      <GooglePlayBadge className={className} />
    ) : (
      <AppStoreBadge className={className} />
    );
  return (
    <span
      className={["inline-flex flex-wrap items-center gap-3", className]
        .filter(Boolean)
        .join(" ")}
    >
      <AppStoreBadge />
      <GooglePlayBadge />
    </span>
  );
}
