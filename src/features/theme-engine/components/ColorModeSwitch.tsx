"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
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
      className="h-8 px-2.5 text-xs font-bold gap-1.5 shrink-0 whitespace-nowrap"
    >
      {isDark ? (
        <Moon className="w-3.5 h-3.5 shrink-0" />
      ) : (
        <Sun className="w-3.5 h-3.5 shrink-0" />
      )}
      <span>{isDark ? "Oscuro" : "Claro"}</span>
    </Button>
  );
}
