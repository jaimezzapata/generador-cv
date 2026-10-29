"use client";

import React from "react";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { CvPhotoShape } from "@/features/cv-document/types/cvDocument.types";
import {
  CV_PHOTO_SHAPE_OPTIONS,
  SAMPLE_AVATAR_PRESETS,
} from "../utils/cvDesignPalettes.utils";
import { usePhotoUploader } from "../hooks/usePhotoUploader";

export interface PhotoCustomizerCardProps {
  photoDataUrl: string;
  showPhoto: boolean;
  photoShape: CvPhotoShape;
  onSetPhotoUrl: (url: string) => void;
  onToggleShowPhoto: (enabled: boolean) => void;
  onChangePhotoShape: (shape: CvPhotoShape) => void;
}

export function PhotoCustomizerCard({
  photoDataUrl,
  showPhoto,
  photoShape,
  onSetPhotoUrl,
  onToggleShowPhoto,
  onChangePhotoShape,
}: PhotoCustomizerCardProps) {
  const { inputId, errorMsg, handleFileChange, applySampleAvatar, removePhoto } =
    usePhotoUploader(onSetPhotoUrl, onToggleShowPhoto);
  const shapeRadius =
    photoShape === "circle" ? "9999px" : photoShape === "rounded" ? "14px" : "2px";

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Fotografía de Perfil en la CV</CardTitle>
        <button
          type="button"
          onClick={() => onToggleShowPhoto(!showPhoto)}
          className="px-3 py-1 text-xs font-extrabold cursor-pointer"
          style={{
            backgroundColor: showPhoto ? "var(--accent-primary)" : "var(--bg-surface-elevated)",
            color: showPhoto ? "var(--accent-primary-fg)" : "var(--text-secondary)",
            border: "2px solid var(--border-color)",
            borderRadius: "var(--radius-pill)",
          }}
        >
          {showPhoto ? "✓ Foto Visible" : "Foto Oculta (ATS)"}
        </button>
      </CardHeader>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div
          className="w-24 h-24 shrink-0 overflow-hidden flex items-center justify-center bg-slate-100"
          style={{ border: "2px solid var(--border-color)", borderRadius: shapeRadius }}
        >
          {photoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoDataUrl} alt="Foto perfil CV" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs font-bold text-slate-500">Sin Foto</span>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-2.5 w-full">
          <div className="flex flex-wrap gap-2">
            <label
              htmlFor={inputId}
              className="h-9 min-w-[140px] px-3 text-xs font-semibold inline-flex items-center justify-center cursor-pointer theme-button-interactive"
              style={{
                backgroundColor: "var(--accent-primary)",
                color: "var(--accent-primary-fg)",
              }}
            >
              📷 Subir Mi Foto
              <input
                id={inputId}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
            {photoDataUrl && (
              <Button variant="surface" size="sm" onClick={removePhoto}>
                Quitar Foto
              </Button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold" style={{ color: "var(--text-muted)" }}>Forma:</span>
            {CV_PHOTO_SHAPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChangePhotoShape(opt.value)}
                className="px-2.5 py-1 text-[11px] font-bold cursor-pointer"
                style={{
                  backgroundColor: photoShape === opt.value ? "var(--accent-secondary)" : "var(--bg-surface)",
                  color: photoShape === opt.value ? "var(--accent-secondary-fg)" : "var(--text-secondary)",
                  border: "2px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold" style={{ color: "var(--text-muted)" }}>Avatares demo:</span>
            {SAMPLE_AVATAR_PRESETS.map((sample) => (
              <button
                key={sample.url}
                type="button"
                onClick={() => applySampleAvatar(sample.url)}
                className="px-2 py-0.5 text-[11px] font-semibold underline cursor-pointer"
              >
                {sample.label}
              </button>
            ))}
          </div>
          {errorMsg && <span className="text-xs font-bold text-red-600">{errorMsg}</span>}
        </div>
      </div>
    </Card>
  );
}
