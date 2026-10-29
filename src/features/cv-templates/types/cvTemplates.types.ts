import {
  CvDocument,
  CvTemplateId,
} from "@/features/cv-document/types/cvDocument.types";

export type TemplateBankCategory =
  | "all"
  | "normativo"
  | "corporativo"
  | "primer_empleo"
  | "creativo";

export interface PredefinedTemplatePreset {
  id: CvTemplateId;
  name: string;
  badgeText: string;
  category: Exclude<TemplateBankCategory, "all">;
  idealFor: string;
  sampleRoleLabel: string;
  imageSrc: string;
  accentHex: string;
  buildPresetDocument: () => CvDocument;
}
