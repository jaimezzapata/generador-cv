"use client";

import React from "react";
import { Badge } from "@/shared/components/ui/Badge";
import { Card } from "@/shared/components/ui/Card";
import { CvBlockConfig } from "@/features/cv-document/types/cvDocument.types";
import { EDITOR_NAV_ITEMS } from "../utils/blockEditorOptions.utils";
import { EditorSectionTab } from "../types/blockEditor.types";

export interface BlockNavigationSidebarProps {
  activeTab: EditorSectionTab;
  blocks: CvBlockConfig[];
  countsBySection: Partial<Record<EditorSectionTab, number>>;
  onSelectTab: (tab: EditorSectionTab) => void;
  onToggleBlockVisibility: (blockId: string) => void;
}

export function BlockNavigationSidebar({
  activeTab,
  blocks,
  countsBySection,
  onSelectTab,
  onToggleBlockVisibility,
}: BlockNavigationSidebarProps) {
  return (
    <Card className="p-3.5 flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider theme-heading">
          Secciones del Currículum (11 Módulos)
        </span>
        <Badge variant="muted">Autoguardado</Badge>
      </div>

      <nav
        aria-label="Secciones de la hoja de vida"
        className="grid grid-cols-2 sm:grid-cols-3 gap-1.5"
      >
        {EDITOR_NAV_ITEMS.map((item) => {
          const isSelected = activeTab === item.id;
          const matchingBlock = item.blockType
            ? blocks.find((b) => b.type === item.blockType)
            : undefined;
          const count = countsBySection[item.id];

          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-1 px-2.5 py-2 transition-colors"
              style={{
                backgroundColor: isSelected
                  ? "var(--accent-primary)"
                  : "var(--bg-surface-elevated)",
                color: isSelected
                  ? "var(--accent-primary-fg)"
                  : "var(--text-primary)",
                border: "2px solid var(--border-color)",
                borderRadius: "var(--radius-sm)",
                opacity: matchingBlock && !matchingBlock.visible ? 0.55 : 1,
              }}
            >
              <button
                type="button"
                onClick={() => onSelectTab(item.id)}
                className="flex-1 text-left flex items-center gap-1.5 cursor-pointer min-w-0"
              >
                <span className="text-sm shrink-0">{item.icon}</span>
                <span className="text-[11px] font-extrabold truncate">
                  {item.label}
                  {typeof count === "number" ? ` (${count})` : ""}
                </span>
              </button>

              {matchingBlock && (
                <button
                  type="button"
                  onClick={() => onToggleBlockVisibility(matchingBlock.id)}
                  title={matchingBlock.visible ? "Ocultar en CV" : "Mostrar en CV"}
                  className="text-[11px] px-1 cursor-pointer shrink-0"
                >
                  {matchingBlock.visible ? "👁" : "🚫"}
                </button>
              )}
            </div>
          );
        })}
      </nav>
    </Card>
  );
}
