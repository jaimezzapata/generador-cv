"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Select } from "@/shared/components/ui/Select";
import {
  CvDensity,
  CvDesignSettings,
  CvFontFamily,
} from "@/features/cv-document/types/cvDocument.types";
import {
  CV_ACCENT_SWATCHES,
  CV_DENSITY_OPTIONS,
  CV_FONT_OPTIONS,
  CV_SIDEBAR_SWATCHES,
} from "../utils/cvDesignPalettes.utils";

export interface ColorAndTypographyCardProps {
  design: CvDesignSettings;
  onUpdateDesign: (patch: Partial<CvDesignSettings>) => void;
}

export function ColorAndTypographyCard({
  design,
  onUpdateDesign,
}: ColorAndTypographyCardProps) {
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Colores y Tipografía del Documento</CardTitle>
      </CardHeader>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>
          Color Principal de Acento (Títulos, Bordes e Íconos)
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {CV_ACCENT_SWATCHES.map((sw) => {
            const active = design.accentColor.toLowerCase() === sw.hex.toLowerCase();
            return (
              <button
                key={sw.id}
                type="button"
                title={sw.label}
                onClick={() => onUpdateDesign({ accentColor: sw.hex })}
                className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-transform"
                style={{
                  backgroundColor: sw.hex,
                  border: active ? "3px solid var(--text-primary)" : "2px solid #cbd5e1",
                  transform: active ? "scale(1.12)" : "scale(1)",
                }}
              >
                {active && <span className="text-white text-xs font-black">✓</span>}
              </button>
            );
          })}
          <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer ml-1">
            <input
              type="color"
              value={design.accentColor}
              onChange={(e) => onUpdateDesign({ accentColor: e.target.value })}
              className="w-8 h-8 cursor-pointer border-0 bg-transparent"
            />
            <span>Personalizado</span>
          </label>
        </div>
      </div>

      {design.twoColumnLayout && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>
            Fondo de la Columna Lateral
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {CV_SIDEBAR_SWATCHES.map((sw) => {
              const active = design.sidebarBgColor.toLowerCase() === sw.hex.toLowerCase();
              return (
                <button
                  key={sw.id}
                  type="button"
                  onClick={() => onUpdateDesign({ sidebarBgColor: sw.hex })}
                  className="px-2.5 py-1 text-xs font-bold cursor-pointer flex items-center gap-1.5"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    border: active
                      ? "2px solid var(--accent-primary)"
                      : "2px solid var(--border-color)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-slate-400"
                    style={{ backgroundColor: sw.hex }}
                  />
                  {sw.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select
          id="cv-font-family"
          label="Tipografía de la Hoja"
          options={CV_FONT_OPTIONS}
          value={design.fontFamily}
          onChange={(e) =>
            onUpdateDesign({ fontFamily: e.target.value as CvFontFamily })
          }
        />
        <Select
          id="cv-density"
          label="Densidad / Espaciado"
          options={CV_DENSITY_OPTIONS}
          value={design.density}
          onChange={(e) =>
            onUpdateDesign({ density: e.target.value as CvDensity })
          }
        />
      </div>

      <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
        <input
          type="checkbox"
          checked={design.showSkillBars}
          onChange={(e) => onUpdateDesign({ showSkillBars: e.target.checked })}
          className="w-4 h-4"
        />
        Mostrar barras visuales de dominio en Competencias
      </label>
    </Card>
  );
}

