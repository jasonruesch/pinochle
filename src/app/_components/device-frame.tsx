import { asset } from "../_lib/asset";
import type { Shot } from "../_lib/content";

interface DeviceFrameProps {
  shot: Shot;
  /** Show the small device/label chip above the frame. */
  showLabel?: boolean;
  className?: string;
  /** Loading hint for the underlying <img>. Defaults to "lazy". */
  loading?: "lazy" | "eager";
}

/**
 * A device-agnostic screen frame: the screenshot sits inside a rounded, ringed,
 * shadowed surface sized to the shot's own aspect ratio. Works for the app's
 * landscape shots across iPhone / iPad / Mac / Apple TV without per-device bezel
 * art, matching the portfolio's rounded-2xl + ring aesthetic.
 */
export function DeviceFrame({
  shot,
  showLabel = true,
  className,
  loading = "lazy",
}: DeviceFrameProps) {
  return (
    <figure
      className={["flex flex-col gap-3", className].filter(Boolean).join(" ")}
    >
      {showLabel && (
        <figcaption className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
          {shot.device} · {shot.label}
        </figcaption>
      )}
      <div className="overflow-hidden rounded-2xl bg-zinc-900 p-1.5 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800">
        <img
          src={asset(`img/shots/${shot.file}.webp`)}
          alt={shot.alt}
          loading={loading}
          decoding="async"
          style={{ aspectRatio: shot.ratio }}
          className="w-full rounded-xl object-cover"
        />
      </div>
    </figure>
  );
}
