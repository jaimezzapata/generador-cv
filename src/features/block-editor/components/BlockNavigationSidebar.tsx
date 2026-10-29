"use client";

import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { CvBlockConfig } from "@/features/cv-document/types/cvDocument.types";
import { EDITOR_NAV_ITEMS } from "../utils/blockEditorOptions.utils";
import { EditorSectionTab } from "../types/blockEditor.types";
import { TimelineStepNode } from "./TimelineStepNode";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentIndex = EDITOR_NAV_ITEMS.findIndex((item) => item.id === activeTab);
  const activeItem = EDITOR_NAV_ITEMS[currentIndex] || EDITOR_NAV_ITEMS[0];

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectTab(EDITOR_NAV_ITEMS[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < EDITOR_NAV_ITEMS.length - 1) {
      onSelectTab(EDITOR_NAV_ITEMS[currentIndex + 1].id);
    }
  };

  // Desplazamiento automático suave hacia el paso activo seleccionado
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const activeElement = container.querySelector('[title*="Paso ' + (currentIndex + 1) + '"]');
    if (activeElement) {
      activeElement.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [currentIndex]);

  return (
    <Card className="p-3 flex flex-col gap-2.5">
      {/* Encabezado del paso a paso con controles de avance no bloqueantes */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider theme-heading">
            Paso {currentIndex + 1} de {EDITOR_NAV_ITEMS.length}:
          </span>
          <span className="text-xs font-bold text-[var(--accent-primary)] truncate max-w-[200px]">
            {activeItem.label}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Badge variant="muted">No Bloqueante</Badge>
          <Button
            variant="surface"
            size="sm"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="h-7 w-7 p-0 flex items-center justify-center cursor-pointer"
            title="Paso anterior"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="surface"
            size="sm"
            onClick={handleNext}
            disabled={currentIndex === EDITOR_NAV_ITEMS.length - 1}
            className="h-7 w-7 p-0 flex items-center justify-center cursor-pointer"
            title="Paso siguiente"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Pista de la Línea del Tiempo Interactiva y Compacta */}
      <div className="relative w-full">
        {/* Línea horizontal continua conectora de fondo */}
        <div
          className="absolute top-1/2 left-2 right-2 h-[2px] -translate-y-1/2 pointer-events-none"
          style={{ backgroundColor: "var(--border-color)", opacity: 0.7 }}
        />

        <div
          ref={scrollContainerRef}
          role="tablist"
          aria-label="Línea del tiempo de secciones de la hoja de vida"
          className="relative flex items-center gap-2 overflow-x-auto py-1 px-1 scrollbar-thin"
        >
          {EDITOR_NAV_ITEMS.map((item, index) => {
            const isSelected = activeTab === item.id;
            const matchingBlock = item.blockType
              ? blocks.find((b) => b.type === item.blockType)
              : undefined;
            const count = countsBySection[item.id];

            return (
              <TimelineStepNode
                key={item.id}
                stepNumber={index + 1}
                item={item}
                isSelected={isSelected}
                count={count}
                matchingBlock={matchingBlock}
                onSelect={() => onSelectTab(item.id)}
                onToggleVisibility={onToggleBlockVisibility}
              />
            );
          })}
        </div>
      </div>
    </Card>
  );
}
