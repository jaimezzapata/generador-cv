"use client";

import React from "react";
import { Button } from "@/shared/components/ui/Button";
import { useThemeEngine } from "../hooks/useThemeEngine";

export function ColorModeSwitch() {
  const { mode, toggleMode } = useThemeEngine();
  const isDark = mode === "dark";

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={toggleMode}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo Oscuro activo" : "Modo Claro activo"}
      className="w-[116px] min-w-[116px] h-9 px-2.5"
    >
      <span aria-hidden="true" className="shrink-0">
        {isDark ? "🌙" : "☀️"}
      </span>
      <span>{isDark ? "Oscuro" : "Claro"}</span>
    </Button>
  );
}
