"use client";

import React from "react";
import {
  ThemeEngineContext,
  useThemeStateController,
} from "../hooks/useThemeEngine";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const controller = useThemeStateController();

  return (
    <ThemeEngineContext.Provider value={controller}>
      {children}
    </ThemeEngineContext.Provider>
  );
}

