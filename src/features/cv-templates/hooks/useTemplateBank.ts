"use client";

import { useCallback, useMemo, useState } from "react";
import { TemplateBankCategory } from "../types/cvTemplates.types";
import { PREDEFINED_TEMPLATES_BANK } from "../utils/templatePresetsBank.utils";

export function useTemplateBank() {
  const [activeCategory, setActiveCategory] =
    useState<TemplateBankCategory>("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const filteredPresets = useMemo(() => {
    if (activeCategory === "all") return PREDEFINED_TEMPLATES_BANK;
    return PREDEFINED_TEMPLATES_BANK.filter(
      (preset) => preset.category === activeCategory
    );
  }, [activeCategory]);

  return {
    activeCategory,
    isModalOpen,
    filteredPresets,
    setActiveCategory,
    openModal,
    closeModal,
  };
}
