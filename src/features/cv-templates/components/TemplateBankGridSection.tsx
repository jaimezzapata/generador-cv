"use client";

import React from "react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { CvTemplateId } from "@/features/cv-document/types/cvDocument.types";
import {
  PredefinedTemplatePreset,
  TemplateBankCategory,
} from "../types/cvTemplates.types";
import { TemplatePresetCard } from "./TemplatePresetCard";

const BANK_CATEGORIES: { id: TemplateBankCategory; label: string }[] = [
  { id: "all", label: "Todas (6)" },
  { id: "normativo", label: "SENA / Formal" },
  { id: "corporativo", label: "ATS / Ejecutivo" },
  { id: "primer_empleo", label: "Primer Empleo" },
  { id: "creativo", label: "Tech / Modular" },
];

export interface TemplateBankGridSectionProps {
  presets: PredefinedTemplatePreset[];
  activeCategory: TemplateBankCategory;
  activeTemplateId?: CvTemplateId;
  mode: "landing" | "editor";
  onChangeCategory: (cat: TemplateBankCategory) => void;
  onLoadFullPreset?: (id: CvTemplateId) => void;
  onApplyLayoutOnly?: (id: CvTemplateId) => void;
}

export function TemplateBankGridSection({
  presets,
  activeCategory,
  activeTemplateId,
  mode,
  onChangeCategory,
  onLoadFullPreset,
  onApplyLayoutOnly,
}: TemplateBankGridSectionProps) {
  return (
    <section id="formatos-cv" className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="primary">Banco de Plantillas Listas para Editar</Badge>
          <span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>
            Con datos de ejemplo preconfigurados
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {BANK_CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              size="sm"
              variant={activeCategory === cat.id ? "primary" : "surface"}
              onClick={() => onChangeCategory(cat.id)}
              className="w-[128px] min-w-[128px]"
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {presets.map((preset) => (
          <TemplatePresetCard
            key={preset.id}
            preset={preset}
            isActive={preset.id === activeTemplateId}
            mode={mode}
            onLoadFullPreset={onLoadFullPreset}
            onApplyLayoutOnly={onApplyLayoutOnly}
          />
        ))}
      </div>
    </section>
  );
}
