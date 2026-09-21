import { useEffect, useRef } from "react";

interface VideoFrameProps {
  src: string;
  poster: string;
  /** Accessible name for the video — what it shows, as an alt would. */
  label: string;
  /** CSS aspect-ratio of the footage, so the frame holds its size pre-load. */
  ratio?: string;
  className?: string;
}

/**
 * A gameplay clip in the same rounded, ringed surface as DeviceFrame. It plays
 * muted and looped while at least half of it is on screen and pauses when it
 * scrolls away, so it neither downloads nor burns battery for someone who
 * never reaches it (`preload="none"` + the poster until then). Native controls
 * stay on for unmuting and scrubbing; once the viewer pauses it themselves it
 * stays paused. Under prefers-reduced-motion it never starts on its own.
 */
export function VideoFrame({
  src,
  poster,
  label,
  ratio = "16 / 9",
  className,
}: VideoFrameProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Set when the viewer pauses by hand. Our own scroll-out pause doesn't
    // count, nor does the browser pausing muted video in a background tab.
    let userPaused = false;
    let autoPausing = false;
    const onPause = () => {
      if (autoPausing) autoPausing = false;
      else if (document.visibilityState === "visible") userPaused = true;
    };
    const onPlay = () => {
      userPaused = false;
    };
    video.addEventListener("pause", onPause);
    video.addEventListener("play", onPlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Autoplay can still be refused (e.g. Low Power Mode); the poster
          // and controls cover that.
          if (!userPaused && video.paused) video.play().catch(() => {});
        } else if (!video.paused) {
          autoPausing = true;
          video.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play", onPlay);
    };
  }, []);

  return (
    <div
      className={[
        "overflow-hidden rounded-2xl bg-zinc-900 p-1.5 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={label}
        muted
        loop
        playsInline
        controls
        preload="none"
        style={{ aspectRatio: ratio }}
        className="w-full rounded-xl bg-zinc-900 object-cover"
      />
    </div>
  );
}
