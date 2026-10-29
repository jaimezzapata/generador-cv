export type AiTargetFieldType =
  | "profile_summary"
  | "career_objective"
  | "experience_functions"
  | "experience_achievements"
  | "project_description"
  | "custom_section";

export type AiWritingTone =
  | "norma_sena"
  | "ats_impacto"
  | "ejecutivo"
  | "primer_empleo";

export interface AiDraftRequestPayload {
  fieldType: AiTargetFieldType;
  tone: AiWritingTone;
  keywords: string;
  roleTitle?: string;
  companyOrEntity?: string;
  yearsOfExperience?: string;
  currentText?: string;
}

export interface AiProposalItem {
  id: string;
  label: string;
  text: string;
}

export interface AiDraftResponsePayload {
  source: "gemini" | "openai" | "smart_engine";
  proposals: AiProposalItem[];
}

