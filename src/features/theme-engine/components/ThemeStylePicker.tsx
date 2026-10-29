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
      className="flex items-center gap-1 flex-nowrap shrink-0"
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
            className="h-8 px-2.5 text-xs font-bold gap-1.5 shrink-0 whitespace-nowrap"
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
