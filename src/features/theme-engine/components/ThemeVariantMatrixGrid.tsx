"use client";

import React from "react";
import { useThemeEngine } from "../hooks/useThemeEngine";
import { VISUAL_STYLES_CATALOG } from "../utils/themeCatalog.utils";
import { ThemeStyleShowcaseCard } from "./ThemeStyleShowcaseCard";
import { ColorMode, VisualStyle } from "../types/theme.types";

export function ThemeVariantMatrixGrid() {
  const { style, mode, setStyle, setMode } = useThemeEngine();

  const handleSelectVariant = (targetStyle: VisualStyle, targetMode: ColorMode) => {
    setStyle(targetStyle);
    setMode(targetMode);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {VISUAL_STYLES_CATALOG.map((metadata) => (
        <ThemeStyleShowcaseCard
          key={metadata.id}
          metadata={metadata}
          activeStyleId={style}
          activeMode={mode}
          onSelectVariant={handleSelectVariant}
        />
      ))}
    </div>
  );
}

