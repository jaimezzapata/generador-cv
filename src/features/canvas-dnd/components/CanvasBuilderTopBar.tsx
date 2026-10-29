"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Columns, Columns3, LayoutGrid, Rows3, Square } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { ThemeControlBar } from "@/features/theme-engine/components/ThemeControlBar";
import { PdfExportButton } from "@/features/pdf-export/components/PdfExportButton";

const PRESET_BUTTONS = [
  { id: "mosaic_pairs", label: "Mosaico 50/50", icon: LayoutGrid, hint: "Pares 50/50 lado a lado" },
  { id: "compact_triptych", label: "Tríptico 33%", icon: Columns3, hint: "Trípticos de 33%" },
  { id: "standard", label: "Filas 100%", icon: Rows3, hint: "Filas completas 100%" },
] as const;

export interface CanvasBuilderTopBarProps {
  twoColumnLayout: boolean;
  zoomLevel: number;
  onToggleColumns: () => void;
  onChangeZoom: (zoom: number) => void;
  onApplyModularPreset?: (preset: "standard" | "mosaic_pairs" | "compact_triptych") => void;
  onExportPdf?: () => void;
  isExportingPdf?: boolean;
}

export function CanvasBuilderTopBar({
  twoColumnLayout,
  zoomLevel,
  onToggleColumns,
  onChangeZoom,
  onApplyModularPreset,
  onExportPdf,
  isExportingPdf = false,
}: CanvasBuilderTopBarProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full isolate"
      style={{
        backgroundColor: "var(--bg-header, var(--bg-surface, #ffffff))",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="max-w-[1720px] mx-auto px-4 py-3 md:px-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/editor">
            <Button variant="surface" size="sm" className="gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              Volver al Editor
            </Button>
          </Link>

          <Button variant="secondary" size="sm" onClick={onToggleColumns} className="gap-1.5">
            {twoColumnLayout ? <Columns className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
            {twoColumnLayout ? "2 Columnas" : "1 Columna"}
          </Button>

          {onApplyModularPreset && (
            <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-300">
              {PRESET_BUTTONS.map((p) => {
                const Icon = p.icon;
                return (
                  <Button
                    key={p.id}
                    variant="surface"
                    size="sm"
                    onClick={() => onApplyModularPreset(p.id)}
                    className="gap-1 text-xs"
                    title={p.hint}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {p.label}
                  </Button>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-1">
            {[75, 90, 100].map((z) => (
              <button
                key={z}
                type="button"
                onClick={() => onChangeZoom(z)}
                className="px-2.5 py-1 text-xs font-extrabold cursor-pointer"
                style={{
                  backgroundColor: zoomLevel === z ? "var(--accent-primary)" : "var(--bg-surface)",
                  color: zoomLevel === z ? "var(--accent-primary-fg)" : "var(--text-primary)",
                  border: "2px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                {z}%
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onExportPdf && (
            <PdfExportButton
              onExport={onExportPdf}
              isExporting={isExportingPdf}
              variant="primary"
            />
          )}
          <ThemeControlBar />
        </div>
      </div>
    </header>
  );
}
