"use client";

import { useCallback, useState } from "react";
import { pdfExportService } from "../services/pdfExport.service";
import { PdfExportOptions, PdfExportState } from "../types/pdfExport.types";

export function usePdfExport(defaultOptions: PdfExportOptions = {}) {
  const [state, setState] = useState<PdfExportState>({
    isExporting: false,
    progressMessage: "",
    error: null,
  });

  const triggerDownload = useCallback(
    async (overrideName?: unknown): Promise<boolean> => {
      const validOverrideName =
        typeof overrideName === "string" ? overrideName : undefined;

      try {
        setState({
          isExporting: true,
          progressMessage: "Generando documento PDF de alta resolución...",
          error: null,
        });

        await pdfExportService.downloadElementAsPdf({
          ...defaultOptions,
          fileName: validOverrideName ?? defaultOptions.fileName,
        });

        setState({
          isExporting: false,
          progressMessage: "",
          error: null,
        });
        return true;
      } catch (err) {
        console.error("PDF Export error:", err);
        const message =
          err instanceof Error
            ? err.message
            : "Ocurrió un error inesperado al generar el archivo PDF.";
        setState({
          isExporting: false,
          progressMessage: "",
          error: message,
        });
        if (typeof window !== "undefined") {
          window.alert(`No se pudo generar el PDF: ${message}`);
        }
        return false;
      }
    },
    [defaultOptions]
  );

  return {
    isExporting: state.isExporting,
    progressMessage: state.progressMessage,
    error: state.error,
    triggerDownload,
  };
}

