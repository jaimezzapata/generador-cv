"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import {
  CvTemplateCatalogItem,
  CvTemplateFormatId,
  TemplateCategory,
} from "../types/studioShell.types";

const CATEGORY_FILTERS: { id: TemplateCategory; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "normativo", label: "Norma SENA" },
  { id: "corporativo", label: "ATS / Empresas" },
  { id: "creativo", label: "Modular" },
];

export interface TemplateCatalogSectionProps {
  templates: CvTemplateCatalogItem[];
  selectedTemplateId: CvTemplateFormatId;
  activeCategory: TemplateCategory;
  onChangeCategory: (category: TemplateCategory) => void;
  onSelectTemplate: (templateId: CvTemplateFormatId) => void;
}

export function TemplateCatalogSection({
  templates,
  selectedTemplateId,
  activeCategory,
  onChangeCategory,
  onSelectTemplate,
}: TemplateCatalogSectionProps) {
  return (
    <section id="formatos-cv" className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Badge variant="primary">Diseños y Formatos de Hoja de Vida</Badge>

        <div className="flex flex-wrap gap-2">
          {CATEGORY_FILTERS.map((cat) => (
            <Button
              key={cat.id}
              size="sm"
              variant={activeCategory === cat.id ? "primary" : "surface"}
              onClick={() => onChangeCategory(cat.id)}
              className="w-[125px] min-w-[125px]"
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {templates.map((tpl) => {
          const isSelected = tpl.id === selectedTemplateId;
          return (
            <Card
              key={tpl.id}
              elevated={isSelected}
              className="flex flex-col justify-between gap-3.5"
            >
              <div
                className="overflow-hidden"
                style={{
                  border: "2px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <Image
                  src={tpl.imageSrc}
                  alt={`Vista previa de plantilla ${tpl.name}`}
                  width={320}
                  height={220}
                  className="w-full h-auto block"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm font-extrabold theme-heading truncate">
                    {tpl.name}
                  </h3>
                  <Badge variant={isSelected ? "primary" : "muted"}>
                    {tpl.badgeText}
                  </Badge>
                </div>
                <p
                  className="text-xs truncate"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {tpl.idealFor}
                </p>
              </div>

              <Button
                size="sm"
                variant={isSelected ? "primary" : "surface"}
                onClick={() => onSelectTemplate(tpl.id)}
                className="w-full"
              >
                {isSelected ? "✓ Seleccionado" : "Elegir Diseño"}
              </Button>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
