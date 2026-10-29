import React from "react";
import { cn } from "@/shared/utils/cn.utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
}

export function Textarea({
  label,
  helperText,
  id,
  className,
  rows = 4,
  ...props
}: TextareaProps) {
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
      <textarea
        id={id}
        rows={rows}
        className={cn(
          "w-full px-3.5 py-2.5 text-sm outline-none resize-y transition-shadow",
          className
        )}
        style={{
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          border: "2px solid var(--border-color)",
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

