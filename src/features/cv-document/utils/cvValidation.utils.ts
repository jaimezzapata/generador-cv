import { CvDocument, CvTemplateId } from "../types/cvDocument.types";

export interface CvCompletionSummary {
  percentage: number;
  missingHints: string[];
}

export function isValidTemplateId(value: unknown): value is CvTemplateId {
  return (
    value === "sena" ||
    value === "ats" ||
    value === "executive" ||
    value === "creative" ||
    value === "first_job" ||
    value === "administrative"
  );
}

export function calculateCvCompletion(doc: CvDocument): CvCompletionSummary {
  const checks: { ok: boolean; hint: string }[] = [
    {
      ok: Boolean(doc.personalInfo.fullName.trim() && doc.personalInfo.email.trim()),
      hint: "Completa tu nombre y correo electrónico",
    },
    {
      ok: Boolean(doc.personalInfo.phone.trim() && doc.personalInfo.city.trim()),
      hint: "Agrega teléfono y ciudad de residencia",
    },
    {
      ok:
        doc.templateId !== "sena" ||
        Boolean(doc.personalInfo.documentNumber.trim()),
      hint: "El formato SENA requiere número de documento de identidad",
    },
    {
      ok: doc.profileSummary.trim().length >= 40,
      hint: "Redacta un perfil profesional de al menos 40 caracteres",
    },
    {
      ok: doc.educations.length > 0,
      hint: "Registra al menos una formación académica",
    },
    {
      ok: doc.experiences.length > 0 || doc.projects.length > 0,
      hint: "Agrega al menos una experiencia laboral o proyecto destacado",
    },
    {
      ok: doc.skills.length >= 2,
      hint: "Añade al menos 2 competencias o herramientas",
    },
  ];

  const passed = checks.filter((c) => c.ok).length;
  const percentage = Math.round((passed / checks.length) * 100);
  const missingHints = checks.filter((c) => !c.ok).map((c) => c.hint);

  return { percentage, missingHints };
}
