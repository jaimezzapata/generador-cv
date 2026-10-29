"use client";

import { useCallback, useState } from "react";
import {
  LanguageCefrLevel,
  SkillCategory,
  SkillLevel,
} from "@/features/cv-document/types/cvDocument.types";
import { CanvasZoomLevel, EditorSectionTab } from "../types/blockEditor.types";

export function useBlockEditorNavigation(
  onAddSkill: (name: string, category: SkillCategory, level: SkillLevel) => void,
  onAddLanguage: (
    name: string,
    level: LanguageCefrLevel,
    certification: string
  ) => void
) {
  const [activeTab, setActiveTab] = useState<EditorSectionTab>("personal");
  const [zoomLevel, setZoomLevel] = useState<CanvasZoomLevel>(90);
  const [fullPreviewMode, setFullPreviewMode] = useState<boolean>(false);

  const [skillName, setSkillName] = useState<string>("");
  const [skillCategory, setSkillCategory] = useState<SkillCategory>("tecnica");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("avanzado");

  const [langName, setLangName] = useState<string>("");
  const [langLevel, setLangLevel] = useState<LanguageCefrLevel>("B2");
  const [langCert, setLangCert] = useState<string>("");

  const submitNewSkill = useCallback(() => {
    if (!skillName.trim()) return;
    onAddSkill(skillName, skillCategory, skillLevel);
    setSkillName("");
  }, [onAddSkill, skillCategory, skillLevel, skillName]);

  const submitNewLanguage = useCallback(() => {
    if (!langName.trim()) return;
    onAddLanguage(langName, langLevel, langCert);
    setLangName("");
    setLangCert("");
  }, [langCert, langLevel, langName, onAddLanguage]);

  return {
    activeTab,
    zoomLevel,
    fullPreviewMode,
    skillName,
    skillCategory,
    skillLevel,
    langName,
    langLevel,
    langCert,
    setActiveTab,
    setZoomLevel,
    setFullPreviewMode,
    setSkillName,
    setSkillCategory,
    setSkillLevel,
    setLangName,
    setLangLevel,
    setLangCert,
    submitNewSkill,
    submitNewLanguage,
  };
}
