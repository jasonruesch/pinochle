import type { ReactNode } from "react";
import { AppLink } from "../_components/app-link";
import { AppStoreBadge } from "../_components/app-store-badge";
import { Card } from "../_components/card";
import { DeviceFrame } from "../_components/device-frame";
import { Eyebrow } from "../_components/eyebrow";
import { asset } from "../_lib/asset";
import {
  APP,
  COUNTERS,
  DEAL_POINTS,
  MELD_CLASSES,
  MELDS,
  RANK_ORDER,
  RULES_DISCLAIMER,
  RULES_FACTS,
  RULES_FAQS,
  RULES_TIPS,
  SHOTS,
  type MeldClass,
} from "../_lib/content";
import { canonicalUrl, PAGES } from "../_lib/seo";
import { useActiveSection } from "../_lib/use-active-section";
import { usePageMeta } from "../_lib/use-page-meta";

/**
 * The full two-handed pinochle rules — the site's one piece of content written
 * for search rather than for the store listing ("how to play pinochle 2
 * players" is a steady query with few good modern pages, and every reader is a
 * prospect). The prose lives here rather than in _lib/content.ts, the way the
 * policy does on /privacy: it reads as one document. Only the tables come from
 * content.ts, where they are pinned to the app's own Core rules.
 *
 * Everything here is the ruleset the app actually plays. If the engine's
 * defaults change (RulesConfig), this page changes with it.
 */

const PATH = "/how-to-play";

const SECTIONS = [
  { id: "at-a-glance", nav: "At a glance", title: "The game at a glance" },
  { id: "the-cards", nav: "The cards", title: "The pinochle deck" },
  { id: "the-deal", nav: "The deal", title: "The deal" },
  {
    id: "phase-one",
    nav: "Phase one",
    title: "Phase one — while the stock lasts",
  },
  { id: "melding", nav: "Melding", title: "Melding and what melds are worth" },
  { id: "the-dix", nav: "The dix", title: "The dix" },
  { id: "phase-two", nav: "Phase two", title: "Phase two — the playoff" },
  { id: "scoring", nav: "Scoring", title: "Counting the tricks" },
  { id: "winning", nav: "Winning", title: "Winning the game" },
  { id: "strategy", nav: "Strategy", title: "Six tips for a stronger game" },
  { id: "faq", nav: "Questions", title: "Frequently asked questions" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

/** Look a section up by id, so the heading and its nav entry can't drift. */
function section(id: SectionId) {
  return SECTIONS.find((s) => s.id === id)!;
}

const HINTS_SHOT = SHOTS.find((s) => s.file === "mac-hints")!;

// schema.org description of the page. Google retired HowTo rich results, so
// this is not chasing a snippet — it is what tells a crawler (and an answer
// engine) that this page is the rules of a specific game, by a named author,
// alongside a specific app.
const SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Two-Handed Pinochle",
    description: PAGES[PATH].description,
    mainEntityOfPage: canonicalUrl(PATH),
    inLanguage: "en",
    author: { "@type": "Person", name: "Jason Ruesch" },
    publisher: { "@type": "Person", name: "Jason Ruesch" },
    about: { "@type": "Thing", name: "Pinochle", alternateName: "Binocle" },
    mentions: {
      "@type": "SoftwareApplication",
      name: APP.name,
      applicationCategory: "GameApplication",
      operatingSystem: "iOS, iPadOS, macOS, tvOS",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: RULES_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
];

export default function HowToPlay() {
  usePageMeta(PATH, { jsonLd: SCHEMA });
  const active = useActiveSection(SECTIONS.map((s) => `#${s.id}`));

  return (
    <>
      {/* Intro — brand surface, so the badge is above the fold for a reader who
          arrived from search and is one click from the store. */}
      <section className="from-brand-600 to-brand-800 relative isolate overflow-hidden bg-linear-to-br via-fuchsia-700 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-white/15 blur-3xl"
        />
        <div className="px-safe-lg relative mx-auto max-w-6xl py-16 sm:py-20">
          <p className="text-xs font-semibold tracking-[0.18em] text-white/90 uppercase">
            The complete rules
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            How to play two-handed pinochle
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/90">
            Pinochle for two players is the original game, not a cut-down
            version of the partnership one — one 48-card deck, twelve cards
            each, and a stock you draw from until it runs dry. Here is the whole
            ruleset: the deal, the melds and what they score, the dix, the
            playoff after the stock is gone, and the race to 1,000.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <AppStoreBadge />
            <p className="max-w-xs text-sm text-white/80">
              Let {APP.shortName} deal, score, and enforce every rule below on
              iPhone, iPad, Mac, and Apple&nbsp;TV.
            </p>
          </div>
        </div>
      </section>

      <div className="px-safe-lg mx-auto max-w-6xl py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-labelledby="toc-heading">
              <Eyebrow as="h2" id="toc-heading" className="mb-3">
                On this page
              </Eyebrow>
              <ol className="space-y-1 text-sm">
                {SECTIONS.map((s) => {
                  const isActive = active === `#${s.id}`;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        aria-current={isActive ? "true" : undefined}
                        className={
                          isActive
                            ? "text-brand-700 dark:text-brand-300 block rounded-md bg-brand-50 px-3 py-1.5 font-semibold dark:bg-brand-900/40"
                            : "hover:text-brand-700 dark:hover:text-brand-300 block rounded-md px-3 py-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                        }
                      >
                        {s.nav}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <Card
              className="mt-8 hidden lg:block"
              accent="from-brand-500 to-fuchsia-500"
            >
              <img
                src={asset("img/app-icon.webp")}
                alt=""
                aria-hidden="true"
                className="h-12 w-12 rounded-[0.9rem] ring-1 ring-black/5 dark:ring-white/10"
              />
              <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Play it on your Apple devices
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Legal moves highlighted, melds suggested, scoring handled.
              </p>
              <AppStoreBadge className="mt-4 scale-90 origin-left" />
            </Card>
          </aside>

          <article className="max-w-3xl">
            <RuleSection {...section("at-a-glance")}>
              <p>
                Two-handed pinochle is a trick-taking game for exactly two
                players, and every deal comes in two halves. While the stock
                lasts you may play any card you like, and the winner of each
                trick scores a meld and draws a replacement. Once the stock is
                gone the rules tighten, melding stops, and the two of you play
                out the twelve cards left in hand for the points inside them.
              </p>
              <dl className="mt-6 grid gap-x-8 gap-y-3 rounded-2xl bg-zinc-50 p-6 ring-1 ring-zinc-200 sm:grid-cols-2 dark:bg-zinc-900 dark:ring-zinc-800">
                {RULES_FACTS.map((fact) => (
                  <div key={fact.term}>
                    <dt className="text-xs font-semibold tracking-[0.14em] text-zinc-500 uppercase dark:text-zinc-500">
                      {fact.term}
                    </dt>
                    <dd className="mt-0.5 text-sm text-zinc-800 dark:text-zinc-200">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </RuleSection>

            <RuleSection {...section("the-cards")}>
              <p>
                Pinochle has its own deck: 48 cards, two copies each of the ace,
                ten, king, queen, jack and nine in every suit. Nothing below a
                nine is used. Away from a screen you can build one from two
                ordinary 52-card decks — pull those six ranks in all four suits
                from both decks and shuffle the 48 together.
              </p>
              <RankStrip />
              <p>
                That ranking is the first thing to catch a new player out: the
                ten is not a low card. It sits second, above the king, beaten
                only by the ace — and it is worth ten points to whoever captures
                it.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Twelve cards of each suit are in the deck, so whichever suit
                  is trump, there are twelve trumps in play and you will see
                  most of them.
                </li>
                <li>
                  Because every card has a twin, two identical cards regularly
                  meet in one trick. The one played first wins it.
                </li>
              </ul>
            </RuleSection>

            <RuleSection {...section("the-deal")}>
              <p>
                Cut for the first deal; after that it alternates. The dealer
                gives each player twelve cards — three rounds of four at a time,
                non-dealer first. The next card off the pile is turned face up:
                its suit is <strong>trump</strong> for the whole deal. The
                remaining 23 cards go face down across it and form the{" "}
                <strong>stock</strong>.
              </p>
              <p>
                The non-dealer leads the first trick. And if the card turned for
                trump happens to be the nine of trump — the{" "}
                <AppLink href="#the-dix">dix</AppLink> — the dealer scores 10
                for it straight away, before a card is played.
              </p>
            </RuleSection>

            <RuleSection {...section("phase-one")}>
              <p>
                The first twelve tricks are played under loose rules. There is
                no obligation to follow suit and no obligation to try to win:
                play any card in your hand.
              </p>
              <p>
                The trick goes to the higher card of the suit led, unless a
                trump beats it. A card of any other suit cannot win, however
                high — and if both cards are identical, the leader wins.
              </p>
              <p>After each trick, three things happen in order:</p>
              <ol className="list-decimal space-y-2 pl-5 marker:font-semibold">
                <li>
                  The winner may lay down <strong>one meld</strong> and scores
                  it immediately.
                </li>
                <li>
                  The winner draws the top card of the stock; the loser draws
                  the next. Both hands are back to twelve.
                </li>
                <li>The winner leads the next trick.</li>
              </ol>
              <p>
                The last replenishment has a flourish: the final stock card is
                turned face up for both players to see as the trick winner takes
                it, and the loser takes the trump card lying on the table. From
                that point each of you knows one card in the other&apos;s hand —
                and the stock is gone.
              </p>
            </RuleSection>

            <RuleSection {...section("melding")}>
              <p>
                A meld is a scoring combination laid face up on the table in
                front of you. It scores the moment it is declared. The cards
                stay on show but they still belong to your hand: you may play
                any of them to a trick, and whatever survives comes back to your
                hand when the stock runs out.
              </p>
              <p>Three rules govern melding:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Only the winner of the trick just played may meld, and only{" "}
                  <strong>one meld per trick</strong>.
                </li>
                <li>
                  At least one card of the meld must come{" "}
                  <strong>fresh from your hand</strong> — you cannot assemble
                  one entirely from cards already on the table.
                </li>
                <li>
                  A card already melded may join a new meld only in a{" "}
                  <strong>different class</strong>, or in a{" "}
                  <strong>higher-scoring meld of the same class</strong>. A
                  royal marriage can grow into a flush; a flush cannot be broken
                  back down into a marriage.
                </li>
              </ul>
              <MeldTable />
              <p>
                Classes exist only for that third rule. The queen of spades in a
                marriage can go on to make a pinochle (class A to class C) and
                then join the sixty queens (class B) — three scores from one
                card. What she cannot do is make a second marriage.
              </p>
              <p>
                Duplicates score in their own right: a second marriage in the
                same suit, built from the other king and queen, is another 20.
              </p>
            </RuleSection>

            <RuleSection {...section("the-dix")}>
              <p>
                The dix — say <em>deece</em> — is the nine of trump, and it is
                worth 10. It behaves unlike any other meld:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Turned for trump at the deal, it pays{" "}
                  <strong>the dealer</strong> 10 at once.
                </li>
                <li>
                  Held in hand, it is played by exchange: after winning a trick,
                  swap your dix for the trump card lying face up on the table
                  and score 10. You get the better card; the table keeps a nine.
                </li>
                <li>
                  Once a dix is the card on the table — turned there, or already
                  swapped in — there is nothing left to trade for. A second dix
                  is simply shown for its 10 and stays in your hand.
                </li>
                <li>
                  Declaring the dix does <strong>not</strong> use up your meld
                  for that trick. You may swap it and lay down a meld off the
                  same trick.
                </li>
              </ul>
            </RuleSection>

            <RuleSection {...section("phase-two")}>
              <p>
                When the stock is exhausted, melding is over. Every melded card
                returns to its owner&apos;s hand and you each hold twelve — a
                known quantity, much of it already seen.
              </p>
              <p>Now the rules bite. On each trick you must, in this order:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>follow the suit led, if you hold it;</li>
                <li>
                  when <strong>trump</strong> is led, play a higher trump if you
                  have one — you must try to win;
                </li>
                <li>trump the trick if you cannot follow suit;</li>
                <li>and only if you can do none of those, play anything.</li>
              </ul>
              <p>
                In a plain suit you are never forced to overtake — following
                suit is enough. Only trump obliges you to head the trick. The
                winner of the very last trick scores an extra 10.
              </p>
            </RuleSection>

            <RuleSection {...section("scoring")}>
              <p>
                Melds are already banked. What remains is to count the cards you
                captured in tricks:
              </p>
              <CounterTable />
              <p>
                That is {DEAL_POINTS.counters} points sitting in the deck. Add{" "}
                {DEAL_POINTS.lastTrick} for the last trick and every deal is
                worth exactly <strong>{DEAL_POINTS.total}</strong> in counters —
                melds on top of it.
              </p>
              <p>
                Round your trick total to the nearest ten before adding it up: a
                total ending in 7, 8 or 9 rounds up, anything less rounds down.
                47 counts 50; 46 counts 40. Your score for the deal is your
                melds plus your rounded trick points.
              </p>
            </RuleSection>

            <RuleSection {...section("winning")}>
              <p>
                <strong>A single deal</strong> is a complete short game: the
                higher total after one deal wins, and it is the best way to
                learn.
              </p>
              <p>
                <strong>The race to 1,000</strong> is the standard game. Deals
                continue, the deal alternating, until a player reaches 1,000.
              </p>
              <p>
                <strong>Declaring out</strong> is how the race usually ends. At
                any point when it is your turn to act, you may claim you are
                out: that your banked score, this deal&apos;s melds, and the
                counters you have already taken add up to the target. Your
                tricks are counted on the spot. Right, and you win the match
                immediately. Wrong, and you lose it. Cards you have captured are
                yours, so a player who counts carefully can end the game a trick
                early — and a player who guesses can hand it away.
              </p>
              <p>
                If neither of you declares and you both cross 1,000 in the same
                deal, nobody wins on the raw total. The target climbs to 1,250
                and play goes on — then 1,500, and so on, until one of you is
                alone above the line.
              </p>
            </RuleSection>

            <RuleSection {...section("strategy")}>
              <p>
                The rules above are the whole game. These are the habits that
                separate a player who knows them from one who wins with them.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {RULES_TIPS.map((tip) => (
                  <Card key={tip.heading}>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                      {tip.heading}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {tip.body}
                    </p>
                  </Card>
                ))}
              </div>
            </RuleSection>

            <RuleSection {...section("faq")}>
              <dl className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {RULES_FAQS.map((faq) => (
                  <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
                    <dt className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-zinc-600 dark:text-zinc-400">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </RuleSection>

            <div className="mt-14 border-t border-zinc-200 pt-8 dark:border-zinc-800">
              <DeviceFrame shot={HINTS_SHOT} />
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                Learning it at the table is easier with a referee. {APP.name}{" "}
                highlights the cards you may legally play, suggests the melds in
                your hand, and does every count above for you —{" "}
                <AppLink to={{ pathname: "/", hash: "#features" }}>
                  see what else it does
                </AppLink>{" "}
                or ask a rules question on the{" "}
                <AppLink to="/support">support page</AppLink>.
              </p>
              <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-500">
                {RULES_DISCLAIMER}
              </p>
            </div>
          </article>
        </div>
      </div>

      {/* Closing CTA — mirrors the home page's, for readers who scrolled the
          whole ruleset and are the likeliest to install. */}
      <section className="from-brand-600 to-brand-800 relative isolate overflow-hidden bg-linear-to-br via-fuchsia-700 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
        />
        <div className="px-safe-lg relative mx-auto flex max-w-3xl flex-col items-center py-16 text-center sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Now find someone to play
          </h2>
          <p className="mt-3 text-lg text-white/90">
            Three AI opponents, online matches over Game Center, and SharePlay
            over FaceTime — on iPhone, iPad, Mac, and Apple&nbsp;TV.
          </p>
          <div className="mt-8">
            <AppStoreBadge />
          </div>
        </div>
      </section>
    </>
  );
}

/** One numbered rule section: an <h2> anchor plus its prose. */
function RuleSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mt-12 scroll-mt-24 border-t border-zinc-200 pt-10 first:mt-0 first:border-t-0 first:pt-0 dark:border-zinc-800"
    >
      <h2
        id={`${id}-heading`}
        className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50"
      >
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </section>
  );
}

/** Ace high to nine low — the ranking that surprises people. */
function RankStrip() {
  return (
    <div className="mt-6 flex items-center gap-2 sm:gap-3">
      <span className="text-xs font-semibold tracking-[0.14em] text-zinc-500 uppercase dark:text-zinc-500">
        High
      </span>
      <ol className="flex flex-1 items-center gap-1.5 sm:gap-2">
        {RANK_ORDER.map((rank) => (
          <li
            key={rank}
            className="flex h-11 flex-1 items-center justify-center rounded-lg bg-white text-base font-semibold text-zinc-900 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700"
          >
            {rank}
          </li>
        ))}
      </ol>
      <span className="text-xs font-semibold tracking-[0.14em] text-zinc-500 uppercase dark:text-zinc-500">
        Low
      </span>
    </div>
  );
}

const MELD_CLASS_ORDER: MeldClass[] = ["A", "B", "C"];

/** Every meld and its value, grouped by the class that governs re-melding. */
function MeldTable() {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-800">
      <table className="w-full min-w-88 border-collapse text-left text-sm">
        <caption className="sr-only">
          Pinochle melds, their cards, and their point values
        </caption>
        <thead>
          <tr className="bg-zinc-50 dark:bg-zinc-900">
            <th
              scope="col"
              className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-50"
            >
              Meld
            </th>
            <th
              scope="col"
              className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-50"
            >
              Cards
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right font-semibold text-zinc-900 dark:text-zinc-50"
            >
              Points
            </th>
          </tr>
        </thead>
        {MELD_CLASS_ORDER.map((cls) => (
          <tbody
            key={cls}
            className="divide-y divide-zinc-100 border-t border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800"
          >
            <tr>
              <th
                scope="colgroup"
                colSpan={3}
                className="bg-zinc-50/60 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-zinc-500 uppercase dark:bg-zinc-900/60 dark:text-zinc-500"
              >
                Class {cls} · {MELD_CLASSES[cls]}
              </th>
            </tr>
            {MELDS.filter((meld) => meld.cls === cls).map((meld) => (
              <tr key={meld.name}>
                <td className="px-4 py-3 align-top font-medium text-zinc-900 dark:text-zinc-100">
                  {meld.name}
                  {meld.also && (
                    <span className="block text-xs font-normal text-zinc-500 dark:text-zinc-500">
                      also called {meld.also}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 align-top text-zinc-600 dark:text-zinc-400">
                  {meld.detail}
                </td>
                <td className="text-brand-700 dark:text-brand-300 px-4 py-3 text-right align-top font-semibold tabular-nums">
                  {meld.points}
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

/** What each captured card is worth when the tricks are counted. */
function CounterTable() {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-800">
      <table className="w-full min-w-72 border-collapse text-left text-sm">
        <caption className="sr-only">
          Point value of each rank when captured in a trick
        </caption>
        <thead>
          <tr className="bg-zinc-50 dark:bg-zinc-900">
            <th
              scope="col"
              className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-50"
            >
              Card
            </th>
            <th
              scope="col"
              className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-50"
            >
              In the deck
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right font-semibold text-zinc-900 dark:text-zinc-50"
            >
              Each
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right font-semibold text-zinc-900 dark:text-zinc-50"
            >
              Total
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 border-t border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {COUNTERS.map((counter) => (
            <tr key={counter.rank}>
              <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                {counter.rank}
              </td>
              <td className="px-4 py-3 text-zinc-600 tabular-nums dark:text-zinc-400">
                {counter.count}
              </td>
              <td className="px-4 py-3 text-right text-zinc-600 tabular-nums dark:text-zinc-400">
                {counter.points}
              </td>
              <td className="px-4 py-3 text-right font-semibold text-zinc-900 tabular-nums dark:text-zinc-100">
                {counter.points * counter.count}
              </td>
            </tr>
          ))}
          <tr className="bg-zinc-50 dark:bg-zinc-900">
            <td
              colSpan={3}
              className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100"
            >
              Counters in the deck
            </td>
            <td className="px-4 py-3 text-right font-semibold text-zinc-900 tabular-nums dark:text-zinc-100">
              {DEAL_POINTS.counters}
            </td>
          </tr>
          <tr className="bg-zinc-50 dark:bg-zinc-900">
            <td
              colSpan={3}
              className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100"
            >
              Last trick
            </td>
            <td className="px-4 py-3 text-right font-semibold text-zinc-900 tabular-nums dark:text-zinc-100">
              {DEAL_POINTS.lastTrick}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
