import Link from "next/link";
import type { ReactNode } from "react";

interface CtaLinkProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "light";
  className?: string;
}

const variantClasses = {
  primary: "cta-link cta-link-primary",
  secondary: "cta-link cta-link-secondary",
  light: "cta-link cta-link-light",
};

export function CtaLink({
  children,
  href,
  variant = "primary",
  className,
}: CtaLinkProps) {
  return (
    <Link
      className={[variantClasses[variant], className].filter(Boolean).join(" ")}
      href={href}
    >
      {children}
    </Link>
  );
}
