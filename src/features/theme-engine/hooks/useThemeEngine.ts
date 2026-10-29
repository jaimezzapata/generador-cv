"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  ColorMode,
  ThemeContextContract,
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
  const theme = useSyncExternalStore(
    themeStorageService.subscribe,
    themeStorageService.getClientSnapshot,
    themeStorageService.getServerSnapshot
  );

  useEffect(() => {
    applyThemeAttributesToDom(theme);
  }, [theme]);

  const setStyle = useCallback((style: VisualStyle) => {
    themeStorageService.updateTheme((prev) => ({ ...prev, style }));
  }, []);

  const setMode = useCallback((mode: ColorMode) => {
    themeStorageService.updateTheme((prev) => ({ ...prev, mode }));
  }, []);

  const toggleMode = useCallback(() => {
    themeStorageService.updateTheme((prev) => ({
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
