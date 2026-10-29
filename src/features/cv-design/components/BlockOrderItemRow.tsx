"use client";

import React from "react";
import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import { CvBlockConfig } from "@/features/cv-document/types/cvDocument.types";

export interface BlockOrderItemRowProps {
  block: CvBlockConfig;
  index: number;
  total: number;
  twoColumnLayout: boolean;
  onMoveBlock: (blockId: string, direction: "up" | "down") => void;
  onToggleZone: (blockId: string) => void;
  onToggleVisibility: (blockId: string) => void;
}

export function BlockOrderItemRow({
  block,
  index,
  total,
  twoColumnLayout,
  onMoveBlock,
  onToggleZone,
  onToggleVisibility,
}: BlockOrderItemRowProps) {
  return (
    <div
      className="p-2.5 flex items-center justify-between gap-2 text-xs"
      style={{
        backgroundColor: "var(--bg-surface-elevated)",
        border: "2px solid var(--border-color)",
        borderRadius: "var(--radius-sm)",
        opacity: block.visible ? 1 : 0.55,
      }}
    >
      <span className="font-bold truncate">{block.title}</span>

      <div className="flex items-center gap-1 shrink-0">
        {twoColumnLayout && (
          <button
            type="button"
            onClick={() => onToggleZone(block.id)}
            className="px-2 py-1 text-[11px] font-bold cursor-pointer"
            style={{
              backgroundColor:
                block.zone === "sidebar" ? "var(--accent-secondary)" : "var(--bg-surface)",
              color:
                block.zone === "sidebar" ? "var(--accent-secondary-fg)" : "var(--text-primary)",
              border: "2px solid var(--border-color)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            {block.zone === "sidebar" ? "Lateral" : "Principal"}
          </button>
        )}

        <button
          type="button"
          disabled={index === 0}
          onClick={() => onMoveBlock(block.id, "up")}
          aria-label="Subir bloque"
          className="w-7 h-7 flex items-center justify-center font-black cursor-pointer disabled:opacity-30"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "2px solid var(--border-color)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          disabled={index === total - 1}
          onClick={() => onMoveBlock(block.id, "down")}
          aria-label="Bajar bloque"
          className="w-7 h-7 flex items-center justify-center font-black cursor-pointer disabled:opacity-30"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "2px solid var(--border-color)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onToggleVisibility(block.id)}
          className="px-2 py-1 text-[11px] font-bold cursor-pointer inline-flex items-center gap-1"
          style={{
            backgroundColor: block.visible ? "var(--accent-success)" : "var(--bg-surface)",
            color: block.visible ? "#ffffff" : "var(--text-muted)",
            border: "2px solid var(--border-color)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          {block.visible ? (
            <>
              <Eye className="w-3 h-3" />
              Visible
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3" />
              Oculto
            </>
          )}
        </button>
      </div>
    </div>
  );
}
