import { asset } from "../_lib/asset";
import { APP, PLAY_URL } from "../_lib/content";

interface GooglePlayBadgeProps {
  className?: string;
}

/**
 * Google's own "Get it on Google Play" badge, linking to the Play listing.
 * Google's brand rules allow only their badge artwork, unaltered — so unlike
 * the App Store badge this is their image (public/img/google-play-badge.png,
 * from play.google.com/intl/en_us/badges), sized to the App Store badge's
 * height. Its PNG carries Google's own clear space, hence the negative margin.
 */
export function GooglePlayBadge({ className }: GooglePlayBadgeProps) {
  return (
    <a
      href={PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Get ${APP.name} on Google Play`}
      className={[
        "inline-flex rounded-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <img
        src={asset("img/google-play-badge.png")}
        alt=""
        width={168}
        height={65}
        className="-my-[9px] h-[65px] w-auto"
      />
    </a>
  );
}
