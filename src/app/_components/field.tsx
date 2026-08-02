import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type Density = "comfortable" | "compact";

interface BaseFieldProps {
  label: string;
  hint?: ReactNode;
  error?: string;
  density?: Density;
  required?: boolean;
}

const DENSITY: Record<Density, string> = {
  comfortable: "px-3 py-2 text-base sm:text-sm",
  compact: "px-3 py-1.5 text-base sm:text-sm",
};

// No vertical margin here — the caller adds it, because the select wraps its
// control in a relative box that has to own the spacing instead.
const CONTROL_BASE =
  "block w-full rounded-lg border-0 bg-zinc-50 text-zinc-900 ring-1 ring-zinc-200 ring-inset placeholder:text-zinc-400 focus:ring-2 focus-visible:outline-none dark:bg-zinc-950 dark:text-zinc-100 dark:ring-zinc-700";

function controlClass(density: Density, hasError: boolean, extra?: string) {
  const ring = hasError
    ? "focus:ring-rose-500 ring-rose-300 dark:ring-rose-700"
    : "focus:ring-brand-500";
  return [CONTROL_BASE, DENSITY[density], ring, extra]
    .filter(Boolean)
    .join(" ");
}

function RequiredMark() {
  return (
    <>
      <span
        aria-hidden="true"
        className="ml-0.5 text-rose-700 dark:text-rose-300"
      >
        *
      </span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

function FieldLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
    >
      {label}
      {required && <RequiredMark />}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="mt-1 text-sm text-rose-700 dark:text-rose-300">
      {message}
    </p>
  );
}

function FieldHint({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
      {children}
    </p>
  );
}

// Keep the hint available even when an error shows, and describe the field by
// both — WCAG 3.3.2 (instructions stay reachable while the user is fixing it).
function describedBy(name: string, hint: ReactNode, error?: string) {
  return (
    [hint && `${name}-hint`, error && `${name}-error`]
      .filter(Boolean)
      .join(" ") || undefined
  );
}

export type FieldProps = BaseFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "name"> & {
    name: string;
  };

export function Field({
  label,
  hint,
  error,
  density = "comfortable",
  required,
  name,
  ...rest
}: FieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={name} label={label} required={required} />
      <input
        id={name}
        name={name}
        required={required}
        aria-required={required ? "true" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className={controlClass(density, Boolean(error), "mt-1")}
        {...rest}
      />
      {hint && <FieldHint id={`${name}-hint`}>{hint}</FieldHint>}
      {error && <FieldError id={`${name}-error`} message={error} />}
    </div>
  );
}

export type FieldTextareaProps = BaseFieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "name"> & {
    name: string;
  };

export function FieldTextarea({
  label,
  hint,
  error,
  density = "comfortable",
  required,
  name,
  rows = 6,
  ...rest
}: FieldTextareaProps) {
  return (
    <div>
      <FieldLabel htmlFor={name} label={label} required={required} />
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        aria-required={required ? "true" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className={controlClass(density, Boolean(error), "mt-1")}
        {...rest}
      />
      {hint && <FieldHint id={`${name}-hint`}>{hint}</FieldHint>}
      {error && <FieldError id={`${name}-error`} message={error} />}
    </div>
  );
}

export type FieldSelectProps = BaseFieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "name"> & {
    name: string;
    /** Option values; the visible label is the value itself. */
    options: readonly string[];
    /** Shown as a disabled-looking first option when the value is empty. */
    placeholder?: string;
  };

export function FieldSelect({
  label,
  hint,
  error,
  density = "comfortable",
  required,
  name,
  options,
  placeholder,
  ...rest
}: FieldSelectProps) {
  return (
    <div>
      <FieldLabel htmlFor={name} label={label} required={required} />
      {/* appearance-none plus our own chevron: Safari ignores the ring and
          radius on a natively-styled select, so it wouldn't match the inputs
          beside it. */}
      <div className="relative mt-1">
        <select
          id={name}
          name={name}
          required={required}
          aria-required={required ? "true" : undefined}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy(name, hint, error)}
          className={controlClass(
            density,
            Boolean(error),
            "appearance-none pr-9",
          )}
          {...rest}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      {hint && <FieldHint id={`${name}-hint`}>{hint}</FieldHint>}
      {error && <FieldError id={`${name}-error`} message={error} />}
    </div>
  );
}
