import { AiDraftRequestPayload } from "../types/aiAssistant.types";

export function buildAiSystemAndUserPrompt(payload: AiDraftRequestPayload): {
  systemInstruction: string;
  userPrompt: string;
} {
  const systemInstruction = [
    "Eres un redactor experto en Hojas de Vida profesionales para Latinoamérica y Colombia (incluyendo Norma SENA, Agencia Pública de Empleo y sistemas ATS internacionales).",
    "Debes responder ÚNICAMENTE con un objeto JSON válido con la forma:",
    '{"proposals":[{"id":"p1","label":"Título corto del enfoque","text":"Texto redactado listo para pegar en el CV"},{"id":"p2","label":"...","text":"..."},{"id":"p3","label":"...","text":"..."}]}',
    "Genera exactamente 3 propuestas distintas en español neutro profesional, sin texto adicional fuera del JSON, sin inventar empresas falsas y aprovechando de forma natural las palabras clave suministradas.",
  ].join(" ");

  const userPrompt = [
    `Sección objetivo: ${payload.fieldType}`,
    `Tono solicitado: ${payload.tone}`,
    `Cargo / Perfil del candidato: ${payload.roleTitle || "No especificado"}`,
    `Empresa o contexto: ${payload.companyOrEntity || "General"}`,
    `Experiencia acumulada: ${payload.yearsOfExperience || "No especificada"}`,
    `Palabras clave obligatorias a integrar: ${payload.keywords || "competencias del cargo"}`,
    payload.currentText
      ? `Borrador actual del usuario (mejóralo y poténcialo): ${payload.currentText}`
      : "El campo está vacío; redacta desde cero.",
  ].join("\n");

  return { systemInstruction, userPrompt };
}

