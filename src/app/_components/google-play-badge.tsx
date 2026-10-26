import { asset } from "../_lib/asset";
import { APP, PLAY_URL } from "../_lib/content";

interface GooglePlayBadgeProps {
  className?: string;
}

/**
 * Google's own "Get it on Google Play" badge, linking to the Play listing.
 * Google's brand rules allow only their badge artwork, unaltered — so unlike
 * the App Store badge this is their image (public/img/google-play-badge.png,
 * from play.google.com/intl/en_us/badges, 646 x 250). Its black shape is the
 * middle 168px of that height, so at 86px tall it stands as tall as the App
 * Store badge (58px); the negative margins take back Google's transparent
 * clear space so the badges line up and the gap between them reads true.
 * The image takes no pointer events, so the whole badge is the link's hand
 * cursor: otherwise Safari's Live Text finds the words in the artwork and
 * shows a text cursor over them.
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
        width={222}
        height={86}
        draggable={false}
        className="pointer-events-none -mx-[13px] -my-[14px] h-[86px] w-auto max-w-none select-none"
      />
    </a>
  );
}
