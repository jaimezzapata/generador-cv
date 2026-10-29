"use client";

import React from "react";
import { ThemeStylePicker } from "./ThemeStylePicker";
import { ColorModeSwitch } from "./ColorModeSwitch";

export function ThemeControlBar() {
  return (
    <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
      <ThemeStylePicker />
      <div className="w-[1px] h-5 bg-[var(--border-color)] opacity-60 mx-0.5 shrink-0" />
      <ColorModeSwitch />
    </div>
  );
}
