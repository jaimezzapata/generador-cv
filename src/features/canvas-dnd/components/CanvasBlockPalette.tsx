"use client";

import React, { DragEvent } from "react";
import { FilePlus2, RefreshCw } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { CvBlockConfig } from "@/features/cv-document/types/cvDocument.types";
import { DragBlockPayload } from "../types/canvasDnd.types";
import { DraggablePaletteBlock } from "./DraggablePaletteBlock";

export interface CanvasBlockPaletteProps {
  blocks: CvBlockConfig[];
  onDragStart: (e: DragEvent<HTMLElement>, payload: DragBlockPayload) => void;
  onQuickAdd: (blockId: string, zone: "main" | "sidebar") => void;
  onClearAll: () => void;
  onRestoreAll: () => void;
}

export function CanvasBlockPalette({
  blocks,
  onDragStart,
  onQuickAdd,
  onClearAll,
  onRestoreAll,
}: CanvasBlockPaletteProps) {
  const activeCount = blocks.filter((b) => b.visible).length;

  return (
    <Card className="p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider theme-heading">
            Bloques de la CV
          </span>
          <Badge variant="primary">{activeCount} / {blocks.length}</Badge>
        </div>
      </div>

      <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
        Arrastra cualquier bloque a la hoja en blanco o haz clic en Añadir.
      </p>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onClearAll}
          className="flex-1 min-w-[130px] gap-1.5"
          title="Empezar con una hoja totalmente en blanco"
        >
          <FilePlus2 className="w-3.5 h-3.5" />
          Hoja en Blanco
        </Button>
        <Button
          variant="surface"
          size="sm"
          onClick={onRestoreAll}
          className="flex-1 min-w-[130px] gap-1.5"
          title="Restaurar todos los bloques por defecto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Restaurar Todo
        </Button>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        {blocks.map((block) => (
          <DraggablePaletteBlock
            key={block.id}
            block={block}
            onDragStart={onDragStart}
            onQuickAdd={onQuickAdd}
          />
        ))}
      </div>
    </Card>
  );
}

