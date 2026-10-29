import React from "react";
import { cn } from "@/shared/utils/cn.utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export function Card({
  elevated = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        elevated ? "theme-elevated" : "theme-surface",
        "relative overflow-hidden p-5 transition-all duration-150",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between gap-3 pb-3 mb-3", className)}
      style={{
        borderBottom: "var(--border-width) var(--border-style) var(--border-color)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-base font-bold theme-heading", className)}
      style={{ color: "var(--text-primary)" }}
      {...props}
    >
      {children}
    </h3>
  );
}
