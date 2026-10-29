import { ThemeState } from "../types/theme.types";
import {
  DEFAULT_THEME_STATE,
  isValidColorMode,
  isValidVisualStyle,
} from "../utils/themeCatalog.utils";

const THEME_STORAGE_KEY = "generador_cv_theme_v2";

export const themeStorageService = {
  loadTheme(): ThemeState {
    if (typeof window === "undefined") {
      return DEFAULT_THEME_STATE;
    }

    try {
      const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (!raw) return DEFAULT_THEME_STATE;

      const parsed = JSON.parse(raw) as Partial<ThemeState>;
      const style = isValidVisualStyle(parsed.style)
        ? parsed.style
        : DEFAULT_THEME_STATE.style;
      const mode = isValidColorMode(parsed.mode)
        ? parsed.mode
        : DEFAULT_THEME_STATE.mode;

      return { style, mode };
    } catch {
      return DEFAULT_THEME_STATE;
    }
  },

  saveTheme(theme: ThemeState): void {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch {
      // Ignore storage quota or private mode errors gracefully
    }
  },
};
