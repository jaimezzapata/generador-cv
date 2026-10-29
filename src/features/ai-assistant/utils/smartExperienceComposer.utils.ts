import {
  AiDraftRequestPayload,
  AiProposalItem,
} from "../types/aiAssistant.types";
import { parseKeywordsList } from "./aiToneOptions.utils";

export function composeExperienceAndBlockDrafts(
  req: AiDraftRequestPayload
): AiProposalItem[] {
  const role = req.roleTitle?.trim() || "Especialista del área";
  const entity = req.companyOrEntity?.trim()
    ? `en ${req.companyOrEntity.trim()}`
    : "en el área asignada";

  const kw = parseKeywordsList(req.keywords);
  const k1 = kw[0] || "procesos operativos clave";
  const k2 = kw[1] || "seguimiento de indicadores";
  const k3 = kw.slice(2).join(", ") || "herramientas digitales y control de calidad";

  if (req.fieldType === "experience_functions") {
    return [
      {
        id: "fn_1",
        label: "Redacción Ejecutiva por Responsabilidades",
        text: `Ejecución y coordinación de ${k1} como ${role} ${entity}, gestionando de forma integral ${k2} mediante ${k3}, asegurando trazabilidad, cumplimiento de tiempos de entrega y altos estándares de calidad.`,
      },
      {
        id: "fn_2",
        label: "Formato Viñetas ATS de Alto Impacto",
        text: `• Liderar y ejecutar procesos de ${k1} garantizando continuidad operativa.\n• Implementar mejoras en ${k2} apoyándose en ${k3}.\n• Articular requerimientos con equipos internos y clientes para asegurar entregas oportunas.`,
      },
      {
        id: "fn_3",
        label: "Formato Institucional / Norma SENA",
        text: `Desempeño técnico y operativo en el cargo de ${role}, realizando actividades de planeación, ejecución y verificación en ${k1}, manejo aplicado de ${k2} y soporte continuo en ${k3} conforme a los protocolos establecidos.`,
      },
    ];
  }

  if (req.fieldType === "experience_achievements") {
    return [
      {
        id: "ach_1",
        label: "Logros Cuantificables con Métricas",
        text: `Optimización del 30% en tiempos de ejecución de ${k1} • Cumplimiento superior al 98% en entregas de ${k2} mediante la estandarización con ${k3}.`,
      },
      {
        id: "ach_2",
        label: "Impacto en Calidad y Eficiencia",
        text: `Reducción significativa de reprocesos operativos al sistematizar ${k1} e integrar ${k2}, elevando la satisfacción de usuarios internos y externos.`,
      },
      {
        id: "ach_3",
        label: "Hito de Liderazgo e Innovación",
        text: `Diseño y puesta en marcha de mejoras prácticas en ${k1} y ${k2}, logrando mayor trazabilidad documental y reconocimiento por desempeño sobresaliente.`,
      },
    ];
  }

  if (req.fieldType === "project_description") {
    return [
      {
        id: "prj_1",
        label: "Caso de Éxito Orientado a Producto",
        text: `Diseño, desarrollo y despliegue de solución enfocada en ${k1}, integrando ${k2} y ${k3} para automatizar flujos críticos y mejorar la experiencia del usuario final.`,
      },
      {
        id: "prj_2",
        label: "Enfoque Técnico y Arquitectura",
        text: `Implementación modular como ${role} utilizando ${k1}, ${k2} y ${k3}, garantizando escalabilidad, rendimiento óptimo y mantenibilidad del proyecto.`,
      },
      {
        id: "prj_3",
        label: "Resumen Ejecutivo de Resultados",
        text: `Proyecto aplicado orientado a resolver retos reales de ${k1} mediante ${k2}, logrando centralizar la información y agilizar la toma de decisiones.`,
      },
    ];
  }

  return [
    {
      id: "cst_1",
      label: "Redacción Destacada y Profesional",
      text: `Participación activa ${entity} desarrollando iniciativas de ${k1} y ${k2}, fortaleciendo competencias de liderazgo, compromiso social y aplicación de ${k3}.`,
    },
    {
      id: "cst_2",
      label: "Síntesis Académica / Institucional",
      text: `Aporte destacado en actividades de ${k1} y ${k2}, cumpliendo objetivos de investigación aplicada, divulgación de conocimiento y trabajo colaborativo.`,
    },
    {
      id: "cst_3",
      label: "Formato Breve Directo",
      text: `Desarrollo de ${k1} con énfasis en ${k2} y ${k3}, obteniendo resultados sobresalientes y reconocimiento institucional.`,
    },
  ];
}

