interface IconProps {
  className?: string;
}

/* -- Line icon base ------------------------------------------------------- */
/* Stroke-based 24x24 icons matching the header/theme-toggle icon style. */
function Line({
  className = "h-5 w-5",
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* -- Brand / social ------------------------------------------------------- */
export function GitHubIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.63 13.63h-2.37V9.92c0-.88-.02-2.02-1.23-2.02-1.23 0-1.42.96-1.42 1.96v3.77H6.24V6.04h2.28v1.04h.03c.32-.6 1.09-1.23 2.25-1.23 2.4 0 2.84 1.58 2.84 3.64v4.14ZM3.56 5c-.76 0-1.38-.62-1.38-1.38 0-.76.62-1.37 1.38-1.37.76 0 1.37.61 1.37 1.37 0 .76-.61 1.38-1.37 1.38Zm1.19 8.63H2.37V6.04h2.38v7.59ZM14.82 0H1.18C.53 0 0 .52 0 1.16v13.68C0 15.48.53 16 1.18 16h13.64c.65 0 1.18-.52 1.18-1.16V1.16C16 .52 15.47 0 14.82 0Z" />
    </svg>
  );
}

/** Solid Apple logo — for the App Store badge. */
export function AppleIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.05 12.54c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.29 1.15-.05 1.58-.74 2.97-.74 1.39 0 1.78.74 3 .72 1.24-.02 2.02-1.12 2.78-2.23.88-1.28 1.24-2.52 1.26-2.58-.03-.01-2.42-.93-2.44-3.68ZM14.77 5.8c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.68 1.37-.59.68-1.11 1.77-.97 2.81 1.02.08 2.07-.52 2.71-1.28Z" />
    </svg>
  );
}

/* -- Platform icons ------------------------------------------------------- */
export function IPhoneIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="7" y="2" width="10" height="20" rx="2.5" />
      <path d="M11 18.5h2" />
    </Line>
  );
}

export function IPadIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M11 18.5h2" />
    </Line>
  );
}

export function MacIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M2 20h20M9.5 16l-.5 4M15 20l-.5-4" />
    </Line>
  );
}

export function AppleTVIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </Line>
  );
}

/* -- Feature icons -------------------------------------------------------- */
export function CardsIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="3" y="6" width="11" height="15" rx="2" />
      <path d="M8.5 11.5 6 14l2.5 2.5" opacity="0" />
      <path d="m9.8 3.2 8.4 2.9a2 2 0 0 1 1.25 2.54l-3.2 9.3" />
    </Line>
  );
}

export function CpuIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </Line>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </Line>
  );
}

export function FaceTimeIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="3" y="6" width="12" height="12" rx="2" />
      <path d="m15 10 6-3v10l-6-3" />
    </Line>
  );
}

export function ControllerIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M6 9h12a4 4 0 0 1 4 4v1a3 3 0 0 1-5.2 2l-.8-.9H8l-.8.9A3 3 0 0 1 2 14v-1a4 4 0 0 1 4-4Z" />
      <path d="M7 12v2M6 13h2M15.5 12.5h.01M18 14h.01" />
    </Line>
  );
}

export function TrophyIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 20h6M12 13v3.5M9.5 20h5" />
    </Line>
  );
}

export function BookIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v16H6a2 2 0 0 0-2 2V4.5Z" />
      <path d="M4 20a2 2 0 0 1 2-2h13" />
    </Line>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Line>
  );
}
