"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { CvTemplateId } from "@/features/cv-document/types/cvDocument.types";
import { PredefinedTemplatePreset } from "../types/cvTemplates.types";

export interface TemplatePresetCardProps {
  preset: PredefinedTemplatePreset;
  isActive?: boolean;
  mode: "landing" | "editor";
  onLoadFullPreset?: (id: CvTemplateId) => void;
  onApplyLayoutOnly?: (id: CvTemplateId) => void;
}

export function TemplatePresetCard({
  preset,
  isActive = false,
  mode,
  onLoadFullPreset,
  onApplyLayoutOnly,
}: TemplatePresetCardProps) {
  return (
    <Card
      elevated={isActive}
      className="flex flex-col justify-between gap-3.5"
    >
      <div className="flex flex-col gap-2.5">
        <div
          className="overflow-hidden"
          style={{
            border: "2px solid var(--border-color)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <Image
            src={preset.imageSrc}
            alt={`Plantilla ${preset.name}`}
            width={320}
            height={220}
            className="w-full h-auto block"
          />
        </div>

        <div className="flex items-center justify-between gap-1">
          <h3 className="text-sm font-extrabold theme-heading truncate">
            {preset.name}
          </h3>
          <Badge variant={isActive ? "primary" : "secondary"}>
            {preset.badgeText}
          </Badge>
        </div>

        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {preset.idealFor}
        </p>

        <span
          className="text-[11px] font-bold"
          style={{ color: "var(--text-muted)" }}
        >
          📋 {preset.sampleRoleLabel}
        </span>
      </div>

      {mode === "landing" ? (
        <Link
          href={`/editor?template=${preset.id}&preset=1`}
          className="w-full"
        >
          <Button variant="primary" size="sm" className="w-full">
            Editar esta Plantilla →
          </Button>
        </Link>
      ) : (
        <div className="flex flex-col gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onLoadFullPreset?.(preset.id)}
            className="w-full"
          >
            Cargar Plantilla Lista para Editar
          </Button>
          <Button
            variant="surface"
            size="sm"
            onClick={() => onApplyLayoutOnly?.(preset.id)}
            className="w-full"
          >
            Solo Aplicar Diseño Visual
          </Button>
        </div>
      )}
    </Card>
  );
}
