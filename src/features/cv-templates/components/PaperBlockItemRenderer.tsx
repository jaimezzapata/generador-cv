"use client";

import React from "react";
import { CvBlockConfig, CvDocument } from "@/features/cv-document/types/cvDocument.types";
import { PaperSectionHeading } from "./PaperSectionHeading";
import { PaperSkillsAndLangsRenderer } from "./PaperSkillsAndLangsRenderer";
import { PaperTrajectoryBlocksRenderer } from "./PaperTrajectoryBlocksRenderer";

export interface PaperBlockItemRendererProps {
  block: CvBlockConfig;
  document: CvDocument;
  onDarkBg?: boolean;
}

export function PaperBlockItemRenderer({
  block,
  document,
  onDarkBg = false,
}: PaperBlockItemRendererProps) {
  if (!block.visible) return null;
  const { design } = document;
  const subText = onDarkBg ? "text-slate-300" : "text-slate-600";

  if (
    block.type === "skills" ||
    block.type === "languages" ||
    block.type === "certifications"
  ) {
    return (
      <PaperSkillsAndLangsRenderer
        blockType={block.type}
        title={block.title}
        document={document}
        onDarkBg={onDarkBg}
      />
    );
  }

  if (
    block.type === "profile" ||
    block.type === "experience" ||
    block.type === "education" ||
    block.type === "projects"
  ) {
    return (
      <PaperTrajectoryBlocksRenderer
        blockType={block.type}
        title={block.title}
        document={document}
        onDarkBg={onDarkBg}
      />
    );
  }

  if (block.type === "references") {
    if (!design.referencesOnRequest && document.references.length === 0) return null;
    return (
      <div>
        <PaperSectionHeading
          title={block.title}
          styleVariant={design.sectionTitleStyle}
          accentColor={design.accentColor}
          onDarkBg={onDarkBg}
        />
        {design.referencesOnRequest ? (
          <p className={`text-xs italic ${subText}`}>
            Referencias laborales y personales disponibles a solicitud.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {document.references.map((ref) => (
              <div key={ref.id} className="text-xs">
                <div className="font-bold">{ref.fullName}</div>
                <div className={subText}>
                  {ref.roleOrRelationship} {ref.company ? `· ${ref.company}` : ""}
                </div>
                <div className={subText}>
                  {ref.phone} {ref.email ? `· ${ref.email}` : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (document.customBlocks.length === 0) return null;
  return (
    <div className="flex flex-col gap-3">
      {document.customBlocks.map((cst) => (
        <div key={cst.id} className="text-xs">
          <PaperSectionHeading
            title={cst.sectionTitle || "Sección Adicional"}
            styleVariant={design.sectionTitleStyle}
            accentColor={design.accentColor}
            onDarkBg={onDarkBg}
          />
          {cst.subtitle && (
            <div className="font-bold">
              {cst.subtitle} {cst.locationOrEntity ? `· ${cst.locationOrEntity}` : ""}{" "}
              {cst.period ? `(${cst.period})` : ""}
            </div>
          )}
          <p className={`mt-0.5 leading-relaxed ${subText}`}>{cst.content}</p>
        </div>
      ))}
    </div>
  );
}
