"use client";

import React, { useState } from "react";
import { useCvDocument } from "@/features/cv-document/hooks/useCvDocument";
import { usePdfExport } from "@/features/pdf-export/hooks/usePdfExport";
import { useCanvasDnd } from "../hooks/useCanvasDnd";
import { CanvasBuilderTopBar } from "./CanvasBuilderTopBar";
import { CanvasBlockPalette } from "./CanvasBlockPalette";
import { CanvasPaperSheet } from "./CanvasPaperSheet";

export function CanvasBuilderWorkspace() {
  const cv = useCvDocument();
  const [zoomLevel, setZoomLevel] = useState<number>(90);
  const { document } = cv;
  const { design, blocks } = document;
  const pdf = usePdfExport({
    fileName: `Hoja_de_Vida_${document.personalInfo.fullName || "CV"}`,
  });

  const dnd = useCanvasDnd({
    blocks,
    onPlaceBlock: cv.placeBlock,
    onReorderBlocks: cv.reorderBlocks,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <CanvasBuilderTopBar
        twoColumnLayout={design.twoColumnLayout}
        zoomLevel={zoomLevel}
        onToggleColumns={() =>
          cv.updateDesign({ twoColumnLayout: !design.twoColumnLayout })
        }
        onChangeZoom={setZoomLevel}
        onApplyModularPreset={cv.applyModularGridPreset}
        onExportPdf={pdf.triggerDownload}
        isExportingPdf={pdf.isExporting}
      />

      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 py-6 md:px-6 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <aside className="xl:col-span-4 xl:sticky xl:top-20">
          <CanvasBlockPalette
            blocks={blocks}
            onDragStart={dnd.handleDragStart}
            onQuickAdd={(id, zone) => cv.placeBlock(id, zone)}
            onClearAll={cv.clearAllBlocks}
            onRestoreAll={cv.restoreAllBlocks}
          />
        </aside>

        <section
          className="xl:col-span-8 flex justify-center overflow-x-auto p-4 md:p-6 rounded-xl shadow-sm"
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "2px solid var(--border-color)",
          }}
        >
          <CanvasPaperSheet
            document={document}
            blocks={blocks}
            zoomLevel={zoomLevel}
            activeDropZone={dnd.activeDropZone}
            onDragStart={dnd.handleDragStart}
            onDragOver={dnd.handleDragOverZone}
            onDragLeave={dnd.handleDragLeaveZone}
            onDrop={dnd.handleDropOnZone}
            onMoveOrder={cv.moveBlockOrder}
            onToggleZone={cv.toggleBlockZone}
            onRemoveBlock={cv.toggleBlockVisibility}
            onUpdateBlockConfig={cv.updateBlockConfig}
          />
        </section>
      </main>
    </div>
  );
}
