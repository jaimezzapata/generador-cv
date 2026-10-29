import {
  HowItWorksStep,
  ProductBenefitItem,
} from "../types/studioShell.types";

export const PRODUCT_BENEFITS_LIST: ProductBenefitItem[] = [
  {
    id: "drag-and-drop",
    badge: "Drag & Drop",
    title: "Personaliza por Bloques",
    description: "Arrastra y suelta cada sección para armar tu estructura ideal.",
    imageSrc: "/images/features/feature-drag-drop.svg",
  },
  {
    id: "sena-and-formats",
    badge: "Multiformato",
    title: "Norma SENA y ATS",
    description: "Alterna con un clic entre formato oficial SENA, ATS o Ejecutivo.",
    imageSrc: "/images/features/feature-sena-formats.svg",
  },
  {
    id: "ai-and-pdf",
    badge: "IA + PDF",
    title: "Redacción IA y Exportación",
    description: "Mejora tus textos con IA y descarga tu PDF listo para postular.",
    imageSrc: "/images/features/feature-ai-pdf.svg",
  },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    stepNumber: "1",
    title: "Elige tu plantilla",
    description: "SENA, ATS o Ejecutivo.",
  },
  {
    stepNumber: "2",
    title: "Ordena bloques con IA",
    description: "Arrastra y redacta en segundos.",
  },
  {
    stepNumber: "3",
    title: "Descarga tu PDF",
    description: "Listo para enviar o imprimir.",
  },
];
