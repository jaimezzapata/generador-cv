"use client";

import React from "react";
import { CvDocument, SkillLevel } from "@/features/cv-document/types/cvDocument.types";
import { PaperSectionHeading } from "./PaperSectionHeading";

const LEVEL_WIDTH: Record<SkillLevel, string> = {
  basico: "45%",
  intermedio: "70%",
  avanzado: "88%",
  experto: "100%",
};

export interface PaperSkillsAndLangsRendererProps {
  blockType: "skills" | "languages" | "certifications";
  title: string;
  document: CvDocument;
  onDarkBg?: boolean;
}

export function PaperSkillsAndLangsRenderer({
  blockType,
  title,
  document,
  onDarkBg = false,
}: PaperSkillsAndLangsRendererProps) {
  const { design } = document;
  const mutedText = onDarkBg ? "text-slate-300" : "text-slate-600";

  if (blockType === "skills") {
    if (document.skills.length === 0) return null;
    return (
      <div>
        <PaperSectionHeading
          title={title}
          styleVariant={design.sectionTitleStyle}
          accentColor={design.accentColor}
          onDarkBg={onDarkBg}
        />
        {design.showSkillBars ? (
          <div className="flex flex-col gap-2">
            {document.skills.map((sk) => (
              <div key={sk.id} className="flex flex-col gap-0.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span>{sk.name}</span>
                  <span className={`text-[10px] uppercase ${mutedText}`}>{sk.level}</span>
                </div>
                <div
                  className="w-full h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: onDarkBg ? "rgba(255,255,255,0.18)" : "#e2e8f0" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: LEVEL_WIDTH[sk.level],
                      backgroundColor: onDarkBg ? "#38bdf8" : design.accentColor,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {document.skills.map((sk) => (
              <span
                key={sk.id}
                className="px-2.5 py-0.5 rounded text-xs font-semibold"
                style={{
                  backgroundColor: onDarkBg ? "rgba(255,255,255,0.12)" : "#f1f5f9",
                  border: onDarkBg ? "1px solid rgba(255,255,255,0.22)" : "1px solid #cbd5e1",
                }}
              >
                {sk.name}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (blockType === "languages") {
    if (document.languages.length === 0) return null;
    return (
      <div>
        <PaperSectionHeading
          title={title}
          styleVariant={design.sectionTitleStyle}
          accentColor={design.accentColor}
          onDarkBg={onDarkBg}
        />
        <div className="flex flex-col gap-1.5">
          {document.languages.map((lng) => (
            <div key={lng.id} className="text-xs flex flex-wrap items-center justify-between gap-1">
              <span className="font-bold">{lng.name}</span>
              <span className={mutedText}>
                {lng.level} {lng.certification ? `· ${lng.certification}` : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (document.certifications.length === 0) return null;
  return (
    <div>
      <PaperSectionHeading
        title={title}
        styleVariant={design.sectionTitleStyle}
        accentColor={design.accentColor}
        onDarkBg={onDarkBg}
      />
      <div className="flex flex-col gap-2">
        {document.certifications.map((crt) => (
          <div key={crt.id} className="text-xs leading-snug">
            <div className="font-bold">{crt.name}</div>
            <div className={mutedText}>
              {crt.issuer}
              {crt.hoursIntensity ? ` · ${crt.hoursIntensity}h` : ""}
              {crt.issueDate ? ` (${crt.issueDate})` : ""}
              {crt.credentialCode ? ` · ID: ${crt.credentialCode}` : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

