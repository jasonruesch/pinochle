import { useState } from "react";
import { DEVICES, SHOTS, type Device } from "../_lib/content";
import { DeviceFrame } from "./device-frame";

export function ScreenshotGallery() {
  const [device, setDevice] = useState<Device>("iPhone");
  const shots = SHOTS.filter((s) => s.device === device);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Choose a device"
        className="mb-8 flex flex-wrap gap-2"
      >
        {DEVICES.map((d) => {
          const active = d === device;
          return (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setDevice(d)}
              className={[
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-700 text-white dark:bg-brand-400 dark:text-zinc-950"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700",
              ].join(" ")}
            >
              {d}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {shots.map((shot) => (
          <DeviceFrame key={shot.file} shot={shot} />
        ))}
      </div>
    </div>
  );
}
