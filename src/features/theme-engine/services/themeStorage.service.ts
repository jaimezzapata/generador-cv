import { ThemeState } from "../types/theme.types";
import {
  DEFAULT_THEME_STATE,
  isValidColorMode,
  isValidVisualStyle,
} from "../utils/themeCatalog.utils";

const THEME_STORAGE_KEY = "generador_cv_theme_v2";

type Listener = () => void;

let cachedTheme: ThemeState | null = null;
let hasHydrated = false;
const listeners = new Set<Listener>();

function emitChange(): void {
  listeners.forEach((listener) => listener());
}

function readThemeFromStorage(): ThemeState {
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
}

export const themeStorageService = {
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  getServerSnapshot(): ThemeState {
    return DEFAULT_THEME_STATE;
  },

  getClientSnapshot(): ThemeState {
    if (!hasHydrated) {
      return DEFAULT_THEME_STATE;
    }
    if (!cachedTheme) {
      cachedTheme = readThemeFromStorage();
    }
    return cachedTheme;
  },

  hydrateClientStorage(): void {
    if (typeof window === "undefined" || hasHydrated) return;
    hasHydrated = true;
    cachedTheme = readThemeFromStorage();
    emitChange();
  },

  updateTheme(updater: (prev: ThemeState) => ThemeState): void {
    hasHydrated = true;
    const current = cachedTheme ?? readThemeFromStorage();
    const next = updater(current);
    cachedTheme = next;

    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage quota or private mode errors gracefully
      }
    }
    emitChange();
  },
};
