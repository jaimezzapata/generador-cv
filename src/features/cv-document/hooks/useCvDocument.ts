"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  CertificationItem,
  CustomSectionBlock,
  CvDesignSettings,
  CvDocument,
  CvTemplateId,
  EducationItem,
  ExperienceItem,
  LanguageCefrLevel,
  PersonalInfoData,
  ProjectItem,
  ReferenceItem,
  SkillCategory,
  SkillLevel,
} from "../types/cvDocument.types";
import {
  createEmptyCertificationItem,
  createEmptyCustomSection,
  createEmptyEducationItem,
  createEmptyExperienceItem,
  createEmptyLanguageItem,
  createEmptyProjectItem,
  createEmptyReferenceItem,
  createEmptySkillItem,
  getDefaultDesignForTemplate,
} from "../utils/cvDefaults.utils";
import {
  calculateCvCompletion,
  CvCompletionSummary,
} from "../utils/cvValidation.utils";
import { cvStorageService } from "../services/cvStorage.service";

type ListCollectionKey =
  | "experiences"
  | "educations"
  | "projects"
  | "skills"
  | "languages"
  | "certifications"
  | "references"
  | "customBlocks";

export interface CvSummaryMetaPatch {
  profileSummary?: string;
  careerObjective?: string;
  yearsOfExperience?: string;
  salaryExpectation?: string;
}

export interface CvDocumentContextContract {
  document: CvDocument;
  completion: CvCompletionSummary;
  setTemplateId: (templateId: CvTemplateId) => void;
  loadPredefinedTemplate: (templateId: CvTemplateId) => void;
  updateDesign: (patch: Partial<CvDesignSettings>) => void;
  updatePersonalInfo: <K extends keyof PersonalInfoData>(
    field: K,
    value: PersonalInfoData[K]
  ) => void;
  updateSummaryMeta: (patch: CvSummaryMetaPatch) => void;
  toggleBlockVisibility: (blockId: string) => void;
  toggleBlockZone: (blockId: string) => void;
  moveBlockOrder: (blockId: string, direction: "up" | "down") => void;
  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, patch: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  addSkill: (name: string, category: SkillCategory, level: SkillLevel) => void;
  removeSkill: (id: string) => void;
  addLanguage: (
    name: string,
    level: LanguageCefrLevel,
    certification: string
  ) => void;
  removeLanguage: (id: string) => void;
  addCertification: () => void;
  updateCertification: (id: string, patch: Partial<CertificationItem>) => void;
  removeCertification: (id: string) => void;
  addReference: () => void;
  updateReference: (id: string, patch: Partial<ReferenceItem>) => void;
  removeReference: (id: string) => void;
  addCustomBlock: () => void;
  updateCustomBlock: (id: string, patch: Partial<CustomSectionBlock>) => void;
  removeCustomBlock: (id: string) => void;
  resetToDemoDocument: () => void;
}

export const CvDocumentContext = createContext<CvDocumentContextContract | null>(
  null
);

export function useCvDocumentController(
  initialTemplate?: CvTemplateId,
  forcePresetLoad = false
): CvDocumentContextContract {
  const fallbackTemplate = initialTemplate ?? "sena";

  const document = useSyncExternalStore(
    cvStorageService.subscribe,
    () => cvStorageService.getClientSnapshot(fallbackTemplate),
    () => cvStorageService.getServerSnapshot(fallbackTemplate)
  );

  useEffect(() => {
    cvStorageService.applyRouteParams(initialTemplate, forcePresetLoad);
  }, [forcePresetLoad, initialTemplate]);

  const appendItem = useCallback(
    <K extends ListCollectionKey>(key: K, newItem: CvDocument[K][number]) => {
      cvStorageService.updateDocument((prev) => ({
        ...prev,
        [key]: [...prev[key], newItem] as CvDocument[K],
      }));
    },
    []
  );

  const patchItem = useCallback(
    <K extends ListCollectionKey>(
      key: K,
      id: string,
      patch: Partial<CvDocument[K][number]>
    ) => {
      cvStorageService.updateDocument((prev) => ({
        ...prev,
        [key]: prev[key].map((entry) =>
          entry.id === id ? { ...entry, ...patch } : entry
        ) as CvDocument[K],
      }));
    },
    []
  );

  const deleteItem = useCallback(
    <K extends ListCollectionKey>(key: K, id: string) => {
      cvStorageService.updateDocument((prev) => ({
        ...prev,
        [key]: prev[key].filter((entry) => entry.id !== id) as CvDocument[K],
      }));
    },
    []
  );

  const setTemplateId = useCallback((templateId: CvTemplateId) => {
    cvStorageService.updateDocument((prev) => ({
      ...prev,
      templateId,
      design: getDefaultDesignForTemplate(templateId),
    }));
  }, []);

  const updateDesign = useCallback((patch: Partial<CvDesignSettings>) => {
    cvStorageService.updateDocument((prev) => ({
      ...prev,
      design: { ...prev.design, ...patch },
    }));
  }, []);

  const updatePersonalInfo = useCallback(
    <K extends keyof PersonalInfoData>(field: K, value: PersonalInfoData[K]) => {
      cvStorageService.updateDocument((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, [field]: value },
      }));
    },
    []
  );

  const updateSummaryMeta = useCallback((patch: CvSummaryMetaPatch) => {
    cvStorageService.updateDocument((prev) => ({ ...prev, ...patch }));
  }, []);

  const toggleBlockVisibility = useCallback((blockId: string) => {
    cvStorageService.updateDocument((prev) => ({
      ...prev,
      blocks: prev.blocks.map((blk) =>
        blk.id === blockId ? { ...blk, visible: !blk.visible } : blk
      ),
    }));
  }, []);

  const toggleBlockZone = useCallback((blockId: string) => {
    cvStorageService.updateDocument((prev) => ({
      ...prev,
      blocks: prev.blocks.map((blk) =>
        blk.id === blockId
          ? { ...blk, zone: blk.zone === "main" ? "sidebar" : "main" }
          : blk
      ),
    }));
  }, []);

  const moveBlockOrder = useCallback(
    (blockId: string, direction: "up" | "down") => {
      cvStorageService.updateDocument((prev) => {
        const idx = prev.blocks.findIndex((b) => b.id === blockId);
        if (idx < 0) return prev;
        const swapIdx = direction === "up" ? idx - 1 : idx + 1;
        if (swapIdx < 0 || swapIdx >= prev.blocks.length) return prev;

        const nextBlocks = [...prev.blocks];
        const [moved] = nextBlocks.splice(idx, 1);
        nextBlocks.splice(swapIdx, 0, moved);
        return { ...prev, blocks: nextBlocks };
      });
    },
    []
  );

  const loadPredefinedTemplate = useCallback((templateId: CvTemplateId) => {
    cvStorageService.loadPresetFresh(templateId);
  }, []);

  const resetToDemoDocument = useCallback(() => {
    cvStorageService.loadPresetFresh(document.templateId);
  }, [document.templateId]);

  const completion = useMemo(
    () => calculateCvCompletion(document),
    [document]
  );

  return {
    document,
    completion,
    setTemplateId,
    loadPredefinedTemplate,
    updateDesign,
    updatePersonalInfo,
    updateSummaryMeta,
    toggleBlockVisibility,
    toggleBlockZone,
    moveBlockOrder,
    addExperience: () => appendItem("experiences", createEmptyExperienceItem()),
    updateExperience: (id, patch) => patchItem("experiences", id, patch),
    removeExperience: (id) => deleteItem("experiences", id),
    addEducation: () => appendItem("educations", createEmptyEducationItem()),
    updateEducation: (id, patch) => patchItem("educations", id, patch),
    removeEducation: (id) => deleteItem("educations", id),
    addProject: () => appendItem("projects", createEmptyProjectItem()),
    updateProject: (id, patch) => patchItem("projects", id, patch),
    removeProject: (id) => deleteItem("projects", id),
    addSkill: (name, category, level) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      appendItem("skills", createEmptySkillItem(trimmed, category, level));
    },
    removeSkill: (id) => deleteItem("skills", id),
    addLanguage: (name, level, certification) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      appendItem(
        "languages",
        createEmptyLanguageItem(trimmed, level, certification.trim())
      );
    },
    removeLanguage: (id) => deleteItem("languages", id),
    addCertification: () =>
      appendItem("certifications", createEmptyCertificationItem()),
    updateCertification: (id, patch) => patchItem("certifications", id, patch),
    removeCertification: (id) => deleteItem("certifications", id),
    addReference: () => appendItem("references", createEmptyReferenceItem()),
    updateReference: (id, patch) => patchItem("references", id, patch),
    removeReference: (id) => deleteItem("references", id),
    addCustomBlock: () => {
      cvStorageService.updateDocument((prev) => ({
        ...prev,
        blocks: prev.blocks.map((b) =>
          b.type === "custom" ? { ...b, visible: true } : b
        ),
        customBlocks: [...prev.customBlocks, createEmptyCustomSection()],
      }));
    },
    updateCustomBlock: (id, patch) => patchItem("customBlocks", id, patch),
    removeCustomBlock: (id) => deleteItem("customBlocks", id),
    resetToDemoDocument,
  };
}

export function useCvDocument(): CvDocumentContextContract {
  const ctx = useContext(CvDocumentContext);
  if (!ctx) {
    throw new Error("useCvDocument must be used inside CvDocumentProvider");
  }
  return ctx;
}
