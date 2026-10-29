import React from "react";
import { cn } from "@/shared/utils/cn.utils";

export type BadgeVariant = "primary" | "secondary" | "tertiary" | "muted";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const BADGE_STYLES: Record<BadgeVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--accent-primary)",
    color: "var(--accent-primary-fg)",
  },
  secondary: {
    backgroundColor: "var(--accent-secondary)",
    color: "var(--accent-secondary-fg)",
  },
  tertiary: {
    backgroundColor: "var(--accent-tertiary)",
    color: "var(--text-primary)",
  },
  muted: {
    backgroundColor: "var(--bg-elevated)",
    color: "var(--text-secondary)",
  },
};

export function Badge({
  variant = "primary",
  className,
  style,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center h-6 px-2.5 text-xs font-bold whitespace-nowrap box-border",
        className
      )}
      style={{
        border: "2px solid var(--border-color)",
        borderRadius: "var(--radius-sm)",
        ...BADGE_STYLES[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
