import React from "react";
import { cn } from "@/shared/utils/cn.utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
}

export function Select({
  label,
  options,
  id,
  className,
  ...props
}: SelectProps) {
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
      <select
        id={id}
        className={cn(
          "w-full px-3.5 py-2 text-sm font-medium outline-none cursor-pointer",
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
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

