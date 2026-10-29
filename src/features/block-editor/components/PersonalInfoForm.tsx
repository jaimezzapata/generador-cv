"use client";

import React from "react";
import { PhotoCustomizerCard } from "@/features/cv-design/components/PhotoCustomizerCard";
import {
  CvDesignSettings,
  PersonalInfoData,
} from "@/features/cv-document/types/cvDocument.types";
import { PersonalIdentitySubform } from "./PersonalIdentitySubform";
import { PersonalContactSubform } from "./PersonalContactSubform";

export interface PersonalInfoFormProps {
  data: PersonalInfoData;
  design: CvDesignSettings;
  isSenaFormat: boolean;
  onUpdateField: <K extends keyof PersonalInfoData>(
    field: K,
    value: PersonalInfoData[K]
  ) => void;
  onUpdateDesign: (patch: Partial<CvDesignSettings>) => void;
}

export function PersonalInfoForm({
  data,
  design,
  isSenaFormat,
  onUpdateField,
  onUpdateDesign,
}: PersonalInfoFormProps) {
  return (
    <div className="flex flex-col gap-5">
      <PhotoCustomizerCard
        photoDataUrl={data.photoDataUrl}
        showPhoto={design.showPhoto}
        photoShape={design.photoShape}
        onSetPhotoUrl={(url) => onUpdateField("photoDataUrl", url)}
        onToggleShowPhoto={(showPhoto) => onUpdateDesign({ showPhoto })}
        onChangePhotoShape={(photoShape) => onUpdateDesign({ photoShape })}
      />

      <PersonalIdentitySubform
        data={data}
        isSenaFormat={isSenaFormat}
        onUpdateField={onUpdateField}
      />

      <PersonalContactSubform data={data} onUpdateField={onUpdateField} />
    </div>
  );
}
