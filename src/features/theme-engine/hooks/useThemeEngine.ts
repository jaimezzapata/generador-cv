"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ColorMode,
  ThemeContextContract,
  ThemeState,
  VisualStyle,
} from "../types/theme.types";
import {
  applyThemeAttributesToDom,
  DEFAULT_THEME_STATE,
  getStyleMetadata,
} from "../utils/themeCatalog.utils";
import { themeStorageService } from "../services/themeStorage.service";

export const ThemeEngineContext = createContext<ThemeContextContract | null>(
  null
);

export function useThemeStateController(): ThemeContextContract {
  const [theme, setTheme] = useState<ThemeState>(() =>
    themeStorageService.loadTheme()
  );

  useEffect(() => {
    applyThemeAttributesToDom(theme);
    themeStorageService.saveTheme(theme);
  }, [theme]);

  const setStyle = useCallback((style: VisualStyle) => {
    setTheme((prev) => ({ ...prev, style }));
  }, []);

  const setMode = useCallback((mode: ColorMode) => {
    setTheme((prev) => ({ ...prev, mode }));
  }, []);

  const toggleMode = useCallback(() => {
    setTheme((prev) => ({
      ...prev,
      mode: prev.mode === "light" ? "dark" : "light",
    }));
  }, []);

  const activeMetadata = useMemo(
    () => getStyleMetadata(theme.style),
    [theme.style]
  );

  return {
    style: theme.style,
    mode: theme.mode,
    activeMetadata,
    setStyle,
    setMode,
    toggleMode,
  };
}

export function useThemeEngine(): ThemeContextContract {
  const context = useContext(ThemeEngineContext);
  if (!context) {
    return {
      ...DEFAULT_THEME_STATE,
      activeMetadata: getStyleMetadata(DEFAULT_THEME_STATE.style),
      setStyle: () => undefined,
      setMode: () => undefined,
      toggleMode: () => undefined,
    };
  }
  return context;
}

