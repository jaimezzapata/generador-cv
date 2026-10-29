"use client";

import React from "react";
import { CvDocument } from "@/features/cv-document/types/cvDocument.types";
import { PaperSectionHeading } from "./PaperSectionHeading";

export interface PaperTrajectoryBlocksRendererProps {
  blockType: "profile" | "experience" | "education" | "projects";
  title: string;
  document: CvDocument;
  onDarkBg?: boolean;
}

export function PaperTrajectoryBlocksRenderer({
  blockType,
  title,
  document,
  onDarkBg = false,
}: PaperTrajectoryBlocksRendererProps) {
  const { design } = document;
  const subText = onDarkBg ? "text-slate-300" : "text-slate-600";

  if (blockType === "profile") {
    if (!document.profileSummary && !document.careerObjective) return null;
    return (
      <div>
        <PaperSectionHeading title={title} styleVariant={design.sectionTitleStyle} accentColor={design.accentColor} onDarkBg={onDarkBg} />
        {document.profileSummary && <p className={`text-xs leading-relaxed ${subText}`}>{document.profileSummary}</p>}
        {(document.careerObjective || document.yearsOfExperience) && (
          <p className={`text-xs mt-1.5 leading-relaxed ${subText}`}>
            {document.yearsOfExperience && <strong>Experiencia: {document.yearsOfExperience}. </strong>}
            {document.careerObjective}
          </p>
        )}
      </div>
    );
  }

  if (blockType === "experience") {
    if (document.experiences.length === 0) return null;
    return (
      <div>
        <PaperSectionHeading title={title} styleVariant={design.sectionTitleStyle} accentColor={design.accentColor} onDarkBg={onDarkBg} />
        <div className="flex flex-col gap-3">
          {document.experiences.map((exp) => (
            <div key={exp.id} className="text-xs">
              <div className="flex justify-between items-baseline gap-2">
                <span className="font-black text-[13px]">{exp.role || "Cargo"}</span>
                <span className={`text-[11px] font-semibold shrink-0 ${subText}`}>
                  {exp.startDate} — {exp.isCurrent ? "Actualidad" : exp.endDate}
                </span>
              </div>
              <div className="font-bold" style={{ color: onDarkBg ? "#7dd3fc" : design.accentColor }}>
                {exp.company} {exp.city ? `· ${exp.city}` : ""}
              </div>
              {exp.description && <p className={`mt-1 leading-relaxed ${subText}`}>{exp.description}</p>}
              {exp.achievements && <p className="mt-1 font-semibold text-[11px]">★ Logros: {exp.achievements}</p>}
              {(exp.immediateBoss || exp.verificationPhone) && (
                <p className={`mt-0.5 text-[10px] ${subText}`}>
                  Soporte: {exp.immediateBoss} {exp.verificationPhone ? `(${exp.verificationPhone})` : ""}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (blockType === "education") {
    if (document.educations.length === 0) return null;
    return (
      <div>
        <PaperSectionHeading title={title} styleVariant={design.sectionTitleStyle} accentColor={design.accentColor} onDarkBg={onDarkBg} />
        <div className="flex flex-col gap-2.5">
          {document.educations.map((edu) => (
            <div key={edu.id} className="text-xs">
              <div className="flex justify-between items-baseline gap-2">
                <span className="font-bold text-[13px]">{edu.degree}</span>
                <span className={`text-[11px] shrink-0 ${subText}`}>{edu.inProgress ? "En curso" : edu.endDate || edu.startDate}</span>
              </div>
              <div className={subText}>
                {edu.institution} {edu.city ? `· ${edu.city}` : ""}
                {edu.hoursIntensity ? ` · (${edu.hoursIntensity} h)` : ""}
              </div>
              {edu.honorsOrSummary && <p className={`text-[11px] mt-0.5 italic ${subText}`}>{edu.honorsOrSummary}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (document.projects.length === 0) return null;
  return (
    <div>
      <PaperSectionHeading title={title} styleVariant={design.sectionTitleStyle} accentColor={design.accentColor} onDarkBg={onDarkBg} />
      <div className="flex flex-col gap-2.5">
        {document.projects.map((prj) => (
          <div key={prj.id} className="text-xs">
            <div className="flex justify-between items-baseline gap-2">
              <span className="font-bold">{prj.name} {prj.role ? `— ${prj.role}` : ""}</span>
              <span className={`text-[11px] ${subText}`}>{prj.period}</span>
            </div>
            {prj.techStack && (
              <div className="text-[11px] font-semibold" style={{ color: onDarkBg ? "#7dd3fc" : design.accentColor }}>
                Stack: {prj.techStack} {prj.projectUrl ? `· ${prj.projectUrl}` : ""}
              </div>
            )}
            {prj.description && <p className={`mt-0.5 leading-relaxed ${subText}`}>{prj.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

