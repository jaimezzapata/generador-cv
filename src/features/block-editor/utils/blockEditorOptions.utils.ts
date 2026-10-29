import {
  Award,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Languages,
  Palette,
  PlusCircle,
  Target,
  User,
  Users,
  Wrench,
} from "lucide-react";
import { SelectOption } from "@/shared/components/ui/Select";
import { EditorNavItem } from "../types/blockEditor.types";

export const EDITOR_NAV_ITEMS: EditorNavItem[] = [
  {
    id: "design",
    icon: Palette,
    label: "Diseño, Foto y Colores",
    shortHint: "Estilo visual, columnas y orden",
  },
  {
    id: "personal",
    icon: User,
    label: "Datos Personales",
    shortHint: "Foto, identificación y redes",
  },
  {
    id: "profile",
    icon: Target,
    label: "Perfil y Objetivo",
    shortHint: "Resumen, años exp. y meta",
    blockType: "profile",
  },
  {
    id: "experience",
    icon: Briefcase,
    label: "Experiencia Laboral",
    shortHint: "Cargos, logros y soportes",
    blockType: "experience",
  },
  {
    id: "education",
    icon: GraduationCap,
    label: "Formación Académica",
    shortHint: "SENA, pregrado y posgrado",
    blockType: "education",
  },
  {
    id: "projects",
    icon: FolderGit2,
    label: "Proyectos y Portafolio",
    shortHint: "Casos de éxito y tecnologías",
    blockType: "projects",
  },
  {
    id: "skills",
    icon: Wrench,
    label: "Competencias",
    shortHint: "Técnicas, herramientas y blandas",
    blockType: "skills",
  },
  {
    id: "languages",
    icon: Languages,
    label: "Idiomas",
    shortHint: "Nivel MCER y exámenes",
    blockType: "languages",
  },
  {
    id: "certifications",
    icon: Award,
    label: "Certificaciones",
    shortHint: "Cursos, horas y credenciales",
    blockType: "certifications",
  },
  {
    id: "references",
    icon: Users,
    label: "Referencias",
    shortHint: "Laborales, académicas y pers.",
    blockType: "references",
  },
  {
    id: "custom",
    icon: PlusCircle,
    label: "Secciones Extra",
    shortHint: "Premios, voluntariado, otros",
    blockType: "custom",
  },
];

export const TEMPLATE_SELECT_OPTIONS: SelectOption[] = [
  { value: "sena", label: "Formato Normativo SENA" },
  { value: "minerva", label: "Minerva Gris y Azul (1003)" },
  { value: "ats", label: "Estándar ATS Empresas" },
  { value: "executive", label: "Ejecutivo 2 Columnas" },
  { value: "first_job", label: "Primer Empleo / Prácticas" },
  { value: "creative", label: "Modular Tech & Portafolio" },
  { value: "administrative", label: "Clásico Institucional" },
];

export const DOCUMENT_TYPE_OPTIONS: SelectOption[] = [
  { value: "CC", label: "Cédula de Ciudadanía (CC)" },
  { value: "TI", label: "Tarjeta de Identidad (TI)" },
  { value: "CE", label: "Cédula de Extranjería (CE)" },
  { value: "PPT", label: "Permiso Protección Temporal (PPT)" },
  { value: "PEP", label: "Permiso Especial (PEP)" },
  { value: "PAS", label: "Pasaporte (PAS)" },
];

export const WORK_MODALITY_OPTIONS: SelectOption[] = [
  { value: "presencial", label: "Presencial" },
  { value: "hibrido", label: "Híbrido" },
  { value: "remoto", label: "100% Remoto" },
  { value: "cualquiera", label: "Abierto a cualquier modalidad" },
];

export const CONTRACT_TYPE_OPTIONS: SelectOption[] = [
  { value: "indefinido", label: "Término Indefinido" },
  { value: "fijo", label: "Término Fijo" },
  { value: "obra_labor", label: "Obra o Labor" },
  { value: "prestacion_servicios", label: "Prestación de Servicios" },
  { value: "practica_aprendizaje", label: "Contrato de Aprendizaje / Práctica" },
  { value: "freelance", label: "Independiente / Freelance" },
];

export const EDUCATION_LEVEL_OPTIONS: SelectOption[] = [
  { value: "titulada_sena", label: "Titulada SENA (Técnico / Tecnólogo)" },
  { value: "complementaria_sena", label: "Complementaria SENA (Curso)" },
  { value: "bachiller", label: "Bachillerato Académico / Técnico" },
  { value: "tecnica_tecnologica", label: "Técnica / Tecnológica (IES)" },
  { value: "universitaria", label: "Pregrado / Profesional Universitario" },
  { value: "especializacion", label: "Especialización" },
  { value: "maestria_doctorado", label: "Maestría / Doctorado" },
];

export const SKILL_CATEGORY_OPTIONS: SelectOption[] = [
  { value: "tecnica", label: "Competencia Técnica / Dominio" },
  { value: "herramienta", label: "Software / Herramienta" },
  { value: "blanda", label: "Habilidad Blanda / Liderazgo" },
];

export const SKILL_LEVEL_OPTIONS: SelectOption[] = [
  { value: "basico", label: "Básico (45%)" },
  { value: "intermedio", label: "Intermedio (70%)" },
  { value: "avanzado", label: "Avanzado (88%)" },
  { value: "experto", label: "Experto (100%)" },
];

export const LANGUAGE_CEFR_OPTIONS: SelectOption[] = [
  { value: "Nativo", label: "Nativo / Lengua Materna" },
  { value: "C2", label: "C2 — Maestría / Bilingüe" },
  { value: "C1", label: "C1 — Avanzado Superior" },
  { value: "B2", label: "B2 — Intermedio Alto" },
  { value: "B1", label: "B1 — Intermedio" },
  { value: "A2", label: "A2 — Básico Pre-Intermedio" },
  { value: "A1", label: "A1 — Principiante" },
];

export const REFERENCE_TYPE_OPTIONS: SelectOption[] = [
  { value: "laboral", label: "Referencia Laboral" },
  { value: "academica", label: "Referencia Académica / Instructor" },
  { value: "personal", label: "Referencia Personal" },
];
