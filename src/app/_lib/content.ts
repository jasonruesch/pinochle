// All marketing copy is sourced verbatim (or lightly condensed) from the app's
// App Store listing kit — /Users/jason/code/jasonruesch/pinochle-app/Docs/StoreListing.md — and
// the in-app "How to Play" screen. Keep this the single source of truth for
// site content.

/* -- App Store listing ---------------------------------------------------- */
// TODO(release): these are placeholders — replace with the real values from the
// live App Store Connect record before merging. `appId` is the only one the
// links actually resolve on: it's the numeric id in the listing URL
// (apps.apple.com/app/<slug>/id123456789). The slug is cosmetic.
export const STORE = {
  appId: "6759009060",
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

/**
 * The three meld classes (MeldDefs.ClassOf in the app's Core). They only matter
 * for the re-meld rule — a card already on the table can join a new meld in a
 * different class, or a higher-scoring meld of the same class.
 */
export type MeldClass = "A" | "B" | "C";

export const MELD_CLASSES: Record<MeldClass, string> = {
  A: "Flushes & marriages",
  B: "Arounds",
  C: "Pinochles",
};

export interface Meld {
  name: string;
  detail: string;
  points: number;
  cls: MeldClass;
  /** Equally common alternate name, shown on the full rules page. */
  also?: string;
}

export const MELDS: Meld[] = [
  { name: "Flush", detail: "A 10 K Q J of trump", points: 150, cls: "A" },
  { name: "Royal marriage", detail: "K + Q of trump", points: 40, cls: "A" },
  { name: "Marriage", detail: "K + Q, any other suit", points: 20, cls: "A" },
  { name: "Dix", detail: "9 of trump", points: 10, cls: "A" },
  {
    name: "Hundred aces",
    detail: "A of every suit",
    points: 100,
    cls: "B",
    also: "Aces around",
  },
  {
    name: "Eighty kings",
    detail: "K of every suit",
    points: 80,
    cls: "B",
    also: "Kings around",
  },
  {
    name: "Sixty queens",
    detail: "Q of every suit",
    points: 60,
    cls: "B",
    also: "Queens around",
  },
  {
    name: "Forty jacks",
    detail: "J of every suit",
    points: 40,
    cls: "B",
    also: "Jacks around",
  },
  {
    name: "Pinochle",
    detail: "Q of spades + J of diamonds",
    points: 40,
    cls: "C",
  },
  {
    name: "Double pinochle",
    detail: "both pinochles at once",
    points: 300,
    cls: "C",
  },
];

/* -- Full rules page (/how-to-play) --------------------------------------- */
// The prose lives in src/app/how-to-play/page.tsx — it reads as one document
// there, the way the policy does on /privacy. Only the tabular parts live here.
// Every value is the app's own behavior (Core/Rules/Scoring.cs, MeldDefs,
// RulesConfig defaults), so the page can't drift from the game it teaches.

/** Card values when captured in a trick — Cards.PointsOf in the app's Core. */
export interface Counter {
  rank: string;
  points: number;
  /** How many of that rank are in the 48-card deck. */
  count: number;
}

export const COUNTERS: Counter[] = [
  { rank: "Ace", points: 11, count: 8 },
  { rank: "Ten", points: 10, count: 8 },
  { rank: "King", points: 4, count: 8 },
  { rank: "Queen", points: 3, count: 8 },
  { rank: "Jack", points: 2, count: 8 },
  { rank: "Nine", points: 0, count: 8 },
];

/** Counters in the deck (240) plus the last-trick bonus (10) — Scoring.cs. */
export const DEAL_POINTS = {
  counters: 240,
  lastTrick: 10,
  total: 250,
} as const;

/** Rank order, high to low. The ten sitting second is pinochle's odd note. */
export const RANK_ORDER = ["A", "10", "K", "Q", "J", "9"] as const;

/** The at-a-glance table at the top of /how-to-play. */
export const RULES_FACTS: { term: string; value: string }[] = [
  { term: "Players", value: "2" },
  { term: "Deck", value: "48 cards — A 10 K Q J 9, twice in each suit" },
  { term: "Dealt", value: "12 cards each; the next card turned for trump" },
  {
    term: "Points per deal",
    value: "250 — 240 in counters, 10 for the last trick",
  },
  { term: "Game", value: "First to 1,000, or a single deal" },
  { term: "A deal takes", value: "About ten minutes" },
];

export interface Tip {
  heading: string;
  body: string;
}

export const RULES_TIPS: Tip[] = [
  {
    heading: "Trump is currency, not treasure",
    body: "There are only 12 trumps in the deck and you will see most of them. Spending a low trump to steal a trick in phase one buys you a meld and a draw; hoarding trump you never play wins nothing. The exception is the five cards of a flush — never break those up for a single trick.",
  },
  {
    heading: "Respect the ten",
    body: "The ten ranks second, above the king, and carries 10 counters. That makes it the most dangerous card in your hand: lead a bare ten and you are offering your opponent ten points and the lead. Save tens to capture with, or lead them only when you hold the ace.",
  },
  {
    heading: "Melded cards are still your hand",
    body: "A meld on the table is only borrowed — those cards come back for phase two, and in the meantime you may have to play one to a trick. Before you break up a marriage to win a trick, count what phase two will cost you.",
  },
  {
    heading: "Meld small early, big late",
    body: "Melds score the instant they hit the table, so there is no reward for waiting — except that laying down a marriage now may cost you the flush later. Take the cheap 20 early when your hand is unformed, and hold cards that are one draw from a flush or an around.",
  },
  {
    heading: "Throw nines, not counters",
    body: "In phase one you never have to follow suit, so a trick you do not want costs you nothing but the card you throw. Nines are worth zero — feed them to your opponent's aces and keep every counter for the tricks you intend to win.",
  },
  {
    heading: "Play the last tricks of phase one for phase two",
    body: "Once the stock is gone, following suit becomes law and a void in a plain suit turns your small trump into a winner. Late in phase one, stop collecting and start shaping: shed a whole suit, keep your trump length, and take the last trick's draw with the lead in hand.",
  },
];

export const RULES_FAQS: Faq[] = [
  {
    question: "Can you play pinochle with only 2 players?",
    answer:
      "Yes — two-handed pinochle is the original form of the game, and it is a genuine duel rather than a cut-down version of the four-player partnership game. One 48-card pinochle deck, 12 cards each, and a stock you draw from until it runs out.",
  },
  {
    question: "How many cards are in a pinochle deck?",
    answer:
      "48. Two copies each of the ace, ten, king, queen, jack and nine in all four suits. You can build one from two standard 52-card decks by pulling those six ranks from each and shuffling them together.",
  },
  {
    question: "What beats what in pinochle?",
    answer:
      "Ace, ten, king, queen, jack, nine — high to low. The ten is the surprise: it outranks the king and is beaten only by the ace. Any trump beats any plain-suit card, and when two identical cards meet, the one played first wins the trick.",
  },
  {
    question: "Do you have to follow suit in two-handed pinochle?",
    answer:
      "Not while the stock lasts — in phase one you may play any card in your hand. Once the stock is exhausted the rules tighten: you must follow suit, you must trump when you cannot follow, and when trump is led you must beat it if you can.",
  },
  {
    question: "What is a pinochle?",
    answer:
      "The meld that gives the game its name: the queen of spades together with the jack of diamonds, worth 40. Holding both queens of spades and both jacks of diamonds is a double pinochle — 300 points, and the biggest meld in the game.",
  },
  {
    question: "What is the dix in pinochle?",
    answer:
      "The dix (say “deece”) is the nine of trump, worth 10. If the card turned for trump is the dix, the dealer scores 10 at once. Otherwise, after winning a trick you may swap a dix from your hand for the turned-up trump card and score its 10.",
  },
  {
    question: "How many points do you need to win at pinochle?",
    answer:
      "The standard game is a race to 1,000 across as many deals as it takes, with 250 points on the table each deal. A single deal on its own is a perfectly good short game — the higher total after one deal wins.",
  },
  {
    question: "How long does a game of two-handed pinochle take?",
    answer:
      "A single deal is about ten minutes. A full race to 1,000 usually runs four to six deals, so roughly three quarters of an hour — less when the melds fall your way.",
  },
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

// Optimized from /Users/jason/code/jasonruesch/pinochle-app/Builds/store-raw/ by
// scripts/optimize-assets.mjs into public/img/shots/*.webp. Those are the bare
// device captures; the App Store panels in Docs/store-shots bake in marketing
// headlines, which would double up inside this site's own DeviceFrame.
export const SHOTS: Shot[] = [
  // iPhone 6.9" — 2868×1320
  {
    device: "iPhone",
    platformIcon: "iphone",
    label: "Title",
    file: "iphone69-title",
    alt: "Pinochle title screen on iPhone",
    ratio: 2868 / 1320,
  },
  {
    device: "iPhone",
    platformIcon: "iphone",
    label: "Classic play",
    file: "iphone69-classic",
    alt: "A deal against the computer with melds on the table, on iPhone",
    ratio: 2868 / 1320,
  },
  {
    device: "iPhone",
    platformIcon: "iphone",
    label: "Online play",
    file: "iphone69-online",
    alt: "An online Game Center match in progress on iPhone",
    ratio: 2868 / 1320,
  },
  {
    device: "iPhone",
    platformIcon: "iphone",
    label: "Hints",
    file: "iphone69-hints",
    alt: "Easy mode highlighting a suggested card on iPhone",
    ratio: 2868 / 1320,
  },
  // iPad 13" — 2752×2064
  {
    device: "iPad",
    platformIcon: "ipad",
    label: "Title",
    file: "ipad13-title",
    alt: "Pinochle title screen on iPad",
    ratio: 2752 / 2064,
  },
  {
    device: "iPad",
    platformIcon: "ipad",
    label: "Classic play",
    file: "ipad13-classic",
    alt: "A deal against the computer with melds on the table, on iPad",
    ratio: 2752 / 2064,
  },
  {
    device: "iPad",
    platformIcon: "ipad",
    label: "Online play",
    file: "ipad13-online",
    alt: "An online Game Center match in progress on iPad",
    ratio: 2752 / 2064,
  },
  {
    device: "iPad",
    platformIcon: "ipad",
    label: "Hints",
    file: "ipad13-hints",
    alt: "Easy mode highlighting a suggested card on iPad",
    ratio: 2752 / 2064,
  },
  // Mac — 2880×1800
  {
    device: "Mac",
    platformIcon: "mac",
    label: "Title",
    file: "mac-title",
    alt: "Pinochle title screen on Mac",
    ratio: 2880 / 1800,
  },
  {
    device: "Mac",
    platformIcon: "mac",
    label: "Classic play",
    file: "mac-classic",
    alt: "A deal against the computer with melds on the table, on Mac",
    ratio: 2880 / 1800,
  },
  {
    device: "Mac",
    platformIcon: "mac",
    label: "Online play",
    file: "mac-online",
    alt: "An online Game Center match in progress on Mac",
    ratio: 2880 / 1800,
  },
  {
    device: "Mac",
    platformIcon: "mac",
    label: "Hints",
    file: "mac-hints",
    alt: "Easy mode highlighting a suggested card on Mac",
    ratio: 2880 / 1800,
  },
  // Apple TV — 3840×2160
  {
    device: "Apple TV",
    platformIcon: "appletv",
    label: "Title",
    file: "appletv-title",
    alt: "Pinochle title screen on Apple TV",
    ratio: 3840 / 2160,
  },
  {
    device: "Apple TV",
    platformIcon: "appletv",
    label: "Classic play",
    file: "appletv-classic",
    alt: "A deal against the computer with melds on the table, on Apple TV",
    ratio: 3840 / 2160,
  },
  {
    device: "Apple TV",
    platformIcon: "appletv",
    label: "Online play",
    file: "appletv-online",
    alt: "An online Game Center match in progress on Apple TV",
    ratio: 3840 / 2160,
  },
  {
    device: "Apple TV",
    platformIcon: "appletv",
    label: "Hints",
    file: "appletv-hints",
    alt: "Easy mode highlighting a suggested card on Apple TV",
    ratio: 3840 / 2160,
  },
];

export const DEVICES: Device[] = ["iPhone", "iPad", "Mac", "Apple TV"];

/** The single hero screenshot (iPhone melding — the most colorful shot). */
export const HERO_SHOT = "iphone69-classic";

/* -- Game Center: achievements & leaderboards ----------------------------- */
// Card artwork optimized from /Users/jason/code/jasonruesch/pinochle-app/Docs/gc-assets/ into
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

/* -- Support -------------------------------------------------------------- */
// /support is the app's Support URL in App Store Connect, so it has to stay
// reachable and answer what the listing can't. Anything factual here (Game
// Center, SharePlay, on-device storage) must stay consistent with /privacy and
// the app's own behavior.
export const SUPPORT = {
  /** The support address given on /support and in the App Store listing. */
  email: "support@jasonruesch.dev",
  /** Turnaround quoted on the page — keep it a promise that can be kept. */
  responseTime: "within a few days",
  /** Apple owns billing, so refunds and receipts go through them, not us. */
  refundUrl: "https://reportaproblem.apple.com",
} as const;

/** Subject-line categories in the support form's topic picker. */
export const SUPPORT_TOPICS = [
  "Bug report",
  "Online play / Game Center",
  "SharePlay",
  "Rules question",
  "Feature request",
  "Accessibility",
  "Something else",
] as const;

export interface Faq {
  question: string;
  answer: string;
  /** Optional follow-up link rendered after the answer. */
  link?: { label: string; href: string };
}

export const SUPPORT_FAQS: Faq[] = [
  {
    question: "My online match won't start or won't find an opponent.",
    answer:
      "Online play runs on Apple's Game Center. Open Settings › Game Center and make sure you're signed in and that multiplayer isn't restricted under Screen Time, then try the match again. Quick match needs another player looking at the same time — if nobody turns up, invite a friend instead.",
  },
  {
    question: "SharePlay isn't offered on my FaceTime call.",
    answer:
      "Start the FaceTime call first, then open Pinochle and start the match — SharePlay appears once the call is already active. Everyone on the call needs the app installed and up to date, on iPhone, iPad, or Mac. SharePlay isn't available on Apple TV.",
  },
  {
    question: "My achievements or leaderboard scores are missing.",
    answer:
      "Achievements and leaderboards live in your Game Center profile, not in the app, and follow the Apple Account you're signed in with. If they look empty on a second device, check that it's signed into the same account.",
  },
  {
    question: "Does my progress carry between devices?",
    answer:
      "Match progress and settings are stored on the device itself — nothing is collected or synced by the developer. Your Game Center record (wins, streaks, best deal and meld) does follow your Apple Account across devices.",
  },
  {
    question: "The game wouldn't let me play a card.",
    answer:
      "Once the stock runs out, phase two begins: you must follow the suit led, and if you can beat the trick you have to. Cards you can't legally play are dimmed. The in-app How to Play screen walks through the full ruleset.",
  },
  {
    question: "Can I play on Apple TV with a controller?",
    answer:
      "Yes — Apple TV uses a focus-based interface, and game controllers are supported there as well as on iPhone, iPad, and Mac.",
  },
  {
    question: "I want a refund, or I was charged incorrectly.",
    answer:
      "Purchases and billing are handled entirely by Apple; the developer never sees a payment. Refunds and receipts go through Apple's own reporting page.",
    link: { label: "reportaproblem.apple.com", href: SUPPORT.refundUrl },
  },
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
