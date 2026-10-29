"use client";

import React from "react";
import { ThemeStylePicker } from "./ThemeStylePicker";
import { ColorModeSwitch } from "./ColorModeSwitch";

export function ThemeControlBar() {
  return (
    <div className="flex items-center gap-2">
      <ThemeStylePicker />
      <ColorModeSwitch />
    </div>
  );
}
