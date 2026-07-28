// All marketing copy is sourced verbatim (or lightly condensed) from the app's
// App Store listing kit — /Users/jason/code/pinochle/Docs/StoreListing.md — and
// the in-app "How to Play" screen. Keep this the single source of truth for
// site content.

/* -- App Store listing ---------------------------------------------------- */
// TODO(release): these are placeholders — replace with the real values from the
// live App Store Connect record before merging. `appId` is the only one the
// links actually resolve on: it's the numeric id in the listing URL
// (apps.apple.com/app/<slug>/id123456789). The slug is cosmetic.
export const STORE = {
  appId: "0000000000",
  slug: "pinochle-two-handed",
  /** Marketing version live on the store. */
  version: "1.0",
} as const;

/** Canonical App Store listing URL. Every store link on the site uses this. */
export const STORE_URL = `https://apps.apple.com/app/${STORE.slug}/id${STORE.appId}`;

export const APP = {
  name: "Pinochle: Two-Handed",
  shortName: "Pinochle",
  subtitle: "The classic two-handed duel",
  promo:
    "Deal in. Meld your marriages, flush the trump, and race to 1,000 against a sharp AI or a live opponent over Game Center.",
  category: "Games · Card & Strategy",
  // Deliberately no dollar amount — the App Store listing is the source of
  // truth for price, and hardcoding it here would go stale on any sale or
  // price change.
  price: "No in-app purchases",
  age: "Rated 4+",
  copyright: "© 2026 Jason Ruesch",
  tagline: "One deck, two players, two hundred fifty points a deal.",
  closer: "See you at 1,000.",
} as const;

export const DESCRIPTION: string[] = [
  "Pinochle brings the classic two-handed card duel to your table — the classic rules, a beautiful minimal deck, and opponents that put up a real fight.",
  "Play a quick single deal or the full race to 1,000 with declare-out. Draw from the stock, time your melds, and squeeze every counter out of phase two, where following suit is the law and every trick matters.",
];

/* -- Platforms ------------------------------------------------------------ */
export type PlatformIcon = "iphone" | "ipad" | "mac" | "appletv";

export interface Platform {
  name: string;
  icon: PlatformIcon;
}

export const PLATFORMS: Platform[] = [
  { name: "iPhone", icon: "iphone" },
  { name: "iPad", icon: "ipad" },
  { name: "Mac", icon: "mac" },
  { name: "Apple TV", icon: "appletv" },
];

/* -- Features ------------------------------------------------------------- */
export type FeatureIcon =
  | "cards"
  | "cpu"
  | "globe"
  | "facetime"
  | "controller"
  | "trophy"
  | "book"
  | "shield";

export interface Feature {
  title: string;
  body: string;
  icon: FeatureIcon;
  /** Tailwind gradient classes for the card's accent strip. */
  tone: string;
}

export const FEATURES: Feature[] = [
  {
    title: "Classic two-handed rules",
    body: "The full classic ruleset — flushes, marriages, pinochles, the dix, and declare-out. Nothing simplified away.",
    icon: "cards",
    tone: "from-brand-500 to-fuchsia-500",
  },
  {
    title: "Three AI opponents",
    body: "From an easygoing teacher to a card-counting shark that tracks the deck, weighs meld potential, and manages its trump.",
    icon: "cpu",
    tone: "from-fuchsia-500 to-accent-500",
  },
  {
    title: "Online over Game Center",
    body: "Quick match against a stranger or invite a friend, with leaderboards and achievements built in.",
    icon: "globe",
    tone: "from-cyan-500 to-teal-400",
  },
  {
    title: "SharePlay on FaceTime",
    body: "Deal in over a FaceTime call and play the same match together — on iPhone, iPad, and Mac.",
    icon: "facetime",
    tone: "from-sky-500 to-blue-400",
  },
  {
    title: "Made for the living room",
    body: "Full game-controller support and a focus-based interface built for Apple TV and the big screen.",
    icon: "controller",
    tone: "from-indigo-500 to-blue-400",
  },
  {
    title: "Leaderboards & achievements",
    body: "Fifteen achievements and Game Center leaderboards for wins, streaks, and your best deal and meld.",
    icon: "trophy",
    tone: "from-amber-500 to-orange-400",
  },
  {
    title: "Learn as you play",
    body: "Built-in illustrated rules, legal-move highlighting, and meld suggestions help the game teach itself.",
    icon: "book",
    tone: "from-emerald-500 to-teal-400",
  },
  {
    title: "No ads, no tracking",
    body: "No in-app purchases, nothing collected — everything stays on your device. Just cards.",
    icon: "shield",
    tone: "from-lime-500 to-green-400",
  },
];

/* -- How to play ---------------------------------------------------------- */
export interface Rule {
  heading: string;
  body: string;
}

export const RULES: Rule[] = [
  {
    heading: "The cards",
    body: "48 cards: two copies of A, 10, K, Q, J and 9 in each suit. They rank in that order — the 10 beats everything but the ace.",
  },
  {
    heading: "The deal",
    body: "Each player gets 12 cards. The next card is turned face up: its suit is trump for the whole deal. The remaining cards form the stock.",
  },
  {
    heading: "Phase one — while the stock lasts",
    body: "Play any card; you need not follow suit yet. The higher card of the suit led wins unless a trump beats it. After each trick the winner may lay down one meld, then both players draw back up to twelve.",
  },
  {
    heading: "Melding",
    body: "Melds score immediately and stay face up — those cards can still be played to tricks. One meld per trick won, and at least one card must come fresh from your hand.",
  },
  {
    heading: "Phase two — the playoff",
    body: "Once the stock runs out, following suit becomes the law and you must try to win the trick. Every counter now matters as you play out your final twelve.",
  },
  {
    heading: "The race",
    body: "Win a single deal, or play the full match to 1,000 with escalating thresholds and the “Declare Out” finish. Two hundred fifty points are on the table each deal.",
  },
];

// Nominative reference + non-affiliation disclaimer, mirroring the wording in
// the app's own "How to Play" footer (MenuView.cs). The game and our rules
// prose need no license, but naming the mark without this implies endorsement.
export const RULES_DISCLAIMER =
  "Follows the two-handed pinochle rules as published at bicyclecards.com. " +
  "Bicycle® is a trademark of The United States Playing Card Company; this " +
  "app is not affiliated with or endorsed by USPC.";

export interface Meld {
  name: string;
  detail: string;
  points: number;
}

export const MELDS: Meld[] = [
  { name: "Flush", detail: "A 10 K Q J of trump", points: 150 },
  { name: "Royal marriage", detail: "K + Q of trump", points: 40 },
  { name: "Marriage", detail: "K + Q, any other suit", points: 20 },
  { name: "Dix", detail: "9 of trump", points: 10 },
  { name: "Hundred aces", detail: "A of every suit", points: 100 },
  { name: "Eighty kings", detail: "K of every suit", points: 80 },
  { name: "Sixty queens", detail: "Q of every suit", points: 60 },
  { name: "Forty jacks", detail: "J of every suit", points: 40 },
  { name: "Pinochle", detail: "Q of spades + J of diamonds", points: 40 },
  { name: "Double pinochle", detail: "both pinochles at once", points: 300 },
];

/* -- Screenshots ---------------------------------------------------------- */
export type Device = "iPhone" | "iPad" | "Mac" | "Apple TV";

export interface Shot {
  device: Device;
  platformIcon: PlatformIcon;
  label: string;
  /** Base filename under public/img/shots/ (without extension). */
  file: string;
  alt: string;
  /** Intrinsic aspect ratio (width / height) of the screenshot. */
  ratio: number;
}

// Optimized from /Users/jason/code/pinochle/Docs/store-shots/ by
// scripts/optimize-assets.mjs into public/img/shots/*.webp.
export const SHOTS: Shot[] = [
  // iPhone 6.9" — 2868×1320
  {
    device: "iPhone",
    platformIcon: "iphone",
    label: "Title",
    file: "iphone69-4-title",
    alt: "Pinochle title screen on iPhone",
    ratio: 2868 / 1320,
  },
  {
    device: "iPhone",
    platformIcon: "iphone",
    label: "Melding",
    file: "iphone69-2-melds",
    alt: "Melds laid out on the table on iPhone",
    ratio: 2868 / 1320,
  },
  {
    device: "iPhone",
    platformIcon: "iphone",
    label: "Trick play",
    file: "iphone69-1-trick",
    alt: "Playing a trick on iPhone",
    ratio: 2868 / 1320,
  },
  {
    device: "iPhone",
    platformIcon: "iphone",
    label: "How to play",
    file: "iphone69-3-rules",
    alt: "The illustrated rules screen on iPhone",
    ratio: 2868 / 1320,
  },
  // iPad 13" — 2752×2064
  {
    device: "iPad",
    platformIcon: "ipad",
    label: "Title",
    file: "ipad13-4-title",
    alt: "Pinochle title screen on iPad",
    ratio: 2752 / 2064,
  },
  {
    device: "iPad",
    platformIcon: "ipad",
    label: "Melding",
    file: "ipad13-2-melds",
    alt: "Melds laid out on the table on iPad",
    ratio: 2752 / 2064,
  },
  {
    device: "iPad",
    platformIcon: "ipad",
    label: "Trick play",
    file: "ipad13-1-trick",
    alt: "Playing a trick on iPad",
    ratio: 2752 / 2064,
  },
  {
    device: "iPad",
    platformIcon: "ipad",
    label: "How to play",
    file: "ipad13-3-rules",
    alt: "The illustrated rules screen on iPad",
    ratio: 2752 / 2064,
  },
  // Mac — 2880×1800
  {
    device: "Mac",
    platformIcon: "mac",
    label: "Title",
    file: "mac-4-title",
    alt: "Pinochle title screen on Mac",
    ratio: 2880 / 1800,
  },
  {
    device: "Mac",
    platformIcon: "mac",
    label: "Melding",
    file: "mac-2-melds",
    alt: "Melds laid out on the table on Mac",
    ratio: 2880 / 1800,
  },
  {
    device: "Mac",
    platformIcon: "mac",
    label: "Trick play",
    file: "mac-1-trick",
    alt: "Playing a trick on Mac",
    ratio: 2880 / 1800,
  },
  {
    device: "Mac",
    platformIcon: "mac",
    label: "How to play",
    file: "mac-3-rules",
    alt: "The illustrated rules screen on Mac",
    ratio: 2880 / 1800,
  },
  // Apple TV — 3840×2160
  {
    device: "Apple TV",
    platformIcon: "appletv",
    label: "Title",
    file: "appletv-4-title",
    alt: "Pinochle title screen on Apple TV",
    ratio: 3840 / 2160,
  },
  {
    device: "Apple TV",
    platformIcon: "appletv",
    label: "Melding",
    file: "appletv-2-melds",
    alt: "Melds laid out on the table on Apple TV",
    ratio: 3840 / 2160,
  },
  {
    device: "Apple TV",
    platformIcon: "appletv",
    label: "Trick play",
    file: "appletv-1-trick",
    alt: "Playing a trick on Apple TV",
    ratio: 3840 / 2160,
  },
  {
    device: "Apple TV",
    platformIcon: "appletv",
    label: "How to play",
    file: "appletv-3-rules",
    alt: "The illustrated rules screen on Apple TV",
    ratio: 3840 / 2160,
  },
];

export const DEVICES: Device[] = ["iPhone", "iPad", "Mac", "Apple TV"];

/** The single hero screenshot (iPhone melding — the most colorful shot). */
export const HERO_SHOT = "iphone69-2-melds";

/* -- Game Center: achievements & leaderboards ----------------------------- */
// Card artwork optimized from /Users/jason/code/pinochle/Docs/gc-assets/ into
// public/img/gc/*.webp. Names are the app's achievement / leaderboard titles.
export interface Badge {
  file: string;
  name: string;
}

export const ACHIEVEMENTS: Badge[] = [
  { file: "ach.first_win", name: "First Win" },
  { file: "ach.regular", name: "Regular" },
  { file: "ach.on_a_tear", name: "On a Tear" },
  { file: "ach.comeback", name: "Comeback" },
  { file: "ach.sweep", name: "Sweep" },
  { file: "ach.skunked", name: "Skunked" },
  { file: "ach.big_deal", name: "Big Deal" },
  { file: "ach.double_pinochle", name: "Double Pinochle" },
  { file: "ach.run", name: "Run" },
  { file: "ach.aces_around", name: "Aces Around" },
  { file: "ach.club_champion", name: "Club Champion" },
  { file: "ach.called_it", name: "Called It" },
  { file: "ach.matchmaker", name: "Matchmaker" },
  { file: "ach.nine_lives", name: "Nine Lives" },
  { file: "ach.everywhere", name: "Everywhere" },
];

export const LEADERBOARDS: Badge[] = [
  { file: "lb.wins.total", name: "Total Wins" },
  { file: "lb.wins.weekly", name: "Weekly Wins" },
  { file: "lb.streak.best", name: "Best Streak" },
  { file: "lb.deal.best", name: "Best Deal" },
  { file: "lb.meld.best", name: "Best Meld" },
];

/* -- Privacy policy ------------------------------------------------------- */
// The policy prose itself lives in src/app/privacy/page.tsx — it reads as one
// legal document there. Only the facts that have to stay in sync (or that the
// App Store listing points at) live here.
export const PRIVACY = {
  /** Rendered as "Last updated" on /privacy. Bump whenever the prose changes. */
  updated: "July 28, 2026",
  /** Apple governs Game Center and SharePlay data under its own policy. */
  applePolicyUrl: "https://www.apple.com/legal/privacy/",
  /** The support address given in the policy and the App Store listing. */
  contactEmail: "privacy@jasonruesch.dev",
} as const;
