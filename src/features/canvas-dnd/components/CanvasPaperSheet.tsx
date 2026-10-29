"use client";

import React, { DragEvent } from "react";
import {
  CvBlockConfig,
  CvDocument,
} from "@/features/cv-document/types/cvDocument.types";
import { PaperHeaderRenderer } from "@/features/cv-templates/components/PaperHeaderRenderer";
import { isDarkHexColor } from "@/features/cv-design/utils/cvDesignPalettes.utils";
import { DragBlockPayload, DropZoneType } from "../types/canvasDnd.types";
import { CanvasDropZone } from "./CanvasDropZone";

export interface CanvasPaperSheetProps {
  document: CvDocument;
  blocks: CvBlockConfig[];
  zoomLevel: number;
  activeDropZone: DropZoneType | null;
  onDragStart: (e: DragEvent<HTMLElement>, payload: DragBlockPayload) => void;
  onDragOver: (e: DragEvent<HTMLElement>, zone: DropZoneType, index?: number) => void;
  onDragLeave: (e: DragEvent<HTMLElement>) => void;
  onDrop: (e: DragEvent<HTMLElement>, zone: DropZoneType, index?: number) => void;
  onMoveOrder: (blockId: string, direction: "up" | "down") => void;
  onToggleZone: (blockId: string) => void;
  onRemoveBlock: (blockId: string) => void;
  onUpdateBlockConfig: (blockId: string, patch: Partial<CvBlockConfig>) => void;
}

export function CanvasPaperSheet({
  document,
  blocks,
  zoomLevel,
  activeDropZone,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onMoveOrder,
  onToggleZone,
  onRemoveBlock,
  onUpdateBlockConfig,
}: CanvasPaperSheetProps) {
  const { design } = document;
  const isSidebarDark = isDarkHexColor(design.sidebarBgColor);

  const fontClass =
    design.fontFamily === "serif"
      ? "font-serif"
      : design.fontFamily === "mono"
      ? "font-mono"
      : "font-sans";

  const sharedDropZoneProps = {
    blocks,
    document,
    twoColumnLayout: design.twoColumnLayout,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onMoveOrder,
    onToggleZone,
    onRemoveBlock,
    onUpdateBlockConfig,
  };

  return (
    <div
      id="cv-paper-sheet"
      className={`w-full max-w-[794px] min-h-[980px] bg-white text-slate-900 shadow-2xl border border-slate-300 flex flex-col transition-transform origin-top ${fontClass}`}
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: "none",
        color: "#0f172a",
        transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : undefined,
        marginBottom:
          zoomLevel < 100 ? `${Math.round(((zoomLevel / 100) - 1) * 980)}px` : undefined,
      }}
    >
      <PaperHeaderRenderer document={document} />

      {design.twoColumnLayout ? (
        <div className="flex-1 grid grid-cols-12" style={{ backgroundColor: "#ffffff" }}>
          <aside
            className={`col-span-4 p-5 ${
              isSidebarDark ? "text-slate-100" : "text-slate-900 border-r border-slate-200"
            }`}
            style={{ backgroundColor: design.sidebarBgColor }}
          >
            <CanvasDropZone
              {...sharedDropZoneProps}
              zone="sidebar"
              title="Columna Lateral"
              isDragOver={activeDropZone === "sidebar"}
              onDarkBg={isSidebarDark}
            />
          </aside>

          <div className="col-span-8 p-6" style={{ backgroundColor: "#ffffff" }}>
            <CanvasDropZone
              {...sharedDropZoneProps}
              zone="main"
              title="Columna Principal"
              isDragOver={activeDropZone === "main"}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 px-8 py-6" style={{ backgroundColor: "#ffffff" }}>
          <CanvasDropZone
            {...sharedDropZoneProps}
            zone="main"
            title="Lienzo Principal"
            isDragOver={activeDropZone === "main"}
          />
        </div>
      )}
    </div>
  );
}
