"use client";

import React from "react";
import { Button } from "@/shared/components/ui/Button";
import { useThemeEngine } from "../hooks/useThemeEngine";
import { VISUAL_STYLES_CATALOG } from "../utils/themeCatalog.utils";

export function ThemeStylePicker() {
  const { style: activeStyle, setStyle } = useThemeEngine();

  return (
    <div
      role="radiogroup"
      aria-label="Seleccionar estilo visual"
      className="flex flex-wrap items-center gap-1.5"
    >
      {VISUAL_STYLES_CATALOG.map((item) => {
        const isSelected = item.id === activeStyle;
        return (
          <Button
            key={item.id}
            role="radio"
            aria-checked={isSelected}
            size="sm"
            variant={isSelected ? "primary" : "surface"}
            onClick={() => setStyle(item.id)}
            className="w-[116px] min-w-[116px] h-9 px-2.5"
          >
            <span
              className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
              style={{
                backgroundColor: item.palettes.light.primary,
                border: "1px solid currentColor",
              }}
            />
            <span>{item.name}</span>
          </Button>
        );
      })}
    </div>
  );
}
