"use client";

import React from "react";
import { CvDocument } from "@/features/cv-document/types/cvDocument.types";
import { PaperPhotoFrame } from "./PaperPhotoFrame";

export interface PaperHeaderRendererProps {
  document: CvDocument;
}

export function PaperHeaderRenderer({ document }: PaperHeaderRendererProps) {
  const { personalInfo: p, design } = document;
  const locationText = [p.city, p.department, p.country].filter(Boolean).join(", ");
  const linksList = [p.linkedIn, p.githubUrl, p.portfolioUrl].filter(Boolean);

  if (design.headerStyle === "boxed_sena") {
    return (
      <div className="border-2 border-slate-900 mb-5 bg-white text-slate-900">
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

  if (design.headerStyle === "banner") {
    return (
      <div
        className="p-6 text-white flex flex-col sm:flex-row items-center gap-5"
        style={{ backgroundColor: design.accentColor }}
      >
        <PaperPhotoFrame
          photoDataUrl={p.photoDataUrl}
          fullName={p.fullName}
          showPhoto={design.showPhoto}
          photoShape={design.photoShape}
          accentColor="#ffffff"
          borderWhite
          sizeClass="w-24 h-24"
        />
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-black tracking-tight leading-tight">
            {p.fullName || "Tu Nombre Completo"}
          </h1>
          <p className="text-sm font-semibold text-white/90 mt-0.5">
            {p.professionalTitle || "Título Profesional"}
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-1 text-xs text-white/90 mt-2">
            {p.email && <span>✉ {p.email}</span>}
            {p.phone && <span>☎ {p.phone}</span>}
            {locationText && <span>📍 {locationText}</span>}
            {p.documentNumber && <span>🪪 {p.documentType} {p.documentNumber}</span>}
            {linksList.map((lnk) => <span key={lnk}>🔗 {lnk}</span>)}
          </div>
        </div>
      </div>
    );
  }

  const isCentered = design.headerStyle === "centered";
  return (
    <div
      className={`px-7 pt-7 pb-5 border-b-2 flex ${
        isCentered ? "flex-col items-center text-center" : "items-center justify-between"
      } gap-5`}
      style={{ borderColor: design.accentColor }}
    >
      <div className="flex-1">
        <h1 className="text-2xl font-black text-slate-950 leading-tight">
          {p.fullName || "Tu Nombre Completo"}
        </h1>
        <p className="text-sm font-bold mt-0.5" style={{ color: design.accentColor }}>
          {p.professionalTitle || "Cargo o Especialidad"}
        </p>
        <div
          className={`flex flex-wrap ${
            isCentered ? "justify-center" : "justify-start"
          } gap-x-3 gap-y-1 text-xs text-slate-600 mt-2`}
        >
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {locationText && <span>• {locationText}</span>}
          {p.documentNumber && <span>• {p.documentType} {p.documentNumber}</span>}
          {p.professionalCard && <span>• {p.professionalCard}</span>}
          {p.availability && <span>• {p.availability}</span>}
          {linksList.map((lnk) => <span key={lnk}>• {lnk}</span>)}
        </div>
      </div>

      <PaperPhotoFrame
        photoDataUrl={p.photoDataUrl}
        fullName={p.fullName}
        showPhoto={design.showPhoto}
        photoShape={design.photoShape}
        accentColor={design.accentColor}
        sizeClass="w-24 h-24"
      />
    </div>
  );
}

