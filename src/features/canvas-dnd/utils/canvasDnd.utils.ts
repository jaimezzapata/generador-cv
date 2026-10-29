import {
  Award,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Languages,
  PlusCircle,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import {
  BlockColSpan,
  BlockVisualVariant,
  CvBlockType,
} from "@/features/cv-document/types/cvDocument.types";
import { PaletteBlockMeta } from "../types/canvasDnd.types";

export const NEXT_COL_SPAN: Record<BlockColSpan, BlockColSpan> = {
  full: "half",
  half: "third",
  third: "two_thirds",
  two_thirds: "full",
};

export function getColSpanClass(colSpan?: BlockColSpan): string {
  switch (colSpan) {
    case "half":
      return "col-span-12 md:col-span-6";
    case "third":
      return "col-span-12 md:col-span-4";
    case "two_thirds":
      return "col-span-12 md:col-span-8";
    case "full":
    default:
      return "col-span-12";
  }
}

export function getColSpanLabel(colSpan?: BlockColSpan): string {
  switch (colSpan) {
    case "half":
      return "1/2 (50%)";
    case "third":
      return "1/3 (33%)";
    case "two_thirds":
      return "2/3 (66%)";
    case "full":
    default:
      return "1/1 (100%)";
  }
}

export function getVariantClass(variant?: BlockVisualVariant): string {
  switch (variant) {
    case "card":
      return "bg-slate-50/75 p-3 rounded-lg border border-slate-200/80 shadow-xs";
    case "bordered":
      return "border-2 border-slate-200 p-3 rounded-md";
    case "default":
    default:
      return "";
  }
}

export const CANVAS_PALETTE_BLOCKS: PaletteBlockMeta[] = [
  {
    type: "profile",
    title: "Perfil Profesional",
    description: "Resumen ejecutivo y objetivos laborales",
    icon: Target,
    defaultZone: "main",
  },
  {
    type: "experience",
    title: "Experiencia Laboral",
    description: "Trayectoria, cargos, funciones y logros",
    icon: Briefcase,
    defaultZone: "main",
  },
  {
    type: "education",
    title: "Formación Académica",
    description: "SENA, títulos universitarios y técnicos",
    icon: GraduationCap,
    defaultZone: "main",
  },
  {
    type: "projects",
    title: "Proyectos Destacados",
    description: "Casos de éxito, stack técnico y repositorios",
    icon: FolderGit2,
    defaultZone: "main",
  },
  {
    type: "skills",
    title: "Competencias y Herramientas",
    description: "Habilidades técnicas, de software y blandas",
    icon: Wrench,
    defaultZone: "sidebar",
  },
  {
    type: "languages",
    title: "Idiomas",
    description: "Nivel MCER (A1-C2) y certificaciones",
    icon: Languages,
    defaultZone: "sidebar",
  },
  {
    type: "certifications",
    title: "Certificaciones y Cursos",
    description: "Diplomados, horas y credenciales",
    icon: Award,
    defaultZone: "sidebar",
  },
  {
    type: "references",
    title: "Referencias",
    description: "Contactos laborales y personales verificables",
    icon: Users,
    defaultZone: "main",
  },
  {
    type: "custom",
    title: "Secciones Adicionales",
    description: "Voluntariado, semilleros SENNOVA y premios",
    icon: PlusCircle,
    defaultZone: "main",
  },
];

export function getPaletteMeta(type: CvBlockType): PaletteBlockMeta {
  return (
    CANVAS_PALETTE_BLOCKS.find((b) => b.type === type) ??
    CANVAS_PALETTE_BLOCKS[0]
  );
}

