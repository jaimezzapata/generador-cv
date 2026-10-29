"use client";

import React from "react";
import { CvTemplateId } from "../types/cvDocument.types";
import {
  CvDocumentContext,
  useCvDocumentController,
} from "../hooks/useCvDocument";

export interface CvDocumentProviderProps {
  initialTemplate?: CvTemplateId;
  forcePresetLoad?: boolean;
  children: React.ReactNode;
}

export function CvDocumentProvider({
  initialTemplate,
  forcePresetLoad = false,
  children,
}: CvDocumentProviderProps) {
  const controller = useCvDocumentController(initialTemplate, forcePresetLoad);

  return (
    <CvDocumentContext.Provider value={controller}>
      {children}
    </CvDocumentContext.Provider>
  );
}
