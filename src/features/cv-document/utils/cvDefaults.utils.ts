import { createUniqueId } from "@/shared/utils/id.utils";
import {
  CertificationItem,
  CustomSectionBlock,
  CvBlockConfig,
  CvDesignSettings,
  CvDocument,
  CvTemplateId,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  ProjectItem,
  ReferenceItem,
  SkillItem,
} from "../types/cvDocument.types";

export function getDefaultDesignForTemplate(
  templateId: CvTemplateId
): CvDesignSettings {
  switch (templateId) {
    case "sena":
      return {
        accentColor: "#15803d",
        sidebarBgColor: "#f8fafc",
        fontFamily: "sans",
        headerStyle: "boxed_sena",
        sectionTitleStyle: "filled_box",
        density: "standard",
        twoColumnLayout: false,
        showPhoto: true,
        photoShape: "square",
        showSkillBars: false,
        referencesOnRequest: false,
      };
    case "ats":
      return {
        accentColor: "#1d4ed8",
        sidebarBgColor: "#f8fafc",
        fontFamily: "sans",
        headerStyle: "centered",
        sectionTitleStyle: "underline",
        density: "standard",
        twoColumnLayout: false,
        showPhoto: false,
        photoShape: "rounded",
        showSkillBars: false,
        referencesOnRequest: true,
      };
    case "executive":
      return {
        accentColor: "#0284c7",
        sidebarBgColor: "#0f172a",
        fontFamily: "sans",
        headerStyle: "split",
        sectionTitleStyle: "left_bar",
        density: "standard",
        twoColumnLayout: true,
        showPhoto: true,
        photoShape: "circle",
        showSkillBars: true,
        referencesOnRequest: false,
      };
    case "first_job":
      return {
        accentColor: "#059669",
        sidebarBgColor: "#ecfdf5",
        fontFamily: "sans",
        headerStyle: "banner",
        sectionTitleStyle: "pill",
        density: "spacious",
        twoColumnLayout: true,
        showPhoto: true,
        photoShape: "circle",
        showSkillBars: true,
        referencesOnRequest: false,
      };
    case "creative":
      return {
        accentColor: "#7c3aed",
        sidebarBgColor: "#1e1b4b",
        fontFamily: "sans",
        headerStyle: "banner",
        sectionTitleStyle: "pill",
        density: "standard",
        twoColumnLayout: true,
        showPhoto: true,
        photoShape: "rounded",
        showSkillBars: true,
        referencesOnRequest: false,
      };
    case "administrative":
      return {
        accentColor: "#1e3a8a",
        sidebarBgColor: "#f1f5f9",
        fontFamily: "serif",
        headerStyle: "split",
        sectionTitleStyle: "underline",
        density: "standard",
        twoColumnLayout: false,
        showPhoto: true,
        photoShape: "square",
        showSkillBars: false,
        referencesOnRequest: false,
      };
  }
}

export function createEmptyExperienceItem(): ExperienceItem {
  return {
    id: createUniqueId("exp"),
    company: "",
    role: "",
    contractType: "indefinido",
    workModality: "presencial",
    city: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    immediateBoss: "",
    verificationPhone: "",
    verificationEmail: "",
    description: "",
    achievements: "",
  };
}

export function createEmptyEducationItem(): EducationItem {
  return {
    id: createUniqueId("edu"),
    institution: "",
    degree: "",
    level: "titulada_sena",
    city: "",
    startDate: "",
    endDate: "",
    inProgress: false,
    hoursIntensity: "",
    honorsOrSummary: "",
  };
}

export function createEmptyProjectItem(): ProjectItem {
  return {
    id: createUniqueId("prj"),
    name: "",
    role: "",
    period: "",
    techStack: "",
    projectUrl: "",
    description: "",
  };
}

export function createEmptyLanguageItem(
  name = "",
  level: LanguageItem["level"] = "B1",
  certification = ""
): LanguageItem {
  return {
    id: createUniqueId("lng"),
    name,
    level,
    certification,
  };
}

export function createEmptySkillItem(
  name = "",
  category: SkillItem["category"] = "tecnica",
  level: SkillItem["level"] = "avanzado"
): SkillItem {
  return {
    id: createUniqueId("skl"),
    name,
    category,
    level,
  };
}

export function createEmptyCertificationItem(): CertificationItem {
  return {
    id: createUniqueId("crt"),
    name: "",
    issuer: "",
    issueDate: "",
    hoursIntensity: "",
    credentialCode: "",
    credentialUrl: "",
  };
}

export function createEmptyReferenceItem(): ReferenceItem {
  return {
    id: createUniqueId("ref"),
    fullName: "",
    roleOrRelationship: "",
    company: "",
    phone: "",
    email: "",
    city: "",
    referenceType: "laboral",
  };
}

export function createEmptyCustomSection(): CustomSectionBlock {
  return {
    id: createUniqueId("cst"),
    sectionTitle: "Voluntariado / Reconocimientos",
    subtitle: "",
    locationOrEntity: "",
    period: "",
    content: "",
  };
}

export function createDefaultBlocks(): CvBlockConfig[] {
  return [
    { id: "blk_profile", type: "profile", title: "Perfil Profesional", visible: true, zone: "main" },
    { id: "blk_experience", type: "experience", title: "Experiencia Laboral", visible: true, zone: "main" },
    { id: "blk_education", type: "education", title: "Formación Académica", visible: true, zone: "main" },
    { id: "blk_projects", type: "projects", title: "Proyectos Destacados", visible: true, zone: "main" },
    { id: "blk_skills", type: "skills", title: "Competencias y Herramientas", visible: true, zone: "sidebar" },
    { id: "blk_languages", type: "languages", title: "Idiomas", visible: true, zone: "sidebar" },
    { id: "blk_certifications", type: "certifications", title: "Certificaciones y Cursos", visible: true, zone: "sidebar" },
    { id: "blk_references", type: "references", title: "Referencias", visible: true, zone: "main" },
    { id: "blk_custom", type: "custom", title: "Secciones Adicionales", visible: false, zone: "main" },
  ];
}

export function createDefaultCvDocument(
  initialTemplate: CvTemplateId = "sena"
): CvDocument {
  return {
    id: "cv_default_workspace",
    updatedAt: "2026-10-29T00:00:00.000Z",
    templateId: initialTemplate,
    design: getDefaultDesignForTemplate(initialTemplate),
    personalInfo: {
      photoDataUrl: "/images/avatars/avatar-ejecutiva.svg",
      fullName: "Valentina Ríos Salazar",
      professionalTitle: "Tecnóloga en Análisis y Desarrollo de Software",
      documentType: "CC",
      documentNumber: "1020458912",
      documentExpeditionPlace: "Medellín, Antioquia",
      birthDate: "2001-05-14",
      nationality: "Colombiana",
      maritalStatus: "Soltera",
      militaryCard: "No aplica",
      drivingLicense: "B1 Vigente",
      professionalCard: "",
      email: "valentina.rios@correo.com",
      phone: "+57 315 482 9104",
      altPhone: "",
      country: "Colombia",
      department: "Antioquia",
      city: "Medellín",
      address: "Carrera 43A # 14-50, El Poblado",
      linkedIn: "linkedin.com/in/valentinarios",
      githubUrl: "github.com/valentinarios",
      portfolioUrl: "valentinarios.dev",
      availability: "Disponibilidad inmediata",
      workModality: "hibrido",
    },
    profileSummary:
      "Desarrolladora de software con formación tecnológica certificada por el SENA y experiencia práctica construyendo aplicaciones web modulares en TypeScript, React y Node.js. Orientada a la calidad del código, automatización de procesos y trabajo colaborativo bajo metodologías ágiles Scrum.",
    careerObjective:
      "Integrarme a un equipo de ingeniería de producto donde pueda aportar soluciones frontend/fullstack escalables y optimizar la experiencia de usuario.",
    yearsOfExperience: "2 años",
    salaryExpectation: "A convenir",
    blocks: createDefaultBlocks(),
    experiences: [
      {
        id: "exp_demo_1",
        company: "Soluciones Digitales Andinas S.A.S.",
        role: "Desarrolladora Frontend Junior",
        contractType: "indefinido",
        workModality: "hibrido",
        city: "Medellín",
        startDate: "2025-02",
        endDate: "",
        isCurrent: true,
        immediateBoss: "Ing. Camilo Restrepo",
        verificationPhone: "604 320 4410",
        verificationEmail: "talento@solucionesandinas.co",
        description:
          "Desarrollo de interfaces accesibles en React 19 y TypeScript, consumo de APIs RESTful y mantenimiento del sistema de diseño corporativo.",
        achievements:
          "Reducción del tiempo de carga inicial en un 32% • Estandarización de 24 componentes reutilizables documentados.",
      },
    ],
    educations: [
      {
        id: "edu_demo_1",
        institution: "Servicio Nacional de Aprendizaje (SENA)",
        degree: "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
        level: "titulada_sena",
        city: "Medellín",
        startDate: "2023-01",
        endDate: "2025-01",
        inProgress: false,
        hoursIntensity: "3984",
        honorsOrSummary: "Proyecto productivo calificado como Meritorio.",
      },
    ],
    projects: [
      {
        id: "prj_demo_1",
        name: "Sistema de Inventario Inteligente PyME",
        role: "Desarrolladora Fullstack",
        period: "2024 - 2025",
        techStack: "Next.js, PostgreSQL, Prisma, Tailwind CSS",
        projectUrl: "github.com/valentinarios/inventario-pyme",
        description:
          "Plataforma web con alertas automáticas de stock, reportes en PDF y control de roles multi-bodega.",
      },
    ],
    skills: [
      { id: "skl_1", name: "TypeScript & React", category: "tecnica", level: "avanzado" },
      { id: "skl_2", name: "Node.js & SQL", category: "tecnica", level: "intermedio" },
      { id: "skl_3", name: "Git, Docker & Figma", category: "herramienta", level: "avanzado" },
      { id: "skl_4", name: "Trabajo Colaborativo Scrum", category: "blanda", level: "experto" },
    ],
    languages: [
      { id: "lng_1", name: "Español", level: "Nativo", certification: "Lengua materna" },
      { id: "lng_2", name: "Inglés", level: "B2", certification: "SENA / EF SET B2 Upper Intermediate" },
    ],
    certifications: [
      {
        id: "crt_demo_1",
        name: "Arquitectura de Aplicaciones Web Modernas",
        issuer: "SENA Complementaria Virtual",
        issueDate: "2025-07",
        hoursIntensity: "48",
        credentialCode: "SENA-948201",
        credentialUrl: "",
      },
    ],
    references: [
      {
        id: "ref_demo_1",
        fullName: "Camilo Restrepo Ochoa",
        roleOrRelationship: "Líder Técnico de Ingeniería",
        company: "Soluciones Digitales Andinas S.A.S.",
        phone: "+57 310 555 8291",
        email: "c.restrepo@solucionesandinas.co",
        city: "Medellín",
        referenceType: "laboral",
      },
    ],
    customBlocks: [],
  };
}
