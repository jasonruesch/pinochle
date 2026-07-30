import type { ReactNode } from "react";
import { AppLink } from "../_components/app-link";
import { Eyebrow } from "../_components/eyebrow";
import { PRIVACY } from "../_lib/content";
import { useDocumentTitle } from "../_lib/use-document-title";

/**
 * The privacy policy of record — this is the URL given to App Store Connect, so
 * the prose here is the published policy. Keep edits deliberate and bump
 * PRIVACY.updated in _lib/content.ts whenever the text changes.
 */
export default function Privacy() {
  useDocumentTitle("Privacy Policy");
  return (
    <div className="px-safe-lg mx-auto max-w-3xl py-16 sm:py-20">
      <Eyebrow className="mb-3">Legal</Eyebrow>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        Pinochle Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500">
        Last updated: {PRIVACY.updated}
      </p>
      <p className="mt-8 text-lg text-zinc-600 dark:text-zinc-400">
        Pinochle (&ldquo;the app&rdquo;) is a card game for iPhone, iPad, Mac,
        and Apple TV, developed by Jason Ruesch.
      </p>

      <Clause heading="Data collection">
        <p>
          The app does not collect, store, or transmit any personal data. There
          are no accounts, no analytics, no advertising, and no tracking of any
          kind. Your match progress and settings are stored only on your device
          (and in your personal iCloud/Game Center data managed by Apple, where
          applicable).
        </p>
      </Clause>

      <Clause heading="Game Center">
        <p>
          Online multiplayer, leaderboards, and achievements are provided by
          Apple&apos;s Game Center service. When you use these features, your
          Game Center identity and gameplay results are handled directly by
          Apple under{" "}
          <AppLink href={PRIVACY.applePolicyUrl} variant="external">
            Apple&apos;s own privacy policy
          </AppLink>
          . The developer does not receive, collect, or store any of this
          information.
        </p>
      </Clause>

      <Clause heading="SharePlay">
        <p>
          Joining a match over FaceTime uses Apple&apos;s SharePlay. Session
          data is exchanged directly between participants&apos; devices through
          Apple&apos;s Group Activities service; the developer does not receive
          or store any of it.
        </p>
      </Clause>

      <Clause heading="Children's privacy">
        <p>The app does not collect data from anyone, including children.</p>
      </Clause>

      <Clause heading="Changes">
        <p>
          If this policy ever changes, the updated version will be posted at
          this URL with a new date.
        </p>
      </Clause>

      <Clause heading="Contact">
        <p>
          Questions? Email{" "}
          <AppLink href={`mailto:${PRIVACY.contactEmail}`}>
            {PRIVACY.contactEmail}
          </AppLink>
          .
        </p>
      </Clause>
    </div>
  );
}

/** One policy section: a heading plus its paragraph(s). */
function Clause({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {heading}
      </h2>
      <div className="mt-3 space-y-4 text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </section>
  );
}
