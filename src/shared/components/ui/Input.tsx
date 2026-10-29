import React from "react";
import { cn } from "@/shared/utils/cn.utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

export function Input({
  label,
  helperText,
  id,
  className,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-bold theme-heading"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full px-3.5 py-2 text-sm outline-none transition-shadow",
          className
        )}
        style={{
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          border: "var(--border-width) var(--border-style) var(--border-color)",
          borderRadius: "var(--radius-sm)",
          boxShadow: "var(--shadow-surface)",
        }}
        {...props}
      />
      {helperText && (
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {helperText}
        </span>
      )}
    </div>
  );
}

