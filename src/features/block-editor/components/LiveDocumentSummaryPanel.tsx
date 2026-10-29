"use client";

import React from "react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { CvDocument } from "@/features/cv-document/types/cvDocument.types";
import { CvTemplatePreviewDispatcher } from "@/features/cv-templates/components/CvTemplatePreviewDispatcher";
import { getPresetById } from "@/features/cv-templates/utils/templatePresetsBank.utils";
import { CanvasZoomLevel } from "../types/blockEditor.types";

const ZOOM_OPTIONS: CanvasZoomLevel[] = [75, 90, 100];

export interface LiveDocumentSummaryPanelProps {
  document: CvDocument;
  zoomLevel: CanvasZoomLevel;
  fullPreviewMode: boolean;
  onChangeZoom: (zoom: CanvasZoomLevel) => void;
  onToggleFullPreview: () => void;
  onOpenTemplateBank: () => void;
  onOpenDesignTab: () => void;
}

export function LiveDocumentSummaryPanel({
  document,
  zoomLevel,
  fullPreviewMode,
  onChangeZoom,
  onToggleFullPreview,
  onOpenTemplateBank,
  onOpenDesignTab,
}: LiveDocumentSummaryPanelProps) {
  const activePreset = getPresetById(document.templateId);

  return (
    <Card className="p-4 md:p-5 flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-300/40">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-4 h-4 rounded-full shrink-0 border border-slate-400"
            style={{ backgroundColor: document.design.accentColor }}
          />
          <span className="text-sm font-black uppercase tracking-wide theme-heading truncate">
            Hoja A4 en Vivo · {activePreset.name}
          </span>
          <Badge variant="secondary">
            {document.design.twoColumnLayout ? "2 Columnas" : "1 Columna"}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {ZOOM_OPTIONS.map((z) => (
            <button
              key={z}
              type="button"
              onClick={() => onChangeZoom(z)}
              className="px-2.5 py-1 text-xs font-extrabold cursor-pointer"
              style={{
                backgroundColor:
                  zoomLevel === z ? "var(--accent-primary)" : "var(--bg-surface)",
                color:
                  zoomLevel === z ? "var(--accent-primary-fg)" : "var(--text-primary)",
                border: "2px solid var(--border-color)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              {z}%
            </button>
          ))}

          <Button variant="surface" size="sm" onClick={onOpenDesignTab}>
            🎨 Estilos
          </Button>
          <Button variant="surface" size="sm" onClick={onOpenTemplateBank}>
            📚 Plantillas
          </Button>
          <Button variant="primary" size="sm" onClick={onToggleFullPreview}>
            {fullPreviewMode ? "◫ Mostrar Editor" : "⛶ Ampliar Hoja"}
          </Button>
        </div>
      </div>

      <div
        className="w-full rounded-lg p-3 md:p-6 overflow-auto"
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.08)",
          border: "2px dashed var(--border-color)",
        }}
      >
        <CvTemplatePreviewDispatcher
          document={document}
          zoomScale={zoomLevel / 100}
        />
      </div>
    </Card>
  );
}
