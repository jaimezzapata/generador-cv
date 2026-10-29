"use client";

import React from "react";
import { CvDocument } from "@/features/cv-document/types/cvDocument.types";
import { PaperPhotoFrame } from "./PaperPhotoFrame";

export interface PaperMinervaHeaderProps {
  document: CvDocument;
}

export function PaperMinervaHeader({ document }: PaperMinervaHeaderProps) {
  const { personalInfo: p, design } = document;
  const locationText = [p.city, p.department, p.country].filter(Boolean).join(", ");

  return (
    <div
      className="border-2 border-blue-900 mb-5 bg-white text-slate-900 shadow-sm"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Barra superior Azul Minerva 1003 */}
      <div
        className="px-4 py-2 flex items-center justify-between text-white font-black"
        style={{ backgroundColor: design.accentColor }}
      >
        <span className="text-xs tracking-widest uppercase">
          HOJA DE VIDA · FORMATO ESTÁNDAR MINERVA 1003
        </span>
        <span className="text-[10px] tracking-wider uppercase opacity-90 hidden sm:inline">
          REPÚBLICA DE COLOMBIA
        </span>
      </div>

      {/* Sub-barra Gris Pizarra Minerva */}
      <div className="bg-slate-100 border-b border-slate-300 px-4 py-1 flex items-center justify-between text-[10px] font-bold text-slate-700">
        <span>DATOS DE IDENTIFICACIÓN Y REGISTRO PERSONAL</span>
        <span className="text-blue-900 font-extrabold uppercase">EDICIÓN GRIS Y AZUL</span>
      </div>

      {/* Grilla Tabular Minerva */}
      <div className="p-3.5 flex flex-col md:flex-row items-center md:items-start gap-4">
        <div className="flex-1 w-full flex flex-col gap-2">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
              Apellidos y Nombres Completos
            </span>
            <h1 className="text-xl font-black uppercase text-slate-950 leading-tight">
              {p.fullName || "NOMBRES Y APELLIDOS"}
            </h1>
            <p className="text-xs font-bold text-blue-800">
              {p.professionalTitle || "Cargo u Ocupación a la que Aspira"}
            </p>
          </div>

          {/* Cuadrícula de celdas delimitadas tipo formulario Minerva */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px] pt-1">
            <div className="p-1.5 bg-slate-50 border border-slate-200 rounded">
              <span className="block text-[9px] font-bold text-slate-500 uppercase">Documento</span>
              <span className="font-bold text-slate-900">{p.documentType} {p.documentNumber}</span>
            </div>
            <div className="p-1.5 bg-slate-50 border border-slate-200 rounded">
              <span className="block text-[9px] font-bold text-slate-500 uppercase">Lugar Expedición</span>
              <span className="font-semibold text-slate-800">{p.documentExpeditionPlace || p.city || "Bogotá D.C."}</span>
            </div>
            <div className="p-1.5 bg-slate-50 border border-slate-200 rounded">
              <span className="block text-[9px] font-bold text-slate-500 uppercase">Teléfono / Celular</span>
              <span className="font-semibold text-slate-800">{p.phone} {p.altPhone ? `· ${p.altPhone}` : ""}</span>
            </div>
            <div className="p-1.5 bg-slate-50 border border-slate-200 rounded col-span-2 sm:col-span-1">
              <span className="block text-[9px] font-bold text-slate-500 uppercase">Correo Electrónico</span>
              <span className="font-semibold text-slate-800 truncate block">{p.email}</span>
            </div>
            <div className="p-1.5 bg-slate-50 border border-slate-200 rounded">
              <span className="block text-[9px] font-bold text-slate-500 uppercase">Dirección Domicilio</span>
              <span className="font-semibold text-slate-800 truncate block">{p.address || locationText}</span>
            </div>
            <div className="p-1.5 bg-slate-50 border border-slate-200 rounded">
              <span className="block text-[9px] font-bold text-slate-500 uppercase">Libreta / Licencia</span>
              <span className="font-semibold text-slate-800 truncate block">{p.drivingLicense || p.professionalCard || "Al día"}</span>
            </div>
          </div>
        </div>

        {/* Marco de Foto 3x4 clásico Minerva */}
        <div className="flex flex-col items-center shrink-0">
          <PaperPhotoFrame
            photoDataUrl={p.photoDataUrl}
            fullName={p.fullName}
            showPhoto={design.showPhoto}
            photoShape="square"
            accentColor={design.accentColor}
            sizeClass="w-24 h-28"
          />
          <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
            Foto 3×4 cm
          </span>
        </div>
      </div>
    </div>
  );
}
