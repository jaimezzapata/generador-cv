"use client";

import React from "react";
import { Columns2, Maximize2 } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { CvDocument } from "@/features/cv-document/types/cvDocument.types";
import { CvTemplatePreviewDispatcher } from "@/features/cv-templates/components/CvTemplatePreviewDispatcher";
import { PdfExportButton } from "@/features/pdf-export/components/PdfExportButton";
import { CanvasZoomLevel } from "../types/blockEditor.types";

const ZOOM_OPTIONS: CanvasZoomLevel[] = [75, 90, 100];

export interface LiveDocumentSummaryPanelProps {
  document: CvDocument;
  zoomLevel: CanvasZoomLevel;
  fullPreviewMode: boolean;
  onChangeZoom: (zoom: CanvasZoomLevel) => void;
  onToggleFullPreview: () => void;
  onExportPdf?: () => void;
  isExportingPdf?: boolean;
}

export function LiveDocumentSummaryPanel({
  document,
  zoomLevel,
  fullPreviewMode,
  onChangeZoom,
  onToggleFullPreview,
  onExportPdf,
  isExportingPdf = false,
}: LiveDocumentSummaryPanelProps) {
  return (
    <div
      className="relative w-full rounded-xl overflow-hidden flex flex-col"
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "2px solid var(--border-color)",
        boxShadow: "var(--shadow-surface)",
      }}
    >
      {/* Barra superior directa sobre la hoja: zoom, descargar PDF y ampliar */}
      <div
        className="sticky top-0 z-20 w-full px-3 py-2 flex items-center justify-between gap-2 flex-wrap"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderBottom: "1.5px solid var(--border-color)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {ZOOM_OPTIONS.map((z) => (
              <button
                key={z}
                type="button"
                onClick={() => onChangeZoom(z)}
                className="px-2.5 py-1 text-xs font-black cursor-pointer transition-colors"
                style={{
                  backgroundColor:
                    zoomLevel === z ? "var(--accent-primary)" : "var(--bg-elevated)",
                  color:
                    zoomLevel === z ? "var(--accent-primary-fg)" : "var(--text-primary)",
                  border: "1.5px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                {z}%
              </button>
            ))}
          </div>

          {onExportPdf && (
            <PdfExportButton
              onExport={onExportPdf}
              isExporting={isExportingPdf}
              variant="primary"
            />
          )}
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onToggleFullPreview}
          className="gap-1.5"
        >
          {fullPreviewMode ? (
            <>
              <Columns2 className="w-3.5 h-3.5" />
              <span>Mostrar Editor</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Ampliar Hoja</span>
            </>
          )}
        </Button>
      </div>

      {/* Espacio del lienzo de la hoja de vida con fondo sólido y opaco */}
      <div
        className="w-full p-3 sm:p-5 md:p-6 overflow-auto flex justify-center"
        style={{
          backgroundColor: "var(--bg-elevated)",
        }}
      >
        <CvTemplatePreviewDispatcher
          document={document}
          zoomScale={zoomLevel / 100}
        />
      </div>
    </div>
  );
}
