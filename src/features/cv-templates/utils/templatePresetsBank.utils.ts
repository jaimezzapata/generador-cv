import { createDefaultCvDocument } from "@/features/cv-document/utils/cvDefaults.utils";
import { CvTemplateId } from "@/features/cv-document/types/cvDocument.types";
import { PredefinedTemplatePreset } from "../types/cvTemplates.types";

export const PREDEFINED_TEMPLATES_BANK: PredefinedTemplatePreset[] = [
  {
    id: "sena",
    name: "Norma SENA / Empleo Público",
    badgeText: "Oficial Colombia",
    category: "normativo",
    idealFor: "Convocatorias SENA, Agencia Pública de Empleo y sector público",
    sampleRoleLabel: "Tecnóloga ADSO SENA (Lista para editar)",
    imageSrc: "/images/templates/template-sena.svg",
    accentHex: "#15803d",
    buildPresetDocument: () => createDefaultCvDocument("sena"),
  },
  {
    id: "ats",
    name: "Estándar ATS Empresarial",
    badgeText: "99% Filtros IA",
    category: "corporativo",
    idealFor: "LinkedIn, Magneto, Computrabajo y multinacionales",
    sampleRoleLabel: "Analista de Datos & BI (Lista para editar)",
    imageSrc: "/images/templates/template-ats.svg",
    accentHex: "#1d4ed8",
    buildPresetDocument: () => {
      const base = createDefaultCvDocument("ats");
      return {
        ...base,
        templateId: "ats",
        personalInfo: {
          ...base.personalInfo,
          photoDataUrl: "/images/avatars/avatar-ejecutivo.svg",
          fullName: "Mateo Cárdenas Gómez",
          professionalTitle: "Analista de Datos & Business Intelligence Senior",
          city: "Bogotá D.C.",
          department: "Cundinamarca",
          email: "mateo.cardenas@correo.com",
          professionalCard: "COPNIA 25202-419820",
          workModality: "remoto",
        },
        yearsOfExperience: "4 años",
        profileSummary:
          "Ingeniero de Sistemas y Analista BI con +4 años transformando grandes volúmenes de información en tableros estratégicos con SQL, Python y Power BI. Experiencia liderando automatización ETL con impacto directo en rentabilidad comercial.",
        experiences: [
          {
            ...base.experiences[0],
            id: "exp_ats_1",
            company: "Grupo Financiero Horizonte",
            role: "Analista BI Senior",
            contractType: "indefinido",
            workModality: "hibrido",
            city: "Bogotá D.C.",
            startDate: "2024-03",
            isCurrent: true,
            immediateBoss: "Dra. Natalia Pardo",
            verificationPhone: "601 742 8800",
            description:
              "Diseño y automatización de pipelines ETL en SQL y Python para 12 áreas comerciales y financieras.",
            achievements:
              "Reducción del 40% en tiempos de cierre mensual • Incremento del 28% en precisión de pronósticos.",
          },
        ],
        educations: [
          {
            ...base.educations[0],
            id: "edu_ats_1",
            institution: "Universidad Nacional de Colombia",
            degree: "Ingeniería de Sistemas y Computación",
            level: "universitaria",
            city: "Bogotá D.C.",
            startDate: "2019-02",
            endDate: "2024-01",
            hoursIntensity: "",
            honorsOrSummary: "Promedio acumulado 4.3 / 5.0.",
          },
        ],
        skills: [
          { id: "s_ats_1", name: "SQL & PostgreSQL", category: "tecnica", level: "experto" },
          { id: "s_ats_2", name: "Power BI & DAX", category: "herramienta", level: "experto" },
          { id: "s_ats_3", name: "Python (Pandas / Airflow)", category: "tecnica", level: "avanzado" },
          { id: "s_ats_4", name: "Pensamiento Analítico", category: "blanda", level: "experto" },
        ],
      };
    },
  },
  {
    id: "executive",
    name: "Ejecutivo Dos Columnas",
    badgeText: "Alto Impacto",
    category: "corporativo",
    idealFor: "Coordinadores, líderes de área, ingenieros y especialistas",
    sampleRoleLabel: "Coordinadora de Proyectos PMO (Lista para editar)",
    imageSrc: "/images/templates/template-executive.svg",
    accentHex: "#0284c7",
    buildPresetDocument: () => {
      const base = createDefaultCvDocument("executive");
      return {
        ...base,
        templateId: "executive",
        personalInfo: {
          ...base.personalInfo,
          photoDataUrl: "/images/avatars/avatar-ejecutiva.svg",
          fullName: "Laura Marcela Pineda",
          professionalTitle: "Coordinadora de Operaciones y Proyectos PMO",
          city: "Cali",
          department: "Valle del Cauca",
          email: "laura.pineda@correo.com",
          professionalCard: "PMP-893021",
        },
        yearsOfExperience: "6 años",
        profileSummary:
          "Especialista en Gerencia de Proyectos con 6 años liderando equipos multidisciplinarios, control presupuestal CAPEX/OPEX y mejora continua bajo marcos Scrum, Kanban y PMI.",
        experiences: [
          {
            ...base.experiences[0],
            id: "exp_exec_1",
            company: "Logística del Pacífico S.A.",
            role: "Coordinadora de Proyectos Operativos",
            city: "Cali",
            startDate: "2023-06",
            isCurrent: true,
            immediateBoss: "Ing. Jorge Iván Mejía",
            verificationPhone: "602 489 1200",
            description:
              "Dirección integral de portafolio de proyectos de transformación logística y abastecimiento regional.",
            achievements:
              "98% de entregas a tiempo • Ahorro anual del 18% en costos logísticos (COP $420M).",
          },
        ],
        skills: [
          { id: "s_ex_1", name: "Gestión Ágil (Scrum / PMI)", category: "tecnica", level: "experto" },
          { id: "s_ex_2", name: "Jira, MS Project & SAP", category: "herramienta", level: "avanzado" },
          { id: "s_ex_3", name: "Control de Presupuestos", category: "tecnica", level: "avanzado" },
          { id: "s_ex_4", name: "Liderazgo Ejecutivo", category: "blanda", level: "experto" },
        ],
      };
    },
  },
  {
    id: "first_job",
    name: "Primer Empleo / Prácticas",
    badgeText: "Etapa Productiva",
    category: "primer_empleo",
    idealFor: "Aprendices SENA, practicantes universitarios y recién egresados",
    sampleRoleLabel: "Practicante / Recién Egresada (Lista para editar)",
    imageSrc: "/images/templates/template-first-job.svg",
    accentHex: "#059669",
    buildPresetDocument: () => {
      const base = createDefaultCvDocument("first_job");
      return {
        ...base,
        templateId: "first_job",
        personalInfo: {
          ...base.personalInfo,
          photoDataUrl: "/images/avatars/avatar-ejecutiva.svg",
          fullName: "Camila Andrea Torres",
          professionalTitle: "Aprendiz en Etapa Productiva — Gestión Empresarial",
          city: "Bucaramanga",
          department: "Santander",
          email: "camila.torres@correo.com",
          availability: "Inmediata — Contrato de Aprendizaje",
        },
        yearsOfExperience: "Etapa Productiva",
        profileSummary:
          "Aprendiz destacada de último trimestre con sólidas bases en atención corporativa, gestión documental, Excel intermedio-avanzado y alta proactividad para aportar en procesos administrativos y comerciales.",
        blocks: base.blocks.map((b) =>
          b.type === "custom"
            ? { ...b, visible: true }
            : b.type === "experience"
            ? { ...b, visible: false }
            : b
        ),
        experiences: [],
        customBlocks: [
          {
            id: "cst_fj_1",
            sectionTitle: "Semilleros y Reconocimientos Académicos",
            subtitle: "Semillero de Innovación Empresarial SENNOVA",
            locationOrEntity: "Centro de Servicios Empresariales SENA",
            period: "2025 - 2026",
            content:
              "Ponente destacada por el diseño de una guía práctica de digitalización administrativa para microempresas comerciales.",
          },
        ],
      };
    },
  },
  {
    id: "creative",
    name: "Modular Tech & Portafolio",
    badgeText: "Proyectos + Stack",
    category: "creativo",
    idealFor: "Desarrolladores, diseñadores UX/UI, marketing y freelancers",
    sampleRoleLabel: "Full Stack & UI Designer (Lista para editar)",
    imageSrc: "/images/templates/template-creative.svg",
    accentHex: "#7c3aed",
    buildPresetDocument: () => {
      const base = createDefaultCvDocument("creative");
      return {
        ...base,
        templateId: "creative",
        personalInfo: {
          ...base.personalInfo,
          photoDataUrl: "/images/avatars/avatar-tech.svg",
          fullName: "Santiago Morales Vega",
          professionalTitle: "Full Stack Developer & Product UI Designer",
          city: "Medellín",
          department: "Antioquia",
          portfolioUrl: "santiagomorales.dev",
          githubUrl: "github.com/smorales-dev",
          workModality: "remoto",
        },
        yearsOfExperience: "3 años",
        blocks: base.blocks.map((b) =>
          b.type === "custom" ? { ...b, visible: true } : b
        ),
        customBlocks: [
          {
            id: "cst_cr_1",
            sectionTitle: "Comunidad Tech & Open Source",
            subtitle: "Speaker en MedellínJS & Contribuidor UI",
            locationOrEntity: "Medellín, Colombia",
            period: "2025 - Actualidad",
            content:
              "Autor de librerías accesibles de componentes React con +900 estrellas en GitHub.",
          },
        ],
      };
    },
  },
  {
    id: "administrative",
    name: "Clásico Institucional",
    badgeText: "Formal y Sobrio",
    category: "normativo",
    idealFor: "Administración, contabilidad, derecho, salud y docencia",
    sampleRoleLabel: "Profesional Administrativo (Lista para editar)",
    imageSrc: "/images/templates/template-admin.svg",
    accentHex: "#1e3a8a",
    buildPresetDocument: () => {
      const base = createDefaultCvDocument("administrative");
      return {
        ...base,
        templateId: "administrative",
        personalInfo: {
          ...base.personalInfo,
          photoDataUrl: "/images/avatars/avatar-ejecutivo.svg",
          fullName: "Julián Esteban Vargas",
          professionalTitle: "Administrador de Empresas — Especialista en SST",
          city: "Barranquilla",
          department: "Atlántico",
          email: "julian.vargas@correo.com",
          professionalCard: "CPAE 094812-T",
        },
        yearsOfExperience: "5 años",
        profileSummary:
          "Administrador de Empresas con licencia vigente en Seguridad y Salud en el Trabajo (SST), experiencia comprobada en nómina, contratación, bienestar organizacional y auditoría normativa.",
      };
    },
  },
];

export function getPresetById(id: CvTemplateId): PredefinedTemplatePreset {
  return (
    PREDEFINED_TEMPLATES_BANK.find((item) => item.id === id) ??
    PREDEFINED_TEMPLATES_BANK[0]
  );
}
