import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router";

type Variant = "inline" | "external";

interface CommonProps {
  variant?: Variant;
  /** Optional leading brand icon, rendered aria-hidden before the label. */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type AppLinkInternal = CommonProps &
  Omit<LinkProps, "to" | "className" | "children"> & {
    to: LinkProps["to"];
    href?: never;
  };

type AppLinkExternal = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    to?: never;
  };

export type AppLinkProps = AppLinkInternal | AppLinkExternal;

const BASE = "text-brand-700 dark:text-brand-300";
const VARIANT: Record<Variant, string> = {
  inline: "hover:underline underline-offset-2",
  external: "underline underline-offset-2 decoration-1 hover:no-underline",
};

export function AppLink(props: AppLinkProps) {
  const { variant = "inline", icon, className, children, ...rest } = props;
  const decoration = VARIANT[variant];
  const merged = icon
    ? [BASE, "inline-flex items-center gap-1.5", className]
        .filter(Boolean)
        .join(" ")
    : [BASE, decoration, className].filter(Boolean).join(" ");
  const content = icon ? (
    <>
      <span aria-hidden className="shrink-0">
        {icon}
      </span>
      <span className={decoration}>{children}</span>
    </>
  ) : (
    children
  );

  if ("to" in rest && rest.to !== undefined) {
    const { to, ...linkRest } = rest as Omit<
      LinkProps,
      "className" | "children"
    >;
    return (
      <Link to={to} viewTransition {...linkRest} className={merged}>
        {content}
      </Link>
    );
  }
  const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
  const externalAttrs =
    variant === "external"
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
  return (
    <a {...externalAttrs} {...anchorRest} className={merged}>
      {content}
    </a>
  );
}
