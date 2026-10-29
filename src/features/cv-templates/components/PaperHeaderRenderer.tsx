"use client";

import React from "react";
import { CreditCard, Globe, Mail, MapPin, Phone } from "lucide-react";
import { CvDocument } from "@/features/cv-document/types/cvDocument.types";
import { PaperPhotoFrame } from "./PaperPhotoFrame";
import { PaperSenaHeader } from "./PaperSenaHeader";
import { PaperMinervaHeader } from "./PaperMinervaHeader";
import { PaperBannerHeader } from "./PaperBannerHeader";

export interface PaperHeaderRendererProps {
  document: CvDocument;
}

export function PaperHeaderRenderer({ document }: PaperHeaderRendererProps) {
  const { personalInfo: p, design } = document;
  const locationText = [p.city, p.department, p.country].filter(Boolean).join(", ");
  const linksList = [p.linkedIn, p.githubUrl, p.portfolioUrl].filter(Boolean);

  if (design.headerStyle === "minerva") {
    return <PaperMinervaHeader document={document} />;
  }

  if (design.headerStyle === "boxed_sena") {
    return <PaperSenaHeader document={document} />;
  }

  if (design.headerStyle === "banner") {
    return <PaperBannerHeader document={document} />;
  }

  const isCentered = design.headerStyle === "centered";

  return (
    <div
      className={`px-7 pt-7 pb-5 border-b-2 flex ${
        isCentered ? "flex-col items-center text-center" : "items-center justify-between"
      } gap-5`}
      style={{ borderColor: design.accentColor, backgroundColor: "#ffffff" }}
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
          } gap-x-3.5 gap-y-1.5 text-xs text-slate-600 mt-2`}
        >
          {p.email && (
            <span className="inline-flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {p.email}
            </span>
          )}
          {p.phone && (
            <span className="inline-flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {p.phone}
            </span>
          )}
          {locationText && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {locationText}
            </span>
          )}
          {p.documentNumber && (
            <span className="inline-flex items-center gap-1">
              <CreditCard className="w-3 h-3" />
              {p.documentType} {p.documentNumber}
            </span>
          )}
          {p.professionalCard && <span>• {p.professionalCard}</span>}
          {p.availability && <span>• {p.availability}</span>}
          {linksList.map((lnk) => (
            <span key={lnk} className="inline-flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {lnk}
            </span>
          ))}
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
