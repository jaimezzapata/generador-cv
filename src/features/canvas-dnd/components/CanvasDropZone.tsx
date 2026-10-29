"use client";

import React, { DragEvent } from "react";
import { Plus } from "lucide-react";
import {
  CvBlockConfig,
  CvDocument,
} from "@/features/cv-document/types/cvDocument.types";
import { DragBlockPayload, DropZoneType } from "../types/canvasDnd.types";
import { DraggableBlockItem } from "./DraggableBlockItem";

export interface CanvasDropZoneProps {
  zone: DropZoneType;
  title: string;
  blocks: CvBlockConfig[];
  document: CvDocument;
  twoColumnLayout: boolean;
  isDragOver: boolean;
  onDarkBg?: boolean;
  onDragStart: (e: DragEvent<HTMLElement>, payload: DragBlockPayload) => void;
  onDragOver: (e: DragEvent<HTMLElement>, zone: DropZoneType, index?: number) => void;
  onDragLeave: (e: DragEvent<HTMLElement>) => void;
  onDrop: (e: DragEvent<HTMLElement>, zone: DropZoneType, index?: number) => void;
  onMoveOrder: (blockId: string, direction: "up" | "down") => void;
  onToggleZone: (blockId: string) => void;
  onRemoveBlock: (blockId: string) => void;
  onUpdateBlockConfig: (blockId: string, patch: Partial<CvBlockConfig>) => void;
}

export function CanvasDropZone({
  zone,
  title,
  blocks,
  document,
  twoColumnLayout,
  isDragOver,
  onDarkBg = false,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onMoveOrder,
  onToggleZone,
  onRemoveBlock,
  onUpdateBlockConfig,
}: CanvasDropZoneProps) {
  const visibleBlocks = blocks.filter((b) => b.zone === zone && b.visible);

  return (
    <div
      onDragOver={(e) => onDragOver(e, zone)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, zone)}
      className={`min-h-[160px] grid grid-cols-12 gap-3.5 items-start rounded-md transition-all p-2 ${
        isDragOver
          ? "ring-2 ring-sky-500 bg-sky-50/20"
          : "border border-transparent"
      }`}
    >
      {visibleBlocks.length === 0 ? (
        <div
          className={`col-span-12 flex-1 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center gap-2 select-none ${
            onDarkBg
              ? "border-slate-700 text-slate-400 bg-slate-900/30"
              : "border-slate-300 text-slate-500 bg-slate-50/50"
          }`}
        >
          <div className="w-8 h-8 rounded-full border border-dashed border-current flex items-center justify-center">
            <Plus className="w-4 h-4 opacity-70" />
          </div>
          <span className="text-xs font-bold">{title} vacía</span>
          <span className="text-[11px] opacity-75">
            Arrastra y suelta aquí cualquier bloque modular
          </span>
        </div>
      ) : (
        visibleBlocks.map((blk, idx) => (
          <DraggableBlockItem
            key={blk.id}
            block={blk}
            index={idx}
            total={visibleBlocks.length}
            zone={zone}
            twoColumnLayout={twoColumnLayout}
            document={document}
            onDarkBg={onDarkBg}
            onDragStart={onDragStart}
            onMoveOrder={onMoveOrder}
            onToggleZone={onToggleZone}
            onRemoveBlock={onRemoveBlock}
            onUpdateBlockConfig={onUpdateBlockConfig}
          />
        ))
      )}
    </div>
  );
}
