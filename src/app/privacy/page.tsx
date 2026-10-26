import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router";
import { AppLink } from "../_components/app-link";
import { Eyebrow } from "../_components/eyebrow";
import { PLATFORM_LIST, PLAY, PRIVACY } from "../_lib/content";
import { usePageMeta } from "../_lib/use-page-meta";

/**
 * The privacy policy of record — this is the URL given to App Store Connect, so
 * the prose here is the published policy. Keep edits deliberate and bump
 * PRIVACY.updated in _lib/content.ts whenever the text changes.
 */
export default function Privacy() {
  usePageMeta("/privacy");
  // A link straight to a section (Google Play's data-deletion link is
  // /privacy#delete-your-data) arrives before the page has rendered, so the
  // browser can't find the anchor itself: scroll to it once it exists.
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);
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
        Pinochle (&ldquo;the app&rdquo;) is a card game for {PLATFORM_LIST},
        developed by Jason Ruesch.
      </p>

      <Clause heading="Data collection">
        <p>
          The app does not collect, store, or transmit any personal data. There
          are no accounts, no analytics, no advertising, and no tracking of any
          kind. Your match progress and settings are stored only on your device
          (and in your personal iCloud/Game Center data managed by Apple
          {PLAY.live && ", or Google Play Games data managed by Google"}, where
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

      {PLAY.live && (
        <Clause heading="Google Play (Android)">
          <p>
            On Android, purchases go through Google Play Billing, and
            leaderboards and achievements through Google Play Games if you sign
            in to it. The date your free trial started is kept in Google&apos;s
            Block Store, tied to your Google Account, so reinstalling
            doesn&apos;t reset it. All of this is handled by Google under{" "}
            <AppLink href={PRIVACY.googlePolicyUrl} variant="external">
              Google&apos;s own privacy policy
            </AppLink>
            ; the developer does not receive, collect, or store any of it.
          </p>
        </Clause>
      )}

      <Clause heading="SharePlay">
        <p>
          Joining a match over FaceTime uses Apple&apos;s SharePlay. Session
          data is exchanged directly between participants&apos; devices through
          Apple&apos;s Group Activities service; the developer does not receive
          or store any of it.
        </p>
      </Clause>

      <Clause heading="Reminders">
        <p>
          If you turn on the optional daily reminder, the app schedules it as a
          local notification on your device, at the time of day you usually
          play. It is not a push notification: nothing is sent to the developer
          or to any server, and you can turn it off in the app&apos;s Settings
          or in your device&apos;s notification settings at any time.
        </p>
      </Clause>

      <Clause heading="Deleting your data" id="delete-your-data">
        <p>
          Pinochle: Two-Handed has no servers, so the developer holds no data
          about you to delete. What the app saves lives in these places, and you
          can remove each one yourself:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>On your device:</strong> your matches, stats, streaks, and
            settings. Deleting the app removes them for good (on Android you can
            also clear its storage in Settings › Apps › Pinochle › Storage).
          </li>
          <li>
            <strong>Game Center (Apple devices):</strong> your scores and
            achievements are kept by Apple with your Apple Account. To have them
            deleted, use{" "}
            <AppLink href="https://privacy.apple.com/" variant="external">
              Apple&apos;s Data and Privacy page
            </AppLink>
            .
          </li>
          <li>
            <strong>Google Play Games (Android):</strong> if you signed in to
            Google Play Games, your achievements, scores, and player profile for
            this game are kept by Google. To delete them, open the Google Play
            Games app, tap your profile, then Settings › Delete Play Games
            account &amp; data, and under &ldquo;Delete individual game
            data&rdquo; choose Pinochle: Two-Handed and Delete. Deleting your
            whole Play Games profile removes this game&apos;s data along with
            the rest.
          </li>
        </ul>
        <p>
          On Android, the date your free trial started is kept by Google with
          your Google Account so that reinstalling the app doesn&apos;t restart
          the trial; it contains no other information. Anonymous diagnostics
          gathered by Google Play Games and the Unity game engine aren&apos;t
          linked to you. Questions about deleting your data? Email{" "}
          <AppLink href={`mailto:${PRIVACY.contactEmail}`}>
            {PRIVACY.contactEmail}
          </AppLink>
          .
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
          . For help with the app itself, use the{" "}
          <AppLink to="/support">support page</AppLink>.
        </p>
      </Clause>
    </div>
  );
}

/** One policy section: a heading plus its paragraph(s). */
function Clause({
  heading,
  id,
  children,
}: {
  heading: string;
  /** An anchor for links straight to this section. */
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-10 scroll-mt-24">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {heading}
      </h2>
      <div className="mt-3 space-y-4 text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </section>
  );
}
