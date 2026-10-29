"use client";

import React from "react";
import { CvDocument } from "@/features/cv-document/types/cvDocument.types";
import { PaperPhotoFrame } from "./PaperPhotoFrame";

export interface PaperSenaHeaderProps {
  document: CvDocument;
}

export function PaperSenaHeader({ document }: PaperSenaHeaderProps) {
  const { personalInfo: p, design } = document;
  const locationText = [p.city, p.department, p.country].filter(Boolean).join(", ");

  return (
    <div
      className="border-2 border-slate-900 mb-5 bg-white text-slate-900"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div
        className="px-4 py-2 text-center font-black uppercase tracking-widest text-xs text-white"
        style={{ backgroundColor: design.accentColor }}
      >
        Formato Institucional de Hoja de Vida · República de Colombia
      </div>
      <div className="p-4 flex items-center gap-4 border-b border-slate-400">
        <PaperPhotoFrame
          photoDataUrl={p.photoDataUrl}
          fullName={p.fullName}
          showPhoto={design.showPhoto}
          photoShape={design.photoShape}
          accentColor={design.accentColor}
          sizeClass="w-24 h-28"
        />
        <div className="flex-1 flex flex-col gap-1">
          <h1 className="text-2xl font-black uppercase text-slate-950 leading-tight">
            {p.fullName || "NOMBRES Y APELLIDOS"}
          </h1>
          <p className="text-sm font-bold" style={{ color: design.accentColor }}>
            {p.professionalTitle || "Perfil / Denominación del Cargo"}
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-slate-700 mt-1">
            <span><strong>Doc:</strong> {p.documentType} {p.documentNumber}</span>
            {p.documentExpeditionPlace && <span><strong>Exp:</strong> {p.documentExpeditionPlace}</span>}
            <span><strong>Tel:</strong> {p.phone} {p.altPhone ? `/ ${p.altPhone}` : ""}</span>
            <span><strong>Correo:</strong> {p.email}</span>
            <span><strong>Ubicación:</strong> {locationText}</span>
            {p.address && <span><strong>Dirección:</strong> {p.address}</span>}
            {p.professionalCard && <span><strong>T. Prof:</strong> {p.professionalCard}</span>}
            {p.drivingLicense && <span><strong>Licencia/Libreta:</strong> {p.drivingLicense}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
