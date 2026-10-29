import {
  ColorMode,
  ThemeState,
  VisualStyle,
  VisualStyleMetadata,
} from "../types/theme.types";

export const DEFAULT_THEME_STATE: ThemeState = {
  style: "minimalist",
  mode: "light",
};

export const VISUAL_STYLES_CATALOG: VisualStyleMetadata[] = [
  {
    id: "minimalist",
    name: "Minimalismo",
    shortLabel: "MINIMALISTA",
    icon: "○",
    editionLabel: "EDICIÓN MINIMALISTA",
    designTagLabel: "MINIMAL DESIGN",
    stampLabel: "✨ 100% PERSONALIZABLE + IA",
    tagline: "Claridad editorial, aire y precisión profesional",
    description:
      "Diseño limpio y silencioso por defecto con enfoque total en tu contenido.",
    traits: ["Por Defecto", "Bordes Suaves", "Editorial"],
    palettes: {
      light: {
        bg: "#f1f5f9",
        surface: "#ffffff",
        primary: "#0f172a",
        secondary: "#e2e8f0",
        tertiary: "#f8fafc",
      },
      dark: {
        bg: "#09090b",
        surface: "#141418",
        primary: "#fafafa",
        secondary: "#27272a",
        tertiary: "#1c1c22",
      },
    },
  },
  {
    id: "artpop",
    name: "ArtPop",
    shortLabel: "ART POP",
    icon: "⚡",
    editionLabel: "POP ART EDITION",
    designTagLabel: "ART POP DESIGN",
    stampLabel: "✨ 100% PERSONALIZABLE + IA",
    tagline: "Energía Pop Art con amarillo intenso, fucsia y cian",
    description:
      "Fondo amarillo vibrante con trama de puntos, sombras negras sólidas y acentos fucsia y cian.",
    traits: ["Pop Art", "Sombra Dura", "Alto Impacto"],
    palettes: {
      light: {
        bg: "#ffe100",
        surface: "#ffffff",
        primary: "#ff1476",
        secondary: "#00d9ff",
        tertiary: "#ffe100",
      },
      dark: {
        bg: "#130924",
        surface: "#1a0f30",
        primary: "#ff1476",
        secondary: "#00e5ff",
        tertiary: "#ffe100",
      },
    },
  },
  {
    id: "brutalism",
    name: "Brutalismo",
    shortLabel: "BRUTALISMO",
    icon: "□",
    editionLabel: "EDICIÓN BRUTALISTA",
    designTagLabel: "BRUTALISMO DESIGN",
    stampLabel: "✨ [100% NORMA SENA & PDF]",
    tagline: "Cuadrícula técnica, cinta de precaución y bloques crudos",
    description:
      "Fondo cuadriculado arquitectónico, bordes negros rectos a 0px y alto contraste amarillo/negro.",
    traits: ["Cuadrícula", "Esquinas 0px", "Industrial"],
    palettes: {
      light: {
        bg: "#f8f9fa",
        surface: "#ffffff",
        primary: "#000000",
        secondary: "#ffe100",
        tertiary: "#f3f4f6",
      },
      dark: {
        bg: "#0d0d0d",
        surface: "#141414",
        primary: "#ffe100",
        secondary: "#262626",
        tertiary: "#ffffff",
      },
    },
  },
  {
    id: "memphis",
    name: "Memphis",
    shortLabel: "MEMPHIS",
    icon: "△",
    editionLabel: "EDICIÓN MEMPHIS 90S",
    designTagLabel: "MEMPHIS DESIGN",
    stampLabel: "✨ 100% PERSONALIZABLE + IA",
    tagline: "Estética años 90 con tonos crema, coral, celeste y sombra púrpura",
    description:
      "Fondo crema con puntos corales, contenedor con sombra violeta y tarjetas pastel redondeadas.",
    traits: ["Memphis 90s", "Sombra Violeta", "Pastel + Coral"],
    palettes: {
      light: {
        bg: "#fff8ee",
        surface: "#ffffff",
        primary: "#ff3b6b",
        secondary: "#29b6f6",
        tertiary: "#ffe100",
      },
      dark: {
        bg: "#1b1429",
        surface: "#241b38",
        primary: "#ff3b6b",
        secondary: "#29b6f6",
        tertiary: "#ffe100",
      },
    },
  },
];

export function getStyleMetadata(style: VisualStyle): VisualStyleMetadata {
  return (
    VISUAL_STYLES_CATALOG.find((item) => item.id === style) ??
    VISUAL_STYLES_CATALOG[0]
  );
}

export function isValidVisualStyle(value: unknown): value is VisualStyle {
  return (
    value === "artpop" ||
    value === "brutalism" ||
    value === "minimalist" ||
    value === "memphis"
  );
}

export function isValidColorMode(value: unknown): value is ColorMode {
  return value === "light" || value === "dark";
}

export function applyThemeAttributesToDom(theme: ThemeState): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-style", theme.style);
  root.setAttribute("data-mode", theme.mode);
}
