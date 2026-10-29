import { CvDocument, CvTemplateId } from "../types/cvDocument.types";
import {
  createDefaultBlocks,
  createDefaultCvDocument,
  getDefaultDesignForTemplate,
} from "./cvDefaults.utils";
import { isValidTemplateId } from "./cvValidation.utils";

export function normalizeCvDocument(
  partial: Partial<CvDocument> | null | undefined,
  fallbackTemplate: CvTemplateId = "sena"
): CvDocument {
  const safeTemplate = isValidTemplateId(partial?.templateId)
    ? partial.templateId
    : fallbackTemplate;

  const base = createDefaultCvDocument(safeTemplate);
  if (!partial || typeof partial !== "object") {
    return base;
  }

  const defaultBlocks = createDefaultBlocks();
  const existingBlocks = Array.isArray(partial.blocks) ? partial.blocks : [];
  const mergedBlocks = [
    ...existingBlocks,
    ...defaultBlocks.filter(
      (defBlk) => !existingBlocks.some((b) => b.type === defBlk.type)
    ),
  ];

  return {
    ...base,
    ...partial,
    templateId: safeTemplate,
    design: {
      ...getDefaultDesignForTemplate(safeTemplate),
      ...(partial.design ?? {}),
    },
    personalInfo: {
      ...base.personalInfo,
      ...(partial.personalInfo ?? {}),
    },
    blocks: mergedBlocks.map((b) => ({
      ...b,
      colSpan: b.colSpan ?? "full",
      variant: b.variant ?? "default",
    })),
    experiences: Array.isArray(partial.experiences)
      ? partial.experiences.map((exp) => ({
          ...base.experiences[0],
          ...exp,
        }))
      : base.experiences,
    educations: Array.isArray(partial.educations)
      ? partial.educations.map((edu) => ({
          ...base.educations[0],
          ...edu,
        }))
      : base.educations,
    projects: Array.isArray(partial.projects) ? partial.projects : base.projects,
    skills: Array.isArray(partial.skills) ? partial.skills : base.skills,
    languages: Array.isArray(partial.languages)
      ? partial.languages
      : base.languages,
    certifications: Array.isArray(partial.certifications)
      ? partial.certifications.map((crt) => ({
          ...base.certifications[0],
          ...crt,
        }))
      : base.certifications,
    references: Array.isArray(partial.references)
      ? partial.references.map((ref) => ({
          ...base.references[0],
          ...ref,
        }))
      : base.references,
    customBlocks: Array.isArray(partial.customBlocks)
      ? partial.customBlocks
      : [],
  };
}

