import { SelectOption } from "@/shared/components/ui/Select";
import { AiTargetFieldType } from "../types/aiAssistant.types";

export const AI_WRITING_TONE_OPTIONS: SelectOption[] = [
  { value: "ats_impacto", label: "Alto Impacto + Filtros ATS" },
  { value: "norma_sena", label: "Institucional / Norma SENA" },
  { value: "ejecutivo", label: "Ejecutivo / Liderazgo Senior" },
  { value: "primer_empleo", label: "Primer Empleo / Etapa Productiva" },
];

export const AI_FIELD_LABELS: Record<
  AiTargetFieldType,
  { title: string; placeholderKeywords: string }
> = {
  profile_summary: {
    title: "Redactar Perfil Profesional con IA",
    placeholderKeywords:
      "Ej. React, SQL, análisis de datos, liderazgo ágil, servicio al cliente...",
  },
  career_objective: {
    title: "Redactar Objetivo Laboral con IA",
    placeholderKeywords:
      "Ej. optimización de procesos, crecimiento en fintech, automatización...",
  },
  experience_functions: {
    title: "Redactar Funciones del Cargo con IA",
    placeholderKeywords:
      "Ej. atención de usuarios, reportes en Excel, desarrollo APIs, auditoría...",
  },
  experience_achievements: {
    title: "Redactar Logros Medibles con IA",
    placeholderKeywords:
      "Ej. ahorro 25% tiempos, cero errores en inventario, 98% satisfacción...",
  },
  project_description: {
    title: "Redactar Descripción de Proyecto con IA",
    placeholderKeywords:
      "Ej. app web inventario, PostgreSQL, panel tiempo real, 500 usuarios...",
  },
  custom_section: {
    title: "Redactar Sección Personalizada con IA",
    placeholderKeywords:
      "Ej. semillero investigación, voluntariado ambiental, ponente congreso...",
  },
};

export function parseKeywordsList(rawKeywords: string): string[] {
  return rawKeywords
    .split(/[,;•\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}
