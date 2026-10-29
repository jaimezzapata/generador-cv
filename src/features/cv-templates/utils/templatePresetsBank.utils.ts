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
  {
    id: "minerva",
    name: "Minerva Tradicional Gris y Azul (Formato 1003)",
    badgeText: "Clásico Colombia 1003",
    category: "normativo",
    idealFor: "Empresas comerciales, pymes, convocatorias tradicionales y radicación física",
    sampleRoleLabel: "Asistente Administrativo & Comercial (Lista para editar)",
    imageSrc: "/images/templates/template-minerva.svg",
    accentHex: "#1e3a8a",
    buildPresetDocument: () => {
      const base = createDefaultCvDocument("minerva");
      return {
        ...base,
        templateId: "minerva",
        personalInfo: {
          ...base.personalInfo,
          photoDataUrl: "/images/avatars/avatar-ejecutivo.svg",
          fullName: "Carlos Andrés Rodríguez Peña",
          documentType: "CC",
          documentNumber: "1.024.582.910",
          documentExpeditionPlace: "Bogotá D.C.",
          professionalTitle: "Asistente Administrativo y Comercial",
          email: "carlos.rodriguez.admin@correo.com",
          phone: "312 458 9012",
          altPhone: "601 789 2345",
          address: "Carrera 45 # 128 - 30, Prado Veraniego",
          city: "Bogotá D.C.",
          department: "Cundinamarca",
          drivingLicense: "Libreta Militar No. 1024582910 D-15",
          workModality: "presencial",
        },
        yearsOfExperience: "3 años",
        profileSummary:
          "Técnico en Asistencia Administrativa y Contable con más de 3 años de experiencia en gestión documental, facturación electrónica DIAN, conciliaciones bancarias y servicio al cliente. Alta capacidad organizativa y manejo integral de software Siigo y paquete Office.",
        careerObjective:
          "Consolidarme en el área de operaciones administrativas aportando rigor en el control de archivos, optimización de cobros y atención oportuna a clientes y proveedores.",
        experiences: [
          {
            id: "exp_minerva_1",
            company: "Distribuidora & Logística Andina S.A.S.",
            role: "Asistente Administrativo y de Facturación",
            contractType: "indefinido",
            workModality: "presencial",
            city: "Bogotá D.C.",
            startDate: "2023-01",
            endDate: "",
            isCurrent: true,
            immediateBoss: "Dra. Marcela Forero (Gerente de Operaciones)",
            verificationPhone: "601 540 2200 ext. 104",
            verificationEmail: "m.forero@andina.com",
            description:
              "Emisión y radicación de facturación electrónica DIAN, conciliación de cartera y archivo digital de expedientes comerciales y contractuales.",
            achievements:
              "Reducción del tiempo de respuesta en solicitudes de clientes de 48h a 12h y depuración del 100% del archivo físico.",
          },
          {
            id: "exp_minerva_2",
            company: "Inversiones y Suministros del Valle S.A.",
            role: "Auxiliar de Oficina y Atención al Cliente",
            contractType: "fijo",
            workModality: "presencial",
            city: "Bogotá D.C.",
            startDate: "2021-06",
            endDate: "2022-12",
            isCurrent: false,
            immediateBoss: "Dr. Jorge Eliécer Ramos",
            verificationPhone: "601 289 4430",
            verificationEmail: "jramos@suministrosvalle.com",
            description:
              "Recepción y radicación de correspondencia, inventario de suministros y apoyo a liquidación de compras menores.",
            achievements:
              "Cero discrepancias en auditorías de caja menor durante 18 meses consecutivos.",
          },
        ],
        educations: [
          {
            id: "edu_minerva_1",
            institution: "Centro de Gestión Administrativa — SENA",
            degree: "Tecnólogo en Gestión Administrativa",
            level: "tecnica_tecnologica",
            city: "Bogotá D.C.",
            startDate: "2019-02",
            endDate: "2021-04",
            inProgress: false,
            hoursIntensity: "3520",
            honorsOrSummary: "Graduado con mención por proyecto de digitalización.",
          },
          {
            id: "edu_minerva_2",
            institution: "Colegio Mayor de San Bartolomé",
            degree: "Bachiller Académico con Énfasis Comercial",
            level: "bachiller",
            city: "Bogotá D.C.",
            startDate: "2013-02",
            endDate: "2018-11",
            inProgress: false,
            hoursIntensity: "",
            honorsOrSummary: "",
          },
        ],
        skills: [
          { id: "sk_m1", name: "Facturación Electrónica DIAN", category: "tecnica", level: "avanzado" },
          { id: "sk_m2", name: "Software Contable Siigo & ERP", category: "tecnica", level: "intermedio" },
          { id: "sk_m3", name: "Excel Avanzado y Tablas Dinámicas", category: "tecnica", level: "avanzado" },
          { id: "sk_m4", name: "Gestión Documental y Archivo", category: "tecnica", level: "avanzado" },
          { id: "sk_m5", name: "Atención y Servicio al Cliente", category: "blanda", level: "avanzado" },
          { id: "sk_m6", name: "Puntualidad y Organización", category: "blanda", level: "avanzado" },
        ],
        references: [
          {
            id: "ref_m1",
            fullName: "Ing. Fernando Rodríguez Peña",
            roleOrRelationship: "Hermano / Ingeniero Civil",
            company: "Constructora Bolívar",
            phone: "310 889 1234",
            email: "fernando.rodriguez@correo.com",
            city: "Bogotá D.C.",
            referenceType: "personal",
          },
          {
            id: "ref_m2",
            fullName: "Dra. Claudia Patricia Morales",
            roleOrRelationship: "Exjefa / Directora Financiera",
            company: "Distribuidora & Logística Andina",
            phone: "315 776 5432",
            email: "claudia.morales@andina.com",
            city: "Bogotá D.C.",
            referenceType: "laboral",
          },
          {
            id: "ref_m3",
            fullName: "Lic. Andrés Felipe Castro",
            roleOrRelationship: "Referencia Personal / Docente",
            company: "Universidad Central",
            phone: "300 445 9811",
            email: "andres.castro@correo.com",
            city: "Bogotá D.C.",
            referenceType: "personal",
          },
        ],
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
