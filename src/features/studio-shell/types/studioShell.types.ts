export type CvTemplateFormatId = "sena" | "ats" | "executive" | "creative";

export type TemplateCategory = "all" | "normativo" | "corporativo" | "creativo";

export interface CvTemplateCatalogItem {
  id: CvTemplateFormatId;
  name: string;
  badgeText: string;
  category: Exclude<TemplateCategory, "all">;
  idealFor: string;
  description: string;
  imageSrc: string;
}

export interface ProductBenefitItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  imageSrc: string;
}

export interface HowItWorksStep {
  stepNumber: string;
  title: string;
  description: string;
}
