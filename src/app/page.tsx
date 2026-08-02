import { AppStoreBadge } from "./_components/app-store-badge";
import { Card } from "./_components/card";
import { DeviceFrame } from "./_components/device-frame";
import { Eyebrow } from "./_components/eyebrow";
import { FeatureCard } from "./_components/feature-card";
import {
  AppleTVIcon,
  IPadIcon,
  IPhoneIcon,
  MacIcon,
} from "./_components/icons";
import { ScreenshotGallery } from "./_components/screenshot-gallery";
import { asset } from "./_lib/asset";
import {
  ACHIEVEMENTS,
  APP,
  DESCRIPTION,
  FEATURES,
  LEADERBOARDS,
  MELDS,
  PLATFORMS,
  RULES,
  RULES_DISCLAIMER,
  SHOTS,
  type Badge,
  type PlatformIcon,
} from "./_lib/content";
import { useDocumentTitle } from "./_lib/use-document-title";

const PLATFORM_ICONS: Record<
  PlatformIcon,
  (props: { className?: string }) => React.ReactNode
> = {
  iphone: IPhoneIcon,
  ipad: IPadIcon,
  mac: MacIcon,
  appletv: AppleTVIcon,
};

const HERO_SHOT = SHOTS.find((s) => s.file === "iphone69-classic")!;
const HINTS_SHOT = SHOTS.find((s) => s.file === "mac-hints")!;

export default function Home() {
  useDocumentTitle("Home");
  return (
    <>
      {/* Hero — bespoke brand-gradient surface (pill CTAs diverge from Button
          on purpose, as on the portfolio home page). */}
      <section
        id="top"
        className="from-brand-600 to-brand-800 relative isolate overflow-hidden bg-linear-to-br via-fuchsia-700 text-white"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-white/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-black/10 blur-3xl"
        />
        <div className="px-safe-lg relative mx-auto grid max-w-6xl items-center gap-12 py-20 sm:py-28 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-4">
              <img
                src={asset("img/app-icon.webp")}
                alt="Pinochle app icon"
                className="h-16 w-16 rounded-[1.15rem] shadow-lg ring-1 ring-white/20"
              />
              <p className="text-xs font-semibold tracking-[0.22em] text-white/90 uppercase">
                {APP.category}
              </p>
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
              {APP.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/90 sm:text-xl">
              {APP.subtitle}. {APP.promo}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <AppStoreBadge />
              <p className="text-sm text-white/80">
                {APP.price}
                <br />
                {APP.age}
              </p>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {PLATFORMS.map((p) => {
                const Icon = PLATFORM_ICONS[p.icon];
                return (
                  <li
                    key={p.name}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/25 ring-inset"
                  >
                    <Icon className="h-4 w-4" />
                    {p.name}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:pl-6">
            <DeviceFrame
              shot={HERO_SHOT}
              showLabel={false}
              onHero
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Intro / description */}
      <section className="px-safe-lg mx-auto max-w-3xl py-16 sm:py-20">
        <div className="space-y-4 text-lg text-zinc-600 dark:text-zinc-400">
          {DESCRIPTION.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      {/* Screenshots */}
      <section
        id="screenshots"
        className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40"
      >
        <div className="px-safe-lg mx-auto max-w-6xl py-16 sm:py-20">
          <Eyebrow className="mb-3">Screenshots</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            One deck, every screen
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            The same beautiful minimal deck on iPhone, iPad, Mac, and the big
            screen. Pick a device to take a look.
          </p>
          <div className="mt-10">
            <ScreenshotGallery />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-safe-lg mx-auto max-w-6xl py-16 sm:py-20">
        <div id="features" className="scroll-mt-24">
          <Eyebrow className="mb-3">Features</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Everything a pinochle player wants
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            A real opponent, real rules, and the polish to make every deal a
            pleasure.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </section>

      {/* How to play */}
      <section
        id="how-to-play"
        className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40"
      >
        <div className="px-safe-lg mx-auto max-w-6xl py-16 sm:py-20">
          <Eyebrow className="mb-3">How to play</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Learn it in a deal
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Two-handed pinochle plays in two phases. Here&apos;s the whole game,
            start to 1,000 — the app teaches the rest as you go.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <ol className="space-y-6">
              {RULES.map((rule, i) => (
                <li key={rule.heading} className="flex gap-4">
                  <span className="text-brand-700 dark:text-brand-300 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold dark:bg-brand-900/40">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {rule.heading}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {rule.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="space-y-6">
              <Card accent="from-amber-500 to-orange-400">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  Meld scoring
                </h3>
                <dl className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-800">
                  {MELDS.map((meld) => (
                    <div
                      key={meld.name}
                      className="flex items-baseline justify-between gap-4 py-2"
                    >
                      <dt>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">
                          {meld.name}
                        </span>{" "}
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                          {meld.detail}
                        </span>
                      </dt>
                      <dd className="text-brand-700 dark:text-brand-300 shrink-0 font-semibold tabular-nums">
                        {meld.points}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Card>
              <DeviceFrame shot={HINTS_SHOT} />
            </div>
          </div>

          <p className="mt-10 max-w-2xl text-xs text-zinc-500 dark:text-zinc-500">
            {RULES_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* Achievements & leaderboards */}
      <section className="px-safe-lg mx-auto max-w-6xl py-16 sm:py-20">
        <div id="achievements" className="scroll-mt-24">
          <Eyebrow className="mb-3">Game Center</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Fifteen achievements to chase
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Rack up wins, streaks, and legendary hands — all tracked on Game
            Center leaderboards.
          </p>
        </div>

        <BadgeGrid badges={ACHIEVEMENTS} />

        <h3 className="mt-14 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Leaderboards
        </h3>
        <BadgeGrid badges={LEADERBOARDS} />
      </section>

      {/* Final CTA */}
      <section className="from-brand-600 to-brand-800 relative isolate overflow-hidden bg-linear-to-br via-fuchsia-700 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
        />
        <div className="px-safe-lg relative mx-auto flex max-w-3xl flex-col items-center py-20 text-center sm:py-24">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {APP.tagline}
          </h2>
          <p className="mt-3 text-lg text-white/90">{APP.closer}</p>
          <div className="mt-8">
            <AppStoreBadge />
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {PLATFORMS.map((p) => {
              const Icon = PLATFORM_ICONS[p.icon];
              return (
                <li
                  key={p.name}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/25 ring-inset"
                >
                  <Icon className="h-4 w-4" />
                  {p.name}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

function BadgeGrid({ badges }: { badges: Badge[] }) {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {badges.map((badge) => (
        <li key={badge.file} className="flex flex-col items-center gap-2">
          <img
            src={asset(`img/gc/${badge.file}.webp`)}
            alt={`${badge.name} — card artwork`}
            loading="lazy"
            decoding="async"
            className="aspect-square w-full rounded-2xl object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
          />
          <span className="text-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {badge.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
