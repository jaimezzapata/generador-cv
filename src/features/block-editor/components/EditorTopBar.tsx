"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, LayoutGrid, Palette } from "lucide-react";
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
      <div className="max-w-[1720px] mx-auto px-4 py-2.5 md:px-6 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/">
            <Button variant="surface" size="sm" className="h-8 px-2.5 gap-1.5 text-xs">
              <ArrowLeft className="w-3.5 h-3.5" />
              Inicio
            </Button>
          </Link>

          <Badge variant="primary">{completionPercentage}% Completo</Badge>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenTemplateBank}
            className="h-8 px-3 gap-1.5 text-xs font-bold"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Plantillas (6)
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenDesignTab}
            className="h-8 px-3 gap-1.5 text-xs font-bold"
          >
            <Palette className="w-3.5 h-3.5" />
            Colores y Foto
          </Button>

          <Link href="/builder">
            <Button
              variant="surface"
              size="sm"
              className="h-8 px-3 gap-1.5 text-xs font-bold"
              title="Abrir lienzo en blanco con drag and drop"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Lienzo Drag &amp; Drop
            </Button>
          </Link>

          <select
            aria-label="Seleccionar formato de plantilla"
            value={templateId}
            onChange={(e) => onChangeTemplate(e.target.value as CvTemplateId)}
            className="h-8 px-2.5 text-xs font-bold cursor-pointer outline-none"
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
    </header>
  );
}
