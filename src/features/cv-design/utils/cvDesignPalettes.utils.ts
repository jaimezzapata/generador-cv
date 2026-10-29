import {
  CvDensity,
  CvFontFamily,
  CvHeaderStyle,
  CvPhotoShape,
  CvSectionTitleStyle,
} from "@/features/cv-document/types/cvDocument.types";

export interface ColorSwatchOption {
  id: string;
  label: string;
  hex: string;
}

export const CV_ACCENT_SWATCHES: ColorSwatchOption[] = [
  { id: "emerald_sena", label: "Verde SENA", hex: "#15803d" },
  { id: "royal_blue", label: "Azul Corporativo", hex: "#1d4ed8" },
  { id: "sky_exec", label: "Cian Ejecutivo", hex: "#0284c7" },
  { id: "navy_inst", label: "Azul Institucional", hex: "#1e3a8a" },
  { id: "violet_tech", label: "Violeta Tech", hex: "#7c3aed" },
  { id: "crimson_ed", label: "Burdeos Editorial", hex: "#be123c" },
  { id: "amber_warm", label: "Ámbar Dorado", hex: "#b45309" },
  { id: "slate_noir", label: "Negro Sobrio", hex: "#0f172a" },
];

export const CV_SIDEBAR_SWATCHES: ColorSwatchOption[] = [
  { id: "dark_slate", label: "Oscuro Ejecutivo", hex: "#0f172a" },
  { id: "dark_indigo", label: "Índigo Profundo", hex: "#1e1b4b" },
  { id: "soft_slate", label: "Gris Perla Claro", hex: "#f1f5f9" },
  { id: "soft_blue", label: "Azul Hielo Claro", hex: "#eff6ff" },
  { id: "soft_mint", label: "Menta Suave", hex: "#ecfdf5" },
  { id: "pure_white", label: "Blanco Limpio", hex: "#ffffff" },
];

export const CV_FONT_OPTIONS: { value: CvFontFamily; label: string }[] = [
  { value: "sans", label: "Moderna Sans (Limpia / ATS)" },
  { value: "serif", label: "Editorial Clásica (Serif Formal)" },
  { value: "mono", label: "Técnica Precisa (Monoespaciada)" },
];

export const CV_HEADER_STYLE_OPTIONS: { value: CvHeaderStyle; label: string }[] = [
  { value: "split", label: "Dividido Moderno (Foto + Datos)" },
  { value: "banner", label: "Banner de Color Superior" },
  { value: "centered", label: "Centrado Clásico / ATS" },
  { value: "boxed_sena", label: "Cajas Normativas (Estilo SENA)" },
];

export const CV_SECTION_STYLE_OPTIONS: {
  value: CvSectionTitleStyle;
  label: string;
}[] = [
  { value: "underline", label: "Línea Inferior Elegante" },
  { value: "filled_box", label: "Franja Rellena Institucional" },
  { value: "left_bar", label: "Barra Lateral de Acento" },
  { value: "pill", label: "Etiqueta / Píldora Moderna" },
];

export const CV_DENSITY_OPTIONS: { value: CvDensity; label: string }[] = [
  { value: "compact", label: "Compacta (Más contenido por hoja)" },
  { value: "standard", label: "Estándar Equilibrada" },
  { value: "spacious", label: "Amplia y Aireada" },
];

export const CV_PHOTO_SHAPE_OPTIONS: { value: CvPhotoShape; label: string }[] = [
  { value: "circle", label: "Circular" },
  { value: "rounded", label: "Bordes Suaves" },
  { value: "square", label: "Cuadrada Carnet" },
];

export const SAMPLE_AVATAR_PRESETS = [
  { label: "Ejecutiva", url: "/images/avatars/avatar-ejecutiva.svg" },
  { label: "Ejecutivo", url: "/images/avatars/avatar-ejecutivo.svg" },
  { label: "Tech", url: "/images/avatars/avatar-tech.svg" },
];

export function isDarkHexColor(hex: string): boolean {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return false;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.45;
}

