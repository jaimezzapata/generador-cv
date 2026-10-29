"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { ThemeControlBar } from "@/features/theme-engine/components/ThemeControlBar";
import { CvTemplateId } from "@/features/cv-document/types/cvDocument.types";
import { TEMPLATE_SELECT_OPTIONS } from "../utils/blockEditorOptions.utils";

export interface EditorTopBarProps {
  templateId: CvTemplateId;
  completionPercentage: number;
  onChangeTemplate: (templateId: CvTemplateId) => void;
  onOpenTemplateBank: () => void;
  onOpenDesignTab: () => void;
}

export function EditorTopBar({
  templateId,
  completionPercentage,
  onChangeTemplate,
  onOpenTemplateBank,
  onOpenDesignTab,
}: EditorTopBarProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full isolate"
      style={{
        backgroundColor: "var(--bg-header, var(--bg-surface, #ffffff))",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="max-w-[1720px] mx-auto px-4 py-3 md:px-6 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/">
            <Button variant="surface" size="sm" className="w-[96px] min-w-[96px]">
              ← Inicio
            </Button>
          </Link>

          <Badge variant="primary">{completionPercentage}% Completo</Badge>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenTemplateBank}
            className="w-[180px] min-w-[180px]"
          >
            📚 Plantillas (6)
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenDesignTab}
            className="w-[164px] min-w-[164px]"
          >
            🎨 Colores y Foto
          </Button>

          <select
            aria-label="Seleccionar formato de plantilla"
            value={templateId}
            onChange={(e) => onChangeTemplate(e.target.value as CvTemplateId)}
            className="h-9 px-3 text-xs font-bold cursor-pointer outline-none"
            style={{
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-primary)",
              border: "2px solid var(--border-color)",
              borderRadius: "var(--radius-button)",
            }}
          >
            {TEMPLATE_SELECT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Base: {opt.label}
              </option>
            ))}
          </select>
        </div>

        <ThemeControlBar />
      </div>

      <div
        className="w-full h-2"
        style={{
          background: "var(--header-ribbon)",
          borderTop: "2px solid var(--border-color)",
          borderBottom: "2px solid var(--border-color)",
        }}
      />
    </header>
  );
}
