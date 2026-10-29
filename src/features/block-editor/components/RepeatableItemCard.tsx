"use client";

import React from "react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";

export interface RepeatableItemCardProps {
  index: number;
  title: string;
  onRemove: () => void;
  children: React.ReactNode;
}

export function RepeatableItemCard({
  index,
  title,
  onRemove,
  children,
}: RepeatableItemCardProps) {
  return (
    <div
      className="p-4 flex flex-col gap-3.5"
      style={{
        backgroundColor: "var(--bg-elevated)",
        border: "2px solid var(--border-color)",
        borderRadius: "var(--radius-sm)",
      }}
    >
      <div
        className="flex items-center justify-between gap-2 pb-2.5"
        style={{ borderBottom: "2px solid var(--border-color)" }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Badge variant="primary">#{index + 1}</Badge>
          <span className="text-xs font-extrabold truncate">{title}</span>
        </div>

        <Button
          variant="surface"
          size="sm"
          onClick={onRemove}
          className="w-[96px] min-w-[96px] h-8 text-xs"
        >
          Eliminar
        </Button>
      </div>

      {children}
    </div>
  );
}

