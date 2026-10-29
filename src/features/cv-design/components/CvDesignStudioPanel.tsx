"use client";

import React from "react";
import {
  CvBlockConfig,
  CvDesignSettings,
} from "@/features/cv-document/types/cvDocument.types";
import { PhotoCustomizerCard } from "./PhotoCustomizerCard";
import { ColorAndTypographyCard } from "./ColorAndTypographyCard";
import { StructureAndOrderCard } from "./StructureAndOrderCard";

export interface CvDesignStudioPanelProps {
  photoDataUrl: string;
  design: CvDesignSettings;
  blocks: CvBlockConfig[];
  onSetPhotoUrl: (url: string) => void;
  onUpdateDesign: (patch: Partial<CvDesignSettings>) => void;
  onMoveBlock: (blockId: string, direction: "up" | "down") => void;
  onToggleZone: (blockId: string) => void;
  onToggleVisibility: (blockId: string) => void;
}

export function CvDesignStudioPanel({
  photoDataUrl,
  design,
  blocks,
  onSetPhotoUrl,
  onUpdateDesign,
  onMoveBlock,
  onToggleZone,
  onToggleVisibility,
}: CvDesignStudioPanelProps) {
  return (
    <div className="flex flex-col gap-5">
      <PhotoCustomizerCard
        photoDataUrl={photoDataUrl}
        showPhoto={design.showPhoto}
        photoShape={design.photoShape}
        onSetPhotoUrl={onSetPhotoUrl}
        onToggleShowPhoto={(showPhoto) => onUpdateDesign({ showPhoto })}
        onChangePhotoShape={(photoShape) => onUpdateDesign({ photoShape })}
      />

      <ColorAndTypographyCard
        design={design}
        onUpdateDesign={onUpdateDesign}
      />

      <StructureAndOrderCard
        design={design}
        blocks={blocks}
        onUpdateDesign={onUpdateDesign}
        onMoveBlock={onMoveBlock}
        onToggleZone={onToggleZone}
        onToggleVisibility={onToggleVisibility}
      />
    </div>
  );
}

