export type VisualStyle = "artpop" | "brutalism" | "minimalist" | "memphis";

export type ColorMode = "light" | "dark";

export interface ThemeState {
  style: VisualStyle;
  mode: ColorMode;
}

export interface StylePalettePreview {
  bg: string;
  surface: string;
  primary: string;
  secondary: string;
  tertiary: string;
}

export interface VisualStyleMetadata {
  id: VisualStyle;
  name: string;
  shortLabel: string;
  icon: string;
  editionLabel: string;
  designTagLabel: string;
  stampLabel: string;
  tagline: string;
  description: string;
  traits: string[];
  palettes: Record<ColorMode, StylePalettePreview>;
}

export interface ThemeContextContract extends ThemeState {
  activeMetadata: VisualStyleMetadata;
  setStyle: (style: VisualStyle) => void;
  setMode: (mode: ColorMode) => void;
  toggleMode: () => void;
}
