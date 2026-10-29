"use client";

import React from "react";
import { CvSectionTitleStyle } from "@/features/cv-document/types/cvDocument.types";

export interface PaperSectionHeadingProps {
  title: string;
  styleVariant: CvSectionTitleStyle;
  accentColor: string;
  onDarkBg?: boolean;
}

export function PaperSectionHeading({
  title,
  styleVariant,
  accentColor,
  onDarkBg = false,
}: PaperSectionHeadingProps) {
  const effectiveAccent = onDarkBg ? "#38bdf8" : accentColor;

  if (styleVariant === "filled_box") {
    return (
      <h3
        className="text-xs font-black uppercase tracking-wider px-2.5 py-1 mb-2"
        style={{
          backgroundColor: onDarkBg ? "rgba(255,255,255,0.14)" : accentColor,
          color: "#ffffff",
        }}
      >
        {title}
      </h3>
    );
  }

  if (styleVariant === "left_bar") {
    return (
      <h3
        className="text-xs font-black uppercase tracking-wider pl-2.5 py-0.5 mb-2"
        style={{
          borderLeft: `4px solid ${effectiveAccent}`,
          color: onDarkBg ? "#ffffff" : "#0f172a",
        }}
      >
        {title}
      </h3>
    );
  }

  if (styleVariant === "pill") {
    return (
      <div className="mb-2">
        <span
          className="inline-block text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full"
          style={{
            backgroundColor: onDarkBg ? "rgba(255,255,255,0.16)" : `${accentColor}18`,
            color: onDarkBg ? "#ffffff" : accentColor,
            border: `1.5px solid ${onDarkBg ? "rgba(255,255,255,0.3)" : accentColor}`,
          }}
        >
          {title}
        </span>
      </div>
    );
  }

  return (
    <h3
      className="text-xs font-black uppercase tracking-wider pb-1 mb-2"
      style={{
        color: onDarkBg ? "#ffffff" : accentColor,
        borderBottom: `2px solid ${onDarkBg ? "rgba(255,255,255,0.25)" : accentColor}`,
      }}
    >
      {title}
    </h3>
  );
}

