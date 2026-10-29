"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Select } from "@/shared/components/ui/Select";
import {
  CvBlockConfig,
  CvDesignSettings,
  CvHeaderStyle,
  CvSectionTitleStyle,
} from "@/features/cv-document/types/cvDocument.types";
import {
  CV_HEADER_STYLE_OPTIONS,
  CV_SECTION_STYLE_OPTIONS,
} from "../utils/cvDesignPalettes.utils";
import { BlockOrderItemRow } from "./BlockOrderItemRow";

export interface StructureAndOrderCardProps {
  design: CvDesignSettings;
  blocks: CvBlockConfig[];
  onUpdateDesign: (patch: Partial<CvDesignSettings>) => void;
  onMoveBlock: (blockId: string, direction: "up" | "down") => void;
  onToggleZone: (blockId: string) => void;
  onToggleVisibility: (blockId: string) => void;
}

export function StructureAndOrderCard({
  design,
  blocks,
  onUpdateDesign,
  onMoveBlock,
  onToggleZone,
  onToggleVisibility,
}: StructureAndOrderCardProps) {
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Distribución, Columnas y Orden de Bloques</CardTitle>
        <button
          type="button"
          onClick={() =>
            onUpdateDesign({ twoColumnLayout: !design.twoColumnLayout })
          }
          className="px-3 py-1 text-xs font-extrabold cursor-pointer"
          style={{
            backgroundColor: design.twoColumnLayout
              ? "var(--accent-primary)"
              : "var(--bg-surface-elevated)",
            color: design.twoColumnLayout
              ? "var(--accent-primary-fg)"
              : "var(--text-primary)",
            border: "2px solid var(--border-color)",
            borderRadius: "var(--radius-pill)",
          }}
        >
          {design.twoColumnLayout ? "▤ 2 Columnas Activas" : "▭ 1 Sola Columna"}
        </button>
      </CardHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select
          id="cv-header-style"
          label="Diseño del Encabezado"
          options={CV_HEADER_STYLE_OPTIONS}
          value={design.headerStyle}
          onChange={(e) =>
            onUpdateDesign({ headerStyle: e.target.value as CvHeaderStyle })
          }
        />
        <Select
          id="cv-section-style"
          label="Estilo de Títulos de Sección"
          options={CV_SECTION_STYLE_OPTIONS}
          value={design.sectionTitleStyle}
          onChange={(e) =>
            onUpdateDesign({
              sectionTitleStyle: e.target.value as CvSectionTitleStyle,
            })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>
          Ordenar Secciones y Mover entre Columna Principal / Lateral:
        </span>

        {blocks.map((blk, idx) => (
          <BlockOrderItemRow
            key={blk.id}
            block={blk}
            index={idx}
            total={blocks.length}
            twoColumnLayout={design.twoColumnLayout}
            onMoveBlock={onMoveBlock}
            onToggleZone={onToggleZone}
            onToggleVisibility={onToggleVisibility}
          />
        ))}
      </div>
    </Card>
  );
}
