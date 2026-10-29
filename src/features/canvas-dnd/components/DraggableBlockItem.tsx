"use client";

import React, { DragEvent } from "react";
import {
  CvBlockConfig,
  CvDocument,
} from "@/features/cv-document/types/cvDocument.types";
import { PaperBlockItemRenderer } from "@/features/cv-templates/components/PaperBlockItemRenderer";
import { DragBlockPayload, DropZoneType } from "../types/canvasDnd.types";
import { getColSpanClass, getVariantClass } from "../utils/canvasDnd.utils";
import { DraggableBlockToolbar } from "./DraggableBlockToolbar";

export interface DraggableBlockItemProps {
  block: CvBlockConfig;
  index: number;
  total: number;
  zone: DropZoneType;
  twoColumnLayout: boolean;
  document: CvDocument;
  onDarkBg?: boolean;
  onDragStart: (e: DragEvent<HTMLElement>, payload: DragBlockPayload) => void;
  onMoveOrder: (blockId: string, direction: "up" | "down") => void;
  onToggleZone: (blockId: string) => void;
  onRemoveBlock: (blockId: string) => void;
  onUpdateBlockConfig: (blockId: string, patch: Partial<CvBlockConfig>) => void;
}

export function DraggableBlockItem({
  block,
  index,
  total,
  zone,
  twoColumnLayout,
  document,
  onDarkBg = false,
  onDragStart,
  onMoveOrder,
  onToggleZone,
  onRemoveBlock,
  onUpdateBlockConfig,
}: DraggableBlockItemProps) {
  const colSpanClass = getColSpanClass(block.colSpan);
  const variantClass = getVariantClass(block.variant);

  return (
    <div
      draggable
      onDragStart={(e) =>
        onDragStart(e, {
          blockId: block.id,
          blockType: block.type,
          source: "canvas",
          sourceZone: zone,
          sourceIndex: index,
        })
      }
      className={`group relative rounded border border-transparent hover:border-sky-400/80 hover:bg-sky-50/20 transition-all p-2 ${colSpanClass} ${variantClass}`}
    >
      <DraggableBlockToolbar
        block={block}
        index={index}
        total={total}
        twoColumnLayout={twoColumnLayout}
        onMoveOrder={onMoveOrder}
        onToggleZone={onToggleZone}
        onRemoveBlock={onRemoveBlock}
        onUpdateBlockConfig={onUpdateBlockConfig}
      />

      <PaperBlockItemRenderer
        block={block}
        document={document}
        onDarkBg={onDarkBg}
      />
    </div>
  );
}
