import { useState } from "react";
import { PLAY, type StorePage } from "../_lib/content";
import { AppStoreBadge } from "./app-store-badge";
import { GooglePlayBadge } from "./google-play-badge";

interface StoreBadgesProps {
  className?: string;
  /** Where there's room for one badge only: the visitor's own store. */
  single?: boolean;
  /** The App Store custom product page to link (Google Play has the one listing). */
  page?: StorePage;
}

/**
 * The store badges, wherever the site asks for the download. The App Store
 * always; Google Play once the Play listing is live (PLAY.live). `single` picks
 * the one that fits the device — Google Play on Android, the App Store
 * everywhere else.
 */
export function StoreBadges({ className, single, page }: StoreBadgesProps) {
  const [android] = useState(
    () =>
      typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent),
  );

  if (!PLAY.live) return <AppStoreBadge className={className} page={page} />;
  if (single)
    return android ? (
      <GooglePlayBadge className={className} />
    ) : (
      <AppStoreBadge className={className} page={page} />
    );
  return (
    <span
      className={["inline-flex flex-wrap items-center gap-3", className]
        .filter(Boolean)
        .join(" ")}
    >
      <AppStoreBadge page={page} />
      <GooglePlayBadge />
    </span>
  );
}
