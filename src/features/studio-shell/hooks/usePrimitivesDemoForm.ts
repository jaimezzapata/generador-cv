"use client";

import { useCallback, useMemo, useState } from "react";
import {
  CvTemplateFormatId,
  TemplateCategory,
} from "../types/studioShell.types";
import { CV_TEMPLATES_CATALOG } from "../utils/studioRoadmap.utils";

export function usePrimitivesDemoForm() {
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<CvTemplateFormatId>("sena");
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>("all");

  const selectTemplate = useCallback((templateId: CvTemplateFormatId) => {
    setSelectedTemplateId(templateId);
  }, []);

  const filteredTemplates = useMemo(() => {
    if (activeCategory === "all") return CV_TEMPLATES_CATALOG;
    return CV_TEMPLATES_CATALOG.filter(
      (tpl) => tpl.category === activeCategory
    );
  }, [activeCategory]);

  return {
    selectedTemplateId,
    activeCategory,
    filteredTemplates,
    setActiveCategory,
    selectTemplate,
  };
}
