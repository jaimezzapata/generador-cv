"use client";

import React from "react";
import { CreditCard, Globe, Mail, MapPin, Phone } from "lucide-react";
import { CvDocument } from "@/features/cv-document/types/cvDocument.types";
import { PaperPhotoFrame } from "./PaperPhotoFrame";

export interface PaperBannerHeaderProps {
  document: CvDocument;
}

export function PaperBannerHeader({ document }: PaperBannerHeaderProps) {
  const { personalInfo: p, design } = document;
  const locationText = [p.city, p.department, p.country].filter(Boolean).join(", ");
  const linksList = [p.linkedIn, p.githubUrl, p.portfolioUrl].filter(Boolean);

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
        <div className="flex flex-wrap justify-center sm:justify-start gap-x-3.5 gap-y-1.5 text-xs text-white/90 mt-2.5">
          {p.email && (
            <span className="inline-flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              {p.email}
            </span>
          )}
          {p.phone && (
            <span className="inline-flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              {p.phone}
            </span>
          )}
          {locationText && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {locationText}
            </span>
          )}
          {p.documentNumber && (
            <span className="inline-flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5" />
              {p.documentType} {p.documentNumber}
            </span>
          )}
          {linksList.map((lnk) => (
            <span key={lnk} className="inline-flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              {lnk}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
