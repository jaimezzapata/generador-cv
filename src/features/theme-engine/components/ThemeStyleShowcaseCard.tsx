"use client";

import React from "react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { ColorMode, VisualStyleMetadata } from "../types/theme.types";

export interface ThemeStyleShowcaseCardProps {
  metadata: VisualStyleMetadata;
  activeStyleId: string;
  activeMode: ColorMode;
  onSelectVariant: (style: VisualStyleMetadata["id"], mode: ColorMode) => void;
}

export function ThemeStyleShowcaseCard({
  metadata,
  activeStyleId,
  activeMode,
  onSelectVariant,
}: ThemeStyleShowcaseCardProps) {
  const isCurrentStyle = metadata.id === activeStyleId;
  const currentPalette = metadata.palettes[activeMode];

  return (
    <Card elevated={isCurrentStyle} className="flex flex-col justify-between gap-4">
      <div>
        <CardHeader>
          <CardTitle>{metadata.name}</CardTitle>
          {isCurrentStyle && <Badge variant="primary">Activo</Badge>}
        </CardHeader>

        <p
          className="text-xs font-semibold mb-1.5"
          style={{ color: "var(--text-secondary)" }}
        >
          {metadata.tagline}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {metadata.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {metadata.traits.map((trait) => (
            <Badge key={trait} variant="muted">
              {trait}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>
            Paleta ({activeMode === "light" ? "Claro" : "Oscuro"}):
          </span>
          <div className="flex items-center gap-1.5">
            {Object.entries(currentPalette).map(([key, hex]) => (
              <span
                key={key}
                title={`${key}: ${hex}`}
                className="w-5 h-5 inline-block"
                style={{
                  backgroundColor: hex,
                  border: "var(--border-width) var(--border-style) var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant={isCurrentStyle && activeMode === "light" ? "primary" : "surface"}
            onClick={() => onSelectVariant(metadata.id, "light")}
          >
            ☀️ {metadata.shortLabel} Claro
          </Button>
          <Button
            size="sm"
            variant={isCurrentStyle && activeMode === "dark" ? "primary" : "surface"}
            onClick={() => onSelectVariant(metadata.id, "dark")}
          >
            🌙 {metadata.shortLabel} Oscuro
          </Button>
        </div>
      </div>
    </Card>
  );
}

