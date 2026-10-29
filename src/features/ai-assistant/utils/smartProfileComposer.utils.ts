import {
  AiDraftRequestPayload,
  AiProposalItem,
} from "../types/aiAssistant.types";
import { parseKeywordsList } from "./aiToneOptions.utils";

export function composeProfileAndObjectiveDrafts(
  req: AiDraftRequestPayload
): AiProposalItem[] {
  const role = req.roleTitle?.trim() || "Profesional calificado";
  const expText = req.yearsOfExperience?.trim()
    ? `con ${req.yearsOfExperience.trim()} de trayectoria`
    : "con sólida preparación práctica y metodológica";

  const kw = parseKeywordsList(req.keywords);
  const kwPhrase =
    kw.length > 0
      ? kw.slice(0, 6).join(", ")
      : "gestión de procesos, resolución de problemas y mejora continua";

  if (req.fieldType === "career_objective") {
    return [
      {
        id: "obj_1",
        label: "Enfoque de Valor y Resultados",
        text: `Integrarme como ${role} aportando dominio práctico en ${kwPhrase}, con el propósito de optimizar indicadores operativos, fortalecer la calidad del servicio y generar resultados medibles desde el primer mes.`,
      },
      {
        id: "obj_2",
        label: "Enfoque Institucional / SENA",
        text: `Desempeñar funciones como ${role} aplicando competencias certificadas en ${kwPhrase}, bajo estándares de calidad, ética profesional, cumplimiento normativo y trabajo colaborativo interdisciplinario.`,
      },
      {
        id: "obj_3",
        label: "Enfoque Crecimiento e Innovación",
        text: `Contribuir al crecimiento estratégico de la organización desde el rol de ${role}, impulsando iniciativas de innovación apoyadas en ${kwPhrase} y mejora continua de los flujos de trabajo.`,
      },
    ];
  }

  if (req.tone === "norma_sena") {
    return [
      {
        id: "prf_sena_1",
        label: "Perfil Ocupacional SENA Completo",
        text: `${role} ${expText}, con competencias técnicas demostrables en ${kwPhrase}. Capacidad comprobada para ejecutar procesos operativos y analíticos cumpliendo criterios técnicos de calidad, seguridad y trabajo articulado en equipo.`,
      },
      {
        id: "prf_sena_2",
        label: "Enfoque Técnico y Normativo",
        text: `Perfil orientado al desempeño eficiente como ${role}, integrando conocimientos aplicados en ${kwPhrase}. Destaco por la organización metódica, adaptabilidad tecnológica, comunicación asertiva y orientación al cumplimiento de metas institucionales.`,
      },
      {
        id: "prf_sena_3",
        label: "Enfoque Productivo y Resolutivo",
        text: `${role} con fundamentación integral en ${kwPhrase} y enfoque en la solución ágil de requerimientos del entorno productivo, garantizando trazabilidad documental, atención oportuna y excelencia en cada entregable.`,
      },
    ];
  }

  if (req.tone === "primer_empleo") {
    return [
      {
        id: "prf_jr_1",
        label: "Etapa Productiva / Recién Egresado",
        text: `${role} en inicio de trayectoria profesional con sólidas bases prácticas en ${kwPhrase}. Destaco por mi rápida curva de aprendizaje, disciplina en la ejecución de proyectos académicos aplicados y alta proactividad para aportar valor inmediato al equipo.`,
      },
      {
        id: "prf_jr_2",
        label: "Enfoque Proyectos y Potencial",
        text: `Talento emergente formado como ${role}, con manejo aplicado de ${kwPhrase}. Cuento con mentalidad analítica, comunicación efectiva y compromiso total con la calidad y el aprendizaje continuo en entornos dinámicos.`,
      },
      {
        id: "prf_jr_3",
        label: "Enfoque Práctico Orientado a Logros",
        text: `${role} con preparación actualizada en ${kwPhrase}, capaz de apoyar la operación diaria, automatizar tareas clave y colaborar activamente en el cumplimiento de objetivos del área.`,
      },
    ];
  }

  return [
    {
      id: "prf_ats_1",
      label: "Alto Impacto ATS (Recomendado)",
      text: `${role} ${expText} especializándose en ${kwPhrase}. Historial consistente optimizando procesos clave, elevando la eficiencia operativa y entregando soluciones escalables alineadas con los objetivos estratégicos del negocio.`,
    },
    {
      id: "prf_ats_2",
      label: "Ejecutivo y Estratégico",
      text: `Especialista en el rol de ${role} ${expText}. Combino visión analítica y ejecución rigurosa en ${kwPhrase} para liderar iniciativas de alto impacto, reducir tiempos de respuesta y potenciar la calidad de los entregables.`,
    },
    {
      id: "prf_ats_3",
      label: "Directo y Orientado a Métricas",
      text: `${role} con dominio integral de ${kwPhrase}. Enfocado en la excelencia técnica, toma de decisiones basada en datos y colaboración transversal para superar indicadores clave de desempeño (KPIs).`,
    },
  ];
}

