"use client";

import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { CvBlockConfig } from "@/features/cv-document/types/cvDocument.types";
import { EditorNavItem } from "../types/blockEditor.types";

export interface TimelineStepNodeProps {
  stepNumber: number;
  item: EditorNavItem;
  isSelected: boolean;
  count?: number;
  matchingBlock?: CvBlockConfig;
  onSelect: () => void;
  onToggleVisibility?: (blockId: string) => void;
}

export function TimelineStepNode({
  stepNumber,
  item,
  isSelected,
  count,
  matchingBlock,
  onSelect,
  onToggleVisibility,
}: TimelineStepNodeProps) {
  const Icon = item.icon;
  const isHidden = matchingBlock && !matchingBlock.visible;

  return (
    <div
      className="relative flex flex-col items-center gap-1 shrink-0 group transition-all"
      style={{
        opacity: isHidden ? 0.5 : 1,
      }}
    >
      {/* Botón principal del hito en la línea del tiempo (No Bloqueante) */}
      <button
        type="button"
        onClick={onSelect}
        title={`Paso ${stepNumber}: ${item.label}`}
        className="flex items-center gap-1.5 px-2.5 py-1.5 cursor-pointer rounded-full transition-all text-left"
        style={{
          backgroundColor: isSelected
            ? "var(--accent-primary)"
            : "var(--bg-elevated)",
          color: isSelected
            ? "var(--accent-primary-fg)"
            : "var(--text-primary)",
          border: isSelected
            ? "2px solid var(--accent-primary)"
            : "1.5px solid var(--border-color)",
          boxShadow: isSelected ? "0 2px 8px rgba(0,0,0,0.12)" : "none",
        }}
      >
        {/* Círculo indicador con el número de paso */}
        <span
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
          style={{
            backgroundColor: isSelected
              ? "rgba(255,255,255,0.25)"
              : "var(--bg-surface)",
            color: isSelected
              ? "var(--accent-primary-fg)"
              : "var(--text-secondary)",
            border: "1px solid var(--border-color)",
          }}
        >
          {stepNumber}
        </span>

        <Icon className="w-3.5 h-3.5 shrink-0" />

        <span className="text-xs font-bold whitespace-nowrap">
          {item.label.split(" ")[0]}
          {typeof count === "number" && count > 0 ? ` (${count})` : ""}
        </span>
      </button>

      {/* Control discreto de visibilidad si el bloque es conmutable */}
      {matchingBlock && onToggleVisibility && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility(matchingBlock.id);
          }}
          title={matchingBlock.visible ? "Ocultar en CV" : "Mostrar en CV"}
          className="absolute -top-1.5 -right-1 p-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] cursor-pointer hover:scale-110 transition-transform shadow-xs"
        >
          {matchingBlock.visible ? (
            <Eye className="w-2.5 h-2.5 text-[var(--text-secondary)]" />
          ) : (
            <EyeOff className="w-2.5 h-2.5 text-red-500" />
          )}
        </button>
      )}
    </div>
  );
}

