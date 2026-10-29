"use client";

import React from "react";
import { CvPhotoShape } from "@/features/cv-document/types/cvDocument.types";

export interface PaperPhotoFrameProps {
  photoDataUrl: string;
  fullName: string;
  showPhoto: boolean;
  photoShape: CvPhotoShape;
  accentColor: string;
  sizeClass?: string;
  borderWhite?: boolean;
}

export function PaperPhotoFrame({
  photoDataUrl,
  fullName,
  showPhoto,
  photoShape,
  accentColor,
  sizeClass = "w-24 h-24",
  borderWhite = false,
}: PaperPhotoFrameProps) {
  if (!showPhoto) return null;

  const initials = (fullName || "CV")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const radius =
    photoShape === "circle" ? "9999px" : photoShape === "rounded" ? "14px" : "2px";

  return (
    <div
      className={`${sizeClass} shrink-0 overflow-hidden flex items-center justify-center bg-slate-100 shadow-sm`}
      style={{
        borderRadius: radius,
        border: `3px solid ${borderWhite ? "#ffffff" : accentColor}`,
      }}
    >
      {photoDataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoDataUrl}
          alt={fullName || "Foto de perfil"}
          className="w-full h-full object-cover"
        />
      ) : (
        <span
          className="text-xl font-black"
          style={{ color: accentColor }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

