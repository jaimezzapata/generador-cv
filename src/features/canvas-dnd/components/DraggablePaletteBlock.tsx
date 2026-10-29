"use client";

import React, { DragEvent } from "react";
import { GripVertical, Plus } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { CvBlockConfig } from "@/features/cv-document/types/cvDocument.types";
import { DragBlockPayload } from "../types/canvasDnd.types";
import { getColSpanLabel, getPaletteMeta } from "../utils/canvasDnd.utils";

export interface DraggablePaletteBlockProps {
  block: CvBlockConfig;
  onDragStart: (e: DragEvent<HTMLElement>, payload: DragBlockPayload) => void;
  onQuickAdd: (blockId: string, zone: "main" | "sidebar") => void;
}

export function DraggablePaletteBlock({
  block,
  onDragStart,
  onQuickAdd,
}: DraggablePaletteBlockProps) {
  const meta = getPaletteMeta(block.type);
  const Icon = meta.icon;

  return (
    <div
      draggable
      onDragStart={(e) =>
        onDragStart(e, {
          blockId: block.id,
          blockType: block.type,
          source: "palette",
        })
      }
      className="p-3 flex items-center justify-between gap-2 text-xs select-none cursor-grab active:cursor-grabbing transition-all hover:scale-[1.01]"
      style={{
        backgroundColor: block.visible
          ? "var(--bg-surface)"
          : "var(--bg-surface-elevated)",
        border: "2px solid var(--border-color)",
        borderRadius: "var(--radius-sm)",
        opacity: block.visible ? 0.65 : 1,
      }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <GripVertical className="w-4 h-4 text-slate-400 shrink-0" />
        <div
          className="w-7 h-7 rounded flex items-center justify-center shrink-0"
          style={{
            backgroundColor: "var(--accent-secondary)",
            color: "var(--accent-secondary-fg)",
          }}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-extrabold truncate">{block.title}</span>
          <span className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>
            {meta.description}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {block.visible ? (
          <Badge variant="muted">{getColSpanLabel(block.colSpan)}</Badge>
        ) : (
          <button
            type="button"
            onClick={() => onQuickAdd(block.id, block.zone)}
            title="Añadir a la hoja"
            className="px-2 py-1 text-[11px] font-bold cursor-pointer inline-flex items-center gap-1"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "var(--accent-primary-fg)",
              border: "2px solid var(--border-color)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <Plus className="w-3 h-3" />
            Añadir
          </button>
        )}
      </div>
    </div>
  );
}

