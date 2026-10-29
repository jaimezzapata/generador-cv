import React from "react";
import { cn } from "@/shared/utils/cn.utils";

export type ButtonVariant = "primary" | "secondary" | "surface" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  active?: boolean;
}

const VARIANT_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--accent-primary)",
    color: "var(--accent-primary-fg)",
  },
  secondary: {
    backgroundColor: "var(--accent-secondary)",
    color: "var(--accent-secondary-fg)",
  },
  surface: {
    backgroundColor: "var(--bg-surface)",
    color: "var(--text-primary)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--text-primary)",
    boxShadow: "none",
  },
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 min-w-[108px] px-3 text-xs font-semibold gap-1.5",
  md: "h-10 min-w-[160px] px-4 text-sm font-semibold gap-2",
  lg: "h-12 min-w-[220px] px-5 text-sm font-bold gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  active = false,
  className,
  style,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center shrink-0 whitespace-nowrap cursor-pointer select-none theme-button-interactive disabled:opacity-50 disabled:cursor-not-allowed",
        SIZE_CLASSES[size],
        active && "ring-2 ring-offset-1",
        className
      )}
      style={{
        ...VARIANT_STYLES[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
