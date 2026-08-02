import { useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Alert } from "../_components/alert";
import { AppLink } from "../_components/app-link";
import { Button } from "../_components/button";
import { Card } from "../_components/card";
import { Eyebrow } from "../_components/eyebrow";
import { Field, FieldSelect, FieldTextarea } from "../_components/field";
import {
  APP,
  DEVICES,
  STORE,
  STORE_URL,
  SUPPORT,
  SUPPORT_FAQS,
  SUPPORT_TOPICS,
} from "../_lib/content";
import { useDocumentTitle } from "../_lib/use-document-title";

/**
 * The support page of record — this is the URL given to App Store Connect, so
 * it has to stay reachable and self-sufficient. There's no backend behind the
 * form: it composes a mailto: to SUPPORT.email with the details a bug report
 * needs (topic, device, app version) already filled in.
 */
type FieldName = "name" | "email" | "topic" | "message";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEVICE_OPTIONS = [...DEVICES, "Something else"];

export default function Support() {
  useDocumentTitle("Support");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function validateField(value: string, field: FieldName): string | undefined {
    const v = value.trim();
    switch (field) {
      case "name":
        if (!v) return "Your name is required.";
        return undefined;
      case "email":
        if (!v) return "An email address is required.";
        if (!EMAIL_RE.test(v)) return "Enter a valid email address.";
        return undefined;
      case "topic":
        if (!v) return "Choose what your message is about.";
        return undefined;
      case "message":
        if (!v) return "A message is required.";
        return undefined;
    }
  }

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    for (const field of ["name", "email", "topic", "message"] as const) {
      const message = validateField(String(data.get(field) ?? ""), field);
      if (message) next[field] = message;
    }
    return next;
  }

  function handleFieldBlur(
    e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const field = e.target.name as FieldName;
    // Only revalidate fields that were flagged invalid on the last attempt.
    if (!errors[field]) return;
    const message = validateField(e.target.value, field);
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }

  function focusFirstError(next: Errors) {
    const order: FieldName[] = ["name", "email", "topic", "message"];
    for (const field of order) {
      if (!next[field]) continue;
      const el = formRef.current?.querySelector<HTMLElement>(`#${field}`);
      if (!el) return;
      // Focus without the browser's own scroll, then drive the scroll
      // ourselves: focus()'s implicit scroll is unreliable on mobile (it can
      // land off-target or leave the field under the sticky header), and it
      // won't scroll at all when the field is already focused — so we always
      // center the field explicitly, regardless of focus or prior state.
      el.focus({ preventScroll: true });
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(form);
    if (Object.keys(next).length > 0) {
      setErrors(next);
      setStatus("idle");
      // Defer focus until after the live region has rendered.
      requestAnimationFrame(() => focusFirstError(next));
      return;
    }
    setErrors({});

    // Build the mailto: link in JS rather than via the form's `action`, so the
    // form has no insecure (non-HTTPS) submission target. A mailto: action is
    // what makes browsers disable autofill and warn "this form is not secure"
    // on HTTPS pages.
    const data = new FormData(form);
    const value = (field: string) => String(data.get(field) ?? "").trim();
    const name = value("name");
    const topic = value("topic");
    const device = value("device");
    const version = value("version");
    const lines = [
      `Name: ${name}`,
      `Email: ${value("email")}`,
      `Topic: ${topic}`,
      `Device: ${device || "not given"}`,
      `App version: ${version || "not given"}`,
      "",
      value("message"),
    ];
    const href =
      `mailto:${SUPPORT.email}` +
      `?subject=${encodeURIComponent(`[Pinochle] ${topic} — ${name}`)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;

    setStatus("sent");
    form.reset();
    // Defer the mailto: hand-off so the polite live region below commits
    // "Opening your email client…" first and is reliably announced (WCAG 4.1.3).
    window.setTimeout(() => {
      window.location.href = href;
    }, 150);
  }

  const errorCount = Object.keys(errors).length;

  return (
    <>
      <section className="px-safe-lg mx-auto max-w-6xl py-16 sm:py-20">
        <Eyebrow>Support</Eyebrow>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          Need a hand?
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Found a bug, hit a snag in an online match, or think a rule is being
          scored wrong? Tell me about it — {APP.name} is made by one person, and
          every note is read. Most get a reply {SUPPORT.responseTime}.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[3fr_2fr]">
          <form
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            aria-labelledby="send-heading"
            className="relative space-y-4 overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <div
              aria-hidden
              className="from-brand-500 to-accent-500 absolute inset-x-0 top-0 h-1 bg-linear-to-r via-fuchsia-500"
            />
            <h2
              id="send-heading"
              className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              Send a message
            </h2>
            {/* Persistent live region — keep it always mounted with a stable
                aria-live so swapping the inner content is announced reliably.
                Toggling role/aria-live alongside the content is what AT misses
                (WCAG 4.1.3 Status Messages). */}
            <div aria-live="assertive" aria-atomic="true">
              {errorCount > 0 && (
                <Alert
                  intent="error"
                  title={
                    errorCount === 1
                      ? "1 issue to fix before sending:"
                      : `${errorCount} issues to fix before sending:`
                  }
                >
                  <ul className="list-disc pl-5">
                    {(Object.keys(errors) as FieldName[]).map((field) => (
                      <li key={field}>{errors[field]}</li>
                    ))}
                  </ul>
                </Alert>
              )}
            </div>
            <div aria-live="polite" className="sr-only">
              {status === "sent"
                ? "Opening your email client to send your message."
                : ""}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Your name"
                name="name"
                type="text"
                autoComplete="name"
                required
                error={errors.name}
                onBlur={handleFieldBlur}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                error={errors.email}
                onBlur={handleFieldBlur}
              />
            </div>
            <FieldSelect
              label="What's this about?"
              name="topic"
              options={SUPPORT_TOPICS}
              placeholder="Choose a topic"
              defaultValue=""
              required
              error={errors.topic}
              onBlur={handleFieldBlur}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FieldSelect
                label="Device"
                name="device"
                options={DEVICE_OPTIONS}
                placeholder="Choose a device"
                defaultValue=""
                hint="Helps me reproduce it."
              />
              <Field
                label="App version"
                name="version"
                type="text"
                inputMode="decimal"
                placeholder={STORE.version}
                hint="Shown at the bottom of the app's main title screen."
              />
            </div>
            <FieldTextarea
              label="Message"
              name="message"
              required
              error={errors.message}
              onBlur={handleFieldBlur}
              hint="For a bug: what you were doing, what you expected, and what happened instead."
            />
            <Button type="submit">Send message</Button>
          </form>

          <aside aria-labelledby="reach-heading" className="space-y-6 text-sm">
            <h2 id="reach-heading" className="sr-only">
              Other ways to get help
            </h2>
            <InfoBlock
              label="Email"
              value={SUPPORT.email}
              href={`mailto:${SUPPORT.email}`}
            />
            <InfoBlock
              label="App Store"
              value={
                <span className="flex flex-col items-start gap-1">
                  <AppLink href={STORE_URL} variant="external">
                    Rate or review {APP.shortName}
                  </AppLink>
                  <AppLink href={SUPPORT.refundUrl} variant="external">
                    Refunds &amp; receipts (Apple)
                  </AppLink>
                </span>
              }
            />
            <InfoBlock
              label="Privacy"
              value={
                <>
                  Nothing is collected, tracked, or sent anywhere — see the{" "}
                  <AppLink to="/privacy">privacy policy</AppLink>.
                </>
              }
            />
            <InfoBlock
              label="Before you write"
              value={
                <ul className="list-disc space-y-1 pl-5">
                  <li>
                    Check the{" "}
                    {/* Plain in-page anchor: html has scroll-behavior: smooth
                        and scroll-padding-top for the sticky header (index.css),
                        including the reduced-motion opt-out. */}
                    <AppLink href="#common-questions">common questions</AppLink>{" "}
                    below — many are covered.
                  </li>
                  <li>Note your device and the app version.</li>
                  <li>
                    For an online match, roughly when it happened helps me find
                    it.
                  </li>
                </ul>
              }
            />
          </aside>
        </div>
      </section>

      <section
        id="common-questions"
        aria-labelledby="faq-heading"
        className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40"
      >
        <div className="px-safe-lg mx-auto max-w-6xl py-16 sm:py-20">
          <Eyebrow className="mb-3">Common questions</Eyebrow>
          <h2
            id="faq-heading"
            className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
          >
            Answers before you ask
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            The handful of things that come up most often. If yours isn&apos;t
            here, the form above reaches me directly.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {SUPPORT_FAQS.map((faq) => (
              <Card key={faq.question}>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {faq.answer}
                  {faq.link && (
                    <>
                      {" "}
                      <AppLink href={faq.link.href} variant="external">
                        {faq.link.label}
                      </AppLink>
                    </>
                  )}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

interface InfoBlockProps {
  label: string;
  value: React.ReactNode;
  href?: string;
}

function InfoBlock({ label, value, href }: InfoBlockProps) {
  return (
    <div>
      <Eyebrow tone="neutral">{label}</Eyebrow>
      <div className="mt-1 text-zinc-700 dark:text-zinc-200">
        {href ? <AppLink href={href}>{value}</AppLink> : value}
      </div>
    </div>
  );
}
